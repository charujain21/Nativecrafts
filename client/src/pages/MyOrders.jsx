// import { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'

// const MyOrders = () => {

//     const [myOrders, setMyOrders] = useState([])
//     const {currency, axios, user} = useAppContext()

//     const fetchMyOrders = async () => {
//         try {
//           const { data } =  await axios.get('/api/order/user')
//           if(data.success){
//             setMyOrders(data.orders)
//           }
//         } catch (error) {
//           console.log(error);
//         }
//     }

//     useEffect(() => {
//       if(user){
//         fetchMyOrders()
//       }  
//     },[user])

//   return (
// <div className='mt-16 pb-16'>
// <div className='flex flex-col items-center w-max mb-8'>
//       <p className='text-2xl font-medium uppercase'>My Orders</p>
//       <p className='w-16 h-0.5 bg-primary rounded-full'></p>
//     </div>
//     {myOrders.map((order, index) => (
//     <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
//       <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
//         <span>OrderId : {order._id}</span>
//         <span>Payment : {order.paymentType}</span>
//         <span>Total Amount : {currency}{order.amount}</span>
//       </p>  
//       {order.items.map((item, index) => (
//         <div
//   key={index}
//   className={`relative bg-white text-gray-500/70 ${
//     order.items.length !== index + 1 && "border-b border-gray-300/50"
//   } flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
// >
      
//       <div className='flex items-center mb-4 md:mb-0'>
//         <div className='bg-primary/10 p-4 rounded-lg'>
//           <img src={item.product.image[0]} alt='' className='w-16 h-16' />
//           </div>
        
//         <div className='ml-4'>
//           <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
//           <p>Category: {item.product.category}</p>
//           </div>
// </div>

// <div className='flex flex-col justify-center md:ml-8 mb:4 md:mb-0'>
//   <p>Quantity: {item.quantity || "1"}</p>
// <p>Status: {item.status}</p>
// <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//   </div>

//   <p className='text-primary text-lg font-medium'>
//     Amount: {currency}{item.product.offerPrice * item.quantity}
//   </p>

//         </div>
//     ))} 
//     </div>
//     ))}
    
// </div>
//   )
// }

// export default MyOrders


import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const { currency, axios, user } = useAppContext();

    const fetchMyOrders = async () => {
        if (!user) return; // Don't fetch if no user
        setLoading(true);
        try {
            const { data } = await axios.get('/api/order/user');
            if (data.success && data.orders) {
                setMyOrders(data.orders);
            } else {
                // Handle cases where data.success might be true but orders are missing, or success is false
                setMyOrders([]); // Ensure myOrders is an empty array on failure or no data
                console.error("Failed to fetch orders or no orders found:", data.message);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setMyOrders([]); // Reset orders on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, [user]); // Dependency on user ensures refetch if user changes

    if (loading) {
        return (
            <div className='mt-16 pb-16 text-center text-gray-600'>
                <div className='flex flex-col items-center w-max mb-8 mx-auto'>
                    <p className='text-2xl font-medium uppercase'>My Orders</p>
                    <p className='w-16 h-0.5 bg-primary rounded-full'></p>
                </div>
                Loading your orders...
            </div>
        );
    }

    if (!myOrders.length) {
        return (
            <div className='mt-16 pb-16 text-center'>
                <div className='flex flex-col items-center w-max mb-8 mx-auto'>
                    <p className='text-2xl font-medium uppercase'>My Orders</p>
                    <p className='w-16 h-0.5 bg-primary rounded-full'></p>
                </div>
                <p className="text-gray-600">You have no orders yet.</p>
            </div>
        );
    }

    return (
        <div className='mt-16 pb-16 px-4 md:px-0'> {/* Added some horizontal padding for smaller screens */}
            <div className='flex flex-col items-center w-max mb-8 mx-auto md:mx-0'> {/* Centered on mobile, left on md+ */}
                <p className='text-2xl font-medium uppercase'>My Orders</p>
                <p className='w-16 h-0.5 bg-primary rounded-full'></p>
            </div>
            {myOrders.map((order) => (
                <div key={order._id} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl mx-auto'> {/* Centered order cards */}
                    <div className='flex flex-col md:flex-row justify-between md:items-center text-gray-500 md:font-medium mb-4'>
                        <span className='mb-1 md:mb-0'>OrderId: {order._id}</span>
                        <span className='mb-1 md:mb-0'>Payment: {order.paymentType}</span>
                        <span>Total Amount: {currency}{order.amount.toFixed(2)}</span>
                    </div>
                    {order.items.map((item, itemIndex) => (
                        <div
                            key={item.product?._id || `item-${itemIndex}`} // Prefer product ID, fallback to index-based key
                            className={`relative bg-white text-gray-600 ${order.items.length !== itemIndex + 1 ? "border-b border-gray-300/50" : ""
                                } flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-8 w-full`} // Adjusted gap
                        >
                            <div className='flex items-center mb-4 md:mb-0 flex-grow md:flex-grow-0 md:w-2/5'> {/* Control width */}
                                <div className='bg-primary/10 p-3 rounded-lg'> {/* Slightly smaller padding */}
                                    <img
                                        src={item.product?.image?.[0]} // Optional chaining for safety
                                        alt={item.product?.name || 'Product image'} // Meaningful alt text
                                        className='w-16 h-16 object-cover rounded' // Added rounded for image
                                    />
                                </div>
                                <div className='ml-4'>
                                    <h2 className='text-lg font-semibold text-gray-800'>{item.product?.name}</h2>
                                    <p className="text-sm">Category: {item.product?.category}</p>
                                </div>
                            </div>

                            <div className='flex flex-col justify-center text-sm md:w-1/5 mb-3 md:mb-0'> {/* Control width */}
                                <p>Quantity: {item.quantity}</p>
                                <p>Status: <span className="font-medium">{order.status}</span></p> {/* Display order status */}
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>

                            <p className='text-primary text-md font-semibold md:w-1/5 text-left md:text-right'> {/* Control width and alignment */}
                                Item Total: {currency}{(item.product?.offerPrice * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
