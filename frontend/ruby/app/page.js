import AddTransaction from "@/components/AddTransaction";
import Sidebar from "@/components/Sidebar";
import TransactionList from "@/components/TransactionList";
import React from "react";

export default function Home() {
  return (
    <main>
      <Sidebar />
      <h1>Expnse Tracker</h1>
      <AddTransaction />
      <TransactionList />
    </main>
  );
}