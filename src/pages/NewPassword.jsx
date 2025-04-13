import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTitleLogin from '../components/layout/PageTitleLogin';


export default function NewPassword() {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    console.log('OTP:', otp);
    console.log('New Password:', password);
    // Add password reset logic here
  };

  return (
    <div className="h-screen bg-brand-surface flex flex-col">
      {/* Top Bar */}
      <PageTitleLogin title={'CM'} />

      {/* Main Content Centered */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="p-8  w-full max-w-md ">
          <h2 className="text-3xl font-semibold text-center mb-4 text-[#37352F]">Enter Your New Password</h2>
          <p className="text-center text-sm text-[#101010] mb-6">
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
                className="w-full mt-1 px-3 bg-white py-2 border rounded-md focus:border-[#DDDFE3]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 px-3 bg-white py-2 border rounded-md focus:border-[#DDDFE3]"
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
                className="w-full mt-1 px-3 bg-white py-2 border rounded-md focus:border-[#DDDFE3]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#32D583] text-white py-2 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
