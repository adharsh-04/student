import React from 'react'
import {Link} from "react-router-dom"

function Header() {
  return (
    <header className="bg-warning m-4">
        <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand text-secondary" to="/signin">StudentApp</Link>
          <div className="justify-content-end" >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link nav-link-custom btn btn-info text-primary " to="signin">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link-custom btn btn-info text-primary " to="signup">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header