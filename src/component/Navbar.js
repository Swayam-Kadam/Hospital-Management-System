import React, { useContext }  from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import './css/navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const logout = (e) =>{
    if (localStorage.getItem('token')) {
      // LogOut functionality
      localStorage.removeItem('token');
      window.location.reload(); // Refresh to update UI or redirect if needed
    } else {
      // Redirect to login page
      navigate('/login');
    }
  }


  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
<div className="container-fluid">
  <Link className="navbar-brand" to="/"><img
            src="/logo.svg" // Path to logo in public folder
            alt="Hospital Logo"
            style={{ height: '40px', marginRight: '10px' }}
          /></Link>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" aria-current="page" to="/" >Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/Appointment">Appointment</Link>
      </li>     
      <li className="nav-item">
        <Link className="nav-link" to="/detail">Docter-Detail</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/profile">My-Profile</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/exam">Exam</Link>
      </li>
    </ul>
    <div>
    <button className='btn btn-outline-secondary mx-3' onClick={toggleTheme}>{theme === "dark"?<i className="fa-solid fa-sun"></i>:<i className="fa-solid fa-moon w-19" ></i>}</button>
    <button className= {`btn ${localStorage.getItem('token') ? 'btn-danger' : 'btn-primary'}`}  onClick={logout}>{localStorage.getItem('token') ? 'LogOut' : 'LogIn'}</button>
      </div>
  </div>
</div>
</nav>
  </div>
  )
}

export default Navbar
