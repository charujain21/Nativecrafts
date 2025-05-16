import logo from "./logo.svg";
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import placeholder_image_icon from "./placeholder_image_icon.jpg"; // Corrected and completed 
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import main_banner_bg from "./main_banner_bg.png";
import main_banner_bg_sm from "./main_banner_bg_sm.png";
import bottom_banner_image from "./bottom_banner_image.png";
import bottom_banner_image_sm from "./bottom_banner_image_sm.png";
import add_address_image from "./add_address_image.svg";
import Cap_image_1 from "./Cap_image_1.jpg";
import Cap_image_2 from "./Cap_image_2.jpg";
import Cap_image_3 from "./Cap_image_3.jpg";
import Cap_image_4 from "./Cap_image_4.jpg";
import Cap_image_5 from "./Cap_image_5.jpg";
import Cap_image_6 from "./Cap_image_6.webp";

import chudi_image_1 from "./chudi_image_1.jpg";
import chudi_image_2 from "./chudi_image_2.jpg";
import chudi_image_3 from "./chudi_image_3.jpg";
import chudi_image_4 from "./chudi_image_4.jpg";


import frame_image_1 from "./frame_image_1.jpg";
import frame_image_2 from "./frame_image_2.jpg";

import jwellery_image_1 from "./jwellery_image_1.jpg";
import jwellery_image_2 from "./jwellery_image_2.jpg";
import jwellery_image_3 from "./jwellery_image_3.jpg";
import jwellery_image_4 from "./jwellery_image_4.jpg";

import saree_image_1 from "./saree_image_1.jpg";
import saree_image_2 from "./saree_image_2.jpg";
import saree_image_3 from "./saree_image_3.jpg";
import saree_image_4 from "./saree_image_4.jpg";
import saree_image_5 from "./saree_image_5.jpg";

import statue_image_1 from "./statue_image_1.jpg";
import statue_image_2 from "./statue_image_2.jpg";
import statue_image_3 from "./statue_image_3.jpg";
import statue_image_4 from "./statue_image_4.webp";
import statue_image_5 from "./statue_image_5.jpg";
import statue_image_6 from "./statue_image_6.jpg";
import statue_image_7 from "./statue_image_7.jpg";

import tags_image_1 from "./tags_image_1.jpg";
// import tags_image_2 from "./tags_image_2.jpg";

export const assets = {
  logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  placeholder_image_icon, // Added placeholder to exports
  cart_icon,
  nav_cart_icon,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
  main_banner_bg,
  main_banner_bg_sm,
  bottom_banner_image,
  bottom_banner_image_sm,
  add_address_image,
  box_icon,
};

