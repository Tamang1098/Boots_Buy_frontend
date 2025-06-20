import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminBrand, useDeleteOneBrand } from '../../hooks/admin/useAdminBrand';
import { getBackenedImageUrl } from '../../utils/backened-image';
import DeleteModal from '../DeleteModal';
import './BrandTable.css';

export default function BrandTable() {
  const { brands, error, isPending } = useAdminBrand();
  const deleteBrandHook = useDeleteOneBrand();
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    deleteBrandHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
      }
    });
  };

  if (error) return <>{error.message}</>;
  if (isPending) return <>Loading...</>;

  return (
    <div className="brand-table-container">
      <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this brand?"
      />

      <h2 className="brand-table-title">Brand Table</h2>
      <table className="brand-table">
        <thead>
          <tr>
            <th>BrandName</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((row) => (
            <tr key={row._id}>
              <td>{row.brandname}</td>
              <td>
                <img
                  className="brand-image"
                  src={getBackenedImageUrl(row.filepath)}
                  alt={row.brandname}
                />
              </td>
              <td className="flex gap-2 justify-center items-center">
                <Link to={`/admin/brand/${row._id}`}>
                  <button className="action-button view-button">View</button>
                </Link>
                <Link to={`/admin/brand/${row._id}/edit`}>
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
    </div>
  );
}

