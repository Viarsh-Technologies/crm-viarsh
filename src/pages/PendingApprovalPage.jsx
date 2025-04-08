import React, { useState } from 'react'
import PageTitle from '../components/layout/PageTitle';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import { Plus, Star, Trash2 } from 'lucide-react';
import Avatar from '../components/common/Avatar'
import Button from '../components/common/Button';
import linkedIn from '../assets/linkedin-logo.svg'
const breadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Inbox', path: '' },
]
const PendingApprovalPage = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [selectedEmail, setSelectedEmail] = useState(null);
  return (
    <div>
      <PageTitle title={'Pending Approval'} actionText='Approve & Schedule All' ActionIcon={Plus} onAction={''} />
      <div><Breadcrumbs items={breadcrumbItems} /></div>
      <p className='text-gray-400 mb-3'>Conversation from all of your connected email accounts.</p>
      <div className='flex w-full '>
        <div className='w-full'>
          <div className='bg-gray-300 flex py-1 px-2 rounded-md gap-5 max-w-md '>

            <button className={`${activeTab === 'Pending' ? 'bg-white border border-gray-400/60' : ''} rounded-md  w-full py-1 cursor-pointer`}
              onClick={() => setActiveTab('Pending')}
            >Pending Emails (120)</button>
            <button className={`${activeTab === 'Scheduled' ? 'bg-white border border-gray-400/60' : ''} rounded-md  w-full py-1 cursor-pointer`}
              onClick={() => setActiveTab('Scheduled')}
            >Scheduled Emails</button>

          </div>
          <div className='  flex gap-4 flex-col mt-5 max-w-4xl'>
            {
              activeTab === 'Pending' ? (
                <div>
                  <div className="bg-white p-6 rounded-lg shadow border border-gray-300">


                    <div className='flex gap-3 justify-between items-center mt-3'>
                      <div className='flex gap-3'><Avatar src={'https://avatar.iran.liara.run/public/16'} size={42} />
                        <div>
                          <h3>Devon J</h3>
                          <p className="text-sm font-semibold">devon@jane.com</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{new Date('2025-02-13T13:45:00Z').toLocaleString()}</p>
                    </div>

                    <div className="mt-4 text-gray-700">
                      <p className='font-bold mb-4'>Hi Wyatt,</p>
                      <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et enim mollis, tempus eros at, convallis nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ac tincidunt odio. Nulla sagittis ante vitae ligula finibus, id pretium libero tristique. Vivamus varius ac libero ac pharetra. </p>
                      <p className='mb-4'>Curabitur non commodo tortor. In hac habitasse platea dictumst. Suspendisse semper augue ac orci imperdiet vulputate. Sed elementum suscipit sem, id volutpat lectus ornare finibus. Curabitur vel cursus metus.</p>
                      <p>Thanks</p>Devon Lane
                    </div>

                  </div>
                  <div className='flex gap-7 mt-5'>
                  <div className="bg-white p-6 rounded-lg shadow border border-gray-300">
                    <div className='flex gap-5 justify-between mb-3'>
                      <div>
                        <h2 className=' text-2xl font-semibold'>Scraped from</h2>
                        <p className='text-gray-400'>Linkedin</p>
                      </div>
                      <div>
                        <img src={linkedIn} className='w-12 h-12 rounded-full' />
                      </div>
                    </div>
                    <div className='border border-gray-400 p-3 rounded-md'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et enim mollis.
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow border border-gray-300 ">
                    <div className='flex gap-5 justify-between mb-3'>
                      <div>
                        <h2 className=' text-2xl font-semibold'>Scraped from</h2>
                        <p className='text-gray-400'>Linkedin</p>
                      </div>
                      <div>
                        <img src={linkedIn} className='w-12 h-12 rounded-full' />
                      </div>
                    </div>
                    <div className='border border-gray-400 p-3 rounded-md'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et enim mollis.
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow border border-gray-300">
                    <div className='flex gap-5 justify-between mb-3'>
                      <div>
                        <h2 className=' text-2xl font-semibold'>Scraped from</h2>
                        <p className='text-gray-400'>Linkedin</p>
                      </div>
                      <div>
                        <img src={linkedIn} className='w-12 h-12 rounded-full' />
                      </div>
                    </div>
                    <div className='border border-gray-400 p-3 rounded-md'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et enim mollis.
                    </div>
                  </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow border border-gray-300">


                  <div className='flex gap-3 justify-between items-center mt-3'>
                    <div className='flex gap-3'><Avatar src={'https://avatar.iran.liara.run/public/16'} size={42} />
                      <div>
                        <h3>Devon J</h3>
                        <p className="text-sm font-semibold">devon@jane.com</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{new Date('2025-02-13T13:45:00Z').toLocaleString()}</p>
                  </div>
                  <div className='py-4'><ul className='flex gap-2'><li className='h-2 w-10 bg-brand-green rounded-full'></li><li className='h-2 w-10 bg-gray-200 rounded-full'></li><li className='h-2 w-10 bg-gray-200 rounded-full'></li></ul></div>

                  <div className="mt-4 text-gray-700">
                    <p className='font-bold mb-4'>Hi Wyatt,</p>
                    <p className='mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et enim mollis, tempus eros at, convallis nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ac tincidunt odio. Nulla sagittis ante vitae ligula finibus, id pretium libero tristique. Vivamus varius ac libero ac pharetra. </p>
                    <p className='mb-4'>Curabitur non commodo tortor. In hac habitasse platea dictumst. Suspendisse semper augue ac orci imperdiet vulputate. Sed elementum suscipit sem, id volutpat lectus ornare finibus. Curabitur vel cursus metus.</p>
                    <p>Thanks</p>Devon Lane
                  </div>
                  <div className='border-t border-gray-300 p-2 mt-8 flex justify-between'>
                    <Trash2 />
                    <div className='flex gap-4'><Button variant='textOnly'>Rewrite</Button><Button variant='textOnly'>Edit</Button></div>
                  </div>
                </div>
              )
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default PendingApprovalPage