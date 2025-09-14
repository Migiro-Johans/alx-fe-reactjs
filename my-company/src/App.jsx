import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
	  
	  <Home/>
	  <BrowserRouter>
	  	<Navbar/>
	  	<Routes>
	  		<Route path="/Home" element={<Home/>} />
       			<Route path="/About" element={<About/>} />
        		<Route path="/Services" element={<Services />} />
        		<Route path="/Contact" element={<Contact />} />
	  	</Routes>
	  </BrowserRouter>
	  <About/>
	  <Services/>
	  <Contact/>
    </>
  );
}

export default App
