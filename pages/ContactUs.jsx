import Layout from '@/src/layout/Layouty';
import React, { useState } from 'react';
import CountrySelector from  '@/src/components/CountrySelector';

const ContactUs = () => {
  const initialFormData = {
    firstName: '',
    contactNumber: '',
    email: '',
    country: '',
    inquiry: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCountryChange = (selectedCountry) => {
    setFormData((prevData) => ({ ...prevData, country: selectedCountry }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Email sent successfully
        setAlert({ show: true, message: 'Email sent successfully!', type: 'success' });

        // Reset the form data after successful submission
        setFormData(initialFormData); // Reset form fields to initial state
      } else {
        // Failed to send email
        setAlert({ show: true, message: 'Failed to send email. Please try again later.', type: 'error' });
      }

      // Automatically hide success or error alert after 5 seconds
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setAlert({ show: true, message: 'Error sending email. Please try again later.', type: 'error' });
    }
  };

  return (
    <Layout>
      <div>
        <div className="container mx-auto p-4 text-slate-600">
          <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='col-span-1 my-auto'>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <p>Phone: +1 123 456 7890</p>
              <p>Email: info@example.com</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3 bg-white rounded-lg shadow-md text-slate-600 px-10 py-12">
                <input
                  placeholder='Your Name'
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="px-3 rounded-md border-none border-b-2 border-slate-800"
                />
                <input
                  placeholder='Contact Number'
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="px-3 rounded-md border-none border-b-2 border-slate-800"
                />
                <input
                  placeholder='Email'
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="px-3 rounded-md border-none border-b-2 border-slate-800"
                />
                <CountrySelector
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  className="px-3 rounded-md border-none border-b-2 border-slate-800"
                />
                <textarea
                  placeholder='Inquiry'
                  id="inquiry"
                  name="inquiry"
                  rows={4}
                  value={formData.inquiry}
                  onChange={handleChange}
                  className="px-3 rounded-md border-none border-b-2 border-slate-800"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-indigo-500 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  SUBMIT
                </button>
              </form>
              {alert.show && (
                <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                  {alert.message}
                </div>
              )}
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Social Media</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-500 hover:text-blue-600">Facebook</a>
              <a href="#" className="text-blue-500 hover:text-blue-600">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
