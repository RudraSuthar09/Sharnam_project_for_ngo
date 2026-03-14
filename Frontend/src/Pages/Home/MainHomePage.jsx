import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import Chatbot from "../../components/Chatbot/Chatbot";

const stats = [
  { value: 2800, label: "Animals Rescued", icon: "🐾" },
  { value: 1200, label: "Successful Adoptions", icon: "🏠" },
  { value: 450, label: "Active Volunteers", icon: "🤝" },
  { value: 12, label: "Years of Service", icon: "📅" },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

const StatCard = ({ value, label, icon, animate }) => {
  const count = useCountUp(value, 1800, animate);
  return (
    <div className="flex flex-col items-center bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-2xl p-6 text-white">
      <span className="text-4xl mb-2">{icon}</span>
      <span className="text-4xl font-extrabold">{animate ? count.toLocaleString() : 0}+</span>
      <span className="text-sm mt-1 text-yellow-200 font-medium">{label}</span>
    </div>
  );
};

const impactStories = [
  {
    title: "Fresh & Clean: Dog Bathing",
    description: "Give your furry friend the ultimate care they deserve. Join Sharanam in promoting healthy habits by donating or volunteering.",
    emoji: "🐕",
    color: "from-orange-400 to-orange-600",
  },
  {
    title: "Nourish Our Cats!",
    description: "Keep our feline friends happy and healthy with nutritious meals. Every meal makes a difference in their well-being.",
    emoji: "🐱",
    color: "from-purple-400 to-purple-600",
  },
  {
    title: "Cherish Our Cows!",
    description: "Nurture these gentle giants with acts of kindness and care. Ensure they thrive and flourish with our efforts.",
    emoji: "🐄",
    color: "from-green-400 to-green-600",
  },
  {
    title: "Save Birds!",
    description: "Our feathered friends need your help. Every action counts towards protecting their habitats and ensuring their survival.",
    emoji: "🦜",
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Care for Elephants!",
    description: "These majestic giants need your love and protection. Every gesture ensures their well-being and preserves their grandeur.",
    emoji: "🐘",
    color: "from-gray-500 to-gray-700",
  },
];

const services = [
  { icon: "🚑", title: "Emergency Rescue", desc: "24/7 emergency animal rescue service across the city" },
  { icon: "🏥", title: "Medical Care", desc: "Full veterinary care and rehabilitation for rescued animals" },
  { icon: "🏠", title: "Adoption", desc: "Find loving homes for rehabilitated animals" },
  { icon: "🎓", title: "Education", desc: "Community workshops on animal welfare and first aid" },
  { icon: "🌿", title: "Sanctuary", desc: "Safe, comfortable shelter for animals awaiting adoption" },
  { icon: "📍", title: "Vet Locator", desc: "Locate nearest veterinary clinic in emergencies" },
];

const MainHomePage = () => {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const totalSlides = impactStories.length;

  return (
    <>
      <MainNavbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-600 via-yellow-500 to-orange-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none text-[12rem] flex flex-wrap gap-8 justify-center items-center">
          {["🐾","🐕","🐱","🐄","🦜","🐘","🐟","🦋"].map((e,i)=><span key={i}>{e}</span>)}
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="inline-block bg-black bg-opacity-20 rounded-full px-4 py-1 text-white text-sm font-medium mb-6">
            🐾 Registered NGO • Est. 2012 • Ahmedabad, Gujarat
          </div>
          <h1 className="text-white text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg mb-4">
            WELCOME TO<br /><span className="text-black">SHARANAM</span>
          </h1>
          <h2 className="text-white text-2xl md:text-3xl font-light mb-4 opacity-90">
            आश्रयः सर्वेषाम् — A Shelter for All
          </h2>
          <p className="text-white text-lg mb-8 opacity-85 max-w-2xl mx-auto">
            We rescue, rehabilitate, and rehome injured animals with love and compassion. Join our mission to protect every life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/report-rescue")}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl transition-all hover:scale-105"
            >
              🚨 Report an Animal in Need
            </button>
            <button
              onClick={() => navigate("/donate")}
              className="bg-black hover:bg-gray-900 text-yellow-400 font-bold px-8 py-4 rounded-full text-lg shadow-xl transition-all hover:scale-105"
            >
              💛 Donate Now
            </button>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white text-3xl">↓</div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} animate={statsVisible} />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800">What We Do</h2>
            <p className="text-gray-600 mt-3 text-lg">Comprehensive animal welfare services for our community</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow border border-gray-100 flex flex-col gap-3"
              >
                <span className="text-4xl">{s.icon}</span>
                <h3 className="text-xl font-bold text-gray-800">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories Carousel */}
      <section className="py-16 px-6 bg-yellow-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800">Our Impact Stories</h2>
            <p className="text-gray-600 mt-3 text-lg">Every animal deserves care and love</p>
          </div>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / 3)}%)` }}
            >
              {impactStories.map((story, i) => (
                <div key={i} className="min-w-[calc(100%/3)] px-3" style={{ minWidth: "calc(100% / 3)" }}>
                  <div className={`bg-gradient-to-br ${story.color} rounded-2xl p-6 text-white h-full shadow-lg`}>
                    <div className="text-5xl mb-4">{story.emoji}</div>
                    <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{story.description}</p>
                    <button
                      onClick={() => navigate("/stories")}
                      className="text-white underline text-sm hover:opacity-75"
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
                disabled={currentSlide === 0}
                className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gray-700"
              >
                ‹
              </button>
              {[0, 1, 2].map((dot) => (
                <button
                  key={dot}
                  onClick={() => setCurrentSlide(dot)}
                  className={`w-3 h-3 rounded-full ${currentSlide === dot ? 'bg-yellow-500' : 'bg-gray-300'}`}
                />
              ))}
              <button
                onClick={() => setCurrentSlide((prev) => Math.min(totalSlides - 3, prev + 1))}
                disabled={currentSlide >= totalSlides - 3}
                className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center disabled:opacity-30 hover:bg-gray-700"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-red-600 py-12 px-6 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Found an Injured Animal?</h2>
        <p className="text-lg mb-6 opacity-90">Our rescue team is available 24/7. Report immediately and we will be there!</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/report-rescue")}
            className="bg-white text-red-600 font-bold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition-all hover:scale-105"
          >
            🚨 Report Now
          </button>
          <a
            href="tel:+919876543210"
            className="bg-transparent border-2 border-white text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-white hover:text-red-600 transition-all"
          >
            📞 Call Helpline
          </a>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-800">Why Join Sharanam?</h2>
            <p className="text-gray-600 mt-3 text-lg">Be part of the change. Your support matters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "💛",
                title: "Donate",
                desc: "Every rupee goes directly to animal care — medicine, food, and shelter for rescued animals.",
                cta: "Donate Now",
                path: "/donate",
                color: "bg-yellow-50 border-yellow-200",
                btnColor: "bg-yellow-400 hover:bg-yellow-300 text-black",
              },
              {
                icon: "🤝",
                title: "Volunteer",
                desc: "Give your time and skills. Walk dogs, help at medical camps, or assist with rescue operations.",
                cta: "Become a Volunteer",
                path: "/volunteer",
                color: "bg-green-50 border-green-200",
                btnColor: "bg-green-500 hover:bg-green-400 text-white",
              },
              {
                icon: "🏠",
                title: "Adopt",
                desc: "Open your home and heart to a rescued animal. Give them a forever family and a fresh start.",
                cta: "View Animals",
                path: "/adopt",
                color: "bg-blue-50 border-blue-200",
                btnColor: "bg-blue-500 hover:bg-blue-400 text-white",
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-2xl border p-8 text-center flex flex-col items-center gap-4 ${item.color}`}>
                <span className="text-5xl">{item.icon}</span>
                <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
                <button
                  onClick={() => navigate(item.path)}
                  className={`font-bold px-6 py-2 rounded-full transition-colors ${item.btnColor}`}
                >
                  {item.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Teaser */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-4xl font-extrabold mb-4">Upcoming Events</h2>
            <p className="text-gray-300 text-lg mb-6">Join our community workshops, adoption drives, and medical camps</p>
            <div className="flex flex-col gap-3">
              {[
                { date: "Mar 22", title: "World Water Day - Animal Hydration Drive", location: "Sabarmati Riverfront" },
                { date: "Apr 2", title: "Adoption Mela – Find Your Forever Pet", location: "Law Garden, Ahmedabad" },
                { date: "Apr 22", title: "Earth Day Plantation & Bird Feeder Drive", location: "Ahmedabad Zoo Premises" },
              ].map((ev) => (
                <div key={ev.title} className="flex items-start gap-4 bg-gray-800 rounded-xl p-4">
                  <div className="bg-yellow-400 text-black font-bold rounded-lg px-3 py-2 text-center min-w-[60px]">
                    <div className="text-xs">{ev.date.split(" ")[0]}</div>
                    <div className="text-xl font-extrabold">{ev.date.split(" ")[1]}</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{ev.title}</h4>
                    <p className="text-gray-400 text-sm">📍 {ev.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate("/events")}
              className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full text-lg hover:bg-yellow-300 transition-all hover:scale-105"
            >
              View All Events →
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <Chatbot />
    </>
  );
};

export default MainHomePage;
