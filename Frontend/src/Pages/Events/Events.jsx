import React, { useState } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import { sendFormSubmissionEmail } from "../../utils/sendFormSubmissionEmail";

const events = [
  {
    id: 1,
    title: "World Water Day – Animal Hydration Drive",
    date: "2026-03-22",
    time: "9:00 AM – 1:00 PM",
    location: "Sabarmati Riverfront, Ahmedabad",
    category: "Community Drive",
    categoryColor: "bg-blue-100 text-blue-700",
    description: "Join us to set up water stations for stray animals across the city. Volunteers needed to help distribute water bowls.",
    emoji: "💧",
    spots: 40,
    spotsLeft: 12,
  },
  {
    id: 2,
    title: "Adoption Mela – Find Your Forever Pet",
    date: "2026-04-02",
    time: "10:00 AM – 5:00 PM",
    location: "Law Garden, Ahmedabad",
    category: "Adoption",
    categoryColor: "bg-pink-100 text-pink-700",
    description: "Meet our rescued and rehabilitated animals looking for forever homes. Bring your family and adopt a new member!",
    emoji: "🐾",
    spots: 200,
    spotsLeft: 143,
  },
  {
    id: 3,
    title: "First Aid for Animals – Workshop",
    date: "2026-04-10",
    time: "2:00 PM – 5:00 PM",
    location: "Sharanam Rescue Center",
    category: "Workshop",
    categoryColor: "bg-green-100 text-green-700",
    description: "Learn basic first aid techniques for injured animals. Certified trainers will guide you through hands-on exercises.",
    emoji: "🩺",
    spots: 30,
    spotsLeft: 8,
  },
  {
    id: 4,
    title: "Earth Day Plantation & Bird Feeder Drive",
    date: "2026-04-22",
    time: "7:00 AM – 11:00 AM",
    location: "Ahmedabad Zoo Premises",
    category: "Environment",
    categoryColor: "bg-emerald-100 text-emerald-700",
    description: "Plant trees and install bird feeders across the city to create habitats for local bird species.",
    emoji: "🌳",
    spots: 80,
    spotsLeft: 55,
  },
  {
    id: 5,
    title: "Free Veterinary Camp – Stray Animals",
    date: "2026-05-05",
    time: "9:00 AM – 3:00 PM",
    location: "Sharanam NGO Compound",
    category: "Medical Camp",
    categoryColor: "bg-red-100 text-red-700",
    description: "Free vaccinations, deworming, and health checkups for stray animals. Bring in any street animal for care.",
    emoji: "💉",
    spots: 100,
    spotsLeft: 72,
  },
  {
    id: 6,
    title: "Fundraising Gala – An Evening for Animals",
    date: "2026-05-20",
    time: "6:00 PM – 10:00 PM",
    location: "The Grand Ballroom, Hotel Marriott, Ahmedabad",
    category: "Fundraiser",
    categoryColor: "bg-yellow-100 text-yellow-700",
    description: "An elegant fundraising gala with live performances, dinner, and an auction to raise funds for our rescue center.",
    emoji: "🎗️",
    spots: 150,
    spotsLeft: 34,
  },
];

const categories = ["All", "Community Drive", "Adoption", "Workshop", "Environment", "Medical Camp", "Fundraiser"];

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("en-IN", { day: "2-digit" }),
    month: d.toLocaleDateString("en-IN", { month: "short" }),
    year: d.getFullYear(),
    full: d.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
  };
};

const Events = () => {
  const [filter, setFilter] = useState("All");
  const [registering, setRegistering] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [registered, setRegistered] = useState([]);

  const filtered = filter === "All" ? events : events.filter((e) => e.category === filter);

  const handleRegister = async (e) => {
    e.preventDefault();
    await sendFormSubmissionEmail({
      email: form.email,
      formName: "Event Registration Form",
      name: form.name,
    });
    setRegistered((prev) => [...prev, registering]);
    setRegistering(null);
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <>
      <MainNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-600 py-20 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">Events & Workshops</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Join our community events, adoption drives, and educational workshops. Together we can do more.
        </p>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 py-4 px-6 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ev) => {
            const d = formatDate(ev.date);
            const isRegistered = registered.includes(ev.id);
            const isFull = ev.spotsLeft === 0;
            return (
              <div key={ev.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden flex flex-col">
                {/* Date Banner */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 flex items-center justify-between text-white">
                  <div className="text-5xl">{ev.emoji}</div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold">{d.day}</div>
                    <div className="text-sm">{d.month} {d.year}</div>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${ev.categoryColor}`}>{ev.category}</span>
                    {isFull && <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-600">Full</span>}
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-800 mb-2">{ev.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 flex-1">{ev.description}</p>

                  <div className="space-y-1 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">🕐 <span>{ev.time}</span></div>
                    <div className="flex items-center gap-2">📍 <span>{ev.location}</span></div>
                    <div className="flex items-center gap-2">
                      👥
                      <span>{ev.spotsLeft} of {ev.spots} spots available</span>
                    </div>
                  </div>

                  {/* Spots bar */}
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                    <div
                      className="bg-indigo-500 h-1.5 rounded-full"
                      style={{ width: `${((ev.spots - ev.spotsLeft) / ev.spots) * 100}%` }}
                    />
                  </div>

                  <button
                    onClick={() => !isFull && !isRegistered && setRegistering(ev.id)}
                    disabled={isFull || isRegistered}
                    className={`w-full py-2 rounded-xl font-bold text-sm transition-colors ${
                      isRegistered
                        ? "bg-green-100 text-green-700 cursor-default"
                        : isFull
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white"
                    }`}
                  >
                    {isRegistered ? "✓ Registered" : isFull ? "Event Full" : "Register Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Registration Modal */}
      {registering && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-60 px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-extrabold mb-2 text-gray-800">Register for Event</h3>
            <p className="text-gray-500 text-sm mb-6">{events.find((e) => e.id === registering)?.title}</p>
            <form onSubmit={handleRegister} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400"
              />
              <input
                required
                type="email"
                placeholder="Email Address *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400"
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setRegistering(null)} className="flex-1 border-2 border-gray-300 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold">
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Events;
