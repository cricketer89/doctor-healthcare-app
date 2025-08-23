import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');

    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }

    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-6 mb-6'>
      <div className='glass rounded-2xl px-6 py-4 border border-white/10 shadow-2xl flex items-center justify-between w-full'>
        <div className='flex items-center gap-4'>
          <div className='cursor-pointer group'>
            <h1 className='text-2xl font-bold bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300'>
              MyHealthMate Admin
            </h1>
            <p className='text-xs text-[#94a3b8] -mt-1'>Healthcare Management Portal</p>
          </div>
          <div className='bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 px-4 py-2 rounded-full border border-[#6366f1]/30'>
            <p className='text-[#6366f1] font-medium text-sm'>{aToken ? 'Admin' : 'Doctor'}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className='bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-[#6366f1]/25 transition-all duration-300 hover:scale-105 glow-effect'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar 
