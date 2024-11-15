"use client";

const Page = () => {
  return (
    <div className="fixed inset-0 bg-slate-300/30 backdrop-blur-sm">
      <div className="bg-secondary p-6 rounded-lg shadow-md max-w-lg mx-auto text-white space-y-4 fixed  right-0">
        {/* Task Title */}
        <h1 className="text-3xl font-semibold">Schedule kickoff meeting</h1>

        {/* Assignee and Due Date */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">Assignee</p>
            <div className="flex items-center space-x-2">
              <span className="bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center text-white font-semibold">
                MF
              </span>
              <p>Moammad Al-Faisal Fansa</p>
            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Due Date</p>
            <div className="flex items-center space-x-2">
              <span className="material-icons text-green-500">event</span>
              <p>Nov 7 – 11</p>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div>
          <p className="text-gray-400 text-sm">Projects</p>
          <div className="flex items-center space-x-2">
            <span className="bg-gray-700 rounded-full px-3 py-1 text-sm">
              Cross-functional project plan
            </span>
            <span className="bg-gray-700 rounded-full px-3 py-1 text-sm">
              Untitled section
            </span>
          </div>
        </div>

        {/* Dependencies */}
        <div>
          <p className="text-gray-400 text-sm">Dependencies</p>
          <p className="text-blue-500 cursor-pointer">Add dependencies</p>
        </div>

        {/* Fields */}
        <div>
          <p className="text-gray-400 text-sm">Fields</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center justify-between bg-gray-700 rounded px-3 py-2">
              <span>Priority</span>
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs">
                Medium
              </span>
            </div>
            <div className="flex items-center justify-between bg-gray-700 rounded px-3 py-2">
              <span>Status</span>
              <span className="bg-yellow-500 text-black px-2 py-1 rounded text-xs">
                At risk
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-gray-400 text-sm">Description</p>
          <p className="text-gray-300">What is this task about?</p>
        </div>

        {/* Subtask Button */}
        <button className="bg-gray-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2">
          <span className="material-icons">add</span>
          <span>Add subtask</span>
        </button>
      </div>
    </div>
  );
};

export default Page;
