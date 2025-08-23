import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDoc, setRelDocs] = useState([]);

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

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id != docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-8 my-20 text-text-primary md:mx-10">
      {/* Header Section */}
      <div className='text-center space-y-4'>
        <p className='text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full w-fit mx-auto'>Related Specialists</p>
        <h1 className='text-4xl md:text-5xl font-bold'>
          You may also <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>like</span>
        </h1>
        <p className='max-w-2xl mx-auto text-text-secondary text-lg leading-relaxed'>
          Discover more trusted healthcare professionals in the same specialty. Find the perfect match for your healthcare needs.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="w-full grid grid-cols-auto gap-6 pt-8 gap-y-8 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="glass rounded-2xl overflow-hidden cursor-pointer card-hover group border border-white/10"
            key={index}
          >
            {/* Doctor Image */}
            <div className='relative'>
              <img className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300' src={item.image} alt={item.name} />

              {/* Availability Badge */}
              <div className='absolute top-4 right-4'>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${item.available
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                  }`}>
                  <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                  <span>{item.available ? 'Available' : 'Busy'}</span>
                </div>
              </div>
            </div>

            {/* Doctor Info */}
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
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-gradient-to-r from-primary to-secondary text-white px-12 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 mt-8 flex items-center gap-3"
      >
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
          <path fillRule='evenodd' d='M3 10a1 1 0 011-1h10.586l-2.293-2.293a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H4a1 1 0 01-1-1z' clipRule='evenodd' />
        </svg>
        View All Doctors
      </button>
    </div>
  );
};

export default RelatedDoctors;
