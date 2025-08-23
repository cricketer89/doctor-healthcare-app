import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {

    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    return (
        <div className='min-h-screen glass border-r border-white/10 shadow-2xl'>
            {
                aToken ? (
                    <ul className='text-[#cbd5e1] mt-5 p-4'>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-4 px-6 md:min-w-72 cursor-pointer rounded-xl transition-all duration-300 mb-2 ${isActive
                            ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-lg transform scale-105'
                            : 'hover:bg-white/5 hover:text-[#f8fafc] hover:transform hover:scale-102'
                            }`} to={'/admin-dashboard'}>
                            <div className='w-5 h-5 flex items-center justify-center'>
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                    <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                                </svg>
                            </div>
                            <p className='hidden md:block font-medium'>Dashboard</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-4 px-6 md:min-w-72 cursor-pointer rounded-xl transition-all duration-300 mb-2 ${isActive
                            ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-lg transform scale-105'
                            : 'hover:bg-white/5 hover:text-[#f8fafc] hover:transform hover:scale-102'
                            }`} to={'/all-appointments'}>
                            <div className='w-5 h-5 flex items-center justify-center'>
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                                </svg>
                            </div>
                            <p className='hidden md:block font-medium'>Appointments</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-4 px-6 md:min-w-72 cursor-pointer rounded-xl transition-all duration-300 mb-2 ${isActive
                            ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-lg transform scale-105'
                            : 'hover:bg-white/5 hover:text-[#f8fafc] hover:transform hover:scale-102'
                            }`} to={'/add-doctor'}>
                            <div className='w-5 h-5 flex items-center justify-center'>
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clipRule='evenodd' />
                                </svg>
                            </div>
                            <p className='hidden md:block font-medium'>Add Doctor</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-4 px-6 md:min-w-72 cursor-pointer rounded-xl transition-all duration-300 mb-2 ${isActive
                            ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-lg transform scale-105'
                            : 'hover:bg-white/5 hover:text-[#f8fafc] hover:transform hover:scale-102'
                            }`} to={'/doctors-list'}>
                            <div className='w-5 h-5 flex items-center justify-center'>
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                    <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
                                </svg>
                            </div>
                            <p className='hidden md:block font-medium'>Doctors List</p>
                        </NavLink>
                    </ul>
                ) : dToken ? (
                    <ul className='text-[#cbd5e1] mt-5 p-4'>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-4 px-6 md:min-w-72 cursor-pointer rounded-xl transition-all duration-300 mb-2 ${isActive
                                ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-lg transform scale-105'
                                : 'hover:bg-white/5 hover:text-[#f8fafc] hover:transform hover:scale-102'
                            }`} to={'/doctor-dashboard'}>
                            <div className='w-5 h-5 flex items-center justify-center'>
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                    <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                                </svg>
                            </div>
                            <p className='hidden md:block font-medium'>Dashboard</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-4 px-6 md:min-w-72 cursor-pointer rounded-xl transition-all duration-300 mb-2 ${isActive
                                ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-lg transform scale-105'
                                : 'hover:bg-white/5 hover:text-[#f8fafc] hover:transform hover:scale-102'
                            }`} to={'/doctor-appointments'}>
                            <div className='w-5 h-5 flex items-center justify-center'>
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                                </svg>
                            </div>
                            <p className='hidden md:block font-medium'>Appointments</p>
                        </NavLink>
                        <NavLink className={({ isActive }) => `flex items-center gap-3 py-4 px-6 md:min-w-72 cursor-pointer rounded-xl transition-all duration-300 mb-2 ${isActive
                                ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white shadow-lg transform scale-105'
                                : 'hover:bg-white/5 hover:text-[#f8fafc] hover:transform hover:scale-102'
                            }`} to={'/doctor-profile'}>
                            <div className='w-5 h-5 flex items-center justify-center'>
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z' clipRule='evenodd' />
                                </svg>
                            </div>
                            <p className='hidden md:block font-medium'>Profile</p>
                        </NavLink>
                    </ul>
                ) : null}
        </div>
    )
}

export default Sidebar
