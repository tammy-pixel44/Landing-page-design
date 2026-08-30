"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MotionDirector() {
  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    gsap.set(".page-progress__bar", { transformOrigin: "left center" });
    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(".page-progress__bar", { scaleX: self.progress }),
    });

    if (reduceMotion) {
      gsap.set("[data-reveal], .hero-kicker, .hero-word, .hero-sub, .hero-actions, .hero-proofline, .hero-scroll-result", {
        clearProps: "all",
        opacity: 1,
        y: 0,
      });
      return () => progressTrigger.kill();
    }

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .from(".nav-shell", { yPercent: -100, duration: 0.75 })
      .from(".hero-kicker", { opacity: 0, y: 16, duration: 0.5 }, "-=0.15")
      .from(
        ".hero-word",
        { opacity: 0, yPercent: 115, rotate: 1.5, duration: 0.82, stagger: 0.08 },
        "-=0.25",
      )
      .from(".hero-sub", { opacity: 0, y: 20, duration: 0.58 }, "-=0.34")
      .from(".hero-actions", { opacity: 0, y: 14, duration: 0.48 }, "-=0.3")
      .from(".hero-proofline", { opacity: 0, y: 10, duration: 0.42, stagger: 0.07 }, "-=0.25");

    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-shell",
        start: "top top",
        end: "bottom top",
        scrub: 0.7,
      },
    })
      .to(".hero-side-note", { opacity: 0, y: -18, duration: 0.3 }, 0.12)
      .to(".hero-copy", { y: -58, opacity: 0.28, duration: 0.55, ease: "power1.inOut" }, 0.34)
      .to(".hero-proofline", { opacity: 0, duration: 0.25 }, 0.38)
      .to(".hero-scroll-result", { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" }, 0.5);

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 34,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 86%",
          once: true,
        },
      });
    });

    mm.add("(min-width: 900px)", () => {
      const anatomy = gsap.timeline({
        scrollTrigger: {
          trigger: ".anatomy-stage",
          start: "top top",
          end: "+=1900",
          scrub: 0.8,
          pin: ".anatomy-pin",
          anticipatePin: 1,
        },
      });

      gsap.set(".anatomy-chip", { opacity: 0.16, x: 70, scale: 0.96 });
      gsap.set(".anatomy-step", { opacity: 0.24 });
      gsap.set(".anatomy-output", { scale: 0.9, opacity: 0.5 });

      const chips = gsap.utils.toArray<HTMLElement>(".anatomy-chip");
      const steps = gsap.utils.toArray<HTMLElement>(".anatomy-step");

      chips.forEach((chip, index) => {
        const at = index * 0.7;
        anatomy
          .to(chip, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "power2.out" }, at)
          .to(steps[index], { opacity: 1, duration: 0.3 }, at)
          .to(steps[index], { opacity: 0.24, duration: 0.3 }, at + 0.48);
      });

      anatomy
        .to(".anatomy-rail__fill", { scaleY: 1, transformOrigin: "top center", duration: 4.2, ease: "none" }, 0)
        .to(
          ".anatomy-output",
          {
            scale: 1,
            opacity: 1,
            boxShadow: "0 0 0 1px rgba(205,255,95,.35), 0 28px 90px rgba(0,0,0,.22)",
            duration: 0.8,
            ease: "power3.out",
          },
          chips.length * 0.7 - 0.15,
        );
    });

    mm.add("(max-width: 899px)", () => {
      gsap.utils.toArray<HTMLElement>(".anatomy-chip").forEach((chip, index) => {
        gsap.from(chip, {
          opacity: 0,
          x: 24,
          duration: 0.55,
          delay: index * 0.02,
          scrollTrigger: { trigger: chip, start: "top 90%", once: true },
        });
      });
    });

    gsap.to(".cta-ring--a", { rotate: 360, duration: 34, ease: "none", repeat: -1 });
    gsap.to(".cta-ring--b", { rotate: -360, duration: 46, ease: "none", repeat: -1 });

    return () => {
      progressTrigger.kill();
      mm.revert();
    };
  });

  return <div className="motion-scope" aria-hidden="true" />;
}
