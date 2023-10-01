import React from 'react';
import { Link, useLocation, useNavigate,} from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const Navigate = useNavigate();
  const [navbarTogglerActive, setNavbarTogglerActive] = useState(false);
  const handleNavbarToggle = () =>{
    setNavbarTogglerActive(prevState => !prevState);
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    Navigate('/login');
  };
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg border-bottom border-body" style={{backgroundColor: "#07161b"}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{color: "white"}}>
          Slice
        </Link>
        <button
          className={`navbar-toggler ${navbarTogglerActive ? 'active': ''}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={navbarTogglerActive ? 'true': 'false'}
          aria-label="Toggle navigation"
          style={{border: "2px solid white"}}
          onClick={handleNavbarToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                aria-current="page"
                to="/"
                style={{color: "white"}}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                to="/about"
                style={{color: "white"}}
              >
                About
              </Link>
            </li>
          </ul>

          {!localStorage.getItem('token') ? (
            <form className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup" role="button">
                Signup
              </Link>
            </form>
          ) : (
            <button onClick={handleLogout} className="btn">
              Logout
            </button>
          )}

          <div className="area" >
            <div className="wire" style={{display: navbarTogglerActive ? 'none' : 'block'}}></div>
            <div className="fixture" style={{display: navbarTogglerActive ? 'none' : 'block'}}>
              <div className="strip"></div>
              <div className="strip"></div>
              <div className="strip"></div>
            </div>
            <div className="bulb" style={{display: navbarTogglerActive ? 'none' : 'block'}}>
              <div className="zig"></div>
              <div className="zig"></div>
              <div className="zig"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
