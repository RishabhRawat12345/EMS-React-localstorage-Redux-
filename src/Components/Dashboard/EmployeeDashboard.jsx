import React, { useEffect, useState } from 'react';
import TaskNumber from '../TaskList/TaskNumber';
import TaskList from '../TaskList/TaskList';

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState(() => {
    const saved = localStorage.getItem("employeeTaskStatus");
    return saved ? JSON.parse(saved) : {};
  });

  // Counts
  const completedCount = Object.values(taskStatus).filter(status => status === 'completed').length;
  const notCompletedCount = Object.values(taskStatus).filter(status => status === 'not-completed').length;
  const acceptedCount = assignedTasks.length;

  useEffect(() => {
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

  useEffect(() => {
    localStorage.setItem("employeeTaskStatus", JSON.stringify(taskStatus));
  }, [taskStatus]);

  const handleComplete = (taskId) => {
    setTaskStatus(prev => ({ ...prev, [taskId]: 'completed' }));
  };

  const handleNotComplete = (taskId) => {
    setTaskStatus(prev => ({ ...prev, [taskId]: 'not-completed' }));
  };

  const handleLogout = () => {
    localStorage.removeItem("current_login_employee");
    window.location.href = '/login';
  };

  if (!currentUser) {
    return (
      <div className='bg-black min-h-screen text-white p-8'>
        <h1 className="text-xl">Please log in to access the dashboard.</h1>
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen text-white p-4'>
      <div className="flex justify-between items-center mb-6">
        <h1 className='text-2xl'>
          Hello,<br />
          {currentUser?.name}
        </h1>
        <button 
          onClick={handleLogout}
          className='border border-white px-4 py-2 text-black rounded w-20 h-10 bg-red-600'
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

      {assignedTasks.length === 0 ? (
        <p className="mt-4">You have no tasks assigned yet.</p>
      ) : (
        <TaskList
          tasks={assignedTasks}
          onComplete={handleComplete}
          onNotComplete={handleNotComplete}
          taskStatus={taskStatus}
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;
