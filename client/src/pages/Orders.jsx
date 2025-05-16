import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'

const Orders = () => {
const {currency, axios } = useAppContext()
const [orders, setOrders] = useState([])

const fetchOrders = async () => {
    try {
        const { data } =  await axios.get('/api/order/seller');
        if(data.success){
            setOrders(data.orders);
        }else{
            toast.error(data.message);
        }

    } catch (error) {
         toast.error(error.message);
        console.log(error);
    }
};

useEffect(() => {
    fetchOrders();
}, []);

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
    <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium mb-6">Orders List</h2> {/* Added mb-6 for spacing */}
            {orders.length > 0 ? orders.map((order) => (
                <div key={order._id} className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300"> {/* Corrected className typo */}
                    <div className="flex gap-3 items-start max-w-xs w-full"> {/* Adjusted max-width and added w-full for better responsiveness */}
                        {/* Display first product image or a placeholder */}
                        {order.items.length > 0 && order.items[0].product && order.items[0].product.image && order.items[0].product.image.length > 0 ? (
                            <img 
                                src={order.items[0].product.image[0]} 
                                alt={order.items[0].product.name || 'Product image'} 
                                className="w-12 h-12 object-cover rounded-sm flex-shrink-0" 
                            />
                        ) : (
                            <img 
                                className="w-12 h-12 object-cover rounded-sm flex-shrink-0" 
                                src={assets.box_icon} 
                                alt="Order icon" 
                            />
                        )}
                        <div>
                            {order.items.map((item, itemIndex) => ( // Renamed inner index to avoid confusion
                                <div key={item.product?._id || `order-${order._id}-item-${itemIndex}`} className="flex flex-col"> {/* Use product ID or a more unique composite key */}
                                    <p className="font-medium text-sm"> {/* Adjusted text size */}
                                        {item.product ? item.product.name : 'Product Name Unavailable'} {" "}
                                        <span className="text-primary">x {item.quantity}</span>
                                    </p>
                                </div>
                            ))}
                            {order.items.length > 1 && <p className="text-xs text-gray-500 mt-1">+{order.items.length -1} more item(s)</p>}
                        </div>
                    </div>

                    <div className="text-sm md:text-base text-black/60">
                        <p className='text-black/80'>
                        {order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}, {order.address.city}</p>
                        <p> {order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                        <p>{order.address.phone}</p>
                    </div>

                    <p className="font-medium text-lg my-auto">{currency}{order.amount}</p>

                    <div className="flex flex-col text-sm md:text-base text-black/60">
                        <p>Method: {order.paymentType}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                    </div>
                </div>
            )) : (
                <p className="text-center text-gray-500">No orders found.</p>
            )}
        </div>
        </div>
  )
}

export default Orders
