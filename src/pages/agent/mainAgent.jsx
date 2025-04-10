import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryPanel from './HistoryPanel';
import ChatPanel from './ChatPanel';
import PageTitle from '../../components/layout/PageTitle'
import { FaPlus } from 'react-icons/fa'; // Importing the Plus icon

// Initial history data
const initialHistory = [
    {
        id: 1,
        userQuestion: "How do you style a button in Tailwind CSS?",
        agentResponse: "To style a button in Tailwind, you can use utility classes like `bg-blue-500`, `hover:bg-blue-700`, `text-white`, `font-bold`, `py-2`, `px-4`, and `rounded`.",
        topic: "Tailwind CSS",
        instructions: "This is instructions column",
        action: "This is action column",
      },
      {
        id: 2,
        userQuestion: "What is state in React?",
        agentResponse: "In React, state is a JavaScript object that holds data specific to a component which can change over time. When the state changes, the component re-renders.",
        topic: "React JS",
        instructions: "This is instructions column",
        action: "This is action column",
      }
      
];

function MainAgent() {
  const [historyItems, setHistoryItems] = useState(initialHistory);
  const navigate = useNavigate();

  const addHistoryEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now(), // Unique ID
      topic: entry.topic || "Processing...",
      instructions: entry.instructions || "N/A",
      action: entry.action || "N/A",
    };
    setHistoryItems(prevItems => [newEntry, ...prevItems]);
  };

  const onAction = () => {
    navigate('/'); 
  };

  return (
    <>
    {/* PageTitle component with action button */}
    <PageTitle 
        title="Projects" 
        actionText="All AI Agnets" 
        ActionIcon={FaPlus} 
        onAction={onAction} 
      />
    <div className="flex flex-col h-screen mt-2">
      
      <h3 className="text-1xl mb-1 text-gray-800">Chatbot Agent &gt; Project Flow</h3>

      {/* Main Container */}
      <div className="flex h-[90vh] w-[80%] border-[#c6c6c6] border-1">
        {/* Left Panel: History Panel */}
        <div className="w-[70%] border-r border-gray-300 overflow-y-auto bg-white p-2">
          <HistoryPanel historyItems={historyItems} />
        </div>

        {/* Right Panel: ChatPanel */}
        <div className="w-[70%] flex flex-col">
          {/* Pass addHistoryEntry function to ChatPanel */}
          <ChatPanel addHistoryEntry={addHistoryEntry} />
        </div>
      </div>
    </div>
    </>
  );
}

export default MainAgent;
