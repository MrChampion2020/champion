import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaFacebook, FaYoutube, FaInstagram, FaTwitter, FaArrowUp } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
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
    { icon: FaFacebook, href: 'https://www.facebook.com/championaden', label: 'Facebook' },
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
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      className="relative bg-gradient-to-b from-gray-900 to-blue-950 text-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      <style>
        {`
          .glassmorphism {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .glow-hover:hover {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
          }
          .particle-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('../assets/blue.jpg";') repeat;
            opacity: 0.1;
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
              className="text-3xl font-bold text-blue-400 glow-hover w-[30px] rounded-sm "
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
                {/* <motion.span
                  className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  CA
                </motion.span> */}
             
          </motion.div>

            </motion.a>
            <p className="text-lg font-semibold text-gray-200">{CONTENT.logo.name}</p>
          </motion.div>

          {/* Column 2: Useful Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 glassmorphism p-6 rounded-lg"
          >
            <h2 className="text-xl font-bold text-blue-400 border-b border-blue-500 pb-2">
              {CONTENT.links.title}
            </h2>
            {CONTENT.links.items.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="text-gray-200 hover:text-blue-400 transition"
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
            <h2 className="text-xl font-bold text-blue-400 border-b border-blue-500 pb-2">
              {CONTENT.contact.title}
            </h2>
            {CONTENT.contact.items.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="flex items-center gap-3 text-gray-200 hover:text-blue-400 transition"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                aria-label={item.label}
              >
                <item.icon className="text-blue-400" size={18} />
                <span>{item.value}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar: Socials and Copyright */}
        <motion.div
          className={`flex ${
            isMobile ? 'flex-col' : 'flex-row'
          } justify-between items-center mt-12 border-t border-gray-700 pt-6 gap-6`}
          variants={itemVariants}
        >
          <div className="flex gap-4">
            {CONTENT.socials.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="text-gray-200 hover:text-blue-400 p-2 rounded-full bg-gray-800/50 glow-hover"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-gray-400">{CONTENT.copyright}</p>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          onClick={handleBackToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-500 text-white rounded-full glow-hover"
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




// import React, { useState, useEffect } from 'react';
// import { 
//   FaMapMarkerAlt, 
//   FaPhoneAlt, 
//   FaEnvelope, 
//   FaGlobe, 
//   FaFacebook, 
//   FaYoutube, 
//   FaInstagram, 
//   FaTwitter 
// } from 'react-icons/fa';
// import blue from "../assets/blue.jpg";
// import { useMediaQuery } from "react-responsive";


// const Footer = ({ navigation }) => {
//   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

//   return (
//     <div
//       style={{
//         position: "relative",
//         backgroundImage: `url(${blue})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundAttachment: "fixed",
//         height: isMobile ? "120vh" : "82vh", // Adjusted height for mobile view
//         width: "90vw",
//         padding: "20px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 20
//       }}
//     >
//       <div
//         style={{
//           padding: "0px 15px",
//           color: "white",
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           margin: "auto",
//           gap: "10px",
//           width: "100%",
//         }}
//       >

//         {/* Column 1: Logo and Organization Name */}
//         <div
//           style={{
//             flex: "0 0 30%",
//             textAlign: "left",
//             padding: "10px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "10px",
//             width: isMobile ? "100%" : "30%",
//           }}
//         >
//           <a href="/" style={{ textDecoration: "none", color: 'white', fontWeight: 900 }}
//             onClick={() => navigation("/")}
//           >
//             CA
        
//           </a>
//           <p style={{ fontSize: "16px", fontWeight: "bold" }}>
//             Champion Aden 
//           </p>
//         </div>

//         {/* Column 2: Useful Links */}
//         <div
//           style={{
//             flex: "0 0 30%",
//             textAlign: "left",
//             padding: "10px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//             width: isMobile ? "100%" : "30%",
//           }}
//         >
//           <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>
//             <b
//               style={{
//                 paddingBottom: "8px",
//                 borderBottom: "0.5px solid #0000FF", // Customized border-bottom color
//                 background: "linear-gradient(to right, transparent 50%, transparent 50%)",
//                 backgroundPosition: "0 100%",
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "80% 1px",
//               }}
//             >
//               Useful
//             </b>
//             <b> Links</b>
//           </h2>
//           <a href="/projects" style={{ textDecoration: "none", color: "white" }}>
//             Projects
//           </a>
//           <a href="/about" style={{ textDecoration: "none", color: "white" }}>
//             About Me
//           </a>
//           <a href="/contact" style={{ textDecoration: "none", color: "white" }}>
//             Contact
//           </a>
//           <a href="/portfolio" style={{ textDecoration: "none", color: "white" }}>
//             Portfolio
//           </a>
//           <a href="/blog" style={{ textDecoration: "none", color: "white" }}>
//             Blog
//           </a>
//         </div>

//         {/* Column 3: Contact Information */}
//         <div
//           style={{
//             flex: "0 0 30%",
//             textAlign: "left",
//             padding: "10px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "15px",
//             width: isMobile ? "100%" : "30%",
//           }}
//         >
//           <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>
//             <b
//               style={{
//                 paddingBottom: "8px",
//                 borderBottom: "0.5px solid #0000FF", // Customized border-bottom color
//                 background: "linear-gradient(to right, transparent 50%, transparent 50%)",
//                 backgroundPosition: "0 100%",
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "80% 1px",
//               }}
//             >
//               Contact
//             </b>
//             <b> Information</b>
//           </h2>
//           <a
//             style={{
//               textDecoration: "none",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               color: "white",
//               fontSize: "16px",
//             }}
//           >
//             <FaMapMarkerAlt style={{ fontSize: "18px" }} />
//             Lagos, Nigeria
//           </a>
//           <a
//             href="tel:+234000000000"
//             style={{
//               textDecoration: "none",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               color: "white",
//               fontSize: "16px",
//             }}
//           >
//             <FaPhoneAlt style={{ fontSize: "18px" }} />
//             +234 champion
//           </a>
//           <a
//             href="mailto:info@ceibz1.com"
//             style={{
//               textDecoration: "none",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               color: "white",
//               fontSize: "16px",
//             }}
//           >
//             <FaEnvelope style={{ fontSize: "18px" }} />
//             championaden.ca@gmail.com
//           </a>
//           <a
//             href="https://www.championaden.online"
//             style={{
//               textDecoration: "none",
//               display: "flex",
//               alignItems: "center",
//               gap: "10px",
//               color: "white",
//               fontSize: "16px",
//             }}
//           >
//             <FaGlobe style={{ fontSize: "18px" }} />
//             www.championaden.online
//           </a>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer
//         style={{
//           display: "flex",
//           flexDirection: isMobile ? "column" : "row",
//           justifyContent: "center",
//           marginTop: isMobile ? "70px" : "0px",
//           color: "white",
//           width: "100%",
//           gap: "20px",
//           marginBottom: 20

//         }}
//       >
//         {/* Social Media Links */}
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             gap: "20px",
//             justifyContent: "center",
//             margin: "auto",
//           }}
//         >
//           <a href="https://www.facebook.com/championaden" style={{ textDecoration: "none" }}>
//             <FaFacebook size={24} />
//           </a>
//           <a href="https://instagram.com/sirchampio_n" style={{ textDecoration: "none" }}>
//             <FaInstagram size={24} />
//           </a>
//           <a href="https://x.com/sirchampionad" style={{ textDecoration: "none" }}>
//             <FaTwitter size={24} />
//           </a>
//         </div>

//         {/* Copyright */}
//         <div
//           style={{
//             textAlign: "center",
//             margin: "auto",
//           }}
//         >
//           <p style={{ fontSize: "14px" }}>
//             &copy; {new Date().getFullYear()} Champion Aden | All rights reserved
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Footer;