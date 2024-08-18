import AddTransaction from "@/components/AddTransaction";
import TransactionList from "@/components/TransactionList";
import React from "react";

export default function Home() {
  return (
    <main className="App">
      <h1>Expnse Tracker</h1>
      <AddTransaction />
      <TransactionList />
    </main>
  );
}