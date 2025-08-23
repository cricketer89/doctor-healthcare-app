import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState();

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    }

    return (
        <div className='pt-6 pb-4 mb-8'>
            <div className='flex items-center justify-between text-sm py-6 glass rounded-2xl px-6 border border-white/10 shadow-2xl'>
                <div onClick={() => navigate('/')} className='cursor-pointer group'>
                    <h1 className='text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300'>
                        MyHealthMate
                    </h1>
                    <p className='text-xs text-text-muted -mt-1'>Your Health, Our Priority</p>
                </div>

                <ul className='hidden md:flex items-start gap-8 font-medium'>
                    <NavLink to='/'>
                        <li className='py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 text-text-secondary hover:text-text-primary'>HOME</li>
                        <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-primary to-secondary w-3/5 m-auto hidden' />
                    </NavLink>
                    <NavLink to='/doctors'>
                        <li className='py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 text-text-secondary hover:text-text-primary'>ALL DOCTORS</li>
                        <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-primary to-secondary w-3/5 m-auto hidden' />
                    </NavLink>
                    <NavLink to='/about'>
                        <li className='py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 text-text-secondary hover:text-text-primary'>ABOUT</li>
                        <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-primary to-secondary w-3/5 m-auto hidden' />
                    </NavLink>
                    <NavLink to='/contact'>
                        <li className='py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 text-text-secondary hover:text-text-primary'>CONTACT</li>
                        <hr className='border-none outline-none h-0.5 bg-gradient-to-r from-primary to-secondary w-3/5 m-auto hidden' />
                    </NavLink>
                </ul>

                <div className='flex items-center gap-4'>
                    {/* Admin Panel Button */}
                    <a
                        href='https://doctor-healthcare-app-admin.vercel.app'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 glow-effect flex items-center gap-2 text-sm'
                    >
                        <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                            <path fillRule='evenodd' d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' />
                        </svg>
                        Admin Panel
                    </a>
                    {
                        token && userData ?

                            <div className='flex items-center gap-3 cursor-pointer group relative'>
                                <div className='relative'>
                                    <img className='w-10 h-10 rounded-full border-2 border-primary/50 object-cover' src={userData.image} alt="" />
                                    <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-dark'></div>
                                </div>
                                <img className='w-3 transition-transform group-hover:rotate-180' src={assets.dropdown_icon} alt="" />
                                <div className='absolute top-0 right-0 pt-16 text-base font-medium text-text-secondary z-20 hidden group-hover:block animate-fade-in'>
                                    <div className='min-w-48 glass rounded-xl flex flex-col gap-2 p-4 border border-white/10 shadow-xl'>
                                        <p onClick={() => navigate('/my-profile')} className='hover:text-primary cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-all duration-200'>My Profile</p>
                                        <p onClick={() => navigate('my-appointments')} className='hover:text-primary cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-all duration-200'>My Appointments</p>
                                        <hr className='border-white/10' />
                                        <p onClick={logout} className='hover:text-error cursor-pointer p-2 rounded-lg hover:bg-error/10 transition-all duration-200'>Logout</p>
                                    </div>
                                </div>
                            </div>

                            : <button onClick={() => navigate('/login')} className='bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full font-medium hidden md:block hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 glow-effect'> Get Started </button>
                    }
                    <img onClick={() => setShowMenu(true)} className='w-6 md:hidden filter invert' src={assets.menu_icon} alt="" />

                    {/* ------ Mobile Menu -------- */}
                    <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-dark/95 backdrop-blur-md transition-all`}>
                        <div className='flex items-center justify-between px-5 py-6 border-b border-white/10'>
                            <div onClick={() => { setShowMenu(false); navigate('/') }} className='cursor-pointer'>
                                <h1 className='text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
                                    MyHealthMate
                                </h1>
                            </div>
                            <img className='w-7 filter invert' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                        </div>
                        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 w-full text-center'>HOME</p></NavLink>
                            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 w-full text-center'>ALL DOCTORS</p></NavLink>
                            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 w-full text-center'>ABOUT</p></NavLink>
                            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 w-full text-center'>CONTACT</p></NavLink>
                            {/* Mobile Admin Panel Button */}
                            <a
                                href='https://doctor-healthcare-app-admin.vercel.app'
                                target='_blank'
                                rel='noopener noreferrer'
                                onClick={() => setShowMenu(false)}
                                className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 glow-effect flex items-center justify-center gap-2 w-full mt-4'
                            >
                                <svg className='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' />
                                </svg>
                                Admin Panel
                            </a>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar
