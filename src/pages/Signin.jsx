import { useState } from "react";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <div className=" p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-2">Sign in</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Don’t have an account?{" "}
          <a>
            <Link
              to="/signup"
              className="text-sm text-blue-600 hover:underline"
            >
              Signun
            </Link>
          </a>
        </p>

        <form className="space-y-4">
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
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
                className="w-full mt-1 px-3 py-2 border rounded-md pr-10 focus:outline-none focus:ring focus:border-blue-300"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-green-600" />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
            <a>
              <Link
                to="/forgotpassword"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-3 text-gray-500 border-1 rounded-md p-1 ">
              OR Login
            </span>
          </div>
        </div>

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
  );
}
