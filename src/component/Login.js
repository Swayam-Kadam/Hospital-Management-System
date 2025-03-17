import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {

  const[formData,setFormData] = useState({
    email:'',
    password:''
  });
  const navigate = useNavigate();



  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login',formData,{
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({email:formData.email,password:formData.password})
      });
      const json = await response.data
      console.log(json);

      if(json.success){
        localStorage.setItem('token',json.authtoken);

        if(json.role=== "admin"){
          toast.success ("Admin Login Successfull")
          navigate("/admin/");
        }else{
          toast.success("User Login Successfull")
          navigate("/");
        }
      }
    } catch (error) {
      console.log('Error for Sign-Up:',error);
       toast.error("Fail LogIn So Plz Try Again");
    }
  }


  return (
    <div>
      <ToastContainer  position="top-center"  autoClose={3000}   hideProgressBar={false}  newestOnTop={true}  closeOnClick  pauseOnFocusLoss  draggable  pauseOnHover/>
      <div className="container bg-light" style={{margin:'0 auto',width: '50%',marginTop:'8rem'}}>
        <img src='/logo.svg' alt='hospital logo'/>
       <h1 className='my-4'>Welcome To Apollo</h1>
       <form onSubmit={handleSubmit}>
        <div className="container">
          
            <input type="email" placeholder='Email' className='form-control' name='email' value={formData.email} onChange={handleChange}/>
            <input type="password" placeholder='Password' className='form-control my-4' name='password' value={formData.password} onChange={handleChange}/>
            <button className='btn btn-success my-3'>Login</button>
            <Link className="mx-4" to={"/signup"}>Register a New User</Link>
            <Link  to={"/"}>Back</Link>
          
        </div>
       </form>
      </div>
    </div>
  )
}

export default Login
