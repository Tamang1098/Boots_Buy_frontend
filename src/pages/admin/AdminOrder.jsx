// import React, { useEffect, useState } from "react";
// import { getBackenedImageUrl } from "../../utils/backened-image";
// import "./AdminOrder.css";

// export default function AdminOrder() {
//   const [orders, setOrders] = useState([]);
//   const [deliveryStatus, setDeliveryStatus] = useState({}); // { orderId: "Pending" | "Delivered" }

//   useEffect(() => {
//     const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
//     setOrders(savedOrders);

//     // Initialize delivery status to Pending
//     const initialStatus = {};
//     savedOrders.forEach((order) => {
//       initialStatus[order.id] = "Pending";
//     });
//     setDeliveryStatus(initialStatus);
//   }, []);

//   // Delete individual item from an order
//   const handleDeleteItem = (orderId, productId, size) => {
//     const updatedOrders = orders
//       .map((order) => {
//         if (order.id === orderId) {
//           const filteredItems = order.items.filter(
//             (item) => !(item._id === productId && item.size === size)
//           );
//           return { ...order, items: filteredItems };
//         }
//         return order;
//       })
//       .filter((order) => order.items.length > 0);

//     setOrders(updatedOrders);
//     localStorage.setItem("orders", JSON.stringify(updatedOrders));
//   };

//   // Handle delivery status change
//   const handleStatusChange = (orderId, status) => {
//     setDeliveryStatus((prev) => ({
//       ...prev,
//       [orderId]: status,
//     }));
//   };

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="no-orders">
//         <h2>No orders found.</h2>
//       </div>
//     );
//   }

//   // Group orders by user email
//   const groupedOrders = {};
//   orders.forEach((order) => {
//     const email = order.user?.email;
//     if (!groupedOrders[email]) {
//       groupedOrders[email] = [];
//     }
//     groupedOrders[email].push(order);
//   });

//   return (
//     <div className="admin-order-container">
//       <h2 className="admin-order-title">All User Orders</h2>

//       <table className="admin-order-table">
//         <thead>
//           <tr>
//             <th>User Details</th>
//             <th>Order Details</th>
//             <th>Delivery Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(groupedOrders).map(([email, userOrders]) => {
//             const user = userOrders[0].user;

//             // Combine all items from all orders
//             const allItems = userOrders.flatMap((order) => order.items);

//             // Calculate total price across all orders for this user
//             const allTotal = allItems.reduce(
//               (sum, item) => sum + item.price * item.quantity,
//               0
//             );

//             return (
//               <tr key={email}>
//                 <td className="user-details">
//                   <p><strong>Username:</strong> {user?.username || "N/A"}</p>
//                   <p><strong>Email:</strong> {user?.email || "N/A"}</p>
//                   <p><strong>Address:</strong> {user?.address || "N/A"}</p>
//                   <p><strong>Mobile:</strong> {user?.mobilenumber || "N/A"}</p>
//                 </td>

//                 <td className="order-details">
//                   {allItems.map((item, idx) => (
//                     <div key={idx} className="admin-order-item">
//                       {item.filepath ? (
//                         <img
//                           src={getBackenedImageUrl(item.filepath)}
//                           alt={item.name}
//                           className="admin-order-img"
//                         />
//                       ) : (
//                         <div className="admin-order-placeholder">No Image</div>
//                       )}
//                       <div>
//                         <h4>{item.name}</h4>
//                         <p>Size: {item.size}</p>
//                         <p>Quantity: {item.quantity}</p>
//                         <p>Price per unit: NRs. {item.price}</p>
//                         <p>Total: NRs. {item.price * item.quantity}</p>
//                         <button
//                           className="delete-order-btn"
//                           onClick={() =>
//                             handleDeleteItem(item.orderId || userOrders[0].id, item._id, item.size)
//                           }
//                         >
//                           Delete Item
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                   <h4>All Orders Total: NRs. {allTotal}</h4>
//                 </td>

