import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
 userId: {
    type: mongoose.Schema.Types.ObjectId, // Correct type for ObjectId references
    required: true,
    ref: 'User' // Should match the model name registered in User.js (typically 'User')
  },
 items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId, // Correct type for ObjectId references
      required: true,
      ref: 'Product' // Should match the model name registered in Product.js (typically 'Product')
    },
    quantity: { type: Number, required: true }
    // You might also consider denormalizing product name and image here
    // if you want to avoid populating for every order list display,
    // but populate is generally fine for "my-orders" detail.
    // name: { type: String, required: true },
    // image: { type: String, required: true } // Store the primary image URL
 }],
 amount: { type: Number, required: true },
address: { // This assumes 'address' is an ObjectId referencing an Address document
    type: mongoose.Schema.Types.ObjectId, // Correct type for ObjectId references
    required: true,
    ref: 'address' // Should match the model name registered in Address.js (e.g., 'address' or 'Address')
  },
 status: {type: String, default: 'Order Placed'},
 paymentType: {type: String, required: true},
 isPaid:  {type: Boolean, required: true, default: false},
},{
 timestamps: true
})

const Order = mongoose.models.order || mongoose.model('order', orderSchema)

export default Order;