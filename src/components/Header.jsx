import { UtensilsCrossed, Home, User, Settings, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";

const Header = ({ setScreen, theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Helper to close menu and change screen
  const handleNavClick = (newScreen) => {
    setScreen(newScreen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header className="relative bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-100/50  transition-all duration-300 z-50">
      {/* Main Navbar */}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          {/* Logo - Left Side */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-slate-600 dark:to-cyan-500 rounded-xl shadow-lg flex items-center justify-center border-2 border-white/20 dark:border-slate-200/20 transition-all duration-300 hover:scale-110">
                <UtensilsCrossed className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-sm" />
              </div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 dark:bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800 -mr-0.5 -mt-0.5"></div>
            </div>

            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 dark:from-slate-200 dark:to-cyan-400 bg-clip-text text-transparent tracking-tight">
                Hall Meal Token
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                University Automation
              </p>
            </div>

            <div className="md:hidden">
              <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">HMT</span>
            </div>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8 z-10">
            <button 
              onClick={() => handleNavClick("main")} 
              className="group relative flex items-center space-x-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 cursor-pointer z-10"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
              <div className="absolute -bottom-4 left-0 w-full h-0.5 bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-400 dark:to-cyan-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            <button 
              onClick={() => handleNavClick("studentLogin")} 
              className="group relative flex items-center space-x-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer z-10"
            >
              <User className="w-4 h-4" />
              <span>Student Portal</span>
              <div className="absolute -bottom-4 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>

            <button 
              onClick={() => handleNavClick("adminLogin")} 
              className="group relative flex items-center space-x-1 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 cursor-pointer z-10"
            >
              <Settings className="w-4 h-4" />
              <span>Admin Panel</span>
              <div className="absolute -bottom-4 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center space-x-4 z-10">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-lg border border-slate-200/50 dark:border-slate-600/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <Sun className={`w-5 h-5 text-amber-500 transition-transform duration-300 ${theme === 'dark' ? 'rotate-180 scale-0' : 'scale-100'}`} />
              <Moon className={`w-5 h-5 text-slate-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${theme === 'light' ? 'rotate-180 scale-0' : 'scale-100'}`} />
            </button>

            <div className="hidden md:block w-px h-6 bg-slate-200 dark:bg-slate-600"></div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-200 text-slate-700 dark:text-slate-300 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-xl border-b border-slate-100/50 dark:border-slate-700/50 z-40 transition-all duration-300">
          <div className="px-4 py-4 space-y-2">
            <button 
              onClick={() => handleNavClick("main")} 
              className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
            >
              <Home className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0" />
              <span className="text-base font-medium text-slate-700 dark:text-slate-300">Home</span>
            </button>

            <button 
              onClick={() => handleNavClick("studentLogin")} 
              className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
            >
              <User className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0" />
              <span className="text-base font-medium text-slate-700 dark:text-slate-300">Student Portal</span>
            </button>

            <button 
              onClick={() => handleNavClick("adminLogin")} 
              className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
            >
              <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0" />
              <span className="text-base font-medium text-slate-700 dark:text-slate-300">Admin Panel</span>
            </button>

            <div className="pt-2 border-t border-slate-200/50 dark:border-slate-600/50">
              <button
                onClick={() => { toggleTheme(); setIsMenuOpen(false); }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0" />
                    <span className="text-base font-medium text-slate-700 dark:text-slate-300">Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span className="text-base font-medium text-slate-700 dark:text-slate-300">Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subtle bottom accent line - Adjusted position to avoid overlap */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-500 dark:from-cyan-400 dark:via-purple-400 dark:to-slate-400 rounded-full opacity-60 -z-10"></div>

      <style jsx>{`
        .group:hover .scale-x-100 {
          transform: scaleX(1);
        }

        @media (max-width: 768px) {
          nav {
            padding: 0 1rem;
          }
        }

        html {
          scroll-behavior: smooth;
        }

        header {
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>
    </header>
  );
};

export default Header;
