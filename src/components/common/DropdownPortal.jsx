import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const DropdownPortal = ({ children, targetRef }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 250 + window.scrollX,
      });
    }
  }, [targetRef]);

  if (!position) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        top: position.top,
        left: position.left,
        position: "absolute",
        zIndex: 9999,
        width: "250px",
      }}
      className="ml-[280px]"
    >
      {children}
    </div>,
    document.body
  );
};

export default DropdownPortal;
