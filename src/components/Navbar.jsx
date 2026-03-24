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

// Particle Config
const particleConfig = {
  particles: {
    number: { value: 80 },
    density: { enable: true, area: 800 },
    color: { value: ['#191970', '#8C6F4E', '#ECEFF1'] },
    shape: { type: ['circle', 'triangle', 'star'] },
    opacity: { value: { min: 0.3, max: 0.8 } },
    size: { value: { min: 1, max: 4 } },
    links: { enable: true, distance: 120, color: '#ECEFF1', opacity: 0.24 },
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
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

// Mock Content Map for Search
const contentMap = [
  { path: '/', name: 'Home', keywords: ['home', 'welcome','development', 'mobile apps', 'web development', 'react js', 'react', 'portfolio', 'champion aden', 'aden', 'footer', 'blog', 'contact', 'information', 'email', 'phone', 'x'] },
  { path: '/services', name: 'Services', keywords: ['services', 'web development', 'design', 'consulting', 'development', 'mobile apps', 'web development', 'react js', 'react'] },
  { path: '/projects', name: 'Projects', keywords: ['projects', 'work', 'case studies', 'development', 'mobile apps', 'web development', 'react js', 'react'] },
  { path: '/blog', name: 'Blog', keywords: ['blog', 'techcrunch', 'tech news', 'development news', 'startup news', 'engineering', 'software', 'technology'] },
  { path: '/about', name: 'About', keywords: ['about', 'bio', 'champion aden', 'experience', 'contact', 'information', 'email', 'phone', 'x', 'development', 'mobile apps', 'web development', 'react js', 'react'] },
  { path: '/contact', name: 'Contact', keywords: ['contact', 'get in touch', 'email', 'phone', 'contact', 'information', 'email', 'x', 'development', 'mobile apps', 'web development', 'react js', 'react'] },
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
  const opacity = useTransform(scrollY, [0, 100], [1, 0.94]);
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
        setIsSearchOpen(true); // Keep search open on desktop
        if (isMobile) setIsOpen(true); // Ensure mobile menu is open
        setIsVoiceActive(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
        setVoiceError('Voice recognition failed. Please try again.');
        setIsVoiceActive(false);
        setIsSearchOpen(true); // Show search area on desktop
        if (isMobile) setIsOpen(true); // Show mobile menu
      };

      recognitionRef.current.onend = () => {
        setIsVoiceActive(false);
      };
    } else {
      setVoiceError('Voice recognition is not supported in this browser.');
      setIsSearchOpen(true); // Show search area on desktop
      if (isMobile) setIsOpen(true); // Show mobile menu
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isMobile]);

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
      setIsSearchOpen(true); // Open search area on desktop
      if (isMobile) setIsOpen(true); // Open mobile menu
      return;
    }
    if (isVoiceActive) {
      recognitionRef.current.stop();
      setIsVoiceActive(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsVoiceActive(true);
        setIsSearchOpen(true); // Open search area on desktop
        if (isMobile) setIsOpen(true); // Open mobile menu
        setVoiceError(null);
        setSearchQuery('');
      } catch (error) {
        console.error('Voice recognition start error:', error);
        setVoiceError('Failed to start voice recognition.');
        setIsVoiceActive(false);
        setIsSearchOpen(true); // Open search area on desktop
        if (isMobile) setIsOpen(true); // Open mobile menu
      }
    }
  };

  // Search results
  const searchResults = contentMap.filter((page) =>
    page.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 z-50 w-full theme-nav-shell"
      style={{ y: springY, opacity }}
      initial={{ y: -100, scale: 0.9 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <Particles
        id="navbar-particles"
        init={particlesInit}
        options={particleConfig}
        className="absolute inset-0 z-0 opacity-60 pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
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
                  Sir Champion
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
                    className={`px-4 py-2 text-base nav-item theme-nav-link futuristic-glow rounded-lg ${
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
                className="w-full rounded-full p-3 pr-10 search-input"
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
                    className="cursor-pointer px-4 py-3 theme-nav-link"
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
          className="fixed left-0 top-20 z-40 h-[calc(100vh-5rem)] w-full backdrop-blur-2xl"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ background: 'linear-gradient(180deg, var(--nav-shell), var(--bg-secondary))' }}
        >
          <div className="flex flex-col items-center justify-between h-full py-6 mobile-menu-container">
            <div className="flex flex-col items-center flex-grow justify-center space-y-3">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNavigation(item.path);
                  }}
                  className={`max-w-xs w-full rounded-xl px-6 py-2.5 text-lg font-bold theme-nav-link futuristic-glow mobile-nav-item ${
                    location.pathname === item.path ? 'active-nav' : ''
                  }`}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  tabIndex={0}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>
            <div className="flex flex-col items-center space-y-3 w-full px-4">
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
                  className="mobile-search-input w-full rounded-full p-3 pr-10 search-input"
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
        className="theme-progress-bar absolute bottom-0 left-0 h-1.5 w-full"
        style={{ scaleX: springScaleX }}
        animate={{ boxShadow: '0 0 18px rgba(140, 111, 78, 0.28)' }}
      />
    </motion.nav>
  );
};

export default Navbar;
