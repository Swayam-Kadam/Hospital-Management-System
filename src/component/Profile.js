import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Foter from './Foter'


const Profile = () => {

    const [appoinment,setAppointment] = useState([]);
    const [formData,setFormData] = useState({
        title:'',
        message:'',
        tag:''
    })
    useEffect(()=>{
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
                 console.error('Error fetching Profile data:', error);
                 toast.error('Error fetching Profile data') //its a notification
            }
        }
        fetchAppointment()
    },[])

    const userInfo = appoinment.length > 0 ? appoinment[0] : {};

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

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
            <div className='container' style={{  width: '100%', background: '#f1faee', marginTop: '1rem' }}>
                {/* Your Personal Information */}
                <div className='information'  >
                    <table className='d-flex' style={{ justifyContent: 'center' }}>
                        <thead>
                            <tr><th>NAME:-</th></tr>
                            <tr><th>EMAIL:-</th></tr>
                            <tr><th>ADDRESS:-</th></tr>
                            <tr><th>DATE OF BIRTH:-</th></tr>
                            <tr><th>GENDER:-</th></tr>

                        </thead>
                        <tbody>

                            <tr><td>{userInfo.f_name} {userInfo.l_name}</td></tr>
                            <tr><td>{userInfo.email}</td></tr>
                            <tr><td>{userInfo.address}</td></tr>
                            <tr><td>{userInfo.DOB ? userInfo.DOB.substring(0, 10) : "N/A"}</td></tr>
                            <tr><td>{userInfo.gander}</td></tr>
                        </tbody>
                    </table>
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
            </div>
            <Foter />
        </div>
    )
}

export default Profile
