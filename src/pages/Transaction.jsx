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
    <div className="flex justify-center items-center flex-col mt-10 dd">
      <h1 className=" font-bold mb-5">All Transaction</h1>
{transaction.length == 0  ? <NoTransaction /> : 
      <table className="table-fixed">
        <thead className="border-collapse border-1 border-gray-300">
          <tr>
            <th className="px-12 py-2 border-collapse border-1 border-gray-300 bg-gray-100">
              Category
            </th>
            <th className="px-12 py-2 border-collapse border-1 border-gray-300 bg-gray-100">
              Descriprion
            </th>
            <th className="px-12 py-2 border-collapse border-1 border-gray-300 bg-gray-100">
              amount
            </th>
            <th className="px-12 py-2 border-collapse border-1 border-gray-300 bg-gray-100">
              Date
            </th>
            <th className="px-12 py-2 border-collapse border-1 border-gray-300 bg-gray-100">
              type
            </th>
            <th className="px-12 py-2 border-collapse border-1 border-gray-300 bg-gray-100">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {transaction.map((tx, i) => (
            <tr key={i} className="border-collapse border-1 border-gray-400">
              <td className="border-collapse border-1 py-2 border-gray-300 text-center">
                {tx.Category}
              </td>
              <td className="border-collapse border-1 py-2 border-gray-300 text-center">
                {tx.Description || "No Description"}
              </td>
              <td
                className={tx.type == "Income" ? "income" : "expenses"}
                id="amount"
              >
                {"$" + tx.Amount || "null"}
              </td>
              <td className="border-collapse border-1 py-2 border-gray-300 text-center">
                {tx.Date || "null"}
              </td>
              <td className="border-collapse border-1 py-2 border-gray-300 text-center">
                {tx.type}
              </td>

              <td className="px-3">
                <div className="flex gap-6">
                  <button
                    className="px-5 bg-yellow-500 text-black rounded-sm"
                    onClick={() => handleEdit(i)}
                  >
                    ✏ Edit
                  </button>
                  <button
                    className="px-5 bg-red-600 text-white rounded-sm"
                    onClick={() => handleDelete(i)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
}
    </div>
  );
};

export default Transaction;
