import React from "react";
import '../styles/transaction.css'

function RecentTransaction({transaction}) {
    return (
      <>
 {
    transaction.slice(-10).reverse().map((tx , i) => (
        <li className="list-none flex justify-between  border-1 border-gray-400 border-t-0 border-r-0 border-l-0 py-2" key={i}>
            <span>
                {tx.Category}
              
            </span>
            
            <span className={tx.type == 'Income' ? 'income' : 'expenses'}>
               ${tx.Amount}
            </span>
        </li>
    ))
 }
      </>
    )
}

export default RecentTransaction