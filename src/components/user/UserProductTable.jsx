// import React, { useCallback } from "react";
// import debounce from "lodash.debounce";
// import { Link } from "react-router-dom";
// import { useAdminProduct } from "../../hooks/admin/useAdminProduct";
// import { getBackenedImageUrl } from "../../utils/backened-image";
// import "./UserProductTable.css";

// export default function UserProductTable() {
//   const {
//     error,
//     isPending,
//     products,
//     pageNumber,
//     setPageNumber,
//     pagination,
//     canNextPage,
//     canPreviousPage,
//     pageSize,
//     setPageSize,
//     search,
//     setSearch,
//   } = useAdminProduct();

//   // ✅ Move all hooks before returns
//   const debouncedSearch = useCallback(
//     debounce((value) => {
//       setPageNumber(1);
//       setSearch(value);
//     }, 300),
//     []
//   );

//   const handlePrev = () => {
//     if (canPreviousPage) {
//       setPageNumber((prev) => prev - 1);
//     }
//   };

//   const handleNext = () => {
//     if (canNextPage) {
//       setPageNumber((prev) => prev + 1);
//     }
//   };

//   const handleSearch = (e) => {
//     debouncedSearch(e.target.value);
//   };

//   const handleAddToCart = (productId) => {
//     console.log("Add to cart clicked for product:", productId);
//   };

//   // ✅ Now it is safe to use early returns
//   if (error) return <>Error: {error.message}</>;
//   if (isPending) return <>Loading....</>;

//   return (
//     <div className="product-container">
//       <h2 className="product-title">Products</h2>

//       <div className="product-controls">
//         <div>
//           <label>Show</label>
//           <select
//             value={pagination.limit}
//             onChange={(e) => setPageSize(Number(e.target.value))}
//           >
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={30}>30</option>
//           </select>
//         </div>

//         <div>
//           <label>Search:</label>
//           <input
//             type="text"
//             placeholder="Search products..."
//             onChange={handleSearch}
//             defaultValue={search}
//           />
//         </div>
//       </div>

//       <div className="product-grid">
//         {products.map((product) => (
//           <div key={product._id} className="product-card">
//             {product.filepath ? (
//               <img
//                 src={getBackenedImageUrl(product.filepath)}
//                 alt={product.name}
//                 className="product-card-image"
//               />
//             ) : (
//               <div className="product-card-placeholder">No Image</div>
//             )}
//             <h3 className="product-card-name">{product.name}</h3>
//             <p className="product-card-price">NRs. {product.price}</p>
//             <div className="product-card-actions">
//               <Link to={`/normal/product/${product._id}`}>
//                 <button className="action-button view-button">View Details</button>
//               </Link>
//               <button
//                 onClick={() => handleAddToCart(product._id)}
//                 className="action-button add-button"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="product-pagination">
//         <button onClick={handlePrev} disabled={!canPreviousPage}>
//           ⬅ Back
//         </button>
//         <span>
//           Page {pagination.page} of {pagination.totalPages}
//         </span>
//         <button onClick={handleNext} disabled={!canNextPage}>
//           Next ➡
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import { Link, useNavigate } from "react-router-dom";
import { useAdminProduct } from "../../hooks/admin/useAdminProduct";
import { getBackenedImageUrl } from "../../utils/backened-image";
import { CartContext } from "../../context/CartContext";
import "./UserProductTable.css";

export default function UserProductTable() {
  const {
    error,
    isPending,
    products,
    pageNumber,
    setPageNumber,
    pagination,
    canNextPage,
    canPreviousPage,
    setPageSize,
    search,
    setSearch,
  } = useAdminProduct();

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedQuantities, setSelectedQuantities] = useState({});

  const sizes = ["6", "7", "8", "9", "10"];

  const debouncedSearch = useCallback(
    debounce((value) => {
      setPageNumber(1);
      setSearch(value);
    }, 300),
    []
  );

  const handlePrev = () => {
    if (canPreviousPage) {
      setPageNumber((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canNextPage) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    setSelectedQuantities((prev) => ({ ...prev, [productId]: quantity }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product._id] || sizes[0];
    const quantity = selectedQuantities[product._id] || 1;

    addToCart({ ...product, size, quantity });
    navigate("/normal/cart");
  };

  if (error) return <>Error: {error.message}</>;
  if (isPending) return <>Loading....</>;

  return (
    <div className="product-container">
      <h2 className="product-title">Products</h2>

      <div className="product-controls">
        <div>
          <label>Show</label>
          <select
            value={pagination.limit}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>

        <div>
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}
            defaultValue={search}
          />
        </div>
      </div>

      <div className="product-grid">
        {products.map((product) => {
          const quantity = selectedQuantities[product._id] || 1;
          const totalPrice = product.price * quantity;
          return (
            <div key={product._id} className="product-card">
              {product.filepath ? (
                <img
                  src={getBackenedImageUrl(product.filepath)}
                  alt={product.name}
                  className="product-card-image"
                />
              ) : (
                <div className="product-card-placeholder">No Image</div>
              )}
              <h3 className="product-card-name">{product.name}</h3>
              <p className="product-card-price">NRs. {product.price}</p>
              <p className="product-card-total">Total: NRs. {totalPrice}</p>

              <div className="size-quantity-selectors">
                <label>
                  Size:{" "}
                  <select
                    value={selectedSizes[product._id] || sizes[0]}
                    onChange={(e) => handleSizeChange(product._id, e.target.value)}
                  >
                    {sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Qty:{" "}
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(product._id, Number(e.target.value))
                    }
                    style={{ width: "50px" }}
                  />
                </label>
              </div>

              <div className="product-card-actions">
                <Link to={`/normal/product/${product._id}`}>
                  <button className="action-button view-button">View Details</button>
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="action-button add-button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="product-pagination">
        <button onClick={handlePrev} disabled={!canPreviousPage}>
          ⬅ Back
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button onClick={handleNext} disabled={!canNextPage}>
          Next ➡
        </button>
      </div>
    </div>
  );
}
