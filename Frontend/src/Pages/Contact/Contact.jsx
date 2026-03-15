import React, { useState } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import { sendFormSubmissionEmail } from "../../utils/sendFormSubmissionEmail";

const faqs = [
  { q: "How do I report an injured animal?", a: "You can use our 'Report Rescue' page on the website or call our 24/7 helpline at +91 98765 43210. Provide the location, animal type, and condition." },
  { q: "Is my donation tax-exempt?", a: "Yes! Sharanam is registered under Section 80G of the Income Tax Act. You will receive a donation receipt for tax exemption purposes." },
  { q: "How can I volunteer?", a: "Visit our Volunteer page and fill out the application form. We have roles for rescue, medical support, fostering, education, and more." },
  { q: "Can I visit the rescue center?", a: "Yes, we welcome visitors on weekends (Saturday & Sunday, 10am–4pm). Please call ahead to schedule a visit." },
  { q: "How does adoption work?", a: "Visit our Adopt page, browse available animals, fill out an adoption application. Our team will verify your home environment and complete the process within a week." },
];

const offices = [
  { city: "Ahmedabad (HQ)", address: "123 Animal Rescue Road, Navrangpura, Ahmedabad – 380009", phone: "+91 98765 43210", email: "help@sharanam.org" },
  { city: "Surat", address: "45 Wildlife Care Lane, Adajan, Surat – 395009", phone: "+91 98765 43211", email: "surat@sharanam.org" },
  { city: "Vadodara", address: "78 Paws & Claws Street, Alkapuri, Vadodara – 390007", phone: "+91 98765 43212", email: "vadodara@sharanam.org" },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendFormSubmissionEmail({
      email: form.email,
      formName: "Contact Form",
      name: form.name,
    });
    setSubmitted(true);
  };

  return (
    <>
      <MainNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 to-cyan-600 py-20 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Have a question, want to collaborate, or need to report an animal? We're here 24/7.
        </p>
      </section>

      {/* Quick Contact Cards */}
      <section className="bg-gray-900 py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "📞", title: "Emergency Helpline", detail: "+91 98765 43210", sub: "24/7 Animal Rescue", href: "tel:+919876543210", color: "bg-red-600" },
            { icon: "✉️", title: "Email Us", detail: "help@sharanam.org", sub: "We reply within 24 hours", href: "mailto:help@sharanam.org", color: "bg-blue-600" },
            { icon: "📍", title: "Visit Us", detail: "Ahmedabad, Gujarat", sub: "Sat–Sun: 10am–4pm", href: "#offices", color: "bg-teal-600" },
          ].map(c => (
            <a key={c.title} href={c.href} className={`${c.color} rounded-2xl p-5 text-white flex items-center gap-4 hover:opacity-90 transition-opacity`}>
              <span className="text-3xl">{c.icon}</span>
              <div>
                <div className="font-bold">{c.title}</div>
                <div className="font-extrabold text-lg">{c.detail}</div>
                <div className="text-xs opacity-80">{c.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-8 text-center">
                <div className="text-5xl mb-3">✅</div>
                <h3 className="text-xl font-extrabold text-gray-800 mb-2">Message Received!</h3>
                <p className="text-gray-600">Thank you, <strong>{form.name}</strong>! We'll get back to you at <strong>{form.email}</strong> within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="mt-4 bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 py-2 rounded-full transition-colors">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 space-y-4 border border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                    <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subject *</label>
                  <select required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400 bg-white">
                    <option value="">Select a topic...</option>
                    <option>General Inquiry</option>
                    <option>Donation Query</option>
                    <option>Volunteering</option>
                    <option>Adoption Process</option>
                    <option>Partnership / Sponsorship</option>
                    <option>Media & Press</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-400 resize-none"
                    placeholder="How can we help you?" />
                </div>
                <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white font-extrabold py-4 rounded-xl text-lg transition-colors">
                  ✉️ Send Message
                </button>
              </form>
            )}
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-gray-800 hover:bg-gray-50"
                  >
                    <span>{faq.q}</span>
                    <span className={`transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>↓</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-gray-600 text-sm border-t border-gray-100 pt-3">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-extrabold text-gray-800 mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Facebook", handle: "@SharanamNGO", color: "bg-blue-600" },
                  { name: "Instagram", handle: "@sharanam_ngo", color: "bg-pink-600" },
                  { name: "Twitter", handle: "@SharanamNGO", color: "bg-sky-500" },
                  { name: "YouTube", handle: "Sharanam NGO", color: "bg-red-600" },
                ].map(s => (
                  <a key={s.name} href="#" className={`${s.color} text-white rounded-xl p-3 flex items-center gap-2 hover:opacity-90 transition-opacity`}>
                    <span className="font-extrabold">{s.name[0]}</span>
                    <div className="text-xs">
                      <div className="font-bold">{s.name}</div>
                      <div className="opacity-80">{s.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section id="offices" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map(o => (
              <div key={o.city} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="font-extrabold text-gray-800 text-xl mb-4">{o.city}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">📍 <span>{o.address}</span></div>
                  <div className="flex items-center gap-2">📞 <a href={`tel:${o.phone}`} className="hover:text-teal-600">{o.phone}</a></div>
                  <div className="flex items-center gap-2">✉️ <a href={`mailto:${o.email}`} className="hover:text-teal-600">{o.email}</a></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
