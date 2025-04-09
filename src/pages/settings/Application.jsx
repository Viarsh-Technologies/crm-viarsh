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
    <div className="min-h-screen bg-blue-50 m-5 flex flex-col gap-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-4">Personalize Instacart</h2>
        <p className="text-sm text-gray-600 mb-4">
          Share website-specific information to help Operator complete tasks.
        </p>
        <label className="block mb-2 font-medium">Additional instructions</label>
        <textarea
          value={additionalInstructions}
          onChange={(e) => setAdditionalInstructions(e.target.value)}
          className="w-full h-40 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <div className="flex justify-end gap-4 mt-4">
          <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Manage</h3>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span>Browsing data</span>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 cursor-pointer">
              Log out and clear site data
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span>Personalization</span>
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 cursor-pointer">
              Delete personalization
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">
          Set State and Local Opportunities Email Preferences
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Let us know any preferences such as keywords, NAICS, geography, etc.
        </p>
        <textarea
          value={emailPreferences}
          onChange={(e) => setEmailPreferences(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <div className="flex justify-end gap-4 mt-4">
          <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
