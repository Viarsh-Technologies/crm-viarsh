import React from "react";
import { NavLink } from "react-router-dom";

const NavigationLink = ({
  to,
  icon,
  notificationDot = false,
  warnDot = false,
  mailMsg = false,
  pendingApproval = false,
  pendingCount,
  mailCount,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-center p-[6px] rounded-md transition-colors duration-150
         hover:bg-brand-surface ${isActive ? "bg-brand-surface" : ""}`
      }
    >
      <img
        src={icon}
        alt="nav icon"
        className="w-[23px] h-[23px] object-contain"
      />

      {notificationDot && (
        <span className="absolute bottom-[190px] left-[35px] w-[11px] h-[10px] rounded-full border-2 border-[#FAFBFF] bg-[#EA4646]" />
      )}

      {warnDot && (
        <span className="absolute bottom-[145px] left-[38px] w-[11px] h-[10px] rounded-full border-2 border-[#FAFBFF] bg-[#EA4646]" />
      )}

      {/* email */}
      {mailCount > 0 && (
        <span className="absolute bottom-[331px] left-[35px] min-w-[16px] h-[16px] px-[5px] text-[10px] flex items-center justify-center text-white bg-red-600 rounded-full font-semibold leading-none">
          {mailCount > 120 ? "120+" : mailCount}
        </span>
      )}

      {pendingCount > 0 && (
        <span className="absolute bottom-[288px] left-[35px] min-w-[16px] h-[16px] px-[5px] text-[10px] flex items-center justify-center text-white bg-red-600 rounded-full font-semibold leading-none">
          {pendingCount > 120 ? "120+" : pendingCount}
        </span>
      )}
    </NavLink>
  );
};

export default NavigationLink;




















// *********** FUTURE: Real-time msg NUMBERS via WS/SSE )   (EX.120)      **************




// const [inboxCount, setInboxCount] = useState(0)
// const [pendingCount, setPendingCount] = useState(0)

// useEffect(() => {
//   const socket = new WebSocket("wss://yourserver.com/notifications")

//   socket.onmessage = (event) => {
//     const data = JSON.parse(event.data)
//     setInboxCount(data.inboxCount)
//     setPendingCount(data.pendingCount)
//   }

//   return () => socket.close()
// }, [])
