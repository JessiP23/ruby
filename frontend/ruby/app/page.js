import AddTransaction from "@/components/AddTransaction";
import Sidebar from "@/components/Sidebar";
import TransactionList from "@/components/TransactionList";
import React from "react";

export default function Home() {
  return (
    <main>
      <Sidebar />
      <div className="text-center">
      <h1 className="text-4xl p-9">Ruby Expense Tracker</h1>
      <AddTransaction />
      <TransactionList />
      </div>
    </main>
  );
}