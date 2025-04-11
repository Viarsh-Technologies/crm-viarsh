import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiFolder,
  FiMessageSquare,
  FiChevronRight,
  FiChevronDown,
  FiMoreHorizontal,
} from "react-icons/fi";
import ContextMenu from "./ContextMenu";

const itemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.2 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
};

const ChatItem = ({
  item,
  level = 0,
  isSelected,
  onSelect,
  onToggleFolder,
  onRename,
  onDelete,
  onDuplicate,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const renameInputRef = useRef(null);
  const itemRef = useRef(null);

  const isFolder = item.type === "folder";

  const handleMenuClick = (event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 5,
    });
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleRenameStart = () => {
    setIsRenaming(true);
    closeMenu();
  };

  const handleRenameSubmit = () => {
    if (newName.trim() && newName !== item.name) {
      onRename(item.id, newName.trim());
    } else {
      setNewName(item.name);
    }
    setIsRenaming(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRenameSubmit();
    } else if (e.key === "Escape") {
      setNewName(item.name);
      setIsRenaming(false);
    }
  };

  useEffect(() => {
    if (isRenaming && renameInputRef.current) {
      renameInputRef.current.focus();
      renameInputRef.current.select();
    }
  }, [isRenaming]);

  const menuOptions = [
    { label: "Rename", action: handleRenameStart },
    {
      label: "Duplicate",
      action: () => {
        onDuplicate(item.id);
        closeMenu();
      },
    },
    {
      label: "Delete",
      action: () => {
        onDelete(item.id);
        closeMenu();
      },
    },
    // { label: 'Move to...', action: () => { /* Implement Move Logic */ closeMenu(); } },
  ];

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div
        ref={itemRef}
        className={`flex items-center justify-between px-3 py-1.5 rounded cursor-pointer group hover:bg-gray-200 ${
          isSelected ? "bg-blue-100 hover:bg-blue-200" : ""
        }`}
        style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
        onClick={() =>
          !isRenaming &&
          (isFolder ? onToggleFolder(item.id) : onSelect(item.id))
        }
      >
        <div className="flex items-center overflow-hidden mr-2 flex-grow">
          {isFolder && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onToggleFolder(item.id);
              }}
              className="mr-1"
            >
              {item.isOpen ? (
                <FiChevronDown size={16} />
              ) : (
                <FiChevronRight size={16} />
              )}
            </span>
          )}
          <span className="mr-1">
            {isFolder ? <FiFolder size={16} /> : <FiMessageSquare size={16} />}
          </span>
          {isRenaming ? (
            <input
              ref={renameInputRef}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onBlur={handleRenameSubmit}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className="flex-grow px-1 py-0 border border-blue-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              style={{ maxWidth: "calc(100% - 40px)" }}
            />
          ) : (
            <span className="truncate text-sm">{item.name}</span>
          )}
        </div>
        {!isRenaming && (
          <button
            onClick={handleMenuClick}
            className={`p-1 rounded hover:bg-gray-300 opacity-0 group-hover:opacity-100 focus:opacity-100 ${
              isMenuOpen ? "opacity-100" : ""
            }`}
            aria-label="More options"
          >
            <FiMoreHorizontal size={16} />
          </button>
        )}
      </div>

      {isMenuOpen && (
        <ContextMenu
          options={menuOptions}
          position={menuPosition}
          onClose={closeMenu}
        />
      )}

      {isFolder && item.isOpen && (
        <AnimatePresence initial={false}>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {item.children?.map((child) => (
              <ChatItem
                key={child.id}
                item={child}
                level={level + 1}
                isSelected={isSelected && isSelected === child.id}
                onSelect={onSelect}
                onToggleFolder={onToggleFolder}
                onRename={onRename}
                onDelete={onDelete}
                onDuplicate={onDuplicate}
                // onMove={onMove}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default ChatItem;
