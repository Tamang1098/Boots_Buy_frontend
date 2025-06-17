import React from 'react';
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
            <th>Name</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((row) => (
            <tr key={row._id}>
              <td>{row.name}</td>
              <td>
                <img
                  className="brand-image"
                  src={getBackenedImageUrl(row.filepath)}
                  alt={row.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
