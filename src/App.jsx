import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import Header from "./components/Header";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import Signup from "./components/SignUp";
import StudentDashboard from "./components/StudentDashboard";
import HeroSection from "./components/HeroSection";

// Utility function to get today's date
export const getTodayDate = () => {
  const date = new Date();
  return date.toISOString().split("T")[0];
};

const App = () => {
  const [screen, setScreen] = useState("main");
  const [currentStudent, setCurrentStudent] = useState(null);

  // Debug wrapper for screen changes
  const handleSetScreen = (newScreen) => {
    console.log("Changing screen to:", newScreen); // Debug log
    setScreen(newScreen);
  };

  // Student Login Function
  const handleStudentLogin = (student) => {
    console.log("Student logging in:", student); // Debug log
    setCurrentStudent(student);
    handleSetScreen("studentDashboard");
  };

  // Student Logout Function
  const handleLogout = () => {
    console.log("Logging out student"); // Debug log
    setCurrentStudent(null);
    handleSetScreen("main");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden transition-colors duration-300">

      <div className="absolute inset-0 opacity-20 transition-opacity duration-300">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.3),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_80%,rgba(148,163,184,0.2),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.2),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(100,116,139,0.1),transparent_50%)]"></div>
      </div>


      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-pulse transition-colors duration-300"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000 transition-colors duration-300"></div>

      <div className="mx-auto relative z-10">
        {/* Header with all necessary props */}
        <Header 
          screen={screen} 
          setScreen={handleSetScreen} 
        />

        {/* HeroSection - Only show on main screen */}
        {screen === "main" && (
          <div className="animate-fade-in -mt-25 transition-all duration-300 mx-auto">
            <HeroSection screen={screen} setScreen={setScreen} />
          </div>
        )}

        {/* Enhanced Transitions Container */}
        <div className="max-w-2xl mx-auto pt-4 animate-fade-in transition-all duration-300">
          {/* Student Login Component */}
          {screen === "studentLogin" && (
            <div className="mt-20 animate-fade-in transition-all duration-300">
              <Login
                onLogin={handleStudentLogin}
                onSwitchToSignup={() => handleSetScreen("studentSignup")}
                onBack={() => handleSetScreen("main")}
              />
            </div>
          )}

          {/* Signup Component - Fixed onBack */}
          {screen === "studentSignup" && (
            <div className="animate-fade-in transition-all duration-300">
              <Signup
                onSignup={() => handleSetScreen("studentLogin")}
                onBack={() => handleSetScreen("main")} // Fixed: was "studentLogin"
              />
            </div>
          )}

          {/* Student Dashboard Component */}
          {screen === "studentDashboard" && currentStudent && (
            <div className="animate-slide-up transition-all duration-300">
              <StudentDashboard
                student={currentStudent}
                onLogout={handleLogout}
              />
            </div>
          )}

          {/* Admin Login Component */}
          {screen === "adminLogin" && (
            <div className="mt-20 animate-fade-in transition-all duration-300">
              <AdminLogin
                onLogin={() => handleSetScreen("adminDashboard")}
                onBack={() => handleSetScreen("main")}
              />
            </div>
          )}

          {/* Admin Dashboard Component */}
          {screen === "adminDashboard" && (
            <div className="animate-slide-up transition-all duration-300">
              <AdminDashboard onLogout={handleLogout} />
            </div>
          )}
        </div>

        {/* Global Styles - Enhanced for theme transitions */}
        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out;
          }
          .animate-slide-up {
            animation: slide-up 0.6s ease-out;
          }
          /* Smooth theme transition */
          html {
            transition: background-color 0.3s ease, color 0.3s ease;
          }
        `}</style>
      </div>
    </div>
  );
};

export default App;
