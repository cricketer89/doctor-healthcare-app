import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {

   const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
   const { slotDateFormat } = useContext(AppContext);

   useEffect(() => {
      if (aToken) {
         getDashData();
      }
   }, [aToken]);


   return dashData && (
      <div className='m-5 animate-fade-in'>
         <div className='flex flex-wrap gap-6'>

            <div className='flex items-center gap-4 glass p-6 min-w-52 rounded-2xl border border-white/10 cursor-pointer hover:scale-105 transition-all duration-300 card-hover'>
               <div className='w-14 h-14 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center'>
                  <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 20 20'>
                     <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                  </svg>
               </div>
               <div>
                  <p className='text-2xl font-bold text-[#f8fafc]'>{dashData.doctors}</p>
                  <p className='text-[#94a3b8] font-medium'>Doctors</p>
               </div>
            </div>

            <div className='flex items-center gap-4 glass p-6 min-w-52 rounded-2xl border border-white/10 cursor-pointer hover:scale-105 transition-all duration-300 card-hover'>
               <div className='w-14 h-14 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full flex items-center justify-center'>
                  <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 20 20'>
                     <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                  </svg>
               </div>
               <div>
                  <p className='text-2xl font-bold text-[#f8fafc]'>{dashData.appointments}</p>
                  <p className='text-[#94a3b8] font-medium'>Appointments</p>
               </div>
            </div>

            <div className='flex items-center gap-4 glass p-6 min-w-52 rounded-2xl border border-white/10 cursor-pointer hover:scale-105 transition-all duration-300 card-hover'>
               <div className='w-14 h-14 bg-gradient-to-r from-[#06b6d4] to-[#10b981] rounded-full flex items-center justify-center'>
                  <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 20 20'>
                     <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
                  </svg>
               </div>
               <div>
                  <p className='text-2xl font-bold text-[#f8fafc]'>{dashData.patients}</p>
                  <p className='text-[#94a3b8] font-medium'>Patients</p>
               </div>
            </div>

         </div>

         <div className='glass rounded-2xl border border-white/10 mt-10'>
            <div className='flex items-center gap-3 px-6 py-6 border-b border-white/10'>
               <div className='w-6 h-6 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center'>
                  <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                     <path fillRule='evenodd' d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd' />
                  </svg>
               </div>
               <p className='font-bold text-xl text-[#f8fafc]'>Latest Bookings</p>
            </div>

            <div className='p-2'>
               {
                  dashData.latestAppointments.map((item, index) => (
                     <div className='flex items-center px-6 py-4 gap-4 hover:bg-white/5 rounded-xl transition-all duration-300 mx-2' key={index}>
                        <img className='rounded-full w-12 h-12 object-cover border-2 border-[#6366f1]/30' src={item.docData.image} />
                        <div className='flex-1'>
                           <p className='text-[#f8fafc] font-semibold text-lg'>{item.docData.name}</p>
                           <p className='text-[#94a3b8] text-sm'>{slotDateFormat(item.slotDate)}</p>
                        </div>
                        {
                           item.cancelled
                              ? <span className='px-3 py-1 bg-[#ef4444]/20 text-[#ef4444] text-sm font-medium rounded-full border border-[#ef4444]/30'>Cancelled</span>
                              : item.isCompleted
                                 ? <span className='px-3 py-1 bg-[#10b981]/20 text-[#10b981] text-sm font-medium rounded-full border border-[#10b981]/30'>Completed</span>
                                 : <button
                                    onClick={() => cancelAppointment(item._id)}
                                    className='px-4 py-2 bg-[#ef4444]/20 hover:bg-[#ef4444]/30 text-[#ef4444] border border-[#ef4444]/30 rounded-lg transition-all duration-300 hover:scale-105 font-medium'
                                 >
                                    Cancel
                                 </button>
                        }
                     </div>
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default Dashboard
