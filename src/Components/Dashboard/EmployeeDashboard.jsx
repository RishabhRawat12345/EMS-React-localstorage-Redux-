import React, { useEffect, useState } from 'react';
import TaskNumber from '../TaskList/TaskNumber';
import TaskList from '../TaskList/TaskList';

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState(() => {
    // Load task statuses from localStorage
    const saved = localStorage.getItem("employeeTaskStatus");
    return saved ? JSON.parse(saved) : {};
  });

  // Calculate counts based on taskStatus
  const completedCount = Object.values(taskStatus).filter(
    status => status === 'completed'
  ).length;

  const notCompletedCount = Object.values(taskStatus).filter(
    status => status === 'not-completed'
  ).length;

  const acceptedCount = assignedTasks.length; // All assigned tasks are "accepted"

  useEffect(() => {
    // Load user and tasks from localStorage
    const user = JSON.parse(localStorage.getItem("current_login_employee"));
    const taskData = JSON.parse(localStorage.getItem("task_History")) || [];
    setCurrentUser(user);
    setTasks(taskData);

    if (user && taskData.length > 0) {
      const username = user.name?.toLowerCase();
      const filtered = taskData.filter(
        task => task.assignTo?.toLowerCase() === username
      );
      setAssignedTasks(filtered);
    }
  }, []);

  // Save taskStatus to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("employeeTaskStatus", JSON.stringify(taskStatus));
  }, [taskStatus]);

  const handleComplete = (index) => {
    setTaskStatus(prev => {
      const newStatus = { ...prev, [index]: 'completed' };
      return newStatus;
    });
  };

  const handleNotComplete = (index) => {
    setTaskStatus(prev => {
      const newStatus = { ...prev, [index]: 'not-completed' };
      return newStatus;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("current_login_employee");
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className='bg-black min-h-screen'>
      <div className="header flex justify-between">
        <h1 className='text-2xl text-white p-4'>
          Hello,<br />
          {currentUser?.name}
        </h1>
        <button 
          onClick={handleLogout}
          className='border border-white px-4 py-2 mr-4 mt-4 text-black rounded w-20 h-10 bg-red-600'
        >
          Log out
        </button>
      </div>

      <TaskNumber
        Total={assignedTasks.length}
        onComplete={completedCount}
        onNotComplete={notCompletedCount}
        accepted={acceptedCount}
      />

      <TaskList
        tasks={assignedTasks}
        onComplete={handleComplete}
        onNotComplete={handleNotComplete}
        taskStatus={taskStatus}
      />
    </div>
  );
};

export default EmployeeDashboard;