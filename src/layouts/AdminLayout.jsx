
// import { Outlet, NavLink } from "react-router-dom";

// import {AuthContext} from "../auth/AuthProvider";
// import { useContext } from "react";
// import './AdminLayout.css';


// export default function AdminLayout() {
//     const { user, logout } = useContext(AuthContext);

//     return (
//         <div className="flex h-screen">
//             <aside className="w-64 shadow-lg p-4">
//                 <h2 className="text-xl  font-bold mb-6">Admin Panel</h2>
//                 <nav className="flex flex-col space-y-3 ">
//                     <NavLink
//                         to="/admin/users"
//                         className={({ isActive }) =>
//                             `${
//                                 isActive
//                                     ? "text-red-600 font-semibold"
//                                     : "text-gray-700 hover:text-red-500"
//                             } text-white block`
//                         }
//                     >
//                         Users
//                     </NavLink>
//                     <NavLink
//                         to="/admin/products"
//                         className={({ isActive }) =>
//                             `${
//                                 isActive
//                                     ? "text-red-600 font-semibold"
//                                     : "text-gray-700 hover:text-red-500"
//                             } text-white block`
//                         }
//                     >
//                         Products
//                     </NavLink>
//                     <NavLink
//                         to="/admin/categories"
//                         className={({ isActive }) =>
//                             `${
//                                 isActive
//                                     ? "text-red-600 font-semibold"
//                                     : "text-gray-700 hover:text-red-500"
//                             } text-white block`
//                         }
//                     >
//                         Categories
//                     </NavLink>
//                 </nav>
//             </aside>
//             <div className="flex-1 flex flex-col">
//                 {/* Header */}
//                 <header className="shadow-md px-6 py-4 flex justify-between items-center">
//                     <span className="text-lg font-medium">
//                         Welcome, {user?.username || "Admin"}
//                     </span>
//                     <button
//                         onClick={logout}
//                         className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                     >
//                         Logout
//                     </button>
//                 </header>

//                 {/* Content area */}
//                 <main className="p-6 overflow-y-auto flex-1">
//                     <Outlet />
//                 </main>
//                 <footer className="text-center">
//                     2025 @ My App
//                 </footer>
//             </div>
//         </div>
//     );
// }



import { useState, useContext } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import "./AdminLayout.css";
import adminImage from "../assets/admin.jpg";

export default function AdminLayout() {
  const { user, logout } = useContext(AuthContext);

  // Initialize isLoggedIn from sessionStorage or false
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("adminLoggedIn") === "true";
  });

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const defaultAdmin = { username: "admin", password: "admin123" };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      credentials.username === defaultAdmin.username &&
      credentials.password === defaultAdmin.password
    ) {
      setIsLoggedIn(true);
      setError("");
      sessionStorage.setItem("adminLoggedIn", "true"); // Persist login in sessionStorage only
    } else {
      setError("Invalid admin credentials");
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setCredentials({ username: "", password: "" });
    setError("");
    sessionStorage.removeItem("adminLoggedIn"); // Clear on logout
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-fullpage">
        <img src={adminImage} alt="Admin" className="admin-image" />
        <form onSubmit={handleLogin} className="admin-login-box">
          <h2 className="admin-login-title">🔐 Admin Login</h2>
          {error && <p className="admin-error">{error}</p>}
          <input
            type="text"
            placeholder="Enter username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            className="admin-input"
            required
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="admin-input"
            required
            autoComplete="current-password"
          />
          <button type="submit" className="admin-login-btn">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 shadow-lg p-4 admin-sidebar">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-black hover:text-red-500"
              } block`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-black hover:text-red-500"
              } block`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/admin/brands"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-red-600 font-semibold"
                  : "text-black hover:text-red-500"
              } block`
            }
          >
            Brands
          </NavLink>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="shadow-md px-6 py-4 flex justify-between items-center admin-header">
          <span className="text-lg font-medium"></span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </header>

        <main className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </main>
        <footer className="text-center py-2 bg-gray-100">
          &copy; {new Date().getFullYear()} Boot's Buy. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
