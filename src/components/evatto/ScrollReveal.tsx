"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface ScrollRevealProps {
  children: string;
  type?: "chars" | "words";
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span" | "div";
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  type = "words",
  delay = 0,
  duration = 0.8,
  stagger = 0.025,
  className = "",
  as: Component = "h2",
  style = {},
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll(".reveal-inner");
    if (!targets.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 90%", // Trigger when the top of the element hits 90% of screen height
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      targets,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: duration,
        stagger: stagger,
        ease: "power4.out",
        delay: delay,
      }
    );

    return () => {
      tl.kill();
    };
  }, [delay, duration, stagger]);

  const words = children.split(" ");

  return (
    <Component
      ref={containerRef as any}
      className={className}
      style={{ ...style, position: "relative" }}
    >
      {type === "words" ? (
        words.map((word, wIdx) => (
          <span
            key={wIdx}
            className="inline-block overflow-hidden"
            style={{ verticalAlign: "bottom" }}
          >
            <span className="reveal-inner inline-block origin-left">
              {word}
            </span>
            {wIdx < words.length - 1 && "\u00A0"}
          </span>
        ))
      ) : (
        words.map((word, wIdx) => (
          <span
            key={wIdx}
            className="inline-block overflow-hidden whitespace-nowrap"
            style={{ verticalAlign: "bottom" }}
          >
            {word.split("").map((char, cIdx) => (
              <span
                key={cIdx}
                className="inline-block overflow-hidden"
                style={{ verticalAlign: "bottom" }}
              >
                <span className="reveal-inner inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
            {wIdx < words.length - 1 && "\u00A0"}
          </span>
        ))
      )}
    </Component>
  );
}
