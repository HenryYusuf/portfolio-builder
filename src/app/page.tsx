"use client";

// Package
import React from "react";
import { useSearchParams } from "next/navigation";

// Components
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SignUp, SignIn } from "@clerk/nextjs";

// Extras
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
  const [openSheet, setOpenSheet] = React.useState(false);

  const searchParams: any = useSearchParams();
  const formType = searchParams.get("formType");

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
              className={`p-5 text-sm font-bold text-gray-600 cursor-pointer rounded-md hover:bg-accent ${
                item.path === "/"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }`}
            >
              {item.title}
            </span>
          ))}

          <Button className="cursor-pointer" onClick={() => setOpenSheet(true)}>
            Sign In
          </Button>
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

      {openSheet && (
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetContent className="min-w-[500px] flex justify-center items-center">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>

            {formType === "sign-in" ? (
              <SignIn
                routing="hash"
                signUpUrl="/?formType=sign-up"
                fallbackRedirectUrl="/account"
              />
            ) : (
              <SignUp
                routing="hash"
                signInUrl="/?formType=sign-in"
                fallbackRedirectUrl="/account"
              />
            )}
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

export default Homepage;
