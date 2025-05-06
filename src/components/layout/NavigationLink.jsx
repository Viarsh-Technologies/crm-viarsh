import React from 'react';
import { NavLink } from 'react-router-dom';

const NavigationLink = ({
  to,
  icon,
  notificationDot = false,
  warnDot = false,
  pendingCount,
  mailCount,
}) => {
  return (
    <div className="relative">
      <NavLink
  to={to}
  className={({ isActive }) =>
    `w-[40px] h-[40px] relative flex items-center justify-center rounded-md transition-colors duration-150
     hover:bg-gray-200 ${isActive ? "bg-gray-200" : ""}`
  }
>
  <img
    src={icon}
    alt="nav icon"
    className="w-[23px] h-[23px] object-contain"
  />

  {/* Notification Dot */}
  {notificationDot && (
    <span className="absolute top-[7px] right-[10px] w-[10px] h-[10px] rounded-full border-2 border-white bg-red-600" />
  )}

  {/* Warning Dot */}
  {warnDot && (
    <span className="absolute top-[7px] right-[7px] w-[10px] h-[10px] rounded-full border-2 border-white bg-red-600" />
  )}

  {/* Email Badge */}
  {mailCount > 0 && (
    <span className="absolute -top-[6px] -right-[6px] min-w-[16px] h-[16px] px-[5px] text-[10px] flex items-center justify-center text-white bg-red-600 rounded-full font-semibold leading-none">
      {mailCount > 120 ? '120+' : mailCount}
    </span>
  )}

  {/* Pending Approval Badge */}
  {pendingCount > 0 && (
    <span className="absolute -top-[8px] -right-[6px] min-w-[16px] h-[16px] px-[5px] text-[10px] flex items-center justify-center text-white bg-red-600 rounded-full font-semibold leading-none">
      {pendingCount > 120 ? '120+' : pendingCount}
    </span>
  )}
</NavLink>


      {/* {notificationDot && (
        <span className="absolute top-0 right-0 w-[10px] h-[10px] rounded-full border-2 border-white bg-red-600" />
      )}

      {warnDot && (
        <span className="absolute top-0 right-0 w-[10px] h-[10px] rounded-full border-2 border-white bg-yellow-400" />
      )}

      {mailCount > 0 && (
        <span className="absolute top-0 right-0 min-w-[16px] h-[16px] px-[5px] text-[10px] flex items-center justify-center text-white bg-red-600 rounded-full font-semibold leading-none">
          {mailCount > 120 ? '120+' : mailCount}
        </span>
      )}

      {pendingCount > 0 && (
        <span className="absolute top-0 right-0 min-w-[16px] h-[16px] px-[5px] text-[10px] flex items-center justify-center text-white bg-red-600 rounded-full font-semibold leading-none">
          {pendingCount > 120 ? '120+' : pendingCount}
        </span>
      )} */}
    </div>
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
