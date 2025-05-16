// import React, { useState } from 'react'
// import { assets } from '../../assets/assets';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const AddProduct = () => {

//  const[files, setFiles] = useState([]);
//  const[name, setName] = useState('');
//  const[description, setDescription] = useState('');
//  const[category, setCategory] = useState('');
//  const[price, setPrice] = useState('');
//  const[offerPrice, setOfferPrice] = useState('');

//  const {axios} = useAppContext();

//  // Define categories array
//  const categories = [
//     { path: 'electronics', name: 'Electronics' },
//     { path: 'fashion', name: 'Fashion' },
//     { path: 'home', name: 'Home' },
//     { path: 'beauty', name: 'Beauty' },
//  ];

//  const onSubmitHandler = async (event) =>{
//     try {
//         event.preventDefault();

//         const productData = {
//             name,
//             description: description.split('\n'),
//             category,
//             price,
//             offerPrice,
//         }

//         const formData = new FormData();
//         formData.append('productData', JSON.stringify(productData));
//         for(let i = 0; i < files.length; i++){
//             formData.append('images', files[i]);
//         }

//         const {data} = await axios.post('/api/product/add', formData)

//         if(data.success){
//             toast.success(data.message);
//         setName('');
//         setDescription('');
//         setCategory('');
//         setPrice('');
//         setOfferPrice('');
//         setFiles([]);
//         }else{
//             toast.error(data.message);
//         }
//     } catch (error) {
//         toast.error(error.message);
//     }  
// }

//   return (
//     <div>
//       <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
//             <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
//                 <div>
//                     <p className="text-base font-medium">Product Image</p>
//                     <div className="flex flex-wrap items-center gap-3 mt-2">
//                         {Array(4).fill('').map((_, index) => (
//                             <label key={index} htmlFor={`image${index}`}>

//                                 <input onChange={(e) => {
//                                     const updatedFiles = [...files];
//                                     updatedFiles[index] = e.target.files[0];
//                                     setFiles(updatedFiles);
// }}
//                                 type="file" id={`image${index}`} hidden />

//                                 <img className="max-w-24 cursor-pointer" src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area} alt="uploadArea" width={100} height={100} />
//                             </label>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="flex flex-col gap-1 max-w-md">
//                     <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
//                     <input onChange={(e) => setName(e.target.value)} value={name}
//                     id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
//                 </div>
//                 <div className="flex flex-col gap-1 max-w-md">
//                     <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
//                     <textarea onChange={(e) => setDescription(e.target.value)} value={description}
//                     id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
//                 </div>
//                 <div className="w-full flex flex-col gap-1">
//                     <label className="text-base font-medium" htmlFor="category">Category</label>
//                     <select onChange={(e) => setCategory(e.target.value)} value={category}
//                     id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
//                         <option value="">Select Category</option>
//                         {categories.map((item, index)=>(
//                         <option key={index} value={item.path}>{item.path}</option>
//                         ))}
// </select>
// </div>
//                        <div className='flex items-center gap-5 flex-wrap'>
//                         <div className='flex-1 flex flex-col gap-1 w-32'>
//                         <label className="text-base font-medium" 
//                         htmlFor="product-price">Product Price</label>
//                         <input onChange={(e) => setPrice(e.target.value)} value={price}
//                         id="product-price" type="number" placeholder="0" 
//                         className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
//                     </div>
//                     <div className="flex-1 flex flex-col gap-1 w-32">
//                         <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
//                         <input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice}
//                         id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
//                     </div>
//                 </div>
//                 <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">ADD</button>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default AddProduct


import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');

    // const { axios } = useAppContext();
     const { axios, fetchProducts } = useAppContext(); // Destructure fetchProducts

    const categories = [
        // { path: 'electronics', name: 'Electronics' },
        // { path: 'fashion', name: 'Fashion' },
        // { path: 'home', name: 'Home' },
        // { path: 'beauty', name: 'Beauty' },
        { path: 'handmade-caps', name: 'Handmade Caps' },
        { path: 'traditional-chudi', name: 'Traditional Chudi' },
        { path: 'decorative-frames', name: 'Decorative Frames' },
        { path: 'jewellery-sets', name: 'Jewellery Sets' },
        { path: 'elegant-sarees', name: 'Elegant Sarees' },
        { path: 'artistic-statues', name: 'Artistic Statues' },
        { path: 'gift-tags', name: 'Gift Tags' },
        // ... any other categories you might want for display purposes
    ];

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offerPrice,
            };

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));
            // Only append actual files to FormData
            files.forEach(file => {
                if (file) {
                    formData.append('images', file);
                }
            });

            console.log('FormData:', formData); // Debugging

            const { data } = await axios.post('/api/product/add', formData);

            if (data.success) {
                toast.success(data.message);
                setName('');
                setDescription('');
                setCategory('');
                setPrice('');
                setOfferPrice('');
                setFiles([]);
                fetchProducts(); // Re-fetch products to update the list globally
            } else {
                toast.error(data.message);
            }
        } catch (error) {
const errorMessage = error.response?.data?.message || error.message;
            console.error('Error adding product:', errorMessage, error);
            toast.error(errorMessage);
        }
    };

// Effect for cleaning up object URLs
    useEffect(() => {
        const objectUrls = files.filter(file => file instanceof File).map(file => URL.createObjectURL(file));
        
        // Cleanup function
        return () => {
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
        // Re-run when files array changes to manage new/removed object URLs.
        // Note: This cleanup is basic. For more complex scenarios with individual file removals,
        // you might need more granular control over which URLs are active.
    }, [files]);

    return (
        <div>
            <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
                <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
                    <div>
                        <p className="text-base font-medium">Product Image</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            {Array(4).fill('').map((_, index) => (
                                <label key={index} htmlFor={`image${index}`}>
                                    <input
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file && file.type.startsWith('image/')) {
                                                const updatedFiles = [...files];
                                                updatedFiles[index] = file;
                                                setFiles(updatedFiles);
                                            } else {
                                                toast.error('Please select a valid image file');
                                            }
                                        }}
                                        type="file"
                                        id={`image${index}`}
                                        hidden
                                         accept="image/*" // Suggests to the browser to filter for image files
                                    />
                                    <img
                                        className="max-w-24 cursor-pointer"
                                        src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                                        alt="uploadArea"
                                        width={100}
                                        height={100}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            id="product-name"
                            type="text"
                            placeholder="Type here"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            id="product-description"
                            rows={4}
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                            placeholder="Type here"
                        ></textarea>
                    </div>
                    <div className="w-full flex flex-col gap-1">
                        <label className="text-base font-medium" htmlFor="category">Category</label>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            id="category"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        >
                            <option value="">Select Category</option>
                            {categories.map((item, index) => (
                                <option key={index} value={item.path}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-5 flex-wrap">
                        <div className="flex-1 flex flex-col gap-1 w-32">
                            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                            <input
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                id="product-price"
                                type="number"
                                placeholder="0"
                                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                required
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-1 w-32">
                            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                            <input
                                onChange={(e) => setOfferPrice(e.target.value)}
                                value={offerPrice}
                                id="offer-price"
                                type="number"
                                placeholder="0"
                                className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                                required
                            />
                        </div>
                    </div>
                    <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">ADD</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;