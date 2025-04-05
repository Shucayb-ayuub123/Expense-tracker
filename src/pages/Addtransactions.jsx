import React, { useEffect, useState } from "react";
import "../styles/Addtransaction.css";
import { useLocation } from "react-router-dom";
function Addtransaction() {
  const [type, setType] = useState("Expenses");
  const [Amount, setAmount] = useState();
  const [Category, setCategory] = useState("");
  const [Description, setDescription] = useState("");
  const [Date, setDate] = useState();
  const [transaction, setTransaction] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  const location = useLocation();
  function handleData(e) {
    console.log(type, Amount, Category, Description, Date);

    const existingTransaction =
      JSON.parse(localStorage.getItem("transaction")) || [];
    const currentTransaction = {
      type: type,
      Amount: parseFloat(Amount),
      Category: Category,
      Description: Description,
      Date: Date,
    };
    let newTransaction;
    if (editIndex == null) {
      newTransaction = [...existingTransaction, currentTransaction];
    } else {
      newTransaction = [...transaction];
      newTransaction[editIndex] = currentTransaction;
    }
    localStorage.setItem("transaction", JSON.stringify(newTransaction));

    if (editIndex !== null ) {
      alert(`${type} Updated successfully!!`)
    } else {
       alert(`${type} added successfully`)
    }
   

    setType("");
    setAmount("");
    setDescription("");
    setCategory("");
    setDate();
  }

  useEffect(() => {
    const existingTransaction =
      JSON.parse(localStorage.getItem("transaction")) || [];

    setTransaction(existingTransaction);

    console.log(existingTransaction);

    if (location.state && location.state.transaction) {
      const transaction = location.state.transaction;

      setType(transaction.type);
      setAmount(transaction.Amount);
      setCategory(transaction.Category);
      setDescription(transaction.Description);
      setDate(transaction.Date);
      setEditIndex(transaction.i);
    }
  }, [location]);

  console.log(Date);
  
  return (
    <div className="container flex w-12/12  justify-center items-center shrink-0 flex-col h-10/12 mt-20 flex-nowrap">
      <div className="title w-5/12 mb-5">
        <h3>AddTransaction</h3>
      </div>

      <div className="form w-4/12 shrink-0 flex-nowrap  px-10 py-10 h-11/12 rounded-md max-w-">
        <div className="RadioInput flex gap-3 ">
          <input
            type="radio"
            name=""
            id=""
            value={"Expenses"}
            checked={type == "Expenses"}
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="">Expenses</label>
          <input
            type="radio"
            name=""
            id=""
            value={"Income"}
            checked={type == "Income"}
            onChange={(e) => setType(e.target.value)}
          />
          <label htmlFor="">Income</label>
        </div>
        <div className="inputs flex justify-center items-center flex-col gap-y-8 ">
          <input
            type="text"
            name=""
            id=""
            value={Amount}
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
            className="w-11/12 py-2 border-1 border-gray-300 rounded-sm focus:outline-none mt-3"
          />
          <select
            name=""
            id=""
            className="w-11/12 py-2 border-1 border-gray-300 rounded-sm focus:outline-none"
            onChange={(e) => setCategory(e.target.value)}
            value={Category}
          >
            <option value="cabdi">Select Category</option>
            <option value="Dining">Dining</option>
            <option value="Food">Food</option>
            <option value="Education fee">Education fee</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Others">Others</option>
          </select>
          <textarea
            name=""
            id=""
            placeholder="description"
            className="w-11/12 py-2 border-1 border-gray-300 rounded-sm focus:outline-none resize-none"
            onChange={(e) => setDescription(e.target.value)}
            value={Description}
          ></textarea>

          <input
            type="date"
            className="w-11/12 py-2 border-1 border-gray-300 rounded-sm focus:outline-none"
            onChange={(e) => setDate(e.target.value)}
            value={Date}
          />

          <button
            className="bg-red-500 px-17 text-white py-2 rounded-md"
            onClick={handleData}
          >
          {editIndex == null ? 'AddTransaction' :  'UpdateTransaction'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Addtransaction;
