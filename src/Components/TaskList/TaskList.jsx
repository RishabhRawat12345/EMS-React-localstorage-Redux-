import React from "react";

const TaskList = ({ tasks, onComplete, onNotComplete, taskStatus = {} }) => {
  return (
    <div id="taskList" className="w-full h-auto overflow-x-auto mt-6 p-4">
      <div className="flex gap-4 md:gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex-shrink-0 bg-yellow-100 h-48 w-64 md:h-56 md:w-72 rounded-xl shadow-md p-4 border border-yellow-300"
          >
            <h2 className="text-lg font-semibold text-yellow-800 mb-2 flex justify-center">
              {task.name}
            </h2>
            <p className="text-sm text-yellow-900 flex justify-center items-center align-middle mt-6">
              {task.descriptions}
            </p>

            {/* Show buttons if task is unmarked, otherwise show status */}
            {!taskStatus?.[task.id] ? (
              <div className="flex justify-between mt-6 gap-4">
                <button
                  onClick={() => onComplete(task.id)}
                  className="completed h-10 w-30 bg-green-300 hover:bg-green-400 text-white rounded px-2"
                >
                  Completed
                </button>
                <button
                  onClick={() => onNotComplete(task.id)}
                  className="not-completed h-10 w-35 bg-red-500 hover:bg-red-600 text-white rounded px-2"
                >
                  Not Completed
                </button>
              </div>
            ) : (
              <p
                className={`text-sm mt-6 font-bold text-center ${
                  taskStatus[task.id] === "completed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Marked as {taskStatus[task.id].replace("-", " ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
