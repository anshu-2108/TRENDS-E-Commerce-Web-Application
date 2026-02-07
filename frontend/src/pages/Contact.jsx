import React, { useState } from "react";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Decorative Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-gray-300"></div>
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                Get in Touch
              </span>
              <div className="w-12 h-px bg-gray-300"></div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              <span className="block font-normal mt-2">Contact Us</span>
            </h1>

            <p className="max-w-2xl mx-auto text-gray-600 text-lg">
              We're here to help. Reach out with any questions or feedback.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-10">
                <h2 className="text-2xl font-light text-gray-900 mb-6">
                  Send us a message
                </h2>

                {/* Success Message */}
                {isSubmitted && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-emerald-700 text-sm">
                      Thank you! Your message has been sent successfully.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-900 focus:outline-none text-sm resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <FaPaperPlane className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Image */}
              <div className="overflow-hidden rounded-2xl">
                <img
                  className="w-full h-64 object-cover"
                  src={assets.contact_img}
                  alt="TRENDS store location"
                />
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Contact Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <FaMapMarkerAlt className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Our Store
                        </p>
                        <p className="text-sm text-gray-600">
                          Sector 70 Bistupur Main Road
                          <br />
                          Jamshedpur, Jharkhand, India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <FaPhone className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Phone
                        </p>
                        <p className="text-sm text-gray-600">(+1) 555-0132</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <FaEnvelope className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Email
                        </p>
                        <p className="text-sm text-gray-600">
                          contact@trends.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <FaClock className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Business Hours
                        </p>
                        <p className="text-sm text-gray-600">
                          Monday - Friday: 9AM - 6PM
                          <br />
                          Saturday: 10AM - 4PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                    Connect With Us
                  </h4>
                  <div className="flex items-center gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:border-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Careers Section */}
                {/* <div className="pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Careers at TRENDS
                      </h4>
                      <p className="text-sm text-gray-600">
                        Join our growing team
                      </p>
                    </div>
                    <button className="px-6 py-2 border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap">
                      Explore Jobs
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-4">
              <span className="block font-normal mt-2">
                Frequently Asked Questions
              </span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What is your return policy?",
                answer:
                  "We offer a 7-day return policy for all unused items in original condition. Free returns for orders over $100.",
              },
              {
                question: "How long does shipping take?",
                answer:
                  "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.",
              },
              {
                question: "Do you ship internationally?",
                answer:
                  "Yes, we ship to over 50 countries. Shipping costs and delivery times vary by location.",
              },
              {
                question: "How can I track my order?",
                answer:
                  "You'll receive a tracking number via email once your order ships. You can also check your order status in your account.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {faq.question}
                </h4>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsLetterBox />

      {/* Bottom Decorative Line */}
      <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
    </div>
  );
};

export default Contact;
