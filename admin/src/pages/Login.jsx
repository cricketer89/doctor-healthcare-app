import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {

    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext);

    const onSubmitHandler = async (event) => {

        event.preventDefault(); // when we will submit the form it will not reload the webpage 

        try {

            if (state === 'Admin') {

                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });

                if (data.success) {
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                    toast.success('Login successful!');
                }
                else {
                    toast.error(data.message);
                }
            }
            else {

                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });

                if (data.success) {
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                    toast.success('Login successful!');
                }
                else {
                    toast.error(data.message);
                }

            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center p-6'>
            <form onSubmit={onSubmitHandler} className='animate-fade-in'>
                <div className='glass rounded-2xl p-8 min-w-[340px] sm:min-w-96 border border-white/10 shadow-2xl space-y-6'>
                    <div className='text-center space-y-2'>
                        <h2 className='text-3xl font-bold'>
                            <span className='bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent'>{state}</span>
                            <span className='text-[#f8fafc] ml-2'>Login</span>
                        </h2>
                        <p className='text-[#94a3b8] text-sm'>Welcome to MyHealthMate Admin Portal</p>
                    </div>

                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <label className='text-[#cbd5e1] font-medium'>Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-[#cbd5e1] font-medium'>Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full p-4 rounded-xl glass border border-white/20 text-[#f8fafc] placeholder-[#94a3b8] focus:border-[#6366f1] focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-300'
                                type="password"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button className='w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white py-4 rounded-xl font-medium text-lg hover:shadow-lg hover:shadow-[#6366f1]/25 transition-all duration-300 hover:scale-105 glow-effect'>
                        Login
                    </button>

                    <div className='text-center'>
                        {
                            state === 'Admin'
                                ? <p className='text-[#94a3b8]'>Doctor Login? <span className='text-[#6366f1] underline cursor-pointer hover:text-[#8b5cf6] transition-colors duration-300' onClick={() => setState('Doctor')}>Click here</span></p>
                                : <p className='text-[#94a3b8]'>Admin Login? <span className='text-[#6366f1] underline cursor-pointer hover:text-[#8b5cf6] transition-colors duration-300' onClick={() => setState('Admin')}>Click here</span></p>
                        }
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
