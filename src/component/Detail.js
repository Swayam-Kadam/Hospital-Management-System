import React, { useState,useEffect } from 'react'
import Foter from './Foter'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Detail = () => {

  // const doctor ={
  //   results:3,
  //   detais:[
  //     {
  //       name:'paresh raval',
  //       email:'paresh@gamil.com',
  //       DOB:'1992-12-22',
  //       NIC:'1234567891012',
  //       Gender:'Male'
  //     },
  //     {
  //       name:'paresh raval',
  //       email:'paresh@gamil.com',
  //       DOB:'1992-12-22',
  //       NIC:'1234567891012',
  //       Gender:'Male'
  //     },
  //     {
  //       name:'paresh raval',
  //       email:'paresh@gamil.com',
  //       DOB:'1992-12-22',
  //       NIC:'1234567891012',
  //       Gender:'Male'
  //     },
  //   ]
  // }

  const [doctor,setDoctor] = useState([])
   
  //fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/doctor'); // Replace with your API endpoint
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        toast.error('Error fetching doctor data') //its a notification
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ToastContainer  position="top-center"  autoClose={3000}   hideProgressBar={false}  newestOnTop={true}  closeOnClick  pauseOnFocusLoss  draggable  pauseOnHover/>
            <div className='container' style={{marginTop:'2rem'}}>
                <div className="row">
                    {doctor.map((item, index) => (
                        <div key={index} className="col-md-3 mb-4">
                            <div className="card" style={{height: '25rem', width: '100%',backgroundColor:'#f1faee'}}>
                            <img className="card-img-top" src={`http://localhost:3001/${item.img}`} alt="Card cap" style={{height: '40%', width: '100%'}} />
                                <div className="card-body" style={{textAlign:'left'}}>
                                    <h5 className="card-title">Name:-{item.f_name}&nbsp;{item.l_name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Emai:-{item.email}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Department:-{item.department}</h6>
                                    <p className="card-text">DOB:-{item.DOB}</p>
                                    <p className="card-text">NIC:-{item.NIC}</p>
                                    <p className="card-text">Gender:-{item.gander}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Foter/>
        </div>
  )
}

export default Detail
