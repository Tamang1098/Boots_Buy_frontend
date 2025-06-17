// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Homepage from '../pages/Homepage'
// import Login from '../pages/Login'
// import MainLayout from '../layouts/MainLayout'
// import StateManage from '../pages/StateManage'
// import LoginTest from '../pages/StateeManage'
// import Register from '../pages/Register'
// import GuestRoute from './GuestRoute'
// import NormalUserRoute from './NormalUserRoute'
// import Dashboard from '../pages/Dashboard'

// export default function AppRouter() {
//     return (
//         <BrowserRouter>
//             <Routes>
//                 <Route path='/state-test' element={<StateManage />}></Route>
            
//                 <Route element={<MainLayout />}>
//                     <Route path="/" element={<Homepage />}></Route>
//                     <Route element={<GuestRoute />}>
//                     <Route path="/login" element={<Login />}></Route>


//                     <Route path="/register" element={<Register />}></Route>
//                      <Route path="/dashboard" element={<Dashboard />}></Route>

//                     </Route>

                   
//                 </Route>

                
//                     <Route path='/normal/*' element={<NormalUserRoute />}> 

//                         <Route path = 'order' element={<>My Order</>}></Route>
//                         <Route path = 'cart' element={<>My Cart</>}></Route>
//                         <Route path = '*' element={<>404 Not Found</>}></Route>
//                     </Route>

//                    <Route path='/admin/*'>
//                          <Route element={<MainLayout/>}>
//                          <Route path="dashboard" element= {<>Admin Dashboard</>}></Route>
//                         <Route path="users" element= {<>Admin Users</>}></Route>
//                         <Route path="category" element= {<>Admin Category</>}></Route>
//                           <Route path="product" element= {<>Admin Product</>}></Route>
//                     </Route>
//                 </Route>
                    
                    

//             </Routes>


//         </BrowserRouter>
//     )
// }




import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import MainLayout from '../layouts/MainLayout';
import StateManage from '../pages/StateManage';
import LoginTest from '../pages/StateeManage'; // check this path is correct
import Register from '../pages/Register';
import GuestRouter from '../routers/GuestRoute';
import NormalUserRoute from './NormalUserRoute';
import ProductManagement from '../pages/admin/ProductManagement';
import AdminLayout from '../layouts/AdminLayout';
import CreateBrand from '../pages/admin/BrandManagement';
import BrandManagement from '../pages/admin/BrandManagement';
import ViewBrand from '../pages/admin/ViewBrand';
import UpdateBrand from '../pages/admin/UpdateBrand';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/state-test' element={<StateManage />} />
                <Route path='/login-test' element={<LoginTest />} />

                {/* Public Routes with MainLayout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Homepage />} />

                    {/* Guest Only Routes */}
                    <Route element={<GuestRouter />}>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                </Route>

                {/* Normal User Routes */}
                <Route path="/normal/*" element={<NormalUserRoute />}>
                    <Route path="order" element={<>My order</>} />
                    <Route path="cart" element={<>My cart</>} />
                    <Route path="*" element={<>404 not found</>} />
                </Route>

                {/* Admin Routes with Admin Layout */}
                <Route element={<AdminLayout />}>
                    <Route path="/admin/*">
                        <Route path="products" element={<ProductManagement />} />

                        <Route path='brands' element={< BrandManagement />}></Route>
                         <Route path='brand/:id' element={<ViewBrand/>}></Route>
                        <Route path='brand/:id/edit' element={<UpdateBrand/>}></Route>
                        <Route path='brands/create' element={<CreateBrand />} />
                        
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}