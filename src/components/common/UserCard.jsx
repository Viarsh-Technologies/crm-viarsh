import { RiLinkedinFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";

const truncateName = (name, limit = 10) => {
  return name.length > limit ? name.slice(0, limit) + ".." : name;
};

const UserCard = ({ user }) => {
  if (!user) {
    return <span className="text-gray-400 text-xs">- No Contact -</span>;
  }

  return (
    <div className="flex items-center bg-transparent rounded-lg gap-1 py-1 w-full min-w-[180px]">
      <img
        src={user.avatar || "https://via.placeholder.com/48"}
        alt={`${user.name || "User"} profile`}
        className="w-[32px] h-[32px] rounded-full object-cover flex-shrink-0"
      />

      <div className="flex-1 overflow-hidden">
        <h2
          className=" text-gray-800 truncate w-[39px] h-[22px] font-Inter"
          title={user.name}
        >
          {user.name ? truncateName(user.name, 3) : "N/A"}
        </h2>

        {/* Social Icons */}
        <div className="flex gap-1.5 mt-0.5 text-gray-500">
          {user.linkedin && (
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className=" text-white bg-[#0077B5] p-[2px] rounded-full"
            >
              <RiLinkedinFill size={14} />
            </a>
          )}
          {user.twitter && (
            <a
              href={user.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X"
              className=" text-white bg-black p-[2px] rounded-full"
            >
              <FaXTwitter size={14} />
            </a>
          )}
          {user.twitter && (
            <a className=" bg-[#D9D9D9] p-2 rounded-full ">
              <a></a>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
