// import React, { useContext } from "react";
// import { CartContext } from "../../context/CartContext";
// import { getBackenedImageUrl } from "../../utils/backened-image";
// import "./UserOrder.css";

// export default function UserOrder() {
//   const { orders, removeOrderItem } = useContext(CartContext);

//   const storedUser = localStorage.getItem("user");
//   const currentUser = storedUser ? JSON.parse(storedUser) : null;

//   // Filter orders for logged-in user only based on email
//   const userOrders = currentUser
//     ? orders.filter(order => order.user?.email === currentUser.email)
//     : [];

//   if (!userOrders || userOrders.length === 0) {
//     return (
//       <div className="no-orders">
//         <h2>No orders found.</h2>
//         <p>Place an order to see your items here.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="order-container">
//       <h2 className="order-title">My Orders</h2>

//       {userOrders.map((order) => {
//         const totalPrice = (order.items || []).reduce(
//           (sum, item) => sum + item.price * item.quantity,
//           0
//         );

//         return (
//           <div key={order.id} className="order-group">
//             <h3 className="order-date">Order Date: {order.date || "N/A"}</h3>

//             <div className="order-grid">
//               {(order.items || []).map((item, idx) => (
//                 <div key={idx} className="order-card">
//                   {item.filepath ? (
//                     <img
//                       src={getBackenedImageUrl(item.filepath)}
//                       alt={item.name}
//                     />
//                   ) : (
//                     <div className="order-card-placeholder">No Image</div>
//                   )}
//                   <h4>{item.name}</h4>
//                   <p>Size: {item.size}</p>
//                   <p>Quantity: {item.quantity}</p>
//                   <p>Price per unit: NRs. {item.price}</p>
//                   <p>Total: NRs. {item.price * item.quantity}</p>
//                   <button
//                     className="order-remove-button"
//                     onClick={() => removeOrderItem(order.id, item._id, item.size)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <h3 style={{ textAlign: "right", marginTop: "1rem" }}>
//               Order Total: NRs. {totalPrice}
//             </h3>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { getBackenedImageUrl } from "../../utils/backened-image";
import "./UserOrder.css";

export default function UserOrder() {
  const { removeOrderItem } = useContext(CartContext);

  const [userOrders, setUserOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const loadOrders = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(storedUser);

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (storedUser && storedUser.email) {
      const filtered = allOrders.filter(
        (order) => order.user?.email === storedUser.email
      );
      setUserOrders(filtered);
    }
  };

  useEffect(() => {
    loadOrders();

    // Listen to localStorage changes for live update
    const handleStorageChange = (e) => {
      if (e.key === "orders") {
        loadOrders();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle remove and refresh
  const handleRemove = (orderId, productId, size) => {
    removeOrderItem(orderId, productId, size);
    // Refresh orders after removing
    setTimeout(() => {
      loadOrders();
    }, 100); // short delay to ensure localStorage updated
  };

  if (!userOrders || userOrders.length === 0) {
    return (
      <div className="no-orders">
        <h2>No orders found.</h2>
        <p>Place an order to see your items here.</p>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h2 className="order-title">My Orders</h2>

      {userOrders.map((order) => {
        const totalPrice = (order.items || []).reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        return (
          <div key={order.id} className="order-group">
            {/* <h3 className="order-date">Order Date: {order.date || "N/A"}</h3> */}


            <h3 className="order-date">
  Order Date:{" "}
  {order.date
    ? new Date(order.date).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A"}
</h3>


            <div className="order-grid">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="order-card">
                  {item.filepath ? (
                    <img
                      src={getBackenedImageUrl(item.filepath)}
                      alt={item.name}
                    />
                  ) : (
                    <div className="order-card-placeholder">No Image</div>
                  )}
                  <h4>{item.name}</h4>
                  <p>Size: {item.size}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price per unit: NRs. {item.price}</p>
                  <p>Total: NRs. {item.price * item.quantity}</p>
                  <button
                    className="order-remove-button"
                    onClick={() => handleRemove(order.id, item._id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <h3 style={{ textAlign: "right", marginTop: "1rem" }}>
              Order Total: NRs. {totalPrice}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
