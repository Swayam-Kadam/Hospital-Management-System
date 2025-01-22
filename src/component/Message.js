import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Message = () => {
    
    const[message,setMessage] = useState([])

    //fetch all messages from localhost:3001/api/message/fetch.
    useEffect(()=>{
        const fetchMesssage = async () =>{
            try {
                const response = await axios.get('http://localhost:3001/api/message/fetch');
                setMessage(response.data);
            } catch (error) {
                console.log("There Are Some Issue To Fetch A Messages",error);
                toast.error("There Are Some Issue To Fetch A Messages")
            }
        }
        fetchMesssage();
    },[])
  return (
    <div className='container'>
        <ToastContainer  position="top-center"  autoClose={3000}   hideProgressBar={false}  newestOnTop={true}  closeOnClick  pauseOnFocusLoss  draggable  pauseOnHover/>
      <div className="container" style={{marginTop:"2rem"}}>
        <div className="row">
        <h1 style={{textAlign:"left",marginTop:"2rem", color: '#457b9d'}}>Messages :-</h1>
           {message.map((item,index)=>(
            <div key={index} className='col-md-6 mb-6' >
                <div className="card" style={{ width: '100%',backgroundColor:'#f1faee',justifyContent:"space-between",marginTop:"1rem"}}>
                    <div className="card-body" style={{textAlign:"left"}}>
                        <h6 className="card-title"><span style={{color:'red'}}>Title:-</span>{item.title}</h6>
                        <p className="card-text"><span style={{color:'red'}}>Message:-</span>{item.message}</p>
                        <p className='"card-subtitle'><span style={{color:'red'}}>Tag:-</span>{item.tag}</p>
                        <p className='"card-subtitle mb-2 text-muted'>UserId:-{item.user}</p>
                    </div>
                </div>
            </div>
           ))}

            
        </div>
      </div>
    </div>
  )
}

export default Message
