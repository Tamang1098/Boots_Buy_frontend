// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; 
// import { useAdminBrand, useDeleteOneBrand } from '../../hooks/admin/useAdminBrand';
// import { getBackenedImageUrl } from '../../utils/backened-image';
// import DeleteModal from '../DeleteModal';
// import './BrandTable.css';

// function Welcome(props){
//   return <h1>{props.name}</h1>
// }

// function NameComponent({ name, age }) {
//   return <h1>{name} {age}</h1>
// }

// export default function BrandTable() {
//   const { brands, error, isPending } = useAdminBrand();
//   const deleteBrandHook = useDeleteOneBrand();
//   const [deleteId, setDeleteId] = useState(null);

//   const handleDelete = () => {
//     deleteBrandHook.mutate(deleteId, {
//       onSuccess: () => {
//         setDeleteId(null);
//       }
//     });
//   };

//   if (error) return <>{error.message}</>;
//   if (isPending) return <>Loading...</>;

//   return (
//     <div className="brand-table-container">
//       {/* <Welcome name="Ram" />
//       <NameComponent name="Shyam" age="20" /> */}

//       <DeleteModal
//         isOpen={deleteId}
//         onClose={() => setDeleteId(null)}
//         onConfirm={handleDelete}
//         title="Delete Confirmation"
//         description="Are you sure you want to delete this brand?"
//       />

//       <h2 className="brand-table-title">Brand Table</h2>
//       <table className="brand-table">
//         <thead>
//           <tr>
//             <th>BrandName</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {brands.map((row) => (
//             <tr key={row._id}>
//               <td>{row.brandname}</td>
//               <td>
//                 <img
//                   className="brand-image"
//                   src={getBackenedImageUrl(row.filepath)}
//                   alt={row.brandname}
//                 />
//               </td>
//               <td>
//                 <Link to={`/admin/brand/${row._id}`}>
//                   <button>View</button>
//                 </Link>{' '}
//                 <Link to={`/admin/brand/${row._id}/edit`}>
//                   <button>Edit</button>
//                 </Link>
//                 <button
//                   onClick={() => setDeleteId(row._id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }






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
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-white hover:text-black hover:border-blue-500 border-2">
                    View
                  </button>
                </Link>
                <Link to={`/admin/brand/${row._id}/edit`}>
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-white hover:text-black hover:border-green-500 border-2">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => setDeleteId(row._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-white hover:text-black hover:border-red-500 border-2"
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
