import { useState } from 'react';
import PageTitle from '../components/layout/PageTitle2';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { ChevronDown } from 'lucide-react'; // Added ChevronDown
import Upload from '../assets/upload.svg';

const breadcrumbItems = [
    { name: 'Projects', path: '/projects' },
    { name: 'Add New Project', path: '' },
];


const AddProjectPage = () => {
    // --- State Declarations ---
    const [showMoreFields, setShowMoreFields] = useState(false); // State to toggle visibility
  
    const [submittedData, setSubmittedData] = useState(null);

    // --- Event Handlers ---
   

    
    

    

    
  
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        setSubmittedData(formData); // Store form data to display JSON

        // Reset the form after submission (optional)
        // Consider if you want to reset or keep the data after submission
        // setFormData({ ...initial empty state ... });
        // setShowMoreFields(false); // Also reset the toggle
    };

    // --- Render ---
    return (
        <div>
            <PageTitle title={'Projects'} actionText='Spreadsheet' actionImg={Upload} />
            <div><Breadcrumbs items={breadcrumbItems} /></div>

            <div className='bg-white rounded-md border border-gray-300 p-8 max-w-4xl'>ghgh
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                    {/* --- Initial Project Info --- */}
                  
                    {/* --- Toggle Button for More Info --- */}
                    <div className="flex justify-start mt-6 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => setShowMoreFields((prev) => !prev)}
                            className="text-brand-green font-semibold px-0 py-2 rounded-lg flex items-center gap-2 hover:underline"
                        >
                            {showMoreFields ? 'Hide Additional Info' : 'Show Additional Recruiting Info'}
                            <ChevronDown
                                size={20}
                                className={`transition-transform duration-300 ${showMoreFields ? 'rotate-180' : ''}`}
                            />
                        </button>
                    </div>

                    {/* --- Conditionally Rendered Sections --- */}
                    {showMoreFields && (
                        <div>
                        <div className="flex flex-col gap-6 mt-4"> {/* Added gap between sections */}

                            
                            <div>fff</div>
                            </div>
                            <div className="flex flex-col gap-6 mt-4"> {/* Added gap between sections */}

                            
                            <div>fff</div>
                            </div>
                            </div>
                    )}

                    
                </form>
            </div>

             {/* --- Submitted Data Display (for testing) --- */}
            {submittedData && (
                <div className="mt-6 p-4 bg-gray-50/5 rounded-lg border border-gray-300 max-w-4xl">
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Form Submitted - Response (Reference):</h3>
                    <pre className="bg-gray-400/10 border border-gray-400 opacity-80 p-4 rounded-lg shadow-sm text-sm overflow-x-auto">{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default AddProjectPage;