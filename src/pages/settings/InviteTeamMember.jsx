import React, { useState } from 'react';

const InviteTeamMember = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'Member',
    plan: 'Accelerate',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    // Basic form validation
    if (!formData.fullName || !formData.email) {
      setErrorMessage('Please fill in all required fields.');
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
      const response = await fetch('/api/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setSuccessMessage('Team member invited successfully!');
        setFormData({
          fullName: '',
          email: '',
          role: 'Member',
          plan: 'Accelerate',
        }); // Reset form after successful submission
      } else {
        throw new Error('Failed to invite team member');
      }
    } catch (error) {
      setErrorMessage('Error sending invite. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-130 bg-[#f0f2ff] flex m-5">
      <div className="bg-white p-6 rounded-lg shadow-sm w-full max-w-2xl border border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900 mb-1">Invite Team Members</h2>
        <p className="text-xs text-gray-600 mb-6">
          You will be billed for each team member according to the plan selected.
          <span className="text-blue-500 underline ml-1 cursor-pointer">View pricing details here.</span>
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Team Member Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        {/* Email + Role */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Team Member Email</label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="flex-1 border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-40 border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="Member">Member</option>
              <option value="Others">Others 1</option>
              <option value="Others">Others 2</option>
            </select>
          </div>
        </div>

        {/* Plan + Button */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Plan</label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="Accelerate">Accelerate</option>
              <option value="Accessible">SuperCharge</option>
              <option value="Not Accessible">XYZ</option>
            </select>
          </div>
          <button
            onClick={handleInvite}
            disabled={isLoading}
            className={`mt-6 ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'} text-sm px-6 py-2 rounded-md border border-gray-300`}
          >
            {isLoading ? 'Inviting...' : 'Invite'}
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
