import User from "../models/User.js"; // Make sure User model is imported

export const updateCart = async (req, res)=>{
    try {
        const { cartItems } = req.body; // Removed userId from req.body
        const userId = req.user?.id; // Get userId from authenticated user

        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated." });
        }
        await User.findByIdAndUpdate(userId, { cartItems })
        res.json({ success: true, message: "Cart updated successfully" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message})
    }
}