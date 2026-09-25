"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MotionDirector() {
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    gsap.set(".page-progress__bar", { transformOrigin: "left center", scaleX: 0 });
    const progress = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => gsap.set(".page-progress__bar", { scaleX: self.progress }),
    });

    const revealTargets = gsap.utils.toArray<HTMLElement>("[data-reveal]");

    if (reduced) {
      gsap.set(
        [
          ".nav-shell",
          ".hero-kicker",
          ".hero-word",
          ".hero-sub",
          ".hero-actions",
          ".hero-example",
          ".orbit-stage",
          ...revealTargets,
          "[data-rule-gate]",
          "[data-offer-layer]",
        ],
        { clearProps: "all", opacity: 1, y: 0, x: 0 }
      );
      return () => progress.kill();
    }

    const runIntro = () => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(".nav-shell", { yPercent: -105 }, { yPercent: 0, duration: .62 })
        .from(".hero-kicker", { opacity: 0, y: 10, duration: .36 }, "-=.10")
        .from(".hero-word", { yPercent: 108, opacity: 0, duration: .82, stagger: .08 }, "-=.12")
        .from(".hero-sub", { opacity: 0, y: 14, duration: .48 }, "-=.34")
        .from(".hero-actions", { opacity: 0, y: 12, duration: .46 }, "-=.28")
        .from(".hero-example", { opacity: 0, duration: .44 }, "-=.16");
    };

    if (document.body.dataset.cardeifyLoading === "true") {
      window.addEventListener("cardeify:ready", runIntro, { once: true });
    } else {
      runIntro();
    }

    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-shell",
        start: "top top",
        end: "bottom top",
        scrub: .85,
      },
    })
      .to(".hero-copy", { y: -82, opacity: .08, ease: "none" }, 0)
      .to(".hero-example", { opacity: 0, y: -18, ease: "none" }, .08)
      .to(".orbit-stage", { y: 82, scale: .94, opacity: .28, ease: "none" }, .18);

    revealTargets.forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: .8,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 84%", once: true },
      });
    });

    gsap.from(".choice-ledger span", {
      opacity: 0,
      y: 18,
      duration: .55,
      stagger: .08,
      ease: "power2.out",
      scrollTrigger: { trigger: ".choice-ledger", start: "top 90%", once: true },
    });

    mm.add("(min-width: 900px)", () => {
      gsap.from(".context-object", {
        opacity: 0,
        y: 44,
        duration: .72,
        stagger: .06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".context-shelf", start: "top 86%", once: true },
      });

      const reward = gsap.timeline({
        scrollTrigger: {
          trigger: ".reward-stage",
          start: "top 68%",
          end: "bottom 62%",
          scrub: .8,
        },
      });
      reward
        .from(".reward-head h2", { opacity: .28, scale: .94, transformOrigin: "left center" }, 0)
        .from("[data-rule-gate]", { opacity: 0, y: 28, stagger: .16 }, .12)
        .from(".reward-answer", { opacity: 0, x: 24 }, .58);

      const offers = gsap.timeline({
        scrollTrigger: {
          trigger: ".offers-stage",
          start: "top 66%",
          end: "bottom 62%",
          scrub: .75,
        },
      });
      offers
        .from("[data-offer-layer]", { opacity: 0, x: 34, stagger: .13 }, 0)
        .from(".offer-total", { opacity: 0, y: 20 }, .55);

      gsap.from(".timeline-bar i", {
        height: 0,
        duration: 1.05,
        stagger: .08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".value-timeline", start: "top 84%", once: true },
      });
    });

    gsap.from(".verification-paper:first-child", {
      opacity: 0,
      y: 54,
      rotate: -8,
      duration: .9,
      ease: "power3.out",
      scrollTrigger: { trigger: ".verification-papers", start: "top 82%", once: true },
    });
    gsap.from(".verification-paper--alert", {
      opacity: 0,
      y: 64,
      rotate: 7,
      duration: .9,
      delay: .12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".verification-papers", start: "top 82%", once: true },
    });

    gsap.from(".evidence-sheet > div", {
      opacity: 0,
      x: 18,
      duration: .5,
      stagger: .06,
      ease: "power2.out",
      scrollTrigger: { trigger: ".evidence-sheet", start: "top 82%", once: true },
    });

    gsap.to(".final-stack", {
      scale: .94,
      opacity: .26,
      ease: "none",
      scrollTrigger: {
        trigger: ".final-stage",
        start: "top bottom",
        end: "bottom bottom",
        scrub: .8,
      },
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);

    return () => {
      progress.kill();
      window.removeEventListener("cardeify:ready", runIntro);
      mm.revert();
    };
  });

  return <div className="motion-scope" aria-hidden="true" />;
}
