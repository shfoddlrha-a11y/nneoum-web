"use client";

import { ArrowRight, Github, Mail, Instagram, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// 프로젝트 데이터 관리
const PROJECTS = [
  {
    id: "discipline",
    title: "Discipline planner app",
    shortDesc: "365-day grid-based planner that visualizes focus data. \n Manage your progress with Heatmap and focus modes.",
    longDesc: "365-day grid-based planner that visualizes focus data. Manage your progress with Heatmap and The focus modes.",
    status: "in development",
    tech: "Flutter",
    features: [
      "Data-driven Heatmap Visualization",
      "Absolute Focus with 'Void mode'",
      "Intuitive 365-day Grid Interface",
    ],
    envDesc: "Cross-platform implementation utilizing Flutter. Focused on minimal payload and maximum performance.",
    link: null
  },

  {
    id: "paprika",
    title: "Paprika gym web",
    shortDesc: "A high-performance web solution for modern fitness spaces. \n Streamlining gym management and member experience.",
    longDesc: "Paprika is a specialized web platform designed for modern fitness centers. It focuses on removing the administrative friction between the gym and its members, allowing both to focus purely on physical growth.",
    status: "in BETA test",
    tech: "Next.js",
    features: [
      "Seamless Member Management System",
      "Real-time Class & PT Reservation",
      "Performance Analytics Dashboard",
    ],
    envDesc: "Built with Next.js and Tailwind CSS for rapid loading and SEO optimization. Focused on mobile-first responsiveness.",
    link: "https://paprika-gym.com"
  }
];

const PERSONAL_PHILOSOPHY = [
  { id: 1, content: "Shoot to the moon,", align: "self-start", ml: "md:ml-[10%]" },
  { id: 2, content: "Even miss will be the stars.", align: "self-end", mr: "md:mr-[15%]" },
  { id: 3, content: "There is no failure.", align: "self-center", mt: "mt-20" },
  { id: 4, content: "One and only thing I can have is myself.", align: "self-start", ml: "md:ml-[20%]" },
  { id: 5, content: "The strongest man conquers himself.", align: "self-end", mr: "md:mr-[5%]" },
  { id: 6, content: "Victory without peace is defeat.", align: "self-center", mt: "mt-40" },
  { id: 7, content: "Trust actions, not words.", align: "self-start", ml: "md:ml-[10%]" },
  { id: 8, content: "I fight to protect, not to win.", align: "self-end", mr: "md:mr-[5%]" },
  { id: 9, content: "When loyalty is rare, be rare.", align: "self-center", mt: "mt-40" }
];

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("nneoum00@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollReveal: any = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.1, margin: "0px" },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  }

  useEffect(() => {
    if (isContactOpen || isPhilosophyOpen || selectedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isContactOpen, isPhilosophyOpen, selectedProject]);

  return (
    <div className="relative min-h-screen w-full font-sans text-black selection:bg-zinc-100 overflow-x-hidden">
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- [TOP LOADING BAR] --- */}
      <motion.div
        key={`loading-${refreshKey}`}
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="fixed top-0 left-0 right-0 z-[300] h-[2px] bg-black"
      />

      {/* --- [PROJECT DETAIL MODULE] --- */}
      <AnimatePresence>
        {selectedProject &&
          PROJECTS.filter((p) => p.id === selectedProject).map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[200] flex flex-col bg-zinc-50 overflow-y-auto hide-scrollbar"
            >
              <div className="min-h-[101%] flex flex-col">
                <div className="flex w-full justify-between items-center px-8 py-10 md:px-20">
                  <span className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400">Project Detail</span>
                  <button onClick={() => setSelectedProject(null)} className="hover:rotate-90 transition-transform text-zinc-400 hover:text-black">
                    <X size={24} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-8 py-20 md:px-20">
                  <div className="max-w-4xl w-full space-y-24 text-center">
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-zinc-900">{project.title}</h2>
                    <div className="border-t border-zinc-200 pt-16">
                      <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">{project.longDesc}</p>
                      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
                        <div>
                          <span className="text-[10px] font-bold text-zinc-300">INFO</span>
                          <h3 className="text-xs font-bold tracking-[0.3em] uppercase mt-4 mb-4 text-zinc-900">Core Features</h3>
                          <ul className="text-sm text-zinc-500 leading-relaxed space-y-2">
                            {project.features.map((f, i) => (<li key={i}>- {f}</li>))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-zinc-300">SPEC</span>
                          <h3 className="text-xs font-bold tracking-[0.3em] uppercase mt-4 mb-4 text-zinc-900">Environment</h3>
                          <p className="text-sm text-zinc-500 leading-relaxed">{project.envDesc}</p>
                          {project.link && (
                            <div className="mt-12 pt-8 border-t border-zinc-100">
                              <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-black hover:text-zinc-400 transition-colors">
                                Visit Project <ExternalLink size={12} />
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* --- [THE PHILOSOPHY MODULE] --- */}
      <AnimatePresence>
        {isPhilosophyOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex flex-col bg-zinc-50 overflow-y-auto hide-scrollbar"
          >
            <div className="min-h-[101%] flex flex-col">
              <div className="flex w-full justify-between items-center px-8 py-10 md:px-20">
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-400">Philosophy</span>
                <button onClick={() => setIsPhilosophyOpen(false)} className="hover:rotate-90 transition-transform text-zinc-400 hover:text-black">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              <div className="flex-1 flex flex-col items-center px-8 py-20 md:px-20">
                <div className="max-w-4xl w-full text-center space-y-32">
                  <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-zinc-900">Clarity is power.</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left border-t border-zinc-200 pt-16">
                    <div>
                      <span className="text-[10px] font-bold text-zinc-300">01</span>
                      <h3 className="text-xs font-bold tracking-[0.3em] uppercase mt-4 mb-4 text-zinc-900">Context</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">Understand the 'WHY' before the 'what'. I build products rooted in deep psychological understanding, not just trends.</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-zinc-300">02</span>
                      <h3 className="text-xs font-bold tracking-[0.3em] uppercase mt-4 mb-4 text-zinc-900">Clarity</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">I design for clarity, not 'flashy noise'. Refined interaction over decorative features. Remove the excess. Expose the value.</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-zinc-300">03</span>
                      <h3 className="text-xs font-bold tracking-[0.3em] uppercase mt-4 mb-4 text-zinc-900">Essence</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">I build tools that return time to the individual. By visualizing the unseen, I make focus concrete.</p>
                    </div>
                  </div>
                  <div className="space-y-12 pb-32 text-zinc-700 font-medium tracking-tight text-xl md:text-2xl">
                    <p>I question why.</p><p>I remove the unnecessary.</p><p>I create silence.</p>
                    <div className="pt-12 border-t border-zinc-200 max-w-md mx-auto">
                      <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400 leading-relaxed">Less noise More peace</p>
                    </div>
                  </div>
                  <div className="flex flex-col w-full space-y-[25vh] md:space-y-[40vh] pt-40 border-t border-zinc-200/50">
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-600 leading-relaxed">Personal Thoughts</p>
                    {PERSONAL_PHILOSOPHY.map((item) => (
                      <motion.div key={item.id} initial={{ opacity: 0, x: item.align === "self-start" ? -40 : (item.align === "self-end" ? 40 : 0), filter: "blur(10px)" }} whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }} viewport={{ once: false, margin: "-10%" }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className={`relative flex flex-col ${item.align} ${item.ml || ''} ${item.mr || ''} ${item.mt || ''} text-left`}>
                        <p className="text-3xl md:text-6xl font-bold tracking-tighter text-zinc-900 leading-[1.1] max-w-3xl">{item.content}</p>
                        <div className="mt-8 h-[1px] w-50 bg-zinc-200" />
                      </motion.div>
                    ))}
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsContactOpen(false)} className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-md" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="fixed right-0 top-0 bottom-0 z-[101] w-full max-sm:max-w-none max-w-sm bg-white border-l border-zinc-100 p-12 shadow-2xl flex flex-col justify-between">
              <div>
                <button onClick={() => setIsContactOpen(false)} className="mb-20 hover:rotate-90 transition-transform"><X size={24} strokeWidth={1.5} /></button>
                <div className="space-y-12">
                  <div className="group">
                    <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase mb-4">Email</p>
                    <div className="flex items-baseline gap-4">
                      <button onClick={copyEmail} className="text-xl font-medium tracking-tight hover:text-zinc-500 transition-colors text-left break-all">{copied ? "ADDRESS COPIED" : "nneoum00@gmail.com"}</button>
                    </div>
                  </div>
                  <div className="group">
                    <p className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase mb-4">Social</p>
                    <a href="https://www.instagram.com/nneoum/" target="_blank" rel="noopener noreferrer" className="block text-xl font-medium tracking-tight hover:text-zinc-500 transition-colors">Instagram</a>
                    <a href="https://github.com/shfoddlrha-a11y" target="_blank" rel="noopener noreferrer" className="block mt-4 text-xl font-medium tracking-tight hover:text-zinc-500 transition-colors">Github</a>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-zinc-400 font-medium tracking-widest uppercase leading-relaxed">Less noise <br /> more focus</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- [PAGE CONTENT] --- */}
      <motion.div key={`content-${refreshKey}`} initial={{ opacity: 0, y: 10 }} animate={isMounted ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
        <div className="relative z-20 bg-white pb-20">
          <nav className="flex items-center justify-between px-8 py-10 md:px-20">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs font-bold tracking-[0.3em] uppercase cursor-pointer" onClick={() => setRefreshKey((prev) => prev + 1)}>nneoum</motion.span>
            <button onClick={() => setIsContactOpen(true)} className="text-[10px] font-bold tracking-widest uppercase text-zinc-400 hover:text-black transition-colors">CONTACT</button>
          </nav>
          <section className="flex flex-col items-start px-8 pt-20 pb-40 md:px-20">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tighter md:text-8xl">I shape <br /> the essential</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="mt-10 max-w-xl text-lg leading-relaxed text-zinc-500 md:text-xl">nneoum venture studio visualizes what truly matters. <br />We stand for clarity, intention, and a meaningful life style.</motion.p>
          </section>
        </div>

        <div className="relative z-10 w-full bg-zinc-50/50">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
          <div className="relative z-10">
            <motion.section {...scrollReveal} id="products" className="border-t border-zinc-200 px-8 py-32 md:px-20">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">PROJECTS</p>
              <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
                {PROJECTS.map((project) => (
                  <div key={project.id} onClick={() => setSelectedProject(project.id)} className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white/95 p-10 shadow-md backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-black hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] cursor-pointer">
                    <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-500">{project.shortDesc.split("\n").map((line, i) => (<span key={i}>{line}<br /></span>))}</p>
                    <div className="mt-10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 font-mono"><span>[ {project.status} ]</span> <span>[ {project.tech} ]</span></div>
                  </div>
                ))}
                <div className="flex items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white/50 p-10 text-zinc-400 backdrop-blur-md transition-all duration-500 hover:border-zinc-400 hover:bg-white/80"><p className="text-xs font-medium tracking-widest uppercase italic">Next Project Coming Soon</p></div>
              </div>
            </motion.section>

            <motion.section {...scrollReveal} id="roadmap" className="border-t border-zinc-200 px-8 py-32 md:px-20">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400">Venture Roadmap</p>
              <div className="mt-16 relative border-l border-zinc-200 ml-2 space-y-12">
                <div className="relative pl-8"><div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-zinc-200" /><p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400">2025.08</p><p className="mt-2 text-sm font-medium text-zinc-500">Initial Ideation</p></div>
                <div className="relative pl-8"><div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.1)]" /><p className="text-[10px] font-bold tracking-[0.2em] text-black">2026.02</p><p className="mt-2 text-sm font-medium text-zinc-900">nneoum studio</p></div>
                <div className="relative pl-8"><div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full border border-zinc-300 bg-white" /><p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400">2026.03</p><p className="mt-2 text-sm font-medium text-zinc-400">Secret Project</p></div>
              </div>
            </motion.section>

            <motion.section {...scrollReveal} id="philosophy" className="border-t border-zinc-200 px-8 py-32 md:px-20 pb-20">
              <div onClick={() => setIsPhilosophyOpen(true)} className="group max-w-3xl rounded-2xl bg-white/60 p-12 shadow-sm backdrop-blur-sm border border-white/40 cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-black hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-400 mb-6">Philosophy</p>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 leading-tight">About Essence</h2>
                    <p className="mt-8 text-lg leading-relaxed text-zinc-500 max-w-xl">I shape the essential. <br />Discover the thoughts behind the vision.</p>
                  </div>
                  <div className="text-zinc-300 group-hover:text-black group-hover:translate-x-1 transition-all duration-500"><ArrowRight size={32} strokeWidth={1} /></div>
                </div>
                <div className="mt-12 flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400 group-hover:text-black transition-colors">Explore Thought</span>
                  <div className="h-[1px] w-8 bg-zinc-200 group-hover:w-12 group-hover:bg-black transition-all duration-500" />
                </div>
              </div>
            </motion.section>

            <footer className="border-t border-zinc-200 px-8 py-20 md:px-20 bg-white/80 backdrop-blur-sm">
              <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
                <span className="text-xs tracking-[0.1em] font-medium text-zinc-500">© 2026 NNEOUM. All rights reserved.</span>
                <div className="flex gap-6 text-zinc-400">
                  <a href="https://github.com/shfoddlrha-a11y" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Github size={18} /></a>
                  <a href="https://www.instagram.com/nneoum/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Instagram size={18} /></a>
                  <button onClick={() => setIsContactOpen(true)} className="hover:text-black transition-colors"><Mail size={18} /></button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </motion.div>
    </div>
  );
}