import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Admin = () => {

  const [appointment,setAppointment] = useState([]);

//fetch data from backend
useEffect(()=>{
  const fetchData = async ()=>{
    try {
      const response = await axios.get("http://localhost:3001/api/appointment/appo");
      setAppointment(response.data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
      toast.error('Error fetching doctor data') //its a notification
    }
  };
  fetchData();
},[]);

const handleStatusChange = async(newStatus,appointmentId,index)=>{
  try {
    //Update the local state immediately for instant UI feedback
    const updatedAppointments = [...appointment];
    updatedAppointments[index].status = newStatus;
    setAppointment(updatedAppointments);

    // Make the backend call to update the status in the database
    await axios.patch(`http://localhost:3001/api/appointment/update-status/${appointmentId}`, {
      status: newStatus,
    });

    toast.success("Status updated successfully!"); // Notification for successful update
  } catch (error) {
    console.error("Error updating status:", error);
    toast.error("Failed to update status. Please try again."); // Notification for failure
  
    // Revert the status change on error
    const revertedAppointments = [...appointment];
    revertedAppointments[index].status = appointment[index].status; // Reset to the previous status
    setAppointment(revertedAppointments);
  }
}

  return (
    <div>
    <ToastContainer  position="top-center"  autoClose={3000}   hideProgressBar={false}  newestOnTop={true}  closeOnClick  pauseOnFocusLoss  draggable  pauseOnHover/>
      <div className="container d-flex" style={{height:'10rem',marginTop:'2rem'}}>
            <div className="container d-flex" style={{width:'49%',height:'100%',backgroundColor:'#457b9d',justifyContent:'space-between',borderRadius:'1rem'}}>
                <div style={{width:'50%',height:'100%',marginLeft:'-1rem'}}>
                    <img src="/doc3.png" alt="load" style={{width:'100%',height:'100%'}}/>
                </div>
                <div  style={{width:'50%',height:'100%',overflow:'hidden',marginLeft:'-1rem'}}>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam odio a velit, repellendus sunt quos iure dignissimos beatae laborum. Recusandae.
                </div>
            </div>

            <div className="container" style={{width:'24%',height:'100%',backgroundColor:'#e63946',borderRadius:'1rem'}}>
                <h2 style={{ fontSize: '2vw' }}>Total Appointment</h2>
                <h2 style={{ fontSize: '4vw', width: '60%', margin: '0 auto' }}>1500+</h2>
            </div>

            <div className="container" style={{width:'24%',height:'100%',backgroundColor:'#457b9d',borderRadius:'1rem'}}>
            <h4 style={{ fontSize: '2vw' }}>Registered Doctors</h4>
            <h2 style={{ fontSize: '4vw', width: '60%', margin: '0 auto' }}>20</h2>
            </div>
      </div>
     




      <div className='container my-3' style={{ height: '25rem', backgroundColor: '#457b9d', overflowY: 'auto', padding: '5px', border: '2px solid #e63946',borderRadius:'1rem' }}>
  <table width="100%" style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
    <thead style={{ position: 'sticky', top: '0', width:'100%', color: 'white' }}>
    <tr>
     <th colSpan="8" bgcolor='#457b9d'> Appointments </th>
</tr>
      <tr bgcolor= '#e63946'>
        <th>Patient</th>
        <th>Date</th>
        <th>Doctor</th>
        <th>Department</th>
        <th>Status</th>
        <th>Visited</th>
      </tr>
    </thead>
    <tbody>
      {appointment.map((item, index) => (
        <tr key={index} style={{marginTop:'1rem'}}>
          <td>{item.f_name}&nbsp;{item.l_name}</td>
          <td>{item.ADOB.substring(0,10)}</td>
          <td>{item.doctor}</td>
          <td>{item.department}</td>
          <td>   
            <select 
              className={
                item.status==="pending"
                ?"text-warning"
                :item.status==="rejected"
                ?"text-danger"
                :"text-success"
              }
              value={item.status}
              onChange={(e)=>handleStatusChange( e.target.value,item._id,index)}   // Pass the value, item ID, and index
              >
                <option value="pending" className="text-warning">Pending</option>
                <option value="accepted" className="text-success">Accepted</option>
                <option value="rejected" className="text-danger">Rejected</option>

            </select>
          </td>
          <td>{item.status === "accepted" ? (<li className="fa-solid fa-circle-check text-success"></li>):(<i className="fa-solid fa-circle-xmark text-danger"></i>)}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  )
}

export default Admin
