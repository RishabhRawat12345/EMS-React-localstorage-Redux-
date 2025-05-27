import React from 'react';

const TaskNumber = ({ Total, onComplete, onNotComplete, accepted }) => {
  return (
    <div className="h-[25rem] flex items-center justify-center bg-black p-4">
      <div className="shadow-xl rounded-xl p-4 w-full max-w-sm md:max-w-4xl">
        <div className="grid grid-cols-2 gap-4 md:flex md:flex-row md:justify-between">
          <div className="bg-blue-500 h-32 rounded w-full md:w-56 flex flex-col">
            <h1 className='flex justify-center text-2xl text-white font-extrabold items-center mt-6'>{Total}</h1>
            <h1 className='flex justify-center text-2xl text-white font-extrabold mt-2'>Total Task</h1>
          </div>
          <div className="bg-green-700 h-32 rounded w-full md:w-56">
            <h1 className='flex justify-center text-2xl text-white font-extrabold mt-6'>{onComplete}</h1>
            <h1 className='flex justify-center text-2xl text-white font-extrabold mt-2'>Completed</h1>
          </div>
          <div className="bg-yellow-500 h-32 rounded w-full md:w-56">
            <h1 className='flex justify-center text-2xl text-white font-extrabold mt-6'>{accepted}</h1>
            <h1 className='flex justify-center text-2xl text-white font-extrabold mt-2'>Accepted</h1>
          </div>
          <div className="bg-red-600 h-32 rounded w-full md:w-56">
            <h1 className='flex justify-center text-2xl text-white font-extrabold mt-6'>{onNotComplete}</h1>
            <h1 className='flex justify-center text-2xl text-white font-extrabold mt-2'>Failed</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskNumber;
