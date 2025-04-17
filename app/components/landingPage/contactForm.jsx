import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto p-6">
      {/* Left side - Form */}
      <div className="flex-1 bg-purple-700 rounded-lg p-8">
        <h2 className="text-2xl text-white mb-6">Send us a message</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/30 py-2 text-white placeholder-white/70 focus:outline-none focus:border-white"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/30 py-2 text-white placeholder-white/70 focus:outline-none focus:border-white"
            />
          </div>
          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-white/30 py-2 text-white placeholder-white/70 focus:outline-none focus:border-white"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full bg-transparent border-b border-white/30 py-2 text-white placeholder-white/70 focus:outline-none focus:border-white resize-none"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Right side - Contact Information */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl mb-4">Contact us</h2>
        <p className="text-gray-400 mb-8">
          We're open for any suggestion or just to have a chat
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-6">📍</div>
            <div>
              <strong>Address:</strong><br />
              Chembur<br />
              Mumbai IN 400072
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-6">📞</div>
            <div>
              <strong>Phone:</strong> + 91 7738939056
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-6">✉️</div>
            <div>
              <strong>Email:</strong> serviceteam@dinenit.com
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-6">🌐</div>
            <div>
              <strong>Website:</strong> www.dinenit.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
