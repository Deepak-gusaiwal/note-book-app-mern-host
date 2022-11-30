import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute';
import AlertComponent from './components/AlertComponent';
import { useContext } from 'react';
import context from './context/contextfile';
import {useColorModeValue} from '@chakra-ui/react'


function App() {
  const {alert} = useContext(context);
  const mode = useColorModeValue('light', 'dark');
  if(mode === 'dark'){
    document.title ="!NoteBok App - Dark Mode"
  }else{
    document.title ="!NoteBok App - Light Mode"
  }

  return (
    <>
      <Navbar />
      <AlertComponent alert={alert}/>
      <Routes>
        <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
