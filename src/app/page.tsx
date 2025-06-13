"use client";

import { AuroraBackground } from "@/components/bg/aurora-background";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

let arr: any[][] = [
  [TitleComponent, 0, 0, 600, 300, 0],
  [InfoComponent, 10, 30, 384, 192, 1],
  [ImageComponent, -10, 27, 400, 300, 2],
  [QuoteComponent, 15, -20, 300, 150, 3],
  [StatsComponent, -20, 15, 250, 200, 4],
  [CardComponent, 25, 10, 320, 180, 5],
  [TimelineComponent, -15, -25, 400, 250, 6],
  [FeatureComponent, 20, 20, 280, 160, 7],
  [GalleryComponent, -25, 5, 450, 300, 8],
  [TestimonialComponent, 30, -15, 350, 200, 9],
  [TeamComponent, -30, 30, 400, 250, 10],
  [ContactComponent, 0, -30, 320, 200, 11],
  [NewsComponent, -20, -10, 380, 220, 12],
  [ProjectsComponent, 25, 25, 420, 280, 13],
  [TechnologyComponent, -15, 15, 340, 190, 14],
];

function skewedGaussian(
  x: number,
  A: number,
  b: number,
  c1: number,
  c2: number
): number {
  const c = x < b ? c1 : c2;
  return A * Math.exp(-Math.pow(x - b, 2) / (2 * Math.pow(c, 2)));
}

export default function Home() {
  const [scroll, setScroll] = useState(0);
  const smoothScroll = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set up smooth scrolling animation
      gsap.to(smoothScroll, {
        current: scroll,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          setScroll(smoothScroll.current);
        },
      });
    });

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const newScroll = Math.max(0, Math.min(15, scroll + e.deltaY * 0.05));
      smoothScroll.current = scroll;
      gsap.to(smoothScroll, {
        current: newScroll,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          setScroll(smoothScroll.current);
        },
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      ctx.revert();
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [scroll]);

  return (
    <div ref={containerRef} className="w-dvw h-dvh overflow-hidden relative">
      <AuroraBackground
        className="w-dvw h-dvh z-[-2147483647]"
        children={undefined}
      ></AuroraBackground>
      <div className="fixed right-4 top-4 z-50">
        <span className="text-white text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
          Depth: {scroll.toFixed(2)}
        </span>
      </div>
      {arr.map(([Component, x, y, w, h, z], i) => (
        <div
          key={i}
          className="absolute backdrop-blur-2xl"
          style={{
            display: Math.abs(scroll - z) > 2 ? "none" : "block",
            left: `calc(50dvw + ${(Math.pow(6, scroll - z) * x) / 2}% - ${
              w / 2
            }px)`,
            top: `calc(50dvh + ${(Math.pow(6, scroll - z) * y) / 2}% - ${
              h / 2
            }px)`,
            width: w,
            height: h,
            zIndex: -z,
            filter:
              Math.abs(scroll - z) < 0
                ? `blur(${Math.pow(Math.abs(z - scroll), 2) * 0.4}px)`
                : `blur(${Math.pow(Math.abs(z - scroll) + 0.4, 6)}px)`,
            scale: `calc(${Math.exp(scroll - z)})`,
            opacity: skewedGaussian(scroll - z, 1, 0, 1, 0.5),
          }}
        >
          <Component />
        </div>
      ))}
    </div>
  );
}

function TitleComponent() {
  return (
    <h1 className="text-7xl font-bold text-center w-full h-full flex items-center justify-center border-1 backdrop-blur-2xl">
      Z-SCROLL
    </h1>
  );
}
function InfoComponent() {
  return (
    <h1 className="text-sm text-center w-full h-full flex items-center justify-center border-1 p-8 backdrop-blur-2xl">
      "z-scroll" can refer to two different things: a component used in the
      zircle-ui library for creating circular scrollbars and a visual effect of
      scrolling along the z-axis (depth) in 3D web pages.
    </h1>
  );
}
function ImageComponent() {
  return (
    <Image
      src="/milky_way.jpg"
      width={400}
      height={300}
      alt="Picture of the author"
    />
  );
}
function QuoteComponent() {
  return (
    <div className="text-xl italic text-center w-full h-full flex items-center justify-center p-6  border-1  ">
      "Innovation is the outcome of a habit, not a random act."
    </div>
  );
}

