import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from "../models/User.js";

// Place order COD : /api/order/cod

export const placeOrderCOD = async(req, res) => {
    try {
        // userId should come from the authenticated user (set by authUser middleware)
        const userId = req.user?.id; // Or req.user?._id, depending on your authUser middleware
        const { items, address } = req.body;

        if (!userId) {
            // This should ideally be caught by authUser, but an extra check is good.
            return res.status(401).json({ success: false, message: "User not authenticated." });
        }

        if (!address || !items || items.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid order data: Address and items are required." });
        }

        // Calculate Amount Using Items
        let amount = 0;
        for (const cartItem of items) {
            if (!cartItem.product || !cartItem.quantity || cartItem.quantity <= 0) {
                return res.status(400).json({ success: false, message: `Invalid item data for product ID: ${cartItem.product}.` });
            }
            const product = await Product.findById(cartItem.product);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${cartItem.product} not found.` });
            }
            if (!product.offerPrice || typeof product.offerPrice !== 'number') {
                return res.status(500).json({ success: false, message: `Invalid price for product ${product.name}.`});
            }
            amount += product.offerPrice * cartItem.quantity;
        }   

    //Add Tax Charge (2%)
    amount += Math.floor(amount * 0.02);

    const newOrder = await Order.create({
            userId, // Use the authenticated user's ID
            items,
            amount,
            address,
            paymentType: "COD", // isPaid will default to false as per your Order schema
        });
        return res.status(201).json({ success: true, message: "Order Placed Successfully", order: newOrder });

    } catch (error) {
        console.error("Error in placeOrderCOD:", error); // Log the full error on the server
        if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: "Order validation failed.", errors: error.errors });
        }
        return res.status(500).json({ success: false, message: "Server error while placing order. Please try again later." });
    }
}

//PLACE ORDER STRIPE: /api/order/stripe
export const placeOrderStripe = async(req, res) => {
    try {
         const { items, address } = req.body; 
         const {origin} = req.headers;
         const userId = req.user?.id; 

        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated." });
        }

        if (!address || !items || items.length === 0) { // Added check for items array
            return res.status(400).json({ success: false, message: "Invalid order data: Address and items are required." });
        }

        let productData = [];
        let amount = 0; // Initialize amount

        // Calculate Amount and prepare productData for Stripe
        for (const item of items) {
            if (!item.product || !item.quantity || item.quantity <= 0) {
                return res.status(400).json({ success: false, message: `Invalid item data for product ID: ${item.product}.` });
            }
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ success: false, message: `Product with ID ${item.product} not found.` });
            }
            if (typeof product.offerPrice !== 'number') {
                 return res.status(500).json({ success: false, message: `Invalid price for product ${product.name}.`});
            }
            productData.push({
                name: product.name,
                price: product.offerPrice, // Price of one unit
                quantity: item.quantity,
            });
            amount += product.offerPrice * item.quantity;
        }

    //Add Tax Charge (2%) to the total amount
    const tax = Math.floor(amount * 0.02);
    const totalAmountWithTax = amount + tax;

    const order = await Order.create({
            userId, 
            items,
            amount: totalAmountWithTax, // Store the final amount including tax
            address,
            paymentType: "Online", // isPaid defaults to false
        });

       const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // Create line items for Stripe.
    // unit_amount should be the price of a single item in the smallest currency unit (e.g., cents for USD).
    const line_items = productData.map((item)=>{
        return{
            price_data: {
                currency: "usd",
                product_data:{
                    name: item.name,
                    // You can add more product details here if needed by Stripe, like images
                    // images: [product.image[0]] // If product object is available and has images
                },
                unit_amount: Math.floor(item.price * 100), // Price of one item in cents
            },
            quantity: item.quantity,
             }
          });

    // Create Stripe Checkout Session
    const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: "payment",
        success_url: `${origin}/loader?next=my-orders`, // User is redirected here on success
        cancel_url: `${origin}/cart`,
        metadata: {
            orderId: order._id.toString(),
            userId: userId.toString(), // Ensure userId is also a string
        },
    });
        // Return the session URL to the client
        return res.status(200).json({ success: true, url: session.url });
    } catch (error) {
        console.error("Error in placeOrderStripe:", error);
        return res.status(500).json({ success: false, message: error.message || "Server error while processing Stripe payment." });
    }
}

//Stripe Webhooks to Verify Payments Action :/stripe
export const stripeWebhooks = async(request, response)=>{
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;

    console.log("Stripe Webhook: Received a request.");

    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log(`Stripe Webhook: Event constructed successfully. Type: ${event.type}, ID: ${event.id}`);
    } catch (error) {
        console.error("Stripe Webhook Error (construction):", error.message);
        response.status(400).send(`Webhook Error: ${error.message}`);
        return;
    }

    //Handle the event
    switch(event.type){
        case 'checkout.session.completed':
            const sessionCompleted = event.data.object;
            console.log(`Stripe Webhook: checkout.session.completed event received for Session ID: ${sessionCompleted.id}`);
            console.log("Stripe Webhook: Full session metadata:", JSON.stringify(sessionCompleted.metadata, null, 2));

            if (sessionCompleted.payment_status === 'paid') {
                console.log(`Stripe Webhook: Payment status is 'paid' for Session ID: ${sessionCompleted.id}.`);
                const orderId = sessionCompleted.metadata.orderId;
                const userId = sessionCompleted.metadata.userId;

                if (!orderId) {
                    console.error(`Stripe Webhook (checkout.session.completed): orderId MISSING in session metadata for Session ID: ${sessionCompleted.id}. Metadata: ${JSON.stringify(sessionCompleted.metadata)}`);
                    // Acknowledge receipt to Stripe but log error. Don't retry if metadata is bad.
                    return response.status(200).json({ received: true, error: "Missing orderId in metadata" });
                }
                console.log(`Stripe Webhook: orderId found: ${orderId}, userId found: ${userId} for Session ID: ${sessionCompleted.id}.`);

                try {
                    console.log(`Stripe Webhook: Attempting to mark order ${orderId} as paid.`);
                    const updatedOrder = await Order.findByIdAndUpdate(orderId, { isPaid: true }, { new: true });
                    if (!updatedOrder) {
                        console.error(`Stripe Webhook (checkout.session.completed): Order with ID ${orderId} NOT FOUND for update.`);
                        // Acknowledge receipt, log error.
                        return response.status(200).json({ received: true, error: `Order ${orderId} not found` });
                    }
                    console.log(`Stripe Webhook: Order ${orderId} successfully marked as paid. Updated order:`, JSON.stringify(updatedOrder, null, 2));

                    if (userId) {
                        console.log(`Stripe Webhook: Attempting to clear cart for user ${userId}.`);
                        await User.findByIdAndUpdate(userId, { cartItems: {} });
                        console.log(`Stripe Webhook: Cart cleared for user ${userId}.`);
                    } else {
                        console.warn(`Stripe Webhook (checkout.session.completed): userId missing in metadata for order ${orderId}. Cart not cleared.`);
                    }
                } catch (dbError) {
                    console.error(`Stripe Webhook (checkout.session.completed): Database error for order ${orderId} or user ${userId}:`, dbError);
                    // For critical DB errors, you might consider responding with a 500 to Stripe to trigger retries,
                    // but be cautious with non-transient errors. For now, acknowledge to prevent too many retries.
                    return response.status(500).json({ error: "Database update failed during webhook processing" });
                }
            } else {
                console.log(`Stripe Webhook (checkout.session.completed): Payment status was '${sessionCompleted.payment_status}' (not 'paid') for Session ID: ${sessionCompleted.id}. Order not marked as paid.`);
            }
            break;

        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log(`Stripe Webhook: PaymentIntent ${paymentIntentSucceeded.id} succeeded. Amount: ${paymentIntentSucceeded.amount_received}`);
            // This event can also be used, but checkout.session.completed is often preferred for fulfillment.
            break;

        case 'payment_intent.payment_failed':
            const paymentIntentFailed = event.data.object;
            console.log(`Stripe Webhook: PaymentIntent ${paymentIntentFailed.id} failed. Reason: ${paymentIntentFailed.last_payment_error?.message}`);
            // Optional: Handle failed payments
            try {
                const sessions = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentFailed.id,
                });
                if (sessions.data && sessions.data.length > 0 && sessions.data[0].metadata) {
                    const { orderId } = sessions.data[0].metadata;
                    if (orderId) {
                        console.log(`Stripe Webhook (payment_intent.payment_failed): Found orderId ${orderId} for failed PI ${paymentIntentFailed.id}.`);
                        const order = await Order.findById(orderId);
                        if (order && !order.isPaid) { 
                           // Consider marking as 'payment_failed' instead of deleting
                           console.log(`Stripe Webhook: Order ${orderId} payment failed. Consider marking as 'payment_failed'.`);
                           // await Order.findByIdAndDelete(orderId); // Uncomment if you wish to delete
                           // console.log(`Stripe Webhook: Order ${orderId} deleted due to payment failure.`);
                        } else if (order && order.isPaid) {
                            console.log(`Stripe Webhook: Order ${orderId} was already paid. Not taking action on subsequent payment failure event.`);
                        } else if (!order) {
                            console.log(`Stripe Webhook: Order ${orderId} not found for failed payment.`);
                        }
                    } else {
                        console.warn(`Stripe Webhook (payment_intent.payment_failed): orderId not found in session metadata for PI ${paymentIntentFailed.id}.`);
                    }
                } else {
                     console.warn(`Stripe Webhook (payment_intent.payment_failed): No session found for PI ${paymentIntentFailed.id}.`);
                }
            } catch (error) {
                console.error(`Stripe Webhook (payment_intent.payment_failed): Error processing failed payment for PI ${paymentIntentFailed.id}:`, error);
            }
            break;

        default:
            console.log(`Stripe Webhook: Unhandled event type: ${event.type}`);
            break;
    }
    // Acknowledge receipt of the event to Stripe
    response.status(200).json({received: true});
}

//get orders by user id : /api/order/user
export const getUserOrders = async(req, res) => {
 try {
    const userId = req.user?.id; 
    if (!userId) {
        return res.status(401).json({ success: false, message: "User not authenticated." });
    }
    const orders = await Order.find({
        userId,
        $or: [{paymentType: "COD"}, {isPaid: true}]
    }).populate("items.product address").sort({createdAt: -1});
    res.status(200).json({success: true, orders});
 } catch (error) {
    console.error("Error in getUserOrders:", error);
    res.status(500).json({ success: false, message: "Server error while fetching your orders." });
 }
}

// get all orders ( for seller / admin ) : /api/order/seller

export const getAllOrders = async(req, res) => {
    try {
       const orders = await Order.find({
           $or: [{paymentType: "COD"}, {isPaid: true}]
       }).populate("items.product address userId").sort({createdAt: -1}); // Added userId population for admin view
       res.status(200).json({success: true, orders });
    } catch (error) {
       console.error("Error in getAllOrders:", error);
       res.status(500).json({ success: false, message: "Server error while fetching all orders." });
    }
}
