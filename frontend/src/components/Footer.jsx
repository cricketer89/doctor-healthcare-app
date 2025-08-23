import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                {/* Left Side  */}
                <div className='space-y-6'>
                    <div>
                        <h1 className='text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2'>
                            MyHealthMate
                        </h1>
                        <p className='text-xs text-text-muted'>Your Health, Our Priority</p>
                    </div>
                    <p className='w-full md:w-2/3 text-text-secondary leading-relaxed'>
                        MyHealthMate is your trusted healthcare companion, revolutionizing how you access and manage your health. We connect you with verified medical professionals, streamline appointment scheduling, and provide comprehensive health management tools. Our mission is to make quality healthcare accessible, convenient, and personalized for everyone.
                    </p>

                    <div className='flex gap-4'>
                        <div className='w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center hover:bg-primary/30 transition-colors duration-200 cursor-pointer'>
                            <span className='text-lg'>📱</span>
                        </div>
                        <div className='w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center hover:bg-secondary/30 transition-colors duration-200 cursor-pointer'>
                            <span className='text-lg'>💬</span>
                        </div>
                        <div className='w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center hover:bg-accent/30 transition-colors duration-200 cursor-pointer'>
                            <span className='text-lg'>📧</span>
                        </div>
                    </div>
                </div>

                {/* Center Side */}
                <div className='space-y-6'>
                    <h3 className='text-lg font-bold text-text-primary'>Quick Links</h3>
                    <ul className='flex flex-col gap-3 text-text-secondary'>
                        <li className='hover:text-primary transition-colors duration-200 cursor-pointer'>Home</li>
                        <li className='hover:text-primary transition-colors duration-200 cursor-pointer'>About Us</li>
                        <li className='hover:text-primary transition-colors duration-200 cursor-pointer'>Our Doctors</li>
                        <li className='hover:text-primary transition-colors duration-200 cursor-pointer'>Services</li>
                        <li className='hover:text-primary transition-colors duration-200 cursor-pointer'>Contact Us</li>
                        <li className='hover:text-primary transition-colors duration-200 cursor-pointer'>Privacy Policy</li>
                    </ul>
                </div>

                {/* Right Side */}
                <div className='space-y-6'>
                    <h3 className='text-lg font-bold text-text-primary'>Contact Info</h3>
                    <ul className='flex flex-col gap-3 text-text-secondary'>
                        <li className='flex items-center gap-2'>
                            <span className='text-primary'>📞</span>
                            <a href="tel:+916205474281" className='hover:text-primary transition-colors duration-200'>
                                (+91) 6205474281
                            </a>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span className='text-primary'>✉️</span>
                            <a href="mailto:anshulraj6205474281@gmail.com" className='hover:text-primary transition-colors duration-200'>
                                anshulraj6205474281@gmail.com
                            </a>
                        </li>
                        <li className='flex items-start gap-2'>
                            <span className='text-primary mt-1'>📍</span>
                            <span>
                                BIRLA Institute OF Mesra<br />
                                Ranchi, Jharkhand 834002
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright Text */}
            <div className='border-t border-white/10'>
                <div className='py-6 flex flex-col md:flex-row justify-between items-center gap-4'>
                    <p className='text-sm text-text-muted text-center md:text-left'>
                        Copyright © 2025 MyHealthMate - All Rights Reserved.
                    </p>
                    <div className='flex gap-6 text-sm text-text-muted'>
                        <span className='hover:text-primary transition-colors duration-200 cursor-pointer'>Terms of Service</span>
                        <span className='hover:text-primary transition-colors duration-200 cursor-pointer'>Privacy Policy</span>
                        <span className='hover:text-primary transition-colors duration-200 cursor-pointer'>Cookie Policy</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
