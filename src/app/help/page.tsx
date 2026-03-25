'use client';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, ChevronDown, MessageCircle, Phone, Mail, ChevronRight } from 'lucide-react';

const FAQ_CATEGORIES = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    emoji: '🚀',
    questions: [
      { q: 'How do I create an account?', a: 'Download the app or visit haozing.ke, click "Sign Up", enter your details and verify your email. The whole process takes under 2 minutes.' },
      { q: 'Is Haozing available across Kenya?', a: 'Yes! We currently have verified properties in Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Malindi, Diani, Nanyuki, and 10 more cities.' },
      { q: 'Do I need to verify my identity?', a: 'Basic verification (email + phone) is required to book. Full ID verification may be required for certain properties or long stays.' },
    ]
  },
  {
    id: 'booking',
    label: 'Booking & Payments',
    emoji: '📅',
    questions: [
      { q: 'How do I book a property?', a: 'Browse properties, select your dates, choose the number of guests, and click "Reserve Now". Properties with ⚡ Instant Book are confirmed immediately; others require host approval (usually within 2 hours).' },
      { q: 'What payment methods are accepted?', a: 'We accept M-Pesa, Visa, Mastercard, and Airtel Money. M-Pesa is the most popular and fastest option for Kenyan users.' },
      { q: 'When am I charged?', a: "Your payment is processed once a booking is confirmed. For Instant Book, that's immediately. For request-based bookings, it's when the host accepts." },
      { q: 'What is the service fee?', a: 'Haozing charges a 12% service fee on bookings, which covers payment processing, customer support, and platform security.' },
    ]
  },
  {
    id: 'stays',
    label: 'During Your Stay',
    emoji: '🏠',
    questions: [
      { q: 'How do I check in?', a: 'Your access code and check-in instructions will appear in your booking 24 hours before arrival. Find it under My Trips → Your Booking → Check-in.' },
      { q: 'What if something is wrong at the property?', a: 'Contact your host via the app first. If the issue is unresolved, our 24/7 support team can escalate and, if necessary, help you rebook.' },
      { q: 'Can I check in early or late?', a: "Message the host directly to arrange an early or late check-in. It's up to the host's availability." },
    ]
  },
  {
    id: 'cancellations',
    label: 'Cancellations & Refunds',
    emoji: '↩️',
    questions: [
      { q: 'What is the cancellation policy?', a: 'Each property has its own policy (Flexible, Moderate, or Strict). Check the listing before booking. The policy is always shown on the booking confirmation.' },
      { q: 'How do I cancel a booking?', a: 'Go to My Trips → select your booking → "Cancel Booking". Refunds are processed within 5–7 business days to your original payment method.' },
      { q: 'What if the host cancels on me?', a: "If a host cancels, you'll receive a full refund plus a 10% credit towards your next booking as compensation for the inconvenience." },
    ]
  },
  {
    id: 'hosting',
    label: 'Hosting',
    emoji: '🏡',
    questions: [
      { q: 'How do I list my property?', a: 'Sign up as a host, go to Host Dashboard → Add Property, and follow the 4-step process. An inspector will visit within 2–3 business days before your listing goes live.' },
      { q: 'When do I get paid?', a: 'Host payouts are processed 24 hours after guest check-in. Funds arrive via M-Pesa within 1–3 business days.' },
      { q: 'How does the inspection process work?', a: 'An assigned Haozing inspector visits your property to verify amenities, safety standards, and listing accuracy. They complete a standardized checklist and submit a report. Most inspections take 45–90 minutes.' },
    ]
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-stone-200 rounded-2xl overflow-hidden transition-all ${open ? 'bg-stone-50' : 'bg-white hover:border-stone-300'}`}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between gap-4 p-4 text-left">
        <span className={`font-medium text-sm ${open ? 'text-brand-700' : 'text-stone-900'}`}>{q}</span>
        <ChevronDown className={`w-4 h-4 shrink-0 text-stone-400 transition-transform ${open ? 'rotate-180 text-brand-700' : ''}`} />
      </button>
      {open && <div className="px-4 pb-4 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">{a}</div>}
    </div>
  );
}

export default function HelpPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const searchLower = search.toLowerCase();
  const filteredCategories = FAQ_CATEGORIES.map(cat => ({
    ...cat,
    questions: cat.questions.filter(faq =>
      !searchLower || faq.q.toLowerCase().includes(searchLower) || faq.a.toLowerCase().includes(searchLower)
    )
  })).filter(cat =>
    (activeCategory === 'all' || cat.id === activeCategory) && cat.questions.length > 0
  );

  return (
    <div className="min-h-screen bg-surface mobile-bottom-nav-clearance">
      <Navbar />

      {/* Hero */}
      <div className="bg-stone-900 text-white py-16 px-4 text-center">
        <h1 className="font-display text-4xl font-bold mb-3">How can we help you?</h1>
        <p className="text-white/60 mb-6 text-lg">Search our knowledge base or browse by category</p>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl text-stone-900 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => setActiveCategory('all')} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === 'all' ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'}`}>
            All Topics
          </button>
          {FAQ_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat.id ? 'bg-stone-900 text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300'}`}>
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ */}
        <div className="space-y-8 mb-16">
          {filteredCategories.map(cat => (
            <div key={cat.id}>
              <h2 className="font-display text-xl font-semibold text-stone-900 mb-4">{cat.emoji} {cat.label}</h2>
              <div className="space-y-2">
                {cat.questions.map(faq => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
              </div>
            </div>
          ))}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">🤔</p>
              <h3 className="font-display text-xl font-semibold text-stone-900 mb-2">No results found</h3>
              <p className="text-stone-500">Try a different search term, or contact our support team directly.</p>
            </div>
          )}
        </div>

        {/* Contact support */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold mb-2">Still need help?</h2>
          <p className="text-white/70 mb-6">Our support team is available 7 days a week</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: MessageCircle, label: 'Live Chat', desc: 'Avg. 3 min response', href: '#', bg: 'bg-brand-700 hover:bg-brand-800' },
              { icon: Phone, label: '+254 700 HAO-ZING', desc: '8am – 8pm EAT', href: 'tel:+254700', bg: 'bg-white/10 hover:bg-white/20' },
              { icon: Mail, label: 'Email Support', desc: 'support@haozing.ke', href: 'mailto:support@haozing.ke', bg: 'bg-white/10 hover:bg-white/20' },
            ].map(contact => (
              <a key={contact.label} href={contact.href} className={`${contact.bg} rounded-2xl p-5 flex flex-col items-center gap-3 transition-all`}>
                <contact.icon className="w-6 h-6" />
                <div className="text-center">
                  <p className="font-semibold text-sm">{contact.label}</p>
                  <p className="text-white/60 text-xs mt-0.5">{contact.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
