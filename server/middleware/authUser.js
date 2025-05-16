import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }

    
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode.id) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }

    req.user = { id: tokenDecode.id }; // Attach the decoded user ID to req.user
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized: Invalid or expired token" });
  }
};

export default authUser;