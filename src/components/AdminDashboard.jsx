import React, { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import storageHelper from "../utils/storageHelper";

const AdminDashboard = ({ onLogout }) => {
  const [currentFeast, setCurrentFeast] = useState({ isSet: false });
  const [hall, setHall] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const halls = ['Zia', 'Bongobondhu', 'Tinshed', 'Hamid', 'Selim', 'Shohidul'];

  useEffect(() => {
    loadFeast();
  }, []);

  const loadFeast = async () => {
    const feast = await storageHelper.getFeast();
    setCurrentFeast(feast);
  };

  const handleSetFeast = async () => {
    if (!hall || !time || !price) {
      setMessage('Please fill all fields');
      return;
    }

    const feastPrice = parseInt(price);
    if (isNaN(feastPrice) || feastPrice <= 0) {
      setMessage('Please enter a valid price');
      return;
    }

    const feast = {
      hall,
      time,
      price: feastPrice,
      isSet: true
    };

    await storageHelper.saveFeast(feast);
    setCurrentFeast(feast);
    setMessage('Feast set successfully!');
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {currentFeast.isSet && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-purple-800 mb-2">Current Feast Settings</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Hall:</span> {currentFeast.hall}</p>
              <p><span className="font-medium">Time:</span> {currentFeast.time}</p>
              <p><span className="font-medium">Price:</span> {currentFeast.price} Taka</p>
            </div>
          </div>
        )}

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
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose time...</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Feast Token Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price in Taka"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {message}
            </div>
          )}

          <button
            onClick={handleSetFeast}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Set Feast
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard