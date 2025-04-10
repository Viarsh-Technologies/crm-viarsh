import { useState } from 'react';

export default function NewPassword() {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle password reset logic (e.g., validate OTP and reset password)
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    console.log('OTP:', otp);
    console.log('New Password:', password);
    // Call API or logic to reset password with OTP
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-surface">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-4">Enter Your New Password</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter the OTP sent to your email and create a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
