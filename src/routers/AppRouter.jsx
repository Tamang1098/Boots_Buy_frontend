import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import StateManage from '../pages/StateManage';
import LoginTest from '../pages/StateeManage'; 
import AboutUs from '../pages/AboutUs';
import PrivacyPolicy from '../pages/PrivacyPolicy';


// Layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Route Guards
import GuestRouter from '../routers/GuestRoute';
import NormalUserRoute from './NormalUserRoute';

// Admin Pages
import ProductManagement from '../pages/admin/ProductManagement';
import ViewProduct from '../pages/admin/ViewProduct';
import UpdateProduct from '../pages/admin/UpdateProduct';
import BrandManagement from '../pages/admin/BrandManagement';
import ViewBrand from '../pages/admin/ViewBrand';
import UpdateBrand from '../pages/admin/UpdateBrand';
import CreateBrand from '../pages/admin/CreateBrand';
import UpdateUser from '../pages/admin/UpdateUser';
import UserTable from '../pages/admin/UserManagement'; // ✅ Import added
import CreateProduct from '../pages/admin/CreateProduct';
import UserManagement from '../pages/admin/UserManagement';



export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Standalone test routes */}
        <Route path="/state-test" element={<StateManage />} />
        <Route path="/login-test" element={<LoginTest />} />

        {/* Public Routes with MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
            <Route path="/aboutus" element={<AboutUs />} />
  <Route path="/privacy" element={<PrivacyPolicy />} />

           <Route path="/normal/*" element={<NormalUserRoute />}>
          <Route path="order" element={<>My order</>} />
          <Route path="cart" element={<>My cart</>} />
          <Route path="*" element={<>404 not found</>} />
        </Route>

          {/* Guest-only routes */}
          <Route element={<GuestRouter />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

       

        {/* Admin Routes with AdminLayout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/*">
            <Route path="product" element={<ProductManagement />} />
             <Route path="product/:id" element={<ViewProduct />} />
            <Route path="product/:id/edit" element={<UpdateProduct />} />
            <Route path="product/create" element={<CreateProduct />} /> 

            <Route path="brand" element={<BrandManagement />} />
            <Route path="brand/:id" element={<ViewBrand />} />
            <Route path="brand/:id/edit" element={<UpdateBrand />} />
            <Route path="brand/create" element={<CreateBrand />} />


             <Route path="users" element={<UserManagement />} /> 
            {/* <Route path="users/:id/edit" element={<UpdateUser />} /> */}

            {/* Optional: Admin dashboard default page */}
            <Route index element={<div>Welcome to Admin Dashboard</div>} />
          </Route>
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

