import React, { useState } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";

const stories = [
  {
    id: 1,
    title: "Bruno's Second Chance at Life",
    animal: "Dog",
    emoji: "🐕",
    category: "Rescue",
    date: "February 2026",
    readTime: "3 min read",
    excerpt: "Bruno was found on a busy highway with three broken legs after being hit by a truck. Our team rushed to the scene within 20 minutes...",
    content: `Bruno was found on a busy highway with three broken legs after being hit by a truck. Our team rushed to the scene within 20 minutes of receiving the call. The surgery lasted 6 hours, and his recovery spanned 3 months.

Today, Bruno is the most playful resident of our shelter, wagging his tail at every visitor. He was adopted by the Sharma family in December and now sleeps on their couch every night.

His story is a reminder that every life is worth saving — no matter the odds.`,
    tags: ["Road Accident", "Surgery", "Adopted"],
    bgColor: "from-orange-400 to-red-500",
  },
  {
    id: 2,
    title: "Polly's Journey Back to the Sky",
    animal: "Bird",
    emoji: "🦜",
    category: "Rehabilitation",
    date: "January 2026",
    readTime: "2 min read",
    excerpt: "A stunning green parrot was found grounded near a construction site with a shattered wing. Volunteers from our bird rescue unit responded...",
    content: `A stunning green parrot was found grounded near a construction site with a shattered wing. Volunteers from our bird rescue unit responded immediately, carefully transporting Polly to our avian care ward.

Our vet Dr. Riya Patel performed microsurgery on the fractured wing bone. Polly spent 8 weeks in rehabilitation, learning to fly again in our flight cage.

On a crisp January morning, we took Polly to Sanjay Gandhi National Park and released her. She circled the release point twice before disappearing into the canopy — as if saying goodbye.`,
    tags: ["Bird Rescue", "Surgery", "Released"],
    bgColor: "from-blue-400 to-purple-500",
  },
  {
    id: 3,
    title: "Mia and Her 7 Kittens",
    animal: "Cat",
    emoji: "🐱",
    category: "Foster",
    date: "December 2025",
    readTime: "4 min read",
    excerpt: "A malnourished cat was brought to us 2 days before she gave birth. Mia delivered 7 healthy kittens in our care unit...",
    content: `A malnourished cat was brought to us 2 days before she gave birth. Found near a garbage dump, Mia weighed barely 2 kg. Our team immediately put her on a nutritional recovery plan.

Two days later, Mia delivered 7 healthy kittens in our care unit! Our staff took turns doing night vigils for the first two weeks.

Mia and all 7 kittens were eventually adopted — 3 kittens went to one family, 2 to another, and Mia herself found a home with a retired school teacher who calls her "the best thing that ever happened."`,
    tags: ["Mother Cat", "Kittens", "All Adopted"],
    bgColor: "from-pink-400 to-rose-500",
  },
  {
    id: 4,
    title: "Gaju the Elephant Calf Returns Home",
    animal: "Elephant",
    emoji: "🐘",
    category: "Wildlife",
    date: "November 2025",
    readTime: "5 min read",
    excerpt: "A young elephant calf was found separated from its herd near Sasan Gir. Working with Forest Department officials, we...",
    content: `A young elephant calf was found separated from its herd near Sasan Gir. Working with Gujarat Forest Department officials, our wildlife team assessed the calf — named Gaju by our volunteers.

Gaju had a deep wound on his right foot, likely from a trap. Our team provided emergency care while coordinating with the forest authorities for a safe reunion.

After 10 days of treatment and careful monitoring, Gaju was successfully reunited with his herd in a forest corridor. Forest cameras captured the touching moment his mother welcomed him back.`,
    tags: ["Wildlife", "Forest Dept", "Reunited"],
    bgColor: "from-gray-500 to-gray-700",
  },
  {
    id: 5,
    title: "From Street to Sofa — Rocky's Story",
    animal: "Dog",
    emoji: "🐶",
    category: "Adoption",
    date: "October 2025",
    readTime: "3 min read",
    excerpt: "Rocky spent 2 years on the streets before a volunteer noticed his infected eye. After treatment, Rocky transformed from a scared street dog...",
    content: `Rocky spent 2 years on the streets before a volunteer noticed his infected eye. After treatment that saved his vision, Rocky transformed from a scared street dog to a confident, lovable companion.

Rocky was the hardest dog to socialize — he would growl at everyone for the first two weeks. Our behavioral therapist worked with him daily using positive reinforcement techniques.

Today, Rocky lives with a young software engineer named Arjun in Pune. In Arjun's words: "Rocky is my best friend, my gym buddy, and my therapist all in one."`,
    tags: ["Stray Dog", "Eye Treatment", "Behavioral", "Adopted"],
    bgColor: "from-amber-400 to-orange-500",
  },
  {
    id: 6,
    title: "The Cow That Taught a Village About Compassion",
    animal: "Cow",
    emoji: "🐄",
    category: "Community",
    date: "September 2025",
    readTime: "4 min read",
    excerpt: "A cow with a severely broken leg was abandoned on a village road. What happened next is a story of community, compassion...",
    content: `A cow with a severely broken leg was abandoned on a village road near Anand. Our team responded to a call from a young girl named Kavya, just 10 years old, who had stayed beside the injured cow for hours.

The surgery was complex — a steel pin insertion to stabilize the fracture. The cow, whom Kavya named "Nandini," spent 4 months in recovery at our sanctuary.

The story went viral on social media, inspiring 40 villagers to join our volunteer program. Nandini now lives permanently at our goshala and Kavya visits every weekend.`,
    tags: ["Cow", "Surgery", "Community", "Viral Story"],
    bgColor: "from-green-400 to-teal-500",
  },
];

