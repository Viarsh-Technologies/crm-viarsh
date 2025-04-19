import { useState } from "react";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PageTitleLogin from "../components/layout/PageTitleLogin";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";
import "../styles/root.css";

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // React Router Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, 
          {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccess("Registration successful! Please login.");
        setError('');
        setTimeout(() => {
          navigate('/signin');  // Redirect to the login page
        }, 2000); // Redirect after 2 seconds
      } else {
        setError(data.message || 'Registration failed');
        console.error('Error response:', data);  // Log the error response for debugging
      }
    } catch (error) {
      setError('An error occurred, please try again later.');
      console.error('Fetch error:', error);  // Log fetch error for debugging
    }
  };

  
  return (
    <div className="h-screen overflow-hidden bg-gradient-custom flex flex-col">
      <PageTitleLogin title={"CM"} />

      {/* Main Content Fully Centered */}
      <div className="flex-grow flex items-center justify-center">
        <div className="p-8 w-full max-w-md flex flex-col items-center justify-center">
          <h2 className="text-auth-header mb-2">Sign up</h2>
          <p className="text-secondary mb-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-sm text-[#009DE9] underline">
              Login
            </Link>
          </p>

          {/* Form */}
          <form className="space-y-7 w-[450px]" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-auth-label">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-[37px] mt-1 px-3 bg-white py-2 border-1 border-border"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-auth-label">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[37px] mt-1 px-3 bg-white py-2 border-1 border-border"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-auth-label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-[37px] mt-1 px-3 bg-white py-2 border-1 border-border"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#676872] mt-1 cursor-pointer"
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffSharp />}
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-auth-label">Repeat Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full h-[37px] mt-1 px-3 bg-white py-2 border-1 border-border"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#676872] mt-1 cursor-pointer"
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffSharp />}
                </span>
              </div>
            </div>

            {/* Show error or success messages */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {success && <div className="text-green-500 text-sm mt-2">{success}</div>}

            <div className="flex justify-between items-center text-white rounded-md">
              <button
                type="submit"
                className="w-full h-[37px] mt-2 bg-brand-green text-white py-2 rounded-md"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6 relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#B5BACA]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-brand-surface border-[#B5BACA] border-1 px-3 text-gray-500 rounded-[10px] p-1">
                OR
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="mt-6 flex justify-center space-x-6">
            <a
              href="#"
              className="text-red-500 text-xl border border-red-500 p-2 rounded-full hover:bg-red-50"
            >
              <FaGoogle />
            </a>
            <a
              href="#"
              className="text-blue-600 text-xl border border-blue-600 p-2 rounded-full hover:bg-blue-50"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-blue-700 text-xl border border-blue-700 p-2 rounded-full hover:bg-blue-100"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
