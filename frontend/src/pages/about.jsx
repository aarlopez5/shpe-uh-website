/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import shpeSpirit from '../assets/images/SHPESpiritWeb.png';    

export function ScrollTransitionHero() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values for the title - zoom in effect
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 2.5]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  
  // Transform values for the paragraph - just fade in, no zoom
  const paragraphOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* Title Section - Zooms in */}
      <motion.div
        style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
        className="sticky top-0 flex flex-col items-center justify-center min-h-screen overflow-hidden relative"
      >
        {/* Background Image */}
        <img alt="" className="absolute inset-0 w-full h-full object-cover" src={shpeSpirit} />
        
        {/* Clear overlay */}
        <div className="absolute inset-0 bg-white/600 z-0"></div>
        
        <div className="text-center px-4 relative z-10">
          <h1 className="text-[120px] md:text-[200px] leading-none font-bold" style={{ fontFamily: 'Work Sans, sans-serif' }}>
            <span className="text-[#1a2858]">our</span>
            <br />
            <span className="text-[#d33a02] italic">story</span>
          </h1>
        </div>
      </motion.div>

      {/* Paragraph Section - Large rectangle with background */}
      <motion.div
        style={{ opacity: paragraphOpacity }}
        className="sticky top-[20vh] left-0 right-0 flex items-center justify-center px-8"
      >
        <div className="w-full max-w-7xl mx-auto relative overflow-hidden bg-[#1a2858]" style={{ minHeight: '600px' }}>
          {/* SHPE Spirit background image with multiply blend */}
          <img 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover" 
            style={{ mixBlendMode: 'multiply' }} 
            src={shpeSpirit} 
          />
          
          <div className="relative z-10 flex items-center justify-center" style={{ minHeight: '600px', padding: '80px 60px' }}>
            <p style={{ color: 'white', fontSize: 36, fontFamily: 'Work Sans', fontWeight: '500', lineHeight: '1.5', wordWrap: 'break-word' }}>
              The SHPE University of Houston student chapter arose when a local company recruiter influenced a group of motivated Latino students. Both the student and recruiter wanted UH to be represented at the National Technical & Career Conference (NTTC). Upon reaching enough support from fellow students and faculty, Iveth Martinez, the founder, and the rest of the cabinet worked earnestly to build a solid foundation for future success of the chapter. We became recognized as a student chapter by the National Organization on May 11, 2002.
            </p>
          </div>
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
    <div 
      className="py-20 px-8 relative overflow-hidden"
      style={{
        backgroundImage: `url(${shpeSpirit})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* White overlay for visibility */}
      <div className="absolute inset-0 bg-white/90" style={{ mixBlendMode: 'pass-through' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-6xl md:text-8xl font-bold text-center mb-16 text-[#1170b9]">
          Our Pillars
        </h2>

        <div ref={ref} className="relative max-w-5xl mx-auto min-h-[600px]">
          {/* Top row - 3 pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {pillars.slice(0, 3).map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-[#f16635] mb-6 text-center whitespace-pre-line">
                  {pillar.title}
                </h3>
                
                {/* Stacked blue blocks with vertical stripes */}
                <div className="w-full max-w-[200px] space-y-3">
                  {[0, 1].map((blockIndex) => (
                    <div key={blockIndex} className="relative">
                      <div className="bg-[#1a2858] h-24 flex items-center justify-center relative overflow-hidden">
                        {/* Vertical stripes pattern */}
                        <div className="absolute inset-0 flex">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 ${i % 2 === 0 ? 'bg-white/20' : 'bg-transparent'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom row - 2 pillars centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl mx-auto">
            {pillars.slice(3, 5).map((pillar, index) => (
              <motion.div
                key={index + 3}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: (index + 3) * 0.15 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-[#f16635] mb-6 text-center whitespace-pre-line">
                  {pillar.title}
                </h3>
                
                {/* Stacked blue blocks with vertical stripes */}
                <div className="w-full max-w-[200px] space-y-3">
                  {[0, 1].map((blockIndex) => (
                    <div key={blockIndex} className="relative">
                      <div className="bg-[#1a2858] h-24 flex items-center justify-center relative overflow-hidden">
                        {/* Vertical stripes pattern */}
                        <div className="absolute inset-0 flex">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 ${i % 2 === 0 ? 'bg-white/20' : 'bg-transparent'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
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
            <h3 className="text-4xl font-bold mb-6">values</h3>
            <p className="text-sm leading-relaxed">
              FAMILIA: Service, Learning & Diversity, Resilience, and Integrity.
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
      
      {/* Main content with padding for fixed header */}
      <main className="pt-16 relative">
        <ScrollTransitionHero />
        <PillarsSection />
        <VisionSection />
        <EBoardSection />
      </main>
      
    </div>
  );
}