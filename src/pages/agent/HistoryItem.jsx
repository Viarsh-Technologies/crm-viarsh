import React, { useState } from 'react';
import {
  FaChevronDown,
  FaChevronUp,
  FaUser,
  FaRobot,
  FaTag,
  FaCode,
  FaEye,
} from 'react-icons/fa';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from 'react-icons/md';

function HistoryItem({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [showAction, setShowAction] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-300">
      <div
        className={`flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-all duration-300 ${
          isExpanded ? 'bg-gray-100' : 'bg-gray-50'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm font-medium text-gray-800 truncate mr-2">
          {item.userQuestion}
        </span>
        {isExpanded ? (
          <FaChevronUp className="text-gray-500 transition-transform transform rotate-180" />
        ) : (
          <FaChevronDown className="text-gray-500 transition-transform transform rotate-0" />
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200 space-y-4 text-sm">
          {/* User Prompt */}
          <div className="border border-gray-200 rounded-xl ">
            <div className="flex items-center text-gray-600 font-bold bg-[#F0F1FA] rounded-xl p-3">
              User Prompt
            </div>
            <hr className="border-gray-200" />
            <p className="text-gray-800 p-3">{item.userQuestion}</p>
          </div>

          {/* Metadata */}
          <div className="border border-gray-200 rounded-xl space-y-2">
            <div className="flex items-center text-gray-600 font-bold bg-[#F4FFF9] rounded-xl p-3">
              <FaTag />Select Topic
            </div>
            <hr className="border-gray-200" />
            <h2 className="text-base font-semibold text-blue-600 ml-5 mt-4">🟩 {item.topic || 'Off_Topic'}</h2>
            <p className="text-xs text-gray-500 mt-1 ml-5">{item.userQuestion}</p>
            <hr className="my-1 border-gray-200" />

            {/* Instructions Toggle */}
            <div
              className="flex items-center justify-between text-gray-600 cursor-pointer px-5 py-1"
              onClick={() => setShowInstruction(!showInstruction)}
            >
              <span className="flex items-center">
                {showInstruction ? (
                  <MdOutlineKeyboardArrowUp className="text-gray-500 mr-2" />
                ) : (
                  <MdOutlineKeyboardArrowDown className="text-gray-500 mr-2" />
                )}
                Instructions
              </span>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden px-5 ${
                showInstruction ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-xs text-gray-600 bg-[#F9FAFB] rounded-md px-3 py-2">
                {item.instructions}
              </p>
            </div>

            <hr className="my-1 border-gray-200" />

            {/* Action Toggle */}
            <div
              className="flex items-center justify-between text-gray-600 cursor-pointer px-5 py-1"
              onClick={() => setShowAction(!showAction)}
            >
              <span className="flex items-center">
                {showAction ? (
                  <MdOutlineKeyboardArrowUp className="text-gray-500 mr-2" />
                ) : (
                  <MdOutlineKeyboardArrowDown className="text-gray-500 mr-2" />
                )}
                Action
              </span>
            </div>
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden px-5 ${
                showAction ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="text-xs text-gray-600 bg-[#F9FAFB] rounded-md px-3 py-2">
                {item.action}
              </p>
            </div>
          </div>

          {/* Agent Response */}
          <div className="border border-gray-200 rounded">
            <div className="flex justify-between items-center bg-[#F4FFF9] rounded-xl p-3">
              <div className="flex items-center text-gray-600 font-semibold">
                <FaRobot className="mr-2" /> Agent Response
              </div>
              <div className="flex items-center space-x-3 text-gray-500">
                <FaCode className="cursor-pointer hover:text-blue-600" title="View Code" />
                <FaEye className="cursor-pointer hover:text-blue-600" title="View Output" />
              </div>
            </div>
            <hr className="border-gray-200" />
            <p className="text-gray-800 whitespace-pre-wrap my-2 ml-4">{item.agentResponse}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryItem;
