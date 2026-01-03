import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";
import storageHelper from "../utils/storageHelper";
import { getTodayDate } from "../App";

const BuyToken = ({ student, onPurchaseComplete, onBack }) => {
  const [hall, setHall] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [tokenType, setTokenType] = useState('');
  const [currentFeast, setCurrentFeast] = useState({ isSet: false });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const halls = ['Zia', 'Bongobondhu', 'Tinshed', 'Hamid', 'Selim', 'Shohidul'];
  const regularPrice = 40;

  useEffect(() => {
    loadFeast();
  }, []);

  const loadFeast = async () => {
    const feast = await storageHelper.getFeast();
    setCurrentFeast(feast);
  };

  const handlePurchase = async () => {
    setMessage('');
    
    if (!hall || !mealTime || !tokenType) {
      setMessage('Please select all options');
      setMessageType('error');
      return;
    }

    let tokenPrice = regularPrice;
    let tokenTypeStr = 'Regular';

    if (tokenType === 'feast') {
      if (!currentFeast.isSet) {
        setMessage('No feast is set by admin!');
        setMessageType('error');
        return;
      }
      if (currentFeast.hall !== hall || currentFeast.time !== mealTime) {
        setMessage(`Feast is NOT available for ${hall} - ${mealTime}. Current feast: ${currentFeast.hall} - ${currentFeast.time}`);
        setMessageType('error');
        return;
      }
      tokenPrice = currentFeast.price;
      tokenTypeStr = 'Feast';
    }

    if (student.balance < tokenPrice) {
      setMessage(`Insufficient Balance! Required: ${tokenPrice} Taka, Current: ${student.balance} Taka`);
      setMessageType('error');
      return;
    }

    // Check if already purchased today
    const purchases = await storageHelper.getPurchases();
    const today = getTodayDate();
    const alreadyPurchased = purchases.some(
      p => p.studentId === student.id && p.date === today && p.time === mealTime
    );

    if (alreadyPurchased) {
      setMessage(`Token already purchased for ${mealTime} today!`);
      setMessageType('error');
      return;
    }

    // Add purchase
    const newPurchase = {
      studentId: student.id,
      date: today,
      time: mealTime,
      hall: hall,
      tokenType: tokenTypeStr,
      price: tokenPrice
    };

    purchases.push(newPurchase);
    await storageHelper.savePurchases(purchases);

    // Update balance
    const students = await storageHelper.getStudents();
    const updatedStudents = students.map(s => 
      s.id === student.id ? { ...s, balance: s.balance - tokenPrice } : s
    );
    await storageHelper.saveStudents(updatedStudents);

    setMessage(`Token purchased successfully! New balance: ${(student.balance - tokenPrice).toFixed(2)} Taka`);
    setMessageType('success');
    
    setTimeout(() => {
      onPurchaseComplete();
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Buy Meal Token</h2>
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          <XCircle className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Hall</label>
          <select
            value={hall}
            onChange={(e) => setHall(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a hall...</option>
            {halls.map(h => (
              <option key={h} value={h}>{h} Hall</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meal Time</label>
          <select
            value={mealTime}
            onChange={(e) => setMealTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose time...</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token Type</label>
          <div className="space-y-2">
            <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="tokenType"
                value="regular"
                checked={tokenType === 'regular'}
                onChange={(e) => setTokenType(e.target.value)}
                className="mr-3"
              />
              <span className="flex-1">Regular Token</span>
              <span className="font-semibold text-gray-700">{regularPrice} Taka</span>
            </label>
            
            <label className={`flex items-center p-3 border rounded-lg ${
              currentFeast.isSet && currentFeast.hall === hall && currentFeast.time === mealTime
                ? 'border-gray-300 cursor-pointer hover:bg-gray-50'
                : 'border-gray-200 bg-gray-50 cursor-not-allowed'
            }`}>
              <input
                type="radio"
                name="tokenType"
                value="feast"
                checked={tokenType === 'feast'}
                onChange={(e) => setTokenType(e.target.value)}
                disabled={!currentFeast.isSet || currentFeast.hall !== hall || currentFeast.time !== mealTime}
                className="mr-3"
              />
              <span className="flex-1">
                Feast Token
                {(!currentFeast.isSet || currentFeast.hall !== hall || currentFeast.time !== mealTime) && (
                  <span className="text-sm text-red-600 ml-2">(Not Available)</span>
                )}
              </span>
              {currentFeast.isSet && currentFeast.hall === hall && currentFeast.time === mealTime && (
                <span className="font-semibold text-gray-700">{currentFeast.price} Taka</span>
              )}
            </label>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Current Balance:</span>
            <span className="text-xl font-bold text-blue-600">{student.balance.toFixed(2)} Taka</span>
          </div>
        </div>

        {message && (
          <div className={`${
            messageType === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          } border px-4 py-3 rounded-lg`}>
            {message}
          </div>
        )}

        <button
          onClick={handlePurchase}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Purchase Token
        </button>
      </div>
    </div>
  );
};

export default BuyToken