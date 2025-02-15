"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import Loader from "@/app/components/Loader";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
    subject: "Hotel management system message",
  });
  const [loading, setLoading] = useState(false);
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
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Ensure loading is set before the async operation starts
  
    emailjs
      .send("service_qzxl6jp", "template_w9kvgrw", formData, "KWleLqdJwS4tz9FRZ")
      .then((response) => {
        toast.success("Message sent successfully")
  
        setFormData({
          user_name: "",
          user_email: "",
          message: "",
          subject: "Portfolio message",
        });
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again later")
      })
      .finally(() => {
        setLoading(false); // Now it will run only after success or failure
      });
  };
  

  return (
    <div className="w-full bg-background text-foreground ">
      {/* Hero Section */}
      <section
        className="w-full 800px:h-[60vh] h-[40vh] flex items-center justify-center text-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(bg.jpg)`,
        }}
      >
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  name="user_name"
                  id="name"
                  value={formData.user_name}
                  required
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  value={formData.user_email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your Message"
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={5}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 flex justify-center items-center bg-blue-300 text-white rounded-md font-semibold hover:bg-blue-500 transition duration-300"
            >
              {loading ? (
               <Loader h="h-8" w="w-8" />
              ) : (
                <h1 className="font-semibold text-center">Send Message</h1>
              )}
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
