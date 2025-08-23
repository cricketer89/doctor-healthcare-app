import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Docters = () => {

   const { speciality } = useParams();
   const [filterDoc, setFilterDoc] = useState([]);
   const [showFilter, setShowFilter] = useState(false);
   const navigate = useNavigate();

   const { doctors } = useContext(AppContext);

   // Function to generate realistic rating and reviews based on experience
   const getDoctorStats = (experience, docId) => {
      // Parse experience years
      const years = parseInt(experience);

      // Generate consistent rating based on doctor ID and experience
      const hash = docId.split('').reduce((a, b) => {
         a = ((a << 5) - a) + b.charCodeAt(0);
         return a & a;
      }, 0);

      // Base rating starts higher for more experienced doctors
      let baseRating = 4.2 + (years * 0.08); // 4.2 to 5.0 range
      baseRating = Math.min(5.0, baseRating);

      // Add some variation based on hash
      const variation = ((Math.abs(hash) % 20) - 10) * 0.01; // -0.1 to +0.1
      let rating = baseRating + variation;
      rating = Math.max(3.8, Math.min(5.0, rating)); // Keep between 3.8-5.0

      // Generate review count based on experience and rating
      const baseReviews = years * 15 + Math.abs(hash) % 50;
      const reviewMultiplier = rating > 4.5 ? 1.5 : rating > 4.0 ? 1.2 : 1.0;
      const reviewCount = Math.floor(baseReviews * reviewMultiplier);

      return {
         rating: rating.toFixed(1),
         reviewCount: reviewCount
      };
   };

   const applyFilter = () => {
      if (speciality) {
         setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
      }
      else {
         setFilterDoc(doctors);
      }
   }

   useEffect(() => {
      applyFilter();
   }, [doctors, speciality])

   return (
      <div className='animate-fade-in'>
         {/* Header Section */}
         <div className='text-center pt-16 pb-8'>
            <p className='text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full w-fit mx-auto mb-4'>
               {speciality ? speciality : 'All Specialties'}
            </p>
            <h1 className='text-4xl md:text-5xl font-bold text-text-primary mb-4'>
               Find Your <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>Perfect Doctor</span>
            </h1>
            <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
               Browse through our network of qualified healthcare professionals and find the right specialist for your needs.
            </p>
         </div>

         <div className='flex flex-col lg:flex-row items-start gap-8'>
            {/* Filters Sidebar */}
            <div className='lg:w-1/4 w-full'>
               <div className='glass rounded-2xl p-6 border border-white/10 sticky top-24'>
                  <h3 className='text-xl font-bold text-text-primary mb-6'>Specialties</h3>
                  <div className='space-y-3'>
                     <button
                        onClick={() => navigate('/doctors')}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${!speciality
                           ? 'bg-gradient-to-r from-primary to-secondary text-white'
                           : 'text-text-secondary hover:bg-white/5'
                           }`}
                     >
                        All Specialties
                     </button>
                     <button
                        onClick={() => navigate('/doctors/General physician')}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${speciality === "General physician"
                           ? 'bg-gradient-to-r from-primary to-secondary text-white'
                           : 'text-text-secondary hover:bg-white/5'
                           }`}
                     >
                        General Physician
                     </button>
                     <button
                        onClick={() => navigate('/doctors/Gynecologist')}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${speciality === "Gynecologist"
                           ? 'bg-gradient-to-r from-primary to-secondary text-white'
                           : 'text-text-secondary hover:bg-white/5'
                           }`}
                     >
                        Gynecologist
                     </button>
                     <button
                        onClick={() => navigate('/doctors/Dermatologist')}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${speciality === "Dermatologist"
                           ? 'bg-gradient-to-r from-primary to-secondary text-white'
                           : 'text-text-secondary hover:bg-white/5'
                           }`}
                     >
                        Dermatologist
                     </button>
                     <button
                        onClick={() => navigate('/doctors/Pediatricians')}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${speciality === "Pediatricians"
                           ? 'bg-gradient-to-r from-primary to-secondary text-white'
                           : 'text-text-secondary hover:bg-white/5'
                           }`}
                     >
                        Pediatricians
                     </button>
                     <button
                        onClick={() => navigate('/doctors/Neurologist')}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${speciality === "Neurologist"
                           ? 'bg-gradient-to-r from-primary to-secondary text-white'
                           : 'text-text-secondary hover:bg-white/5'
                           }`}
                     >
                        Neurologist
                     </button>
                     <button
                        onClick={() => navigate('/doctors/Gastroenterologist')}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${speciality === "Gastroenterologist"
                           ? 'bg-gradient-to-r from-primary to-secondary text-white'
                           : 'text-text-secondary hover:bg-white/5'
                           }`}
                     >
                        Gastroenterologist
                     </button>
                  </div>
               </div>
            </div>

            {/* Doctors Grid */}
            <div className='lg:w-3/4 w-full'>
               <div className='mb-6'>
                  <h2 className='text-2xl font-bold text-text-primary mb-2'>
                     {speciality ? `${speciality} Doctors` : 'All Doctors'}
                  </h2>
                  <p className='text-text-secondary'>
                     {filterDoc.length} doctor{filterDoc.length !== 1 ? 's' : ''} found
                  </p>
               </div>

               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {
                     filterDoc.map((item, index) => (
                        <div
                           onClick={() => navigate(`/appointment/${item._id}`)}
                           className='glass rounded-2xl overflow-hidden cursor-pointer card-hover group border border-white/10'
                           key={index}
                        >
                           <div className='relative'>
                              <img className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300' src={item.image} alt={item.name} />
                              <div className='absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent'></div>

                              {/* Status indicator */}
                              <div className='absolute top-4 right-4'>
                                 <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${item.available
                                    ? 'bg-success/20 text-success border border-success/30'
                                    : 'bg-error/20 text-error border border-error/30'
                                    }`}>
                                    <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-success' : 'bg-error'}`}></div>
                                    <span>{item.available ? 'Available' : 'Not Available'}</span>
                                 </div>
                              </div>
                           </div>

                           <div className='p-6 space-y-3'>
                              <h3 className='text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-300'>{item.name}</h3>
                              <p className='text-text-secondary font-medium'>{item.speciality}</p>

                              {/* Rating and experience */}
                              <div className='flex items-center gap-4 text-sm text-text-muted'>
                                 <div className='flex items-center gap-1'>
                                    <span className='text-warning'>⭐</span>
                                    <span>{getDoctorStats(item.experience, item._id).rating} ({getDoctorStats(item.experience, item._id).reviewCount} reviews)</span>
                                 </div>
                                 <div className='flex items-center gap-1'>
                                    <span className='text-primary'>👨‍⚕️</span>
                                    <span>{item.experience}</span>
                                 </div>
                              </div>

                              {/* Book button */}
                              <button className='w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 group-hover:scale-105'>
                                 Book Appointment
                              </button>
                           </div>
                        </div>
                     ))
                  }
               </div>

               {filterDoc.length === 0 && (
                  <div className='text-center py-12'>
                     <div className='text-6xl mb-4'>👨‍⚕️</div>
                     <h3 className='text-xl font-bold text-text-primary mb-2'>No doctors found</h3>
                     <p className='text-text-secondary'>Try selecting a different specialty or check back later.</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default Docters
