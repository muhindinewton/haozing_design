import { PROPERTIES } from './fixtures';

type Property = (typeof PROPERTIES)[number];

const propertyMap = new Map(PROPERTIES.map((property) => [property.id, property]));

function getProperty(id: string): Property {
  const property = propertyMap.get(id);
  if (!property) {
    throw new Error(`Missing property for discover feed: ${id}`);
  }

  return property;
}

function toPropertySnapshot(property: Property) {
  return {
    id: property.id,
    title: property.title,
    location: property.location,
    price: property.price,
    verified: property.verified,
    instantBook: property.instantBook,
    amenities: property.amenities,
    wifiSpeed: property.wifiSpeed,
    electricity: property.electricity,
    water: property.water,
    safetyScore: property.safetyScore,
    hostName: property.hostName,
    hostAvatar: property.hostAvatar,
    images: property.images,
    description: property.description,
  };
}

export type DiscoverFeedMedia = {
  id: string;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
  duration?: string;
};

export type DiscoverFeedPost = {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorHandle: string;
  postedAt: string;
  caption: string;
  highlight: string;
  likes: number;
  comments: number;
  saves: number;
  property: ReturnType<typeof toPropertySnapshot>;
  media: DiscoverFeedMedia[];
};

export const DISCOVER_FEED: DiscoverFeedPost[] = [
  {
    id: 'discover-1',
    authorName: getProperty('1').hostName,
    authorAvatar: getProperty('1').hostAvatar,
    authorHandle: '@aminastays',
    postedAt: '2h',
    caption:
      'Early check-ins hit different when the pool is still mirror calm and the ocean breeze is already coming through the suite.',
    highlight: 'Pool sunrise tour',
    likes: 1842,
    comments: 86,
    saves: 411,
    property: toPropertySnapshot(getProperty('1')),
    media: [
      {
        id: 'discover-1-video',
        type: 'video',
        src: 'https://videos.pexels.com/video-files/7578552/7578552-hd_1080_1920_30fps.mp4',
        poster: getProperty('1').images[0],
        alt: 'Poolside video tour of Luxury Ocean View Suite',
        duration: '0:18',
      },
      {
        id: 'discover-1-image',
        type: 'image',
        src: getProperty('1').images[1],
        alt: 'Interior of Luxury Ocean View Suite',
      },
    ],
  },
  {
    id: 'discover-2',
    authorName: getProperty('2').hostName,
    authorAvatar: getProperty('2').hostAvatar,
    authorHandle: '@watamuwaves',
    postedAt: '5h',
    caption:
      'Sunset from the terrace, dinner under the palms, then straight onto the sand in the morning. This is one of our favorite villa weekends.',
    highlight: 'Golden-hour villa mood',
    likes: 1324,
    comments: 59,
    saves: 267,
    property: toPropertySnapshot(getProperty('2')),
    media: [
      {
        id: 'discover-2-image-1',
        type: 'image',
        src: getProperty('2').images[0],
        alt: 'Exterior of Watamu Beachfront Villa',
      },
      {
        id: 'discover-2-image-2',
        type: 'image',
        src: getProperty('2').images[1],
        alt: 'Second view of Watamu Beachfront Villa',
      },
    ],
  },
  {
    id: 'discover-3',
    authorName: getProperty('4').hostName,
    authorAvatar: getProperty('4').hostAvatar,
    authorHandle: '@dianidays',
    postedAt: '7h',
    caption:
      'A quick walk-through from the garden to the beachfront path. Couples keep booking this one for the quiet and the private outdoor dinners.',
    highlight: 'Garden-to-beach walk',
    likes: 2149,
    comments: 103,
    saves: 502,
    property: toPropertySnapshot(getProperty('4')),
    media: [
      {
        id: 'discover-3-video',
        type: 'video',
        src: 'https://videos.pexels.com/video-files/6587161/6587161-hd_1080_1920_25fps.mp4',
        poster: getProperty('4').images[0],
        alt: 'Vertical beachside video of Diani Beach Cottage',
        duration: '0:14',
      },
    ],
  },
  {
    id: 'discover-4',
    authorName: getProperty('7').hostName,
    authorAvatar: getProperty('7').hostAvatar,
    authorHandle: '@lamurooftops',
    postedAt: '11h',
    caption:
      'This rooftop is why guests keep extending their stays. The call to prayer, the sea breeze, and old town sunsets all in one frame.',
    highlight: 'Lamu rooftop evenings',
    likes: 1688,
    comments: 77,
    saves: 398,
    property: toPropertySnapshot(getProperty('7')),
    media: [
      {
        id: 'discover-4-image-1',
        type: 'image',
        src: getProperty('7').images[0],
        alt: 'Lamu Stone Town Retreat exterior',
      },
      {
        id: 'discover-4-image-2',
        type: 'image',
        src: getProperty('7').images[2] ?? getProperty('7').images[0],
        alt: 'Another view of Lamu Stone Town Retreat',
      },
    ],
  },
  {
    id: 'discover-5',
    authorName: getProperty('11').hostName,
    authorAvatar: getProperty('11').hostAvatar,
    authorHandle: '@malindimornings',
    postedAt: '1d',
    caption:
      'A short room-to-balcony video because guests always ask what the morning light looks like here. It is even better in person.',
    highlight: 'Balcony morning light',
    likes: 1196,
    comments: 48,
    saves: 212,
    property: toPropertySnapshot(getProperty('11')),
    media: [
      {
        id: 'discover-5-video',
        type: 'video',
        src: 'https://videos.pexels.com/video-files/5992797/5992797-hd_1080_1920_25fps.mp4',
        poster: getProperty('11').images[0],
        alt: 'Vertical walkthrough video of Malindi Beachfront Apartment',
        duration: '0:12',
      },
      {
        id: 'discover-5-image',
        type: 'image',
        src: getProperty('11').images[1],
        alt: 'Balcony view at Malindi Beachfront Apartment',
      },
    ],
  },
  {
    id: 'discover-6',
    authorName: getProperty('12').hostName,
    authorAvatar: getProperty('12').hostAvatar,
    authorHandle: '@tiwiretreats',
    postedAt: '1d',
    caption:
      'A quick photo drop from this week’s offsite setup. Big tables, ocean views, and enough room for the whole team to actually breathe.',
    highlight: 'Retreat-ready setup',
    likes: 2401,
    comments: 112,
    saves: 624,
    property: toPropertySnapshot(getProperty('12')),
    media: [
      {
        id: 'discover-6-image-1',
        type: 'image',
        src: getProperty('12').images[0],
        alt: 'Tiwi Beach Luxury Villa exterior',
      },
      {
        id: 'discover-6-image-2',
        type: 'image',
        src: getProperty('12').images[1],
        alt: 'Pool view at Tiwi Beach Luxury Villa',
      },
      {
        id: 'discover-6-image-3',
        type: 'image',
        src: getProperty('12').images[2],
        alt: 'Interior of Tiwi Beach Luxury Villa',
      },
    ],
  },
];
