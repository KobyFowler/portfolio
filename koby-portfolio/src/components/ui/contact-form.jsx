// src/components/ui/contact-form.jsx
import React, { useState, useEffect } from 'react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: null,
    success: false
  });
  const [emailJSLoaded, setEmailJSLoaded] = useState(false);

  // Load EmailJS script dynamically
  useEffect(() => {
    if (!window.emailjs) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.async = true;
      script.onload = () => {
        window.emailjs.init("dGxW4V9GTEvXVnUkw"); // Replace with your EmailJS public key
        setEmailJSLoaded(true);
      };
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    } else {
      setEmailJSLoaded(true);
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null, success: false });

    if (!emailJSLoaded) {
      setStatus({
        submitted: true,
        submitting: false,
        error: "Email service is still loading. Please try again in a moment.",
        success: false
      });
      return;
    }

    try {
      // Using EmailJS (Directly from CDN, no npm package needed)
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
        to_email: 'kobymfowler@outlook.com'
      };
      
      // If successful
      setStatus({
        submitted: true,
        submitting: false,
        error: null,
        success: true
      });
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({
          ...prev,
          submitted: false,
          success: false
        }));
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        submitted: true,
        submitting: false,
        error: error.message || 'Something went wrong. Please try again.',
        success: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status.error && (
        <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
          {status.error}
        </div>
      )}
      
      {status.success && (
        <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
          Message sent successfully! I'll get back to you soon.
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
          required
          disabled={status.submitting}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
          required
          disabled={status.submitting}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
          required
          disabled={status.submitting}
        />
      </div>

      <button
        type="submit"
        disabled={status.submitting || !emailJSLoaded}
        className={`w-full px-6 py-3 ${
          status.submitting || !emailJSLoaded
            ? 'bg-blue-700 cursor-not-allowed' 
            : 'bg-blue-500 hover:bg-blue-600'
        } text-white rounded-lg transition-colors duration-200 flex justify-center items-center`}
      >
        {status.submitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : !emailJSLoaded ? (
          'Loading Email Service...'
        ) : (
          'Send Message'
        )}
      </button>
      
      <div className="text-xs text-gray-400 mt-4 text-center">
        Messages will be sent directly to kobymfowler@outlook.com
      </div>
    </form>
  );
};