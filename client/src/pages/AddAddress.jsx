import  { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

//input field component
const InputField = ({ type, placeholder, name, handleChange, address })=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    />
)

const AddAddress = () => {

    const {axios, user, navigate, authLoading} = useAppContext();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({ ...prevAddress, [name]: value, }))
        // Note: console.log(address) here will show the state *before* this update due to setState's asynchronous nature.
        // To see the updated value immediately, you could log 'name' and 'value', or use a useEffect hook listening to 'address'.
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault();
        // Basic check for required fields (browser 'required' attribute handles most of this)
        // You could add more specific client-side validation here if needed.
        
        setIsSubmitting(true);
        try {
            // const {data} = await axios.post('/api/address/add', {address});
            const {data} = await axios.post('/api/address/add', address);
            if(data.success){
                toast.success(data.message)
                navigate('/cart')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // Show backend's custom message for HTTP errors
            } else if (error.request) {
                // The request was made but no response was received
                toast.error("No response from server. Please check your network connection.");
            } else if (error.message) {
                toast.error(error.message); // Standard Axios error message (e.g., network error, 401)
            } else {
                toast.error("An unknown error occurred while saving the address.");
            }
        }
       finally {
        setIsSubmitting(false);
       }
       }
       
       useEffect(()=>{
        // Only redirect if authentication check is complete AND user is not found
        if(!authLoading && !user){
            toast.error("Please login to add an address."); // Optional: inform user
            navigate('/cart'); // Or navigate to a login page e.g., navigate('/login') if more appropriate
        }
       },[user, navigate, authLoading]);
       
       // Pre-fill form with user data if available
       useEffect(() => {
        if (user) {
            setAddress(prev => ({
                ...prev,
                firstName: user.firstName || prev.firstName || "",
                lastName: user.lastName || prev.lastName || "",
                email: user.email || prev.email || "",
            }));
        }
    }, [user]); // Re-run if the user object changes
       
    if (authLoading) {
        return (
            <div className='mt-16 pb-16 flex justify-center items-center min-h-[60vh]'>
                <p className='text-xl text-gray-500'>Loading user details...</p>
            </div>
        );
    }

  return !user ? null : ( // Or a more specific "Access Denied" message if preferred over redirect
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping<span
      className='font-semibold text-primary'>Address</span></p>
      <div className='flex flex-col md:flex-row justify-between mt-10'>
       <div className='flex-1 max-w-md'>
        <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
            <div className='grid grid-cols-2 gap-4'>
                <InputField handleChange={handleChange} address={address} name='firstName' type="text" placeholder="First Name"/>
                <InputField handleChange={handleChange} address={address} name='lastName' type="text" placeholder="Last Name"/>
            </div>

            <InputField handleChange={handleChange} address={address} name='email' type="email" placeholder="Email Address"/>
            <InputField handleChange={handleChange} address={address} name='street' type="text" placeholder="Street"/>

                <div className='grid grid-cols-2 gap-4'>
                <InputField handleChange={handleChange} address={address} name='city' type="text" placeholder="City"/>
                <InputField handleChange={handleChange} address={address} name='state' type="text" placeholder="State"/>
            </div>

            <div className='grid grid-cols-2 gap-4'>
                <InputField handleChange={handleChange} address={address} name='zipCode' type="number" placeholder="Zip Code"/>
                <InputField handleChange={handleChange} address={address} name='country' type="text" placeholder="Country"/>
            </div>

            <InputField handleChange={handleChange} address={address} name='phone' type="text" placeholder="Phone Number"/>

            <button type="submit" disabled={isSubmitting} className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase disabled:opacity-50 disabled:cursor-not-allowed'>
                {isSubmitting ? 'Saving...' : 'Save address'}
            </button>

        </form>
       </div>
       <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_image} alt="Add Address" />
      </div>
    </div>
  )
}

export default AddAddress

