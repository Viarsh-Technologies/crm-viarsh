// File: src/Chatbot.jsx
import { useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

import PageTitle from '../components/layout/PageTitle';




export default function Chatbot() {
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [input, setInput] = useState("");

  const handleUserSubmit = () => {
    if (!input.trim()) return;
    const newEntry = {
      user: input,
      bot: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis pellentesque enim."
    };
    setHistory((prev) => [...prev, newEntry]);
    setInput("");
  };

  const onRefresh = () => {
    window.location.reload();
  };

  return (
    <>
    <PageTitle
        title={'ChatBot'}
        actionText="New Chat"
        ActionIcon={FaPlus}
        onAction={onRefresh}
      />
    <div className="flex h-[90vh] w-3/4 bg-[#FFFFFF] m-6 rounded-xl shadow-lg overflow-hidden border border-gray-200">
        
      {/* Sidebar */}
      <div
        className={` transition-all duration-500 ease-in-out border-r border-gray-300 p-4 ${sidebarOpen ? "w-64" : "w-14"}`}
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mb-4 text-gray-600 hover:text-gray-900"
        >
          {sidebarOpen ? <GoSidebarCollapse size={20} /> : <GoSidebarExpand size={20} />}
        </button>
        {sidebarOpen && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Chat History</h2>
            <ul className="space-y-2 overflow-y-auto max-h-[calc(100vh-150px)] pr-2">
              {history.map((item, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 truncate border-b border-gray-200 pb-1"
                >
                  {item.user}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-[#F0F1FA] sticky top-0 z-10">
        <h1 className="text-xl font-semibold text-gray-800">
  {history[0]?.user?.length > 5 ? `${history[0].user.slice(0, 30)}...` : history[0]?.user || "Chatbot"}
</h1>

          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 border rounded hover:bg-gray-200">
              Save Task
            </button>
            <button className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-100 border rounded hover:bg-gray-200">
               Share
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-7 overflow-y-auto space-y-6 bg-gray-50">
          {history.map((entry, index) => (
            <div key={index} className="space-y-1 flex flex-col gap-6 ">
            {/* User Message */}
            <div className="text-left text-sm font-medium bg-blue-100 p-2 rounded-md inline-block max-w-80 ml-auto">
              {entry.user}
            </div>
            
            {/* Bot Message */}
            <div className="text-left text-sm bg-gray-200 p-2 rounded-md inline-block max-w-xl mr-auto">
              {entry.bot}
            </div>
          </div>
          
          
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-300 flex items-center gap-2 bg-white">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full border border-gray-300 p-2 pl-10 pr-10 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Start a new chat"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUserSubmit()}
            />
            <label
              htmlFor="file-upload"
              className="absolute top-2.5 left-2 text-lg cursor-pointer text-gray-600"
            >
              <IoIosLink />
            </label>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              multiple
            />
          </div>
          <button
            onClick={handleUserSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
