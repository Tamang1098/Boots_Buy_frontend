import React from 'react'
import { useGetOneBrand } from '../../hooks/admin/useAdminBrand'
import { useParams } from "react-router-dom"
import { getBackenedImageUrl } from '../../utils/backened-image'

export default function ViewBrand() {
  const { id } = useParams()
  const { brand, error, isPending } = useGetOneBrand(id)

  console.log("Brand data:", brand) // ✅ Confirm what’s coming in

  if (isPending) {
    return <div className="text-center text-blue-500 mt-10 text-lg">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10 text-lg">Error: {error.message || error}</div>
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Brand Information</h2>

      <div className="mb-4">
        <p className="text-gray-700 text-lg font-medium">Brand Name:</p>
        <p className="text-black text-xl mt-1">{brand?.brandname || "N/A"}</p>
      </div>

      <div>
        <p className="text-gray-700 text-lg font-medium mb-2">Brand Image:</p>
        <img
          src={getBackenedImageUrl(brand?.filepath)}
          alt={brand?.brandname}
          className="w-full max-h-64 object-contain border border-gray-300 rounded-md"
        />
      </div>
    </div>
  )
}
