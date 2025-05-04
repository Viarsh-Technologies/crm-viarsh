import React, { useState } from "react";
import Mailbox from "./Mailbox";
import General from "./General";
import InviteTeamMember from "./InviteTeamMember";
import PricingCards from "./PricingCards";
import Application from "./Application";
import Sender from "./Sender";
import ManageLabels from "./ManageLabels";
import PageTitle from "../../components/layout/PageTitle";
import { Plus } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabList = [
    { key: "general", label: "General" },
    { key: "managelabels", label: "Manage Labels" },
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
        case "managelabels":
        return <ManageLabels />;
      case "sender":
        return <Sender />;
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
          <div className="p-6 bg-white rounded-lg shadow text-gray-500">
            <p>Content for "{activeTab}" tab is under construction.</p>
          </div>
        );
    }
  };

  const onAction = () => {
    navigate("/addProject");
  };

  return (
    <div>
      <div className="max-w-6xl w-full">
        <PageTitle
          title="Settings"
          actionText="Upgrade"
          ActionIcon={Plus}
          onAction={onAction}
          />


        <p className="text-sm text-gray-600 my-5">
          Manage your account details and preferences below.
        </p>

        <div className="flex flex-wrap gap-3 mb-6">
          {tabList.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-white border-border border-1 "
                  : " text-gray-700 "
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main content area */}
        <div className="bg-white p-6 rounded-md w-full min-h-screen">
  {renderContent()}
</div>


      </div>
    </div>
  );
};

export default Settings;
