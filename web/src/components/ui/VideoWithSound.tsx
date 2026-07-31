"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/provider";
import { clsx } from "clsx";

type Props = {
  src: string;
  poster?: string;
  className?: string;
};

export function VideoWithSound({ src, poster, className }: Props) {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mutedRef = useRef(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = mutedRef.current;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(video);
    video.play().catch(() => {});

    return () => observer.disconnect();
  }, []);

  async function toggleSound() {
    const video = videoRef.current;
    if (!video) return;

    const next = !muted;
    mutedRef.current = next;
    setMuted(next);
    video.muted = next;

    try {
      await video.play();
    } catch {
      mutedRef.current = true;
      video.muted = true;
      setMuted(true);
    }
  }

  return (
    <div className={clsx("relative overflow-hidden bg-stone", className)}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
      />

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? t("video_unmute") : t("video_live")}
        title={muted ? t("video_unmute") : t("video_live")}
        className={clsx(
          "group absolute bottom-5 start-5 z-10 flex h-11 w-11 items-center justify-center",
          "border border-white/25 bg-[#fafaf8]/12 text-[#fafaf8] backdrop-blur-xl",
          "shadow-[0_8px_28px_rgba(0,0,0,0.18)]",
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50",
        )}
      >
        <span aria-hidden className="relative flex items-center justify-center">
          {muted ? <MuteIcon /> : <SoundIcon />}
        </span>
      </button>
    </div>
  );
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      <path d="M22 9L16 15" />
      <path d="M16 9L22 15" />
    </svg>
  );
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      <path d="M15 9a5 5 0 0 1 0 6" />
      <path d="M18 7a8 8 0 0 1 0 10" />
    </svg>
  );
}
