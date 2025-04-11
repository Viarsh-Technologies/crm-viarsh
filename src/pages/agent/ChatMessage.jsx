import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';

function ChatMessage({ message }) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start max-w-xs md:max-w-md lg:max-w-lg ${isUser ? 'flex-row-reverse' : ''}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-500 ml-2' : 'bg-green-500 mr-2'}`}>
          {isUser ? <FaUser className="text-white text-sm" /> : <FaRobot className="text-white text-sm" />}
        </div>
        <div
          className={`px-4 py-2 rounded-lg shadow-md ${
            isUser ? 'bg-blue-100 text-gray-800' : 'bg-[#F0F1FA] text-gray-800 border border-gray-200'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          {/* <span className="text-xs text-gray-400 mt-1 block">{new Date(message.id).toLocaleTimeString()}</span> */}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;