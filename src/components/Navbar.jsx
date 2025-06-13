import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Menu, X, Search, Sun, Moon, Mic } from 'lucide-react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useMediaQuery } from 'react-responsive';
import { ThemeContext } from '../screens/context/ThemeContext';
import logo from '../assets/logo.png';
import blue from '../assets/blue.jpg';

// Particle Config
const particleConfig = {
  particles: {
    number: { value: 80 },
    density: { enable: true, area: 800 },
    color: { value: ['#3b82f6', '#9333ea', '#f43f5e'] },
    shape: { type: ['circle', 'triangle', 'star'] },
    opacity: { value: { min: 0.3, max: 0.8 } },
    size: { value: { min: 1, max: 4 } },
    links: { enable: true, distance: 120, color: '#ffffff', opacity: 0.3 },
    move: { enable: true, speed: 3, direction: 'none', outModes: 'bounce' },
  },
  interactivity: {
    events: { 
      onHover: { enable: true, mode: 'bubble' }, 
      onClick: { enable: true, mode: 'repulse' } 
    },
    modes: { 
      bubble: { distance: 150, size: 6, duration: 2, opacity: 0.8 },
      repulse: { distance: 200, duration: 0.4 }
    },
  },
};

// Nav Items
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

// Mock Content Map for Search
const contentMap = [
  { path: '/', name: 'Home', keywords: ['home', 'welcome', 'portfolio', 'champion aden'] },
  { path: '/services', name: 'Services', keywords: ['services', 'web development', 'design', 'consulting'] },
  { path: '/projects', name: 'Projects', keywords: ['projects', 'work', 'case studies', 'development'] },
  { path: '/about', name: 'About', keywords: ['about', 'bio', 'champion aden', 'experience'] },
  { path: '/contact', name: 'Contact', keywords: ['contact', 'get in touch', 'email', 'phone'] },
];

// Animation Variants
const menuVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateX: -45 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotateX: 0, 
    transition: { type: 'spring', stiffness: 120, damping: 15 } 
  },
  exit: { opacity: 0, scale: 0.8, rotateX: 45, transition: { duration: 0.4 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, rotate: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotate: 0, 
    transition: { type: 'spring', stiffness: 150, damping: 20 } 
  },
};

