import React, { useState } from "react";

const labels = [
  "Prospecting",
  "Deal Closed",
  "Deal Closed",
  "Prospecting",
  "Deal Closed",
  "Prospecting",
  "Deal Closed",
  "Prospecting",
  "Deal Closed",
  "Prospecting",
  "Deal Closed",
  "Prospecting",
  "Deal Closed",
  "Prospecting",
  "Deal Closed"
];

const ManageLabels = () => {
  const [visibleLabels, setVisibleLabels] = useState(
    Array(labels.length).fill(false)
  );

  const handleShow = (index) => {
    const updated = [...visibleLabels];
    updated[index] = true;
    setVisibleLabels(updated);
  };

  const handleHide = (index) => {
    const updated = [...visibleLabels];
    updated[index] = false;
    setVisibleLabels(updated);
  };

  return (
    <div>
      <div className="border-b border-border pb-2 mb-8">
        <div className="flex font-semibold text-[16px] text-black py-4">
          <div className="w-1/2">Sale Stage labels</div>
          <div className="w-1/2">Show in label list</div>
        </div>
      </div>

      <div className="space-y-5 text-[14px]">
        {labels.map((label, index) => {
          const isVisible = visibleLabels[index];
          return (
            <div key={index} className="flex justify-between">
              <div className="w-1/2 text-[#4F4F4F] font-medium">{label}</div>
              <div className="w-1/2 flex gap-3 items-center">
                <button
                  className={`hover:underline font-semibold ${
                    isVisible ? "text-bluelinks" : "text-black"
                  }`}
                  onClick={() => handleShow(index)}
                >
                  Show
                </button>
                <button
                  className="hover:underline font-semibold text-bluelinks"
                  onClick={() => handleHide(index)}
                >
                  Hide
                </button>
                {isVisible && (
                  <span className="text-black font-semibold">show if unread</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <hr className="border-border mt-[70px] mb-4"/>

      <div className="mt-6 text-[14px] text-black">
        <p>
          Note: Removing a label will not remove the messages with that label.
        </p>
      </div>
    </div>
  );
};

export default ManageLabels;
