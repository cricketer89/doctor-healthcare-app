import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-8 py-20 text-text-primary' id='speciality'>
      <div className='text-center space-y-4'>
        <p className='text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full w-fit mx-auto'>Medical Specialties</p>
        <h1 className='text-4xl md:text-5xl font-bold'>
          Find by <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>Specialty</span>
        </h1>
        <p className='max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed'>
          Discover specialized healthcare professionals across various medical fields. Our comprehensive network ensures you find the right expert for your specific health needs.
        </p>
      </div>

      <div className='flex sm:justify-center gap-6 pt-8 w-full overflow-scroll'>
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className='flex flex-col items-center text-sm cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500 group'
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <div className='w-20 sm:w-28 h-20 sm:h-28 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300 border border-white/10'>
              <img className='w-12 sm:w-16' src={item.image} alt={item.speciality} />
            </div>
            <p className='font-medium text-text-primary group-hover:text-primary transition-colors duration-300'>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SpecialityMenu
