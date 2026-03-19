import React, { useState } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import { sendFormSubmissionEmail } from "../../utils/sendFormSubmissionEmail";

const animalTypes = ["Dog", "Cat", "Bird", "Cow / Ox", "Wild Animal", "Other"];
const injuryTypes = ["Road Accident", "Illness / Disease", "Abuse / Cruelty", "Trapped / Stuck", "Abandoned Newborn", "Other"];
const urgencyLevels = [
  { value: "critical", label: "🔴 Critical – Life Threatening", color: "border-red-500 bg-red-50" },
  { value: "urgent", label: "🟠 Urgent – Needs Immediate Help", color: "border-orange-400 bg-orange-50" },
  { value: "moderate", label: "🟡 Moderate – Can Wait a Few Hours", color: "border-yellow-400 bg-yellow-50" },
];

const firstAidTips = [
  { icon: "🚗", tip: "Do NOT move the animal unless it is in immediate danger (e.g., middle of road)" },
  { icon: "🧤", tip: "Wear gloves if available before touching an injured animal" },
  { icon: "🌡️", tip: "Keep the animal warm using a cloth or jacket" },
  { icon: "💧", tip: "Offer water but do NOT force-feed or medicate the animal" },
  { icon: "📍", tip: "Note the exact location — landmark, road name, or pin drop" },
  { icon: "📸", tip: "Take a photo or video to help our team assess injury before arrival" },
];

