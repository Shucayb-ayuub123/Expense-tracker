import React from "react";

const TransactionCard = ({Balance  , Income , expenses}) => {
  return (
    <div className="flex justify-center items-center flex-col mt-10">
      <div className="w-11/12 bg-gray-100 p-10 rounded-md">
        <p>Current Balance</p>
        <h1 className="text-3xl font-bold mt-2">${Balance}</h1>
      </div>
      <div className="flex gap-4 w-11/12 mt-3">

  <div className="w-1/2 p-5 bg-white rounded-lg shadow-md h-40">
    <h2 className="text-lg font-semibold">Total Income</h2>
    <p className="text-xl font-bold text-green-600">${Income}</p>
  </div>

 
  <div className="w-1/2 p-5 bg-white rounded-lg shadow-md h-40">
    <h2 className="text-lg font-semibold">Total Expenses</h2>
    <p className="text-xl font-bold text-red-600">${expenses}</p>
  </div>
</div>
</div>
  );
};

export default TransactionCard;
