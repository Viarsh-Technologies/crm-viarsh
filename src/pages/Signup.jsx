import { useState } from 'react';
import { FaGoogle, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PageTitleLogin from '../components/layout/PageTitleLogin';


export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <PageTitleLogin title={'CM'} />

      {/* Main Content Centered */}
      <div className="flex-grow flex items-center justify-center px-4 bg-brand-surface ">
        <div className="p-8  w-full max-w-md ">
        <h2 className="text-2xl text-[#37352F] font-semibold text-center mb-2">Sign Up</h2>
        <p className="text-center text-sm text-[#101010] mb-6">
          Already have an company?{' '}
          <a>
          <Link
              to="/signin"
              className="text-sm text-[#009DE9] hover:underline"
            >
              Signin
            </Link>
          </a>  
        </p>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full mt-1 px-3 bg-white py-2 border rounded-md focus:border-[#DDDFE3]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full mt-1 px-3 bg-white py-2 border rounded-md focus:border-[#DDDFE3]"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full mt-1 px-3 bg-white py-2 border rounded-md focus:border-[#DDDFE3]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full mt-1 px-3 bg-white py-2 border rounded-md focus:border-[#DDDFE3]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>

         

          <button
            type="submit"
            className="w-full bg-[#32D583] text-white py-2 rounded-md "
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#B5BACA]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-brand-surface border-[#B5BACA] border-1 px-3 text-gray-500 rounded-md p-1">OR</span>
          </div>
        </div>

        <div className="mt-6 flex justify-center space-x-6">
          <a href="#" className="text-red-500 text-xl border border-red-500 p-2 rounded-full hover:bg-red-50">
            <FaGoogle />
          </a>
          <a href="#" className="text-blue-600 text-xl border border-blue-600 p-2 rounded-full hover:bg-blue-50">
            <FaFacebookF />
          </a>
          <a href="#" className="text-blue-700 text-xl border border-blue-700 p-2 rounded-full hover:bg-blue-100">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}
