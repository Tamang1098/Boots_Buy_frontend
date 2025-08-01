// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import AppRouter from './routers/AppRouter.jsx'

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { Slide, ToastContainer } from 'react-toastify'
// import AuthContextProvider from './auth/AuthProvider.jsx'
// const queryClient= new QueryClient() 

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthContextProvider>
//        <QueryClientProvider client={queryClient}>
//         <AppRouter />
//         <ToastContainer
//         position='top-center'
//         autoClose={2000}
//         hideProgressBar={false}
//         theme='dark'
//         transition={Slide} // Bouce, slide,zoom,flip
//         />

//     </QueryClientProvider>

//     </AuthContextProvider>
   
  
//   </StrictMode>,
// )



import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRouter from './routers/AppRouter.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slide, ToastContainer } from 'react-toastify';
import AuthContextProvider from './auth/AuthProvider.jsx';
import CartProvider from './context/CartContext.jsx';  // <-- import CartProvider here

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <CartProvider>  {/* <-- Wrap here */}
        <QueryClientProvider client={queryClient}>
          <AppRouter />
          <ToastContainer
            position='top-center'
            autoClose={2000}
            hideProgressBar={false}
            theme='dark'
            transition={Slide} // Bounce, slide, zoom, flip
          />
        </QueryClientProvider>
      </CartProvider>
    </AuthContextProvider>
  </StrictMode>
);
