import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className='flex bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-4 border border-white/10 shadow-2xl overflow-hidden relative'>
      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-2xl'></div>

      {/* Left Side */}
      <div className='flex-1 py-12 sm:py-16 md:py-20 lg:py-24 lg:pl-5 relative z-10'>
        <div className='space-y-4'>
          <p className='text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full w-fit'>Ready to Get Started?</p>
          <div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight'>
            <p>Book Appointment </p>
            <p className='mt-2'>With <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>100+ Trusted Doctors</span></p>
          </div>
          <p className='text-text-secondary text-lg max-w-md leading-relaxed'>
            Join thousands of satisfied patients who trust MyHealthMate for their healthcare needs. Start your wellness journey today.
          </p>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 mt-8'>
          <button
            onClick={() => { navigate('/login'); scrollTo(0, 0) }}
            className='bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105'
          >
            Get Started Now
          </button>
          <button
            onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
            className='border border-white/20 text-text-primary px-8 py-4 rounded-full font-medium hover:bg-white/5 transition-all duration-300'
          >
            Browse Doctors
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className='hidden md:block md:w-1/3 relative'>
        <img className='w-full absolute bottom-0 right-0 max-w-md animate-float' src={assets.appointment_img} alt="Appointment booking" />
        <div className='absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent'></div>
      </div>
    </div>
  )
}

export default Banner
