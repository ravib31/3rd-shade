import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LeadForm from './components/LeadForm';
import LeadDashboard from './components/LeadDashBoard';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    toast.success('Login successful!');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    toast.success('Logged out successfully!');
  };

  const handleRegister = () => {
    toast.success('Registration successful! Please login.');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-xl md:text-2xl lg:text-3xl">Channel Partner Lead Management System</h1>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/lead-form" /> : <Login onLogin={handleLogin} />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/lead-form" /> : <Register onRegister={handleRegister} />} />
            <Route path="/lead-form" element={isAuthenticated ? <LeadForm onLogout={handleLogout} /> : <Navigate to="/" />} />
            <Route path="/lead-dashboard" element={isAuthenticated ? <LeadDashboard /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
