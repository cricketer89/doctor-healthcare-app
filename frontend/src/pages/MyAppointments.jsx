import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loadingPayment, setLoadingPayment] = useState(null);
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_your_key_here',
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {

        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razorpay', response, { headers: { token } });

          if (data.success) {
            getUserAppointments();
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
    }

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      toast.error('Payment gateway not available');
    }
  }
  const appointmentRazorpay = async (appointmentId) => {
    setLoadingPayment(appointmentId);
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } });

      if (data.success) {
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingPayment(null);
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token])

  return (
    <div className='min-h-screen bg-transparent text-gray-100 p-4'>
      <p className='pb-3 mt-12 font-medium text-white border-b border-gray-600'>My Appointments</p>
      <div>
        {
          appointments.map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 px-4 border-b border-gray-600 hover:bg-gray-800/30 transition-all duration-300 rounded-lg mb-2 backdrop-blur-sm' key={index}>
              <div className='flex justify-center'>
                <img className='w-32 h-32 object-cover rounded-xl shadow-lg border-2 border-gray-600/50 hover:border-primary/50 transition-all duration-300' src={item.docData.image} alt={item.docData.name} />
              </div>
              <div className='flex-1 text-sm text-gray-300'>
                <div className='flex items-center gap-2 mb-1'>
                  <p className='text-white font-semibold'>{item.docData.name}</p>
                  {item.payment && (
                    <span className='text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30'>
                      ✓ Paid
                    </span>
                  )}
                  {!item.payment && !item.cancelled && (
                    <span className='text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full border border-yellow-500/30'>
                      ⏳ Pending
                    </span>
                  )}
                </div>
                <p className='text-gray-300'>{item.docData.speciality}</p>
                <p className='text-gray-200 font-medium mt-1'>Address:</p>
                <p className='text-xs text-gray-300'>{item.docData.address.line1}</p>
                <p className='text-xs text-gray-300'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1 text-gray-300'><span className='text-sm text-gray-200 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime} </p>
              </div>
              <div></div>
              <div className='flex flex-col gap-3 justify-end min-w-fit'>
                {!item.cancelled && item.payment && !item.isCompleted &&
                  <button className='sm:min-w-48 py-3 px-4 border border-green-400 rounded-lg text-green-400 bg-green-50/10 flex items-center justify-center gap-2 font-medium backdrop-blur-sm'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                    Paid
                  </button>
                }
                {!item.cancelled && !item.payment && !item.isCompleted &&
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    disabled={loadingPayment === item._id}
                    className={`text-sm text-white text-center sm:min-w-48 py-3 px-4 border border-blue-400 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2 font-medium ${loadingPayment === item._id ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                  >
                    {loadingPayment === item._id ? (
                      <>
                        <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                          <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                          <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                          <path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
                          <path fillRule='evenodd' d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z' clipRule='evenodd' />
                        </svg>
                        Pay Online
                      </>
                    )}
                  </button>
                }
                {!item.cancelled && !item.isCompleted &&
                  <button onClick={() => cancelAppointment(item._id)} className='text-sm text-white text-center sm:min-w-48 py-3 px-4 border border-red-400 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2 font-medium'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' />
                    </svg>
                    Cancel Appointment
                  </button>
                }
                {item.cancelled && !item.isCompleted &&
                  <button className='sm:min-w-48 py-3 px-4 border border-red-500 rounded-lg text-red-400 bg-red-50/10 flex items-center justify-center gap-2 font-medium backdrop-blur-sm cursor-not-allowed'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z' clipRule='evenodd' />
                    </svg>
                    Appointment Cancelled
                  </button>
                }
                {item.isCompleted &&
                  <button className='sm:min-w-48 py-3 px-4 border border-green-500 rounded-lg text-green-400 bg-green-50/10 flex items-center justify-center gap-2 font-medium backdrop-blur-sm cursor-not-allowed'>
                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                    Appointment Completed
                  </button>
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments
