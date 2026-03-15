import React, { useState } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import { sendFormSubmissionEmail } from "../../utils/sendFormSubmissionEmail";

const animals = [
  { id: 1, name: "Bruno", species: "Dog", breed: "Indian Pariah", age: "3 years", gender: "Male", emoji: "🐕", status: "Available", color: "from-orange-400 to-red-500", story: "Rescued from a road accident. Loves long walks and belly rubs. Friendly with kids.", tags: ["Vaccinated", "Neutered", "House-trained"] },
  { id: 2, name: "Luna", species: "Cat", breed: "Domestic Shorthair", age: "2 years", gender: "Female", emoji: "🐱", status: "Available", color: "from-purple-400 to-pink-500", story: "Found abandoned as a kitten. She loves cuddles and sunny spots by the window.", tags: ["Vaccinated", "Spayed", "Indoor"] },
  { id: 3, name: "Charlie", species: "Dog", breed: "Labrador Mix", age: "1.5 years", gender: "Male", emoji: "🐶", status: "Available", color: "from-amber-400 to-yellow-500", story: "Charlie is an energetic, playful dog who gets along well with other pets.", tags: ["Vaccinated", "Neutered", "Friendly"] },
  { id: 4, name: "Mittens", species: "Cat", breed: "Tabby", age: "4 years", gender: "Female", emoji: "🐈", status: "On Hold", color: "from-gray-400 to-gray-600", story: "Mittens is a quiet, gentle cat perfect for apartment living.", tags: ["Vaccinated", "Spayed", "Senior-friendly"] },
  { id: 5, name: "Rusty", species: "Dog", breed: "Golden Mix", age: "5 years", gender: "Male", emoji: "🦮", status: "Available", color: "from-yellow-500 to-orange-400", story: "Rusty is a senior dog with a heart of gold. Looking for a patient, loving home.", tags: ["Vaccinated", "Neutered", "Senior"] },
  { id: 6, name: "Coco", species: "Rabbit", breed: "Dutch Bunny", age: "1 year", gender: "Female", emoji: "🐰", status: "Available", color: "from-pink-400 to-rose-500", story: "Coco is a curious, lively bunny who loves fresh veggies and exploring.", tags: ["Vaccinated", "Spayed", "Small pet"] },
  { id: 7, name: "Max", species: "Dog", breed: "German Shepherd Mix", age: "2 years", gender: "Male", emoji: "🐕‍🦺", status: "Available", color: "from-blue-500 to-indigo-600", story: "Max is intelligent and loyal. He was found as a stray but has been fully trained.", tags: ["Vaccinated", "Neutered", "Trained"] },
  { id: 8, name: "Whiskers", species: "Cat", breed: "Persian Mix", age: "3 years", gender: "Male", emoji: "😺", status: "Available", color: "from-teal-400 to-cyan-500", story: "A regal, calm cat who prefers quiet homes. Loves being groomed.", tags: ["Vaccinated", "Neutered", "Calm"] },
];

const speciesFilter = ["All", "Dog", "Cat", "Rabbit"];
const genderFilter = ["All", "Male", "Female"];

const processSteps = [
  { step: "1", icon: "🔍", title: "Browse & Choose", desc: "Explore our available animals and find the one that matches your lifestyle." },
  { step: "2", icon: "📝", title: "Apply Online", desc: "Fill out our adoption application form with details about your home and family." },
  { step: "3", icon: "🏠", title: "Home Check", desc: "Our team does a brief home visit to ensure a suitable environment." },
  { step: "4", icon: "🤝", title: "Meet & Greet", desc: "Meet your potential new family member at our shelter." },
  { step: "5", icon: "📋", title: "Paperwork", desc: "Complete adoption agreement and pay a nominal adoption fee." },
  { step: "6", icon: "🏡", title: "Welcome Home!", desc: "Bring your new furry family member home!" },
];

