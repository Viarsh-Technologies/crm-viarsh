import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-2">Forgot Your Password?</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Enter your email address and we will send you instructions to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            <a href="/newpassword">
            Continue
            </a>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <a>
            <Link
              to="/signin"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
