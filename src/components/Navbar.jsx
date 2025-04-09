import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import "../styles/Navbar.css";
function Navbar() {
  const location = useLocation();
 
  const Navigate = useNavigate();

  function handleReset() {
    localStorage.clear();
    Navigate("/");
  }


  const[Open , setOpen] = useState(true);

  function handleEvent() {
    setOpen(!Open)
  }
  return (

    <>
    
    <nav className="flex justify-between items-center py-4 shadow-lg ">
      <div className="logo ml-3">
        <h1 className="font-bold ">Expenses Tracker</h1>
      </div>

      <ul className=" hidden md:flex items-center h-10 gap-10 mr-10 nav-link">
        <li className={location.pathname == "/Dashboard" ? "active" : ""}>
          <Link to={"/Dashboard"}> 📊 Dashbaord</Link>
        </li>
        <li className={location.pathname == "/transaction" ? "active" : ""}>
          <Link to={"/transaction"}>📄 Transaction</Link>
        </li>
        <li className={location.pathname == "/Report" ? "active" : ""}>
          <Link to={"/Report"}>⏳Report</Link>
        </li>
        <li>
          <Link to={"/"}>💡Get Queto</Link>
        </li>
        <li>
          <div onClick={handleReset} className="cursor-pointer">
            🔃 Reset{" "}
          </div>
        </li>

        
        
      </ul>

       
      <div className="block md:hidden">
           <button onClick={handleEvent}>
          {Open ? <BiMenu size={40} /> : <BiX size={40}/>}
          </button>
       </div>
     
    </nav>


    <div className={`${
    Open
      ? "opacity-0 scale-95 pointer-events-none"
      : "opacity-100 scale-100 mb-10 h-79"
  } transition-all duration-300 ease-in-out md:hidden  bg-gray-700 text-white p-4 rounded-lg`}
>
      <ul className="flex items-center flex-col h-10 gap-10 mr-10 nav-link text-lg ">
        <li className={location.pathname == "/Dashboard" ? "active" : ""}>
          <Link to={"/Dashboard"}> 📊 Dashbaord</Link>
        </li>
        <li className={location.pathname == "/transaction" ? "active" : ""}>
          <Link to={"/transaction"}>📄 Transaction</Link>
        </li>
        <li className={location.pathname == "/Report" ? "active" : ""}>
          <Link to={"/Report"}>⏳Report</Link>
        </li>
        <li>
          <Link to={"/"}>💡Get Queto</Link>
        </li>
        <li>
          <div onClick={handleReset} className="cursor-pointer">
            🔃 Reset{" "}
          </div>
        </li>
      </ul>
      </div>
    
    </>
    

    
  );
}

export default Navbar;
