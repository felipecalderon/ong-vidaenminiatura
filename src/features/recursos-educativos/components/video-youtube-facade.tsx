"use client";

import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cargarApiYouTube, extraerVideoIdYoutube } from "../lib/youtube";

interface VideoYoutubeFacadeProps {
  url: string;
  titulo: string;
}

export function VideoYoutubeFacade({ url, titulo }: VideoYoutubeFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const videoId = extraerVideoIdYoutube(url);

  useEffect(() => {
    if (!isLoaded || !videoId) return;

    let disposed = false;

    cargarApiYouTube()
      .then(() => {
        if (disposed) return;
        const container = containerRef.current;
        if (!container) return;
        if (!window.YT?.Player) return;

        playerRef.current = new window.YT.Player(container, {
          videoId,
          playerVars: {
            autoplay: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event) => event.target.playVideo(),
          },
        });
      })
      .catch(() => {
        if (!disposed) {
          setIsLoaded(false);
        }
      });

    return () => {
      disposed = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [isLoaded, videoId]);

  if (!videoId) return null;

  if (isLoaded) {
    return (
      <div
        ref={containerRef}
        className="aspect-video w-full overflow-hidden rounded-xl border border-outline-variant bg-black"
      />
    );
  }

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl border border-outline-variant bg-surface-container">
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={titulo}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
      />
      <button
        type="button"
        onClick={() => setIsLoaded(true)}
        aria-label={`Reproducir video: ${titulo}`}
        className="absolute inset-0 flex items-center justify-center focus-ring"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-on-primary shadow-lg ring-2 ring-white/70 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
          <Play className="h-7 w-7 translate-x-0.5 fill-current md:h-9 md:w-9" />
        </span>
      </button>
    </div>
  );
}
