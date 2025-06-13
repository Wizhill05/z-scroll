"use client";

import { AuroraBackground } from "@/components/bg/aurora-background";
import Image from "next/image";
import { useState } from "react";

let arr: any[][] = [
  [TitleComponent, -10, -4, 256, 128, 1],
  [InfoComponent, 10, 10, 384, 192, 2],
  [ImageComponent, -10, 7, 400, 300, 3],
];

function skewedGaussian(x, A, b, c1, c2) {
  const c = x < b ? c1 : c2;
  return A * Math.exp(-Math.pow(x - b, 2) / (2 * Math.pow(c, 2)));
}

export default function Home() {
  const [scroll, setScroll] = useState(0);
  return (
    <div className="w-dvw h-dvh overflow-hidden relative">
      <AuroraBackground
        className="w-dvw h-dvh z-[-2147483647]"
        children={undefined}
      ></AuroraBackground>
      <div className="fixed left-1/2 top-4 transform -translate-x-1/2 z-50 flex flex-col items-center">
        <input
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={scroll}
          onChange={(e) => setScroll(Number(e.target.value))}
          className="w-64 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
        />
        <span className="text-white mt-1">Scroll: {scroll}</span>
      </div>
      {arr.map(([Component, x, y, w, h, z], i) => (
        <div
          key={i}
          className="absolute backdrop-blur-2xl"
          style={{
            display: Math.abs(scroll - z) > 3 ? "none" : "block",
            left: `calc(50dvw + ${(Math.pow(4, scroll - z) * x) / 2}% - ${
              w / 2
            }px)`,
            top: `calc(50dvh + ${(Math.pow(4, scroll - z) * y) / 2}% - ${
              h / 2
            }px)`,
            width: w,
            height: h,
            zIndex: -z,
            filter: `blur(${Math.abs(z - scroll)}px)`,
            scale: `calc(${Math.exp(scroll - z)})`,
            opacity: skewedGaussian(scroll - z, 1, 0, 1, 0.3),
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
    <h1 className="text-3xl font-bold text-center w-full h-full flex items-center justify-center border-1 backdrop-blur-2xl">
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
