import React, { useState } from "react";
import { Switch } from "@material-tailwind/react";
import Delete from '../../assets/delete.svg'
import Warning from '../../assets/warning.svg'

// Initial mailboxes data
const initialMailboxes = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  email: `jaspar${i + 1}@artisanoutbound.com`,
  dailyCapacity: Math.floor(Math.random() * 100) + 50,
  status: "Urgent",
  health: [true, false, false, true, true],
  enabled: true,
}));

const Mailbox = () => {
  const [mailboxes, setMailboxes] = useState(initialMailboxes);
  const [isLoading, setIsLoading] = useState(false);

  // Toggle switch functionality
  const toggleMailbox = async (index) => {
    const updated = [...mailboxes];
    const mailbox = updated[index];

    // Simulate API call to toggle mailbox
    setIsLoading(true);
    try {
      const response = await fetch(`/api/mailboxes/${mailbox.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enabled: !mailbox.enabled }),
      });

      if (response.ok) {
        mailbox.enabled = !mailbox.enabled;
        setMailboxes(updated);
      } else {
        alert("Error toggling mailbox status.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to toggle mailbox.");
    } finally {
      setIsLoading(false);
    }
  };

  // Remove mailbox (Disconnect)
  const disconnectMailbox = async (index) => {
    const updated = [...mailboxes];
    const mailbox = updated[index];

    // Simulate API call to remove mailbox
    setIsLoading(true);
    try {
      const response = await fetch(`/api/mailboxes/${mailbox.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        updated.splice(index, 1);
        setMailboxes(updated);
      } else {
        alert("Error disconnecting mailbox.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to disconnect mailbox.");
    } finally {
      setIsLoading(false);
    }
  };

  // Add new mailbox (simulate API call)
  const addMailbox = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to add mailbox
      const newMailbox = {
        email: `newuser${mailboxes.length + 1}@artisanoutbound.com`,
        dailyCapacity: Math.floor(Math.random() * 100) + 50,
        status: "Urgent",
        health: [true, true, true, false, true],
        enabled: true,
      };

      const response = await fetch("/api/mailboxes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMailbox),
      });

      if (response.ok) {
        setMailboxes((prev) => [
          ...prev,
          { ...newMailbox, id: mailboxes.length + 1 },
        ]);
      } else {
        alert("Error adding mailbox.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add mailbox.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[16px] font-semibold text-gray-800">
            Mailbox Manager
          </h2>
          <p className="text-[14px] font-medium text-black">
            Ava will dynamically rotate between your mailboxes, maximizing
            deliverability.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={addMailbox}
            disabled={isLoading}
            className={`${
              isLoading ? "bg-gray-300 cursor-not-allowed " : "bg-brand-green"
            } text-white w-[186px] h-[38px] rounded-md text-sm transition-colors duration-200`}
          >
            {isLoading ? "Adding..." : "+ Add Email Address"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto ">
          <thead>
            <tr className="text-left text-black text-[16px] bg-gray-200 font-semibold">
              <th className="py-2 px-6 rounded-l-[10px]">companys</th>
              <th className="py-3 ">Daily Email Capacity</th>
              <th className="py-3 px-8">Status</th>
              <th className="py-3 px-9">Mailbox Health</th>
              <th className="py-3 ">Use This Mailbox</th>
              <th className="py-3 px-6 rounded-r-[10px]"></th>{" "}
              {/* Action/Disconnect */}
            </tr>
          </thead>

          <tbody>
            {mailboxes.length > 0 ? (
              mailboxes.map((box, idx) => (
                <tr key={box.id} className="border-b border-border text-sm">
                  <td className="py-3 px-6 flex text-[16px] font-normal items-center gap-3">
                    <img
                      src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                      alt="Gmail"
                      className="w-[25px] h-[25px]"
                    />
                    {box.email}
                  </td>
                  <td className="py-3 px-6">
                    <div className="border-3 border-[#9ABAEB] rounded-full w-12 h-12 flex items-center justify-center text-blue-700 font-semibold">
                      {box.dailyCapacity}
                    </div>
                  </td>
                  <td className="">
                  
                  
                    <span className="inline-flex items-center gap-1 justify-center bg-[#FFDCDC] text-[#C9593A] text-[14px] w-[83px] h-[24px] rounded-full truncate">
                     <img src={Warning} alt="warn" />{box.status}
                    </span>
                  </td>

                  <td className="py-3 px-6 flex gap-2">
                    {box.health.map((status, i) => (
                      <div
                        key={i}
                        className={`h-1 w-6 rounded-full ${
                          status ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                    ))}
                  </td>
                  {/* <td className="py-3 px-9">
                    <Switch
                      color="green"
                      // checked={box.enabled}
                      // onChange={() => toggleMailbox(idx)}
                      className="transition-colors duration-200 custom-switch"
                      style={{
                        transform: "scale(1.5)",
                      }}
                    />
                  </td> */}


<td className="py-3 px-9">
  <Switch
    color="green"
    checked={true} // Default on karne ke liye
    // onChange={() => toggleMailbox(idx)}
    className="transition-colors duration-200 custom-switch"
    style={{
      transform: "scale(1.5)",
    }}
  />
</td>


                  <td className="flex w-[130px] h-[30px] items-center justify-center gap-3 border-2 border-[#C9593A] rounded-md">
                    <button
                      className="text-[#C9593A]  font-[14px] duration-200"
                      onClick={() => disconnectMailbox(idx)}
                    >
                      Disconnect
                    </button>
                    <button
                      onClick={() => disconnectMailbox(idx)}
                      className="text-[#C9593A] transition-colors duration-200"
                    >
                      <img src={Delete} alt="delete" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-6">
                  No mailboxes connected. Click "Add Email Address" to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mailbox;
