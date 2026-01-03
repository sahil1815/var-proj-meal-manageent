import React, { useEffect, useState } from "react";
import { XCircle, History } from "lucide-react";
import storageHelper from "../utils/storageHelper";

const PurchaseHistory = ({ studentId, onBack }) => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    loadPurchases();
  }, [studentId]);

  const loadPurchases = async () => {
    const allPurchases = await storageHelper.getPurchases();
    const studentPurchases = allPurchases.filter(p => p.studentId === studentId);
    setPurchases(studentPurchases);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Purchase History</h2>
        <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          <XCircle className="w-6 h-6" />
        </button>
      </div>

      {purchases.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No purchases found!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((purchase, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{purchase.hall} Hall</h3>
                  <p className="text-sm text-gray-600">{purchase.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  purchase.tokenType === 'Feast' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {purchase.tokenType}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{purchase.date}</span>
                <span className="font-semibold text-gray-800">{purchase.price} Taka</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory