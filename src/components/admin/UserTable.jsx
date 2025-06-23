


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminUser, useDeleteOneUser } from '../../hooks/admin/useAdminUser';
import DeleteModal from '../DeleteModal';
// import './UserTable.css'; 
import { toast } from 'react-toastify';

export default function UserTable() {
  const [deleteId, setDeleteId] = useState(null);
  const deleteOneUserHook = useDeleteOneUser();

  const {
    users = [],
    error,
    isPending,
    pageNumber,
    setPageNumber,
    pagination = { page: 1, totalPages: 1 },
    canNextPage,
    canPreviousPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
  } = useAdminUser();

  const handleDelete = () => {
    deleteOneUserHook.mutate(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
        toast.success('User deleted successfully');
      },
      onError: (error) => {
        toast.error('Failed to delete user: ' + (error?.message || 'Unknown error'));
      },
    });
  };

  const handleSearch = (e) => {
    setPageNumber(1);
    setSearch(e.target.value);
  };

  const handlePrev = () => {
    if (canPreviousPage) setPageNumber((prev) => prev - 1);
  };

  const handleNext = () => {
    if (canNextPage) setPageNumber((prev) => prev + 1);
  };

  if (isPending) return <div>Loading users...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user-table-container">
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this user?"
      />

      <h2 className="user-table-title">User Table</h2>

      {/* Controls */}
      <div className="controls">
        <label>Show:</label>
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>

        <label>Search:</label>
        <input
          type="text"
          placeholder="Search by name or username"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Table */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => (
            <tr key={row._id}>
              <td>{row.username}</td>
              <td>{row.email}</td>
              <td>{row.password}</td>
              <td className="flex gap-2 justify-center items-center">
                <Link to={`/admin/users/${row._id}/edit`}>
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

      {/* Pagination */}
      <div className="pagination-controls mt-4 flex items-center justify-between">
        <button onClick={handlePrev} disabled={!canPreviousPage}>
          Back
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button onClick={handleNext} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

