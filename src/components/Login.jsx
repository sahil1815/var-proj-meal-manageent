import React, { useState } from "react";
import { User } from "lucide-react";
import storageHelper from "../utils/storageHelper";

const Login = ({ onLogin, onSwitchToSignup, onBack }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");

    const students = await storageHelper.getStudents();
    const student = students.find(
      (s) => s.id === parseInt(id) && s.password === password
    );

    if (student) {
      onLogin(student);
    } else {
      setError("Invalid ID or password");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <User className="w-16 h-16 mx-auto text-blue-600 mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">Student Login</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Student ID
          </label>
          <input
            type="number"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Login
        </button>

        <button
          type="button"
          onClick={onSwitchToSignup}
          className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Create New Account
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Back to Main Menu
        </button>
      </div>
    </div>
  );
};

export default Login;
