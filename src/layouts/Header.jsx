import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../auth/AuthProvider'
import './Header.css'


export default function Header() {
  const {user, logout}=useContext(AuthContext)
  return (
    <header>
        <div className='container ms-auto'>
            <nav className='space-x-4'>
                <NavLink to="/">Home</NavLink>
                {
                  !user && (
                    <>
                      <NavLink to="/login">Login</NavLink>
                      <Link to="/register">Register</Link>

                    </>
                  )
                }
                {
                  user && (
                    <>
                
                    <NavLink onClick={logout}>logout</NavLink>
                    </>
                  )
                }
         
            </nav>
        </div>
    </header>
  )
}
