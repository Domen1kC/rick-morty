import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../../App.scss";


const Navbar = ({ user }) => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  return (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div  className="container">
        <Link to="/" className="navbar-brand fs-3 ubuntu">
          Rick & Morty <span className="text-primary"></span>
        </Link>
        
        <style jsx>{`
          button[aria-expanded="false"] > .close {
            display: none;
          }
          button[aria-expanded="true"] > .open {
            display: none;
          }
        `}</style>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="fas fa-bars open text-dark"></span>
          <span class="fas fa-times close text-dark"></span>
        </button>

        
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
   
 
          <div className="navbar-nav fs-5">

            <NavLink to="/episodes" className="nav-link">
              Episode
            </NavLink>
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/location"
            >
              Location
            </NavLink>
            {user ? (         
        <ul className="list">
          <li className="listItem">
            <img
              src={user.photos[0].value}
              alt=""
              className="avatar"
            />
          </li>
          <li className="listItem">{user.displayName}</li>
          <NavLink
              activeClassName="active"
              className="nav-link"
              to="/userprofile"
            >
              Profile
            </NavLink>
          <button className="" onClick={logout}>
            Logout
          </button>
        </ul>
            )
             : (
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/login"
            >
              Log In 
            </NavLink>)

            
              

            }
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
