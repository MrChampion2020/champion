import React, { useContext, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaInstagram, FaTwitter, FaArrowUp } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { ThemeContext } from '../screens/context/ThemeContext';
import logo from "../assets/logo.png"

// Content Constants
const CONTENT = {
  logo: {
    initial: 'CA',
    name: 'Sir Champion Aden',
    href: '/',
  },
  links: {
    title: 'Useful Links',
    items: [
      { label: 'Projects', href: '/projects' },
      { label: 'About Me', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  contact: {
    title: 'Contact Information',
    items: [
      { icon: FaMapMarkerAlt, label: 'Address', value: '101, Ajah, Lagos, Nigeria', href: '#' },
      { icon: FaPhoneAlt, label: 'Phone', value: '+2349030155327', href: 'tel:+2349030155327' },
      { icon: FaEnvelope, label: 'Email', value: 'championaden.ca@gmail.com', href: 'mailto:championaden.ca@gmail.com' },
      { icon: FaGlobe, label: 'Website', value: 'www.championaden.online', href: 'https://www.championaden.online' },
    ],
  },
  socials: [
    { icon: FaInstagram, href: 'https://instagram.com/sirchampio_n', label: 'Instagram' },
    { icon: FaTwitter, href: 'https://x.com/sirchampionad', label: 'Twitter' },
  ],
  copyright: `© ${new Date().getFullYear()} Sir Champion Aden | All rights reserved`,
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0, rotateX: -45 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
      duration: 0.8,
    },
  },
};

const iconVariants = {
  hover: {
    scale: 1.3,
    rotateY: 180,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  tap: { scale: 0.8 },
};

const particleVariants = {
  animate: {
    y: [-100, 100],
    opacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
      duration: Math.random() * 5 + 5,
      ease: 'easeInOut',
    },
  },
};

// Particle Component
const Particle = () => (
  <motion.div
    className="absolute w-2 h-2 bg-blue-400 rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    variants={particleVariants}
    animate="animate"
  />
);

const Footer = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      ref={ref}
      className={`relative ${theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-100 to-purple-100 text-gray-900'
      } overflow-hidden py-20`}
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: false }}
    >
      <style>
        {`
          .futuristic-glow {
            background: ${theme === 'dark' 
              ? 'rgba(59, 130, 246, 0.2)' 
              : 'rgba(59, 130, 246, 0.1)'};
            box-shadow: 0 0 20px ${theme === 'dark' 
              ? 'rgba(59, 130, 246, 0.6)' 
              : 'rgba(59, 130, 246, 0.3)'};
            border: 1px solid ${theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'rgba(0, 0, 0, 0.1)'};
            backdrop-filter: blur(15px);
          }
          .hover-glow:hover {
            box-shadow: 0 0 30px ${theme === 'dark' 
              ? 'rgba(59, 130, 246, 0.8)' 
              : 'rgba(59, 130, 246, 0.5)'};
            transform: translateY(-5px);
          }
          .particle-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
          }
          .holographic-text {
            background: linear-gradient(
              45deg,
              ${theme === 'dark' ? '#3b82f6, #a855f7' : '#2563eb, #9333ea'}
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
        `}
      </style>

      {/* Particle Background */}
      <div className="particle-container">
        {[...Array(20)].map((_, i) => (
          <Particle key={i} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`grid ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'
          } gap-8`}
        >
          {/* Column 1: Logo and Name */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6 futuristic-glow p-8 rounded-xl hover-glow"
            style={{ y: parallaxY }}
          >
            <motion.a
              href={CONTENT.logo.href}
              className="flex items-center gap-3 holographic-text text-4xl font-extrabold"
              onClick={() => navigation('/')}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={logo}
                alt="Logo"
                className="h-12 w-12 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              {/* {CONTENT.logo.initial} */}
            </motion.a>
            <motion.p
              className={`text-lg font-semibold ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}
              style={{ opacity: glowOpacity }}
            >
              {CONTENT.logo.name}
            </motion.p>
          </motion.div>

          {/* Column 2: Useful Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6 futuristic-glow p-8 rounded-xl hover-glow"
            style={{ y: parallaxY }}
          >
            <h2 className={`text-2xl font-bold holographic-text border-b pb-3`}>
              {CONTENT.links.title}
            </h2>
            {CONTENT.links.items.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className={`text-lg ${theme === 'dark' ? 'text-gray-200 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'} transition-all`}
                variants={itemVariants}
                whileHover={{ x: 10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Column 3: Contact Information */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-6 futuristic-glow p-8 rounded-xl hover-glow"
            style={{ y: parallaxY }}
          >
            <h2 className={`text-2xl font-bold holographic-text border-b pb-3`}>
              {CONTENT.contact.title}
            </h2>
            {CONTENT.contact.items.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className={`flex items-center gap-4 text-lg ${theme === 'dark' ? 'text-gray-200 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'} transition-all`}
                variants={itemVariants}
                whileHover={{ x: 10, scale: 1.05 }}
                aria-label={item.label}
              >
                <motion.div variants={iconVariants} whileHover="hover" whileTap="tap">
                  <item.icon className="text-blue-500" size={24} />
                </motion.div>
                <span>{item.value}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar: Socials and Copyright */}
        <motion.div
          className={`flex ${
            isMobile ? 'flex-col' : 'flex-row'
          } justify-between items-center mt-16 border-t ${
            theme === 'dark' ? 'border-blue-900/50' : 'border-blue-200/50'
          } pt-8 gap-8`}
          variants={itemVariants}
        >
          <div className="flex gap-6">
            {CONTENT.socials.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className={`p-3 rounded-full futuristic-glow hover-glow ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label={social.label}
              >
                <social.icon size={28} />
              </motion.a>
            ))}
          </div>
          <motion.p
            className={`text-sm holographic-text`}
            style={{ opacity: glowOpacity }}
          >
            {CONTENT.copyright}
          </motion.p>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          onClick={handleBackToTop}
          className={`fixed bottom-10 right-10 p-4 futuristic-glow rounded-full hover-glow`}
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: useTransform(scrollYProgress, [0, 1], [0, -20]) }}
          aria-label="Back to top"
        >
          <FaArrowUp size={24} className="text-white" />
        </motion.button>
      </div>
    </motion.footer>
  );
};

export default Footer;


