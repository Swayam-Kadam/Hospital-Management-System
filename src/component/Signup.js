import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Signup = () => {

    const navigate = useNavigate();

  const navigated =()=>{
    navigate("/");
  }

  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    cpassword:''
})

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(formData.password !== formData.cpassword){
      toast.error("Passwords and Conform Password do not match");
      return; // Prevent submission if passwords don't match
    }

    try {
      
      const response = await axios.post('http://localhost:3001/api/auth/createuser',formData,{
        headers:{
          'Content-Type':'application/json',
        },
      })

    

      console.log("Sign Up Successfull",response.data)
      toast.success("Sign Up Successfully")
      navigated();

      // Optionally, clear the form after successful submission
    setFormData({
      name:'',
      email:'',
      password:'',
      cpassword:''
    });

    } catch (error) {
      console.log('Error for Sign-Up:',error);
       toast.error("Fail SignUp So Plz Try Again");
    }
  }

  return (
    <div>
      <ToastContainer  position="top-center"  autoClose={3000}   hideProgressBar={false}  newestOnTop={true}  closeOnClick  pauseOnFocusLoss  draggable  pauseOnHover/>
      <div className="container" style={{margin:'0 auto',width: '50%',marginTop:'8rem'}}>
        <img src='/logo.svg' alt='hospital logo'/>
       <h1 className='my-4'>Welcome To Apollo</h1>
       <form onSubmit={handleSubmit}>
        <div className="container">
          
            <input type='text' placeholder='name' className='form-control' name="name" value={formData.name} onChange={handleChange}/>
            <input type="email" placeholder='Email' className='form-control my-4' name="email" value={formData.email} onChange={handleChange}/>
            <input type="password" placeholder='Password' className='form-control my-4' name="password" value={formData.password} onChange={handleChange}/>
            <input type="password" placeholder='Conform Password' className='form-control my-4' name="cpassword" value={formData.cpassword} onChange={handleChange}/>
            <button className='btn btn-success' >SignUp</button>
            <Link className="mx-4" to={"/login"}>Back</Link>
          
        </div>
       </form>
      </div>
    </div>
  )
}

export default Signup
