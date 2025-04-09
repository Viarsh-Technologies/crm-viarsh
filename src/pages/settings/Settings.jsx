import React, { useState } from "react";
import Mailbox from "./Mailbox";
import General from "./General";
import InviteTeamMember from "./InviteTeamMember";
import PricingCards from "./PricingCards";
import Application from "./Application";


const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabList = [
    { key: "general", label: "General" },
    { key: "sender", label: "Sender" },
    { key: "mailbox", label: "Mailbox (6/6)" },
    { key: "invite", label: "Invite" },
    { key: "pricing", label: "Pricing" },
    { key: "application", label: "Application" },
  ];

  const renderContent = () => {
    switch (activeTab) {
        case "general":
        return <General />;
      case "mailbox":
        return <Mailbox />;
       case "invite":
         return <InviteTeamMember />;
       case "pricing":
      return <PricingCards />;
      case "application":
      return <Application />;
      default:
        return (
          <div className="mt-4 p-4 bg-white rounded shadow text-gray-500">
            <p>Content for "{activeTab}" tab is under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen px-7 py-6 max-w-6xl">
      <div className="flex justify-center">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
              Upgrade
            </button>
          </div>
          <hr className="mb-4 border-gray-300" />
          <p className="text-sm text-gray-600 mb-4">
            Manage your details and personal preferences here
          </p>
          <div className="flex gap-4 mb-4 flex-wrap">
            {tabList.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded text-sm cursor-pointer font-medium ${
                  activeTab === tab.key
                    ? "bg-blue-100 text-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Settings;
