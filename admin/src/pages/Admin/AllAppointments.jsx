import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {

    const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
    const { calculateAge, slotDateFormat } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken])

    return (
        <div className='m-5 animate-fade-in'>
            {/* Header Section */}
            <div className='mb-8'>
                <div className='flex items-center gap-3 mb-2'>
                    <div className='w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center'>
                        <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                        </svg>
                    </div>
                    <h1 className='text-3xl font-bold text-[#f8fafc]'>All Appointments</h1>
                </div>
                <p className='text-[#94a3b8] text-lg'>Manage and monitor all patient appointments</p>
                <div className='mt-4 flex items-center gap-4'>
                    <div className='glass px-4 py-2 rounded-full border border-white/10'>
                        <span className='text-[#6366f1] font-semibold'>{appointments.length}</span>
                        <span className='text-[#94a3b8] ml-2'>Total Appointments</span>
                    </div>
                    <div className='glass px-4 py-2 rounded-full border border-white/10'>
                        <span className='text-[#10b981] font-semibold'>{appointments.filter(apt => apt.isCompleted).length}</span>
                        <span className='text-[#94a3b8] ml-2'>Completed</span>
                    </div>
                    <div className='glass px-4 py-2 rounded-full border border-white/10'>
                        <span className='text-[#ef4444] font-semibold'>{appointments.filter(apt => apt.cancelled).length}</span>
                        <span className='text-[#94a3b8] ml-2'>Cancelled</span>
                    </div>
                </div>
            </div>

            {/* Appointments Table */}
            <div className='glass rounded-2xl border border-white/10 overflow-hidden'>
                {/* Table Header */}
                <div className='bg-gradient-to-r from-[#6366f1]/10 to-[#8b5cf6]/10 border-b border-white/10'>
                    <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1.5fr_1.5fr] gap-4 py-4 px-6'>
                        <p className='text-[#f8fafc] font-semibold text-sm'>#</p>
                        <p className='text-[#f8fafc] font-semibold text-sm'>Patient</p>
                        <p className='text-[#f8fafc] font-semibold text-sm'>Age</p>
                        <p className='text-[#f8fafc] font-semibold text-sm'>Date & Time</p>
                        <p className='text-[#f8fafc] font-semibold text-sm'>Doctor</p>
                        <p className='text-[#f8fafc] font-semibold text-sm'>Fees</p>
                        <p className='text-[#f8fafc] font-semibold text-sm'>Status</p>
                    </div>
                </div>

                {/* Table Body */}
                <div className='max-h-[70vh] overflow-y-auto scrollbar-custom'>
                    {appointments.length > 0 ? appointments.map((item, index) => (
                        <div className='sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1.5fr_1.5fr] gap-4 items-center py-4 px-6 border-b border-white/5 hover:bg-white/5 transition-all duration-300 group' key={index}>
                            {/* Index */}
                            <p className='hidden sm:block text-[#94a3b8] font-medium'>{index + 1}</p>

                            {/* Patient Info */}
                            <div className='flex items-center gap-3 mb-3 sm:mb-0'>
                                <div className='relative'>
                                    <img className='w-10 h-10 rounded-full object-cover border-2 border-[#6366f1]/30' src={item.userData.image} alt={item.userData.name} />
                                    <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-[#10b981] rounded-full border-2 border-[#0f172a]'></div>
                                </div>
                                <div>
                                    <p className='text-[#f8fafc] font-semibold'>{item.userData.name}</p>
                                    <p className='text-[#94a3b8] text-sm'>Patient ID: {item.userData._id.slice(-6)}</p>
                                </div>
                            </div>

                            {/* Age */}
                            <div className='mb-3 sm:mb-0'>
                                <p className='text-[#cbd5e1] font-medium'>{calculateAge(item.userData.dob)} yrs</p>
                            </div>

                            {/* Date & Time */}
                            <div className='mb-3 sm:mb-0'>
                                <p className='text-[#f8fafc] font-medium'>{slotDateFormat(item.slotDate)}</p>
                                <p className='text-[#94a3b8] text-sm'>{item.slotTime}</p>
                            </div>

                            {/* Doctor Info */}
                            <div className='flex items-center gap-3 mb-3 sm:mb-0'>
                                <img className='w-10 h-10 rounded-full object-cover border-2 border-[#8b5cf6]/30' src={item.docData.image} alt={item.docData.name} />
                                <div>
                                    <p className='text-[#f8fafc] font-semibold'>{item.docData.name}</p>
                                    <p className='text-[#94a3b8] text-sm'>{item.docData.speciality}</p>
                                </div>
                            </div>

                            {/* Fees */}
                            <div className='mb-3 sm:mb-0'>
                                <p className='text-[#10b981] font-bold text-lg'>₹{item.amount}</p>
                                <p className='text-[#94a3b8] text-sm'>Consultation</p>
                            </div>

                            {/* Status/Actions */}
                            <div className='flex justify-start sm:justify-center'>
                                {
                                    item.cancelled
                                        ? <span className='px-4 py-2 bg-[#ef4444]/20 text-[#ef4444] text-sm font-medium rounded-full border border-[#ef4444]/30 flex items-center gap-2'>
                                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                                            </svg>
                                            Cancelled
                                        </span>
                                        : item.isCompleted
                                            ? <span className='px-4 py-2 bg-[#10b981]/20 text-[#10b981] text-sm font-medium rounded-full border border-[#10b981]/30 flex items-center gap-2'>
                                                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                                                </svg>
                                                Completed
                                            </span>
                                            : <button
                                                onClick={() => cancelAppointment(item._id)}
                                                className='px-4 py-2 bg-[#ef4444]/20 hover:bg-[#ef4444]/30 text-[#ef4444] border border-[#ef4444]/30 rounded-lg transition-all duration-300 hover:scale-105 font-medium text-sm flex items-center gap-2 group-hover:shadow-lg'
                                            >
                                                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                                    <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                                                </svg>
                                                Cancel
                                            </button>
                                }
                            </div>
                        </div>
                    )) : (
                        <div className='py-20 text-center'>
                            <div className='text-6xl mb-4'>📅</div>
                            <h3 className='text-xl font-bold text-[#f8fafc] mb-2'>No appointments found</h3>
                            <p className='text-[#94a3b8]'>When patients book appointments, they will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AllAppointments
