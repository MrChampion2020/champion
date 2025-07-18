import React, { useContext, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Code, Smartphone, Palette, Server, Table, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ThemeContext } from '../../screens/context/ThemeContext';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

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

const AnimatedText = ({ text }) => (
  <span>
    {text.split('').map((char, index) => (
      <motion.span key={index} style={{ display: 'inline-block' }} variants={letterVariants}>
        {char}
      </motion.span>
    ))}
  </span>
);

const services = [
  {
    icon: <Table size={40} />,
    title: 'Freelance Services',
    description: 'Helping teams and businesses create lasting and well-structured platforms remotely 24/7.',
    longDescription: 'I work effortlessly from a remote position, delivering robust solutions for local and international clients.',
  },
  {
    icon: <Code size={40} />,
    title: 'Web Development',
    description: 'Crafting responsive, high-performance web applications using React, Next.js, and modern frameworks.',
    longDescription: 'From single-page apps to complex e-commerce platforms, I deliver scalable solutions with seamless UX.',
  },
  {
    icon: <Smartphone size={40} />,
    title: 'Mobile App Development',
    description: 'Building native and cross-platform mobile apps for iOS and Android with React Native.',
    longDescription: 'I create intuitive mobile experiences with real-time features and offline capabilities.',
  },
  {
    icon: <Palette size={40} />,
    title: 'UI/UX Design',
    description: 'Designing intuitive, visually stunning user interfaces for web and mobile.',
    longDescription: 'My designs prioritize accessibility and engagement, ensuring every pixel enhances user satisfaction.',
  },
  {
    icon: <Server size={40} />,
    title: 'Backend Development',
    description: 'Developing robust server-side applications and APIs with Node.js, MongoDB, PHP, SQL, and Python.',
    longDescription: 'I build secure, high-performance backends to power your applications with reliable data management.',
  },
  {
    icon: <Table size={40} />,
    title: 'Technical Consulting',
    description: 'Offering expert advice on tech stack selection and architecture design.',
    longDescription: 'My consulting services optimize your development process, ensuring scalability and efficiency.',
  },
];

const Services = () => {
  const { theme } = useContext(ThemeContext);
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
            background: linear-gradient(to bottom, rgba(0, 0, 0, ${theme === 'dark' ? 0.7 : 0.1}), rgba(0, 0, 0, ${theme === 'dark' ? 0.7 : 0.1}));
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
            background: radial-gradient(circle, rgba(${theme === 'dark' ? '59, 130, 246' : '147, 51, 234'}, 0.8), transparent);
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
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text mb-4"
            variants={itemVariants}
          >
            <AnimatedText text="My Services" />
          </motion.h1>
          <motion.p
            className="text-base sm:text-xl md:text-xl max-w-1xl mx-auto "
            style={{ color: "white", zIndex: 1000, fontWeight: 700,   }}
            variants={itemVariants}

          >
            Discover cutting-edge solutions designed to elevate your digital presence.
          </motion.p>
        </motion.div>
      </motion.section>
      {/* Services Section */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {services.map((service, index) => (
            <Tilt key={index} options={{ max: 20, scale: 1.05 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-8 text-center"
                whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
              >
                <motion.div
                  className="mb-4 text-[var(--accent)]"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {service.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {service.longDescription}
                </p>
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full glow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More <ArrowRight size={16} className="inline ml-2" />
                </motion.button>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
        style={{ scaleX }}
      />
      <Footer />
    </div>
  );
};

export default Services;
