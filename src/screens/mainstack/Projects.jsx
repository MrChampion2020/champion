import React, { useState, useContext, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { X, ExternalLink } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ThemeContext } from '../../screens/context/ThemeContext';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
// Placeholder images (replace with actual assets)
import delivery from '../../assets/delivery.jpeg';
import catchup from '../../assets/catchup.png';
import primeprocurement from '../../assets/primepro.png';
import shopfast from '../../assets/shopfast.png';
import Feeda from '../../assets/Feeda.png';
import portfolio from '../../assets/portfolio.png';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.4, staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

const AnimatedText = ({ text }) => (
  <span>
    {text.split('').map((char, index) => (
      <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
        {char}
      </motion.span>
    ))}
  </span>
);

// Project Data from CONTENT
const projects = [
  {
    title: 'Delivery App',
    description: 'A scalable delivery platform built with MERN stack, featuring secure payments and user authentication.',
    image: delivery,
    link: 'https://expo.dev/artifacts/eas/jwurCuUxhKGd9GswnjU2Pw.apk',
  },
  {
    title: 'Node.js Chat Application',
    description: 'A real-time chat application using Node.js, Express, and WebSockets for seamless communication.',
    image: catchup,
    link: 'https://catchup-eight.vercel.app',
  },
  {
    title: 'Prime Procurement Website',
    description: 'A professional company portfolio website showcasing services, built with modern web technologies.',
    image: primeprocurement,
    link: 'https://www.primeprocurementus.com',
  },
  {
    title: 'ShopFast E-commerce',
    description: 'An interactive e-commerce platform with secure payment options and user accounts.',
    image: shopfast,
    link: 'https://shopfast-gilt.vercel.app',
  },
  {
    title: 'Feeda',
    description: 'A modern real-time Mobile chat app with a clean UI, powered by Node.js and WebSockets. react native with typescript, in production now',
    image: Feeda,
    link: '', // No link provided
  },
  {
    title: 'Personal Portfolio',
    description: 'A TypeScript-based portfolio showcasing my skills and projects.',
    image: portfolio,
    link: 'https://me.championaden.online',
  },
];

