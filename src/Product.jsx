import React, { useState } from 'react'

export default function Product({
  product: { id, images, title, category, price, discountPercentage, rating },
  del,
  onUpdate
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({
    title,
    price,
    category,
  })

  function calcDiscount() {
    const numericPrice = Number(price)
    if (discountPercentage) {
      return (numericPrice - numericPrice * (discountPercentage / 100)).toFixed(2);
    }
    return numericPrice.toFixed(2);
  }

  function handleChange(e) {
    const { name, value } = e.target
    setEditedData({
      ...editedData,
      [name]: name === 'price' ? Number(value) : value
    })
  }

  function handleSave() {
    onUpdate(id, editedData)
    setIsEditing(false)
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 flex flex-col border border-gray-100 hover:shadow-2xl ">
      
      
      <div className="relative w-full h-64 overflow-hidden group">
        <img
          src={images && images.length > 0 ? images[0] : 'https://via.placeholder.com/300x300?text=No+Image'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
         
        {discountPercentage && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
            -{discountPercentage}%
          </div>
        )}

        
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
          ⭐ {rating}
        </div>
 
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => del(id)}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>

  
      {!isEditing ? (
        <div className="p-6 flex flex-col gap-4 flex-1">
          
          <div className="flex justify-between items-start">
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
 
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
            {title}
          </h2>

        
          <div className="flex items-center gap-3 mt-auto">
            {discountPercentage ? (
              <>
                <span className="text-2xl font-bold text-green-600">
                  ${calcDiscount()}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ${Number(price).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                ${Number(price).toFixed(2)}
              </span>
            )}
          </div>

        
        </div>
      ) : (
        <div className="p-6 flex flex-col gap-4 bg-gradient-to-br from-gray-50 to-white flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Edit Product</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={editedData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Product title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={editedData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Product category"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={editedData.price}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Product price"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}