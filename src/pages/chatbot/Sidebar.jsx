import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiChevronLeft, FiChevronsLeft } from "react-icons/fi";
import ChatItem from "./ChatItem";
import { useDebounce } from "../../hooks/useDebounce";

const sidebarVariants = {
  open: {
    width: 280,
    opacity: 1,
    transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  },
  closed: {
    width: 0,
    opacity: 0,
    transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    paddingLeft: 0,
    paddingRight: 0,
  },
};

const contentVariants = {
  open: { opacity: 1, x: 0, transition: { delay: 0.1, duration: 0.2 } },
  collapsed: { opacity: 0, x: -20, transition: { duration: 0.1 } },
};

const Sidebar = ({
  chats,
  isOpen,
  selectedChatId,
  onSelectChat,
  onToggleFolder,
  onRenameItem,
  onDeleteItem,
  onDuplicateItem,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filterChats = (items, term) => {
    if (!term) return items;
    term = term.toLowerCase();

    return items.reduce((acc, item) => {
      if (item.name.toLowerCase().includes(term)) {
        acc.push(item);
      } else if (item.type === "folder") {
        const filteredChildren = filterChats(item.children || [], term);
        if (filteredChildren.length > 0) {
          acc.push({ ...item, children: filteredChildren, isOpen: true });
        }
      }
      return acc;
    }, []);
  };

  const filteredChats = useMemo(
    () => filterChats(chats, debouncedSearchTerm),
    [chats, debouncedSearchTerm]
  );

  const renderChatItems = (items, level = 0) => {
    return items.map((item) => (
      <ChatItem
        key={item.id}
        item={item}
        level={level}
        isSelected={selectedChatId === item.id}
        onSelect={onSelectChat}
        onToggleFolder={onToggleFolder}
        onRename={onRenameItem}
        onDelete={onDeleteItem}
        onDuplicate={onDuplicateItem}
        // onMove={handleMoveItem} // Add handler later
      />
    ));
  };

  return (
    <motion.div
      variants={sidebarVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="bg-gray-50 border-r border-gray-200 h-screen flex flex-col relative shrink-0 overflow-hidden"
    >
      {/* Collapse Button */}
      {/* <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-2 -right-3 z-10 p-1 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 transition-colors"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        data-tooltip={isCollapsed ? "Expand" : "Collapse"}
      >
        {isCollapsed ? <FiChevronsLeft size={16} /> : <FiChevronLeft size={16} />}
      </button> */}

      {/* Content Area */}
      <div
        className={`flex-grow flex flex-col w-[280px] transition-opacity duration-150 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Search Bar */}
        <motion.div
          variants={contentVariants}
          className="p-3 sticky top-0 bg-gray-50 z-10"
        >
          <div className="relative">
            <FiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              tabIndex={isOpen ? 0 : -1}
            />
          </div>
        </motion.div>

        {/* Chat List */}
        <motion.div layout variants={contentVariants} className="px-1 py-2">
          <AnimatePresence initial={false}>
            {renderChatItems(filteredChats)}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
