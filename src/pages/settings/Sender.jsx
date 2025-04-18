import React, { useState } from "react";

const Sender = () => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [language, setLanguage] = useState("");
  const [dateFormat, setDateFormat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("timeZone", timeZone);
    formData.append("language", language);
    formData.append("dateFormat", dateFormat);

    try {
      const response = await fetch("/api/saveUserData", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Data saved successfully!");
      } else {
        alert("Error saving data.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error connecting to the server.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 mb-5">Basics</h2>
          <div className="space-y-6">
            
            <div className="border-t border-border pt-4 flex items-center">
              <label className="text-sm text-black font-medium w-1/4">Photo</label>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>

            <div className="border-t border-border pt-4 flex items-center">
              <label className="text-sm text-black font-medium w-1/4">Name</label>
              <input
                type="text"
                className="w-3/4 p-2 border border-border rounded-md text-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ border: "none", outline: "none" }}
              />
            </div>

            <div className="border-t border-border pt-4 flex items-center">
              <label className="text-sm font-medium w-1/4">Email Address</label>
              <input
                type="email"
                className="w-3/4 p-2 border border-border rounded-md text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ border: "none", outline: "none" }}
              />
            </div>

            <div className="border-t border-b border-border pt-4 pb-6">
              <label className="text-sm font-medium w-1/4">Linked team account</label>
              
              <hr className="my-2 mt-7 border-border" style={{ width: "60%", marginLeft: "auto" }} />
              <div className="text-sm font-medium max-w-[267px]">
                Easily switch between them and access both companys from any device.
              </div>
            </div>
          </div>
          <div className="my-6">
          <h2 className="text-sm font-bold text-gray-800 mb-5">Preferences</h2>
          <div className="space-y-6">


            <div className="border-t border-border pt-4 flex items-center">
              <label className="text-sm text-black font-medium w-1/4">Automatic time zone</label>
              <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  style={{ border: "none", outline: "none" }}
                />
            </div>

            <div className="border-t border-border pt-4 flex items-center">
              <label className="text-sm font-medium w-1/4">Language</label>
              <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{ border: "none", outline: "none" }}
                />
            </div>
            <div className="border-t border-border pt-4 flex items-center">
              <label className="text-sm font-medium w-1/4">Date format</label>
              <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  style={{ border: "none", outline: "none" }}
                />
            </div>
            </div>
            </div>
        </div>
      </form>
    </div>
  );
};

export default Sender;
