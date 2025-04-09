import React, { useState } from "react";
import { Switch } from "@material-tailwind/react";

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
        setMailboxes((prev) => [...prev, { ...newMailbox, id: mailboxes.length + 1 }]);
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
    <div className="p-6 bg-gradient-to-r from-indigo-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Mailbox Manager</h2>
            <p className="text-sm text-gray-500">
              Ava will dynamically rotate between your mailboxes, maximizing deliverability.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={addMailbox}
              disabled={isLoading}
              className={`${
                isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              } text-white px-5 py-2 rounded-md text-sm transition-colors duration-200`}
            >
              {isLoading ? "Adding..." : "+ Add Email Address"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-600 text-sm bg-gray-200">
                <th className="py-3 px-6">Accounts</th>
                <th className="py-3 px-6">Daily Email Capacity</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Mailbox Health</th>
                <th className="py-3 px-6">Use This Mailbox</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mailboxes.length > 0 ? (
                mailboxes.map((box, idx) => (
                  <tr
                    key={box.id}
                    className="border-t border-gray-100 hover:bg-gray-50 text-sm"
                  >
                    <td className="py-3 px-6 flex items-center gap-3">
                      <img
                        src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
                        alt="Gmail"
                        className="w-6 h-6"
                      />
                      {box.email}
                    </td>
                    <td className="py-3 px-6">
                      <div className="border border-blue-500 rounded-full w-12 h-12 flex items-center justify-center text-blue-700 font-semibold">
                        {box.dailyCapacity}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full max-w-max truncate">
                        ⚠️ {box.status}
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
                    <td className="py-3 px-6">
                      <Switch
                        color="green"
                        checked={box.enabled}
                        onChange={() => toggleMailbox(idx)}
                        className="transition-colors duration-200"
                      />
                    </td>
                    <td className="py-3 px-6 flex gap-3">
                      <button
                        className="text-red-500 hover:text-red-700 text-sm transition-colors duration-200"
                        onClick={() => disconnectMailbox(idx)}
                      >
                        Disconnect
                      </button>
                      <button
                        onClick={() => disconnectMailbox(idx)}
                        className="text-red-400 hover:text-red-600 text-sm transition-colors duration-200"
                      >
                        🗑️
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
    </div>
  );
};

export default Mailbox;
