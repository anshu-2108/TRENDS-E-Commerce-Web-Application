import React from 'react'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { FaCheckCircle, FaShieldAlt, FaHeadset, FaTruck, FaLeaf, FaStar, FaClock, FaUsers } from 'react-icons/fa'

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Decorative Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gray-300"></div>
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Our Story</span>
              <div className="w-12 h-px bg-gray-300"></div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              
              <span className="block font-normal mt-2">About TRENDS</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              Where minimalist design meets timeless style
            </p>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Image Section */}
            <div className="lg:w-1/2">
              <div className="relative overflow-hidden rounded-2xl">
                <img 
                  className="w-full h-auto object-cover"
                  src={assets.about_img} 
                  alt="TRENDS minimal fashion" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Our Journey</h3>
                  <p className="text-gray-600 leading-relaxed">
                    TRENDS was born from a passion for minimalist design and a commitment to quality. 
                    Our journey began with a simple vision: to create essential pieces that stand the test of time.
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 leading-relaxed">
                    We meticulously curate each collection, focusing on clean lines, premium materials, and 
                    thoughtful details. Every piece is designed to integrate seamlessly into your wardrobe.
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                    <FaLeaf className="w-4 h-4 text-gray-600" />
                    Our Mission
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    To redefine modern fashion through minimalist design, sustainable practices, and 
                    exceptional quality. We believe in creating less but better—pieces that you'll reach for daily.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900 mb-1">2018</div>
                    <p className="text-xs text-gray-500">Founded</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-900 mb-1">50k+</div>
                    <p className="text-xs text-gray-500">Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              
              <span className="block font-normal mt-2">Our Values</span>
            </h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCheckCircle className="w-6 h-6" />,
                title: "Quality First",
                description: "Every product undergoes rigorous quality checks to ensure it meets our standards for materials, craftsmanship, and durability.",
                color: "text-blue-600",
                bgColor: "bg-blue-50"
              },
              {
                icon: <FaShieldAlt className="w-6 h-6" />,
                title: "Sustainable Practices",
                description: "We're committed to reducing our environmental impact through responsible sourcing and eco-friendly packaging.",
                color: "text-emerald-600",
                bgColor: "bg-emerald-50"
              },
              {
                icon: <FaHeadset className="w-6 h-6" />,
                title: "Customer Focus",
                description: "Your satisfaction is our priority. Our team is dedicated to providing exceptional service at every step.",
                color: "text-gray-600",
                bgColor: "bg-gray-50"
              }
            ].map((value, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-sm transition-shadow">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${value.bgColor} ${value.color} rounded-full mb-6`}>
                  {value.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column */}
            <div>
              <h3 className="text-2xl font-light text-gray-900 mb-6">
                Why Choose TRENDS
              </h3>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Timeless Design",
                    description: "Our pieces transcend seasons and trends, designed to be worn for years.",
                    icon: <FaStar className="w-4 h-4 text-gray-600" />
                  },
                  {
                    title: "Premium Materials",
                    description: "We source only the finest fabrics and materials for lasting comfort.",
                    icon: <FaCheckCircle className="w-4 h-4 text-gray-600" />
                  },
                  {
                    title: "Ethical Production",
                    description: "All our products are made in facilities that uphold fair labor practices.",
                    icon: <FaUsers className="w-4 h-4 text-gray-600" />
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="shrink-0 w-8 h-8 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <FaTruck className="w-5 h-5 text-gray-600" />
                    <h4 className="text-lg font-medium text-gray-900">Fast & Reliable Shipping</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Enjoy free shipping on orders over $100 and easy returns within 30 days.
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <FaClock className="w-5 h-5 text-gray-600" />
                    <h4 className="text-lg font-medium text-gray-900">Our Commitment</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We're dedicated to continuous improvement—in our products, our service, and our impact on the world. 
                    Your trust drives us to be better every day.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-full">
                  <span>Join Our Community</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsLetterBox />

      {/* Bottom Decorative Line */}
      <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
    </div>
  )
}

export default About