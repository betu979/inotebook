import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


export default function Navbar() {
    let location = useLocation()
    const navigate = useNavigate()
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
            <Link className='navbar-brand' to="/">iNotebook</Link>
            <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle Navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id="navbarSupportedContent">
                <ul className='navbar-nav me-auto mb-2 mg-lg-0'>
                    <li className='nav-item'>
                        <Link className={`nav-link ${location.pathname==="/"?'active':''}`} aria-current='page' to="/">Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className={`nav-link ${location.pathname==="/about"?'active':''}`} to="/about">About</Link>
                    </li>
                </ul>
                {!localStorage.getItem('token')?<div className='d-flex'>
                    <Link className='btn btn-primary mx-1' to='/login' role='button'>Login</Link> 
                    <Link className='btn btn-primary mx-1' to='/signup' role='button'>Signup</Link> 
                </div>: <button className='btn btn-primary' onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    </nav>
  )
}


