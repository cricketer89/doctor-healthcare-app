import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { backendUrl, token, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    const onSubmitHandler = async (event) => {
        event.preventDefault();  // whenever will submit the form it will not reload the webpage     

        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email });
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                }
                else {
                    toast.error(data.message);
                }
            }
            else {
                const { data } = await axios.post(backendUrl + '/api/user/login', { password, email });
                if (data.success) {
                    localStorage.setItem('token', data.token);
                    setToken(data.token);
                }
                else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }

    }

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <div className='min-h-[80vh] flex items-center justify-center py-12'>
            <div className='glass rounded-3xl p-8 md:p-12 w-full max-w-md border border-white/10 shadow-2xl'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold text-text-primary mb-2'>
                        {state === 'Sign Up' ? "Create Account" : "Welcome Back"}
                    </h1>
                    <p className='text-text-secondary'>
                        {state === 'Sign Up' ? "Join MyHealthMate and start your wellness journey" : "Sign in to access your health dashboard"}
                    </p>
                </div>

                <form onSubmit={onSubmitHandler} className='space-y-6'>
                    {
                        state === "Sign Up" &&
                        <div>
                            <label className='block text-text-primary font-medium mb-2'>Full Name</label>
                            <input
                                className='w-full px-4 py-3 bg-dark-light border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200'
                                type="text"
                                placeholder="Enter your full name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                        </div>
                    }

                    <div>
                        <label className='block text-text-primary font-medium mb-2'>Email Address</label>
                        <input
                            className='w-full px-4 py-3 bg-dark-light border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200'
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    <div>
                        <label className='block text-text-primary font-medium mb-2'>Password</label>
                        <input
                            className='w-full px-4 py-3 bg-dark-light border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200'
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105'
                    >
                        {state === 'Sign Up' ? "Create Account" : "Sign In"}
                    </button>

                    <div className='text-center'>
                        {
                            state === "Sign Up" ?
                                <p className='text-text-secondary'>
                                    Already have an account?
                                    <span onClick={() => setState('Login')} className='text-primary hover:text-primary-dark cursor-pointer font-medium ml-1'>
                                        Sign in here
                                    </span>
                                </p> :
                                <p className='text-text-secondary'>
                                    Don't have an account?
                                    <span onClick={() => setState('Sign Up')} className='text-primary hover:text-primary-dark cursor-pointer font-medium ml-1'>
                                        Create one here
                                    </span>
                                </p>
                        }
                    </div>
                </form>

                {/* Additional info */}
                <div className='mt-8 pt-6 border-t border-white/10'>
                    <div className='text-center space-y-2'>
                        <p className='text-xs text-text-muted'>By continuing, you agree to our</p>
                        <div className='flex justify-center gap-4 text-xs'>
                            <span className='text-primary hover:text-primary-dark cursor-pointer'>Terms of Service</span>
                            <span className='text-primary hover:text-primary-dark cursor-pointer'>Privacy Policy</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
