import React, { useState } from 'react';
import Product from './Product';

const Subcategory = ({
    subcategory,
    categoryId,
    onAddProduct,
    onDeleteProduct,
    onEditProduct,
    onMoveProduct, // Add this prop
}) => {
    const [newProductName, setNewProductName] = useState('');

    const handleAddProduct = () => {
        if (newProductName.trim() === '') {
            alert("Product names are required.");
            return;
        }
        const newProduct = { id: Date.now(), name: newProductName };
        onAddProduct(categoryId, subcategory.id, newProduct);
        setNewProductName('');
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const productId = event.dataTransfer.getData('productId');
        const sourceCategoryId = event.dataTransfer.getData('categoryId');
        const sourceSubcategoryId = event.dataTransfer.getData('subcategoryId');

        if (sourceCategoryId !== categoryId || sourceSubcategoryId !== subcategory.id) {
            onMoveProduct(productId, sourceCategoryId, sourceSubcategoryId, categoryId, subcategory.id);
        }
    };

    return (
        <div
            className="bg-gray-400 p-4 rounded mb-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <h3 className="text-xl font-bold mb-2">{subcategory.name}</h3>
            <div className='flex sm:flex-row flex-col gap-2 py-1 flex-wrap'>
                {subcategory.products.map((product, index) => (
                    <React.Fragment>
                        <Product
                            key={product.id}
                            product={product}
                            categoryId={categoryId}
                            subcategoryId={subcategory.id}
                            onDeleteProduct={onDeleteProduct}
                            onEditProduct={onEditProduct}
                        />
                    </React.Fragment>
                ))}
            </div>
            <div className="flex flex-col items-center justify-center sm:items-start sm:justify-start mt-4">
                <h4 className="text-lg font-semibold">Add New Product</h4>
                <div className="flex items-center mb-2 sm:flex-row flex-col gap-2">
                    <input
                        type="text"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        className="border rounded px-2 py-1 outline-none"
                        placeholder="Product name"
                    />
                    <button
                        onClick={handleAddProduct}
                        className="bg-blue-500 text-white rounded px-2 py-1"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Subcategory;
