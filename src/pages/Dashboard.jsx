import React, { useEffect, useState } from "react";
import TransactionCard from "../components/TransactionCard";
import RecentTransaction from "../components/RecentTransaction";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  
} from "chart.js"
import NoTransaction from "../components/NoTransaction";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Dashboard = () => {
  const [transaction, setTransaction] = useState([]);
  const [totalIncome, settotalIncome] = useState(0);
  const [totalExpenses, settotalExpenses] = useState(0);
  const [Balance, setBalance] = useState(0);
  const [CategoryData, setCategoryData] = useState({});
  const [MaxExpenses, setMaxExpenses] = useState(0);

  const navigate = useNavigate();
  const categoreis = ["Salary", "Dining", "Education fee", "Food" , "Rent" ,  "Others"];

  useEffect(() => {
    const existingTransaction =
      JSON.parse(localStorage.getItem("transaction")) || [];

    setTransaction(existingTransaction);



    let income = 0;
    let expenses = 0;
    let CategoryBreakDown = {};
    let highestExpenses = 0;
    categoreis.forEach((cat) => CategoryBreakDown[cat] = 0);

    console.log(CategoryBreakDown);
    

    existingTransaction.forEach((tx) => {
      if (tx.type == "Income") {
        income += tx.Amount;
      } else {
        expenses += tx.Amount;
        CategoryBreakDown[tx.Category] =
          (CategoryBreakDown[tx.Category] || 0) + tx.Amount;
        if (CategoryBreakDown[tx.Category] > highestExpenses) {
          highestExpenses = CategoryBreakDown[tx.Category];
        }
      }
    });

    settotalIncome(income);
    settotalExpenses(expenses);
    setBalance(income - expenses);
    setCategoryData(CategoryBreakDown);
    setMaxExpenses(highestExpenses);
  }, []);

  const chartData = {
    labels: categoreis,
    datasets: [
      {
        label: "Expenses per Category",
        data: categoreis.map((cat) => CategoryData?.[cat] || 0),

        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9966FF",
          "#FFA07A",
          "#FFA08B",
        ],
      },
    ],
  };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: MaxExpenses > 0 ? MaxExpenses * 1.2 : 10,
          grid: {
            display: false,
          },
        },

        x: {
          grid: {
            display: false,
          },
        },
      },

      maintainAspectRatio: false,
    };
  return (
    <div className="dashbaord mt-5">
      <div className="dashbaord-inner flex justify-between ">
        <h2 className="ml-10 font-bold">Dashboard</h2>

        <button className="mr-10 bg-red-500 px-10 py-2 text-white rounded-md" onClick={() => navigate('/Addtransaction')}>
          + Add Transaction
        </button>
      </div>

      <TransactionCard
        Balance={Balance}
        Income={totalIncome}
        expenses={totalExpenses}
      />

      <div className="flex justify-center items-center w-11/12 m-auto gap-4">
        <div className="w-1/2 shadow-xl p-6 rounded-lg min-h-0 h-90">
          <h3 className="font-bold mb-2 text-xl">Recent Transaction</h3>
          {transaction.length == 0 ?
                 <NoTransaction /> : <RecentTransaction transaction={transaction} /> }
        </div>

        <div className="w-1/2 shadow-xl p-5 rounded-lg  h-90">
          <h3 className="font-bold text-xl">Expenses by category</h3>
          <div className="w-full h-full flex justify-center items-center py-4">
         {transaction.length == 0 ? <NoTransaction /> :   <Bar data={chartData} options={chartOptions}  />}
          </div>
           
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
