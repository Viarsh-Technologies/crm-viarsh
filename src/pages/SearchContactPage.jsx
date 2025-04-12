import React, { useState } from 'react'
import PageTitle from '../components/layout/PageTitle'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import InputField from '../components/common/InputField'
import TextArea from '../components/common/TextArea'
import Button from '../components/common/Button'
import { useNavigate } from 'react-router-dom';
import {  Plus, Search, RefreshCcwDot, Phone } from "lucide-react";


const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: 'Contacts', path: '/contacts' },
    { name: 'Search Contact', path: '' },
]
const SearchContactPage = () => {
    const [experience, setExperience] = useState([
        {

            'companysize ': '',
            'skillsAssessments': '',
            'salary': ''
        }
    ]
    )

    const handleInvolvedField = () => {
        setExperience((prev) => [
            ...prev, {
                'companysize ': '',
                'skillsAssessments': '',
                'salary': '',
            }
        ])
    }
    const navigate = useNavigate(); // Correct usage


    const onAction = () => {
        navigate("/searchContact");
      };
  
    return (
        <div>
            <PageTitle title={'Search Contacts'} actionText='Create New Contact' />
            <div><Breadcrumbs items={breadcrumbItems} /></div>
            <div className='bg-white rounded-md border border-gray-300 p-8 mt-5 max-w-4xl'>
                <form className="flex flex-col gap-4" >
                    <div className='flex gap-4'>
                        <TextArea label={'Job Titles (Top 3 Skills)'} className='max-h-10' />

                        <InputField label={'Locations'} name={'locations'} />
                    </div>
                    <div className='flex gap-4'>
                        <InputField label={'Companies'} name={'clientContact'} />
                        <InputField label={'Years of Experience'} name={'partner'} />
                    </div>
                    <div className='flex gap-4'>
                        <InputField label={'Schools'} name={'email'} type='email' />
                        <InputField label={'Year of graduation'} name={'projectManager'} />
                    </div>
                    <div className='flex gap-4'>
                        <TextArea label={'Keywords'} className='max-h-10' />

                    </div>
                    <div className='flex gap-4 items-end'>
                        <div>
                            {experience.map((field, index) => (

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
                    <div className='flex gap-4 items-end'>
                        <div className='w-[200px]'>
                            <InputField className="rounded-lg  w-auto " label={'Job Description'} type='file' name={'jobDescriptionAttachment'}   />
                        </div>
                       

                    </div>
                    <div>
                        <TextArea label={''} name={'jobDescription'}   />
                    </div>
                    <div className='flex gap-4 justify-end'>
                        <Button variant="outline" size="md" className='mr-auto' >
                            Cancel
                        </Button>
                        <Button variant="outline" type="submit" size="md" >
                            Create AI Agent                        </Button>
                        <Button variant="primary" type="submit" size="md" >
                            Search
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchContactPage