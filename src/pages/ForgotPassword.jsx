import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitleLogin from "../components/layout/PageTitleLogin";
import "../styles/root.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle the email submission logic here
    console.log("Submitted email:", email);

    // Simulate sending reset link and redirecting
    // In real case, you'd probably call an API here
    setTimeout(() => {
      navigate("/newpassword");
    }, 1000);
  };

  return (
    <div className="h-screen bg-gradient-custom flex flex-col">
      <PageTitleLogin title={"CM"} />

      {/* Main Content Fully Centered */}
      <div className="flex-grow flex items-center justify-center">
        <div className="p-8 w-full max-w-md flex flex-col items-center justify-center">
          <h2 className="text-auth-header mb-2">Forgot Your Password?</h2>
          <p className="text-secondary mb-6 text-center">
            Enter your email address and we will send you instructions to reset your password.
          </p>

          {/* Form */}
          <form className="space-y-7 w-full" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-auth-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-[37px] mt-1 px-3 bg-white py-2 border border-border rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#32D583] text-white py-2 rounded-md hover:bg-[#28c276] transition"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
