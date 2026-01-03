import React, { useState } from "react";
import { LogOut, ShoppingCart, History, Wallet } from "lucide-react";
import storageHelper from "../utils/storageHelper";
import BuyToken from "./BuyToken";
import PurchaseHistory from "./PurchaseHistory";

const StudentDashboard = ({ student, onLogout }) => {
  const [currentView, setCurrentView] = useState('menu');
  const [studentData, setStudentData] = useState(student);
  const [addAmount, setAddAmount] = useState('');
  const [message, setMessage] = useState('');

  const refreshStudentData = async () => {
    const students = await storageHelper.getStudents();
    const updated = students.find(s => s.id === student.id);
    if (updated) setStudentData(updated);
  };

  const handleAddBalance = async () => {
    const amount = parseFloat(addAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage('Please enter a valid positive amount');
      return;
    }

    const students = await storageHelper.getStudents();
    const updatedStudents = students.map(s =>
      s.id === student.id ? { ...s, balance: s.balance + amount } : s
    );
    await storageHelper.saveStudents(updatedStudents);
    
    setMessage(`Balance updated! Added ${amount} Taka`);
    setAddAmount('');
    await refreshStudentData();
    
    setTimeout(() => setMessage(''), 3000);
  };

  if (currentView === 'buy') {
    return (
      <BuyToken
        student={studentData}
        onPurchaseComplete={() => {
          refreshStudentData();
          setCurrentView('menu');
        }}
        onBack={() => setCurrentView('menu')}
      />
    );
  }

  if (currentView === 'history') {
    return (
      <PurchaseHistory
        studentId={student.id}
        onBack={() => setCurrentView('menu')}
      />
    );
  }

  return (
    <div className="max-w-2xl mt-20 mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome, {studentData.name}</h2>
            <p className="text-gray-600">ID: {studentData.id} | {studentData.department}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <p className="text-sm opacity-90 mb-1">Current Balance</p>
          <p className="text-4xl font-bold">{studentData.balance.toFixed(2)} Taka</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setCurrentView('buy')}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
        >
          <ShoppingCart className="w-10 h-10 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Buy Meal Token</h3>
          <p className="text-sm text-gray-600">Purchase regular or feast tokens</p>
        </button>

        <button
          onClick={() => setCurrentView('history')}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
        >
          <History className="w-10 h-10 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Purchase History</h3>
          <p className="text-sm text-gray-600">View your meal token history</p>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Add Balance</h3>
        </div>
        
        <div className="flex gap-4">
          <input
            type="number"
            value={addAmount}
            onChange={(e) => setAddAmount(e.target.value)}
            placeholder="Enter amount..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddBalance}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add
          </button>
        </div>
        
        {message && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard