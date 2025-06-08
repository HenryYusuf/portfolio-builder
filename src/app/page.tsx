"use client"

import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";

const menuItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/Contact",
  },
];

function Homepage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center bg-secondary px-20 py-5">
        <h1 className="font-bold text-3xl text-primary">
          <b className="text-destructive">P</b>{" "}
          <span className="text-foreground">|</span> B
        </h1>
        <div className="flex justify-end gap-5 items-center">
          {menuItems.map((item) => (
            <span
              key={item.title}
              className={`p-5 text-sm font-bold text-gray-600 cursor-pointer rounded-md hover:bg-accent ${item.path === '/' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
            >
              {item.title}
            </span>
          ))}

          <Button className="cursor-pointer">Sign In</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-20 h-[70vh] px-20">
        <div className="flex flex-col justify-center">
          <div>
            <h1 className="text-4xl font-bold text-primary">
              <b className="text-destructive">Portfolio</b>{" "}
              <span className="text-foreground">|</span> Builder
            </h1>
            <p className="text-gray-600 mt-2 text-sm font-semibold">
              Bangun Cerita Unik Kamu, Tampilkan Bakat dengan Profesional, dan
              Ciptakan Portofolio Menarik dengan Mudah—Memberdayakan Kreator,
              Freelancer, dan Inovator untuk Bersinar dan Meraih Peluang Impian.
            </p>
          </div>
        </div>
        <div>
          <DotLottieReact
            src="https://lottie.host/2f68616f-2341-4c6d-8f44-d846f8a13b5d/l98VzVzka8.lottie"
            loop
            autoplay
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
