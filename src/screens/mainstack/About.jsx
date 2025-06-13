
import React, { useContext, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Users, Target, Award, TrendingUp, Quote, Code, Shield, Palette } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ThemeContext } from '../../screens/context/ThemeContext';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import me from '../../assets/me.jpg';
import avatar1 from '../../assets/Avatar1.png';
import avatar2 from '../../assets/Avatar2.png';
import avatar3 from '../../assets/Avatar3.png';
import uiux from '../../assets/uiux.jpg';
import dev from '../../assets/dev.jpg';
import cyber from '../../assets/cyber.jpg';

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
      <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
        {char}
      </motion.span>
    ))}
  </span>
);

const stats = [
  { icon: <Users size={24} />, title: 'Clients Served', value: '50+' },
  { icon: <Target size={24} />, title: 'Projects Completed', value: '70+' },
  { icon: <Award size={24} />, title: 'Years of Experience', value: '7+' },
  { icon: <TrendingUp size={24} />, title: 'Client Retention', value: '90%' },
];

const team = [
  {
    name: 'Champion Aden',
    role: 'Full Stack Developer & Cybersecurity Analyst',
    image: me,
  },
  {
    name: 'UI/UX Designer',
    role: 'Creative UI/UX Specialist',
    image: uiux, // Placeholder for cartoon
  },
  {
    name: 'Developer',
    role: 'Code Wizard',
    image: dev, // Placeholder for cartoon
  },
  {
    name: 'Cybersecurity',
    role: 'Security Guardian',
    image: cyber, // Placeholder for cartoon
  },
];

const testimonials = [
  {
    quote: 'Champion, your humility and speed are unmatched! You delivered every detail flawlessly.',
    author: 'Dr. Omoregie, Client',
    avatar: avatar1,
  },
  {
    quote: 'Is mobile app development this easy? Champion made our vision real in record time!',
    author: 'Michael Scott, CEO, Scottified',
    avatar: avatar2,
  },
  {
    quote: 'Champion\'s portfolio site transformed our brand with top-notch TypeScript and React skills!',
    author: 'Mr. Charles, Founder, Prime Procurement',
    avatar: avatar3,
  },
];

const craftedProjects = [
  {
    title: 'E-commerce Ecosystem',
    description: 'A robust platform with real-time inventory and secure payments using MERN stack.',
  },
  {
    title: 'Mobile Chat Innovation',
    description: 'A real-time chat app built with React Native and WebSockets, now in production.',
  },
  {
    title: 'Secure Enterprise Solutions',
    description: 'Custom cybersecurity frameworks protecting client data with cutting-edge tools.',
  },
];

const About = () => {
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
          .cartoon-character {
            width: 150px;
            height: 150px;
            background-size: cover;
            background-position: center;
            border-radius: 50%;
            margin: 0 auto;
            transition: transform 0.3s;
          }
          .cartoon-uiux {
            background-image: url('cartoon-uiux.jpg');
            /* Cartoon: Smiling figure with a palette, wearing a white shirt, blue striped tie, and maroon jacket, holding a sketchpad */
          }
          .cartoon-dev {
            background-image: url('cartoon-dev.jpg');
            /* Cartoon: Focused figure with glasses, white shirt, blue tie, coding on a laptop, maroon jacket over shoulder */
          }
          .cartoon-cyber {
            background-image: url('cartoon-cyber.jpg');
            /* Cartoon: Vigilant figure with a shield, white shirt, blue tie, maroon pants, holding a digital lock */
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
            .cartoon-character { width: 120px; height: 120px; }
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
            <AnimatedText text="About Champion Aden" />
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "white", fontWeight: 700 }}
            variants={itemVariants}
          >
            Step into a world where code meets creativity, and security guards innovation—welcome to my journey!
          </motion.p>
        </motion.div>
      </motion.section>
      {/* Bio Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-8 sm:mb-12"
          variants={itemVariants}
        >
          My Story
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg max-w-3xl mx-auto text-center"
          style={{ color: 'var(--text-secondary)' }}
          variants={itemVariants}
        >
          With over 7 years in the tech industry, I’ve evolved from a curious coder to a Full Stack Developer and Cybersecurity Analyst. My journey began with a passion for solving real-world problems through software, leading me to master the MERN stack, React Native, and advanced security protocols. I thrive at the intersection of innovation and protection, crafting solutions that are both scalable and secure. From building e-commerce platforms to fortifying digital defenses, my work reflects a commitment to excellence and client success.
        </motion.p>
      </motion.section>
      {/* We Crafted Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
        />
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-8 sm:mb-12"
          variants={itemVariants}
        >
          What We’ve Crafted
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {craftedProjects.map((project, index) => (
            <Tilt key={index} options={{ max: 20, scale: 1.05 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-6 text-center"
                whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.section>
      {/* Team Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
        />
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-8 sm:mb-12"
          variants={itemVariants}
        >
          Meet the Developer
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <Tilt key={index} options={{ max: 20, scale: 1.05 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-6 text-center"
                whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
              >
                <div className="cartoon-character" style={{ backgroundImage: member.image.includes('cartoon-') ? `url(${member.image}.jpg)` : `url(${member.image})` }}>
                  {member.image.includes('cartoon-') && (
                    <div className={`glow ${member.image === 'cartoon-uiux' ? 'cartoon-uiux' : member.image === 'cartoon-dev' ? 'cartoon-dev' : 'cartoon-cyber'}`} />
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>
                  {member.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {member.role}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.section>
      {/* Stats Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-8 sm:mb-12"
          variants={itemVariants}
        >
          My Achievements
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 relative z-10">
          {stats.map((stat, index) => (
            <Tilt key={index} options={{ max: 15, scale: 1.03 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-4 sm:p-6 text-center"
                whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
              >
                <motion.div
                  className="mb-2 text-[var(--accent)]"
                  whileHover={{ scale: 1.2 }}
                >
                  {stat.icon}
                </motion.div>
                <p className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {stat.title}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.section>
      {/* Testimonials Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
        />
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-8 sm:mb-12"
          variants={itemVariants}
        >
          What Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {testimonials.map((testimonial, index) => (
            <Tilt key={index} options={{ max: 15, scale: 1.03 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-6 sm:p-8"
                whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {testimonial.author}
                    </p>
                  </div>
                </div>
                <Quote className="text-[var(--accent)] mb-4" size={24} />
                <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                  {testimonial.quote}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.section>
      <motion.div
        className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
        style={{ scaleX }}
      />
      <Footer />
    </div>
  );
};

export default About;