import React from 'react'

const PreviewPage = () => {
    return (
        <div className='container mx-auto mt-4 p-2 md:p-4'>
            <div className="main rounded shadow-xl md:w-[60%] mx-auto ">
                <div className='md:mx-[10px]'>
                    <div className='flex justify-end'>
                        <div className='flex-col'>
                            <p className='text-[1.75rem] font-bold'>Swaraj Udyog</p>
                            <p>Shop No.4,5,6 Bank Building</p>
                            <p>Kshatriya Nagar,Dhampur</p>
                            <p>Distt. Bijnore (U.P.)</p>
                            <p> Ph:+91 -9719100007</p>
                        </div>
                    </div>
                    <div className='mt-12 flex justify-center underline'>
                        <p>AUTHORIZATION LETTER</p>
                    </div>
                    <div className='mt-8 ms-8'>
                        <p>Date: 16.08.24</p>
                        <p className='mt-8'>To,</p>
                        <p>Supply Chain Team</p>
                        <p>Xiaomi Technology India Pvt. Ltd.</p>
                        <p>Jhajjar</p>
                        <p className='mt-8'>Reg: Authorization Letter for self Pick-up</p>
                        <p className='mt-4'>Sir,</p>
                        <p className='mt-2'>Request you to kindly allow self-pickup for below purchase Orders:</p>
                        <p className='mt-2'>So No. 1235425234626 Dtaed 16.08.24 Qty-100 Pcs</p>
                        <p className='mt-2'>So No. 1235425234626 Dtaed 16.08.24 Qty-100 Pcs</p>
                        <p className='mt-6'>To my representative Mr. Satyal having Aadhar No. 241535416</p>
                        <p className='mt-2'>Also I would like to request you to kindly generate E-Way bill with vehicle no. DL3125245LA65 </p>
                        <p className='mt-8'>Regards,</p>
                        <p className='mt-20'>Bhawna Maheshwari</p>
                        <p>Swaraj Udyog</p>
                        <p>Dhampur</p>
                    </div>
                    <div className='flex justify-end me-4 mt-4'>
                        <div class="inline-flex rounded-md shadow-sm mb-[1.5rem]" role="group">
                            <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
                                <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6 2a1 1 0 0 0-1 1v1H2v2h1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-3V3a1 1 0 0 0-1-1H6Zm1 2h6v1H7V4Zm-2 3h10v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7Z" />
                                </svg>
                                Remove
                            </button>
                            <button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white ">
                                <svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                                </svg>
                                Downloads
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewPage