import React, { useState } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";

const galleryItems = [
  { id: 1, emoji: "🐕", title: "Bruno's Recovery", category: "Dogs", desc: "Bruno was rescued from a road accident. After 3 months of care, he's now happy and adopted!" },
  { id: 2, emoji: "🐱", title: "Mia's New Home", category: "Cats", desc: "Little Mia was found abandoned at 2 weeks old. She grew up at our shelter and found a loving family." },
  { id: 3, emoji: "🦜", title: "Polly Returns to Sky", category: "Birds", desc: "Polly had a broken wing when found. Post recovery, she was released back into the wild." },
  { id: 4, emoji: "🐄", title: "Gau Seva Camp", category: "Cows", desc: "Our monthly gau seva camp provides medical care and food for stray cows in the area." },
  { id: 5, emoji: "🐘", title: "Elephant Rescue Mission", category: "Wildlife", desc: "Our team worked with forest officials to rescue an injured elephant calf near Gir." },
  { id: 6, emoji: "🐕‍🦺", title: "Volunteer Dog Walk Day", category: "Dogs", desc: "Every Sunday, our volunteers walk and socialize our shelter dogs preparing them for adoption." },
  { id: 7, emoji: "🐰", title: "Bunny Adoption Drive", category: "Others", desc: "Our quarterly rabbit and small animal adoption drive found homes for 15 bunnies!" },
  { id: 8, emoji: "🦅", title: "Eagle's Flight Restored", category: "Birds", desc: "A golden eagle with a fractured talon was treated and successfully released after 6 weeks." },
  { id: 9, emoji: "🐱", title: "Kitten Medical Camp", category: "Cats", desc: "Free vaccination and deworming camp for stray kittens around Ahmedabad." },
  { id: 10, emoji: "🐕", title: "Senior Dog Sanctuary", category: "Dogs", desc: "Our special wing for senior dogs ensures they live comfortably in their golden years." },
  { id: 11, emoji: "🐦", title: "Bird Feeding Station", category: "Birds", desc: "We installed 50 bird feeding stations across the city to support urban bird populations." },
  { id: 12, emoji: "🐄", title: "Rescued Calf Care", category: "Cows", desc: "A newborn calf separated from its mother was hand-raised by our team and placed in a goshala." },
];

const colorPalettes = [
  "from-orange-400 to-orange-600",
  "from-purple-400 to-purple-600",
  "from-blue-400 to-blue-600",
  "from-green-400 to-green-600",
  "from-pink-400 to-pink-600",
  "from-yellow-400 to-yellow-600",
  "from-red-400 to-red-600",
  "from-teal-400 to-teal-600",
  "from-indigo-400 to-indigo-600",
  "from-cyan-400 to-cyan-600",
  "from-emerald-400 to-emerald-600",
  "from-rose-400 to-rose-600",
];

const categories = ["All", "Dogs", "Cats", "Birds", "Cows", "Wildlife", "Others"];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = filter === "All" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  return (
    <>
      <MainNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-500 to-rose-500 py-20 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">Our Gallery</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          A glimpse into the lives we've touched. Every story is a testament to compassion and care.
        </p>
      </section>

      {/* Category Filters */}
      <section className="bg-white border-b border-gray-200 py-4 px-6 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                onClick={() => setSelected(item)}
                className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform shadow-md hover:shadow-xl"
              >
                <div className={`bg-gradient-to-br ${colorPalettes[i % colorPalettes.length]} flex items-center justify-center ${i % 3 === 0 ? 'h-48' : i % 3 === 1 ? 'h-64' : 'h-56'}`}>
                  <span className="text-8xl drop-shadow-lg">{item.emoji}</span>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{item.category}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-80 px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-gradient-to-br ${colorPalettes[galleryItems.findIndex(g => g.id === selected.id) % colorPalettes.length]} h-64 flex items-center justify-center`}>
              <span className="text-9xl">{selected.emoji}</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-extrabold text-gray-800">{selected.title}</h3>
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">{selected.category}</span>
              </div>
              <p className="text-gray-600">{selected.desc}</p>
              <button
                onClick={() => setSelected(null)}
                className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload CTA */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-3">Have a Story to Share?</h2>
        <p className="text-gray-600 mb-6">If you adopted from us or witnessed our work, share your story with the community!</p>
        <button className="bg-pink-500 hover:bg-pink-400 text-white font-bold px-8 py-3 rounded-full text-lg transition-colors">
          📸 Submit Your Story
        </button>
      </section>

      <Footer />
    </>
  );
};

export default Gallery;
