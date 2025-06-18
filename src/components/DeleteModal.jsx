import React from "react";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}) {
  if (!isOpen) return null;

  const handleCancel = () => {
    onClose(); // Only close modal, don't navigate back
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 w-[300px] rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="mb-4 text-gray-700">{description}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
