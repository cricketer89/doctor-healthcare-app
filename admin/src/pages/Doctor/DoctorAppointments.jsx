import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext';

const DoctorAppointments = () => {

  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  // Filter appointments based on search and status
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.userData.name.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesStatus = true;

    if (statusFilter === 'Completed') matchesStatus = appointment.isCompleted;
    else if (statusFilter === 'Cancelled') matchesStatus = appointment.cancelled;
    else if (statusFilter === 'Pending') matchesStatus = !appointment.isCompleted && !appointment.cancelled;

    return matchesSearch && matchesStatus;
  });

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
          <h1 className='text-3xl font-bold text-[#f8fafc]'>My Appointments</h1>
        </div>
        <p className='text-[#94a3b8] text-lg'>Manage your patient appointments and consultations</p>

        {/* Stats Cards */}
        <div className='mt-6 flex gap-4 flex-wrap'>
          <div className='glass px-4 py-3 rounded-full border border-white/10'>
            <span className='text-[#6366f1] font-semibold'>{appointments.length}</span>
            <span className='text-[#94a3b8] ml-2'>Total</span>
          </div>
          <div className='glass px-4 py-3 rounded-full border border-white/10'>
            <span className='text-[#10b981] font-semibold'>{appointments.filter(apt => apt.isCompleted).length}</span>
            <span className='text-[#94a3b8] ml-2'>Completed</span>
          </div>
          <div className='glass px-4 py-3 rounded-full border border-white/10'>
            <span className='text-[#f59e0b] font-semibold'>{appointments.filter(apt => !apt.isCompleted && !apt.cancelled).length}</span>
            <span className='text-[#94a3b8] ml-2'>Pending</span>
          </div>
          <div className='glass px-4 py-3 rounded-full border border-white/10'>
            <span className='text-[#ef4444] font-semibold'>{appointments.filter(apt => apt.cancelled).length}</span>
            <span className='text-[#94a3b8] ml-2'>Cancelled</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className='glass rounded-2xl p-6 border border-white/10 mb-8'>
        <div className='flex flex-col md:flex-row gap-4'>
          {/* Search Input */}
          <div className='flex-1 relative'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <svg className='w-5 h-5 text-[#94a3b8]' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd' />
              </svg>
            </div>
            <input
              type='text'
              placeholder='Search patients by name...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
            />
          </div>

          {/* Status Filter */}
          <div className='md:w-48'>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className='w-full p-3 rounded-xl glass border border-white/20 text-[#f8fafc] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
            >
              <option value='All'>All Status</option>
              <option value='Pending'>Pending</option>
              <option value='Completed'>Completed</option>
              <option value='Cancelled'>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className='glass rounded-2xl border border-white/10 overflow-hidden'>
        {/* Table Header */}
        <div className='bg-gradient-to-r from-[#6366f1]/10 to-[#8b5cf6]/10 border-b border-white/10'>
          <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1.5fr] gap-4 py-4 px-6'>
            <p className='text-[#f8fafc] font-semibold text-sm'>#</p>
            <p className='text-[#f8fafc] font-semibold text-sm'>Patient</p>
            <p className='text-[#f8fafc] font-semibold text-sm'>Payment</p>
            <p className='text-[#f8fafc] font-semibold text-sm'>Age</p>
            <p className='text-[#f8fafc] font-semibold text-sm'>Date & Time</p>
            <p className='text-[#f8fafc] font-semibold text-sm'>Fees</p>
            <p className='text-[#f8fafc] font-semibold text-sm'>Status</p>
          </div>
        </div>

        {/* Table Body */}
        <div className='max-h-[60vh] overflow-y-auto scrollbar-custom'>
          {filteredAppointments.length > 0 ? filteredAppointments.reverse().map((item, index) => (
            <div className='sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_1fr_2.5fr_1fr_1.5fr] gap-4 items-center py-4 px-6 border-b border-white/5 hover:bg-white/5 transition-all duration-300 group' key={index}>
              {/* Index */}
              <p className='hidden sm:block text-[#94a3b8] font-medium'>{index + 1}</p>

              {/* Patient Info */}
              <div className='flex items-center gap-3 mb-3 sm:mb-0'>
                <div className='relative'>
                  <img
                    className='w-12 h-12 rounded-full object-cover border-2 border-[#6366f1]/30'
                    src={item.userData.image}
                    alt={item.userData.name}
                  />
                  <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-[#10b981] rounded-full border-2 border-[#0f172a]'></div>
                </div>
                <div>
                  <p className='text-[#f8fafc] font-semibold group-hover:text-[#6366f1] transition-colors duration-300'>{item.userData.name}</p>
                  <p className='text-[#94a3b8] text-sm'>ID: {item.userData._id.slice(-6)}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className='mb-3 sm:mb-0'>
                <span className={`text-xs px-3 py-1 rounded-full font-medium border ${item.payment
                    ? 'bg-[#6366f1]/20 text-[#6366f1] border-[#6366f1]/30'
                    : 'bg-[#10b981]/20 text-[#10b981] border-[#10b981]/30'
                  }`}>
                  {item.payment ? 'Online' : 'CASH'}
                </span>
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

              {/* Fees */}
              <div className='mb-3 sm:mb-0'>
                <p className='text-[#10b981] font-bold text-lg'>₹{item.amount}</p>
              </div>

              {/* Status / Actions */}
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
                      : <div className='flex gap-2'>
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className='p-2 bg-[#ef4444]/20 hover:bg-[#ef4444]/30 text-[#ef4444] border border-[#ef4444]/30 rounded-lg transition-all duration-300 hover:scale-105 group/btn'
                          title='Cancel Appointment'
                        >
                          <svg className='w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                          </svg>
                        </button>
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className='p-2 bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#10b981] border border-[#10b981]/30 rounded-lg transition-all duration-300 hover:scale-105 group/btn'
                          title='Mark as Completed'
                        >
                          <svg className='w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                          </svg>
                        </button>
                      </div>
                }
              </div>
            </div>
          )) : (
            <div className='py-20 text-center'>
              <div className='text-6xl mb-4'>📅</div>
              <h3 className='text-xl font-bold text-[#f8fafc] mb-2'>No appointments found</h3>
              <p className='text-[#94a3b8]'>
                {searchTerm || statusFilter !== 'All'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Your appointments will appear here when patients book with you.'}
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default DoctorAppointments
