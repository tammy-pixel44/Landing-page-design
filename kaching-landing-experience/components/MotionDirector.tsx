"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MotionDirector() {
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    gsap.set(".page-progress__bar", { transformOrigin: "left center" });
    const progress = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(".page-progress__bar", { scaleX: self.progress }),
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);

    if (reduced) {
      gsap.set("[data-reveal], .hero-kicker, .hero-word, .hero-sub, .hero-purchase, .orbit-readout", { clearProps: "all", opacity: 1, y: 0 });
      return () => progress.kill();
    }

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .from(".nav-shell", { yPercent: -110, duration: .7 })
      .from(".hero-kicker", { opacity: 0, y: 12, duration: .4 }, "-=.15")
      .from(".hero-word", { yPercent: 112, opacity: 0, duration: .88, stagger: .08 }, "-=.18")
      .from(".hero-sub", { opacity: 0, y: 16, duration: .5 }, "-=.34")
      .from(".hero-purchase", { opacity: 0, y: 12, scale: .97, duration: .45 }, "-=.28")
      .from(".orbit-stage", { opacity: 0, y: 40, duration: .95 }, "-=.38")
      .from(".orbit-readout", { opacity: 0, y: 12, duration: .5 }, "-=.36");

    gsap.timeline({
      scrollTrigger: { trigger: ".hero-shell", start: "top top", end: "bottom top", scrub: .8 },
    })
      .to(".hero-copy", { y: -72, opacity: .18, duration: .5, ease: "power1.inOut" }, .18)
      .to(".hero-world__contour--one", { scale: 1.12, opacity: .35, duration: .7, ease: "none" }, 0)
      .to(".hero-world__contour--two", { scale: 1.2, opacity: .2, duration: .7, ease: "none" }, 0)
      .to(".hero-world__contour--three", { scale: 1.3, opacity: .08, duration: .7, ease: "none" }, 0)
      .to(".orbit-stage", { y: 56, scale: .95, duration: .55, ease: "power1.inOut" }, .24);

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 34,
        duration: .85,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 86%", once: true },
      });
    });

    mm.add("(min-width: 900px)", () => {
      gsap.from(".wallet-bridge__threads", {
        y: -100,
        opacity: 0,
        scale: .9,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".wallet-bridge", start: "top 78%", once: true },
      });

      gsap.from(".wallet-ribbon__card", {
        y: 120,
        opacity: 0,
        scale: .84,
        duration: .85,
        stagger: { each: .06, from: "center" },
        ease: "power3.out",
        scrollTrigger: { trigger: ".wallet-ribbon", start: "top 94%", once: true },
      });

      const problem = gsap.timeline({
        scrollTrigger: { trigger: ".problem-stage", start: "top 72%", end: "bottom 72%", scrub: .75 },
      });
      problem
        .from(".problem-equation__rate", { opacity: .2, scale: .9, duration: .5 })
        .from(".problem-rule", { opacity: 0, x: 55, stagger: .18, duration: .7 }, .12)
        .from(".problem-equation__answer", { opacity: 0, scale: .88, rotate: 2, duration: .7 }, .62);
    });

    gsap.from(".qr-phone", {
      y: 70,
      rotate: 10,
      opacity: 0,
      duration: 1.05,
      ease: "power3.out",
      scrollTrigger: { trigger: ".qr-story", start: "top 72%", once: true },
    });

    gsap.from(".evidence-receipt", {
      y: 55,
      rotate: -1.5,
      opacity: 0,
      duration: .95,
      ease: "power3.out",
      scrollTrigger: { trigger: ".evidence-receipt", start: "top 82%", once: true },
    });

    gsap.to(".cta-stack", {
      rotate: 10,
      scale: 1.06,
      ease: "none",
      scrollTrigger: { trigger: ".cta-stage", start: "top bottom", end: "bottom top", scrub: 1 },
    });

    return () => {
      progress.kill();
      mm.revert();
    };
  });

  return <div className="motion-scope" aria-hidden="true" />;
}
