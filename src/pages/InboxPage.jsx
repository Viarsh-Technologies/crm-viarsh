import React, { useState } from 'react'
import PageTitle from '../components/layout/PageTitle'
import Breadcrumbs from '../components/layout/Breadcrumbs'
import emailsData from '../data/email-data.json'
import Avatar from '../components/common/Avatar'
import { format } from 'date-fns'
import { Star, Trash2 } from 'lucide-react'

const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Inbox', path: '' },
]

const InboxPage = () => {
  const [activeTab, setActiveTab] = useState("Engaged");
  const filteredEmails = emailsData.filter(email => email.status === activeTab);
  const [selectedEmail, setSelectedEmail] = useState(null);

  return (
    <div>
      <PageTitle title={'Inbox'} actionText='' ActionIcon={''} onAction={''} />
      <div><Breadcrumbs items={breadcrumbItems} /></div>
      <div className='flex '>
        <div className='w-2xl'>
          <div className='bg-gray-300 flex py-1 px-2 rounded-md gap-5 '>
            {
              ["Engaged", "Sent", "Pending"].map(tab => (
                <button key={tab} className={`${tab === activeTab ? 'bg-white border border-gray-400/60' : ''} rounded-md  w-full py-1 cursor-pointer`}
                  onClick={() => setActiveTab(tab)}
                >{tab}</button>
              ))
            }
          </div>
          <div className=' max-w-md flex gap-4 flex-col mt-5'>
            {
              filteredEmails.map((email, index) => (
                <div className={`bg-white rounded-lg flex gap-3 p-3 items-center justify-between ${selectedEmail?.email === email.email ? "border border-gray-500" : ""}`} onClick={() => setSelectedEmail(email)}>
                  <div className='flex gap-2'>
                    <Avatar src={email.profile} size={42} />
                    <div >
                      <h2 className='font-semibold text-md '>{email.name}</h2>
                      <p className='text-gray-500'>{email.subject}</p>
                    </div>
                  </div>
                  <p className='text-gray-400'> {format(new Date(email.dateTime), "dd MMM, hh:mm a")}</p>
                </div>

              ))
            }
          </div>
        </div>
        <div className='w-full'>
          <div className="px-6">
            {selectedEmail ? (
              <div className="bg-white p-6 rounded-lg shadow border border-gray-300">
                <div className='border border-gray-300 p-2 rounded-md flex justify-between'> <h3 className="text-md font-semibold">{selectedEmail.subject}</h3>
                  <div className='flex gap-4'><Star /><Trash2 /></div>
                </div>
                <div className='flex gap-3 justify-between items-center mt-3'>
                  <div className='flex gap-3'><Avatar src={selectedEmail.profile} size={42} />
                  <div>
                    <h3>{selectedEmail.name}</h3>
                    <p className="text-sm font-semibold">{selectedEmail.email}</p>
                  </div>
                  </div>
                <p className="text-sm text-gray-500">{new Date(selectedEmail.dateTime).toLocaleString()}</p>
                </div>

                <div className="mt-4 text-gray-700" dangerouslySetInnerHTML={{ __html: selectedEmail.body }} />
              </div>
            ) : (
              <p className="text-gray-500 text-center">Select an email to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InboxPage