import React, { useEffect, useState } from "react";
import NoTransaction from "../components/NoTransaction";

import { Bar, Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Report = () => {
  const [transaction, setTransaction] = useState([]);
  const [SelectMonth, setSelectMonth] = useState(
    new Date().toISOString().slice(0, 11)
  );
  const [TotalIncome, setTotalIncome] = useState(0);
  const [FilterTransaction, setFilterTransaction] = useState([]);
  const [TotalExpense, setTotalExpense] = useState(0);
  const [CategoryData, setCategoryData] = useState({});

  useEffect(() => {
    const storedTransaction = JSON.parse(localStorage.getItem("transaction")) || [];
    setTransaction(storedTransaction);
  } , [])

  
  useEffect(() => {

    
    const Filtered = transaction.filter((tx) => tx.Date.startsWith(SelectMonth));

    setFilterTransaction(Filtered);

    let income = 0;
    let expenses = 0;
    let CategoryBreakDown = {};

    Filtered.forEach((tx) => {
      if (tx.type == "Income") {
        income = income + tx.Amount;
      } else {
        expenses = expenses + tx.Amount;

        CategoryBreakDown[tx.Category] =
          CategoryBreakDown[tx.Category] || 0 + tx.Amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expenses);
    setCategoryData(CategoryBreakDown);

  
    
  }, [transaction, SelectMonth]);

  const peiChartData = {
    labels: Object.keys(CategoryData),
    datasets: [
      {
        data: Object.values(CategoryData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9966FF",
          "#FFA07A",
        ],
      },
    ],
  };

  const barChartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [TotalIncome, TotalExpense],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
      },

      x: {
        grid: { display: false },
      },
    },

    maintaiAspectRatio: false,
  };

  return (
    <div>
      <div className="flex justify-center items-center flex-col mt-10 w-9/12 mx-auto space-y-2 ">
        <h1 className="text-xl font-bold">Expenses Reports</h1>
        <h6 className="font-bold">Select Month :</h6>

        <input
          type="date"
          className="w-full border-1 py-1 px-2 border-gray-400 rounded-md focus:outline-none"
          onChange={(e) => setSelectMonth(e.target.value)}
          value={SelectMonth}
        />
      </div>

      <div className=" grid grid-cols-1 space-y-2 md:flex w-9/12 mx-auto gap-8 mt-10 justify-center items-center">
        <div className=" w-full md:w-1/2 shadow-md h-40 rounded-md py-10 px-10 text-center">
          <h2>Total Income</h2>
          <p className="text-2xl font-bold text-green-400">${TotalIncome}</p>
        </div>

        <div className=" w-full md:w-1/2 shadow-md h-40 rounded-md py-10 px-10 text-center ">
          <h2>Total Expenses</h2>
          <p className="text-2xl font-bold text-red-400">${TotalExpense}</p>
        </div>
      </div>

      <div className=" grid grid-cols-1 space-y-10 md:flex w-8/12 justify-center items-center mx-auto mt-30 space-x-10  ">
        <div className=" w-full flex justify-center items-center  md:flex w-1/2 h-90  px-4 py-4    flex-col text-center shadow-xl rounded-lg ">
          <h3>Category-wise Expense Breakdown</h3>
          {Object.keys(CategoryData).length == 0 ? (
            <NoTransaction />
          ) : (
            <div>
              <Pie data={peiChartData} />
            </div>
          )}
        </div>

        <div className=" w-full flex justify-center items-center md:flex  justify-center items-center w-1/2 h-90 flex-col text-center shadow-xl py-4 px-4   ">
          <h3>Income vs Expenses</h3>

          {TotalExpense === 0 && TotalIncome === 0 ? (
            <NoTransaction />
          ) : (
            
           <div className="w-full h-full">
<Bar data={barChartData} options={barChartData} />
           </div>
            
              
            
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
