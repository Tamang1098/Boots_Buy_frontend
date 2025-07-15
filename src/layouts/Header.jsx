// import React, { useContext } from 'react';
// import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../auth/AuthProvider';
// import './Header.css';
// import logo from '../assets/logo.jpg';

// export default function Header() {
//   const { user, logout, isAuthenticated } = useContext(AuthContext);

//   return (
//     <header className="header">
//       <div className="header__container">
//         <NavLink to="/" className="header__logo-link">
//           <img src={logo} alt="Logo" className="header__logo-image" />
//         </NavLink>

//         <nav className="header__nav">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? 'header__nav-button header__nav-button--active'
//                 : 'header__nav-button'
//             }
//           >
//             Home
//           </NavLink>

//           {!isAuthenticated && (
//             <>
//               <NavLink
//                 to="/login"
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'header__nav-button header__nav-button--active'
//                     : 'header__nav-button'
//                 }
//               >
//                 Login
//               </NavLink>
//               <NavLink
//                 to="/register"
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'header__nav-button header__nav-button--active'
//                     : 'header__nav-button'
//                 }
//               >
//                 Register
//               </NavLink>
//             </>
//           )}

//           {isAuthenticated && user?.role === 'normal' && (
//             <>
//               <NavLink
//                 to="/normal/product"
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'header__nav-button header__nav-button--active'
//                     : 'header__nav-button'
//                 }
//               >
//                 Product
//               </NavLink>
//               <NavLink
//                 to="/normal/cart"
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'header__nav-button header__nav-button--active'
//                     : 'header__nav-button'
//                 }
//               >
//                 Cart
//               </NavLink>
//               <NavLink
//                 to="/normal/order"
//                 className={({ isActive }) =>
//                   isActive
//                     ? 'header__nav-button header__nav-button--active'
//                     : 'header__nav-button'
//                 }
//               >
//                 Order
//               </NavLink>
//               <NavLink
//                 to="/"
//                 onClick={logout}
//                 className="header__nav-button"
//               >
//                 Logout
//               </NavLink>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../auth/AuthProvider';
import { CartContext } from '../context/CartContext';
import './Header.css';
import logo from '../assets/logo.jpg';

export default function Header() {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);

  return (
    <header className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo-link">
          <img src={logo} alt="Logo" className="header__logo-image" />
        </NavLink>

        <nav className="header__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'header__nav-button header__nav-button--active'
                : 'header__nav-button'
            }
          >
            Home
          </NavLink>

          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-button header__nav-button--active'
                    : 'header__nav-button'
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-button header__nav-button--active'
                    : 'header__nav-button'
                }
              >
                Register
              </NavLink>
            </>
          )}

          {isAuthenticated && user?.role === 'normal' && (
            <>
              <NavLink
                to="/normal/product"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-button header__nav-button--active'
                    : 'header__nav-button'
                }
              >
                Product
              </NavLink>
              <NavLink
                to="/normal/cart"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-button header__nav-button--active'
                    : 'header__nav-button'
                }
              >
                Cart
                {cartItems.length > 0 && (
                  <span className="cart-notification">{cartItems.length}</span>
                )}
              </NavLink>
              <NavLink
                to="/normal/order"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-button header__nav-button--active'
                    : 'header__nav-button'
                }
              >
              MyOrder
              </NavLink>
              <NavLink
                to="/"
                onClick={logout}
                className="header__nav-button"
              >
                Logout
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
