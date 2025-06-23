
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminProduct, useDeleteOneProduct } from "../../hooks/admin/useAdminProduct";
import { getBackenedImageUrl } from "../../utils/backened-image";
import DeleteModel from "../../components/DeleteModel";  // <--- updated import
import "./ProductTable.css";

export default function ProductTable() {
  const {
    data,
    error,
    isPending,
    products,
    pageNumber,
    setPageNumber,
    pagination,
    canNextPage,
    canPreviousPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
  } = useAdminProduct();

  const deleteProductHook = useDeleteOneProduct();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    deleteProductHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
      },
    });
  };

  if (error) return <>{error.message}</>;
  if (isPending) return <>Loading....</>;

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
    setPageNumber(1);
    setSearch(e.target.value);
  };

  return (
    <div className="product-table-container">
      <DeleteModel
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this Product?"
      />

      <h2 className="product-table-title">Product Table</h2>

      <div className="product-controls">
        <div>
          <label>Show</label>
          <select
            className="product-select"
            value={pagination.limit}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
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
            className="product-search"
            placeholder="Search products..."
            onChange={handleSearch}
            value={search}
          />
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((row) => (
            <tr key={row._id}>
              <td>
                {row.filepath ? (
                  <img
                    src={getBackenedImageUrl(row.filepath)}
                    alt={row.name}
                    className="product-image"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{row.name}</td>
              <td>{row.price}</td>
              <td className="flex gap-2 justify-center items-center">
                <Link to={`/admin/product/${row._id}`}>
                  <button className="action-button view-button">View</button>
                </Link>
                <Link to={`/admin/product/${row._id}/edit`}>
                  <button className="action-button edit-button">Edit</button>
                </Link>
                <button
                  onClick={() => setDeleteId(row._id)}
                  className="action-button delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
