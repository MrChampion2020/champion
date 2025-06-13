import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaFacebook, FaYoutube, FaInstagram, FaTwitter, FaArrowUp } from 'react-icons/fa';
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
    // { icon: FaFacebook, href: 'https://www.facebook.com/championaden', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://instagram.com/sirchampio_n', label: 'Instagram' },
    { icon: FaTwitter, href: 'https://x.com/sirchampionad', label: 'Twitter' },
  ],
  copyright: `© ${new Date().getFullYear()} Sir Champion Aden | All rights reserved`,
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const iconVariants = {
  hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } },
  tap: { scale: 0.9 },
};

// Footer Component
const Footer = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      className={`relative ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-gray-900 to-blue-950 text-white' 
          : 'bg-gradient-to-b from-gray-100 to-blue-100 text-gray-900'
      } overflow-hidden`}
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      <style>
        {`
          .glassmorphism {
            background: ${theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0.05)'};
            backdrop-filter: blur(10px);
            border: 1px solid ${theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)'};
          }
          .glow-hover:hover {
            box-shadow: 0 0 15px ${theme === 'dark' 
              ? 'rgba(59, 130, 246, 0.5)' 
              : 'rgba(59, 130, 246, 0.3)'};
          }
          .particle-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('../assets/blue.jpg') repeat;
            opacity: ${theme === 'dark' ? '0.1' : '0.05'};
            animation: particles 20s linear infinite;
          }
          @keyframes particles {
            0% { transform: translateY(0); }
            100% { transform: translateY(-100px); }
          }
        `}
      </style>
      <div className="particle-bg" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className={`grid ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'
          } gap-8`}
        >
          {/* Column 1: Logo and Name */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 glassmorphism p-6 rounded-lg"
          >
            <motion.a
              href={CONTENT.logo.href}
              className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              } glow-hover w-[30px] rounded-sm `}
              onClick={() => navigation('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="flex items-center rounded-full"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img src={logo} alt="Logo" className="h-8 w-8 rounded-full" />
              </motion.div>
            </motion.a>
            <p className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>{CONTENT.logo.name}</p>
          </motion.div>

          {/* Column 2: Useful Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 glassmorphism p-6 rounded-6"
          >
            <h2 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-blue-400 border-b border-blue-500' : 'text-blue-600 border-b border-blue-300'
            } pb-2`}>
              {CONTENT.links.title}
            </h2>
            {CONTENT.links.items.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className={`${
                  theme === 'dark' ? 'text-gray-200 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'
                } transition`}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>

          {/* Column 3: Contact Information */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 glassmorphism p-6 rounded-lg"
          >
            <h2 className={`text-xl font-bold ${
              theme === 'dark' ? 'text-blue-400 border-b border-blue-500' : 'text-blue-600 border-b border-blue-300'
            } pb-2`}>
              {CONTENT.contact.title}
            </h2>
            {CONTENT.contact.items.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className={`flex items-center gap-3 ${
                  theme === 'dark' ? 'text-gray-200 hover:text-blue-400' : 'text-gray-800 hover:text-blue-600'
                } transition`}
                variants={itemVariants}
                whileHover={{ x: 5 }}
                aria-label={item.label}
              >
                <item.icon className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={18} />
                <span>{item.value}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar: Socials and Copyright */}
        <motion.div
          className={`flex ${
            isMobile ? 'flex-col' : 'flex-row'
          } justify-between items-center mt-12 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
          } pt-6 gap-6`}
          variants={itemVariants}
        >
          <div className="flex gap-4">
            {CONTENT.socials.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className={`${
                  theme === 'dark' 
                    ? 'text-gray-200 hover:text-blue-400 bg-gray-800/50' 
                    : 'text-gray-800 hover:text-blue-600 bg-gray-200/50'
                } p-2 rounded-full glow-hover`}
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>{CONTENT.copyright}</p>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          onClick={handleBackToTop}
          className={`fixed bottom-8 right-8 p-3 ${
            theme === 'dark' 
              ? 'bg-blue-500 text-white' 
              : 'bg-blue-600 text-white'
          } rounded-full glow-hover`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <FaArrowUp size={20} />
        </motion.button>
      </div>
    </motion.footer>
  );
};

export default Footer;

