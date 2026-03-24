import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Code, Smartphone, Palette, Server, Table, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import heroPortrait from '../../assets/me/hero.jpeg';

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
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="theme-page overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <PageHero
        eyebrow="Services"
        title="My Services"
        description="Discover modern engineering, design, and consulting services built to strengthen your digital presence with scalable architecture, polished interfaces, and dependable delivery."
        image={heroPortrait}
        imageAlt="Champion Aden portrait"
      />
      {false && (
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
                color: { value: theme === 'dark' ? '#8C6F4E' : '#191970' },
              },
              interactivity: {
                events: { onHover: { enable: true, mode: 'repulse' } },
              },
            }}
          />
        )}
        <div className="theme-hero-scrim" />
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
            style={{ color: 'var(--brand-surface)', zIndex: 1000, fontWeight: 700 }}
            variants={itemVariants}

          >
            Discover cutting-edge solutions designed to elevate your digital presence.
          </motion.p>
        </motion.div>
      </motion.section>
      )}
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
                whileHover={{ y: -10, boxShadow: 'var(--shadow-lifted)' }}
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
                <motion.a
                  href="/contact#contact-form"
                  className="theme-button-primary glow px-4 py-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More <ArrowRight size={16} className="inline ml-2" />
                </motion.a>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="theme-progress-bar fixed bottom-0 left-0 z-50 h-1 w-full"
        style={{ scaleX }}
      />
      <Footer />
    </div>
  );
};

export default Services;