//                 <td>
//                   <div className="status-radio-group">
//                     <label>
//                       <input
//                         type="radio"
//                         name={`status-${email}`}
//                         value="Pending"
//                         checked={deliveryStatus[userOrders[0].id] === "Pending"}
//                         onChange={() =>
//                           handleStatusChange(userOrders[0].id, "Pending")
//                         }
//                       />
//                       Pending
//                     </label>
//                     <label>
//                       <input
//                         type="radio"
//                         name={`status-${email}`}
//                         value="Delivered"
//                         checked={deliveryStatus[userOrders[0].id] === "Delivered"}
//                         onChange={() =>
//                           handleStatusChange(userOrders[0].id, "Delivered")
//                         }
//                       />
//                       Delivered
//                     </label>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { getBackenedImageUrl } from "../../utils/backened-image";
import "./AdminOrder.css";

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState({}); // { orderId: "Pending" | "Delivered" }

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);

    // Initialize delivery status to Pending
    const initialStatus = {};
    savedOrders.forEach((order) => {
      initialStatus[order.id] = "Pending";
    });
    setDeliveryStatus(initialStatus);
  }, []);

  // Delete individual item from an order
  const handleDeleteItem = (orderId, productId, size) => {
    const updatedOrders = orders
      .map((order) => {
        if (order.id === orderId) {
          const filteredItems = order.items.filter(
            (item) => !(item._id === productId && item.size === size)
          );
          return { ...order, items: filteredItems };
        }
        return order;
      })
      .filter((order) => order.items.length > 0);

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Handle delivery status change
  const handleStatusChange = (orderId, status) => {
    setDeliveryStatus((prev) => ({
      ...prev,
      [orderId]: status,
    }));
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="no-orders">
        <h2>No orders found.</h2>
      </div>
    );
  }

  // Group orders by user email
  const groupedOrders = {};
  orders.forEach((order) => {
    const email = order.user?.email;
    if (!groupedOrders[email]) {
      groupedOrders[email] = [];
    }
    groupedOrders[email].push(order);
  });

  return (
    <div className="admin-order-container">
      <h2 className="admin-order-title">All User Orders</h2>

      <table className="admin-order-table">
        <thead>
          <tr>
            <th>User Details</th>
            <th>Order Details</th>
            <th>Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedOrders).map(([email, userOrders]) => {
            const user = userOrders[0].user;

            // Combine all items from all orders
            const allItems = userOrders.flatMap((order) => order.items);

            // Calculate total price across all orders for this user
            const allTotal = allItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <tr key={email}>
                <td className="user-details">
                  <p><strong>Username:</strong> {user?.username || "N/A"}</p>
                  <p><strong>Email:</strong> {user?.email || "N/A"}</p>
                  <p><strong>Address:</strong> {user?.address || "N/A"}</p>
                  <p><strong>Mobile:</strong> {user?.mobilenumber || "N/A"}</p>
                  {userOrders[0].date ? (
                    <p>
                      <strong>Order Date:</strong>{" "}
                      {new Date(userOrders[0].date).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  ) : (
                    <p><strong>Order Date:</strong> N/A</p>
                  )}
                </td>

                <td className="order-details">
                  {allItems.map((item, idx) => (
                    <div key={idx} className="admin-order-item">
                      {item.filepath ? (
                        <img
                          src={getBackenedImageUrl(item.filepath)}
                          alt={item.name}
                          className="admin-order-img"
                        />
                      ) : (
                        <div className="admin-order-placeholder">No Image</div>
                      )}
                      <div>
                        <h4>{item.name}</h4>
                        <p>Size: {item.size}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price per unit: NRs. {item.price}</p>
                        <p>Total: NRs. {item.price * item.quantity}</p>
                        <button
                          className="delete-order-btn"
                          onClick={() =>
                            handleDeleteItem(item.orderId || userOrders[0].id, item._id, item.size)
                          }
                        >
                          Delete Item
                        </button>
                      </div>
                    </div>
                  ))}
                  <h4>All Orders Total: NRs. {allTotal}</h4>
                </td>

                <td>
                  <div className="status-radio-group">
                    <label>
                      <input
                        type="radio"
                        name={`status-${email}`}
                        value="Pending"
                        checked={deliveryStatus[userOrders[0].id] === "Pending"}
                        onChange={() =>
                          handleStatusChange(userOrders[0].id, "Pending")
                        }
                      />
                      Pending
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`status-${email}`}
                        value="Delivered"
                        checked={deliveryStatus[userOrders[0].id] === "Delivered"}
                        onChange={() =>
                          handleStatusChange(userOrders[0].id, "Delivered")
                        }
                      />
                      Delivered
                    </label>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
