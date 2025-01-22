import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Appointment from './component/Appointment';
import Detail from './component/Detail';
import Login from './component/Login';
import Navadmin from './component/Navadmin';
import Admin from './component/Admin';
import Adddoc from './component/Adddoc';
import Signup from './component/Signup';
import Profile from './component/Profile';
import Message from './component/Message';

function App() {
  
  return (
    <div className="App">
     <Router>
      <Routes>
      <Route
          path="/*"
          element={
            <>
            <Navbar/>
            <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/profile" element={<Profile/>} />
        
        </Routes>
            </>
          }
        />

        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        

        <Route
          path="/admin/*"
          element={
            <>
            <Navadmin/>
            <Routes>
      <Route path="/" element={<Admin />} />
        <Route path="/adddoc" element={<Adddoc />} />
        <Route path="/message" element={<Message/>}/>
        
        </Routes>
            </>
          }
        />
      </Routes>
     </Router>
    </div>
  );
}


export default App;