function StatsComponent() {
  return (
    <div className="grid grid-cols-2 gap-4 p-6  border-1   w-full h-full">
      <div className="text-center">
        <div className="text-2xl font-bold">100+</div>
        <div className="text-sm">Projects</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">50k+</div>
        <div className="text-sm">Users</div>
      </div>
    </div>
  );
}

function CardComponent() {
  return (
    <div className="p-6  border-1   w-full h-full flex flex-col justify-between">
      <h3 className="text-xl font-bold mb-2">Featured Project</h3>
      <p className="text-sm">An innovative approach to digital experiences</p>
      <button className="mt-4 px-4 py-2 bg-blue-500/50 rounded-lg hover:bg-blue-600/50 transition-colors">
        Learn More
      </button>
    </div>
  );
}

function TimelineComponent() {
  return (
    <div className="flex flex-col gap-4 p-6  border-1   w-full h-full">
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <div>2023: Project Launch</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div>2024: Global Expansion</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
        <div>2025: New Features</div>
      </div>
    </div>
  );
}

function FeatureComponent() {
  return (
    <div className="p-6  border-1   w-full h-full">
      <div className="text-4xl mb-4">🚀</div>
      <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
      <p className="text-sm">Optimized for the best performance</p>
    </div>
  );
}

function GalleryComponent() {
  return (
    <div className="grid grid-cols-2 gap-4 p-6  border-1   w-full h-full">
      <Image
        src="/milky_way.jpg"
        width={200}
        height={150}
        alt="Gallery 1"
        className="rounded-lg"
      />
      <Image
        src="/milky_way.jpg"
        width={200}
        height={150}
        alt="Gallery 2"
        className="rounded-lg"
      />
    </div>
  );
}

function TestimonialComponent() {
  return (
    <div className="p-6  border-1   w-full h-full">
      <div className="text-sm italic mb-4">
        "This platform has transformed how we work. Absolutely incredible!"
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        <div>
          <div className="font-bold">Jane Doe</div>
          <div className="text-xs">CEO, Tech Corp</div>
        </div>
      </div>
    </div>
  );
}

function TeamComponent() {
  return (
    <div className="grid grid-cols-2 gap-4 p-6  border-1   w-full h-full">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2"></div>
        <div className="font-bold">John Smith</div>
        <div className="text-xs">Founder</div>
      </div>
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-2"></div>
        <div className="font-bold">Sarah Johnson</div>
        <div className="text-xs">Designer</div>
      </div>
    </div>
  );
}

function ContactComponent() {
  return (
    <div className="p-6  border-1   w-full h-full">
      <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span>📧</span>
          <span>hello@example.com</span>
        </div>
        <div className="flex items-center gap-2">
          <span>📱</span>
          <span>+1 234 567 890</span>
        </div>
      </div>
    </div>
  );
}

function NewsComponent() {
  return (
    <div className="p-6  border-1   w-full h-full">
      <h3 className="text-xl font-bold mb-2">Latest Updates</h3>
      <div className="space-y-2">
        <div className="text-sm">🎉 New feature release</div>
        <div className="text-sm">🌟 Community milestone reached</div>
        <div className="text-sm">📈 Growing user base</div>
      </div>
    </div>
  );
}

function ProjectsComponent() {
  return (
    <div className="grid grid-cols-2 gap-4 p-6  border-1   w-full h-full">
      <div className="p-4 bg-black/20 rounded-lg">
        <h4 className="font-bold mb-2">Project Alpha</h4>
        <p className="text-xs">Revolutionary AI technology</p>
      </div>
      <div className="p-4 bg-black/20 rounded-lg">
        <h4 className="font-bold mb-2">Project Beta</h4>
        <p className="text-xs">Next-gen user experience</p>
      </div>
    </div>
  );
}

function TechnologyComponent() {
  return (
    <div className="flex flex-wrap gap-2 p-6  border-1   w-full h-full items-center justify-center">
      <div className="px-3 py-1 bg-blue-500/30 rounded-full text-sm">React</div>
      <div className="px-3 py-1 bg-green-500/30 rounded-full text-sm">
        Node.js
      </div>
      <div className="px-3 py-1 bg-purple-500/30 rounded-full text-sm">
        TypeScript
      </div>
      <div className="px-3 py-1 bg-yellow-500/30 rounded-full text-sm">
        Python
      </div>
    </div>
  );
}
