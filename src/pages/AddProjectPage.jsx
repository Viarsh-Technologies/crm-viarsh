import React, { useState } from 'react'
import InputField from '../components/common/InputField'
import PageTitle from '../components/layout/PageTitle2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import TextArea from '../components/common/TextArea';
import Button from '../components/common/Button';
import { Search, X, ChevronDown } from 'lucide-react';
import Upload from '../assets/upload.svg'

const breadcrumbItems = [
    { name: 'Projects', path: '/projects' },
    { name: 'Add New Project', path: '' },
]
const skillOptions = [
    "UX Designer", "Front-end Developer", "Back-end Developer",
    "Data Scientist", "Product Manager", "DevOps Engineer"
];

const AddProjectPage = () => {
    const [showMoreFields, setShowMoreFields] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        projectType: "",
        company: "",
        clientContact: "",
        partner: "",
        email: "",
        projectManager: "",
        summary: "",
        drugTest: "No",
        skills: [],
        additionalFields: [{
            projectName: "",
            salesStage: "",
            prices: "",
        },],
        recruitingProject: {
            projectName: "",
            whyIsThisPositionOpen: "",
            numberOfPositions: "",
            jobDescription: "",
            jobDescriptionAttachment: "",
            durationOfAssignment: "",
            typeOfPosition: ""
        },
        candidateSkills: {
            topSkills: [],
            skillsBeApplied: "",
            nonTechnicalSkills: "",
            companyCulture: "",
            eVP: "",
            drugTest: "",
            backgroundCheck: "",
            clearances: ""
        },
        interviewProcess: {
            interviewP: "",
            clientScreening: "",
            involvedInterview: [
                {
                    name: "",
                    phone: "",
                    email: "",
                },

            ],
            interviewDateTime: "",
            twoWeekNotice: "",
            startDate: "",
            billDate: "",
            OT: "",
            exclusive: ""
        }
    });
    const [submittedData, setSubmittedData] = useState(null)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleAddField = () => {
        setFormData({
            ...formData,
            additionalFields: [...formData.additionalFields, { projectName: "", salesStage: "", prices: "" }],
        });
    };
    const handleInvolvedField = () => {
        setFormData((prev) => ({
            ...prev,
            interviewProcess: {
                ...prev.interviewProcess, // ✅ Keep existing interviewProcess data
                involvedInterview: [
                    ...prev.interviewProcess.involvedInterview, // ✅ Keep existing interviewers
                    { name: "", phone: "", email: "" } // ✅ Add new blank entry
                ],
            },
        }));
    };
    const handleAdditionalFieldChange = (index, key, value) => {
        const updatedFields = [...formData.additionalFields];
        updatedFields[index][key] = value;
        setFormData({ ...formData, additionalFields: updatedFields });
    };
    const handleInvolvedChange = (index, key, value) => {
        setFormData((prev) => ({
            ...prev,
            interviewProcess: {
                ...prev.interviewProcess, // ✅ Keep other fields inside interviewProcess
                involvedInterview: prev.interviewProcess.involvedInterview.map((interviewer, i) =>
                    i === index ? { ...interviewer, [key]: value } : interviewer
                ),
            },
        }));
    };
    const handleRecruitingFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            recruitingProject: {
                ...prev.recruitingProject,
                [name]: value
            }
        }));
    };
    const handleCandidateSkillsChange = (e) => {
        const { name, value } = e.target;
        console.log(name + '' + value)
        setFormData((prev) => ({
            ...prev,
            candidateSkills: {
                ...prev.candidateSkills,
                [name]: value
            }
        }));
    };
    const handleInterviewProcessChange = (e) => {
        const { name, value } = e.target;
        console.log(name + '' + value)
        setFormData((prev) => ({
            ...prev,
            interviewProcess: {
                ...prev.interviewProcess,
                [name]: value
            }
        }));
    };
    const handleSkillSelect = (skill) => {
        if (formData.candidateSkills.topSkills.length >= 3) return; // Limit to 3 skills
        setFormData((prev) => ({
            ...prev,
            candidateSkills: {
                ...prev.candidateSkills,
                topSkills: [...prev.candidateSkills.topSkills, skill],
            }
        }));
        setSearchTerm(""); // Clear search after selection
    };

    const handleSkillRemove = (skill) => {
        setFormData((prev) => ({
            ...prev,
            candidateSkills: {
                ...prev.candidateSkills,
                topSkills: prev.candidateSkills.topSkills.filter((s) => s !== skill),
            }
        }));
    };

    const filteredSkills = skillOptions.filter(
        (skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !formData.candidateSkills.topSkills.includes(skill)
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchTerm)
        setSubmittedData(formData); // Store form data to display JSON

        // Reset the form after submission
        setFormData({
            projectType: "",
            company: "",
            clientContact: "",
            partner: "",
            email: "",
            projectManager: "",
            skills: [],
            additionalFields: [{
                projectName: "",
                salesStage: "",
                prices: "",
            },],
            recruitingProject: {
                projectName: "",
                whyIsThisPositionOpen: "",
                numberOfPositions: "",
                jobDescription: "",
                jobDescriptionAttachment: "",
                durationOfAssignment: "",
                typeOfPosition: ""
            },
            candidateSkills: {
                topSkills: [],
                skillsBeApplied: "",
                nonTechnicalSkills: "",
                companyCulture: "",
                eVP: "",
                drugTest: "",
                backgroundCheck: "",
                clearances: ""
            },
            interviewProcess: {
                interviewP: "",
                clientScreening: "",
                involvedInterview: [
                    {
                        name: "",
                        phone: "",
                        email: "",
                    },

                ],
                interviewDateTime: "",
                twoWeekNotice: "",
                startDate: "",
                billDate: "",
                OT: "",
                exclusive: ""
            }

        });
    }
    return (
        <div className='max-w-4xl'>
        
        <PageTitle title={'Projects'} actionText='Spreadsheet'  actionImg={Upload} />
            <div><Breadcrumbs items={breadcrumbItems} /></div>
            <div className='bg-white rounded-md border border-gray-300 p-8 mt-3'>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className='flex gap-4'>
                        <InputField label={'Project Type'} name={'projectType'} value={formData.projectType} onChange={handleChange} />
                        <InputField label={'Company'} name={'company'} value={formData.company} onChange={handleChange} />
                    </div>
                    <div className='flex gap-4'>
                        <InputField label={'Client Contact'} name={'clientContact'} value={formData.clientContact} onChange={handleChange} />
                        <InputField label={'Partner'} name={'partner'} value={formData.partner} onChange={handleChange} />
                    </div>
                    <div className='flex gap-4'>
                        <InputField label={'Email'} name={'email'} value={formData.email} type='email' onChange={handleChange} />
                        <InputField label={'Project Manager'} name={'projectManager'} value={formData.projectManager} onChange={handleChange} />
                    </div>
                    <div>
                        <TextArea label={'Business Challenges/summary'} name={'businessChallenges'} value={formData.businessChallenges} onChange={handleChange} />
                    </div>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Additional Fields</h3>
                        <div className='flex gap-4 items-end'>
                            <div>
                                {formData.additionalFields.map((field, index) => (
                                    <div key={index} className="flex gap-4 mb-2">

                                        <InputField
                                            type="text"
                                            label="Project Name"
                                            value={field.projectName}
                                            onChange={(e) => handleAdditionalFieldChange(index, "projectName", e.target.value)}

                                        />
                                        <InputField
                                            type="text"
                                            label='Sales Stage'
                                            value={field.salesStage}
                                            onChange={(e) => handleAdditionalFieldChange(index, "salesStage", e.target.value)}

                                        />
                                        <InputField
                                            type="text"
                                            value={field.prices}
                                            label="Price"
                                            onChange={(e) => handleAdditionalFieldChange(index, "prices", e.target.value)}

                                        />
                                    </div>
                                ))}
                            </div>
                            <button type="button" onClick={handleAddField} className="text-brand-green font-semibold px-4 py-2 rounded-lg mt-2  mb-2 w-20 cursor-pointer text-nowrap">
                                + Add More
                            </button>
                        </div>
                    </div>


                    <div className="flex justify-start mt-6 pt-4 border-t border-gray-200">
    <button
        type="button"
        onClick={() => setShowMoreFields((prev) => !prev)}
        className="w-full text-black font-semibold px-0 py-2 rounded-lg flex items-center justify-between hover:underline"
    >
        <h3 className="text-lg font-semibold">Recruiting Project (Job Description)</h3>
        <ChevronDown
            size={20}
            className={`transition-transform duration-300 ${showMoreFields ? 'rotate-180' : ''}`}
        />
    </button>
</div>


                    {showMoreFields && (
                    <div>
                    <div className='flex gap-4 flex-col'>
                        <div className='flex gap-4'>
                            <InputField label={'Project Name'} name={'projectName'} value={formData.recruitingProject.projectName} onChange={handleRecruitingFieldChange} />
                            <InputField label={'Why is this Position Open?'} name={'whyIsThisPositionOpen'} value={formData.recruitingProject.whyIsThisPositionOpen} onChange={handleRecruitingFieldChange} />
                            <InputField label={'# of Positions'} name={'numberOfPositions'} value={formData.recruitingProject.numberOfPositions} onChange={handleRecruitingFieldChange} />
                        </div>
                        <div className='flex gap-4 items-end'>
                            <div className='w-[200px]'>
                                <InputField className="rounded-lg  w-auto " label={'Job Description'} type='file' name={'jobDescriptionAttachment'} value={formData.recruitingProject.jobDescriptionAttachment} onChange={handleRecruitingFieldChange} />
                            </div>
                            {formData.recruitingProject.jobDescriptionAttachment ? (
                                <div className='flex w-full mb-3' >Selected file: {formData.recruitingProject.jobDescriptionAttachment}</div>
                            ) : ""}

                        </div>
                        <div>
                            <TextArea label={''} name={'jobDescription'} value={formData.recruitingProject.jobDescription} onChange={handleRecruitingFieldChange} />
                        </div>
                        <div className='flex gap-4'>
                            <InputField label={'Duration of Assignment'} name={'durationOfAssignment'} value={formData.recruitingProject.durationOfAssignment} onChange={handleRecruitingFieldChange} />
                            <InputField label={'Type of Position'} name={'typeOfPosition'} value={formData.recruitingProject.typeOfPosition} onChange={handleRecruitingFieldChange} />
                        </div>
                    </div>
                    <div >
                        <h3 className="text-lg font-semibold mb-4 mt-5 pt-5 border-t border-gray-300 ">Candidate Skills Required</h3>
                        <div>

                            <div className='relative'>
                                <Search size={18} className='absolute bottom-3 left-3 text-gray-400' />
                                <InputField
                                    label="Top 3 Skills (Stack-ranked)"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className='pl-10'
                                />
                            </div>

                            {/* Skill Suggestions Dropdown */}
                            {searchTerm && filteredSkills.length > 0 && (
                                <ul className="border border-gray-300 rounded-lg mt-2">
                                    {filteredSkills.map((skill) => (
                                        <li
                                            key={skill}
                                            onClick={() => handleSkillSelect(skill)}
                                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                        >
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Selected Skills */}
                            <div className="mt-2 mb-4 flex gap-2">
                                {formData.candidateSkills.topSkills.map((skill) => (
                                    <div key={skill} className=" px-2 py-0 rounded-sm flex items-center gap-2 border border-gray-800">
                                        {skill}
                                        <button onClick={() => handleSkillRemove(skill)} className="text-gray-500 font-bold">
                                            <X size={18} className='text-gray-800' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                        <div>
                            <InputField label={'How will these Skills/Technologies be Applied?'} name={'skillsBeApplied'} value={formData.candidateSkills.skillsBeApplied} onChange={handleCandidateSkillsChange} />
                        </div>
                        <div className='flex gap-4'>
                            <InputField label={'Non-technical Skills'} name={'nonTechnicalSkills'} value={formData.candidateSkills.nonTechnicalSkills} onChange={handleCandidateSkillsChange} />
                        </div>
                        <div className='flex gap-4'>
                            <InputField label={'Company Culture'} name={'companyCulture'} value={formData.candidateSkills.companyCulture} onChange={handleCandidateSkillsChange} />
                        </div>
                        <div className='flex gap-4'>
                            <InputField label={'EVP'} name={'eVP'} value={formData.candidateSkills.eVP} onChange={handleCandidateSkillsChange} />
                        </div>
                        </div>
                        <div className='flex  gap-4 justify-between mt-4'>
                            <div >
                                <label className='mb-2 block'>Drug Test</label>
                                <div className='flex gap-4'>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="drugTest" value="Yes" checked={formData.candidateSkills.drugTest === "Yes"} onChange={handleCandidateSkillsChange} className="text-brand-green focus:ring-brand-green" />
                                        Yes</label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="drugTest" value="No" checked={formData.candidateSkills.drugTest === "No"} onChange={handleCandidateSkillsChange} className="text-brand-green focus:ring-brand-green" />
                                        No
                                    </label>

                                </div>
                            </div>
                            <div>
                                <label className='mb-2 block'>Background Check</label>
                                <div className='flex gap-4'>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="backgroundCheck" value="Yes" checked={formData.candidateSkills.backgroundCheck === "Yes"} onChange={handleCandidateSkillsChange} className="text-brand-green focus:ring-brand-green" />
                                        Yes</label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="backgroundCheck" value="No" checked={formData.candidateSkills.backgroundCheck === "No"} onChange={handleCandidateSkillsChange} className="text-brand-green focus:ring-brand-green" />
                                        No
                                    </label>

                                </div>
                            </div>
                            <div>
                                <label className='mb-2 block'>Clearances/Certifications?</label>
                                <div className='flex gap-4'>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="clearances" value="Yes" checked={formData.candidateSkills.clearances === "Yes"} onChange={handleCandidateSkillsChange} className="text-brand-green focus:ring-brand-green" />
                                        Yes</label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="clearances" value="No" checked={formData.candidateSkills.clearances === "No"} onChange={handleCandidateSkillsChange} className="text-brand-green focus:ring-brand-green" />
                                        No
                                    </label>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-col'  >
                        <h3 className="text-lg font-semibold mb-4 mt-5 pt-5 border-t border-gray-300 ">Interview Process</h3>
                        <div className='flex gap-4'>
                            <InputField label={'Interview Process'} name={'interviewP'} value={formData.interviewProcess.interviewP} onChange={handleInterviewProcessChange} />
                        </div>
                        <div className='flex gap-4'>
                            <InputField label={'Where is the client in the screening/interview process?'} name={'clientScreening'} value={formData.interviewProcess.clientScreening} onChange={handleInterviewProcessChange} />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold">Who else will be involved in the interview process? </h3>
                            <div className='flex gap-4 items-end'>
                                <div>
                                    {formData.interviewProcess.involvedInterview.map((field, index) => (

                                        <div key={index} className="flex gap-4 mb-2">
                                            <InputField
                                                type="text"
                                                label="Name"
                                                value={field.projectName}
                                                onChange={(e) => handleInvolvedChange(index, "name", e.target.value)}

                                            />
                                            <InputField
                                                type="text"
                                                label='Phone'
                                                value={field.salesStage}
                                                onChange={(e) => handleInvolvedChange(index, "phone", e.target.value)}

                                            />
                                            <InputField
                                                type="text"
                                                value={field.prices}
                                                label="Email"
                                                onChange={(e) => handleInvolvedChange(index, "email", e.target.value)}

                                            />
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={handleInvolvedField} className="text-brand-green font-semibold px-4 py-2 rounded-lg mt-2  mb-2 w-20 cursor-pointer text-nowrap">
                                    + Add More
                                </button>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <InputField label={'Interview Date & Time'} name={'interviewDateTime'} value={formData.interviewProcess.interviewDateTime} onChange={handleInterviewProcessChange} />
                        </div>
                        <div className='flex gap-4'>
                            <InputField label={'Start Date'} name={'startDate'} value={formData.interviewProcess.startDate} onChange={handleInterviewProcessChange} />
                        </div>
                        <div className='flex gap-4'>
                            <InputField label={'Bill Date'} name={'billDate'} value={formData.interviewProcess.billDate} onChange={handleInterviewProcessChange} />
                            <div className='w-full' >
                                <label className='mb-2 block'>Can this candidate give a two-week notice?</label>
                                <div className='flex gap-4'>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="twoWeekNotice" value="Yes" checked={formData.interviewProcess.twoWeekNotice === "Yes"} onChange={handleInterviewProcessChange} className="text-brand-green focus:ring-brand-green" />
                                        Yes</label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="twoWeekNotice" value="No" checked={formData.interviewProcess.twoWeekNotice === "No"} onChange={handleInterviewProcessChange} className="text-brand-green focus:ring-brand-green" />
                                        No
                                    </label>

                                </div>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <InputField label={'Interview Process'} name={'OT'} value={formData.interviewProcess.billDaOTte} onChange={handleInterviewProcessChange} />
                            <div className='w-full' >
                                <label className='mb-2 block'>Exclusive</label>
                                <div className='flex gap-4'>

                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="exclusive" value="Yes" checked={formData.interviewProcess.exclusive === "Yes"} onChange={handleInterviewProcessChange} className="text-brand-green focus:ring-brand-green" />
                                        Yes</label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="exclusive" value="No" checked={formData.interviewProcess.exclusive === "No"} onChange={handleInterviewProcessChange} className="text-brand-green focus:ring-brand-green" />
                                        No
                                    </label>

                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    )}
                    <div className='flex gap-4 justify-end'>
                        <Button variant="outline" size="md" className='mr-auto' >
                            Cancel
                        </Button>
                        <Button variant="outline" type="submit" size="md" >
                            Save as Draft
                        </Button>
                        <Button variant="primary" type="submit" size="md" >
                            Create
                        </Button>
                    </div>
                    
                </form>
            </div>
            <div>
                {submittedData && (
                    <div className="mt-6 p-4 bg-gray-50/5 rounded-lg border border-gray-300 max-w-4xl">
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Form submited - Response (reference):</h3>
                        <pre className="bg-gray-400/10 border border-gray-400 opacity-60 p-4 rounded-lg shadow-sm text-sm">{JSON.stringify(submittedData, null, 2)}</pre>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AddProjectPage