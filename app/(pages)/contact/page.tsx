"use client";
import React, { useEffect } from "react";
import gsap from "gsap";

const ContactPage = () => {
  useEffect(() => {
    // Contact Form Section Animation
    gsap.fromTo(
      ".contact-title",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );

    gsap.fromTo(
      ".contact-form",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
  }, []);

  return (
    <div className="w-full bg-background text-foreground ">
      {/* Hero Section */}
      <section className="w-full h-[60vh] flex items-center justify-center text-center bg-cover bg-center relative" style={{
          backgroundImage: `url(bg.jpg)`,
        }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="contact-title relative text-4xl font-bold text-white z-10">
          Contact Us
        </h1>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-4xl mx-auto 800px:py-12 py-4 px-1 800px:px-4">
        <h2 className="contact-title 800px:text-3xl text-2xl font-semibold text-center mb-6">
          Get In Touch
        </h2>

        <div className="contact-form w-full bg-gray-100 800px:p-6 p-2 rounded-lg shadow-lg">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your Message"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={6}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="max-w-4xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Or Reach Us At
        </h2>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="contact-info">
            <h3 className="text-xl font-semibold">Address</h3>
            <p className="text-gray-600">123 Hotel Street, Kutus, Kirinyaga</p>
          </div>
          <div className="contact-info">
            <h3 className="text-xl font-semibold">Phone</h3>
            <p className="text-gray-600">+254 748143442</p>
          </div>
          <div className="contact-info">
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="text-gray-600">squimstech@gmail.com</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
