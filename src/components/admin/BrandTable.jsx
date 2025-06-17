import React from 'react';
import { Link } from 'react-router-dom'; 
import { useAdminBrand } from '../../hooks/admin/useAdminBrand';
import { getBackenedImageUrl } from '../../utils/backened-image';
import './BrandTable.css';

export default function BrandTable() {
  const { brands, error, isPending } = useAdminBrand();

  if (error) return <>{error.message}</>;
  // if (isPending) return <>Loading...</>;

  return (
    <div className="brand-table-container">
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
                  alt={row.name}
                />
              </td>
              <td>
                <Link to={`/admin/brand/${row._id}`}>
                  <button>View</button>
                </Link>{' '}
                <Link to={`/admin/brand/${row._id}/edit`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
