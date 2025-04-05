import React from "react";
import Navbar from "./components/Navbar";
import {Route , Routes} from 'react-router-dom'
import Dashboard  from './pages/Dashboard'
import Transaction  from './pages/Transaction'
import Report  from './pages/Report'
import NotFound  from './pages/NotFound'
import Addtransactions from './pages/Addtransactions'
function App() {
  return <div>
    <Navbar />
    
    <Routes>

      <Route path="/" element={<Dashboard />} />
      <Route path="/Addtransaction" element={<Addtransactions />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/Report" element={<Report />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    
    
    </div>;
}

export default App;
