import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="m-5 animate-fade-in">
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center'>
            <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' />
            </svg>
          </div>
          <h1 className='text-3xl font-bold text-[#f8fafc]'>Doctor Dashboard</h1>
        </div>
        <p className='text-[#94a3b8] text-lg'>Welcome back! Here's your practice overview</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Earnings Card */}
        <div className="glass rounded-2xl p-6 border border-white/10 card-hover group transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className='w-16 h-16 bg-gradient-to-r from-[#10b981] to-[#06b6d4] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
              <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#f8fafc] group-hover:text-[#10b981] transition-colors duration-300">
                ₹{dashData.earnings.toLocaleString()}
              </p>
              <p className="text-[#94a3b8] font-medium">Total Earnings</p>
              <p className="text-[#10b981] text-sm mt-1">+12% from last month</p>
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="glass rounded-2xl p-6 border border-white/10 card-hover group transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className='w-16 h-16 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
              <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#f8fafc] group-hover:text-[#8b5cf6] transition-colors duration-300">
                {dashData.appointments}
              </p>
              <p className="text-[#94a3b8] font-medium">Total Appointments</p>
              <p className="text-[#8b5cf6] text-sm mt-1">This month</p>
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className="glass rounded-2xl p-6 border border-white/10 card-hover group transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className='w-16 h-16 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
              <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#f8fafc] group-hover:text-[#f59e0b] transition-colors duration-300">
                {dashData.patients}
              </p>
              <p className="text-[#94a3b8] font-medium">Unique Patients</p>
              <p className="text-[#f59e0b] text-sm mt-1">All time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div className="glass rounded-2xl border border-white/10">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
          <div className='w-6 h-6 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center'>
            <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd' />
            </svg>
          </div>
          <h2 className="font-bold text-xl text-[#f8fafc]">Latest Appointments</h2>
          <div className='ml-auto glass px-3 py-1 rounded-full border border-white/10'>
            <span className='text-[#6366f1] font-semibold'>{dashData.latestAppointments.length}</span>
            <span className='text-[#94a3b8] ml-1 text-sm'>Recent</span>
          </div>
        </div>

        <div className="p-2">
          {dashData.latestAppointments.length > 0 ? dashData.latestAppointments.map((item, index) => (
            <div
              className="flex items-center px-6 py-4 gap-4 hover:bg-white/5 rounded-xl transition-all duration-300 mx-2 group"
              key={index}
            >
              {/* Patient Avatar */}
              <div className='relative'>
                <img
                  className="rounded-full w-12 h-12 object-cover border-2 border-[#6366f1]/30"
                  src={item.userData.image}
                  alt={item.userData.name}
                />
                <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-[#10b981] rounded-full border-2 border-[#0f172a]'></div>
              </div>

              {/* Patient Info */}
              <div className="flex-1">
                <h3 className="text-[#f8fafc] font-semibold text-lg group-hover:text-[#6366f1] transition-colors duration-300">
                  {item.userData.name}
                </h3>
                <div className='flex items-center gap-2 text-[#94a3b8] text-sm'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                  </svg>
                  <span>{slotDateFormat(item.slotDate)}</span>
                  <span className='text-[#6366f1]'>•</span>
                  <span>{item.slotTime}</span>
                </div>
              </div>

              {/* Status / Actions */}
              <div className="flex items-center gap-3">
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
            <div className='py-16 text-center'>
              <div className='text-6xl mb-4'>📅</div>
              <h3 className='text-xl font-bold text-[#f8fafc] mb-2'>No recent appointments</h3>
              <p className='text-[#94a3b8]'>Your upcoming appointments will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
