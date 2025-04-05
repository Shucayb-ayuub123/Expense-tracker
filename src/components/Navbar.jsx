 import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import '../styles/Navbar.css'
 function Navbar () {
    const location = useLocation();
    const Navigate = useNavigate();


    function handleReset () {
        localStorage.clear();
        Navigate('/');
    }
    return (
        <nav className="flex justify-between items-center py-4 shadow-lg">
            <div className="logo ml-3">
                <h1 className="font-bold ">Expenses Tracker</h1>
            </div>

            <ul className="flex items-center h-10 gap-10 mr-10 nav-link">
                <li className={location.pathname == '/Dashboard' ? 'active': ""}>
                    <Link to={'/Dashboard'} > 📊 Dashbaord</Link>
                </li>
                <li className={location.pathname == '/transaction' ? 'active': ""}>
                    <Link to={'/transaction'}>📄 Transaction</Link>
                </li>
                <li className={location.pathname == '/Report' ? 'active': ""}>
                    <Link to={'/Report'}>⏳Report</Link>
                </li>
                <li>
                    <Link to={'/'}>💡Get Queto</Link>
                </li>
                <li>
                   <div onClick={handleReset}  className="cursor-pointer" >🔃 Reset </div>
                </li>
            </ul>
        </nav>
    )
 }

 export default Navbar