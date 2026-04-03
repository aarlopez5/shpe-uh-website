/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import shpeSpirit from '../assets/images/SHPESpiritWeb.png';
import pillarImg from '../assets/images/pillar.png'

export function ScrollTransitionHero() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values for the title - zoom in effect
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 2]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  
  // Transform values for the paragraph - just fade in, no zoom
  const paragraphOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  return (
    <div ref={containerRef} className="relative overflow-clip min-h-[150vh]">
      {/* Title Section - Zooms in */}
      <motion.div
        style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
        className="sticky top-0 overflow-hidden max-h-screen flex items-center justify-center"
      >

        <div className="relative z-10 flex min-h-screen items-center justify-center w-full">
          <h1 className="leading-none font-bold flex flex-col" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            <span className="text-[#1a2858] text-[58px] md:text-[116px] left-14 md:left-28 relative">our</span>
            <span 
              className="px-5 pb-5 -mb-5 -mt-6 md:-mt-13 text-[150px] md:text-[298px] italic" 
              style={{ 
                backgroundImage: `linear-gradient(rgba(211,58,2,0.95), rgba(211,58,2,0.95)), url(${shpeSpirit})`,
                backgroundBlendMode: 'multiply',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              story
            </span>
          </h1>
        </div>
      </motion.div>

      {/* Paragraph Section - Large rectangle with background */}
      <motion.div
        style={{ opacity: paragraphOpacity }}
        className="relative w-full md:min-h-screen min-h-[60vh] flex items-center justify-center overflow-hidden bg-[#1a2858]"
      >
        {/* background image */}
        <img
          alt=""
          src={shpeSpirit}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: "multiply" }}
        />

        {/* content */}
        <div className="relative z-10 w-full max-w-5xl px-6 md:p-0">
          <p
            className="text-center text-xl md:text-2xl lg:text-4xl text-white font-medium leading-snug"
            style={{ fontFamily: "Work Sans, sans-serif" }}
          >
            The SHPE University of Houston student chapter arose when a local company recruiter influenced a group of motivated Latino students. Both the student and recruiter wanted UH to be represented at the National Technical & Career Conference (NTTC). Upon reaching enough support from fellow students and faculty, Iveth Martinez, the founder, and the rest of the cabinet worked earnestly to build a solid foundation for future success of the chapter. We became recognized as a student chapter by the National Organization on May 11, 2002.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

/* PILLARS */
const pillars = [
  {
    title: 'Chapter\nDevelopment',
    position: 'top-left'
  },
  {
    title: 'Academic\nDevelopment',
    position: 'top-center'
  },
  {
    title: 'Community\nDevelopment',
    position: 'top-right'
  },
  {
    title: 'Professional\nDevelopment',
    position: 'bottom-left'
  },
  {
    title: 'Leadership\nDevelopment',
    position: 'bottom-right'
  }
];

export function PillarsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="md:my-15 my-8 px-8 relative overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-6xl md:text-8xl font-bold text-center mb-8 text-[#1170b9]">
          Our Pillars
        </h2>
        <p className="text-[#71AABF] text-xl md:text-4xl font-bold text-center mb-8">Here at SHPE-UH, we strive to advance our mission of empowering the Hispanic community by focusing on our 5 Core Pillars.</p>

        <div className='md:my-20 text-l md:text-3xl font-bold text-[#f16635]'>
          <div ref={ref} className="relative max-w-5xl mx-auto">
            {/* Top row - 3 pillars */}
            <div className="grid grid-cols-3 gap-12 md:mb-12 mb-6">
              {pillars.slice(0, 3).map((pillar, index) => (
                
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center"
                >
                  <h3 className="mb-3 text-center whitespace-pre-line">
                    {pillar.title}
                  </h3>
                  <img alt='Pillar' src={pillarImg} className='md:w-[10vw] w-[20vw]' />
                </motion.div>
              ))}
            </div>

            {/* Bottom row - 2 pillars centered */}
            <div className="grid grid-cols-2 md:gap-12 md:max-w-2xl max-w-md mx-auto">
              {pillars.slice(3, 5).map((pillar, index) => (
                <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: (index + 3) * 0.15 }}
                className="flex flex-col items-center"
                >
                  <h3 className="mb-3 text-center whitespace-pre-line">
                    {pillar.title}
                  </h3>
                  <img alt='Pillar' src={pillarImg} className='md:w-[10vw] w-[20vw]' />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* VISION */
export function VisionSection() {
  return (
    <div className="bg-gradient-to-b from-[#c2410c] to-[#ea580c] py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          {/* Vision */}
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-bold mb-6">Vision</h3>
            <p className="text-sm leading-relaxed">
              SHPE's vision is a world where Hispanics are highly valued and influential as the leading innovators, scientists, mathematicians, and engineers.
            </p>
          </div>

          {/* Values */}
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-bold mb-6">Values</h3>
            <p className="text-sm leading-relaxed">
              Familia, Service, Learning & Diversity, Resilience, and Integrity.
            </p>
          </div>

          {/* Mission */}
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-bold mb-6">Mission</h3>
            <p className="text-sm leading-relaxed">
              SHPE changes lives by empowering the Hispanic community to realize their fullest potential and to impact the world through STEM awareness, access, support, and professional development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


/* E-BOARD */

const boardMembers = [
  { name: 'Name Lastname', position: 'Position' },
  { name: 'Name Lastname', position: 'Position' },
  { name: 'Name Lastname', position: 'Position' },
  { name: 'Name Lastname', position: 'Position' },
  { name: 'Name Lastname', position: 'Position' },
  { name: 'Name Lastname', position: 'Position' }
];

export function EBoardSection() {
  return (
    <div className="bg-white py-20 px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#0891b2]">
          Meet the 2025-2026 E-Board!
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {boardMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-[#c2410c]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="font-bold text-[#c2410c] text-center">{member.name}</h4>
              <p className="text-sm text-gray-600 text-center">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ABOUT PAGE */
export default function About() {
  return (
    <div className="size-full relative">
      <main>
        <ScrollTransitionHero />
        <PillarsSection />
        <VisionSection />
        <EBoardSection />
      </main>
      
    </div>
  );
}