import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import shpeSpirit from '../assets/images/SHPESpiritWeb.png';
import BASF      from '../assets/images/sponsors/basf.png';
import CONOCO    from '../assets/images/sponsors/conocophillips.png';
import BP        from '../assets/images/sponsors/bp.png';
import CAT       from '../assets/images/sponsors/cat.png';
import ABB       from '../assets/images/sponsors/abb.png';
import WILLIAMS  from '../assets/images/sponsors/williams.png';
import BURNS     from '../assets/images/sponsors/burns.png';
import FRITOLAY  from '../assets/images/sponsors/fritolay.png';
import SHPE_LOGO from '../assets/images/sponsors/shpe-logo.png';

const sponsors = [
  { name: 'BASF',           logo: BASF },
  { name: 'ConocoPhillips', logo: CONOCO },
  { name: 'BP',             logo: BP },
  { name: 'Caterpillar',    logo: CAT },
  { name: 'ABB',            logo: ABB },
  { name: 'Williams',       logo: WILLIAMS },
  { name: 'Burns McDonnell',logo: BURNS },
  { name: 'Frito Lay',      logo: FRITOLAY },
];

function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-[#1a2858]">
      <img
        src={shpeSpirit}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ mixBlendMode: 'multiply' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-20 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1">
          <h1
            className="font-bold leading-none text-center"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
          >
            <span className="block text-[110px] md:text-[200px] text-[#d33a02] tracking-tight">
              Thank
            </span>
            <span className="block text-[130px] md:text-[320px] text-[#d33a02] tracking-tight -mt-6 md:-mt-12">
              YOU
            </span>
          </h1>
        </div>

        <div className="flex-1">
          <p
            className="text-white text-lg md:text-2xl font-medium leading-relaxed"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
          >
            To all of our sponsors, we appreciate you for your continuous support
            and generosity in helping us advance our mission of empowering the
            Hispanic Community to realize their fullest potential. Without your
            constant aid and interest in the goals of SHPE-University of Houston,
            we would not be able to provide all the beneficial events and resources
            that allow our members to develop themselves in their academic and
            professional careers.
          </p>
        </div>
      </div>
    </div>
  );
}

function SponsorsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div className="bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-5xl md:text-7xl font-bold text-center text-[#003A70] mb-16"
          style={{ fontFamily: 'Work Sans, sans-serif' }}
        >
          Our Sponsors
        </h2>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center">
          {sponsors.map((sponsor, i) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center justify-center p-4"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-h-24 max-w-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to backend
  };

  return (
    <div className="bg-white py-20 px-8 border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-start">

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              className="text-[#1170b9] font-semibold text-xl"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g., email@example.com"
              value={form.email}
              onChange={handleChange}
              className="bg-[#71aabf54] rounded-xl px-6 py-4 text-[#003a706e] placeholder-[#003a706e]/50 font-medium text-lg outline-none"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-[#1170b9] font-semibold text-xl"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              placeholder="e.g., Support"
              value={form.subject}
              onChange={handleChange}
              className="bg-[#71aabf54] rounded-xl px-6 py-4 text-[#003a706e] placeholder-[#003a706e]/50 font-medium text-lg outline-none"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-[#1170b9] font-semibold text-xl"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            >
              Your Message
            </label>
            <textarea
              name="message"
              placeholder="Enter text here"
              value={form.message}
              onChange={handleChange}
              rows={6}
              className="bg-[#71aabf54] rounded-xl px-6 py-4 text-[#003a706e] placeholder-[#003a706e]/50 font-medium text-lg outline-none"
              style={{ fontFamily: 'Work Sans, sans-serif' }}
            />
          </div>

          <button type="submit" className="primaryBtn self-start px-8 py-3 text-lg">
            Send Message
          </button>
        </form>

        {/* Right side */}
        <div className="flex-1 flex flex-col items-center gap-6 text-center">
          <img src={SHPE_LOGO} alt="SHPE UH" className="w-48 h-48 object-contain" />
          <h3
            className="text-3xl md:text-5xl font-bold text-[#003A70]"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
          >
            Interested in sponsoring <br /> 
            <p className='leading-15'>SHPE‑UH?</p>
          </h3>
          <p
            className="text-[#71AABF] text-xl md:text-2xl font-medium"
            style={{ fontFamily: 'Work Sans, sans-serif' }}
          >
            Send us a message and we'll get back to you shortly.
          </p>
        </div>

      </div>
    </div>
  );
}

export default function Sponsors() {
  return (
    <div className="size-full relative">
      <HeroSection />
      <SponsorsGrid />
      <ContactSection />
    </div>
  );
}
