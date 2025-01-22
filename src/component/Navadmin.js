import React from 'react'
import { Link,useNavigate} from 'react-router-dom';

const Navadmin = () => {

  const navigate = useNavigate();
  const logout = (e) =>{
    localStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
<div className="container-fluid">
  <Link className="navbar-brand" to="/Admin"><img
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
        <Link className="nav-link active" aria-current="page" to="/Admin">Admin</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to="/Admin/Adddoc">Add-Doctor</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link active" to="/Admin/Message">Messages</Link>
      </li>
    </ul>
    <div>
      <button className= "btn btn-danger"  onClick={logout}>{localStorage.getItem('token') ? 'LogOut' : 'LogIn'}</button>
      </div>
  </div>
</div>
</nav>
  </div>
  )
}

export default Navadmin
