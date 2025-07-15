import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetOneProduct } from "../../hooks/admin/useAdminProduct";
import { getBackenedImageUrl } from "../../utils/backened-image";
import "./UserViewProduct.css"; 

export default function UserViewProduct() {
  const { id } = useParams();
  const { product, error, isPending } = useGetOneProduct(id);

  useEffect(() => {
    if (product) {
      console.log("Product data:", product);
    }
  }, [product]);

  if (isPending) {
    return <div className="text-center text-blue-500 mt-10 text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10 text-lg">Error: {error.message || error}</div>;
  }

  return (
    <div className="product-view-container">
      <h2 className="product-view-title">Product Details</h2>

      <div className="product-view-card">
        {/* Product Image */}
        <div className="product-view-image-wrapper">
          {product?.filepath ? (
            <img
              src={getBackenedImageUrl(product.filepath)}
              alt={product.name}
              className="product-view-image"
            />
          ) : (
            <div className="product-view-placeholder">No Image</div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-view-info">
          <p className="product-view-label">Product Name:</p>
          <p className="product-view-value">{product?.name || "N/A"}</p>

          <p className="product-view-label">Price:</p>
          <p className="product-view-value">NRs. {product?.price || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
