import React, { useState } from "react";

const InviteTeamMember = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "Member",
    plan: "Accelerate",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Basic form validation
    if (!formData.fullName || !formData.email) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    // Prepare the data to be sent to the backend
    const userData = {
      fullName: formData.fullName,
      email: formData.email,
      role: formData.role,
      plan: formData.plan,
    };

    try {
      // Example of an API call to invite the team member (replace with actual backend endpoint)
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSuccessMessage("Team member invited successfully!");
        setFormData({
          fullName: "",
          email: "",
          role: "Member",
          plan: "Accelerate",
        }); // Reset form after successful submission
      } else {
        throw new Error("Failed to invite team member");
      }
    } catch (error) {
      setErrorMessage("Error sending invite. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="bg-white p-1 w-full max-w-[44rem]">
        <h2 className="text-sm font-semibold text-[16px] text-gray-900 mb-1">
          Invite Team Members
        </h2>
        <p className="text-[14px] font-normal text-black mb-6">
          You will be billed for each team member according to the plan
          selected. View pricing details here.
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-[16px] font-medium text-black mb-1">
            Team Member Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-[33rem] border border-gray-300 px-3 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Email + Role */}
        <div className="mb-4">
          <label className="block text-[16px]  font-medium text-black mb-1">
            Team Member Email
          </label>
          <div className="flex gap-2 border border-gray-300 rounded-md w-[33rem] px-3 py-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="flex-1 rounded-md text-sm focus:outline-none"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="focus:outline-none "
            >
              <option value="Member">Member</option>
              <option value="Others">Others 1</option>
              <option value="Others">Others 2</option>
            </select>
          </div>
        </div>

        {/* Plan + Button */}
        <div className="flex gap-2 items-end w-[33rem]">
          <div className="flex-1">
            <label className="block text-[16px] font-medium text-black mb-1">
              Select Plan
            </label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-[14px] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 h-[50px]"
            >
              <option value="Accelerate">Accelerate</option>
              <option value="Accessible">SuperCharge</option>
              <option value="Not Accessible">XYZ</option>
            </select>
          </div>
          <button
            onClick={handleInvite}
            disabled={isLoading}
            className={`mt-6 ${
              isLoading ? "cursor-not-allowed bg-[#F0F1FA]" : "bg-[#F0F1FA]"
            } text-sm px-9 py-[14px] rounded-md border border-[#54768E] h-[50px]`}
          >
            {isLoading ? "Inviting..." : "Invite"}
          </button>
        </div>

        {/* Success or Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-xs mt-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-xs mt-4">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default InviteTeamMember;
