import Link from 'next/link';
import { Home, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-700 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">Haozing</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed mb-4">
              Kenya's premier curated short-term stay platform. Verified properties, real experiences.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-stone-800 rounded-lg flex items-center justify-center hover:bg-brand-700 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">For Guests</h4>
            <ul className="space-y-2 text-sm">
              {['Discover Stays', 'Search Properties', 'How It Works', 'Trust & Safety', 'My Trips'].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">For Hosts</h4>
            <ul className="space-y-2 text-sm">
              {['Become a Host', 'Host Dashboard', 'Pricing Tools', 'Property Management', 'Host Support'].map(l => (
                <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'About Haozing', href: '/about' },
                { label: 'Help Center', href: '/help' },
                { label: 'Contact Us', href: '/help' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Privacy Policy', href: '#' },
              ].map(l => (
                <li key={l.label}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>&#169; 2026 Haozing Kenya Ltd. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="bg-stone-800 px-3 py-1 rounded-full">&#x1F1F0;&#x1F1EA; Kenya</span>
            <span className="bg-stone-800 px-3 py-1 rounded-full">KES • English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
