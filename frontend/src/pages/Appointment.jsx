import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';


const Appointment = () => {

   const { docId } = useParams();
   const { doctors, backendUrl, token, getDoctorsData } = useContext(AppContext);
   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

   const [docInfo, setDocInfo] = useState(null);
   const [docSlots, setDocSlots] = useState([]);
   const [slotIndex, setSlotIndex] = useState(0);
   const [slotTime, setSlotTime] = useState('');
   const navigate = useNavigate();

   const fetchDocInfo = () => {
      const docInfo = doctors.find(doc => doc._id === docId);
      setDocInfo(docInfo);
   }

   const getAvailableSlots = async () => {
      setDocSlots([]);

      // getting current date 
      let today = new Date();

      for (let i = 0; i < 7; i++) {
         let currentDate = new Date(today);
         currentDate.setDate(today.getDate() + i);

         // setting end time of the date with index 
         let endTime = new Date();
         endTime.setDate(today.getDate() + i);
         endTime.setHours(21, 0, 0, 0);

         // setting hours 
         if (today.getDate() === currentDate.getDate()) {
            currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
            currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
         }
         else {
            currentDate.setHours(10);
            currentDate.setMinutes(0);
         }

         let timeSlots = [];

         while (currentDate < endTime) {
            let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();

            const slotDate = day + "_" + month + "_" + year;
            const slotTime = formattedTime;

            const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

            if (isSlotAvailable) {
               // add slots to array 
               timeSlots.push({
                  datetime: new Date(currentDate),
                  time: formattedTime
               })

            }

            // Increment time by 30 minutes 
            currentDate.setMinutes(currentDate.getMinutes() + 30);
         }

         setDocSlots(prev => ([...prev, timeSlots]))
      }
   }

   const bookAppointment = async () => {
      if (!token) {
         toast.warn('Login to book the Appointment');
         return navigate('/login');
      }

      try {
         const date = docSlots[slotIndex][0].datetime;

         let day = date.getDate();
         let month = date.getMonth() + 1;
         let year = date.getFullYear();

         const slotDate = day + "_" + month + "_" + year;

         const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } });

         if (data.success) {
            toast.success(data.message);
            getDoctorsData();
            navigate('/my-appointments');
         }
         else {
            toast.error(data.message);
         }

      } catch (error) {
         console.log(error);
         toast.error(error.message);
      }
   }

   useEffect(() => {
      fetchDocInfo();
   }, [doctors, docId]);

   useEffect(() => {
      getAvailableSlots();
   }, [docInfo]);

   return docInfo && (
      <div>
         {/* Doctor Details */}
         <div className='flex flex-col sm:flex-row gap-4'>
            <div>
               <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
            </div>

            <div className='flex-1 border border-gray-600 rounded-xl p-8 py-7 bg-gray-800/30 backdrop-blur-sm mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-xl'>
               {/* Doc Info : name, degree, experience */}
               <p className='flex items-center gap-2 text-2xl font-medium text-white'>{docInfo.name}
                  <img className='w-5' src={assets.verified_icon} alt="" />
               </p>
               <div className='flex items-center gap-2 text-sm mt-1 text-gray-300'>
                  <p>{docInfo.degree} - {docInfo.speciality}</p>
                  <button className='py-1 px-3 border border-primary/50 text-xs rounded-full text-primary bg-primary/10 font-medium'>{docInfo.experience}</button>
               </div>

               {/* Doctor About */}
               <div>
                  <p className='flex items-center gap-1 text-sm font-medium text-white mt-4'>
                     About <img src={assets.info_icon} alt="" />
                  </p>
                  <p className='text-sm text-gray-300 max-w-[700px] mt-2'>{docInfo.about}</p>
               </div>
               <p className='text-gray-300 font-medium mt-4'>
                  Appointment fee : <span className='text-white font-semibold'><b>&#8377;</b>{docInfo.fees}</span>
               </p>
            </div>
         </div>

         {/* Booking Slots */}
         <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-white bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50'>
            <div className='flex items-center gap-2 mb-6'>
               <svg className='w-5 h-5 text-primary' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
               </svg>
               <p className='text-xl font-semibold'>Booking slots</p>
            </div>

            {/* Day Selection */}
            <div className='space-y-4'>
               <h3 className='text-gray-300 font-medium mb-3'>Select Date</h3>
               <div className='flex gap-3 items-center w-full overflow-x-auto pb-2 scrollbar-custom'>
                  {
                     docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} className={`text-center py-4 px-6 min-w-20 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 flex-shrink-0 ${slotIndex === index
                           ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                           : 'border-2 border-gray-600 text-gray-300 hover:border-primary/50 hover:bg-gray-700/50'
                           }`} key={index}>
                           <p className='font-semibold text-sm'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                           <p className='text-lg font-bold mt-1'>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                     ))
                  }
               </div>
            </div>

            {/* Time Selection */}
            <div className='space-y-4 mt-8'>
               <h3 className='text-gray-300 font-medium mb-3'>Select Time</h3>
               <div className='flex items-center gap-3 w-full overflow-x-auto pb-2 scrollbar-custom'>
                  {docSlots.length && docSlots[slotIndex].map((item, index) => (
                     <button onClick={() => setSlotTime(item.time)} className={`text-sm font-medium flex-shrink-0 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 min-w-fit ${item.time === slotTime
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                        : 'text-gray-300 border-2 border-gray-600 hover:border-primary/50 hover:bg-gray-700/50'
                        }`} key={index}>
                        {item.time.toLowerCase()}
                     </button>
                  ))}
               </div>
            </div>

            {/* Book Button */}
            <div className='mt-8 flex justify-center'>
               <button onClick={bookAppointment} className='bg-gradient-to-r from-primary to-secondary text-white text-base font-semibold px-16 py-4 rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105 flex items-center gap-3'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                     <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                  </svg>
                  Book an appointment
               </button>
            </div>
         </div>

         {/* Listing Related Doctors */}
         <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
   )
}

export default Appointment
