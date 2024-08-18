'use client'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';

function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from the backend
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/transactions');
        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error('Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="flex justify-center min-h-screen"> 
      <div className="w-full max-w-4xl"> 
        <h2 className="text-4xl font-bold mb-6 text-center pb-11">Transaction List</h2> 
        <Table aria-label="Transaction List Table" className="w-full">
          <TableHeader>
            <TableColumn className='text-2xl'>User ID</TableColumn>
            <TableColumn className='text-2xl'>Category ID</TableColumn>
            <TableColumn className='text-2xl'>Amount</TableColumn>
            <TableColumn className='text-2xl'>Date</TableColumn>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className='text-xl'>{transaction.userId}</TableCell>
                <TableCell className='text-xl'>{transaction.categoryId}</TableCell>
                <TableCell className='text-xl'>${transaction.amount}</TableCell>
                <TableCell className='text-2xl'>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TransactionList;