"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  playLabel?: string;
};

export function NcReelPlayer({ src, playLabel = "Play" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sync = () => setPlaying(!video.paused);
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("ended", sync);

    const prepareCover = () => {
      if (video.dataset.coverReady === "1") return;
      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);
        try {
          if (!video.videoWidth || !video.videoHeight) return;
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          video.setAttribute("poster", canvas.toDataURL("image/jpeg", 0.86));
          video.dataset.coverReady = "1";
        } catch {
          /* ignore */
        }
        if (video.paused) {
          try {
            video.currentTime = 0;
          } catch {
            /* ignore */
          }
        }
      };
      video.addEventListener("seeked", onSeeked);
      try {
        const t =
          video.duration && Number.isFinite(video.duration)
            ? Math.min(0.12, video.duration * 0.02)
            : 0.12;
        video.currentTime = t;
      } catch {
        video.removeEventListener("seeked", onSeeked);
      }
    };

    const onMeta = () => prepareCover();
    if (video.readyState >= 1) prepareCover();
    else video.addEventListener("loadedmetadata", onMeta, { once: true });

    return () => {
      video.removeEventListener("play", sync);
      video.removeEventListener("pause", sync);
      video.removeEventListener("ended", sync);
    };
  }, [src]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      document.querySelectorAll<HTMLVideoElement>(".jiva-reel-player video").forEach((v) => {
        if (v !== video && !v.paused) v.pause();
      });
      video.muted = false;
      void video.play();
    } else {
      video.pause();
    }
  }

  return (
    <div
      ref={wrapRef}
      className={`jiva-reel jiva-reel-player${playing ? " is-playing" : ""}`}
    >
      <video
        ref={videoRef}
        className="jiva-reel-video"
        playsInline
        preload="auto"
        onClick={toggle}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button type="button" className="jiva-reel-playbtn" aria-label={playLabel} onClick={toggle}>
        <span className="jiva-reel-playbtn__ring" aria-hidden="true" />
        <svg
          className="jiva-reel-playbtn__icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
}
