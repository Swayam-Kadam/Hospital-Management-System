import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Foter from './Foter'


const Profile = () => {
    const[user,setUser] = useState([]);
    const [appoinment,setAppointment] = useState([]);
    const [messages,setMessages] = useState([]);
    const [formData,setFormData] = useState({
        title:'',
        message:'',
        tag:''
    })
    
    useEffect(()=>{
        if (!localStorage.getItem('token')) { 
            toast.error('Plz login first for checking Profile');
        }
        else{

        const fetchuser = async ()=>{
            try {
                const response = await axios.get('http://localhost:3001/api/auth/fetch',{
                    headers:{
                        'Content-Type' :'application/json',
                        "auth-token" :localStorage.getItem('token')
                    },
                });
                setUser(response.data)
            } catch (error) {
                console.error('Error fetching Profile data:', error);
                 toast.error('Error fetching Profile data') //its a notification
            }
        }
        fetchuser();

        const fetchAppointment = async()=>{
            try {
                const response = await axios.get('http://localhost:3001/api/appointment/appouser',{
                    headers:{
                        'Content-Type' :'application/json',
                        "auth-token" :localStorage.getItem('token')
                      },
                });

                setAppointment(response.data)
            } catch (error) {
                 console.error('Error fetching Appointment data:', error);
                 toast.error('Error fetching Appintment data') //its a notification
            }
        }
        fetchAppointment()

        const fetchMessage = async()=>{
            try {
                const response = await axios.get('http://localhost:3001/api/message/specific-user',{
                    headers:{
                        'Content-Type':'application/json',
                        'auth-token':localStorage.getItem('token')
                    },
                });
                setMessages(response.data)
            } catch (error) {
                console.error('Error fetching Message data:', error);
                 toast.error('Error fetching Message data') //its a notification
            }
        }
        fetchMessage()
        
        }
    },[])

    // const userInfo = appoinment.length > 0 ? appoinment[0] : {};

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    //this function is use to update a userdata
    const Update = async () => {
        try {
            let userId = user._id; // ✅ Corrected user ID
            
            const updatedUserData = {
                name: user.name,
                address: user.address,
                DOB: user.DOB, // Ensure it's properly formatted as YYYY-MM-DD
                gender: user.gender
            };
    
            const response = await axios.patch(
                `http://localhost:3001/api/auth/update/${userId}`, 
                updatedUserData, 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            if (response.status === 200) {
                toast.success("Data updated successfully!");
            } else {
                toast.error("Failed to update data. Please try again.");
            }
        } catch (error) {
            console.error('Error Updating User:', error);
            toast.error('Failed to update data. Please try again.');
        }
    };
    

    //this funtion is use to send a message to admin
    const handleSubmit = (e) =>{
        e.preventDefault();

        if(!localStorage.getItem('token')){
            toast.error("Plz First Login For Send A Message")
            return;
        }

        try {
            const response = axios.post('http://localhost:3001/api/message/send',formData,{
                headers:{
                    'Content-Type':'application/json',
                    "auth-token" :localStorage.getItem('token')
                  },
            })

            setFormData({
                title:'',
                message:'',
                tag:''
            })
            console.log("Your Comment Send Successfully",response.data)
            toast.success("Your Comment Send SuccessFully")
        } catch (error) {
            console.log('Error For Sending Message:',error);
            toast.error('Failed to Send A Message.please try again')
            
        }
    }

    return (
        <div>
            <ToastContainer  position="top-center"  autoClose={3000}   hideProgressBar={false}  newestOnTop={true}  closeOnClick  pauseOnFocusLoss  draggable  pauseOnHover/>
            <div className='container' style={{ height: '10rem', width: '10rem', borderRadius: '50%', background: '#f1faee', marginTop: '4rem' }}>
                <img className='image' src="/user.webp" alt="img" style={{ height: "87%", width: "84%" }} />
            </div>
            <div className='container' id='card'style={{  width: '100%', marginTop: '1rem' }}>
                {/* Your Personal Information */}
                <div className='information d-flex justify-content-center '  >
                    <table className='d-flex ' style={{ justifyContent: 'center' }}>
                        <thead>
                            <tr><th>NAME:-</th></tr>
                            <tr><th>EMAIL:-</th></tr>
                            <tr><th>ADDRESS:-</th></tr>
                            <tr><th>DATE OF BIRTH:-</th></tr>
                            <tr><th>GENDER:-</th></tr>

                        </thead>
                        <tbody>

                            <tr><td>{user.name}</td></tr>
                            <tr><td>{user.email}</td></tr>
                            <tr><td>{user.address}</td></tr>
                            <tr><td>{user.DOB ? user.DOB.substring(0, 10) : "N/A"}</td></tr>
                            <tr><td>{user.gender}</td></tr>
                        </tbody>
                    </table>
                    <div className='mx-2'><i className="fa-solid fa-pen-to-square text-primary" style={{cursor:'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal"></i></div>
                </div>

                {/* View Your Appointment  Section */}

                <div className='container' style={{ marginTop: '2rem' }}>
                    <div className='row'>
                        <h2 style={{ color: '#457b9d'}}>Appointment:-</h2>
                        {appoinment.map((item,index)=>(
                            <div key={index} className="col-md-4 mb-3">
                            <div className="card" style={{  width: '100%', backgroundColor: '#f1faee' }}>
                                <div className="card-body" style={{ textAlign: 'left' }}>
                                    <p className="card-text">Name:-{item.f_name}&nbsp;{item.l_name}</p>
                                    <p className="card-text ">Emai:-{item.email}</p>
                                    <p className="card-text">Department:-{item.department}</p>
                                    <p className="card-text">Doctor:-{item.doctor}</p>
                                    <p className="card-text">Status:-{item.status}</p>
                                </div>
                            </div>
                        </div>
                        )) }
                    </div>
                </div>

                    {/* messege section */}
                <div className="container" style={{marginTop:'2rem'}}>
                    <h2 style={{ color: '#457b9d'}}>Review:-</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Enter Title' className='form-control' name='title' value={formData.title} onChange={handleChange} required/>
                        <textarea className="form-control my-2" rows="5" placeholder='Write Your Messege And Review Here' name='message' value={formData.message} onChange={handleChange} required/>
                        <input type="text" placeholder='Enter Tag' className='form-control' name='tag' value={formData.tag} onChange={handleChange} required/>
                        <button className='btn btn-success my-2'>Submit</button>
                    </form>
                </div>



                 {/* View Your Message  Section */}

            <div className='container' style={{ marginTop: '2rem' }}>
                    <div className='row'>
                        <h2 style={{ color: '#457b9d'}}>Your Review:-</h2>
                        {messages.map((item,index)=>(
                            <div key={index} className="col-md-4 mb-3">
                            <div className="card" style={{  width: '100%', backgroundColor: '#f1faee' }}>
                                <div className="card-body" style={{ textAlign: 'left' }}>
                                    <p className="card-text"><span style={{color:'red'}}>Title:-</span>{item.title}</p>
                                    <p className="card-text "><span style={{color:'red'}}>Message:-</span>{item.message}</p>
                                    <p className="card-text text-success"><span style={{color:'red'}}>Replay From Appollo:-</span>{item.replay && item.replay.length > 0 ? item.replay : 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        )) }
                    </div>
                </div>
            </div>





                   {/* <!-- Modal --> */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <label htmlFor="title" className="form-label">Name</label>
                                <input type='text' className='form-control' name='name' id='name' value={user.name|| ""} onChange={onChange}/>
                                <label htmlFor="title" className="form-label">Address</label>
                                <input type='text' className='form-control' name='address' id='address' value={user.address|| ""} onChange={onChange}/>
                                <label htmlFor="title" className="form-label">DOB</label>
                                <input type='date' className='form-control' name='DOB' id='DOB'  value={user.DOB ? user.DOB.substring(0, 10) : ""} onChange={onChange}/>
                                <label htmlFor="title" className="form-label">Gender</label>
                                <input type='text' className='form-control' name='gender' id='gender' value={user.gender|| ""} onChange={onChange}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={Update} data-bs-dismiss="modal">Update</button>
                        </div>
                        </div>
                    </div>
                    </div>

            <Foter />
        </div>
    )
}

export default Profile