const Projects = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedProject, setSelectedProject] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [particlesInit, setParticlesInit] = useState(false);

  const initParticles = useCallback(async (engine) => {
    await loadSlim(engine);
    setParticlesInit(true);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} overflow-x-hidden`}>
      <style>
        {`
          :root {
            --neon-blue: #3b82f6;
            --neon-purple: #9333ea;
          }
          .dark {
            --card-bg: rgba(17, 24, 39, 0.7);
            --text-primary: #ffffff;
            --text-secondary: #d1d5db;
            --accent: var(--neon-blue);
          }
          .light {
            --card-bg: rgba(255, 255, 255, 0.8);
            --text-primary: #111827;
            --text-secondary: #4b5563;
            --accent: var(--neon-purple);
          }
          .glass-card {
            background: var(--card-bg);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          }
          .glow {
            box-shadow: 0 0 15px var(--accent);
          }
          .gradient-text {
            background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .parallax-bg {
            background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
            opacity: 0.1;
          }
          .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, ${theme === 'dark' ? 0.7 : 0.3}), rgba(0, 0, 0, ${theme === 'dark' ? 0.7 : 0.1}));
            overflow: hidden;
            z-index: 0;
          }
          .tech-wheel {
            position: absolute;
            border-radius: 50%;
            border: 2px dashed ${theme === 'dark' ? '#3b82f6' : '#9333ea'};
            animation: spin 15s linear infinite;
            opacity: 0.5;
            max-width: 100%;
            max-height: 100%;
            box-sizing: border-box;
          }
          .tech-wheel:nth-child(1) {
            width: min(300px, 40vw);
            height: min(300px, 40vw);
            top: 10%;
            left: clamp(5%, 15%, 20%);
            animation-duration: 20s;
          }
          .tech-wheel:nth-child(2) {
            width: min(200px, 30vw);
            height: min(200px, 30vw);
            top: 60%;
            right: clamp(5%, 20%, 25%);
            animation-duration: 25s;
            animation-direction: reverse;
          }
          .shade-gradient {
            position: absolute;
            width: min(400px, 50vw);
            height: min(400px, 50vw);
            background: radial-gradient(circle, rgba(${theme === 'dark' ? '59, 130, 246' : '147, 51, 234'}, 0.3), transparent);
            opacity: 0.4;
            animation: pulse 10s ease-in-out infinite;
            max-width: 100%;
            max-height: 100%;
            box-sizing: border-box;
          }
          .shade-gradient:nth-child(1) {
            top: 20%;
            left: clamp(20%, 30%, 40%);
            animation-delay: 2s;
          }
          .shade-gradient:nth-child(2) {
            bottom: 15%;
            right: clamp(15%, 25%, 35%);
            animation-delay: 5s;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.2); opacity: 0.6; }
            100% { transform: scale(1); opacity: 0.4; }
          }
          @media (max-width: 640px) {
            .tech-wheel:nth-child(1) {
              width: min(200px, 50vw);
              height: min(200px, 50vw);
              top: 5%;
              left: 10%;
            }
            .tech-wheel:nth-child(2) {
              width: min(150px, 40vw);
              height: min(150px, 40vw);
              top: 50%;
              right: 10%;
            }
            .shade-gradient {
              width: min(300px, 70vw);
              height: min(300px, 70vw);
            }
            .shade-gradient:nth-child(1) {
              top: 15%;
              left: 20%;
            }
            .shade-gradient:nth-child(2) {
              bottom: 10%;
              right: 20%;
            }
          }
        `}
      </style>
      <Navbar />
      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-background">
          <div className="tech-wheel"></div>
          <div className="tech-wheel"></div>
          <div className="shade-gradient"></div>
          <div className="shade-gradient"></div>
        </div>
        {particlesInit && (
          <Particles
            id="tsparticles"
            init={initParticles}
            options={{
              particles: {
                number: { value: 50 },
                size: { value: 3 },
                move: { speed: 0.5 },
                links: { enable: true, distance: 150, opacity: 0.4 },
                color: { value: theme === 'dark' ? '#3b82f6' : '#9333ea' },
              },
              interactivity: {
                events: { onHover: { enable: true, mode: 'repulse' } },
              },
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}
        />
        <motion.div
          className="relative z-10 text-center max-w-full px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold gradient-text mb-4"
            variants={itemVariants}
          >
            <AnimatedText text="Featured Projects" />
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-1xl mx-auto"
            style={{ color: "white", fontWeight: 700}}
            variants={itemVariants}
          >
            Explore our innovative solutions crafted with cutting-edge technologies.
          </motion.p>
        </motion.div>
      </motion.section>
      {/* Projects Section */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {projects.map((project, index) => (
            <Tilt key={index} options={{ max: 20, scale: 1.05, perspective: 1000 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="p-6">
                  <motion.h3
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                    whileHover={{ color: 'var(--accent)' }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.div>
      {/* Full-Screen Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="glass-card rounded-2xl p-8 max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
          >
            <motion.button
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 glow"
              onClick={() => setSelectedProject(null)}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} style={{ color: 'var(--text-primary)' }} />
            </motion.button>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              />
              <div className="flex flex-col justify-between">
                <div>
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold mb-4 gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedProject.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm md:text-base mb-6"
                    style={{ color: 'var(--text-secondary)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {selectedProject.description}
                  </motion.p>
                </div>
                <div className="flex space-x-4">
                  {selectedProject.link && (
                    <motion.a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white glow flex items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Preview Project <ExternalLink size={16} className="ml-2" />
                    </motion.a>
                  )}
                  <motion.button
                    className="px-6 py-3 rounded-full bg-gray-700/50 text-white glow"
                    onClick={() => setSelectedProject(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
        style={{ scaleX }}
      />
      <Footer />
    </div>
  );
};

export default Projects;