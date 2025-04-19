import { useState } from "react";

export default function Application() {
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [emailPreferences, setEmailPreferences] = useState("");

  const handleSubmit = async () => {
    const data = {
      additionalInstructions,
      emailPreferences
    };

    try {
      const response = await fetch("http://localhost:5000/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error while saving data.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white">
        <h2 className="text-[16px] font-semibold mb-1">Personalize Instacart</h2>
        <p className="text-[14px] text-black font-medium mb-4">
          Share website-specific information to help Operator complete tasks.
        </p>
        <div className="border-1 border-border p-5 rounded-[10px] h-[421px]">
        <label className="block mb-2 font-medium">Additional instructions</label>
        <textarea
        placeholder="i prefer organic optio"
          value={additionalInstructions}
          onChange={(e) => setAdditionalInstructions(e.target.value)}
          className="w-full p-3 border border-border rounded-md h-[295px] focus:outline-none mt-4"
        ></textarea>
        <div className="flex justify-end gap-4 mt-4">
          <button className="w-[110px] h-[34px] py-2 border-1 border-[#A1A1A1] text-btn-text rounded-[6px] cursor-pointer">
            Cancel
          </button>
          
          <button
          onClick={handleSubmit}
          className="w-[110px] h-[34px] py-2 border-1 bg-[#F0F1FA] border-[#A1A1A1] text-btn-text rounded-[6px] cursor-pointer">
            Save
          </button>
        </div>
      </div>
      </div>

      <div className="mt-9">
        <h3 className="text-[16px] font-semibold mb-4">Manage</h3>
        <hr className="border-border"/>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span>Browsing data</span>
            
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 cursor-pointer">
              Log out and clear site data
            </button>
            
          </div>
          <hr className="border-border"/>
          <div className="flex justify-between items-center">
            <span>Personalization</span>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 cursor-pointer">
              Delete personalization
            </button>
          </div>
          <hr className="border-border "/>
        </div>
      </div>

      <div className="">
  <h3 className="text-[16px] font-medium mb-4 mt-7">
    Set State and Local Opportunities Email Preferences
  </h3>

  <div className="border-border border-1 p-3 rounded-[10px]">
    <p className="text-[14px] font-normal text-black mb-4">
      Let us know any preferences such as keywords, NAICS, geography, etc.
    </p>

    <textarea
      value={emailPreferences}
      onChange={(e) => setEmailPreferences(e.target.value)}
      className="w-[1040px] h-32 border border-gray-300 rounded-[10px] mx-auto block"
    ></textarea>

    <div className="flex justify-end gap-4 mt-4">
      <button className="w-[110px] h-[34px] py-2 border-1 border-[#A1A1A1] text-btn-text rounded-[6px] cursor-pointer">
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="w-[110px] h-[34px] py-2 border-1 bg-[#F0F1FA] border-[#A1A1A1] text-btn-text rounded-[6px] cursor-pointer"
      >
        Save
      </button>
    </div>
  </div>
</div>

    </div>
  );
}
