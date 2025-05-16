import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    // type: Array,
    type: [String], // If description is an array of text points/strings
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    // type: Array,
    type: [String], // For an array of image URLs
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true
  },
},{ timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;