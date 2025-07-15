// import React, { useContext } from "react";
// import { CartContext } from "../../context/CartContext";
// import { getBackenedImageUrl } from "../../utils/backened-image";
// import "./UserCart.css";

// export default function UserCart() {
//   const { cartItems, removeFromCart } = useContext(CartContext);

//   const handleOrder = () => {
//     alert(`Order placed for ${cartItems.length} items!`);
//     // Add actual order logic here
//   };

//   if (cartItems.length === 0) {
//     return <div className="empty-cart">Your cart is empty.</div>;
//   }

//   const totalPrice = cartItems.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="cart-container">
//       <div className="cart-grid">
//         {cartItems.map((product) => (
//           <div key={product._id + "-" + product.size} className="cart-card">
//             {product.filepath ? (
//               <img
//                 src={getBackenedImageUrl(product.filepath)}
//                 alt={product.name}
//                 className="cart-card-image"
//               />
//             ) : (
//               <div className="cart-card-placeholder">No Image</div>
//             )}
//             <div className="cart-card-info">
//               <h3>{product.name}</h3>
//               <p>Size: {product.size}</p>
//               <p>Quantity: {product.quantity}</p>
//               <p>Price per unit: NRs. {product.price}</p>
//               <p>Total: NRs. {product.price * product.quantity}</p>
//             </div>
//             <div className="cart-card-actions">
//               <button
//                 className="remove-button"
//                 onClick={() => removeFromCart(product._id, product.size)}
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <h3>Total Price: NRs. {totalPrice}</h3>

//       <button className="order-button" onClick={handleOrder}>
//         Place Order ({cartItems.length} items)
//       </button>
//     </div>
//   );
// }


import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { getBackenedImageUrl } from "../../utils/backened-image"; // make sure this util exists
import "./UserCart.css";

export default function UserCart() {
  const { cartItems, removeFromCart, placeOrder } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    placeOrder();
    navigate("normal/order");
  };

  return (
    <div className="user-cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="empty-cart-message">Your cart is empty.</div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id + "-" + item.size} className="cart-item">
              {item.filepath ? (
                <img
                  src={getBackenedImageUrl(item.filepath)}
                  alt={item.name}
                  className="cart-item-image"
                />
              ) : (
                <div className="cart-item-image-placeholder">No Image</div>
              )}
              <div className="cart-item-details">
                <p className="item-name">{item.name}</p>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price per unit: NRs. {item.price}</p>
                <p>Total: NRs. {item.price * item.quantity}</p>
                <button onClick={() => removeFromCart(item._id, item.size)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3 className="total-price">Total Price: NRs. {totalPrice}</h3>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
