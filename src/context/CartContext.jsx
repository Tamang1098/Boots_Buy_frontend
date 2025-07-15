import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const index = prev.findIndex(
        (item) => item._id === product._id && item.size === product.size
      );
      if (index !== -1) {
        const updated = [...prev];
        updated[index].quantity += product.quantity || 1;
        return updated;
      }
      return [...prev, { ...product, quantity: product.quantity || 1, size: product.size || "7" }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item._id === productId && item.size === size))
    );
  };

  // const placeOrder = () => {
  //   if (cartItems.length === 0) {
  //     alert("Cart is empty");
  //     return;
  //   }

  //   const storedUser = localStorage.getItem("user");
  //   if (!storedUser) {
  //     alert("User not logged in.");
  //     return;
  //   }

  //   const currentUser = JSON.parse(storedUser);

  //   const now = new Date();
  //   const formattedDate = now.toLocaleString("en-US", {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //   });

  //   const newOrder = {
  //     id: Date.now(),
  //     date: formattedDate,
  //     user: {
  //       username: currentUser.username,
  //       email: currentUser.email,
  //       address: currentUser.address,
  //       mobilenumber: currentUser.mobilenumber,
  //     },
  //     items: [...cartItems],
  //   };

  //   setOrders((prev) => [...prev, newOrder]);
  //   setCartItems([]);
  //   alert("Order placed successfully!");
  // };



  const placeOrder = () => {
  if (cartItems.length === 0) {
    alert("Cart is empty");
    return;
  }

  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    alert("User not logged in.");
    return;
  }

  const currentUser = JSON.parse(storedUser);

  const now = new Date();
  const isoDate = now.toISOString(); // ✅ Save as ISO string

  const newOrder = {
    id: Date.now(),
    date: isoDate, // ✅ Store raw ISO date
    user: {
      username: currentUser.username,
      email: currentUser.email,
      address: currentUser.address,
      mobilenumber: currentUser.mobilenumber,
    },
    items: [...cartItems],
  };

  setOrders((prev) => [...prev, newOrder]);
  setCartItems([]);
  alert("Order placed successfully!");
};


  const removeOrderItem = (orderId, productId, size) => {
    setOrders((prevOrders) =>
      prevOrders
        .map((order) => {
          if (order.id === orderId) {
            const filteredItems = order.items.filter(
              (item) => !(item._id === productId && item.size === size)
            );
            return { ...order, items: filteredItems };
          }
          return order;
        })
        .filter((order) => order.items.length > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        orders,
        placeOrder,
        removeOrderItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
