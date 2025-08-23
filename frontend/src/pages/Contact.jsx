import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div className='animate-fade-in'>
      <div className='text-center pt-16 pb-8'>
        <p className='text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full w-fit mx-auto mb-4'>Get In Touch</p>
        <h1 className='text-4xl md:text-5xl font-bold text-text-primary mb-4'>
          Let's <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>Connect</span>
        </h1>
        <p className='text-text-secondary text-lg max-w-2xl mx-auto'>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className='my-16 flex flex-col lg:flex-row gap-12 mb-28'>
        {/* Contact Image */}
        <div className='lg:w-1/2 relative'>
          <img className='w-full rounded-2xl shadow-2xl' src={assets.contact_image} alt="Contact us" />
          <div className='absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent rounded-2xl'></div>

          {/* Floating contact card */}
          <div className='absolute -bottom-6 -right-6 glass rounded-xl p-6 border border-white/10 shadow-xl max-w-xs'>
            <div className='text-center'>
              <p className='text-sm text-text-muted mb-2'>Available 24/7</p>
              <p className='text-lg font-semibold text-text-primary'>Customer Support</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className='lg:w-1/2 space-y-8'>
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-text-primary'>Our Office</h2>

            <div className='space-y-4'>
              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0'>
                  <span className='text-xl'>📍</span>
                </div>
                <div>
                  <h3 className='font-semibold text-text-primary mb-1'>Address</h3>
                  <p className='text-text-secondary leading-relaxed'>
                    BIRLA Institute OF Mesra<br />
                    Ranchi, Jharkhand 834002<br />
                    India
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0'>
                  <span className='text-xl'>📞</span>
                </div>
                <div>
                  <h3 className='font-semibold text-text-primary mb-1'>Phone</h3>
                  <p className='text-text-secondary'>
                    <a href="tel:+916205474281" className='hover:text-primary transition-colors duration-200'>
                      (+91) 6205474281
                    </a>
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0'>
                  <span className='text-xl'>✉️</span>
                </div>
                <div>
                  <h3 className='font-semibold text-text-primary mb-1'>Email</h3>
                  <p className='text-text-secondary'>
                    <a href="mailto:anshulraj6205474281@gmail.com" className='hover:text-primary transition-colors duration-200'>
                      anshulraj6205474281@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='text-xl font-bold text-text-primary'>Business Hours</h3>
            <div className='glass rounded-xl p-6 border border-white/10'>
              <div className='space-y-2'>
                <div className='flex justify-between'>
                  <span className='text-text-secondary'>Monday - Friday</span>
                  <span className='text-text-primary font-medium'>9:00 AM - 6:00 PM</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-text-secondary'>Saturday</span>
                  <span className='text-text-primary font-medium'>10:00 AM - 4:00 PM</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-text-secondary'>Sunday</span>
                  <span className='text-text-primary font-medium'>Emergency Support Only</span>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <h3 className='text-xl font-bold text-text-primary'>Join Our Team</h3>
            <p className='text-text-secondary leading-relaxed'>
              We're always looking for talented individuals who are passionate about transforming healthcare. Explore our current openings and become part of our mission to make healthcare accessible to everyone.
            </p>
            <button className='bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105'>
              View Open Positions
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className='glass rounded-3xl p-12 border border-white/10 mb-20'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-text-primary mb-4'>Send Us a Message</h2>
          <p className='text-text-secondary text-lg'>We'll get back to you within 24 hours</p>
        </div>

        <div className='max-w-2xl mx-auto'>
          <form className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-text-primary font-medium mb-2'>First Name</label>
                <input
                  type="text"
                  className='w-full px-4 py-3 bg-dark-light border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200'
                  placeholder='Enter your first name'
                />
              </div>
              <div>
                <label className='block text-text-primary font-medium mb-2'>Last Name</label>
                <input
                  type="text"
                  className='w-full px-4 py-3 bg-dark-light border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200'
                  placeholder='Enter your last name'
                />
              </div>
            </div>

            <div>
              <label className='block text-text-primary font-medium mb-2'>Email</label>
              <input
                type="email"
                className='w-full px-4 py-3 bg-dark-light border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200'
                placeholder='Enter your email address'
              />
            </div>

            <div>
              <label className='block text-text-primary font-medium mb-2'>Subject</label>
              <input
                type="text"
                className='w-full px-4 py-3 bg-dark-light border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200'
                placeholder='What is this regarding?'
              />
            </div>

            <div>
              <label className='block text-text-primary font-medium mb-2'>Message</label>
              <textarea
                rows="5"
                className='w-full px-4 py-3 bg-dark-light border border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors duration-200 resize-none'
                placeholder='Tell us more about your inquiry...'
              ></textarea>
            </div>

            <div className='text-center'>
              <button
                type="submit"
                className='bg-gradient-to-r from-primary to-secondary text-white px-12 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105'
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
