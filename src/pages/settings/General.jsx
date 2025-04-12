import React, { useState } from "react";

const General = () => {
  // State management for form data
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [language, setLanguage] = useState("");
  const [dateFormat, setDateFormat] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the form data
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("timeZone", timeZone);
    formData.append("language", language);
    formData.append("dateFormat", dateFormat);
    
    try {
      // Example of a POST request to the backend
      const response = await fetch("/api/saveUserData", {
        method: "POST",
        body: formData, // Send the form data as multipart
      });

      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        alert("Error saving data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#eef0fd] flex items-start py-10 px-4">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-xl border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          {/* Basics Section */}
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Basics</h2>

            <div className="space-y-6">
              <div className="border-t border-gray-100 pt-4">
                <label className="text-sm text-gray-600 block mb-1">Photo</label>
                <input
                  type="file"
                  className="text-sm text-gray-700"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
              <div className="border-t border-gray-100 pt-4">
                <label className="text-sm text-gray-600 block mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="border-t border-gray-100 pt-4">
                <label className="text-sm text-gray-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="border-t border-gray-100 pt-4">
                <div className="text-sm text-gray-600 mb-1">Linked team company</div>
                <div className="text-xs text-gray-400">
                  Easily switch between them and access both companys from any device.
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Preferences</h2>

            <div className="space-y-6">
              <div className="border-t border-gray-100 pt-4">
                <label className="text-sm text-gray-600 block mb-1">Automatic time zone</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g. GMT+5:30"
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                />
              </div>
              <div className="border-t border-gray-100 pt-4">
                <label className="text-sm text-gray-600 block mb-1">Language</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g. English"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </div>
              <div className="border-t border-gray-100 pt-4 pb-6">
                <label className="text-sm text-gray-600 block mb-1">Date format</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  placeholder="e.g. DD/MM/YYYY"
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default General;
