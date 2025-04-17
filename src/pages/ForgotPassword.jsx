import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageTitleLogin from "../components/layout/PageTitleLogin";
import "../styles/root.css";
import BackArrow from "../assets/back-arrow.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted email:", email);

    // Simulate sending reset link
    setTimeout(() => {
      navigate("/newpassword");
    }, 1000);
  };

  return (
    <div className="h-screen bg-gradient-custom flex flex-col">
      <PageTitleLogin title="CM" />

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md flex flex-col items-center justify-center">
          <Link to="/signin" className="pt-4 self-start">
            <img src={BackArrow} alt="Back" />
          </Link>

          <h2 className="text-auth-header mb-2 mt-8">Forgot Your Password?</h2>
          <p className="text-black font-semibold mb-6 pl-8 pr-8 text-center">
            Enter your email address and we will send you instructions to reset
            your password.
          </p>

          {/* Form */}
          <form className="space-y-7 w-[450px]" onSubmit={handleSubmit}>
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
              className="w-full bg-brand-green text-white py-2 rounded-md"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}