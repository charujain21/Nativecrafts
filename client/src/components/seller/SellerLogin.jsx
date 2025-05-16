import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Ensure preventDefault is always called first
    setLoading(true); // Set loading to true when submission starts
    try {
      const { data } = await axios.post('/api/seller/login', { email, password });
      if (data.success) {
        setIsSeller(true);
        toast.success(data.message || "Login successful!"); // Use backend message or default
        navigate("/seller");
      } else {
        // Use backend error message if available, otherwise a generic one
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      // Provide more specific error feedback
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred during login.");
      }
    } finally {
      setLoading(false); // Set loading to false once submission is complete (success or fail)
    }
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);

  return (
    !isSeller && (
      <form onSubmit={onSubmitHandler} className="min-h-screen flex items-center text-sm text-gray-600">
        <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-96 rounded-lg shadow-xl border border-gray-200 bg-white"> {/* sm:min-w-88 to sm:min-w-96 for a bit more width, added bg-white */}
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">Seller</span> Login
          </p>
          <div className="w-full">
            <p className="mb-1">Email</p> {/* Added margin-bottom for spacing */}
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 rounded w-full p-2.5 mt-1 outline-primary focus:border-primary transition-colors duration-200" // Adjusted padding, border color, focus state
              required
              disabled={loading} // Disable input when loading
            />
          </div>
          <div className="w-full">
            <p className="mb-1">Password</p> {/* Added margin-bottom for spacing */}
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded w-full p-2.5 mt-1 outline-primary focus:border-primary transition-colors duration-200" // Adjusted padding, border color, focus state
              required
              disabled={loading} // Disable input when loading
            />
          </div>
          <button 
            type="submit" // Explicitly set button type
            disabled={loading} // Disable button when loading
            className="bg-primary text-white w-full py-2.5 rounded-md cursor-pointer hover:bg-primary-dark transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed" // Adjusted padding, hover state, disabled state
          >
            {loading ? "Logging in..." : "Login"} {/* Show loading text */}
          </button>
        </div>
      </form>
    )
  );
};

export default SellerLogin;
