//for disk storage 
// import { v2 as cloudinary } from "cloudinary";
// import Product from "../models/Product.js";


// //Add Product: /api/product/add
// export const addProduct = async (req, res)=>{
//  try{
//     let productData = JSON.parse(req.body.productData);

//     const images = req.files
    
//     let imageUrl = await Promise.all(
//         images.map(async (item)=>{
//               let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
//               return result.secure_url
//         })
//     )
//     await Product.create({...productData, images: imageUrl})
//     res.json({success: true, message: "Product Added"})
//  } catch (error){
//     console.log(error.message);
//     res.json({success: false, message: error.message})
//  }
// }

// //Add Product: /api/product/list

// export const productList = async(req, res)=>{
//     try {
//         const products = await Product.find({})
//         res.json({success: true, products})
//     } catch (error) {
//         console.log(error.message);
//         res.json({success: false, message: error.message})
//     }

// }

// //get single product : /api/product/id
// export const productById = async (req, res)=>{
//   try {
//     const { id } = req.body;
//     const product = await Product.findById(id);
//     res.json({success: true, product})
//   } catch (error) {
//     console.log(error.message);
//     res.json({success: false, message: error.message})
//   }
// }

// // ...existing code...

// // Change Product inStock : /api/product/stock
// export const changeStock = async (req, res) => {
//     try {
//       const { id, inStock } = req.body;
//       await Product.findByIdAndUpdate(id, { inStock });
//       res.json({ success: true, message: "Stock Changed" });
//     } catch (error) {
//       console.log(error.message);
//       res.json({ success: false, message: error.message });
//     }
//   };
  
//   // ...existing code...

//for memory storage
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";
import mongoose from "mongoose"; // Import mongoose for ObjectId validation

//Add Product: /api/product/add
export const addProduct = async (req, res) => {
  try {
    // Ensure productData and files are present
    if (!req.body.productData) {
      return res.status(400).json({ success: false, message: "Missing product data." });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "Missing product images." });
    }

    let productData;
    try {
      productData = JSON.parse(req.body.productData);
    } catch (jsonError) {
      console.error("JSON Parsing Error in addProduct:", jsonError);
      return res.status(400).json({ success: false, message: "Invalid productData format. Ensure it's a valid JSON string." });
    }

    // Validate essential productData fields (example)
    if (!productData.name || !productData.price || !productData.category) {
      return res.status(400).json({ success: false, message: "Missing required product fields: name, price, or category." });
    }

    const images = req.files; // req.files is populated by multer

    // Upload images to Cloudinary
    // item.path is used here, which implies multer is configured with diskStorage.
   // If using memoryStorage (as intended now), use item.buffer and cloudinary.uploader.upload_stream.
    let imageUrls = [];
    for (const item of images) {
      try {
// Use a Promise to work with upload_stream
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'image',
              folder: 'nativecraft_products' // Example folder for organization in Cloudinary
            },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            }
          );
          uploadStream.end(item.buffer); // Pass the buffer to the stream
        });
        if (result && result.secure_url) {
          imageUrls.push(result.secure_url);
        } else {
          // Handle cases where Cloudinary might not return a URL or result as expected
          console.error("Cloudinary upload for file did not return a secure_url:", item.originalname);
        }
      }  catch (uploadError) {
        console.error("Cloudinary Upload Error for file:", item.originalname, uploadError);
        // Optionally, you could decide to stop and return an error if any single upload fails.
        // For now, it continues and tries to upload other images.
      }
    }

    // Check if any images were successfully uploaded if images are required by your schema
    if (imageUrls.length === 0) {
      return res.status(500).json({ success: false, message: "Failed to upload any images to Cloudinary." });
    }

    // Create and save the new product
    // Ensure your Product model field is 'image' (singular Array) as defined in Product.js
    const newProduct = await Product.create({ ...productData, image: imageUrls });

    res.status(201).json({ success: true, message: "Product Added Successfully", product: newProduct });
  } catch (error) {
    console.error("Error in addProduct controller:", error);
    res.status(500).json({ success: false, message: "Server error while adding product. " + error.message });
  }
};

// Get Product List: /api/product/list
export const productList = async (req, res) => {
  try {
    // Fetch all products and sort by creation date (newest first)
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error in productList controller:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products. " + error.message });
  }
};

// Get Single Product by ID: /api/product/:id
export const productById = async (req, res) => {
  try {
    // ID should come from route parameters as defined in productRoute.js (/:id)
    const { id } = req.params;

    // Validate if ID is a valid MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID format." });
    }

    const product = await Product.findById(id);

    if (!product) {
      // Return 404 if product is not found
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error in productById controller:", error);
    res.status(500).json({ success: false, message: "Failed to fetch product. " + error.message });
  }
};

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    // Validate if ID is a valid MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid product ID format." });
    }

    // Validate inStock value
    if (typeof inStock !== 'boolean') {
      return res.status(400).json({ success: false, message: "Invalid 'inStock' value. Must be true or false." });
    }

    // Find the product by ID and update its inStock status
    // { new: true } option returns the updated document
    const updatedProduct = await Product.findByIdAndUpdate(id, { inStock }, { new: true });

    if (!updatedProduct) {
      // Return 404 if product is not found
      return res.status(404).json({ success: false, message: "Product not found to update stock." });
    }

    res.status(200).json({ success: true, message: "Product stock status changed successfully.", product: updatedProduct });
  } catch (error) {
    console.error("Error in changeStock controller:", error);
    res.status(500).json({ success: false, message: "Failed to change stock. " + error.message });
  }
};
