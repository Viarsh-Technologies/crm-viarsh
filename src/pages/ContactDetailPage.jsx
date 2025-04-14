import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid"; // Optional icons
import PageTitle from '../components/layout/PageTitle';
import { X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Breadcrumbs from '../components/layout/Breadcrumbs'



const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Inbox', path: '' },
]



export default function ContactDetailPage() {
  const [showMoreAbout, setShowMoreAbout] = useState(false);
  const [showMoreExperience, setShowMoreExperience] = useState(false);
  const navigate = useNavigate();

  const onAction = () => {
    navigate("/contacts");
  };

  return (
    <div>
      <PageTitle title={'Leads'} actionText='Close' ActionIcon={X} onAction={onAction}  />
      
    
    <div className="min-h-screen">
    <div><Breadcrumbs items={breadcrumbItems} /></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-4">
            <img
              src="https://avatars.githubusercontent.com/u/175672643?v=4"
              alt="profile"
              className="rounded-full w-[104px] h-[104px] object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg w-[128px] h-[24px]">
                Dinesh Pawar
              </h2>
            </div>
          </div>

          <hr className="my-4 border-t border-[#EEF0EF]" />

          <div className="bg-white rounded-2xl text-sm text-gray-700 space-y-3">
            <div className="flex justify-between">
              <span>Job Title</span>
              <span className="font-semibold">President of Sales</span>
            </div>
            <hr className="my-4 border-t border-[#EEF0EF]" />
            <div className="flex justify-between">
              <span>Company</span>
              <span className="font-semibold">IBM</span>
            </div>
            <hr className="my-4 border-t border-[#EEF0EF]" />
            <div className="flex justify-between">
              <span>Phone</span>
              <span className="font-semibold">(308) 555-0121</span>
            </div>
            <hr className="my-4 border-t border-[#EEF0EF]" />
            <div className="flex justify-between">
              <span>Tags</span>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-gray-200 text-xs px-2 py-1 rounded">
                  Potential
                </span>
                <span className="bg-red-100 text-[#E78D69] text-xs px-2 py-1 rounded">
                  Repeat Customer
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl shadow p-6 text-sm text-gray-700 space-y-3">
          <div className="flex justify-between">
            <span>Work Email</span>
            <span className="font-semibold">felicia.reid@example.com</span>
          </div>
          <hr className="my-4 border-t border-[#EEF0EF]" />
          <div className="flex justify-between">
            <span>Home Email</span>
            <span className="font-semibold">bill.sanders@example.com</span>
          </div>
          <hr className="my-4 border-t border-[#EEF0EF]" />
          <div className="flex justify-between">
            <span>Website</span>
            <span className="font-semibold">www.billsandres.com</span>
          </div>
          <hr className="my-4 border-t border-[#EEF0EF]" />
          <div className="flex justify-between">
            <span>Website</span>
            <span className="font-semibold">www.billsandres.com</span>
          </div>
          <hr className="my-4 border-t border-[#EEF0EF]" />
          <div className="flex justify-between">
            <span>Address 1</span>
            <span className="font-semibold">
              2972 Westheimer Rd. Santa Ana, Illinois 85486
            </span>
          </div>
          <hr className="my-4 border-t border-[#EEF0EF]" />
          <div className="flex justify-between">
            <span>Address 2</span>
            <span className="font-semibold">
              2118 Thornridge Cir. Syracuse, Connecticut 35624
            </span>
          </div>
          <hr className="my-4 border-t border-[#EEF0EF]" />
          <div className="flex justify-between">
            <span>Created Date</span>
            <span className="font-semibold">July 14, 2015</span>
          </div>
        </div>

        {/* LinkedIn Card */}
        <div className="bg-white rounded-2xl shadow p-6 md:col-span-1 text-sm">
          <h3 className="text-gray-800 font-semibold mb-2">LinkedIn</h3>

          <hr className="my-4 border-t border-[#EEF0EF]" />

          <p className="font-semibold text-gray-700">
            Business Consultant | Designing for Open Banking & SaaS Products |
            Interested in: Enterprise Products
          </p>

          <p className="text-gray-600 mt-2">
            I chose the Product Designer path as I love working with user
            experiences and business more than pixel-perfect interface design.
            That said, I enjoy being in a team-player role as that keeps the
            products running and my skills up to date.
          </p>

          {/* ABOUT - DROPDOWN */}
          <div className="mt-2">
            <button
              className="text-[#767572] text-sm mt-2 flex items-center gap-1 hover:underline"
              onClick={() => setShowMoreAbout(!showMoreAbout)}
            >
              {showMoreAbout ? "Hide details" : "View more"}
              {showMoreAbout ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )}
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                showMoreAbout
                  ? "max-h-96 opacity-100 mt-2"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600">
                Im currently exploring how design systems integrate across
                large-scale platforms and how designers can bridge business
                goals with user needs through effective research and
                collaboration.
              </p>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="mt-4">
            <p className="text-gray-800 font-semibold">Experience</p>
            <p className="mt-1 text-gray-600">
              <span className="font-semibold text-black">Project Manager</span>{" "}
              at ABC Consultancy – 2022 - Present
              <br />
              <span className="font-semibold text-black">
                Senior UX/UI Designer
              </span>{" "}
              at CreativeABC – 2020 - 2022
            </p>

            {/* EXPERIENCE - DROPDOWN */}
            <div className="mt-2">
              <button
                className="text-[#767572] text-sm mt-2 flex items-center gap-1 hover:underline"
                onClick={() => setShowMoreExperience(!showMoreExperience)}
              >
                {showMoreExperience ? "Hide more" : "View more (2)"}
                {showMoreExperience ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  showMoreExperience
                    ? "max-h-96 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600">
                  <span className="font-semibold text-black">
                    UX Researcher
                  </span>{" "}
                  at DesignWorks – 2018 - 2020
                  <br />
                  <span className="font-semibold text-black">
                    Intern - Product Design
                  </span>{" "}
                  at Studio XYZ – 2017 - 2018
                </p>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="mt-4">
            <p className="text-gray-800 font-semibold">Education</p>
            <p className="text-gray-600">
              Oxford University, Political Science (B.S.) • 2014 - 2018
            </p>
          </div>
        </div>

        {/* Activity Section */}
        <div className="bg-white rounded-2xl p-6 md:col-span-1">
          <h3 className="text-gray-800 font-semibold mb-3">Activity</h3>

          <textarea
            placeholder="Write a note..."
            maxLength={256}
            className=" border rounded-md w-[604px] h-[108px] text-sm"
          />
          <div className="flex justify-end mt-4">
            <button className="bg-green-500 text-white px-4 py-1 rounded">
              Save
            </button>
          </div>
          <hr className="my-4 border-t border-[#EEF0EF]" />

          <div className="mt-4 text-sm text-gray-700">
            <p className="text-gray-600">
              <span className="text-[#6A6A6A] font-semibold font-regular underline">Bessie Wilson</span> added notes 3 days ago •{" "}
              <span className=" cursor-pointer">Edit</span> •{" "}
              <span className=" cursor-pointer">Delete</span>
            </p>

            <p className="mt-1">
              Absolutely! Can you send me a job description?
            </p>
            <hr className="my-4 border-t border-[#EEF0EF]" />
            <p className="text-gray-600">
              <span className="text-[#6A6A6A] font-semibold font-regular underline">Alex Smith (Linkedin)</span> • Feb 10, 2025 
              
            </p>

            <p className="mt-1">
              Absolutely! Can you send me a job description?
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
