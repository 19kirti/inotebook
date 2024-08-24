import React from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom"
import { useEffect } from 'react'

const NavBar = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  },  [location]);

let navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate("/login");
  }

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">iNoteBook</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class={`nav-link ${location.pathname==="/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class= {`nav-link ${location.pathname==="/about" ? "active" : ""}`} to="/about">About</Link>
        </li>
      </ul>
      
        { !localStorage.getItem('token') ? <form class="d-flex" role="search"> 
      <Link class="btn btn-primary mx-2" to="/login" role="button">LogIn</Link>
      <Link class="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
      </form> : <button class="btn btn-primary mx-2" onClick={handleLogout} >LogOut</button>}

    </div>
  </div>
</nav>
  )
}

export default NavBar;
