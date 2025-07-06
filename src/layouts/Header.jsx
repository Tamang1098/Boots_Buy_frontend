


// import React, { useContext } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import { AuthContext } from '../auth/AuthProvider';
// import './Header.css';
// import logo from '../assets/logo.jpg';

// export default function Header() {
//   const { user, logout, isAuthenticated } = useContext(AuthContext);

//   return (
//     <header className="header">
//       <div className="container">
//         <div className="header-logo">
//           <Link to="/">
//             <img src={logo} alt="Logo" />
//           </Link>
//         </div>
//         <nav>
//           <NavLink to="/">Home</NavLink>
//           {!isAuthenticated && (
//             <>
//               <NavLink to="/login">Login</NavLink>
//               <Link to="/register">Register</Link>
//             </>
//           )}
//           {isAuthenticated && user?.role === "normal" && (
//             <>
//               <NavLink to="/normal/product">Product</NavLink>
//               <NavLink to="/normal/cart">Cart</NavLink>
//               <NavLink to="/normal/order">Order</NavLink>
//               <NavLink to="/" onClick={logout}>Logout</NavLink>
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
import './Header.css';
import logo from '../assets/logo.jpg';

export default function Header() {
  const { user, logout, isAuthenticated } = useContext(AuthContext);

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
              {/* <NavLink
                to="/normal/product"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-button header__nav-button--active'
                    : 'header__nav-button'
                }
              >
                Product
              </NavLink> */}
              <NavLink
                to="/normal/cart"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-button header__nav-button--active'
                    : 'header__nav-button'
                }
              >
                Cart
              </NavLink>
              <NavLink
                to="/normal/order"
                className={({ isActive }) =>
                  isActive
                    ? 'header__nav-button header__nav-button--active'
                    : 'header__nav-button'
                }
              >
                Order
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