const iconVariants = {
  hover: { 
    scale: 1.5, 
    rotateY: 360, 
    transition: { type: 'spring', stiffness: 400, damping: 10 } 
  },
  tap: { scale: 0.8, rotate: 10 },
  pulse: { 
    scale: [1, 1.2, 1], 
    transition: { repeat: Infinity, duration: 1.2 } 
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceError, setVoiceError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const recognitionRef = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { scrollY } = useScroll();
  const scaleX = useTransform(scrollY, [0, 1000], [0, 1]);
  const y = useTransform(scrollY, [0, 100], [0, -10]);
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });
  const springScaleX = useSpring(scaleX, { stiffness: 100, damping: 20 });

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log('Voice input:', transcript);
        setSearchQuery(transcript);
        setIsSearchOpen(true); // Keep search open to show transcription
        setIsVoiceActive(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
        setVoiceError('Voice recognition failed. Please try again.');
        setIsVoiceActive(false);
        setIsSearchOpen(true); // Show search area even on error
      };

      recognitionRef.current.onend = () => {
        setIsVoiceActive(false);
      };
    } else {
      setVoiceError('Voice recognition is not supported in this browser.');
      setIsSearchOpen(true); // Show search area to display error
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Debug media query
  useEffect(() => {
    console.log('Is mobile:', isMobile);
  }, [isMobile]);

  // Close mobile menu on resize
  useEffect(() => {
    if (!isMobile) setIsOpen(false);
  }, [isMobile]);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Clear voice error after 3 seconds
  useEffect(() => {
    if (voiceError) {
      const timer = setTimeout(() => setVoiceError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [voiceError]);

  // Particles init
  const particlesInit = async (engine) => {
    console.log('Particles initializing');
    await loadSlim(engine);
  };

  // Handle navigation
  const handleNavigation = (path) => {
    console.log('Navigating to:', path);
    navigate(path);
    setIsOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsVoiceActive(false);
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
    if (searchQuery.trim()) {
      const result = contentMap.find((page) =>
        page.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      if (result) {
        handleNavigation(result.path);
      }
    }
  };

  // Handle voice search
  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      setVoiceError('Voice recognition is not supported.');
      setIsSearchOpen(true); // Open search area to show error
      return;
    }
    if (isVoiceActive) {
      recognitionRef.current.stop();
      setIsVoiceActive(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsVoiceActive(true);
        setIsSearchOpen(true); // Open search area when voice search starts
        setVoiceError(null);
        setSearchQuery('');
      } catch (error) {
        console.error('Voice recognition start error:', error);
        setVoiceError('Failed to start voice recognition.');
        setIsVoiceActive(false);
        setIsSearchOpen(true); // Open search area to show error
      }
    }
  };

  // Search results
  const searchResults = contentMap.filter((page) =>
    page.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.nav
      className={`fixed top-0 h-[15%] p-3 left-0 w-full z-50 ${theme === 'dark' 
        ? 'bg-gradient-to-r from-gray-900/40 to-blue-950/40' 
        : 'bg-gradient-to-r from-gray-50/40 to-blue-100/40'
      } backdrop-blur-xl border-b border-gray-700/20`}
      style={{ y: springY, opacity }}
      initial={{ y: -100, scale: 0.9 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <style>
        {`
          :root {
            --neon-blue: #3b82f6;
            --neon-purple: #9333ea;
            --neon-pink: #f43f5e;
          }
          .dark {
            --bg-primary: rgba(17, 24, 39, 0.8);
            --text-primary: #ffffff;
            --accent: var(--neon-blue);
            --icon-color: #ffffff;
          }
          .light {
            --bg-primary: rgba(255, 255, 255, 0.8);
            --text-primary: #111827;
            --accent: var(--neon-purple);
            --icon-color: #374151;
          }
          .holographic-text {
            background: linear-gradient(45deg, #60a5fa, #c084fc, #fb7185);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 15px rgba(96, 165, 250, 0.8), 0 0 25px rgba(192, 132, 252, 0.6);
            font-weight: 700;
          }
          .futuristic-glow {
            background: ${theme === 'dark' 
              ? 'rgba(59, 130, 246, 0.2)' 
              : 'rgba(147, 51, 234, 0.2)'};
            box-shadow: 0 0 20px ${theme === 'dark' 
              ? 'rgba(59, 130, 246, 0.5)' 
              : 'rgba(147, 51, 234, 0.3)'};
            border: 1px solid ${theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)'};
            backdrop-filter: blur(15px);
          }
          .nav-item:hover {
            transform: translateY(-2px);
            text-shadow: 0 0 20px var(--accent), 0 0 30px var(--neon-pink);
          }
          .active-nav::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #60a5fa, #c084fc);
            box-shadow: 0 0 12px #60a5fa, 0 0 20px #c084fc;
            animation: glow-pulse 2s infinite;
          }
          @keyframes glow-pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
          .search-suggestions {
            background: var(--bg-primary);
            border: 2px solid var(--accent);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(10px);
          }
          .search-input {
            background: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
            color: ${theme === 'dark' ? '#ffffff' : '#111827'};
          }
          .search-input::placeholder {
            color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
          }
          .voice-error {
            background: rgba(239, 68, 68, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 50;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          }
          .icon {
            color: var(--icon-color);
          }
          @media (max-width: 400px) {
            .mobile-nav-item {
              font-size: 0.9rem;
              padding: 0.5rem 1rem;
            }
            .mobile-search-input {
              padding: 0.5rem;
              font-size: 0.9rem;
            }
            .mobile-button {
              padding: 0.75rem;
            }
            .mobile-menu-container {
              gap: 0.5rem;
            }
          }
        `}
      </style>
      <Particles
        id="navbar-particles"
        init={particlesInit}
        options={particleConfig}
        className="absolute inset-0 z-0 opacity-60 pointer-events-auto"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Tilt options={{ max: 30, scale: 1.1, perspective: 1000 }}>
              <button
                onClick={() => handleNavigation('/')}
                className="flex items-center gap-2"
                aria-label="Home"
              >
                <motion.img
                  src={logo}
                  alt="Logo"
                  className="h-10 w-10 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                />
                <motion.span
                  className="text-2xl font-extrabold holographic-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  
                </motion.span>
              </button>
            </Tilt>
          </motion.div>

          {!isMobile && (
            <div className="flex items-center space-x-6 relative">
              {navItems.map((item) => (
                <Tilt key={item.name} options={{ max: 20, scale: 1.05, perspective: 800 }}>
                  <motion.button
                    onClick={() => handleNavigation(item.path)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleNavigation(item.path);
                    }}
                    className={`px-4 py-2 text-base font-semibold holographic-text nav-item futuristic-glow rounded-lg ${
                      location.pathname === item.path ? 'active-nav' : ''
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                    tabIndex={0}
                  >
                    {item.name}
                  </motion.button>
                </Tilt>
              ))}
              <motion.button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-3 rounded-full futuristic-glow"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Toggle search"
              >
                <Search size={22} className="icon" />
              </motion.button>
              <motion.button
                onClick={handleVoiceSearch}
                className={`p-3 rounded-full futuristic-glow ${isVoiceActive ? 'animate-pulse' : ''}`}
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                animate={isVoiceActive ? 'pulse' : {}}
                aria-label="Voice search"
              >
                <Mic size={22} className="icon" />
              </motion.button>
              <motion.button
                onClick={toggleTheme}
                className="p-3 rounded-full futuristic-glow"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={22} className="icon" /> : <Moon size={22} className="icon" />}
              </motion.button>
            </div>
          )}

          {isMobile && (
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-full futuristic-glow"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={28} className="icon" /> : <Menu size={28} className="icon" />}
            </motion.button>
          )}
        </div>

        {isSearchOpen && !isMobile && (
          <motion.div
            ref={searchRef}
            className="relative mt-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 150 }}
          >
            <form onSubmit={handleSearch} className="flex items-center">
              <motion.input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search site..."
                className="w-full p-3 pr-10 rounded-full search-input futuristic-glow focus:ring-2 focus:ring-blue-500"
                aria-label="Search"
                animate={isVoiceActive ? { scale: [1, 1.05, 1] } : {}}
                transition={{ repeat: isVoiceActive ? Infinity : 0, duration: 0.6 }}
              />
              <motion.button
                type="submit"
                className="absolute right-2 p-2 rounded-full futuristic-glow"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Submit search"
              >
                <Search size={18} className="icon" />
              </motion.button>
            </form>
            {voiceError && (
              <motion.div
                className="voice-error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {voiceError}
              </motion.div>
            )}
            {searchQuery && searchResults.length > 0 && (
              <motion.ul
                className="absolute top-full left-0 w-full mt-2 rounded-xl search-suggestions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {searchResults.map((result, index) => (
                  <motion.li
                    key={index}
                    className="px-4 py-3 hover:bg-blue-500/20 cursor-pointer holographic-text"
                    onClick={() => handleNavigation(result.path)}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {result.name}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        )}
      </div>

      {isMobile && isOpen && (
        <motion.div
          className={`fixed top-16 left-0 w-full h-[calc(100vh-64px)] ${theme === 'dark' 
            ? 'bg-gray-900/95' 
            : 'bg-gray-50/95'
          } backdrop-blur-2xl z-40`}
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ backgroundImage: `url(${blue})`, backgroundSize: 'cover' }}
        >
          <div className="flex flex-col items-center justify-between h-full py-6 mobile-menu-container">
            <div className="flex flex-col items-center flex-grow justify-center space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNavigation(item.path);
                  }}
                  className={`text-xl font-bold holographic-text futuristic-glow px-5 py-2 rounded-lg mobile-nav-item ${
                    location.pathname === item.path ? 'active-nav' : ''
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  tabIndex={0}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
            <div className="flex flex-col items-center space-y-4 w-full px-4">
              <motion.form
                onSubmit={handleSearch}
                variants={itemVariants}
                className="w-full max-w-sm flex items-center"
              >
                <motion.input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search site..."
                  className="w-full p-3 pr-10 rounded-full search-input futuristic-glow focus:ring-2 focus:ring-blue-500 mobile-search-input"
                  aria-label="Search"
                  animate={isVoiceActive ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: isVoiceActive ? Infinity : 0, duration: 0.6 }}
                />
                <motion.button
                  type="submit"
                  className="absolute right-2 p-2 rounded-full futuristic-glow"
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Submit search"
                >
                  <Search size={18} className="icon" />
                </motion.button>
              </motion.form>
              {voiceError && (
                <motion.div
                  className="voice-error mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {voiceError}
                </motion.div>
              )}
              <div className="flex space-x-4">
                <motion.button
                  onClick={handleVoiceSearch}
                  className={`p-4 rounded-full futuristic-glow mobile-button ${isVoiceActive ? 'animate-pulse' : ''}`}
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  animate={isVoiceActive ? 'pulse' : {}}
                  aria-label="Voice search"
                >
                  <Mic size={24} className="icon" />
                </motion.button>
                <motion.button
                  onClick={toggleTheme}
                  className="p-4 rounded-full futuristic-glow mobile-button"
                  variants={iconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? <Sun size={24} className="icon" /> : <Moon size={24} className="icon" />}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500"
        style={{ scaleX: springScaleX }}
        animate={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)' }}
      />
    </motion.nav>
  );
};

export default Navbar;


