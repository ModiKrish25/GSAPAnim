"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";

const FAQS = [
  {
    q: "What is included in your standard event package?",
    a: "Our standard package covers full event consultation, venue coordination, décor concept design, on-site setup supervision, and a dedicated event manager on the day. Catering, photography, and entertainment are available as optional add-on tiers, allowing you to build a fully tailored experience.",
  },
  {
    q: "Do you work with external caterers or preferred vendors?",
    a: "We maintain an exclusive list of vetted premium vendors whose quality and standards align with our brand. While we strongly recommend working within our curated network for a seamless experience, we are open to discussing external vendors on a case-by-case basis with prior approval.",
  },
  {
    q: "When is the final venue walkthrough scheduled?",
    a: "A comprehensive walkthrough is conducted 7–10 days before your event date. This session covers the complete layout, lighting positions, stage dimensions, catering stations, and any last-minute customisations to ensure every detail is locked in and perfected.",
  },
  {
    q: "Do you handle setup, teardown, and logistics coordination?",
    a: "Absolutely. Our team manages the complete operational lifecycle of your event — from vendor arrival scheduling and décor installation to post-event teardown and premises restoration. You arrive to a perfectly set stage and leave without a single logistical worry.",
  },
  {
    q: "What is your rescheduling and cancellation policy?",
    a: "Rescheduling requests made more than 60 days prior to the event date are accommodated at no additional charge (subject to venue availability). Cancellations within 30 days may incur a partial service fee. We recommend reviewing the full policy outlined in your signed agreement for specific terms.",
  },
  {
    q: "How far in advance should we secure our venue date?",
    a: "For peak season dates (October–February and summer months), we recommend booking at least 9–12 months in advance. For off-peak dates, 4–6 months provides adequate planning time. Early reservations also allow more flexibility in vendor and décor selection.",
  },
  {
    q: "Can the décor, lighting, and staging be fully customised?",
    a: "Yes — every element is customisable. From custom colour palettes and floral installations to projection mapping, bespoke stage backdrops, and monogrammed detailing, our creative team works closely with you to translate your vision into a precisely realised atmosphere.",
  },
  {
    q: "Is on-site coordination staff available throughout the event?",
    a: "Every event includes a dedicated senior coordinator and an operations crew present from setup through teardown. They remain discreetly available throughout to manage vendor communication, timing, and any on-the-spot adjustments — ensuring you remain fully present in the moment.",
  },
];

export default function EvattoFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleOpen = (i: number) => {
    if (openIdx === i) return;

    // Close currently open one
    if (openIdx !== null && contentRefs.current[openIdx]) {
      gsap.to(contentRefs.current[openIdx]!, { height: 0, duration: 0.3, ease: "power2.inOut", overwrite: true });
    }

    if (contentRefs.current[i]) {
      const el = contentRefs.current[i]!;
      gsap.set(el, { height: "auto" });
      const h = el.offsetHeight;
      gsap.fromTo(el, { height: 0 }, { height: h, duration: 0.35, ease: "power3.out", overwrite: true });
    }
    setOpenIdx(i);
  };

  const handleClose = (i: number) => {
    if (openIdx !== i) return;

    if (contentRefs.current[i]) {
      gsap.to(contentRefs.current[i]!, { height: 0, duration: 0.3, ease: "power2.inOut", overwrite: true });
    }
    setOpenIdx(null);
  };

  return (
    <section className="w-full py-24 md:py-32" style={{ background: "#0A0B0D" }}>
      <div className="max-w-4xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C5A880", fontWeight: 600, marginBottom: 12 }}>
            Planning Guide
          </p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 300, color: "#FDFBF7", lineHeight: 1.1, marginBottom: 14 }}>
            Frequently Asked <span style={{ fontStyle: "italic", color: "#C5A880" }}>Questions</span>
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "rgba(253,251,247,0.5)", maxWidth: "440px", margin: "0 auto", lineHeight: 1.75 }}>
            Everything you need to know before beginning your event journey with us.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                style={{ borderBottom: "1px solid rgba(253,251,247,0.08)" }}
                onMouseEnter={() => handleOpen(i)}
                onMouseLeave={() => handleClose(i)}
              >
                <div
                  className="w-full text-left py-6 flex items-start justify-between gap-6 group cursor-default"
                  style={{ background: "transparent", border: "none" }}
                >
                  {/* Gold accent bar */}
                  <div style={{
                    width: 3, minWidth: 3, borderRadius: 2, alignSelf: "stretch", marginTop: 2,
                    background: isOpen ? "#C5A880" : "rgba(253,251,247,0.1)",
                    transition: "background 0.35s",
                    flexShrink: 0,
                  }} />

                  <span style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(1.3rem, 2.9vw, 1.55rem)", // Increased by 1 size step
                    fontWeight: 700, // Made bold
                    color: isOpen ? "#C5A880" : "#FDFBF7", // Changed color combination to dark-gold theme
                    lineHeight: 1.35, flex: 1, textAlign: "left",
                    transition: "color 0.3s",
                  }}>
                    {faq.q}
                  </span>

                  {/* Chevron */}
                  <svg
                    width="18" height="18" viewBox="0 0 18 18" fill="none"
                    style={{ flexShrink: 0, marginTop: 2, transition: "transform 0.35s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path d="M4 6.5L9 11.5L14 6.5" stroke={isOpen ? "#C5A880" : "rgba(253,251,247,0.35)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Answer — height animated by GSAP */}
                <div
                  ref={el => { contentRefs.current[i] = el; }}
                  style={{ height: 0, overflow: "hidden" }}
                >
                  <p style={{
                    fontFamily: "var(--font-inter)", fontSize: "13.5px", color: "rgba(253,251,247,0.65)",
                    lineHeight: 1.8, paddingLeft: 16, paddingBottom: 24, paddingRight: 8,
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
