"use client";

import { ArrowRight, Github, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const scrollReveal: any = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.2 },
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1]
    }
  };

  return (
    <div className="relative min-h-screen w-full font-sans text-black selection:bg-zinc-100">

      {/* --- [TOP ZONE: Clean White] 도트 없음 --- */}
      <div className="relative z-20 bg-white">
        {/* HEADER */}
        <nav className="flex items-center justify-between px-8 py-10 md:px-20">
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs font-bold tracking-[0.3em] uppercase">nneoum</motion.span>
          <div className="flex gap-8 text-[10px] font-bold tracking-widest uppercase text-zinc-400">
            <a href="#products" className="hover:text-black transition-colors">Products</a>
            <a href="#philosophy" className="hover:text-black transition-colors">Philosophy</a>
            <a href="mailto:ceo@nneoum.com" className="hover:text-black transition-colors">Contact</a>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="flex flex-col items-start px-8 pt-20 pb-40 md:px-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
            className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tighter md:text-8xl">
            I shape <br />
            the essential
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="mt-10 max-w-xl text-lg leading-relaxed text-zinc-500 md:text-xl">
            nneoum Venture Studio visualizes what truly matters. <br />
            We stand for clarity, intention, and a meaningful life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-12">
            <button className="flex items-center justify-center gap-2 bg-black px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition-transform hover:scale-105 active:scale-95 shadow-lg">
              Explore Our Work <ArrowRight size={14} />
            </button>
          </motion.div>
        </section>
      </div>

      {/* --- [BOTTOM ZONE: Tech Grid] 여기서부터 도트 시작 --- */}
      <div className="relative z-10 w-full bg-zinc-50/50">

        {/* 국지적 도트 그리드 배경 (진하게, 이 구역에만 한정) */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] [background-size:20px_20px] opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />

        {/* 콘텐츠 계층 (z-10으로 배경 위로 띄움) */}
        <div className="relative z-10">
          {/* PRODUCTS SECTION */}
          <motion.section
            {...scrollReveal}
            id="products" className="border-t border-zinc-200 px-8 py-32 md:px-20">
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">Current Project</p>
            <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">

              {/* 계층(Depth) 강화: 입체적인 카드 디자인 */}
              <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white/95 p-10 shadow-md backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-black hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]">
                <h3 className="text-2xl font-bold tracking-tight">Discipline Premium</h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                  365-day grid-based planner that visualizes focus data.
                  Manage your progress with Heatmap and The Void modes.
                </p>
                <div className="mt-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 shadow-sm border border-zinc-200">In Development</span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 shadow-sm border border-zinc-200">Flutter</span>
                </div>
              </div>

              <div className="flex items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white/50 p-10 text-zinc-400 backdrop-blur-md transition-all duration-500 hover:border-zinc-400 hover:bg-white/80">
                <p className="text-xs font-medium tracking-widest uppercase">Next Project Coming Soon</p>
              </div>
            </div>
          </motion.section>

          {/* PHILOSOPHY SECTION */}
          <motion.section
            {...scrollReveal}
            id="philosophy" className="px-8 py-32 md:px-20">
            <div className="max-w-3xl rounded-2xl bg-white/60 p-10 shadow-sm backdrop-blur-sm border border-white/40">
              <h2 className="text-3xl font-bold tracking-tight">Our Philosophy</h2>
              <p className="mt-8 text-lg leading-relaxed text-zinc-600">
                "In a world of noise and complexity, clarity is power." <br /><br />
                We value refined interactions over flashy features,  
                empowering individuals to take control of their time.
              </p>
            </div>
          </motion.section>

          {/* FOOTER */}
          <footer className="border-t border-zinc-200 px-8 py-20 md:px-20 bg-white/80 backdrop-blur-sm">
            <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
              <span className="text-xs tracking-[0.1em] font-medium">© 2026 NNEOUM. All rights reserved.</span>
              <div className="flex gap-6 text-zinc-400">
                <a href="#" className="hover:text-black transition-colors"><Github size={18} /></a>
                <a href="mailto:ceo@nneoum.com" className="hover:text-black transition-colors"><Mail size={18} /></a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}