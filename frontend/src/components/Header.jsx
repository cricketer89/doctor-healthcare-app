import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-3xl px-6 md:px-10 lg:px-20 border border-white/10 shadow-2xl overflow-hidden relative'>
      {/* Background decoration */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl'></div>
      <div className='absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-primary/10 rounded-full blur-2xl'></div>

      {/* Left Side */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 m-auto md:py-[8vw] md:mb-[-30px] relative z-10'>
        <div className='space-y-2'>
          <p className='text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full w-fit'>🏥 Healthcare Made Simple</p>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight'>
            Your Health Journey <br />
            <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
              Starts Here
            </span>
          </h1>
        </div>

        <p className='text-lg text-text-secondary leading-relaxed max-w-md'>
          Connect with trusted healthcare professionals, schedule appointments seamlessly, and take control of your wellness journey with MyHealthMate.
        </p>

        <div className='flex flex-col md:flex-row items-center gap-4 text-text-secondary text-sm'>
          <div className='flex items-center gap-3'>
            <div className='flex -space-x-2'>
              <img className='w-8 h-8 rounded-full border-2 border-dark' src={assets.group_profiles} alt="" />
              <img className='w-8 h-8 rounded-full border-2 border-dark' src={assets.group_profiles} alt="" />
              <img className='w-8 h-8 rounded-full border-2 border-dark' src={assets.group_profiles} alt="" />
            </div>
            <p className='text-text-muted'>Join 10,000+ satisfied patients</p>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-4'>
          <a href="#speciality" className='flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group'>
            Book Appointment
            <img className='w-4 group-hover:translate-x-1 transition-transform duration-300' src={assets.arrow_icon} alt="" />
          </a>
          <button className='flex items-center gap-3 border border-white/20 text-text-primary px-8 py-4 rounded-full text-sm font-medium hover:bg-white/5 transition-all duration-300'>
            Learn More
          </button>
        </div>
      </div>

      {/* Right Side - Header Image */}
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="Healthcare professionals" />
      </div>
    </div>
  )
}

export default Header
