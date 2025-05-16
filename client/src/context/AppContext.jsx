import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [authLoading, setAuthLoading] = useState(true); // To track user authentication
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])

    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState("") // Initialize as an empty string

    //fetch seller status
    const fetchSeller = useCallback(async ()=>{
        // Consider a separate loading state for seller if needed, e.g., setSellerLoading(true)
        try {
            console.log("AppContext: Attempting to fetch seller status...");
            const {data} = await axios.get('/api/seller/is-auth');
            console.log("AppContext: Seller status response:", data);
            if(data.success){
                setIsSeller(true);
            }else{
                setIsSeller(false);
                // Optional: Log why authentication failed if message is provided
                // if (data.message) console.log("AppContext: Seller not authenticated:", data.message);
            }
        } catch (error) {
            console.error('AppContext: Error fetching seller status:', error.response ? error.response.data : error.message, error);
            setIsSeller(false);
        }
        // finally { setSellerLoading(false); }
    }, [axios]);

    //fetch user auth status, user data and cart item
    const fetchUser = useCallback(async ()=>{
        setAuthLoading(true); // Set loading true at the start of user fetch
        try {
            console.log("AppContext: Attempting to fetch user...");
            const {data} = await axios.get('/api/user/is-auth');
            console.log("AppContext: User auth response:", data);
            if (data.success && data.user){ // Ensure user object exists
                setUser(data.user);
                setCartItems(data.user.cartItems || {}); // Default to empty object if cartItems is null/undefined
            } else {
                setUser(null); // Set user to null if not successful or no user data
                setCartItems({}); // Reset cart items
            }
        } catch (error) {
            console.error('AppContext: Error fetching user:', error.response ? error.response.data : error.message, error);
            setUser(null);
            setCartItems({}); // Reset cart items on error
             } finally {
            setAuthLoading(false);
        }
    }, [axios]);


    //fetch all products
    const fetchProducts = useCallback(async () => {
       try{
        const {data} = await axios.get('/api/product/list');
        if(data.success){
            setProducts(data.products)
        }else{
            toast.error(data.message)
       }
    } catch(error){
        toast.error(error.message)
    }
  }, [axios]);   

    // add product to cart
    const addToCart = useCallback((itemId)=>{
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1;
        }else{
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart")
    }, [cartItems]);

    //update cart items
    const updateCartItems = useCallback((itemId, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData)
        toast.success("Updated cart")
    }, [cartItems]);

// remove product from cart
const removeFromCart = useCallback((itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
        cartData[itemId] -= 1;
        if(cartData[itemId] === 0){
            delete cartData[itemId];
        }
        setCartItems(cartData);
        toast.success("Removed from cart")
    }
}, [cartItems]);

//get cart items count
const getCartCount = useCallback(()=>{
    let totalCount = 0;
    for(const item in cartItems){
        totalCount += cartItems[item];
    }
    return totalCount;
}, [cartItems]);

//get cart total amount
const getCartAmount = useCallback(()=>{
    let totalAmount = 0;
    for(const items in cartItems){
        let itemInfo = products.find((product) => product._id === items);
        if(itemInfo && cartItems[items] > 0){ // Check if itemInfo is found
            totalAmount += itemInfo.offerPrice * cartItems[items];
        }
    }
    return Math.floor(totalAmount * 100) / 100;
}, [products, cartItems]);

    useEffect(() => {
        fetchUser()
        fetchSeller()
        fetchProducts()
    }, [fetchUser, fetchSeller, fetchProducts])

    const value = useMemo(() => ({
        navigate,
        user,
        setUser,
        authLoading,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        cartItems,
        setCartItems,
        searchQuery,
        setSearchQuery,
        addToCart,
        updateCartItems,
        removeFromCart,
        getCartCount,
        getCartAmount,
        axios,
        fetchProducts
    }), [
        user, authLoading, isSeller, showUserLogin, products, currency, cartItems, searchQuery, navigate, 
        addToCart, updateCartItems, removeFromCart, getCartCount, getCartAmount, fetchProducts, setCartItems, setUser, setIsSeller, setShowUserLogin, setSearchQuery
    ]);

    return (
        <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>
    );
    }

    // export default AppContext;
    export const useAppContext = ()=>{
        return useContext(AppContext)
    }