const categories = ["All", "Rescue", "Rehabilitation", "Foster", "Wildlife", "Adoption", "Community"];

const Stories = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = filter === "All" ? stories : stories.filter(s => s.category === filter);

  if (selected) {
    return (
      <>
        <MainNavbar />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-2 font-medium">
            ← Back to Stories
          </button>
          <div className={`bg-gradient-to-br ${selected.bgColor} rounded-3xl p-12 text-center text-white mb-8`}>
            <div className="text-8xl mb-4">{selected.emoji}</div>
            <span className="bg-white bg-opacity-20 text-white text-sm font-bold px-4 py-1 rounded-full mb-4 inline-block">{selected.category}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-3">{selected.title}</h1>
            <div className="flex justify-center gap-4 mt-4 text-sm opacity-80">
              <span>📅 {selected.date}</span>
              <span>⏱️ {selected.readTime}</span>
            </div>
          </div>
          <div className="prose max-w-none">
            {selected.content.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-700 text-lg leading-relaxed mb-4">{para}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {selected.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full font-medium">#{tag}</span>
            ))}
          </div>
          <div className="mt-10 bg-yellow-50 rounded-2xl p-6 text-center border border-yellow-200">
            <p className="text-gray-800 font-bold text-lg mb-3">Moved by this story?</p>
            <p className="text-gray-600 mb-4">Your support helps us create more stories like this one.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setSelected(null)} className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-2 rounded-full transition-colors">
                💛 Donate Now
              </button>
              <button onClick={() => setSelected(null)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-6 py-2 rounded-full transition-colors">
                🤝 Volunteer
              </button>
            </div>
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
      <section className="bg-gradient-to-br from-amber-500 to-orange-600 py-20 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">Success Stories</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Every animal we've rescued has a story. These are the stories that remind us why we do what we do.
        </p>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 py-4 px-6 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === cat ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(story => (
            <div key={story.id} onClick={() => setSelected(story)}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer overflow-hidden group border border-gray-100 hover:scale-[1.02]">
              <div className={`bg-gradient-to-br ${story.bgColor} h-48 flex items-center justify-center`}>
                <span className="text-8xl group-hover:scale-110 transition-transform">{story.emoji}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">{story.category}</span>
                  <span className="text-xs text-gray-400">{story.readTime}</span>
                </div>
                <h3 className="text-lg font-extrabold text-gray-800 mb-2">{story.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{story.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {story.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>
                  <span className="text-amber-500 text-sm font-bold group-hover:underline">Read More →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 bg-amber-500 text-center text-white">
        <h2 className="text-3xl font-extrabold mb-3">Be Part of the Next Story</h2>
        <p className="text-lg opacity-90 mb-6">Your support — through donations, volunteering, or adoption — creates these stories every day.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button className="bg-white text-amber-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
            💛 Donate Now
          </button>
          <button className="border-2 border-white text-white font-bold px-8 py-3 rounded-full hover:bg-white hover:text-amber-600 transition-colors">
            🐾 Adopt an Animal
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Stories;
