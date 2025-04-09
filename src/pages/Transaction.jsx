import React, { useEffect, useState } from "react";
import "../styles/transaction.css";
import { useNavigate } from "react-router-dom";
import NoTransaction from "../components/NoTransaction";
const Transaction = () => {
  const navigate = useNavigate();


    const [transaction , setTransaction] = useState([])

    useEffect(() => {
const existingTransaction=JSON.parse(localStorage.getItem("transaction")) || [];

      setTransaction(existingTransaction)

    } , [])

  function handleEdit(i) {
    const EditTransaction = transaction[i];
   navigate("/addtransaction" , {
    state : {transaction : {...EditTransaction , i}}
   })
  }


  function handleDelete(index) {
       
    const UpdateTransaction = transaction.filter((data, i) => i !== index);
   setTransaction(UpdateTransaction)
    localStorage.setItem("transaction", JSON.stringify(UpdateTransaction));
  }
  
  return (
   <div className="w-full h-screen caret-transparent bg-zinc-600 flex flex-col justify-center items-center gap-y-2">
       <div className="w-11/12 h-11/12 bg-white rounded-md">
         <div className="hidden lg:block p-5 w-full text-sm" >
        <table className="p-5 w-full table-auto ">
           <thead className="border-b border-1 border-gray-300  ">
               <tr>
                <th className="text-center     border-gray-200 py-3">Category</th>
                <th className="text-center     border-gray-200 py-3">Description</th>
                <th className="text-center     border-gray-200 py-3">Amount</th>
                <th className="text-center     border-gray-200 py-3">Date</th>
                <th className="text-center     border-gray-200 py-3">Type</th>
                <th className="text-center     border-gray-200 py-3">Action</th>
               </tr>
           </thead>

           <tbody>
            
            {transaction.map((tx , i) => (
              <tr key={i} className="border-collapse border-1 border-gray-200">
                <td className=" p-3  border-gray-400">{tx.Category}</td>
                <td className=" p-3  border-gray-400">{tx.Description}</td>
                <td className=" p-3  border-gray-400">{tx.Amount}</td>
                <td className=" p-3  border-gray-400">{tx.Date}</td>
                <td className=" p-3  border-gray-400">{tx.type}</td>
                <td className=" p-3  border-gray-400 py-1">
                  <div className="flex justify-center space-x-2 ">
                  <button className="bg-blue-400 px-3 rounded-sm" onClick={() => handleEdit(i)}>✏Edit</button>
                  <button className="bg-blue-400 px-2 rounded-sm" onClick={ () => handleDelete(i)}>🗑 Delete</button>
                  </div>
                 
                </td>
              </tr>
            ) )}
           </tbody>
        </table>
         </div>
         <div className="h-3/4 grid lg:hidden grid-cols-1 md:grid-cols-2 p-5 gap-5 overflow-y-scroll text-xs lg:text-base min-h-full">
         {transaction.map((tx , i) => (
          <div className="border rounded-lg flex items-center p-2 gap-2 space-y-3">
            <div className="w-1/4">
                {tx.Category}
            </div>
            <div className="w-5/4 space-y-2">
        <div className="font-medium">{tx.Description}</div>
        <div className="text-gray-500">{tx.Amount}</div>
        <div className="grid grid-cols-2 gap-2">
         <div>{tx.Date}</div>
         <div>{tx.type}</div>
         <div className="flex space-x-10">
         <button onClick={() => handleEdit(i)} className="bg-blue-500 px-3 text-white py-1 rounded-md text-md">Edit</button>
         <button onClick={ () => handleDelete(i)}  className="bg-red-500 px-3 text-white py-1 rounded-md text-md">Delete</button>
         </div>
        </div>
        
            </div>
          </div>
         ))}
         </div>
       </div>
   </div>
  );
};

export default Transaction;
