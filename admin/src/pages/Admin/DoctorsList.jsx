import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('All');

  useEffect(() => {
    getAllDoctors();
  }, [aToken])

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'All' || doctor.speciality === filterSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  // Get unique specialties for filter
  const specialties = ['All', ...new Set(doctors.map(doc => doc.speciality))];
  return (
    <div className='m-5 animate-fade-in'>
      {/* Header Section */}
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <div className='w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center'>
            <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
              <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
            </svg>
          </div>
          <h1 className='text-3xl font-bold text-[#f8fafc]'>All Doctors</h1>
        </div>
        <p className='text-[#94a3b8] text-lg'>Manage and monitor registered healthcare professionals</p>

        {/* Stats Cards */}
        <div className='mt-6 flex gap-4 flex-wrap'>
          <div className='glass px-4 py-3 rounded-full border border-white/10'>
            <span className='text-[#6366f1] font-semibold'>{doctors.length}</span>
            <span className='text-[#94a3b8] ml-2'>Total Doctors</span>
          </div>
          <div className='glass px-4 py-3 rounded-full border border-white/10'>
            <span className='text-[#10b981] font-semibold'>{doctors.filter(doc => doc.available).length}</span>
            <span className='text-[#94a3b8] ml-2'>Available</span>
          </div>
          <div className='glass px-4 py-3 rounded-full border border-white/10'>
            <span className='text-[#ef4444] font-semibold'>{doctors.filter(doc => !doc.available).length}</span>
            <span className='text-[#94a3b8] ml-2'>Unavailable</span>
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
              placeholder='Search doctors by name or specialty...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
            />
          </div>

          {/* Specialty Filter */}
          <div className='md:w-64'>
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className='w-full p-3 rounded-xl glass border border-white/20 text-[#f8fafc] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
            >
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Doctors Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {
          filteredDoctors.length > 0 ? filteredDoctors.map((item, index) => (
            <div className='glass rounded-2xl overflow-hidden border border-white/10 card-hover group transition-all duration-300' key={index}>
              {/* Doctor Image */}
              <div className='relative'>
                <img
                  className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                  src={item.image}
                  alt={item.name}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'></div>

                {/* Availability Status */}
                <div className='absolute top-4 right-4'>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${item.available
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    <span>{item.available ? 'Available' : 'Unavailable'}</span>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className='p-6'>
                <h3 className='text-xl font-bold text-[#f8fafc] mb-1 group-hover:text-[#6366f1] transition-colors duration-300'>{item.name}</h3>
                <p className='text-[#94a3b8] font-medium mb-4 flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  {item.speciality}
                </p>

                {/* Experience and Fees */}
                <div className='flex justify-between items-center mb-4 text-sm'>
                  <div className='flex items-center gap-1 text-[#cbd5e1]'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                    </svg>
                    <span>{item.experience}</span>
                  </div>
                  <div className='flex items-center gap-1 text-[#10b981] font-semibold'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                    </svg>
                    <span>₹{item.fees}</span>
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className='flex items-center justify-between'>
                  <label className='flex items-center gap-3 cursor-pointer group/toggle'>
                    <div className='relative'>
                      <input
                        onChange={() => changeAvailability(item._id)}
                        type="checkbox"
                        checked={item.available}
                        className='sr-only'
                      />
                      <div className={`w-12 h-6 rounded-full transition-colors duration-300 ${item.available ? 'bg-[#10b981]' : 'bg-gray-600'
                        }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 mt-0.5 ${item.available ? 'translate-x-6' : 'translate-x-0.5'
                          }`}></div>
                      </div>
                    </div>
                    <span className='text-[#cbd5e1] font-medium group-hover/toggle:text-[#f8fafc] transition-colors duration-300'>Available</span>
                  </label>

                  {/* Action Button */}
                  <button className='px-4 py-2 bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 hover:from-[#6366f1]/30 hover:to-[#8b5cf6]/30 text-[#6366f1] border border-[#6366f1]/30 rounded-lg transition-all duration-300 hover:scale-105 text-sm font-medium'>
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className='col-span-full py-20 text-center'>
              <div className='text-6xl mb-4'>👨‍⚕️</div>
              <h3 className='text-xl font-bold text-[#f8fafc] mb-2'>No doctors found</h3>
              <p className='text-[#94a3b8]'>
                {searchTerm || filterSpecialty !== 'All'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No doctors have been added to the system yet.'}
              </p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default DoctorsList
