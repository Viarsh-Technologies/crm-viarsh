import { useState } from 'react';
import PageTitleLogin from '../components/layout/PageTitleLogin';



export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };

  return (
    <div className="h-screen bg-brand-surface flex flex-col">
      {/* Top Bar */}
      <PageTitleLogin title={'CM'} />

      {/* Main Content Centered */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="p-8  w-full max-w-md ">
        <h2 className="text-3xl font-semibold text-center mb-2 text-[#37352F]" >Forgot Your Password?</h2>
        <p className="text-center text-sm text-[#101010] mb-6">
          Enter your email address and we will send you instructions to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 bg-white py-2 border rounded-md focus:border-[#DDDFE3]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#32D583] text-white py-2 rounded-md "
          >
            <a href="/newpassword">
            Continue
            </a>
          </button>
        </form>

       
      </div>
    </div>
    </div>
  );
}
