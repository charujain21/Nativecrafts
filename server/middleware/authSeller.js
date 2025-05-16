import jwt from 'jsonwebtoken';

const authSeller = async (req, res, next) => {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
        // 401 Unauthorized is more appropriate when no token is provided
        return res.status(401).json({ success: false, message: "Not Authorized: No seller token provided" });
    }

    try {
        // Corrected: Use sellerToken here instead of the undefined 'token'
        const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);

        // The check against process.env.SELLER_EMAIL is very specific.
        // This implies only one "super" seller. If you have multiple sellers,
        // this logic would need to change (e.g., check for a 'role: seller' in the token
        // or verify the sellerId against a database).
        // Assuming this specific check is intended for your current use case:
        if (tokenDecode && tokenDecode.email && tokenDecode.email === process.env.SELLER_EMAIL) {
            req.seller = tokenDecode; // Optionally attach decoded seller info to the request object
            next(); // Proceed to the next middleware or route handler
        } else {
            // 403 Forbidden is appropriate if the token is valid but the user isn't authorized for this resource
            return res.status(403).json({ success: false, message: "Forbidden: Seller not authorized" });
        }
    } catch (error) {
        console.error("AuthSeller Middleware Error:", error.message);
        // Handle specific JWT errors like TokenExpiredError or JsonWebTokenError if needed
        // For instance, if error.name === 'TokenExpiredError', you could send a specific message.
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired seller token" });
    }
};
        
export default authSeller;
