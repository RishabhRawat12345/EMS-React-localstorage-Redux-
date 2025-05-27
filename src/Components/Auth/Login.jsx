import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ userRole, userlogin }) => {
  const [Name, Setname] = useState('');
  const [Email, SetEmail] = useState('');
  const [Password, Setpassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedEmail = Email.trim().toLowerCase();
    userlogin(normalizedEmail);

    let role = '';
    if (normalizedEmail.includes('@admin.com')) {
      role = 'admin';
      const userData = {
        name: Name,
        username: normalizedEmail,
        password: Password,
        role,
        logintime: new Date().toISOString(),
      };

      let login_Admin_History = JSON.parse(localStorage.getItem('login_Admin_History')) || [];
      const alreadyExistsIndex = login_Admin_History.findIndex(
        (entry) => entry.username === normalizedEmail
      );

      if (alreadyExistsIndex === -1) {
        login_Admin_History.push(userData); 
      } else {
        console.log("Admin already present");
      }

      localStorage.setItem('login_Admin_History', JSON.stringify(login_Admin_History));
      localStorage.setItem('Current_Login_Admin', JSON.stringify(userData));

      console.log("Admin Login History:", login_Admin_History);
      navigate('/admin');
    } 
    
    else if (normalizedEmail.includes('@employee.com')) {
      role = 'employee';
      const userData = {
        name: Name,
        username: normalizedEmail,
        password: Password,
        role,
        logintime: new Date().toISOString(),
      };

      let login_Employee_History = JSON.parse(localStorage.getItem('login_Employee_History')) || [];
      const alreadyExistsIndex = login_Employee_History.findIndex(
        (entry) => entry.username === normalizedEmail
      );

      if (alreadyExistsIndex === -1) {
        login_Employee_History.push(userData);
      } else {
        console.log("Employee data is already present");
      }

      localStorage.setItem('login_Employee_History', JSON.stringify(login_Employee_History));
      localStorage.setItem('current_login_employee', JSON.stringify(userData));

      console.log("Employee Login History:", login_Employee_History);
      navigate('/employee');
    } 
    
    else {
      alert("Invalid role or email format");
      return;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black min-h-screen flex flex-col items-center justify-center text-white gap-6 p-4"
    >
      <h1 className="text-3xl font-bold">Log in</h1>
      <div className="flex flex-col gap-3 w-64">
        <input
          className="border-2 border-red-400 bg-black p-2 rounded"
          type="text"
          placeholder="Your Name"
          value={Name}
          onChange={(e) => Setname(e.target.value)}
        />
        <input
          className="border-2 border-red-400 bg-black p-2 rounded"
          type="email"
          placeholder="Email (e.g. name@admin.com)"
          value={Email}
          onChange={(e) => SetEmail(e.target.value)}
        />
        <input
          className="border-2 border-red-400 bg-black p-2 rounded"
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => Setpassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-red-500 px-6 py-2 rounded hover:bg-red-600 transition"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