const RescueReport = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    animalType: "",
    injuryType: "",
    urgency: "",
    location: "",
    description: "",
    reporterName: "",
    reporterPhone: "",
    reporterEmail: "",
    canStay: "",
  });
  const [submitted, setSubmitted] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  await sendFormSubmissionEmail({
    name: form.reporterName,
    email: form.reporterEmail,
    phone: form.reporterPhone,
    city: form.location,
  });

  setSubmitted(true);
};

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  if (submitted) {
    const reportId = "SHA-RES-" + Date.now().toString().slice(-6);
    return (
      <>
        <MainNavbar />
        <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
          <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-lg w-full">
            <div className="text-6xl mb-4">🚑</div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Report Received!</h2>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <div className="text-lg font-extrabold text-red-600 mb-1">Report ID: {reportId}</div>
              <p className="text-gray-700 text-sm">Our rescue team has been notified. Expected response time: <strong>30–60 minutes</strong>.</p>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              We will call you at <strong>{form.reporterPhone}</strong> to coordinate the rescue. Please stay near the animal if safe to do so.
            </p>
            <div className="bg-yellow-50 rounded-xl p-4 mb-6 text-left text-sm">
              <div className="font-bold text-gray-800 mb-2">While you wait:</div>
              <ul className="space-y-1 text-gray-600">
                <li>• Keep the animal calm and away from traffic</li>
                <li>• Do not attempt to treat injuries yourself</li>
                <li>• Offer water if the animal is conscious</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <a href="tel:+919876543210" className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl text-sm">
                📞 Call Helpline
              </a>
              <button onClick={() => { setSubmitted(false); setStep(1); setForm({animalType:"",injuryType:"",urgency:"",location:"",description:"",reporterName:"",reporterPhone:"",reporterEmail:"",canStay:""}); }}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl text-sm">
                Report Another
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
      <section className="bg-gradient-to-br from-red-600 to-orange-600 py-16 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">🚨 Report Animal Rescue</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-6">
          Found an injured or distressed animal? Report it immediately — our team is available 24/7.
        </p>
        <a
          href="tel:+919876543210"
          className="inline-block bg-white text-red-600 font-extrabold px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition-colors"
        >
          📞 Emergency Helpline: +91 98765 43210
        </a>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Multi-step Form */}
        <div className="lg:col-span-2">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-8">
            {["Animal Details", "Location & Description", "Your Contact"].map((label, i) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span className="text-xs text-gray-500 mt-1 hidden sm:block">{label}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-1 rounded ${step > i + 1 ? 'bg-green-400' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            {/* Step 1: Animal Details */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="text-xl font-extrabold text-gray-800">Step 1: Animal Details</h3>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Type of Animal *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {animalTypes.map(a => (
                      <button type="button" key={a} onClick={() => setForm({...form, animalType: a})}
                        className={`border-2 rounded-xl py-2 text-sm font-medium transition-colors ${form.animalType === a ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 hover:border-gray-300'}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nature of Injury / Problem *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {injuryTypes.map(t => (
                      <button type="button" key={t} onClick={() => setForm({...form, injuryType: t})}
                        className={`border-2 rounded-xl py-2 px-3 text-sm font-medium text-left transition-colors ${form.injuryType === t ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 hover:border-gray-300'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Urgency Level *</label>
                  <div className="space-y-2">
                    {urgencyLevels.map(u => (
                      <button type="button" key={u.value} onClick={() => setForm({...form, urgency: u.value})}
                        className={`w-full border-2 rounded-xl py-3 px-4 text-sm font-medium text-left transition-colors ${form.urgency === u.value ? u.color + ' border-opacity-100' : 'border-gray-200 hover:border-gray-300'}`}>
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="button" onClick={nextStep}
                  disabled={!form.animalType || !form.injuryType || !form.urgency}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl transition-colors">
                  Continue →
                </button>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-5">
                <h3 className="text-xl font-extrabold text-gray-800">Step 2: Location & Description</h3>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Exact Location *</label>
                  <input required type="text" value={form.location} onChange={e => setForm({...form, location: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400"
                    placeholder="Street name, landmark, area, city..." />
                  <p className="text-xs text-gray-500 mt-1">Be as specific as possible for faster response</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description *</label>
                  <textarea required rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400 resize-none"
                    placeholder="Describe the animal's condition, injuries, and situation in detail..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Can you stay near the animal until rescue arrives?</label>
                  <div className="flex gap-3">
                    {["Yes, I can stay", "No, I need to leave", "Partially (30 min)"].map(o => (
                      <button type="button" key={o} onClick={() => setForm({...form, canStay: o})}
                        className={`flex-1 border-2 rounded-xl py-2 text-xs font-medium transition-colors ${form.canStay === o ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={prevStep} className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50">← Back</button>
                  <button type="button" onClick={nextStep} disabled={!form.location || !form.description}
                    className="flex-1 bg-red-600 hover:bg-red-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl transition-colors">
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <div className="space-y-5">
                <h3 className="text-xl font-extrabold text-gray-800">Step 3: Your Contact Details</h3>
                <p className="text-sm text-gray-500">We need your contact to coordinate the rescue. Your details are kept private.</p>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Your Name *</label>
                  <input required type="text" value={form.reporterName} onChange={e => setForm({...form, reporterName: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input required type="tel" value={form.reporterPhone} onChange={e => setForm({...form, reporterPhone: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email (for updates)</label>
                  <input type="email" value={form.reporterEmail} onChange={e => setForm({...form, reporterEmail: e.target.value})}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-red-400" placeholder="your@email.com" />
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-sm text-red-800">
                  <strong>Summary:</strong> {form.urgency === "critical" ? "🔴 Critical" : form.urgency === "urgent" ? "🟠 Urgent" : "🟡 Moderate"} — {form.animalType} | {form.injuryType}<br />
                  <strong>Location:</strong> {form.location}
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={prevStep} className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50">← Back</button>
                  <button type="submit" className="flex-1 bg-red-600 hover:bg-red-500 text-white font-extrabold py-3 rounded-xl transition-colors">
                    🚨 Submit Rescue Report
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Sidebar: First Aid Tips */}
        <div>
          <div className="bg-yellow-50 rounded-2xl border border-yellow-200 p-6 sticky top-24">
            <h3 className="text-lg font-extrabold text-gray-800 mb-4">🩹 First Aid Tips</h3>
            <p className="text-sm text-gray-600 mb-4">While waiting for our team:</p>
            <div className="space-y-3">
              {firstAidTips.map((t, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl">{t.icon}</span>
                  <p className="text-sm text-gray-700">{t.tip}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-red-600 rounded-xl p-4 text-white text-center">
              <div className="font-extrabold text-lg">24/7 Helpline</div>
              <a href="tel:+919876543210" className="text-2xl font-extrabold">+91 98765 43210</a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RescueReport;
