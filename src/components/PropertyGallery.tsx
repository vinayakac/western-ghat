import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Play, Images } from 'lucide-react';
import { PropertyImage } from '../types/property';

interface Props {
  images: PropertyImage[];
  title: string;
  videoUrl?: string | null;
}

export default function PropertyGallery({ images, title, videoUrl }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(!!videoUrl);
  const [showAll, setShowAll] = useState(false);
  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);

  const open = (i: number) => { setLightbox(i); };
  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i === null ? 0 : (i - 1 + sorted.length) % sorted.length));
  const next = () => setLightbox((i) => (i === null ? 0 : (i + 1) % sorted.length));

  if (sorted.length === 0 && !videoUrl) return null;

  const main = sorted[0];
  const gridImages = sorted.slice(1, showAll ? sorted.length : 5);
  const remaining = sorted.length - 5;

  const isYouTube = videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'));
  const isVimeo = videoUrl && videoUrl.includes('vimeo.com');

  function getEmbedUrl(url: string): string {
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtube.com/watch')) {
      const id = new URL(url).searchParams.get('v');
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('vimeo.com')) {
      const id = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    return url;
  }

  return (
    <>
      <div className="space-y-3">
        {videoUrl && (
          <div className="flex gap-2 mb-1">
            <button
              onClick={() => setShowVideo(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                showVideo ? 'bg-[#c9a84c] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#c9a84c] hover:text-[#c9a84c]'
              }`}
            >
              <Play className="w-4 h-4" />
              Video Tour
            </button>
            {sorted.length > 0 && (
              <button
                onClick={() => setShowVideo(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  !showVideo ? 'bg-[#c9a84c] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#c9a84c] hover:text-[#c9a84c]'
                }`}
              >
                <Images className="w-4 h-4" />
                Photos ({sorted.length})
              </button>
            )}
          </div>
        )}

        {showVideo && videoUrl ? (
          <div className="rounded-2xl overflow-hidden bg-black aspect-video shadow-xl">
            {(isYouTube || isVimeo) ? (
              <iframe
                src={getEmbedUrl(videoUrl)}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title={`${title} video tour`}
              />
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        ) : sorted.length > 0 ? (
          <>
            <div className={`grid gap-2 rounded-2xl overflow-hidden ${
              sorted.length === 1
                ? 'grid-cols-1 h-[420px] lg:h-[560px]'
                : sorted.length === 2
                ? 'grid-cols-2 h-[420px] lg:h-[520px]'
                : 'grid-cols-4 h-[440px] lg:h-[560px]'
            }`}>
              <div
                className={`relative cursor-pointer group overflow-hidden ${sorted.length >= 3 ? 'col-span-2 row-span-2' : ''}`}
                onClick={() => open(0)}
              >
                <img
                  src={main.url}
                  alt={main.caption || title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
                {videoUrl && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowVideo(true); }}
                    className="absolute bottom-4 left-4 flex items-center gap-2 bg-[#c9a84c]/90 hover:bg-[#c9a84c] text-white text-xs font-semibold px-3 py-2 rounded-full transition-colors backdrop-blur-sm shadow-lg"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    Watch Video Tour
                  </button>
                )}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                  {sorted.length} photos
                </div>
              </div>

              {gridImages.map((img, i) => (
                <div
                  key={img.id}
                  className="relative cursor-pointer group overflow-hidden"
                  onClick={() => open(i + 1)}
                >
                  <img
                    src={img.url}
                    alt={img.caption || `${title} ${i + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {!showAll && i === 3 && remaining > 0 && (
                    <div
                      className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center cursor-pointer"
                      onClick={(e) => { e.stopPropagation(); setShowAll(true); }}
                    >
                      <span className="text-white font-bold text-2xl">+{remaining}</span>
                      <span className="text-white/80 text-xs mt-1">more photos</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {showAll && sorted.length > 5 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {sorted.slice(5).map((img, i) => (
                  <div
                    key={img.id}
                    className="relative aspect-square cursor-pointer group rounded-xl overflow-hidden"
                    onClick={() => open(i + 5)}
                  >
                    <img
                      src={img.url}
                      alt={img.caption || `${title} ${i + 6}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                  </div>
                ))}
              </div>
            )}

            {sorted.length > 1 && (
              <div className="flex items-center justify-between px-1 text-xs">
                <span className="text-gray-400">{sorted.length} photo{sorted.length !== 1 ? 's' : ''}</span>
                {!showAll && sorted.length > 5 && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="text-[#c9a84c] hover:underline font-semibold"
                  >
                    View all {sorted.length} photos
                  </button>
                )}
                {showAll && (
                  <button onClick={() => setShowAll(false)} className="text-gray-500 hover:text-[#0a2240] font-semibold">
                    Show less
                  </button>
                )}
              </div>
            )}
          </>
        ) : null}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/97 z-50 flex items-center justify-center"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/25 rounded-full p-2 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 text-white p-3 bg-white/10 hover:bg-white/25 rounded-full transition-all"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <div className="max-w-5xl max-h-screen px-16 py-8 w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={sorted[lightbox].url}
              alt={sorted[lightbox].caption || title}
              className="max-w-full max-h-[78vh] object-contain mx-auto rounded-xl shadow-2xl"
            />
            {sorted[lightbox].caption && (
              <p className="text-white/70 text-center mt-3 text-sm">{sorted[lightbox].caption}</p>
            )}
            <p className="text-white/40 text-center mt-2 text-xs">
              {lightbox + 1} of {sorted.length} — {title}
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 text-white p-3 bg-white/10 hover:bg-white/25 rounded-full transition-all"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-sm overflow-x-auto px-4 pb-1">
            {sorted.map((img, i) => (
              <button
                key={img.id}
                onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                className={`w-14 h-9 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                  i === lightbox ? 'ring-2 ring-[#c9a84c] opacity-100 scale-105' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