export const categories = [
  {
    text: "Handmade Caps",
    path: "handmade-caps",
    image: Cap_image_1,
    bgColor: "#FEF6DA",
  },
  {
    text: "Traditional Chudi",
    path: "traditional-chudi",
    image: chudi_image_1,
    bgColor: "#FEE0E0",
  },
  {
    text: "Decorative Frames",
    path: "decorative-frames",
    image: frame_image_1,
    bgColor: "#F0F5DE",
  },
  {
    text: "Jewellery Sets",
    path: "jewellery-sets",
    image: jwellery_image_1,
    bgColor: "#E1F5EC",
  },
  {
    text: "Elegant Sarees",
    path: "elegant-sarees",
    image: saree_image_1,
    bgColor: "#FEE6CD",
  },
  {
    text: "Artistic Statues",
    path: "artistic-statues",
    image: statue_image_1,
    bgColor: "#E0F6FE",
  },
  {
    text: "Gift Tags",
    path: "gift-tags",
    image: tags_image_1,
    bgColor: "#F1E3F9",
  },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Best Sellers", url: "#" },
      { text: "Offers & Deals", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

export const features = [
  {
    icon: delivery_truck_icon,
    title: "Fastest Delivery",
    description: "Groceries delivered in under 30 minutes.",
  },
  {
    icon: leaf_icon,
    title: "Freshness Guaranteed",
    description: "Fresh produce straight from the source.",
  },
  {
    icon: coin_icon,
    title: "Affordable Prices",
    description: "Quality groceries at unbeatable prices.",
  },
  {
    icon: trust_icon,
    title: "Trusted by Thousands",
    description: "Loved by 10,000+ happy customers.",
  },
];

export const dummyProducts = [
  {
    _id: "cap001",
    name: "Handmade Woolen Cap - 1",
    category: "Caps",
    price: 250,
    offerPrice: 199,
    image: [Cap_image_1],
    description: [
      "Soft woolen handcrafted cap",
      "Perfect for winter season",
      "Trendy and warm",
    ],
    createdAt: "2025-05-06T09:00:00.000Z",
    updatedAt: "2025-05-06T09:00:00.000Z",
    inStock: true,
  },
  {
    _id: "cap002",
    name: "Handmade Woolen Cap - 2",
    category: "Caps",
    price: 260,
    offerPrice: 205,
    image: [Cap_image_2],
    description: ["Unique handmade design", "Comfortable fit"],
    createdAt: "2025-05-06T09:01:00.000Z",
    updatedAt: "2025-05-06T09:01:00.000Z",
    inStock: true,
  },
  {
    _id: "cap003",
    name: "Handmade Woolen Cap - 3",
    category: "Caps",
    price: 270,
    offerPrice: 215,
    image: [Cap_image_3],
    description: ["Knitted with premium wool", "Stylish and cozy"],
    createdAt: "2025-05-06T09:02:00.000Z",
    updatedAt: "2025-05-06T09:02:00.000Z",
    inStock: true,
  },
  {
    _id: "cap004",
    name: "Handmade Woolen Cap - 4",
    category: "Caps",
    price: 275,
    offerPrice: 220,
    image: [Cap_image_4],
    description: ["Warm and stretchable", "Great for outdoor use"],
    createdAt: "2025-05-06T09:03:00.000Z",
    updatedAt: "2025-05-06T09:03:00.000Z",
    inStock: true,
  },
  {
    _id: "cap005",
    name: "Handmade Woolen Cap - 5",
    category: "Caps",
    price: 280,
    offerPrice: 225,
    image: [Cap_image_5],
    description: ["Elegant color combinations", "Hand-stitched finish"],
    createdAt: "2025-05-06T09:04:00.000Z",
    updatedAt: "2025-05-06T09:04:00.000Z",
    inStock: true,
  },
  {
    _id: "cap006",
    name: "Handmade Woolen Cap - 6",
    category: "Caps",
    price: 290,
    offerPrice: 230,
    image: [Cap_image_6],
    description: ["Perfect for gifting", "Durable and stylish"],
    createdAt: "2025-05-06T09:05:00.000Z",
    updatedAt: "2025-05-06T09:05:00.000Z",
    inStock: true,
  },

  {
    _id: "chudi001",
    name: "Handmade Chudi - 1",
    category: "Chudi",
    price: 120,
    offerPrice: 99,
    image: [chudi_image_1],
    description: ["Bright color", "Made with eco-friendly beads"],
    createdAt: "2025-05-06T09:06:00.000Z",
    updatedAt: "2025-05-06T09:06:00.000Z",
    inStock: true,
  },
  {
    _id: "chudi002",
    name: "Handmade Chudi - 2",
    category: "Chudi",
    price: 130,
    offerPrice: 105,
    image: [chudi_image_2],
    description: ["Elegant design", "Comfortable for all-day wear"],
    createdAt: "2025-05-06T09:07:00.000Z",
    updatedAt: "2025-05-06T09:07:00.000Z",
    inStock: true,
  },
  {
    _id: "chudi003",
    name: "Handmade Chudi - 3",
    category: "Chudi",
    price: 135,
    offerPrice: 110,
    image: [chudi_image_3],
    description: ["Colorful and stylish", "Handcrafted with care"],
    createdAt: "2025-05-06T09:08:00.000Z",
    updatedAt: "2025-05-06T09:08:00.000Z",
    inStock: true,
  },
  {
    _id: "chudi004",
    name: "Handmade Chudi - 4",
    category: "Chudi",
    price: 140,
    offerPrice: 115,
    image: [chudi_image_4],
    description: ["Perfect for festive wear", "Unique handmade touch"],
    createdAt: "2025-05-06T09:09:00.000Z",
    updatedAt: "2025-05-06T09:09:00.000Z",
    inStock: true,
  },

  {
    _id: "frame001",
    name: "Handmade Frame - 1",
    category: "Frames",
    price: 500,
    offerPrice: 450,
    image: [frame_image_1],
    description: ["Handmade wall decor", "Ideal for living room"],
    createdAt: "2025-05-06T09:10:00.000Z",
    updatedAt: "2025-05-06T09:10:00.000Z",
    inStock: true,
  },
  {
    _id: "frame002",
    name: "Handmade Frame - 2",
    category: "Frames",
    price: 520,
    offerPrice: 470,
    image: [frame_image_2],
    description: ["Eco-friendly frame", "Elegant and aesthetic"],
    createdAt: "2025-05-06T09:11:00.000Z",
    updatedAt: "2025-05-06T09:11:00.000Z",
    inStock: true,
  },

  {
    _id: "jewellery001",
    name: "Handmade Jewellery - 1",
    category: "Jewellery",
    price: 300,
    offerPrice: 260,
    image: [jwellery_image_1],
    description: ["Trendy necklace", "Best for party wear"],
    createdAt: "2025-05-06T09:12:00.000Z",
    updatedAt: "2025-05-06T09:12:00.000Z",
    inStock: true,
  },
  {
    _id: "jewellery002",
    name: "Handmade Jewellery - 2",
    category: "Jewellery",
    price: 310,
    offerPrice: 270,
    image: [jwellery_image_2],
    description: ["Ethnic earrings", "Lightweight and fancy"],
    createdAt: "2025-05-06T09:13:00.000Z",
    updatedAt: "2025-05-06T09:13:00.000Z",
    inStock: true,
  },
  {
    _id: "jewellery003",
    name: "Handmade Jewellery - 3",
    category: "Jewellery",
    price: 320,
    offerPrice: 280,
    image: [jwellery_image_3],
    description: ["Eco-friendly craft", "Handmade luxury look"],
    createdAt: "2025-05-06T09:14:00.000Z",
    updatedAt: "2025-05-06T09:14:00.000Z",
    inStock: true,
  },
  {
    _id: "jewellery004",
    name: "Handmade Jewellery - 4",
    category: "Jewellery",
    price: 330,
    offerPrice: 285,
    image: [jwellery_image_4],
    description: ["Premium festive set", "Chic and modern style"],
    createdAt: "2025-05-06T09:15:00.000Z",
    updatedAt: "2025-05-06T09:15:00.000Z",
    inStock: true,
  },

  {
    _id: "saree001",
    name: "Handmade Saree - 1",
    category: "Sarees",
    price: 1000,
    offerPrice: 899,
    image: [saree_image_1],
    description: ["Graceful design", "Handwoven traditional saree"],
    createdAt: "2025-05-06T09:16:00.000Z",
    updatedAt: "2025-05-06T09:16:00.000Z",
    inStock: true,
  },
  {
    _id: "saree002",
    name: "Handmade Saree - 2",
    category: "Sarees",
    price: 1050,
    offerPrice: 920,
    image: [saree_image_2],
    description: ["Elegant print", "Soft and breathable fabric"],
    createdAt: "2025-05-06T09:17:00.000Z",
    updatedAt: "2025-05-06T09:17:00.000Z",
    inStock: true,
  },
  {
    _id: "saree003",
    name: "Handmade Saree - 3",
    category: "Sarees",
    price: 1100,
    offerPrice: 940,
    image: [saree_image_3],
    description: ["Luxurious texture", "Festival-ready style"],
    createdAt: "2025-05-06T09:18:00.000Z",
    updatedAt: "2025-05-06T09:18:00.000Z",
    inStock: true,
  },
  {
    _id: "saree004",
    name: "Handmade Saree - 4",
    category: "Sarees",
    price: 1150,
    offerPrice: 960,
    image: [saree_image_4],
    description: ["Classic motif design", "High-quality threadwork"],
    createdAt: "2025-05-06T09:19:00.000Z",
    updatedAt: "2025-05-06T09:19:00.000Z",
    inStock: true,
  },
  {
    _id: "saree005",
    name: "Handmade Saree - 5",
    category: "Sarees",
    price: 1200,
    offerPrice: 980,
    image: [saree_image_5],
    description: ["Color-rich look", "Durable and soft silk blend"],
    createdAt: "2025-05-06T09:20:00.000Z",
    updatedAt: "2025-05-06T09:20:00.000Z",
    inStock: true,
  },

  {
    _id: "statue001-img1",
    name: "Decorative Statue - Style 1",
    category: "Statues",
    price: 800,
    offerPrice: 699,
    image: [statue_image_1],
    description: [
      "Intricately designed statue - Style 1",
      "Perfect for gifting and decor",
      "Hand-painted and durable",
    ],
    createdAt: "2025-05-06T09:00:00.000Z",
    updatedAt: "2025-05-06T09:00:00.000Z",
    inStock: true,
  },
  {
    _id: "statue001-img2",
    name: "Decorative Statue - Style 2",
    category: "Statues",
    price: 800,
    offerPrice: 699,
    image: [statue_image_2],
    description: [
      "Intricately designed statue - Style 2",
      "Perfect for gifting and decor",
      "Hand-painted and durable",
    ],
    createdAt: "2025-05-06T09:00:00.000Z",
    updatedAt: "2025-05-06T09:00:00.000Z",
    inStock: true,
  },
  {
    _id: "statue001-img3",
    name: "Decorative Statue - Style 3",
    category: "Statues",
    price: 800,
    offerPrice: 699,
    image: [statue_image_3],
    description: [
      "Intricately designed statue - Style 3",
      "Perfect for gifting and decor",
      "Hand-painted and durable",
    ],
    createdAt: "2025-05-06T09:00:00.000Z",
    updatedAt: "2025-05-06T09:00:00.000Z",
    inStock: true,
  },
  {
    _id: "statue001-img4",
    name: "Decorative Statue - Style 4",
    category: "Statues",
    price: 800,
    offerPrice: 699,
    image: [statue_image_4],
    description: [
      "Intricately designed statue - Style 4",
      "Perfect for gifting and decor",
      "Hand-painted and durable",
    ],
    createdAt: "2025-05-06T09:00:00.000Z",
    updatedAt: "2025-05-06T09:00:00.000Z",
    inStock: true,
  },
  {
    _id: "statue001-img5",
    name: "Decorative Statue - Style 5",
    category: "Statues",
    price: 800,
    offerPrice: 699,
    image: [statue_image_5],
    description: [
      "Intricately designed statue - Style 5",
      "Perfect for gifting and decor",
      "Hand-painted and durable",
    ],
    createdAt: "2025-05-06T09:00:00.000Z",
    updatedAt: "2025-05-06T09:00:00.000Z",
    inStock: true,
  },
  {
    _id: "statue001-img6",
    name: "Decorative Statue - Style 6",
    category: "Statues",
    price: 800,
    offerPrice: 699,
    image: [statue_image_6],
    description: [
      "Intricately designed statue - Style 6",
      "Perfect for gifting and decor",
      "Hand-painted and durable",
    ],
    createdAt: "2025-05-06T09:00:00.000Z",
    updatedAt: "2025-05-06T09:00:00.000Z",
    inStock: true,
  },
  {
    _id: "statue001-img7",
    name: "Decorative Statue - Style 7",
    category: "Statues",
    price: 800,
    offerPrice: 699,
    image: [statue_image_7],
    description: [
      "Intricately designed statue - Style 7",
      "Perfect for gifting and decor",
      "Hand-painted and durable",
    ],
    createdAt: "2025-05-06T09:00:00.000Z",
    updatedAt: "2025-05-06T09:00:00.000Z",
    inStock: true,
  },
];


export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

export const dummyOrders = [
  {
    _id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[3],
        quantity: 2,
        _id: "67e2589a8f87e63366786401",
      },
    ],
    amount: 89,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "67e258798f87e633667863f2",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[0],
        quantity: 1,
        _id: "67e258798f87e633667863f3",
      },
      {
        product: dummyProducts[1],
        quantity: 1,
        _id: "67e258798f87e633667863f4",
      },
    ],
    amount: 43,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-25T07:17:13.068Z",
    updatedAt: "2025-03-25T07:17:13.068Z",
  },
];
