import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
   const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
   const [isEdit, setIsEdit] = useState(false);

   const updateProfile = async () => {
      try {

         const updateData = {
            address: profileData.address,
            fees: profileData.fees,
            available: profileData.available
         }

         const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } });

         if (data.success) {
            toast.success(data.message);
            setIsEdit(false);
            getProfileData();
         }
         else {
            toast.error(data.message);
         }

      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }
   }

   useEffect(() => {
      if (dToken) {
         getProfileData();
      }
   }, [dToken]);

   return profileData && (
      <div className='m-5 animate-fade-in'>
         {/* Header Section */}
         <div className='mb-8'>
            <div className='flex items-center gap-3 mb-2'>
               <div className='w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center'>
                  <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                     <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z' clipRule='evenodd' />
                  </svg>
               </div>
               <h1 className='text-3xl font-bold text-[#f8fafc]'>Doctor Profile</h1>
            </div>
            <p className='text-[#94a3b8] text-lg'>Manage your professional profile and practice settings</p>
         </div>

         {/* Profile Content */}
         <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Profile Image Section */}
            <div className='lg:col-span-1'>
               <div className='glass rounded-2xl p-6 border border-white/10 text-center'>
                  <div className='relative inline-block'>
                     <img
                        className='w-48 h-48 mx-auto rounded-2xl object-cover border-4 border-gradient-to-r from-[#6366f1] to-[#8b5cf6] shadow-2xl'
                        src={profileData.image}
                        alt={profileData.name}
                     />
                     <div className='absolute -bottom-2 -right-2'>
                        <div className={`w-6 h-6 rounded-full border-4 border-[#0f172a] ${profileData.available ? 'bg-[#10b981]' : 'bg-[#ef4444]'
                           }`}></div>
                     </div>
                  </div>

                  <div className='mt-6'>
                     <h2 className='text-2xl font-bold text-[#f8fafc] mb-2'>{profileData.name}</h2>
                     <div className='space-y-2'>
                        <p className='text-[#94a3b8] font-medium'>{profileData.degree}</p>
                        <div className='glass px-4 py-2 rounded-full border border-white/10 inline-block'>
                           <span className='text-[#6366f1] font-semibold'>{profileData.speciality}</span>
                        </div>
                     </div>
                  </div>

                  {/* Experience Badge */}
                  <div className='mt-4'>
                     <div className='glass px-4 py-2 rounded-full border border-[#10b981]/30 inline-flex items-center gap-2'>
                        <svg className='w-4 h-4 text-[#10b981]' fill='currentColor' viewBox='0 0 20 20'>
                           <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                        </svg>
                        <span className='text-[#10b981] font-semibold'>{profileData.experience}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Profile Details Section */}
            <div className='lg:col-span-2'>
               <div className='glass rounded-2xl p-8 border border-white/10 space-y-8'>
                  {/* About Section */}
                  <div>
                     <div className='flex items-center gap-3 mb-4'>
                        <div className='w-6 h-6 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center'>
                           <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z' clipRule='evenodd' />
                           </svg>
                        </div>
                        <h3 className='text-xl font-bold text-[#f8fafc]'>About</h3>
                     </div>
                     <p className='text-[#94a3b8] leading-relaxed'>{profileData.about}</p>
                  </div>

                  {/* Professional Details */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                     {/* Appointment Fees */}
                     <div className='glass rounded-xl p-6 border border-white/10'>
                        <div className='flex items-center gap-3 mb-4'>
                           <div className='w-8 h-8 bg-gradient-to-r from-[#10b981] to-[#06b6d4] rounded-lg flex items-center justify-center'>
                              <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                 <path fillRule='evenodd' d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                              </svg>
                           </div>
                           <h4 className='text-[#f8fafc] font-semibold'>Consultation Fees</h4>
                        </div>
                        <div className='flex items-center gap-2'>
                           <span className='text-2xl font-bold text-[#10b981]'>₹</span>
                           {isEdit ? (
                              <input
                                 type='number'
                                 value={profileData.fees}
                                 onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                                 className='text-2xl font-bold text-[#10b981] bg-transparent border-b-2 border-[#10b981]/30 focus:border-[#10b981] outline-none w-20'
                              />
                           ) : (
                              <span className='text-2xl font-bold text-[#10b981]'>{profileData.fees}</span>
                           )}
                        </div>
                     </div>

                     {/* Availability Status */}
                     <div className='glass rounded-xl p-6 border border-white/10'>
                        <div className='flex items-center gap-3 mb-4'>
                           <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${profileData.available
                                 ? 'bg-gradient-to-r from-[#10b981] to-[#06b6d4]'
                                 : 'bg-gradient-to-r from-[#ef4444] to-[#f59e0b]'
                              }`}>
                              <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                 <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                              </svg>
                           </div>
                           <h4 className='text-[#f8fafc] font-semibold'>Availability</h4>
                        </div>
                        <div className='flex items-center gap-3'>
                           <label className='relative inline-flex items-center cursor-pointer'>
                              <input
                                 type='checkbox'
                                 checked={profileData.available}
                                 onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                                 disabled={!isEdit}
                                 className='sr-only peer'
                              />
                              <div className={`relative w-11 h-6 rounded-full peer transition-colors duration-300 ${profileData.available ? 'bg-[#10b981]' : 'bg-[#64748b]'
                                 } ${isEdit ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                                 <div className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform duration-300 ${profileData.available ? 'translate-x-5' : 'translate-x-0'
                                    }`}></div>
                              </div>
                           </label>
                           <span className={`font-medium ${profileData.available ? 'text-[#10b981]' : 'text-[#94a3b8]'}`}>
                              {profileData.available ? 'Available for appointments' : 'Not accepting appointments'}
                           </span>
                        </div>
                     </div>
                  </div>

                  {/* Address Section */}
                  <div>
                     <div className='flex items-center gap-3 mb-4'>
                        <div className='w-6 h-6 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] rounded-lg flex items-center justify-center'>
                           <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                              <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                           </svg>
                        </div>
                        <h3 className='text-xl font-bold text-[#f8fafc]'>Clinic Address</h3>
                     </div>
                     <div className='glass rounded-xl p-6 border border-white/10 space-y-4'>
                        <div>
                           <label className='text-[#94a3b8] text-sm mb-2 block'>Address Line 1</label>
                           {isEdit ? (
                              <input
                                 type='text'
                                 value={profileData.address.line1}
                                 onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    address: { ...prev.address, line1: e.target.value }
                                 }))}
                                 className='w-full p-3 rounded-lg glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                 placeholder='Enter address line 1'
                              />
                           ) : (
                              <p className='text-[#f8fafc] p-3 rounded-lg glass border border-white/20'>{profileData.address.line1}</p>
                           )}
                        </div>
                        <div>
                           <label className='text-[#94a3b8] text-sm mb-2 block'>Address Line 2</label>
                           {isEdit ? (
                              <input
                                 type='text'
                                 value={profileData.address.line2}
                                 onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    address: { ...prev.address, line2: e.target.value }
                                 }))}
                                 className='w-full p-3 rounded-lg glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                 placeholder='Enter address line 2'
                              />
                           ) : (
                              <p className='text-[#f8fafc] p-3 rounded-lg glass border border-white/20'>{profileData.address.line2}</p>
                           )}
                        </div>
                     </div>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex gap-4 pt-4'>
                     {isEdit ? (
                        <>
                           <button
                              onClick={updateProfile}
                              className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#10b981] to-[#06b6d4] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#10b981]/25 transition-all duration-300 hover:scale-105'
                           >
                              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                 <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                              </svg>
                              Save Changes
                           </button>
                           <button
                              onClick={() => setIsEdit(false)}
                              className='flex items-center gap-2 px-6 py-3 glass border border-white/20 text-[#94a3b8] rounded-xl font-medium hover:border-[#ef4444]/50 hover:text-[#ef4444] transition-all duration-300'
                           >
                              <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                 <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                              </svg>
                              Cancel
                           </button>
                        </>
                     ) : (
                        <button
                           onClick={() => setIsEdit(true)}
                           className='flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#6366f1]/25 transition-all duration-300 hover:scale-105'
                        >
                           <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                           </svg>
                           Edit Profile
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DoctorProfile