import { useState } from "react";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageTitleLogin from "../components/layout/PageTitleLogin";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen bg-brand-surface flex flex-col">
      <PageTitleLogin title={"CM"} />

      {/* Main Content Fully Centered */}
      <div className="flex-grow flex items-center justify-center">
        <div className="p-8 w-full max-w-md flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-center mb-2 text-[#37352F]">
          Enter Your New Password
          </h2>
          <p className="text-center text-sm text-[#767572] mb-6">
          Add OTP and reset your password.
            
          </p>

          {/* Form */}
          <form className="space-y-7 w-[450px]">
            
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                id="otp"
                type="otp"
                required
                className="w-full h-[37px] mt-1 px-3 bg-white py-2 border-1 border-border"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
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

            

            <div className="flex justify-between items-center text-white rounded-md">
              <button
                type="submit"
                className="w-full h-[37px] mt-3 bg-[#32D583] text-white py-2 rounded-md"
              >
                Submit
              </button>

              
            </div>
          </form>

         

          
        </div>
      </div>
    </div>
  );
}
