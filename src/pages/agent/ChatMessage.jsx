import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';

function ChatMessage({ message }) {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'text-xl  justify-start'} mb-4`}>
      <div className="flex items-start max-w-xs  bg-[#F0F1FA] rounded-lg md:max-w-md lg:max-w-lg">

        {!isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-green-500 m-2">
            <FaRobot className="text-white text-sm" />
          </div>
        )}

        <div
          className={`px-4 py-2 rounded-lg ${isUser ? 'bg-blue-50 text-gray-800' : 'bg-[#F0F1FA] text-gray-800'}`}
        >
          <p className="text-sm whitespace-pre-wrap font-inter">
            {message.text}
          </p>
        </div>

        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 ml-2">
            <FaUser className="text-white text-sm" />
          </div>
        )}

      </div>
    </div>
  );
}

export default ChatMessage;
