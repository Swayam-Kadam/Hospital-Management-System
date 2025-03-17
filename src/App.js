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
import Exam from './component/Exam';
import Success from './component/Success';
import Unsuccess from './component/Unsuccess';
import Analysis from './component/Analysis';
import {ThemeProvider } from './component/ThemeContext';

function App() {
  
  return (
    <div className="App">
      <ThemeProvider>
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
        <Route path="/exam" element={<Exam/>}/>
        </Routes>
            </>
          }
        />
        <Route path="success" element={<Success/>}/>
        <Route path='unsuccess' element={<Unsuccess/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        

        <Route
          path="/admin/*"
          element={
            <>
            <Navadmin/>
            <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/analysis" element={<Analysis/>}/>
        <Route path="/adddoc" element={<Adddoc />} />
        <Route path="/message" element={<Message/>}/>
        
        </Routes>
            </>
          }
        />
      </Routes>
     </Router>
     </ThemeProvider>
    </div>
  );
}


export default App;
