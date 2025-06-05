import React, { useState } from 'react';
import axios from 'axios';
import TaskList from '../TaskList/TaskList';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    descriptions: "",
    assignTo: "",
    categories: "",
    dates: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const[history,sethistory]=useState(()=>{
    return JSON.parse(localStorage.getItem('task_History'))||[];
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("The admin task data", formData);

    const updateHistory=[...history,formData];
    localStorage.setItem("task_History",JSON.stringify(updateHistory));
    localStorage.getItem("Current_task",JSON.stringify(formData));
    sethistory(updateHistory);
    console.log("the task as follows",task_History);
  };
  return (
    <div className="bg-black min-h-screen flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-xl flex justify-between items-center mb-6">
        <h1 className="text-2xl text-white">Hello, Admin</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Log out
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 w-full max-w-xl p-6 rounded shadow-lg flex flex-col"
      >
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Create Task</h2>
        <div className="mb-4">
          <label htmlFor="name" className="text-white block mb-1">Task Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Task Name"
            className="bg-gray-800 h-10 w-full px-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="assignTo" className="text-white block mb-1">Assign To</label>
          <input
            id="assignTo"
            name="assignTo"
            type="text"
            value={formData.assignTo}
            onChange={handleChange}
            placeholder="Assign To"
            className="bg-gray-800 h-10 w-full px-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categories" className="text-white block mb-1">Categories</label>
          <input
            id="categories"
            name="categories"
            type="text"
            value={formData.categories}
            onChange={handleChange}
            placeholder="Categories"
            className="bg-gray-800 h-10 w-full px-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dates" className="text-white block mb-1">Due Date</label>
          <input
            id="dates"
            name="dates"
            type="date"
            value={formData.dates}
            onChange={handleChange}
            className="bg-gray-800 h-10 w-full px-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descriptions" className="text-white block mb-1">Description</label>
          <textarea
            id="descriptions"
            name="descriptions"
            value={formData.descriptions}
            onChange={handleChange}
            placeholder="Enter task description..."
            rows={4}
            className="bg-gray-800 w-full px-4 py-2 rounded text-white resize-y focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-red-400 text-black font-semibold mt-4 rounded-xl hover:bg-red-500 transition"
        >
          Create Task
        </button>
      </form>
      <div className="w-full max-w-xl mt-8">
        <TaskList tasks={history} />
      </div>
    </div>
  );
};

export default AdminDashboard;
