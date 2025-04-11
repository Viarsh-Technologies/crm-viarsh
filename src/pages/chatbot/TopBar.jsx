import React, { useState, useEffect } from "react";
import { FiShare2, FiSave, FiMenu } from "react-icons/fi";

const TopBar = ({
  taskTitle,
  onTitleChange,
  onShare,
  onSave,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(taskTitle);

  useEffect(() => {
    setCurrentTitle(taskTitle);
  }, [taskTitle]);

  const handleBlur = () => {
    setIsEditing(false);
    if (currentTitle.trim() !== taskTitle) {
      onTitleChange(currentTitle.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    } else if (e.key === "Escape") {
      setCurrentTitle(taskTitle);
      setIsEditing(false);
    }
  };

  return (
    <div className="h-16 bg-[#F0F1FA] border-b border-gray-200 flex items-center justify-between px-6 mt-5">
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 mr-2"
        aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
        data-tooltip={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
      >
        <FiMenu size={20} />
      </button>

      {isEditing ? (
        <input
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="text-lg font-semibold flex-grow mr-4 px-2 py-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          autoFocus
        />
      ) : (
        <h1
          className="text-lg font-semibold truncate cursor-text flex-grow mr-4"
          onClick={() => setIsEditing(true)}
          title="Click to edit task title"
        >
          {currentTitle || "Untitled Task"}
        </h1>
      )}

      <div className="flex items-center space-x-3">
        <button
          onClick={onShare}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          data-tooltip="Share Task"
          aria-label="Share Task"
        >
          <FiShare2 size={18} />
        </button>
        <button
          onClick={onSave}
          className="flex items-center px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          <FiSave size={16} className="mr-1.5" />
          Save Task
        </button>
      </div>
    </div>
  );
};

export default TopBar;
