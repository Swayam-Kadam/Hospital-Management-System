import React,{useEffect, useRef, useState} from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Message = () => {
    
    const[message,setMessage] = useState([])
    const[replayed,setReplayed] = useState({
      replay:''
});

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

    const onChange = (e) =>{
      setReplayed({...replayed,[e.target.name]:e.target.value})
    }

    const ref = useRef(null);
    // const refClose = useRef(null);

    const getId = (currentmessage) =>{
      ref.current = currentmessage._id
      console.log(ref.current)
    }

    const replay =async()=>{
        const id =ref.current
        console.log(id)
        const rep = {
            replay:replayed.replay
        }

        try {
            const response = await axios.patch(`http://localhost:3001/api/message/message-update/${id}`,
                rep,
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
    }

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
                        {item.replay && item.replay.length > 0 && (
                            <p className="card-subtitle mb-2 text-success">
                                <span style={{ color: "red" }}>Replay:-</span> {item.replay}
                            </p>
                            )}
                        <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => getId(item)}>Replay</button>
                    </div>
                </div>
            </div>
           ))}  
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Your Profile</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <label htmlFor="title" className="form-label text-warning">Replay:-</label>
                                <textarea className='form-control' name='replay' id='replay' value={replayed.replay|| ""} onChange={onChange}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={replay}>Replay</button>
                        </div>
                        </div>
                    </div>
                    </div>
    </div>
  )
}

export default Message
