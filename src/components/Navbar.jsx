import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Menu, X, Search, Sun, Moon } from 'lucide-react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useMediaQuery } from 'react-responsive';
import { ThemeContext } from '../screens/context/ThemeContext';
import logo from '../assets/logo.png';
import blue from '../assets/blue.jpg';

// Particle Config
const particleConfig = {
  particles: {
    number: { value: 50 },
    density: { enable: true, area: 800 },
    color: { value: ['#3b82f6', '#9333ea'] },
    shape: { type: 'circle' },
    opacity: { value: 0.5 },
    size: { value: { min: 1, max: 3 } },
    links: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4 },
    move: { enable: true, speed: 2, direction: 'none', outModes: 'out' },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'repulse' }, onClick: { enable: true, mode: 'push' } },
    modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
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
  { path: '/contact', name: 'Contact', keywords: ['contact', 'get in touch', 'email', 'navbar' ]},
];

// Animation Variants
const menuVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  exit: { opacity: 0, x: '100%', transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

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

  // Particles init
  const particlesInit = async (engine) => {
    console.log('Particles initializing');
    await loadSlim(engine);
  };

  // Handle navigation with debug
  const handleNavigation = (path) => {
    console.log('Navigating to:', path);
    navigate(path);
    setIsOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
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

  // Search results
  const searchResults = contentMap.filter((page) =>
    page.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-gray-900/30 backdrop-blur-lg border-b border-gray-700/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <style>
        {`
          :root {
            --neon-blue: #3b82f6;
            --neon-purple: #9333ea;
          }
          .dark {
            --bg-primary: #111827;
            --text-primary: #ffffff;
            --accent: var(--neon-blue);
          }
          .light {
            --bg-primary: #ffffff;
            --text-primary: #ffffff; /* Changed to white for nav items */
            --accent: var(--neon-purple);
          }
          .navbar {
            background: linear-gradient(90deg, rgba(17, 24, 39, 0.3), rgba(17, 24, 39, 0.5));
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
          }
          .nav-item {
            color: #ffffff; /* Force white color for all nav items */
            transition: all 0.3s ease;
          }
          .nav-item:hover {
            background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          }
          .active-nav {
            position: relative;
            color: #ffffff; /* Force white color for active nav */
          }
          .active-nav::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
            box-shadow: 0 0 8px var(--neon-blue);
          }
          .glow {
            box-shadow: 0 0 15px var(--accent);
          }
          .search-suggestions {
            background: var(--bg-primary);
            border: 1px solid var(--accent);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }
          .search-input {
            color: #ffffff !important; /* Force white text for search input */
          }
          .search-input::placeholder {
            color: rgba(255, 255, 255, 0.7); /* White placeholder with slight opacity */
          }
        `}
      </style>
      <Particles
        id="navbar-particles"
        init={particlesInit}
        options={particleConfig}
        className="absolute inset-0 z-0 opacity-80 pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Tilt options={{ max: 25, scale: 1.05 }}>
              <button
                onClick={() => handleNavigation('/')}
                className="flex items-center"
                aria-label="Home"
              >
                <img src={logo} alt="Logo" className="h-8 w-8 rounded-full" />
              </button>
            </Tilt>
          </motion.div>

          {!isMobile && (
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Tilt key={item.name} options={{ max: 15, scale: 1.03 }}>
                  <motion.button
                    onClick={() => {
                      console.log('Nav item clicked:', item.name);
                      handleNavigation(item.path);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        console.log('Nav item Enter key:', item.name);
                        handleNavigation(item.path);
                      }
                    }}
                    className={`px-3 py-2 text-sm font-medium nav-item ${location.pathname === item.path ? 'active-nav' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                    tabIndex={0}
                  >
                    {item.name}
                  </motion.button>
                </Tilt>
              ))}
              <motion.button
                onClick={() => {
                  console.log('Search toggled');
                  setIsSearchOpen(!isSearchOpen);
                }}
                className="p-2 rounded-full bg-gray-200/50 glow"
                whileHover={{ rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle search"
              >
                <Search size={20} />
              </motion.button>
              <motion.button
                onClick={() => {
                  console.log('Theme toggled');
                  toggleTheme();
                }}
                className="p-2 rounded-full bg-gray-200/50 glow"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            </div>
          )}

          {isMobile && (
            <motion.button
              onClick={() => {
                console.log('Mobile menu toggled');
                setIsOpen(!isOpen);
              }}
              className="p-2 rounded-full bg-gray-200/50 glow"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          )}
        </div>

        {isSearchOpen && !isMobile && (
          <motion.div
            ref={searchRef}
            className="relative mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search site..."
                className="w-full p-2 rounded-full bg-gray-200/50 border border-gray-600 focus:border-blue-500 focus:ring-blue-500 search-input"
                aria-label="Search"
              />
            </form>
            {searchQuery && searchResults.length > 0 && (
              <motion.ul
                className="absolute top-full left-0 w-full mt-1 rounded-lg search-suggestions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {searchResults.map((result, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-800/50 cursor-pointer"
                    onClick={() => {
                      console.log('Search result clicked:', result.name);
                      handleNavigation(result.path);
                    }}
                  >
                    {result.name}
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        )}
      </div>

      {isMobile && isOpen && (
        <motion.div
          className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-gray-900/95 backdrop-blur-lg z-40"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ backgroundImage: `url(${blue})`, backgroundSize: 'cover' }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  console.log('Mobile nav item clicked:', item.name);
                  handleNavigation(item.path);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    console.log('Mobile nav item Enter key:', item.name);
                    handleNavigation(item.path);
                  }
                }}
                className={`text-xl font-medium nav-item ${location.pathname === item.path ? 'active-nav' : ''}`}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                tabIndex={0}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.form
              onSubmit={handleSearch}
              variants={itemVariants}
              className="w-3/4"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search site..."
                className="w-full p-2 rounded-full bg-gray-800/50 border border-gray-600 focus:border-blue-500 focus:ring-blue-500 search-input"
                aria-label="Search"
              />
            </motion.form>
            <motion.button
              onClick={() => {
                console.log('Mobile theme toggled');
                toggleTheme();
              }}
              className="p-2 rounded-full bg-gray-800/50 glow"
              variants={itemVariants}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </motion.button>
          </div>
        </motion.div>
      )}

      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"
        style={{ scaleX }}
      />
    </motion.nav>
  );
};

export default Navbar;


// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Tilt } from 'react-tilt';
// import { Menu, X, Search, Sun, Moon } from 'lucide-react';
// import Particles from '@tsparticles/react';
// import { loadSlim } from '@tsparticles/slim';
// import { useMediaQuery } from 'react-responsive';
// import { ThemeContext } from '../screens/context/ThemeContext';
// import logo from '../assets/logo.png';
// import blue from '../assets/blue.jpg';

// // Particle Config
// const particleConfig = {
//   particles: {
//     number: { value: 50 },
//     density: { enable: true, area: 800 },
//     color: { value: ['#3b82f6', '#9333ea'] },
//     shape: { type: 'circle' },
//     opacity: { value: 0.5 },
//     size: { value: { min: 1, max: 3 } },
//     links: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4 },
//     move: { enable: true, speed: 2, direction: 'none', outModes: 'out' },
//   },
//   interactivity: {
//     events: { onHover: { enable: true, mode: 'repulse' }, onClick: { enable: true, mode: 'push' } },
//     modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
//   },
// };

// // Nav Items
// const navItems = [
//   { name: 'Home', path: '/' },
//   { name: 'Services', path: '/services' },
//   { name: 'Projects', path: '/projects' },
//   { name: 'About', path: '/about' },
//   { name: 'Contact', path: '/contact' },
// ];

// // Mock Content Map for Search
// const contentMap = [
//   { path: '/', name: 'Home', keywords: ['home', 'welcome', 'portfolio', 'champion aden'] },
//   { path: '/services', name: 'Services', keywords: ['services', 'web development', 'design', 'consulting'] },
//   { path: '/projects', name: 'Projects', keywords: ['projects', 'work', 'case studies', 'development'] },
//   { path: '/about', name: 'About', keywords: ['about', 'bio', 'champion aden', 'experience'] },
//   { path: '/contact', name: 'Contact', keywords: ['contact', 'get in touch', 'email', 'phone'] },
// ];

// // Animation Variants
// const menuVariants = {
//   hidden: { opacity: 0, x: '100%' },
//   visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
//   exit: { opacity: 0, x: '100%', transition: { duration: 0.3 } },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const searchRef = useRef(null);
//   const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
//   const { theme, toggleTheme } = useContext(ThemeContext);
//   const { scrollYProgress } = useScroll();
//   const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

//   // Debug media query
//   useEffect(() => {
//     console.log('Is mobile:', isMobile);
//   }, [isMobile]);

//   // Close mobile menu on resize
//   useEffect(() => {
//     if (!isMobile) setIsOpen(false);
//   }, [isMobile]);

//   // Close search on click outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setIsSearchOpen(false);
//         setSearchQuery('');
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Particles init
//   const particlesInit = async (engine) => {
//     console.log('Particles initializing');
//     await loadSlim(engine);
//   };

//   // Handle navigation with debug
//   const handleNavigation = (path) => {
//     console.log('Navigating to:', path);
//     navigate(path);
//     setIsOpen(false);
//     setIsSearchOpen(false);
//     setSearchQuery('');
//   };

//   // Handle search
//   const handleSearch = (e) => {
//     e.preventDefault();
//     console.log('Search query:', searchQuery);
//     if (searchQuery.trim()) {
//       const result = contentMap.find((page) =>
//         page.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
//       );
//       if (result) {
//         handleNavigation(result.path);
//       }
//     }
//   };

//   // Search results
//   const searchResults = contentMap.filter((page) =>
//     page.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   return (
//     <motion.nav
//       className="fixed top-0 left-0 w-full z-50 bg-gray-900/30 backdrop-blur-lg border-b border-gray-700/50"
//       initial={{ y: -100 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <style>
//         {`
//           :root {
//             --neon-blue: #3b82f6;
//             --neon-purple: #9333ea;
//           }
//           .dark {
//             --bg-primary: #111827;
//             --text-primary: #ffffff;
//             --accent: var(--neon-blue);
//           }
//           .light {
//             --bg-primary: #ffffff;
//             --text-primary: #111827;
//             --accent: var(--neon-purple);
//           }
//           .navbar {
//             background: linear-gradient(90deg, rgba(17, 24, 39, 0.3), rgba(17, 24, 39, 0.5));
//             box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
//           }
//           .nav-item {
//             color: var(--text-primary);
//             transition: all 0.3s ease;
//           }
//           .nav-item:hover {
//             background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
//             -webkit-background-clip: text;
//             background-clip: text;
//             color: transparent;
//             text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
//           }
//           .active-nav {
//             position: relative;
//             color: var(--text-primary);
//           }
//           .active-nav::after {
//             content: '';
//             position: absolute;
//             bottom: -4px;
//             left: 0;
//             width: 100%;
//             height: 2px;
//             background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
//             box-shadow: 0 0 8px var(--neon-blue);
//           }
//           .glow {
//             box-shadow: 0 0 15px var(--accent);
//           }
//           .search-suggestions {
//             background: var(--bg-primary);
//             border: 1px solid var(--accent);
//             box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
//           }
//         `}
//       </style>
//       <Particles
//         id="navbar-particles"
//         init={particlesInit}
//         options={particleConfig}
//         className="absolute inset-0 z-0 opacity-80 pointer-events-none"
//       />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <motion.div
//             className="flex items-center"
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <Tilt options={{ max: 25, scale: 1.05 }}>
//               <button
//                 onClick={() => handleNavigation('/')}
//                 className="flex items-center"
//                 aria-label="Home"
//               >
//                 <img src={logo} alt="Logo" className="h-8 w-8 rounded-full" />
//                 {/* <motion.span
//                   className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   CA
//                 </motion.span> */}
//               </button>
//             </Tilt>
//           </motion.div>

//           {!isMobile && (
//             <div className="flex items-center space-x-4">
//               {navItems.map((item) => (
//                 <Tilt key={item.name} options={{ max: 15, scale: 1.03 }}>
//                   <motion.button
//                     onClick={() => {
//                       console.log('Nav item clicked:', item.name);
//                       handleNavigation(item.path);
//                     }}
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter') {
//                         console.log('Nav item Enter key:', item.name);
//                         handleNavigation(item.path);
//                       }
//                     }}
//                     className={`px-3 py-2 text-sm font-medium nav-item text-white ${
//                       location.pathname === item.path ? 'active-nav' : ''
//                     }`}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     aria-current={location.pathname === item.path ? 'page' : undefined}
//                     tabIndex={0}
//                   >
//                     {item.name}
//                   </motion.button>
//                 </Tilt>
//               ))}
//               <motion.button
//                 onClick={() => {
//                   console.log('Search toggled');
//                   setIsSearchOpen(!isSearchOpen);
//                 }}
//                 className="p-2 rounded-full bg-gray-200/50 glow"
//                 whileHover={{ rotate: 360 }}
//                 whileTap={{ scale: 0.9 }}
//                 aria-label="Toggle search"
//               >
//                 <Search size={20} />
//               </motion.button>
//               <motion.button
//                 onClick={() => {
//                   console.log('Theme toggled');
//                   toggleTheme();
//                 }}
//                 className="p-2 rounded-full bg-gray-200/50 glow"
//                 whileHover={{ scale: 1.2 }}
//                 whileTap={{ scale: 0.9 }}
//                 aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
//               >
//                 {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
//               </motion.button>
//             </div>
//           )}

//           {isMobile && (
//             <motion.button
//               onClick={() => {
//                 console.log('Mobile menu toggled');
//                 setIsOpen(!isOpen);
//               }}
//               className="p-2 rounded-full bg-gray-200/50 glow"
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//               aria-label={isOpen ? 'Close menu' : 'Open menu'}
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </motion.button>
//           )}
//         </div>

//         {isSearchOpen && !isMobile && (
//           <motion.div
//             ref={searchRef}
//             className="relative mt-2"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//           >
//             <form onSubmit={handleSearch}>
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search site..."
//                 className="w-full p-2 rounded-full bg-gray-200/50 text-white border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
//                 aria-label="Search"
//               />
//             </form>
//             {searchQuery && searchResults.length > 0 && (
//               <motion.ul
//                 className="absolute top-full left-0 w-full mt-1 rounded-lg search-suggestions"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//               >
//                 {searchResults.map((result, index) => (
//                   <li
//                     key={index}
//                     className="px-4 py-2 hover:bg-gray-800/50 cursor-pointer"
//                     onClick={() => {
//                       console.log('Search result clicked:', result.name);
//                       handleNavigation(result.path);
//                     }}
//                   >
//                     {result.name}
//                   </li>
//                 ))}
//               </motion.ul>
//             )}
//           </motion.div>
//         )}
//       </div>

//       {isMobile && isOpen && (
//         <motion.div
//           className="fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-gray-900/95 backdrop-blur-lg z-40"
//           variants={menuVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           style={{ backgroundImage: `url(${blue})`, backgroundSize: 'cover' }}
//         >
//           <div className="flex flex-col items-center justify-center h-full space-y-6">
//             {navItems.map((item) => (
//               <motion.button
//                 key={item.name}
//                 onClick={() => {
//                   console.log('Mobile nav item clicked:', item.name);
//                   handleNavigation(item.path);
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     console.log('Mobile nav item Enter key:', item.name);
//                     handleNavigation(item.path);
//                   }
//                 }}
//                 className={`text-xl font-medium nav-item ${
//                   location.pathname === item.path ? 'active-nav' : ''
//                 }`}
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 tabIndex={0}
//               >
//                 {item.name}
//               </motion.button>
//             ))}
//             <motion.form
//               onSubmit={handleSearch}
//               variants={itemVariants}
//               className="w-3/4"
//             >
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search site..."
//                 className="w-full p-2 rounded-full bg-gray-800/50 text-black border border-gray-600 focus:border-blue-500 focus:ring-blue-500"
//                 aria-label="Search"
//               />
//             </motion.form>


//             <motion.button
//               onClick={() => {
//                 console.log('Mobile theme toggled');
//                 toggleTheme();
//               }}
//               className="p-2 rounded-full bg-gray-800/50 glow"
//               variants={itemVariants}
//               whileHover={{ scale: 1.2 }}
//               whileTap={{ scale: 0.9 }}
//               aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
//             >
//               {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
//             </motion.button>
//           </div>
//         </motion.div>
//       )}

//       <motion.div
//         className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"
//         style={{ scaleX }}
//       />
//     </motion.nav>
//   );
// };

// export default Navbar;
