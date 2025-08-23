import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
    return (
        <div className='animate-fade-in'>
            <div className='text-center pt-16 pb-8'>
                <p className='text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full w-fit mx-auto mb-4'>About Us</p>
                <h1 className='text-4xl md:text-5xl font-bold text-text-primary mb-4'>
                    Transforming <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>Healthcare</span> Together
                </h1>
                <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
                    Empowering individuals to take control of their health journey with innovative technology and compassionate care.
                </p>
            </div>

            <div className='my-16 flex flex-col md:flex-row gap-12 items-center'>
                <div className='md:w-1/2 relative'>
                    <img className='w-full rounded-2xl shadow-2xl' src={assets.about_image} alt="Healthcare professionals" />
                    <div className='absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent rounded-2xl'></div>

                    {/* Floating stats */}
                    <div className='absolute -bottom-6 -left-6 glass rounded-xl p-6 border border-white/10 shadow-xl'>
                        <div className='text-center'>
                            <p className='text-3xl font-bold text-primary'>5+</p>
                            <p className='text-sm text-text-muted'>Years of Excellence</p>
                        </div>
                    </div>
                </div>

                <div className='md:w-1/2 space-y-8'>
                    <div className='space-y-6'>
                        <h2 className='text-2xl font-bold text-text-primary'>Our Mission</h2>
                        <p className='text-text-secondary leading-relaxed'>
                            At MyHealthMate, we believe that quality healthcare should be accessible to everyone. Our mission is to bridge the gap between patients and healthcare providers through innovative technology, making healthcare management seamless, efficient, and personalized.
                        </p>

                        <p className='text-text-secondary leading-relaxed'>
                            We understand the challenges that individuals face when managing their health - from scheduling appointments to keeping track of medical records. That's why we've created a comprehensive platform that puts your health journey first, connecting you with trusted medical professionals who are committed to your well-being.
                        </p>
                    </div>

                    <div className='space-y-4'>
                        <h3 className='text-xl font-semibold text-text-primary'>Our Vision</h3>
                        <p className='text-text-secondary leading-relaxed'>
                            To become the leading healthcare technology platform that revolutionizes how people access and manage their healthcare needs. We envision a future where quality healthcare is just a click away, where patients feel empowered and confident in their health decisions.
                        </p>
                    </div>
                </div>
            </div>

            <div className='text-center mb-12'>
                <h2 className='text-3xl font-bold text-text-primary mb-4'>
                    Why Choose <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>MyHealthMate</span>
                </h2>
                <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
                    Experience healthcare reimagined with our cutting-edge platform designed for modern life.
                </p>
            </div>

            <div className='grid md:grid-cols-3 gap-8 mb-20'>
                <div className='glass rounded-2xl p-8 border border-white/10 card-hover group'>
                    <div className='w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                        <span className='text-2xl'>⚡</span>
                    </div>
                    <h3 className='text-xl font-bold text-text-primary mb-4'>Lightning Fast</h3>
                    <p className='text-text-secondary leading-relaxed'>
                        Book appointments in seconds with our streamlined scheduling system. No more waiting on hold or navigating complex phone menus - your healthcare journey starts with just a few clicks.
                    </p>
                </div>

                <div className='glass rounded-2xl p-8 border border-white/10 card-hover group'>
                    <div className='w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                        <span className='text-2xl'>🛡️</span>
                    </div>
                    <h3 className='text-xl font-bold text-text-primary mb-4'>Trusted Network</h3>
                    <p className='text-text-secondary leading-relaxed'>
                        Connect with verified healthcare professionals who have been carefully vetted and reviewed. Your safety and well-being are our top priorities, ensuring you receive care from qualified experts.
                    </p>
                </div>

                <div className='glass rounded-2xl p-8 border border-white/10 card-hover group'>
                    <div className='w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                        <span className='text-2xl'>🎯</span>
                    </div>
                    <h3 className='text-xl font-bold text-text-primary mb-4'>Personalized Care</h3>
                    <p className='text-text-secondary leading-relaxed'>
                        Get tailored recommendations and reminders that adapt to your unique health needs. Our intelligent system learns your preferences to provide a truly personalized healthcare experience.
                    </p>
                </div>
            </div>

            {/* Additional features section */}
            <div className='glass rounded-3xl p-12 border border-white/10 mb-20'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl font-bold text-text-primary mb-4'>Advanced Features</h2>
                    <p className='text-text-secondary text-lg'>Everything you need for comprehensive health management</p>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    <div className='text-center space-y-3'>
                        <div className='w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto'>
                            <span className='text-xl'>📱</span>
                        </div>
                        <h4 className='font-semibold text-text-primary'>Mobile App</h4>
                        <p className='text-sm text-text-muted'>Access your health data anywhere, anytime</p>
                    </div>

                    <div className='text-center space-y-3'>
                        <div className='w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mx-auto'>
                            <span className='text-xl'>🔒</span>
                        </div>
                        <h4 className='font-semibold text-text-primary'>Secure Records</h4>
                        <p className='text-sm text-text-muted'>HIPAA-compliant data protection</p>
                    </div>

                    <div className='text-center space-y-3'>
                        <div className='w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto'>
                            <span className='text-xl'>💬</span>
                        </div>
                        <h4 className='font-semibold text-text-primary'>24/7 Support</h4>
                        <p className='text-sm text-text-muted'>Round-the-clock customer assistance</p>
                    </div>

                    <div className='text-center space-y-3'>
                        <div className='w-12 h-12 bg-success/20 rounded-xl flex items-center justify-center mx-auto'>
                            <span className='text-xl'>📊</span>
                        </div>
                        <h4 className='font-semibold text-text-primary'>Health Analytics</h4>
                        <p className='text-sm text-text-muted'>Track your wellness journey</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