const Adopt = () => {
  const [species, setSpecies] = useState("All");
  const [gender, setGender] = useState("All");
  const [applying, setApplying] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", experience: "", reason: "" });
  const [submitted, setSubmitted] = useState(false);

  const filtered = animals.filter(a =>
    (species === "All" || a.species === species) &&
    (gender === "All" || a.gender === gender)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendFormSubmissionEmail({
      email: form.email,
      formName: "Adoption Form",
      name: form.name,
    });
    setSubmitted(true);
  };

  if (submitted) {
    const animal = animals.find(a => a.id === applying);
    return (
      <>
        <MainNavbar />
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
          <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md w-full">
            <div className="text-7xl mb-4">{animal?.emoji}</div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Application Submitted!</h2>
            <p className="text-gray-600 mb-4">
              Your adoption application for <strong>{animal?.name}</strong> has been received. Our team will contact you within 48 hours.
            </p>
            <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-700 mb-6">
              <strong>Application ID:</strong> SHA-ADOPT-{Date.now().toString().slice(-6)}<br />
              <strong>Animal:</strong> {animal?.name} ({animal?.species})<br />
              <strong>Contact:</strong> {form.email}
            </div>
            <button onClick={() => { setSubmitted(false); setApplying(null); setForm({name:"",email:"",phone:"",address:"",experience:"",reason:""}); }}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3 rounded-full transition-colors">
              Browse More Animals
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
      <section className="bg-gradient-to-br from-blue-600 to-indigo-600 py-20 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">Adopt, Don't Shop 🐾</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Give a rescued animal a forever home. Every adoption saves a life and makes room for us to help another animal in need.
        </p>
        <div className="flex justify-center gap-8 mt-8 text-center">
          {[["1200+", "Successful Adoptions"], ["98%", "Happy Adopters"], ["Free", "Adoption Support"]].map(([n, l]) => (
            <div key={l} className="bg-white bg-opacity-20 rounded-xl px-6 py-3">
              <div className="text-2xl font-extrabold">{n}</div>
              <div className="text-xs opacity-80">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">How Adoption Works</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-extrabold text-lg mx-auto mb-2">{s.step}</div>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-bold text-gray-800 text-sm mb-1">{s.title}</div>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 py-4 px-6 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-center items-center">
          <div className="flex gap-2">
            <span className="text-sm font-bold text-gray-600">Species:</span>
            {speciesFilter.map(f => (
              <button key={f} onClick={() => setSpecies(f)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${species === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <span className="text-sm font-bold text-gray-600">Gender:</span>
            {genderFilter.map(f => (
              <button key={f} onClick={() => setGender(f)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${gender === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Animals Grid */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(animal => (
            <div key={animal.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden group">
              <div className={`bg-gradient-to-br ${animal.color} h-44 flex items-center justify-center relative`}>
                <span className="text-8xl group-hover:scale-110 transition-transform">{animal.emoji}</span>
                <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${animal.status === 'Available' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                  {animal.status}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-extrabold text-gray-800 text-xl">{animal.name}</h3>
                  <span className="text-sm text-gray-500">{animal.gender}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{animal.breed} • {animal.age}</p>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{animal.story}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {animal.tags.map(tag => (
                    <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
                <button
                  onClick={() => animal.status === "Available" && setApplying(animal.id)}
                  disabled={animal.status !== "Available"}
                  className={`w-full py-2 rounded-xl font-bold text-sm transition-colors ${animal.status === "Available" ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                >
                  {animal.status === "Available" ? "Adopt Me 🐾" : "On Hold"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Adoption Application Modal */}
      {applying && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-60 px-4 overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg my-auto">
            <h3 className="text-2xl font-extrabold mb-1 text-gray-800">Adoption Application</h3>
            <p className="text-gray-500 text-sm mb-6">For: <strong>{animals.find(a => a.id === applying)?.name}</strong> the {animals.find(a => a.id === applying)?.species}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Full Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400" />
              <input required type="email" placeholder="Email Address *" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400" />
              <input required type="tel" placeholder="Phone Number *" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400" />
              <input required type="text" placeholder="Home Address *" value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400" />
              <textarea rows={2} placeholder="Prior experience with pets (if any)" value={form.experience} onChange={e => setForm({...form, experience: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 resize-none" />
              <textarea required rows={3} placeholder="Why do you want to adopt this animal? *" value={form.reason} onChange={e => setForm({...form, reason: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-400 resize-none" />
              <div className="flex gap-3">
                <button type="button" onClick={() => setApplying(null)} className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-colors">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Adopt;
