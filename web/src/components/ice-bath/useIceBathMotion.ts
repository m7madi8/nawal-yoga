"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function isRtl() {
  return document.documentElement.getAttribute("dir") === "rtl";
}

function enterX(px = 28) {
  return isRtl() ? -px : px;
}

function ensureMist(host: Element | null, className: string) {
  if (!host || host.querySelector(`.${className}`)) return;
  const mist = document.createElement("div");
  mist.className = className;
  mist.setAttribute("aria-hidden", "true");
  const media =
    host.querySelector(".ib-hero__media") || host.querySelector(".ib-cta__media");
  if (media?.nextSibling) host.insertBefore(mist, media.nextSibling);
  else if (media) host.appendChild(mist);
  else host.insertBefore(mist, host.firstChild);
}

function splitTitleWords(titleEl: HTMLElement | null) {
  if (!titleEl) return [] as HTMLElement[];
  const text = (titleEl.textContent || "").trim();
  if (!text) return [];
  titleEl.setAttribute("aria-label", text);
  titleEl.textContent = "";
  const words: HTMLElement[] = [];
  text.split(/(\s+)/).forEach((part) => {
    if (!part) return;
    if (/^\s+$/.test(part)) {
      titleEl.appendChild(document.createTextNode(part));
      return;
    }
    const span = document.createElement("span");
    span.className = "ib-hero__word";
    span.textContent = part;
    titleEl.appendChild(span);
    words.push(span);
  });
  return words;
}

export function useIceBathMotion(rootRef: React.RefObject<HTMLDivElement | null>, locale: string) {
  useEffect(() => {
    const page = rootRef.current;
    if (!page) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      ensureMist(page.querySelector(".ib-hero"), "ib-hero__mist");
      ensureMist(page.querySelector(".ib-cta"), "ib-cta__mist");

      const stops = page.querySelectorAll(".ib-timeline .ib-stop");
      const roles = ["arrival", "breath", "ice", "sauna", "lunch", "flower"];
      stops.forEach((stop, i) => {
        if (roles[i]) stop.classList.add(`ib-stop--${roles[i]}`);
      });

      const timeline = page.querySelector(".ib-timeline");
      let progress = timeline?.querySelector(".ib-timeline__progress") as HTMLElement | null;
      if (timeline && !progress) {
        progress = document.createElement("span");
        progress.className = "ib-timeline__progress";
        progress.setAttribute("aria-hidden", "true");
        timeline.insertBefore(progress, timeline.firstChild);
      }

      if (reduce) {
        page.querySelectorAll(".ib-includes__item").forEach((el) => el.classList.add("is-drawn"));
        page.querySelectorAll(".ib-stop__media").forEach((el) => el.classList.add("is-revealed"));
        gsap.utils.toArray<HTMLElement>(".ib-section, .ib-cta, .ib-hero__inner").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 0.45,
              ease: "power1.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });
        return;
      }

      page.classList.add("ib-page--motion");

      const titleEl = page.querySelector("#ib-hero-title") as HTMLElement | null;
      const brand = page.querySelector(".ib-hero__brand");
      const divider = page.querySelector(".ib-hero__divider");
      const meta = page.querySelector(".ib-hero__meta");
      const heroCta = page.querySelector(".ib-hero__cta");
      const health = page.querySelector(".ib-hero__health");

      const words = splitTitleWords(titleEl);
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      if (brand) tl.fromTo(brand, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7 });
      if (words.length) {
        tl.fromTo(
          words,
          { autoAlpha: 0, y: 28, filter: "blur(8px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85, stagger: 0.06 },
          "-=0.35",
        );
      }
      if (divider) tl.fromTo(divider, { scaleX: 0 }, { scaleX: 1, duration: 0.55 }, "-=0.4");
      if (meta) tl.fromTo(meta, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.25");
      if (heroCta) {
        tl.fromTo(heroCta, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.15");
        tl.add(() => heroCta.classList.add("ib-cta--breathe"));
      }
      if (health) tl.fromTo(health, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.2");

      if (timeline && progress) {
        gsap.set(progress, { height: 0 });
        ScrollTrigger.create({
          trigger: timeline,
          start: "top 70%",
          end: "bottom 35%",
          scrub: 0.65,
          onUpdate: (self) => {
            const track = (timeline as HTMLElement).offsetHeight - 24;
            gsap.set(progress, { height: Math.max(0, track * self.progress) });
          },
        });
      }

      stops.forEach((stop) => {
        const media = stop.querySelector(".ib-stop__media");
        const content = stop.querySelector(".ib-stop__content");
        const isIce = stop.classList.contains("ib-stop--ice");
        gsap.fromTo(
          content,
          { autoAlpha: 0, x: enterX(isIce ? 40 : 28) },
          {
            autoAlpha: 1,
            x: 0,
            duration: isIce ? 0.9 : 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stop,
              start: "top 78%",
              once: true,
              onEnter: () => {
                stop.classList.add("is-active");
                media?.classList.add("is-revealed");
              },
            },
          },
        );
        if (media) {
          gsap.fromTo(
            media,
            { autoAlpha: 0, scale: 1.06 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: { trigger: stop, start: "top 80%", once: true },
            },
          );
        }
      });

      gsap.to(page, {
        "--bg-temp": "#d9eef5",
        ease: "none",
        scrollTrigger: {
          trigger: page.querySelector(".ib-stop--ice"),
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        },
      });
      gsap.to(page, {
        "--bg-temp": "#f3e6d4",
        ease: "none",
        scrollTrigger: {
          trigger: page.querySelector(".ib-stop--sauna"),
          start: "top 60%",
          end: "bottom 40%",
          scrub: true,
        },
      });
      gsap.to(page, {
        "--bg-temp": "#f6ebe6",
        ease: "none",
        scrollTrigger: {
          trigger: page.querySelector(".ib-stop--flower"),
          start: "top 60%",
          end: "bottom 20%",
          scrub: true,
        },
      });
      gsap.to(page, {
        "--bg-temp": "#e8f1f3",
        ease: "none",
        scrollTrigger: {
          trigger: page.querySelector(".ib-cta"),
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });

      page.querySelectorAll(".ib-includes__item").forEach((item, i) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            delay: i * 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true,
              onEnter: () => item.classList.add("is-drawn"),
            },
          },
        );
      });

      gsap.utils
        .toArray<HTMLElement>(
          ".ib-intro__inner, .ib-program__head, .ib-includes__head, .ib-dress .ib-wrap, .ib-pricing__head, .ib-pricing__grid, .ib-pricing__note, .ib-audience__block, .ib-why__head, .ib-why__item, .ib-cta__inner",
        )
        .forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 86%", once: true },
            },
          );
        });
    }, page);

    return () => {
      ctx.revert();
      page.classList.remove("ib-page--motion");
    };
  }, [rootRef, locale]);
}
