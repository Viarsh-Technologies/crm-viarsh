import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.1 } },
  exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.1 } },
};

const ContextMenu = ({ options, position, onClose }) => {
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (onClose) {
        onClose();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside, true);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {position && (
        <motion.div
          className="absolute z-20 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1"
          style={{ top: position.y, left: position.x }}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => {
                option.action();
                if (onClose) onClose();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            >
              {option.label}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;
