import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Components/Auth/Login';
import AdminDashboard from './Components/Dashboard/AdminDashboard';
import EmployeeDashboard from './Components/Dashboard/EmployeeDashboard';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  const userlogin = (email) => {
    if (email.includes('@admin.com')) {
      setUserRole('admin');
    } else if (email.includes('@employee.com')) {
      setUserRole('employee');
    }
  };

  return (
    <Router>
      <div className='bg-black min-h-screen w-full'>
        <Routes>
          <Route path='/' element={<Login userRole={userRole} userlogin={userlogin} />} />
          <Route
            path='/admin'
            element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
          />
          <Route
            path='/employee'
            element={userRole === 'employee' ? <EmployeeDashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
