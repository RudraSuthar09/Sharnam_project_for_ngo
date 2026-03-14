import React from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const teamMembers = [
  { name: "Dr. Anjali Mehta", role: "Chief Veterinarian", emoji: "👩‍⚕️", bio: "10+ years experience in animal surgery and rehabilitation" },
  { name: "Rajesh Patel", role: "Founder & Executive Director", emoji: "👨‍💼", bio: "Founded Sharanam in 2012 after a stray dog changed his life" },
  { name: "Priya Shah", role: "Head of Rescues", emoji: "👩", bio: "Leads the 24/7 rescue team with 6 years of field experience" },
  { name: "Dr. Suresh Verma", role: "Wildlife Specialist", emoji: "👨‍🔬", bio: "Specialist in wild animal care and forest coordination" },
  { name: "Kavita Nair", role: "Community Outreach", emoji: "👩‍🏫", bio: "Drives education programs in schools and communities" },
  { name: "Arjun Singh", role: "Technology & Operations", emoji: "👨‍💻", bio: "Manages digital presence and volunteer coordination systems" },
];

const milestones = [
  { year: "2012", title: "Sharanam Founded", desc: "Started with a small shelter and 3 volunteers in Ahmedabad" },
  { year: "2014", title: "First Vet Clinic", desc: "Opened our in-house veterinary clinic for rescued animals" },
  { year: "2016", title: "1000 Rescues", desc: "Crossed the milestone of 1000 animal rescues" },
  { year: "2018", title: "Wildlife Division", desc: "Launched a specialized wildlife rescue division in partnership with Gujarat Forest Dept." },
  { year: "2020", title: "Digital Rescue", desc: "Launched online rescue reporting and AI-powered vet chatbot" },
  { year: "2023", title: "Three Cities", desc: "Expanded operations to Surat and Vadodara with dedicated rescue centers" },
  { year: "2025", title: "2800+ Animals", desc: "Celebrating 2800+ successful rescues and 1200+ adoptions" },
];

const values = [
  { icon: "❤️", title: "Compassion", desc: "We treat every animal with unconditional love and dignity, regardless of species or condition." },
  { icon: "🔬", title: "Excellence", desc: "We maintain the highest standards of veterinary care and rehabilitation protocols." },
  { icon: "🌍", title: "Sustainability", desc: "We work towards eco-friendly practices and long-term community impact." },
  { icon: "🤲", title: "Transparency", desc: "Every donation is tracked and reported. We believe in complete accountability." },
  { icon: "🤝", title: "Community", desc: "We empower communities to become advocates for animal welfare." },
  { icon: "⚡", title: "Action", desc: "When an animal is in need, we respond. No delays, no excuses." },
];

const partners = [
  "Gujarat Forest Department", "Ahmedabad Municipal Corporation",
  "PETA India", "Wildlife SOS", "SPCA Gujarat",
  "IVN Ahmedabad", "Animal Welfare Board of India"
];

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-yellow-500 to-orange-600 py-20 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 text-[8rem] flex flex-wrap gap-4 justify-center items-center pointer-events-none select-none">
          {["🐾","🐕","🐱","🐄","🦜","🐘"].map((e,i)=><span key={i}>{e}</span>)}
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold mb-4">About Sharanam</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            आश्रयः सर्वेषाम् — A shelter for all creatures. Our story began with love for animals and a commitment to protect every life.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Sharanam was born out of a simple act of compassion. In 2012, our founder Rajesh Patel came across a severely injured dog on a highway and couldn't find any help. He decided to change that.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              What started as a one-man operation from his garage has grown into Gujarat's most active animal rescue NGO — with three centers, 450+ volunteers, and over 2800 animals rescued and rehabilitated.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that every living being deserves care, dignity, and love. Our work spans emergency rescue, veterinary care, rehabilitation, foster programs, and community education.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🎯", title: "Mission", desc: "To rescue, rehabilitate, and rehome every injured animal, while building compassionate communities." },
              { icon: "🌟", title: "Vision", desc: "A Gujarat where no animal suffers for lack of care — and every community is an animal's ally." },
              { icon: "📋", title: "Registration", desc: "Registered under Section 12A & 80G. NGO Darpan & FCRA compliant." },
              { icon: "🏆", title: "Recognition", desc: "Gujarat State Award for Best Animal Welfare NGO, 2022 & 2024." },
            ].map(item => (
              <div key={item.title} className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-extrabold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                <span className="text-4xl">{v.icon}</span>
                <div>
                  <h3 className="font-extrabold text-gray-800 mb-1">{v.title}</h3>
                  <p className="text-gray-600 text-sm">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-yellow-300" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6 relative">
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-400 text-black font-extrabold flex items-center justify-center text-xs">{m.year}</div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 flex-1 border border-gray-100">
                    <h3 className="font-extrabold text-gray-800">{m.title}</h3>
                    <p className="text-gray-600 text-sm">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map(m => (
              <div key={m.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="text-6xl mb-3">{m.emoji}</div>
                <h3 className="font-extrabold text-gray-800 text-lg">{m.name}</h3>
                <div className="text-yellow-600 font-bold text-sm mb-2">{m.role}</div>
                <p className="text-gray-600 text-sm">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Our Partners & Recognitions</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {partners.map(p => (
              <span key={p} className="bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-full text-sm border border-gray-200">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-yellow-400 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Join Our Mission</h2>
        <p className="text-gray-800 text-lg mb-8 max-w-xl mx-auto">Whether you donate, volunteer, or adopt — every action makes our mission stronger.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button onClick={() => navigate('/donate')} className="bg-black text-yellow-400 font-bold px-8 py-3 rounded-full hover:bg-gray-900 transition-colors">💛 Donate Now</button>
          <button onClick={() => navigate('/volunteer')} className="bg-white text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">🤝 Volunteer</button>
          <button onClick={() => navigate('/adopt')} className="border-2 border-black text-black font-bold px-8 py-3 rounded-full hover:bg-black hover:text-yellow-400 transition-colors">🐾 Adopt</button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
