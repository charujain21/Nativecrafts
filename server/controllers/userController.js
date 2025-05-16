//register user : /api/user/register
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register user - /api/user/register

export const register = async (req, res)=>{
    try{
    const{ name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({success: false, message: "Missing Details"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(409).json({success: false, message: "User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        // cartItems will default to {} as per your User model schema
    });

    //token will be expired in 7 days
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('token', token,  {
        httpOnly: true, //prevent js to access cookie
        secure: process.env.NODE_ENV === 'production', // use secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //csrf production
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time 
    });
    
    // Return user object including _id
    return res.status(201).json({
        success: true, 
        user: {
            _id: user._id, 
            email: user.email, 
            name: user.name,
            cartItems: user.cartItems // Should be an empty object by default from schema
        }
    });
    }catch(error){
        console.error("Error in register:", error.message);
        res.status(500).json({success: false, message: "Server error during registration."});
    }
}


//login user: /api/user/login

export const login = async (req, res)=>{
 
    try{
   const{ email, password } = req.body;

   if(!email || !password)
    return res.status(400).json({success: false, message: "Email and password are required"});
    
    // Select cartItems as well, as it's needed by the frontend context
    const user = await User.findOne({email}).select('+password'); // Ensure password is selected for comparison

    if(!user){
        return res.status(401).json({success: false, message: "Invalid Email or password"});
    }
       const isMatch = await bcrypt.compare(password, user.password);

     if(!isMatch)
        return res.status(401).json({success: false, message: "Invalid Email or password"});

     const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('token', token,  {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', // use secure cookies in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', //csrf production
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiration time 
    });
    
    // Return user object including _id and cartItems
    return res.status(200).json({
        success: true, 
        user: {
            _id: user._id, 
            email: user.email, 
            name: user.name,
            cartItems: user.cartItems || {} // Ensure cartItems is an object
        }
    });
}catch(error){
    console.error("Error in login:", error.message);
    res.status(500).json({ success: false, message: "Server error during login." });
    }
}

//check auth: /api/user/is-auth
export const isAuth = (req, res) => {
    // This function relies on an authentication middleware (e.g., authUser.js)
    // to verify the token and populate req.user.
    // The middleware should attach a user object that includes at least:
    // id (which is the MongoDB _id), email, name, and cartItems.

    if (!req.user || !req.user.id) {
        // If authUser middleware didn't set req.user or req.user.id,
        // it means the user is not properly authenticated.
        return res.status(401).json({ success: false, message: "User not authenticated or user ID missing." });
    }

    // Construct the user object for the frontend, mapping 'id' to '_id'
    const userForFrontend = {
        _id: req.user.id,       // Map 'id' from auth middleware (which is user's _id) to '_id'
        email: req.user.email,
        name: req.user.name,
        cartItems: req.user.cartItems || {} // Ensure cartItems is an object
        // Add any other fields from req.user that your frontend AppContext might need
    };

    return res.status(200).json({ success: true, user: userForFrontend });
  };

//Logout user: /api/user/logout

export const logout = async (req, res)=>{
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/', // Important: Specify the path for the cookie
        });
        return res.status(200).json({ success: true, message: "Logged Out Successfully" });
    } catch (error) {
        console.error("Error in logout:", error.message);
        res.status(500).json({ success: false, message: "Server error during logout." });
    }
}
