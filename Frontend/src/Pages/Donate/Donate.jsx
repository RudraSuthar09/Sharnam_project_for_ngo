import React, { useState } from "react";
import MainNavbar from "../../components/MainNavbar";
import Footer from "../../components/Footer";
import { sendFormSubmissionEmail } from "../../utils/sendFormSubmissionEmail";

const donationTiers = [
  { amount: 100, label: "Supporter", icon: "🌱", perks: "Feed one animal for a day", color: "border-green-400 bg-green-50" },
  { amount: 500, label: "Caregiver", icon: "💊", perks: "Cover basic medical checkup for one animal", color: "border-blue-400 bg-blue-50" },
  { amount: 1000, label: "Rescuer", icon: "🚑", perks: "Fund one emergency rescue operation", color: "border-orange-400 bg-orange-50", popular: true },
  { amount: 2500, label: "Guardian", icon: "🏥", perks: "Sponsor one week of shelter care", color: "border-purple-400 bg-purple-50" },
  { amount: 5000, label: "Champion", icon: "🏆", perks: "Fund one full surgery or treatment", color: "border-yellow-400 bg-yellow-50" },
  { amount: 10000, label: "Patron", icon: "👑", perks: "Sponsor an animal's complete rehabilitation", color: "border-red-400 bg-red-50" },
];

const impactData = [
  { amount: "₹100", impact: "Feeds 5 stray dogs for a day" },
  { amount: "₹500", impact: "Provides vaccines for 2 animals" },
  { amount: "₹1,000", impact: "Covers emergency rescue costs" },
  { amount: "₹5,000", impact: "Funds a full medical treatment" },
];

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [recurring, setRecurring] = useState(false);

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendFormSubmissionEmail({
      email,
      formName: "Donation Form",
      name: donorName,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <MainNavbar />
        <div className="min-h-screen flex items-center justify-center bg-yellow-50">
          <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md mx-4">
            <div className="text-7xl mb-4">💛</div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Thank You, {donorName || "Kind Soul"}!</h2>
            <p className="text-gray-600 mb-6">
              Your donation of ₹{finalAmount.toLocaleString()} will directly help animals in need. We've sent a receipt to {email || "your email"}.
            </p>
            <div className="bg-yellow-50 rounded-xl p-4 text-sm text-gray-700 mb-6">
              <strong>Donation ID:</strong> SHA-{Date.now().toString().slice(-8)}<br />
              <strong>Amount:</strong> ₹{finalAmount.toLocaleString()}<br />
              <strong>Type:</strong> {recurring ? "Monthly Recurring" : "One-Time"}
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-3 rounded-full transition-colors"
            >
              Donate Again
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
      <section className="bg-gradient-to-br from-yellow-500 to-orange-500 py-20 px-6 text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4">Make a Difference Today</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Your donation directly saves lives. Every rupee goes towards rescuing, treating, and rehoming animals in need.
        </p>
      </section>

      {/* Impact Stats */}
      <section className="bg-gray-900 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
          {impactData.map((d) => (
            <div key={d.amount} className="bg-gray-800 rounded-xl p-4">
              <div className="text-yellow-400 text-2xl font-extrabold">{d.amount}</div>
              <div className="text-gray-300 text-sm mt-1">{d.impact}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: Donation Tiers */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Choose Your Impact</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {donationTiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => { setSelectedAmount(tier.amount); setCustomAmount(""); }}
                  className={`relative rounded-2xl border-2 p-4 text-left transition-all hover:scale-105 ${
                    selectedAmount === tier.amount && !customAmount ? "scale-105 shadow-lg " + tier.color : "bg-white border-gray-200"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                  <div className="text-2xl mb-2">{tier.icon}</div>
                  <div className="font-extrabold text-gray-800 text-xl">₹{tier.amount.toLocaleString()}</div>
                  <div className="text-xs font-bold text-gray-600 mt-1">{tier.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{tier.perks}</div>
                </button>
              ))}
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">Or enter a custom amount (₹)</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                placeholder="Enter amount..."
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-yellow-400"
              />
            </div>
            {/* Recurring toggle */}
            <div className="flex items-center gap-3 mb-6 bg-white rounded-xl p-4 border border-gray-200">
              <button
                onClick={() => setRecurring(!recurring)}
                className={`relative w-12 h-6 rounded-full transition-colors ${recurring ? 'bg-yellow-400' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${recurring ? 'translate-x-6' : ''}`} />
              </button>
              <div>
                <div className="font-bold text-gray-800 text-sm">Make it monthly</div>
                <div className="text-xs text-gray-500">Set up a recurring donation to provide consistent support</div>
              </div>
            </div>
          </div>

          {/* Right: Donor Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Your Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Message (Optional)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400 resize-none"
                  placeholder="Any message for us?"
                />
              </div>

              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-1">
                  <span>Donation Amount</span>
                  <span className="text-yellow-600">₹{finalAmount ? finalAmount.toLocaleString() : 0}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Type</span>
                  <span>{recurring ? "Monthly Recurring" : "One-Time"}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold py-4 rounded-xl text-lg transition-colors"
              >
                💛 Donate ₹{finalAmount ? finalAmount.toLocaleString() : 0} {recurring ? "/ month" : ""}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 mb-3">🔒 Secure payment | 80G Tax Exemption Available</p>
              <div className="flex justify-center gap-4 text-gray-400 text-xs">
                <span>UPI</span><span>•</span><span>Net Banking</span><span>•</span><span>Credit Card</span><span>•</span><span>Debit Card</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Details */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">Direct Bank Transfer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-4">Bank Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between"><span className="font-medium">Account Name:</span><span>Sharanam NGO</span></div>
                <div className="flex justify-between"><span className="font-medium">Account No:</span><span>1234 5678 9012</span></div>
                <div className="flex justify-between"><span className="font-medium">IFSC Code:</span><span>SBIN0001234</span></div>
                <div className="flex justify-between"><span className="font-medium">Bank:</span><span>State Bank of India</span></div>
                <div className="flex justify-between"><span className="font-medium">Branch:</span><span>Ahmedabad Main</span></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-700 mb-4">UPI</h3>
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm mb-3">
                  QR Code
                </div>
                <p className="font-bold text-gray-800">sharanam@upi</p>
                <p className="text-xs text-gray-500 mt-1">Scan or use UPI ID</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Donate;
