import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({product}) => {
    // Log the product prop when the component renders
    if (product) {
        console.log("[ProductCard] Rendering with product:", product.name, "ID:", product._id, "Full Product:", product);
    }
    const {currency, addToCart, removeFromCart, cartItems, navigate} = useAppContext()


    return product && (
        <div onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}}  className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                {/* <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image[0]} alt={product.name} /> */}
                <img
                    className="group-hover:scale-105 transition max-w-26 md:max-w-36 h-36 object-contain" // Added h-36 and object-contain for consistent sizing
                    src={(product.image && product.image.length > 0 && product.image[0]) ? product.image[0] : assets.placeholder_image_icon}
                    alt={product.name}
                />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        
                            <img key={i} className="md:w-3.5 w-3" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
                    ))}
                    <p>(4)</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-primary">
                        {currency}{product.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
                    </p>
                    <div onClick={(e) => {
                        e.stopPropagation();
                    }} className="text-primary">
                        {/* {!cartItems[product._id] ? ( */}
                             {/* Check if cartItems exists and then if the product is in it */}
                        {(cartItems && cartItems[product._id]) ? (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                <button onClick={() => {removeFromCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                {/* cartItems is guaranteed to exist here, and cartItems[product._id] is truthy */}
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => {addToCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button className="flex items-center justify-center gap-1 bg-primary/10 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer" onClick={() => addToCart(product._id)} >
                                <img src={assets.cart_icon} alt="cart_icon" />   
                                Add
                            </button>
                        // ) : (
                        //     <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                        //         <button onClick={() => {removeFromCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                        //             -
                        //         </button>
                        //         <span className="w-5 text-center">{cartItems[product._id]}</span>
                        //         <button onClick={() => {addToCart(product._id)}} className="cursor-pointer text-md px-2 h-full" >
                        //             +
                        //         </button>
                        //     </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;