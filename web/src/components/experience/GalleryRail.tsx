"use client";

import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";

export function GalleryRail({ title, images }: { title?: string; images: string[] }) {
  return (
    <section className="bg-[#fafaf8] py-[clamp(3rem,7vw,5rem)]">
      {title && (
        <div className="mx-auto mb-8 max-w-[70rem] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-light text-ink">
              {title}
            </h2>
          </Reveal>
        </div>
      )}
      <div className="flex gap-3 overflow-x-auto px-4 pb-2 sm:gap-4 sm:px-6 lg:px-8">
        {images.map((src, i) => (
          <div
            key={src}
            className="relative h-64 w-[70vw] shrink-0 overflow-hidden rounded-[1.25rem] bg-stone sm:h-80 sm:w-[28rem]"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 640px) 70vw, 28rem"
              loading={i < 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
