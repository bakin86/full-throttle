"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Send, ArrowUpRight } from "lucide-react";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: 1,
        },
      });

      tl.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        contentRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );

      // Fade to black at very end
      gsap.to(fadeRef.current, {
        opacity: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 30%",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mjgdejyr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 relative"
    >
      <div className="w-full max-w-xl mx-auto">
        <div className="w-12 h-px bg-[#DC2626] mb-8 mx-auto" />
        <h2
          ref={headingRef}
          className="font-[family-name:var(--font-yapari)] text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] mb-8 text-center"
        >
          Let&apos;s build something
          <br />
          <span className="text-[#DC2626]">unforgettable.</span>
        </h2>

        <div ref={contentRef} className="space-y-8">
          <p className="text-[#A1A1AA] text-sm sm:text-base font-light leading-relaxed tracking-wide text-center">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-white/[0.04] border border-white/10 px-4 py-3 text-sm font-light tracking-wide text-white placeholder:text-white/70 focus:border-[#DC2626]/50 focus:outline-none transition-colors duration-300"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white/[0.04] border border-white/10 px-4 py-3 text-sm font-light tracking-wide text-white placeholder:text-white/70 focus:border-[#DC2626]/50 focus:outline-none transition-colors duration-300"
              />
            </div>
            <textarea
              placeholder="Your message..."
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/10 px-4 py-3 text-sm font-light tracking-wide text-white placeholder:text-white/70 focus:border-[#DC2626]/50 focus:outline-none transition-colors duration-300 resize-none"
            />
            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="group flex items-center justify-center gap-3 text-sm tracking-[0.2em] uppercase border border-white/10 px-6 py-3 w-full text-[#A1A1AA] hover:text-white hover:border-[#DC2626]/50 hover:bg-[#DC2626]/10 transition-all duration-500 disabled:opacity-50"
            >
              <Send size={14} />
              <span>
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Message Sent"}
                {status === "error" && "Try Again"}
              </span>
            </button>
          </form>

          {/* Socials */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 pt-4 flex-wrap">
            <a
              href="https://t.me/nightrainlover86"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#A1A1AA] hover:text-[#DC2626] transition-colors duration-500"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span>Telegram</span>
              <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://discord.com/users/1clouden"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#A1A1AA] hover:text-[#DC2626] transition-colors duration-500"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286z" />
              </svg>
              <span>Discord</span>
              <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="tel:+97695238963"
              className="group flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#A1A1AA] hover:text-[#DC2626] transition-colors duration-500"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Phone</span>
              <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>

      {/* Fade to black overlay */}
      <div
        ref={fadeRef}
        className="fixed inset-0 bg-black pointer-events-none opacity-0 z-50"
      />
    </section>
  );
}
