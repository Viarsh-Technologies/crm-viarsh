import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageTitleLogin from "../components/layout/PageTitleLogin";
import "../styles/root.css";
import BackArrow from "../assets/back-arrow.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("OTP sent to your email.");
        // Navigate to /newpassword and pass email in state
        navigate("/newpassword", { state: { email } });
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      alert("Something went wrong.");
    }
  };
  

  return (
    <div className="h-screen overflow-hidden bg-gradient-custom flex flex-col">
    <PageTitleLogin title={"CM"} />

    {/* Main Content Fully Centered */}
    <div className="flex-grow flex mt-[5rem] justify-center">
      <div className="w-full max-w-md flex flex-col">
          <Link to="/signin" className="pt-4 self-start">
            <img src={BackArrow} alt="Back" />
          </Link>

          <h2 className="text-auth-header mb-2 mt-8">Forgot Your Password?</h2>
          <p className="text-black font-semibold mb-6 pl-8 pr-8 text-center">
            Enter your email address and we will send you instructions to reset
            your password.
          </p>

          {/* Form */}
          <form className="space-y-4 w-[450px]" onSubmit={handleSubmit}>
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