'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, MapPin, Wifi, Users, Shield } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    rating: number;
    reviewCount: number;
    images: string[];
    amenities: string[];
    verified: boolean;
    instantBook: boolean;
    beds: number;
    guests: number;
    type: string;
    tag?: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [liked, setLiked] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  const tagColors: Record<string, string> = {
    trending: 'badge-orange',
    tonight: 'badge-blue',
    budget: 'badge-green',
    luxury: 'badge-amber',
  };

  return (
    <Link href={`/property/${property.id}`} className="group block">
      <div className="relative rounded-2xl overflow-hidden bg-stone-100 aspect-[4/3] mb-3">
        {/* Image */}
        <img
          src={`${property.images[imgIdx]}&auto=format&fit=crop`}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'; }}
        />

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Like button */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-stone-600'}`} />
        </button>

        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          {property.verified && (
            <span className="flex items-center gap-1 text-xs font-semibold bg-emerald-500 text-white px-2 py-1 rounded-full shadow-sm">
              <Shield className="w-3 h-3" /> Verified
            </span>
          )}
          {property.tag && (
            <span className={`text-xs font-semibold px-2 py-1 rounded-full shadow-sm ${
              property.tag === 'trending' ? 'bg-orange-500 text-white' :
              property.tag === 'tonight' ? 'bg-blue-600 text-white' :
              property.tag === 'budget' ? 'bg-emerald-500 text-white' :
              'bg-amber-500 text-white'
            }`}>
              {property.tag === 'tonight' ? '🌙 Tonight Deal' :
               property.tag === 'trending' ? '🔥 Trending' :
               property.tag === 'budget' ? '💚 Budget Pick' : '✨ Luxury'}
            </span>
          )}
        </div>

        {/* Image dots */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {property.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setImgIdx(i); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? 'bg-white w-3' : 'bg-white/60'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-1 group-hover:text-brand-700 transition-colors">{property.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3.5 h-3.5 fill-secondary-500 text-secondary-500" />
            <span className="text-xs font-semibold text-stone-900">{property.rating}</span>
            <span className="text-xs text-stone-400">({property.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-stone-500 mb-1.5">
          <MapPin className="w-3 h-3" />
          <span>{property.location}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
          <span>{property.beds} bed{property.beds !== 1 ? 's' : ''}</span>
          <span>·</span>
          <span><Users className="w-3 h-3 inline mr-0.5" />{property.guests} guests</span>
          {property.amenities.includes('WiFi') && (
            <>
              <span>·</span>
              <span><Wifi className="w-3 h-3 inline mr-0.5" />WiFi</span>
            </>
          )}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="font-bold text-stone-900">KSh {property.price.toLocaleString()}</span>
          <span className="text-xs text-stone-500">/ night</span>
          {property.instantBook && (
            <span className="ml-auto text-xs font-medium text-ocean-700 bg-ocean-50 px-2 py-0.5 rounded-full">⚡ Instant</span>
          )}
        </div>
      </div>
    </Link>
  );
}
