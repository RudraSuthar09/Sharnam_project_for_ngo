import React, { useState } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import { sendFormSubmissionEmail } from "../../utils/sendFormSubmissionEmail";

const roles = [
  { id: "rescue", icon: "🚑", title: "Rescue Volunteer", desc: "Join our emergency rescue team for on-field animal rescue operations. Training provided.", commitment: "10 hrs/week", skills: "Physical fitness, driving license" },
  { id: "medical", icon: "🩺", title: "Medical Support", desc: "Assist veterinarians with animal care, post-surgery recovery, and medical records.", commitment: "8 hrs/week", skills: "Vet/nursing background preferred" },
  { id: "foster", icon: "🏠", title: "Foster Parent", desc: "Temporarily house animals recovering from injuries or awaiting adoption.", commitment: "Flexible", skills: "Pet-friendly home required" },
  { id: "education", icon: "🎓", title: "Educator / Trainer", desc: "Conduct community workshops on animal welfare, first aid, and responsible pet ownership.", commitment: "4 hrs/week", skills: "Good communication skills" },
  { id: "social", icon: "📱", title: "Social Media & Awareness", desc: "Create content, manage social media pages, and spread awareness about our causes.", commitment: "5 hrs/week", skills: "Social media, content creation" },
  { id: "admin", icon: "💼", title: "Admin & Operations", desc: "Help with documentation, fundraising, donor management, and event coordination.", commitment: "6 hrs/week", skills: "Organizational skills" },
];

const benefits = [
  { icon: "🏅", title: "Volunteer Certificate", desc: "Receive an official certificate recognized for CSR and academic portfolios" },
  { icon: "🎓", title: "Free Training", desc: "Get trained in animal first aid, rescue techniques, and welfare practices" },
  { icon: "🤝", title: "Community", desc: "Join a passionate community of 450+ animal lovers across Gujarat" },
  { icon: "💼", title: "Reference Letter", desc: "Earn professional recommendation letters for long-term volunteers" },
  { icon: "🐾", title: "Animal Bond", desc: "Form unique bonds with animals and contribute meaningfully to their recovery" },
  { icon: "🌟", title: "Recognition", desc: "Monthly volunteer spotlight and recognition on our website and social media" },
];

const testimonials = [
  { name: "Priya Shah", role: "Medical Volunteer, 2 years", quote: "Volunteering at Sharanam changed my perspective on life. Every animal I helped recover filled my heart with joy.", emoji: "👩" },
  { name: "Rajan Mehta", role: "Rescue Team Lead, 3 years", quote: "Being part of the rescue team is challenging but incredibly rewarding. You learn teamwork and quick decision-making.", emoji: "👨" },
  { name: "Sneha Patel", role: "Foster Parent, 1 year", quote: "Fostering rescued puppies was the best decision I ever made. I've now adopted two of them permanently!", emoji: "👩" },
];

const Volunteer = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", experience: "", motivation: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await sendFormSubmissionEmail({
      name: form.name,
      email: form.email,
      phone: form.phone,
      city: form.city,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <MainNavbar />
        <div className="min-h-screen flex items-center justify-center bg-green-50">
          <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md mx-4">
            <div className="text-7xl mb-4">🎉</div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Welcome to the Team!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for signing up as a volunteer, <strong>{form.name}</strong>! Our team will contact you at <strong>{form.email}</strong> within 48 hours.
            </p>
            <div className="bg-green-50 rounded-xl p-4 text-sm text-gray-700 mb-6">
              <strong>Role Applied For:</strong> {roles.find(r => r.id === selectedRole)?.title || "General Volunteer"}
            </div>
            <button onClick={() => setSubmitted(false)} className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-3 rounded-full transition-colors">
              Back to Volunteer Page
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MainNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-600 to-teal-600 py-20 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">Become a Volunteer</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
          Be the change you wish to see. Join our 450+ volunteers making a real difference for animals every day.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-center">
          {[["450+", "Active Volunteers"], ["2800+", "Animals Helped"], ["50+", "Events Conducted"]].map(([n, l]) => (
            <div key={l} className="bg-white bg-opacity-20 rounded-2xl px-8 py-4">
              <div className="text-3xl font-extrabold">{n}</div>
              <div className="text-sm opacity-90">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">Find Your Role</h2>
          <p className="text-gray-600 text-lg text-center mb-10">Choose the volunteering role that matches your skills and availability</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`bg-white rounded-2xl border-2 p-6 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg ${
                  selectedRole === role.id ? "border-green-500 shadow-lg bg-green-50" : "border-gray-200"
                }`}
              >
                <div className="text-4xl mb-3">{role.icon}</div>
                <h3 className="text-lg font-extrabold text-gray-800 mb-2">{role.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{role.desc}</p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>⏱️ <span className="font-medium">Commitment:</span> {role.commitment}</div>
                  <div>🛠️ <span className="font-medium">Skills:</span> {role.skills}</div>
                </div>
                {selectedRole === role.id && (
                  <div className="mt-3 text-green-600 font-bold text-sm">✓ Selected</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">Apply Now</h2>
          <p className="text-gray-600 text-center mb-8">Fill in your details and we'll get back to you within 48 hours</p>
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 shadow-md space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone *</label>
                <input required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400" placeholder="+91 98765 43210" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
                <input type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400" placeholder="Ahmedabad" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Preferred Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 bg-white"
              >
                <option value="">Select a role...</option>
                {roles.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Prior Experience with Animals</label>
              <textarea rows={3} value={form.experience} onChange={e => setForm({...form, experience: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 resize-none"
                placeholder="Tell us about any prior experience with animals, volunteering, or relevant skills..." />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Why do you want to volunteer? *</label>
              <textarea required rows={3} value={form.motivation} onChange={e => setForm({...form, motivation: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-400 resize-none"
                placeholder="What motivates you to volunteer with Sharanam?" />
            </div>
            <button type="submit" className="w-full bg-green-500 hover:bg-green-400 text-white font-extrabold py-4 rounded-xl text-lg transition-colors">
              🤝 Submit Application
            </button>
          </form>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">Why Volunteer with Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 flex gap-4">
                <span className="text-3xl">{b.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{b.title}</h3>
                  <p className="text-gray-600 text-sm">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center">What Our Volunteers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-gray-700 italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{t.emoji}</span>
                  <div>
                    <div className="font-bold text-gray-800">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
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

export default Volunteer;
