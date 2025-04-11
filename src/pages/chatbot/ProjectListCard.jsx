import React, { useState } from "react";
import {
  FiMaximize2,
  FiThumbsUp,
  FiThumbsDown,
  FiCopy,
  FiShare,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const ProjectListCard = ({ onExpand }) => {
  const [liked, setLiked] = useState(null);

  const handleReaction = (type) => {
    setLiked((prev) => (prev === type ? null : type));
    toast.info(`Reaction ${type}d (demo)`, { autoClose: 1500 });
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText("Preset chat answer content (demo).")
      .then(() => {
        toast.success("Copied to clipboard (demo)", { autoClose: 1500 });
      })
      .catch((err) => {
        toast.error("Failed to copy (demo)", { autoClose: 1500 });
        console.error("Copy failed:", err);
      });
  };

  const handleShare = () => {
    toast.info("Sharing dialog would appear here (demo)", { autoClose: 2000 });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white border border-gray-200 rounded-lg w-full md:w-3/4 shadow p-4 my-4 relative ">
        <button
          onClick={onExpand}
          className="absolute top-2 right-2 p-1.5 rounded hover:bg-gray-100 text-gray-500"
          data-tooltip="Expand Card"
          aria-label="Expand Card"
        >
          <FiMaximize2 size={18} />
        </button>

        {/* Card Content */}
        <h3 className="text-md font-semibold mb-2 text-gray-700">
          Project List
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            This is where the project list or related chat/tasks would appear.
          </p>
          <p>It's currently a placeholder card.</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 pt-3 border-t border-gray-200">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleReaction("like")}
            className={`p-1 rounded ${
              liked === "like"
                ? "text-blue-500 bg-blue-100"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            data-tooltip="Like"
            aria-label="Like"
          >
            <FiThumbsUp size={16} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleReaction("dislike")}
            className={`p-1 rounded ${
              liked === "dislike"
                ? "text-red-500 bg-red-100"
                : "text-gray-500 hover:bg-gray-100"
            }`}
            data-tooltip="Dislike"
            aria-label="Dislike"
          >
            <FiThumbsDown size={16} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className="p-1 rounded text-gray-500 hover:bg-gray-100"
            data-tooltip="Copy"
            aria-label="Copy content"
          >
            <FiCopy size={16} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="p-1 rounded text-gray-500 hover:bg-gray-100"
            data-tooltip="Share"
            aria-label="Share content"
          >
            <FiShare size={16} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProjectListCard;
