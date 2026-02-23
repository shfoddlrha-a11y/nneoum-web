"use client";

import { ArrowRight, Github, Mail, Instagram, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // [2번 전술] 부팅 감지 센서

  useEffect(() => {
    setIsMounted(true); // 컴포넌트 마운트 시 부팅 시작
  }, []);
  
  // --- [1번 전술 고도화] 점진적 Noise Purge ---
  const [glitchLevel, setGlitchLevel] = useState(0);
  const [, setTick] = useState(0);

  const triggerPurge = () => {
    if (glitchLevel > 0) return;
    setGlitchLevel(1.0); 

    const interval = setInterval(() => setTick(t => t + 1), 50);

    setTimeout(() => setGlitchLevel(0.7), 200);  
    setTimeout(() => setGlitchLevel(0.4), 400);  
    setTimeout(() => setGlitchLevel(0.15), 550); 
    setTimeout(() => {
      setGlitchLevel(0); 
      clearInterval(interval);
    }, 700);
  };

  const t = (text: string) => {
    if (glitchLevel === 0) return text;
    const chars = "@#&%*";
    return text.split('').map(char => {
      if (char === ' ' || char === '\n') return char;
      return Math.random() < glitchLevel
        ? chars[Math.floor(Math.random() * chars.length)]
        : char;
    }).join('');
  };
  // ------------------------------------------

  const copyEmail = () => {
    navigator.clipboard.writeText("nneoum00@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollReveal: any = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.1, margin: "-150px 0px -150px 0px" },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isContactOpen || isPhilosophyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isContactOpen, isPhilosophyOpen]);

  return (
    <div className="relative min-h-screen w-full font-sans text-black selection:bg-zinc-100 overflow-x-hidden">
      
      {/* --- [2번 전술] Top Loading Bar --- */}
      <motion.div 
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-0 left-0 right-0 z-[300] h-[2px] bg-black"
      />

      {/* --- [3번 전술] THE MANIFESTO (풀스크린 선언문) --- */}
      <AnimatePresence>
        {isPhilosophyOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex flex-col bg-zinc-50 overflow-y-auto"
          >
            <div className="flex w-full justify-between items-center px-8 py-10 md:px-20">
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400">
                {t("Manifesto")}
              </span>
              <button onClick={() => setIsPhilosophyOpen(false)} className="hover:rotate-90 transition-transform text-zinc-400 hover:text-black">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-8 py-20 md:px-20">
              <div className="max-w-4xl w-full text-center space-y-32">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-zinc-900">
                  {t("Clarity is power.")}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left border-t border-zinc-200 pt-16">
                  <div>
                    <span className="text-[10px] font-bold text-zinc-300">01</span>
                    <h3 className="text-xs font-bold tracking-[0.3em] uppercase mt-4 mb-4 text-zinc-900">{t("Context")}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {t("Understand the 'why' before the 'what'. We build products rooted in deep psychological understanding, not just trends.")}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-300">02</span>
                    <h3 className="text-xs font-bold tracking-[0.3em] uppercase mt-4 mb-4 text-zinc-900">{t("Clarity")}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {t("Refined interactions over flashy features. We strip away the non-essential to reveal the true value of the tool.")}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-zinc-300">03</span>
                    <h3 className="text-xs font-bold tracking-[0.3em] uppercase mt-4 mb-4 text-zinc-900">{t("Essence")}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {t("Empower individuals to take control of their time. Our work visualizes the unseen to make focus a tangible reality.")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- [CONTACT SIDEBAR] --- */}
      <AnimatePresence>
        {isContactOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[101] w-full max-w-sm bg-white border-l border-zinc-100 p-12 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <button onClick={() => setIsContactOpen(false)} className="mb-20 hover:rotate-90 transition-transform">
                  <X size={24} strokeWidth={1.5} />
                </button>

                  <div className="space-y-12">
                    <div className="group">
                      <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase mb-4">{t("Email")}</p>
                      <div className="flex items-baseline gap-4">
                        <button onClick={copyEmail} className="text-xl font-medium tracking-tight hover:text-zinc-500 transition-colors text-left break-all">
                          {copied ? t("ADDRESS COPIED") : t("nneoum00@gmail.com")}
                        </button>
                        <span className="text-[10px] font-mono tracking-widest text-zinc-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          {t("(Click to copy)")}
                        </span>
                      </div>
                    </div>

                    <div className="group">
                      <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase mb-4">{t("Social")}</p>
                      <div className="flex items-baseline gap-4">
                        <a href="https://www.instagram.com/nneoum/" target="_blank" rel="noopener noreferrer" className="block text-xl font-medium tracking-tight hover:text-zinc-500 transition-colors">
                          {t("Instagram")}
                        </a>
                        <span className="text-[10px] font-mono tracking-widest text-zinc-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          {t("(Open link)")}
                        </span>
                      </div>
                    </div>

                    <div className="group">
                      <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase mb-4">{t("Workspace")}</p>
                      <div className="flex items-baseline gap-4">
                        <a href="https://github.com/shfoddlrha-a11y" target="_blank" rel="noopener noreferrer" className="block text-xl font-medium tracking-tight hover:text-zinc-500 transition-colors">
                          {t("Github")}
                        </a>
                        <span className="text-[10px] font-mono tracking-widest text-zinc-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                          {t("(Open link)")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              <div className="text-[10px] text-zinc-400 font-medium tracking-widest uppercase">
                {t("Less noise")} <br />
                {t("more focus")}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- [PAGE CONTENT] --- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* --- [TOP ZONE] --- */}
        <div className="relative z-20 bg-white">
          <nav className="flex items-center justify-between px-8 py-10 md:px-20">
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xs font-bold tracking-[0.3em] uppercase cursor-pointer"
              onClick={triggerPurge}>
              {t("nneoum")}
            </motion.span>
            <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-zinc-400 items-center">
              <button onClick={() => scrollToSection('philosophy')} className="hover:text-black transition-colors">{t("PHILOSOPHY")}</button>
              <button onClick={() => setIsContactOpen(true)} className="hover:text-black transition-colors">{t("CONTACT")}</button>
            </div>
          </nav>

          <section className="flex flex-col items-start px-8 pt-20 pb-40 md:px-20">
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}
              className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tighter md:text-8xl">
              {t("I shape")} <br />
              {t("the essential")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
              className="mt-10 max-w-xl text-lg leading-relaxed text-zinc-500 md:text-xl">
              {t("nneoum Venture Studio visualizes what truly matters.")} <br />
              {t("We stand for clarity, intention, and a meaningful life.")}
            </motion.p>
          </section>
        </div>

        {/* --- [BOTTOM ZONE] --- */}
        <div className="relative z-10 w-full bg-zinc-50/50">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] [background-size:20px_20px] opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />

          <div className="relative z-10">
            {/* PROJECTS SECTION */}
            <motion.section
              {...scrollReveal}
              id="products" className="border-t border-zinc-200 px-8 py-32 md:px-20">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">{t("PROJECTS")}</p>
              <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white/95 p-10 shadow-md backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-black hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]">
                  <h3 className="text-2xl font-bold tracking-tight">{t("Discipline Premium")}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                    {t("365-day grid-based planner that visualizes focus data.")} <br />
                    {t("Manage your progress with Heatmap and The Void modes.")}
                  </p>
                  <div className="mt-10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 font-mono">
                    <span>[ {t("In Development")} ]</span>
                    <span>[ {t("Flutter")} ]</span>
                  </div>
                </div>

                <div className="flex items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white/50 p-10 text-zinc-400 backdrop-blur-md transition-all duration-500 hover:border-zinc-400 hover:bg-white/80">
                  <p className="text-xs font-medium tracking-widest uppercase">{t("Next Project Coming Soon")}</p>
                </div>
              </div>
            </motion.section>

            {/* Venture Roadmap */}
            <motion.section
              {...scrollReveal}
              id="roadmap" className="border-t border-zinc-200 px-8 py-32 md:px-20"
            >
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">{t("Venture Roadmap")}</p>
              <div className="mt-16 relative border-l border-zinc-200 ml-2 space-y-12">
                <div className="relative pl-8">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-zinc-200" />
                  <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400">{t("2025.08")}</p>
                  <p className="mt-2 text-sm font-medium text-zinc-500">{t("Initial Ideation")}</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
                  <p className="text-[10px] font-bold tracking-[0.2em] text-black">{t("2026.02")}</p>
                  <p className="mt-2 text-sm font-medium text-zinc-900">{t("Discipline Premium")}</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full border border-zinc-300 bg-white" />
                  <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400">{t("2026.Q4")}</p>
                  <p className="mt-2 text-sm font-medium text-zinc-400">{t("Secret Project")}</p>
                </div>
              </div>
            </motion.section>

            {/* PHILOSOPHY SECTION */}
            <motion.section
              {...scrollReveal}
              id="philosophy" className="border-t border-zinc-200 px-8 py-32 md:px-20">
              <div className="max-w-3xl rounded-2xl bg-white/60 p-10 shadow-sm backdrop-blur-sm border border-white/40">
                <h2 className="text-3xl font-bold tracking-tight">{t("Our Philosophy")}</h2>
                <p className="mt-8 text-lg leading-relaxed text-zinc-600">
                  {t('"In a world of noise and complexity, clarity is power."')}
                </p>
                <button 
                  onClick={() => setIsPhilosophyOpen(true)}
                  className="mt-12 text-xs font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors">
                  {t("Read The Manifesto")} <ArrowRight size={12} className="inline ml-1 mb-0.5" />
                </button>
              </div>
            </motion.section>

            {/* FOOTER */}
            <footer className="border-t border-zinc-200 px-8 py-20 md:px-20 bg-white/80 backdrop-blur-sm">
              <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
                <span className="text-xs tracking-[0.1em] font-medium text-zinc-500">{t("© 2026 NNEOUM. All rights reserved.")}</span>
                <div className="flex gap-6 text-zinc-400">
                  <a href="https://github.com/shfoddlrha-a11y" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                    <Github size={18} />
                  </a>
                  <a href="https://www.instagram.com/nneoum/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                    <Instagram size={18} />
                  </a>
                  <button onClick={() => setIsContactOpen(true)} className="hover:text-black transition-colors">
                    <Mail size={18} />
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}