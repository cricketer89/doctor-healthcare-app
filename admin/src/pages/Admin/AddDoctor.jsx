import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

    const [docImg, setDocImage] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [experience, setExperience] = useState('1 Year');
    const [fees, setFees] = useState(500);
    const [about, setAbout] = useState('');
    const [speciality, setSpeciality] = useState('General physician');
    const [degree, setDegree] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (!docImg) {
                return toast.error('Image Not Selected');
            }

            const formData = new FormData();

            formData.append('image', docImg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fees', fees);
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });

            if (data.success) {
                toast.success(data.message);
                setDocImage(false);
                setName('');
                setEmail('');
                setPassword('');
                setAddress1('');
                setAddress2('');
                setDegree('');
                setAbout('');
                setFees(500);

            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }
    return (
        <div className='m-5 animate-fade-in'>
            {/* Header Section */}
            <div className='mb-8'>
                <div className='flex items-center gap-3 mb-2'>
                    <div className='w-8 h-8 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg flex items-center justify-center'>
                        <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                            <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                    </div>
                    <h1 className='text-3xl font-bold text-[#f8fafc]'>Add New Doctor</h1>
                </div>
                <p className='text-[#94a3b8] text-lg'>Register a new healthcare professional to the system</p>
            </div>

            <form onSubmit={onSubmitHandler} className='w-full'>
                <div className='glass rounded-2xl p-8 border border-white/10 max-w-6xl'>
                    {/* Image Upload Section */}
                    <div className='flex items-center gap-6 mb-8 p-6 glass rounded-xl border border-white/10'>
                        <label htmlFor="doc-img" className='cursor-pointer group'>
                            <div className='relative'>
                                <img
                                    className='w-24 h-24 bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 rounded-full object-cover border-4 border-[#6366f1]/30 group-hover:border-[#8b5cf6]/50 transition-all duration-300'
                                    src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                                    alt="Upload"
                                />
                                <div className='absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                                    <svg className='w-8 h-8 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' clipRule='evenodd' />
                                    </svg>
                                </div>
                            </div>
                        </label>
                        <input onChange={(e) => setDocImage(e.target.files[0])} type="file" id="doc-img" hidden accept="image/*" />
                        <div>
                            <h3 className='text-[#f8fafc] font-semibold text-lg mb-1'>Upload Doctor Picture</h3>
                            <p className='text-[#94a3b8] text-sm'>Click to upload a professional photo (JPG, PNG)</p>
                            <p className='text-[#94a3b8] text-xs mt-1'>Recommended: 400x400px, max 5MB</p>
                        </div>
                    </div>

                    {/* Form Fields Grid */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
                        {/* Left Column */}
                        <div className='space-y-6'>
                            <div className='space-y-2'>
                                <label className='text-[#cbd5e1] font-medium flex items-center gap-2'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                                    </svg>
                                    Doctor Name
                                </label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                    type="text"
                                    placeholder='Enter full name'
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <label className='text-[#cbd5e1] font-medium flex items-center gap-2'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                        <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                                        <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                                    </svg>
                                    Email Address
                                </label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                    type="email"
                                    placeholder='doctor@example.com'
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <label className='text-[#cbd5e1] font-medium flex items-center gap-2'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
                                    </svg>
                                    Password
                                </label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                    type="password"
                                    placeholder='Enter secure password'
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <label className='text-[#cbd5e1] font-medium flex items-center gap-2'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z' clipRule='evenodd' />
                                    </svg>
                                    Experience
                                </label>
                                <select
                                    onChange={(e) => setExperience(e.target.value)}
                                    value={experience}
                                    className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                >
                                    <option value="1 Year">1 Year</option>
                                    <option value="2 Year">2 Years</option>
                                    <option value="3 Year">3 Years</option>
                                    <option value="4 Year">4 Years</option>
                                    <option value="5 Year">5 Years</option>
                                    <option value="6 Year">6 Years</option>
                                    <option value="7 Year">7 Years</option>
                                    <option value="8 Year">8 Years</option>
                                    <option value="9 Year">9 Years</option>
                                    <option value="10 Year">10+ Years</option>
                                </select>
                            </div>

                            <div className='space-y-2'>
                                <label className='text-[#cbd5e1] font-medium flex items-center gap-2'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                        <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
                                        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z' clipRule='evenodd' />
                                    </svg>
                                    Consultation Fees (₹)
                                </label>
                                <input
                                    onChange={(e) => setFees(e.target.value)}
                                    value={fees}
                                    className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                    type="number"
                                    placeholder='500'
                                    min="100"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className='space-y-6'>
                            <div className='space-y-2'>
                                <label className='text-[#cbd5e1] font-medium flex items-center gap-2'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                        <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                    Speciality
                                </label>
                                <select
                                    onChange={(e) => setSpeciality(e.target.value)}
                                    value={speciality}
                                    className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                >
                                    <option value="General physician">General Physician</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatricians">Pediatricians</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                </select>
                            </div>

                            <div className='space-y-2'>
                                <label className='text-[#cbd5e1] font-medium flex items-center gap-2'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                        <path d='M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z' />
                                    </svg>
                                    Medical Degree
                                </label>
                                <input
                                    onChange={(e) => setDegree(e.target.value)}
                                    value={degree}
                                    className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                    type="text"
                                    placeholder='MBBS, MD, etc.'
                                    required
                                />
                            </div>

                            <div className='space-y-2'>
                                <label className='text-[#cbd5e1] font-medium flex items-center gap-2'>
                                    <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                                    </svg>
                                    Clinic Address
                                </label>
                                <input
                                    onChange={(e) => setAddress1(e.target.value)}
                                    value={address1}
                                    className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300 mb-3'
                                    type="text"
                                    placeholder='Street address, building name'
                                    required
                                />
                                <input
                                    onChange={(e) => setAddress2(e.target.value)}
                                    value={address2}
                                    className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                    type="text"
                                    placeholder='City, State, PIN code'
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className='space-y-3'>
                        <label className='text-[#cbd5e1] font-medium flex items-center gap-2'>
                            <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' />
                            </svg>
                            About Doctor
                        </label>
                        <textarea
                            onChange={(e) => setAbout(e.target.value)}
                            value={about}
                            className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300 resize-none'
                            placeholder='Write a brief description about the doctor, qualifications, specializations, and experience...'
                            rows={5}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className='flex gap-4 pt-6'>
                        <button
                            type='submit'
                            className='bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#6366f1]/25 transition-all duration-300 hover:scale-105 glow-effect flex items-center gap-3'
                        >
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z' clipRule='evenodd' />
                            </svg>
                            Add Doctor to System
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                setDocImage(false); setName(''); setEmail(''); setPassword('');
                                setAddress1(''); setAddress2(''); setDegree(''); setAbout(''); setFees(500);
                            }}
                            className='px-8 py-4 rounded-xl font-semibold glass border border-white/20 text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#6366f1]/50 transition-all duration-300'
                        >
                            Reset Form
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddDoctor
