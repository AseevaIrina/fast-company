import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <ul className="nav mb-4">
            <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">Main</Link>
            </li>
            <li className="nav-item">
                <Link to="/login" className="nav-link active" aria-current="page">Login</Link>
            </li>
            <li className="nav-item">
                <Link to="/users" className="nav-link active" aria-current="page">Users</Link>
            </li>
        </ul>
    )
}

export default NavBar
