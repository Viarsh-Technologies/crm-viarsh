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
          <h2 className="text-[32px] font-bold text-center mb-2 text-[#37352F]">
          Forgot Your Password?
          </h2>
          <p className="text-center text-sm text-[#767572] mb-6">
          Enter your email address and we will send you 
instructions to reset your password.
            
          </p>

          {/* Form */}
          <form className="space-y-7 w-[450px]">
            
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full h-[37px] mt-1 px-3 bg-white py-2 border-1 border-border"
              />
            </div>


            

            <div className="flex justify-between items-center text-white rounded-md">
            <button
            type="submit"
            className="w-full bg-[#32D583] text-white py-2 rounded-md "
          >
            <a href="/newpassword">
            Continue
            </a>
          </button>

              
            </div>
          </form>

        

        </div>
      </div>
    </div>
  );
}












          
       