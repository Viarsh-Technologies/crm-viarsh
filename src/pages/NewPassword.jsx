import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import PageTitleLogin from "../components/layout/PageTitleLogin";
import BackArrow from "../assets/back-arrow.svg";

export default function NewPassword() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || ""; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp, newPassword: password })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password reset successful!");
        navigate("/signin");
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="h-screen bg-gradient-custom flex flex-col">
      <PageTitleLogin title="CM" />
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center justify-center">
          <Link to="/signin" className="pt-4 self-start">
            <img src={BackArrow} alt="Back" />
          </Link>
          <h2 className="text-auth-header mb-2 mt-8">Enter Your New Password</h2>
          <p className="text-black font-semibold mb-6 pl-8 pr-8 text-center">
          Add OTP and reset your password.
          </p>

          <form className="space-y-4 w-[450px]" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="otp" className="block text-auth-label">OTP</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="w-full h-[37px] mt-1 px-3 bg-white py-2 border border-border"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-auth-label">New Password</label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-[37px] mt-1 px-3 bg-white py-2 border border-border"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-auth-label">Confirm Password</label>
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full h-[37px] mt-1 px-3 bg-white py-2 border border-border"
              />
            </div>

           

            <button
              type="submit"
              className="w-full h-[37px] mt-2 bg-brand-green text-white py-2 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
