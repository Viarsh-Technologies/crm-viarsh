import { useState } from "react";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageTitleLogin from "../components/layout/PageTitleLogin";
import { IoEyeOutline, IoEyeOffSharp } from "react-icons/io5";
import BackArrow from "../assets/back-arrow.svg";


export default function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen bg-gradient-custom flex flex-col">
      <PageTitleLogin title={"CM"} />

      {/* Main Content Fully Centered */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center justify-center">
          <Link to="/signin" className="pt-4 self-start">
                      <img src={BackArrow} alt="Back" />
                    </Link>
          <h2 className="text-auth-header mb-2 mt-8">Enter Your New Password</h2>
          <p className="text-black font-semibold mb-6 pl-8 pr-8 text-center">
            Add OTP and reset your password.
          </p>

          {/* Form */}
          <form className="space-y-7 w-[450px]">
            <div>
              <label htmlFor="otp" className="block text-auth-label">
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
              <label htmlFor="email" className="block text-auth-label">
                Password
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full h-[37px] mt-1 px-3 bg-white py-2 border-1 border-border"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-auth-label">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full h-[37px] mt-1 px-3 bg-white py-2 border-1 border-border"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-white rounded-md">
            <button
  type="submit"
  className="w-full h-[37px] mt-2 bg-brand-green text-white py-2 rounded-md"
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
