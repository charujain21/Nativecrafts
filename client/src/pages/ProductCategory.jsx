import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
    const { products } = useAppContext();
    const { category } = useParams(); // This is the category path from the URL, e.g., "sarees"
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Explicit loading state

    // Find the display details for the current category from assets.js
    // This helps get the proper display name like "Elegant Sarees"
    const currentCategoryDetails = categories.find(
        (item) => item.path.toLowerCase() === category.toLowerCase()
    );

    useEffect(() => {
        // Only proceed if products data from context is available
        if (products && products.length > 0) {
            setIsLoading(false); // Data is available, so stop loading
            const filtered = products.filter(
                (product) => product.category.toLowerCase() === category.toLowerCase()
            );
            setFilteredProducts(filtered);
        } else if (products && products.length === 0) {
            // Products array is available but empty (meaning no products in the store at all)
            setIsLoading(false);
            setFilteredProducts([]);
        }
        else {
            setIsLoading(true); // Products data not yet available (e.g., still fetching in AppContext)
            setFilteredProducts([]); // Ensure filteredProducts is empty while loading
        }
    }, [category, products]);

    // Display loading message if data is still being fetched or processed
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
                <p className="text-xl font-medium text-gray-700">Loading products...</p>
            </div>
        );
    }

    // Determine the display name for the category title
    const displayCategoryName = currentCategoryDetails
        ? currentCategoryDetails.text
        : category.charAt(0).toUpperCase() + category.slice(1); // Fallback to capitalized path

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-200px)]"> {/* Added container, padding, and min-height */}
            <div className="mb-8 text-center md:text-left">
                <p className="text-2xl md:text-3xl font-semibold text-gray-800">{displayCategoryName}</p>
                <div className="w-24 h-1 bg-primary rounded-full mt-2 mx-auto md:mx-0"></div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"> {/* Adjusted grid for better responsiveness */}
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                    <p className="text-xl font-medium text-gray-700">
                        No products found in {displayCategoryName}.
                    </p>
                    <p className="text-md text-gray-500 mt-2">Try exploring other categories or check back later!</p>
                </div>
            )}
        </div>
    );
};

export default ProductCategory;
