import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const Adddoc = () => {

  const [image,setImage] = useState(null);
  const [input,setInput] = useState('text');
  const [formData, setFormData] = useState({
    img:'',
    f_name: '',
    l_name: '',
    email: '',
    number: '',
    NIC: '',
    DOB: '',
    gander: '',
    password: '',
    department: ''
  });
  const handleImage = (e)=>{
    const file = e.target.files[0];
    if(file){
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
      setFormData({...formData,img:file});
    }else{
      setImage('/doc1.png');
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    try {
      const response = await axios.post('http://localhost:3001/api/doctor', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Doctor added successfully:', response.data);
      toast.success('Doctor added successfully'); //notification
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast.error('Error adding doctor');  //notification
    }
  };

  return (
    <div>
      <ToastContainer  position="top-center"  autoClose={3000}   hideProgressBar={false}  newestOnTop={true}  closeOnClick  pauseOnFocusLoss  draggable  pauseOnHover/>
      <form onSubmit={handleSubmit}>
      <div className="container d-flex" style={{height:'36rem',justifyContent:'space-between'}} >
      
            <div className='my-4' style={{height:'36rem',width:'40%'}}>
                <div style={{height:'50%',width:'100%',backgroundColor:'#1d3557',borderRadius:'1rem'}}>
                  <img src={image} alt="Plz Select Valid Img" style={{ color:'white',height: '100%', width: '100%',borderRadius:'1rem'}}/>
                </div>
                
                <div style={{height:'30%',width:'100%',marginTop:'2rem',overflow:'hidden',border:'2px solid black'}}><input type='file' onChange={handleImage}/></div>
                
            </div>

            <div style={{height:'36rem',width:'55%',marginTop:'1rem'}}>
            
                  <div>
                  <input type="text" className="form-control" placeholder='Enter First Name' name='f_name' value={formData.f_name} onChange={handleChange}/>
                  <input type="text" className="form-control my-3" placeholder='Enter Last Name' name='l_name' value={formData.l_name} onChange={handleChange}/>
                  <input type="email" className="form-control my-3" placeholder='Enter Email'  name='email' value={formData.email} onChange={handleChange}/>
                  <input type="number" className="form-control my-3" placeholder='Enter Phone number'  name='number' value={formData.number} onChange={handleChange}/>
                  <input type="number" className="form-control my-3" placeholder='NIC'  name='NIC' value={formData.NIC} onChange={handleChange}/>
                  <input type={input} className="form-control my-3" placeholder='Date Of Birth' onFocus={()=>setInput('date')} onBlur={()=>setInput('text')}  name='DOB' value={formData.DOB} onChange={handleChange}/>
                  
                  <select className="form-control my-3"  name='gander' value={formData.gander} onChange={handleChange}>
                    <option disabled={true} value="">Select Gander</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <input type="password" className="form-control my-3" placeholder='Enter Password'  name='password' value={formData.password} onChange={handleChange}/>

                  <select className="form-control my-3"   name='department' value={formData.department} onChange={handleChange}>
                    <option disabled={true} value="">Select Department</option>
                    <option>Pediatrics</option>
                    <option>Cardiology</option>
                    <option>Neurology</option>
                    <option>orthopedics</option>
                    <option>Oncology</option>
                    <option>Physical Therapy</option>
                    <option>Dermatology</option>
                    <option>ENT</option>
                  </select>

                  <button className='btn btn-info my-2' >Register New Doctor</button>
                  </div>
                
            </div>
            
      </div>
      </form>
    </div>
  )
}

export default Adddoc