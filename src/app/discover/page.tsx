'use client';

import {
  startTransition,
  useEffect,
  useRef,
  useState,
  type UIEvent,
} from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Heart,
  Home,
  MapPin,
  Bookmark,
  MessageCircle,
  Play,
  Plus,
  Shield,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import {
  DISCOVER_FEED,
  type DiscoverFeedMedia,
  type DiscoverFeedPost,
} from '@/lib/data';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

type FeedTab = 'For You' | 'Videos' | 'Photos';

type FeedInstance = DiscoverFeedPost & {
  instanceId: string;
};

const FEED_TABS: FeedTab[] = ['For You', 'Videos', 'Photos'];

function buildFeedBatch(batch: number): FeedInstance[] {
  return DISCOVER_FEED.map((post, index) => ({
    ...post,
    instanceId: `${post.id}-batch-${batch}-${index}`,
    media: post.media.map((media, mediaIndex) => ({
      ...media,
      id: `${media.id}-batch-${batch}-${mediaIndex}`,
    })),
  }));
}

function formatCompact(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  }

  return String(value);
}

function DiscoverFeedCard({
  post,
  isActive,
  isLiked,
  isSaved,
  isFollowing,
  mediaIndex,
  muted,
  onToggleLike,
  onToggleSave,
  onToggleFollow,
  onToggleMute,
  onNextMedia,
  onPreviousMedia,
  onOpenSheet,
}: {
  post: FeedInstance;
  isActive: boolean;
  isLiked: boolean;
  isSaved: boolean;
  isFollowing: boolean;
  mediaIndex: number;
  muted: boolean;
  onToggleLike: () => void;
  onToggleSave: () => void;
  onToggleFollow: () => void;
  onToggleMute: () => void;
  onNextMedia: () => void;
  onPreviousMedia: () => void;
  onOpenSheet: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const activeMedia = post.media[mediaIndex] ?? post.media[0];
  const hasMultipleMedia = post.media.length > 1;
  const likeCount = post.likes + (isLiked ? 1 : 0);
  const saveCount = post.saves + (isSaved ? 1 : 0);

  useEffect(() => {
    if (!videoRef.current || activeMedia.type !== 'video') {
      return;
    }

    const video = videoRef.current;
    video.muted = muted;

    if (isActive) {
      video.play().catch(() => undefined);
      return;
    }

    video.pause();
  }, [activeMedia.type, isActive, muted]);

  return (
    <article
      data-feed-card
      className="relative h-[100dvh] snap-start overflow-hidden bg-stone-950"
    >
      {activeMedia.type === 'video' ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          loop
          muted={muted}
          playsInline
          preload="metadata"
          poster={activeMedia.poster}
        >
          <source src={activeMedia.src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={activeMedia.src}
          alt={activeMedia.alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            (event.target as HTMLImageElement).src = post.property.images[0];
          }}
        />
      )}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(13,148,136,0.16),transparent_36%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85" />

      {hasMultipleMedia && (
        <>
          <button
            onClick={onPreviousMedia}
            className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={onNextMedia}
            className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition hover:bg-black/50"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute left-1/2 top-6 z-20 flex -translate-x-1/2 gap-1.5">
            {post.media.map((media, index) => (
              <span
                key={media.id}
                className={`h-1.5 rounded-full transition-all ${
                  index === mediaIndex ? 'w-8 bg-white' : 'w-2 bg-white/45'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end p-4 pb-[calc(var(--mobile-bottom-nav-clearance)+0.5rem)] sm:pb-24 md:pb-8 md:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col md:flex-row md:items-end md:justify-between md:gap-6">
          <div className="max-w-[calc(100%-4rem)] pr-2 text-white sm:max-w-[calc(100%-5rem)] md:max-w-lg md:pr-0">
            <div className="mb-3 flex items-center gap-2.5">
              <img
                src={post.authorAvatar}
                alt={post.authorName}
                className="h-10 w-10 rounded-full border border-white/25 object-cover sm:h-11 sm:w-11"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-semibold">
                    {post.authorName}
                  </span>
                  <span className="text-[10px] text-white/55">{post.postedAt}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/70">
                  <span className="truncate">{post.authorHandle}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-1.5 py-0.5 text-[10px] font-medium text-white/85">
                    <Shield className="h-2.5 w-2.5" />
                    Host
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-2 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center rounded-full bg-brand-600/85 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                {post.highlight}
              </span>
              {activeMedia.type === 'video' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-black/35 px-2.5 py-0.5 text-[11px] font-semibold text-white/90">
                  <Play className="h-3 w-3 fill-white" />
                  {activeMedia.duration ?? 'Video'}
                </span>
              )}
              {post.property.instantBook && (
                <span className="inline-flex items-center gap-1 rounded-full bg-ocean-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-blue-100">
                  <Zap className="h-3 w-3" />
                  Instant
                </span>
              )}
            </div>

            <p className="max-w-[32rem] text-sm leading-relaxed text-white/88 line-clamp-3">
              {post.caption}
            </p>

            <div className="mt-3 flex flex-col items-start gap-2 text-sm">
              <span className="inline-flex items-center gap-1.5 font-medium text-white/90 text-xs">
                <Home className="h-3.5 w-3.5" />
                {post.property.title}
              </span>
              <Link
                href={`/property/${post.property.id}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-stone-900 transition hover:bg-stone-100"
              >
                View Stay
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="absolute right-3 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3 sm:right-4 sm:gap-4 md:static md:translate-y-0 md:gap-5">
            <button
              onClick={onToggleFollow}
              className="flex flex-col items-center gap-1 text-white"
            >
              <span
                className={`flex min-w-[3.5rem] items-center justify-center rounded-full px-2.5 py-1.5 text-[11px] font-semibold backdrop-blur-sm transition sm:min-w-[4rem] sm:px-3 sm:py-2 sm:text-xs ${
                  isFollowing
                    ? 'bg-white/15 text-white/82'
                    : 'bg-white text-stone-900'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </span>
            </button>

            <button
              onClick={onToggleLike}
              className="flex flex-col items-center gap-1 text-white"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition sm:h-11 sm:w-11 md:h-14 md:w-14 ${
                  isLiked ? 'bg-red-500' : 'bg-white/15'
                }`}
              >
                <Heart
                  className={`h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 ${
                    isLiked ? 'fill-white text-white' : 'text-white'
                  }`}
                />
              </span>
              <span className="text-[10px] font-semibold sm:text-[11px] md:text-sm">
                {formatCompact(likeCount)}
              </span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm sm:h-11 sm:w-11 md:h-14 md:w-14">
                <MessageCircle className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </span>
              <span className="text-[10px] font-semibold sm:text-[11px] md:text-sm">
                {formatCompact(post.comments)}
              </span>
            </button>

            <button
              onClick={onToggleSave}
              className="flex flex-col items-center gap-1 text-white"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition sm:h-11 sm:w-11 md:h-14 md:w-14 ${
                  isSaved ? 'bg-brand-700' : 'bg-white/15'
                }`}
              >
                <Bookmark
                  className={`h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 ${
                    isSaved ? 'fill-white text-white' : 'text-white'
                  }`}
                />
              </span>
              <span className="text-[10px] font-semibold sm:text-[11px] md:text-sm">
                {formatCompact(saveCount)}
              </span>
            </button>

            {activeMedia.type === 'video' && (
              <button
                onClick={onToggleMute}
                className="flex flex-col items-center gap-1 text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm sm:h-11 sm:w-11 md:h-14 md:w-14">
                  {muted ? (
                    <VolumeX className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  ) : (
                    <Volume2 className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  )}
                </span>
                <span className="text-[10px] font-semibold md:text-xs">
                  {muted ? 'Muted' : 'Sound'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DiscoverPage() {
  const feedRef = useRef<HTMLDivElement | null>(null);
  const appendCursorRef = useRef(1);
  const appendingRef = useRef(false);

  const [tab, setTab] = useState<FeedTab>('For You');
  const [feedItems, setFeedItems] = useState<FeedInstance[]>(() => buildFeedBatch(0));
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [followedAuthors, setFollowedAuthors] = useState<Set<string>>(new Set());
  const [mediaIndexByPost, setMediaIndexByPost] = useState<Record<string, number>>({});
  const [unmutedPosts, setUnmutedPosts] = useState<Set<string>>(new Set());
  const [sheetPostId, setSheetPostId] = useState<string | null>(null);

  const visiblePosts = feedItems.filter((post) => {
    if (tab === 'Videos') {
      return post.media.some((media) => media.type === 'video');
    }

    if (tab === 'Photos') {
      return post.media.every((media) => media.type === 'image');
    }

    return true;
  });

  const activePost = visiblePosts[activeIndex] ?? visiblePosts[0] ?? null;
  const sheetPost =
    visiblePosts.find((post) => post.instanceId === sheetPostId) ?? activePost;

  useEffect(() => {
    const container = feedRef.current;
    if (!container) {
      return;
    }

    container.scrollTo({ top: 0, behavior: 'auto' });
    setActiveIndex(0);
  }, [tab]);

  useEffect(() => {
    if (!visiblePosts.length) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex > visiblePosts.length - 1) {
      setActiveIndex(visiblePosts.length - 1);
    }
  }, [activeIndex, visiblePosts.length]);

  function appendMorePosts() {
    if (appendingRef.current) {
      return;
    }

    appendingRef.current = true;
    const nextBatch = buildFeedBatch(appendCursorRef.current);
    appendCursorRef.current += 1;

    startTransition(() => {
      setFeedItems((current) => [...current, ...nextBatch]);
    });

    window.setTimeout(() => {
      appendingRef.current = false;
    }, 180);
  }

  function handleScroll(event: UIEvent<HTMLDivElement>) {
    const container = event.currentTarget;
    const viewportHeight = container.clientHeight || 1;
    const nextIndex = Math.round(container.scrollTop / viewportHeight);

    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }

    if (container.scrollHeight - container.scrollTop - viewportHeight < viewportHeight * 1.5) {
      appendMorePosts();
    }
  }

  function setNextMedia(post: FeedInstance) {
    setMediaIndexByPost((current) => {
      const currentIndex = current[post.instanceId] ?? 0;
      return {
        ...current,
        [post.instanceId]: (currentIndex + 1) % post.media.length,
      };
    });
  }

  function setPreviousMedia(post: FeedInstance) {
    setMediaIndexByPost((current) => {
      const currentIndex = current[post.instanceId] ?? 0;
      return {
        ...current,
        [post.instanceId]:
          (currentIndex - 1 + post.media.length) % post.media.length,
      };
    });
  }

  return (
    <div className="relative h-screen overflow-hidden bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 bg-gradient-to-b from-black via-black/60 to-transparent">
        <div className="pointer-events-auto px-4 pb-5 pt-[calc(env(safe-area-inset-top)+0.9rem)] md:px-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm md:h-10 md:w-10">
                <Compass className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                  Discover
                </p>
                <h1 className="font-display text-lg font-bold text-white md:text-2xl">
                  Host Feed
                </h1>
              </div>
            </div>

            <div className="hidden items-center gap-2 rounded-full bg-white/10 p-1 backdrop-blur-sm md:flex">
              {FEED_TABS.map((feedTab) => (
                <button
                  key={feedTab}
                  onClick={() => setTab(feedTab)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tab === feedTab
                      ? 'bg-white text-stone-900'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {feedTab}
                </button>
              ))}
            </div>

            <Link
              href="/host/properties"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 md:px-4 md:text-sm"
            >
              <Plus className="h-4 w-4" />
              Post Stay
            </Link>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 md:hidden">
            {FEED_TABS.map((feedTab) => (
              <button
                key={feedTab}
                onClick={() => setTab(feedTab)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === feedTab
                    ? 'bg-white text-stone-900'
                    : 'bg-white/10 text-white/70'
                }`}
              >
                {feedTab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={feedRef}
        onScroll={handleScroll}
        className="h-full snap-y snap-mandatory overflow-y-auto scroll-smooth scrollbar-hide"
      >
        {visiblePosts.map((post) => {
          const mediaIndex = mediaIndexByPost[post.instanceId] ?? 0;
          const isLiked = likedPosts.has(post.instanceId);
          const isSaved = savedPosts.has(post.instanceId);
          const isFollowing = followedAuthors.has(post.authorHandle);
          const muted = !unmutedPosts.has(post.instanceId);

          return (
            <DiscoverFeedCard
              key={post.instanceId}
              post={post}
              isActive={visiblePosts[activeIndex]?.instanceId === post.instanceId}
              isLiked={isLiked}
              isSaved={isSaved}
              isFollowing={isFollowing}
              mediaIndex={mediaIndex}
              muted={muted}
              onToggleLike={() => {
                setLikedPosts((current) => {
                  const next = new Set(current);
                  if (next.has(post.instanceId)) {
                    next.delete(post.instanceId);
                  } else {
                    next.add(post.instanceId);
                  }
                  return next;
                });
              }}
              onToggleSave={() => {
                setSavedPosts((current) => {
                  const next = new Set(current);
                  if (next.has(post.instanceId)) {
                    next.delete(post.instanceId);
                  } else {
                    next.add(post.instanceId);
                  }
                  return next;
                });
              }}
              onToggleFollow={() => {
                setFollowedAuthors((current) => {
                  const next = new Set(current);
                  if (next.has(post.authorHandle)) {
                    next.delete(post.authorHandle);
                  } else {
                    next.add(post.authorHandle);
                  }
                  return next;
                });
              }}
              onToggleMute={() => {
                setUnmutedPosts((current) => {
                  const next = new Set(current);
                  if (next.has(post.instanceId)) {
                    next.delete(post.instanceId);
                  } else {
                    next.add(post.instanceId);
                  }
                  return next;
                });
              }}
              onNextMedia={() => setNextMedia(post)}
              onPreviousMedia={() => setPreviousMedia(post)}
              onOpenSheet={() => setSheetPostId(post.instanceId)}
            />
          );
        })}

        {!visiblePosts.length && (
          <div className="flex h-screen items-center justify-center px-6 text-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/45">
                Discover
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold text-white">
                No posts in this lane yet
              </h2>
              <p className="mt-3 text-base text-white/65">
                Switch tabs or start following hosts when posts go live.
              </p>
              <button
                onClick={() => setTab('For You')}
                className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-900"
              >
                Back to For You
              </button>
            </div>
          </div>
        )}
      </div>

      {sheetPost && sheetPostId && (
        <div className="absolute inset-0 z-40 bg-black/65 backdrop-blur-sm">
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl rounded-t-[32px] border border-white/10 bg-[#101010] px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-5 text-white shadow-2xl md:left-1/2 md:right-auto md:w-[calc(100%-2rem)] md:-translate-x-1/2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
                  Stay Details
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-white">
                  {sheetPost.property.title}
                </h3>
              </div>
              <button
                onClick={() => setSheetPostId(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/75"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                {sheetPost.property.location}
              </span>
              {sheetPost.property.verified && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                  <Shield className="h-4 w-4" />
                  Verified
                </span>
              )}
              {sheetPost.property.instantBook && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ocean-500/20 px-3 py-1 text-sm font-semibold text-blue-200">
                  <Zap className="h-4 w-4" />
                  Instant Book
                </span>
              )}
            </div>

            <p className="mb-5 text-sm leading-7 text-white/75 md:text-base">
              {sheetPost.property.description}
            </p>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                { label: 'WiFi', value: sheetPost.property.wifiSpeed },
                { label: 'Electricity', value: sheetPost.property.electricity },
                { label: 'Water', value: sheetPost.property.water },
                {
                  label: 'Safety Score',
                  value: `${sheetPost.property.safetyScore}/10`,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/8 bg-white/5 p-4"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-white md:text-base">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {sheetPost.property.amenities.slice(0, 6).map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full bg-white/8 px-3 py-1.5 text-sm text-white/75"
                >
                  {amenity}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
                  From
                </p>
                <p className="mt-1 text-3xl font-bold text-white">
                  KSh {sheetPost.property.price.toLocaleString()}
                  <span className="ml-2 text-base font-medium text-white/55">
                    / night
                  </span>
                </p>
              </div>
              <Link
                href={`/property/${sheetPost.property.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100 md:text-base"
              >
                View Stay
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <MobileBottomNav variant="dark" />
    </div>
  );
}
