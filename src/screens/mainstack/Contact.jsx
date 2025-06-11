
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin, Github } from 'lucide-react';
import { Tilt } from 'react-tilt';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ThemeContext } from '../../screens/context/ThemeContext';
import axios from 'axios';
import API_URL from './config';
import { useMediaQuery } from 'react-responsive';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.4, staggerChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const inputVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  focus: { scale: 1.02, boxShadow: '0 0 12px var(--accent)' },
};

// Animated Text Component
const AnimatedText = ({ text }) => (
  <span>
    {text.split('').map((char, index) => (
      <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
        {char}
      </motion.span>
    ))}
  </span>
);

const Contact = () => {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <style>
        {`
          :root {
            --neon-blue: #3b82f6;
            --neon-purple: #9333ea;
          }
          .dark {
            --card-bg: rgba(17, 24, 39, 0.6);
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
            backdrop-filter: blur(10px);
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
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
          body { font-family: 'Poppins', sans-serif; }
        `}
      </style>
      <Navbar />
      <motion.section
        className="py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.h1
          variants={itemVariants}
          className={`text-4xl md:text-5xl font-extrabold text-center mb-12 gradient-text ${isMobile ? 'text-3xl' : isTablet ? 'text-4xl' : ''}`}
        >
          <AnimatedText text="Connect with Me" />
        </motion.h1>
        <div className={`grid ${isTablet ? 'grid-cols-1' : 'grid-cols-2'} gap-12`}>
          {/* Form Section */}
          <Tilt options={{ max: 15, scale: 1.03 }}>
            <motion.div variants={itemVariants} className="glass-card rounded-xl p-8">
              <motion.h2
                variants={itemVariants}
                className={`text-2xl font-bold mb-6 gradient-text ${isMobile ? 'text-xl' : ''}`}
              >
                <AnimatedText text="Send a Message" />
              </motion.h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email', 'subject'].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <motion.input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md bg-gray-700/50 text-white border border-gray-600 focus:border-[var(--accent)] focus:ring-[var(--accent)] p-3"
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                  </div>
                ))}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="mt-1 block w-full rounded-md bg-gray-700/50 text-white border border-gray-600 focus:border-[var(--accent)] focus:ring-[var(--accent)] p-3"
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                </div>
                <motion.button
                  type="submit"
                  className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md glow ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isProcessing}
                  whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                >
                  {isProcessing ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
              {submitStatus === 'success' && (
                <motion.p variants={itemVariants} className="text-green-400 mt-6 font-medium">
                  Message sent successfully!
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p variants={itemVariants} className="text-red-400 mt-6 font-medium">
                  Error sending message. Please try again.
                </motion.p>
              )}
            </motion.div>
          </Tilt>
          {/* Contact Info Section */}
          <Tilt options={{ max: 15, scale: 1.03 }}>
            <motion.div variants={itemVariants} className="glass-card rounded-xl p-8">
              <motion.h2
                variants={itemVariants}
                className={`text-2xl font-bold mb-6 gradient-text ${isMobile ? 'text-xl' : ''}`}
              >
                <AnimatedText text="Contact Information" />
              </motion.h2>
              <div className="space-y-6">
                {[
                  { icon: <Mail />, title: 'Email', value: 'championaden.ca@gmail.com' },
                  { icon: <Phone />, title: 'Phone', value: '+2349030155327' },
                  { icon: <MapPin />, title: 'Address', value: '101, Ajah, Lagos, Nigeria' },
                  { icon: <Clock />, title: 'Availability', value: 'Open to work' },
                ].map((info, index) => (
                  <motion.div key={index} className="flex items-center space-x-4" variants={itemVariants}>
                    <motion.div whileHover={{ scale: 1.2 }} className="text-[var(--accent)]">
                      {info.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {info.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)' }}>{info.value}</p>
                    </div>
                  </motion.div>
                ))}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                    Follow Me
                  </h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: <Instagram />, href: '#' },
                      { icon: <Linkedin />, href: '#' },
                      { icon: <Github />, href: 'https://github.com/MrChampion2020' },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
                        whileHover={{ scale: 1.2 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </Tilt>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default Contact;





// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { MapPin, Phone, Mail, Clock, Instagram, Linkedin, Github } from "lucide-react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import API_URL from "./config";
// import axios from "axios";
// import { useMediaQuery } from "react-responsive";

// // Animation Variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       delayChildren: 0.3,
//       staggerChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 50, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
// };

// const letterVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.5 },
//   },
// };

// const inputVariants = {
//   hidden: { scale: 0.95, opacity: 0 },
//   visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
//   focus: { scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" },
// };

// // Animated Text Component
// const AnimatedText = ({ text }) => {
//   return (
//     <span>
//       {text.split("").map((char, index) => (
//         <motion.span
//           key={index}
//           variants={letterVariants}
//           style={{ display: "inline-block" }}
//         >
//           {char}
//         </motion.span>
//       ))}
//     </span>
//   );
// };

// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
//   const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
//   const isDesktop = useMediaQuery({ query: "(max-width: 1024px)" });
//   const isLarge = useMediaQuery({ query: "(min-width: 1280px)" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);
//     try {
//       const response = await axios.post(`${API_URL}/api/contact`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.status === 200) {
//         setSubmitStatus("success");
//         setFormData({ name: "", email: "", subject: "", message: "" });
//       } else {
//         setSubmitStatus("error");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setSubmitStatus("error");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans">
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
//           body { font-family: 'Poppins', sans-serif; }
//         `}
//       </style>
//       <Navbar />
//       <motion.section
//         className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <motion.h1
//           variants={itemVariants}
//           className={`font-bold text-center text-blue-400 mb-12 ${
//             isMobile ? "text-3xl" : isTablet ? "text-4xl" : "text-5xl"
//           }`}
//         >
//           <AnimatedText text="Get in Touch" />
//         </motion.h1>

//         <div className={`grid ${isTablet ? "grid-cols-1" : "grid-cols-2"} gap-12`}>
//           {/* Form Section */}
//           <motion.div variants={itemVariants} className="space-y-6">
//             <motion.h2
//               variants={itemVariants}
//               className={`font-bold text-blue-400 mb-6 ${
//                 isMobile ? "text-xl" : "text-2xl"
//               }`}
//             >
//               <AnimatedText text="Send  a  Message" />
//             </motion.h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-300"
//                 >
//                   Name
//                 </label>
//                 <motion.input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700/50 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
//                   variants={inputVariants}
//                   whileFocus="focus"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-300"
//                 >
//                   Email
//                 </label>
//                 <motion.input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700/50 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
//                   variants={inputVariants}
//                   whileFocus="focus"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="subject"
//                   className="block text-sm font-medium text-gray-300"
//                 >
//                   Subject
//                 </label>
//                 <motion.input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   required
//                   className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700/50 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
//                   variants={inputVariants}
//                   whileFocus="focus"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="message"
//                   className="block text-sm font-medium text-gray-300"
//                 >
//                   Message
//                 </label>
//                 <motion.textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                   rows={5}
//                   className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700/50 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
//                   variants={inputVariants}
//                   whileFocus="focus"
//                 />
//               </div>
//               <motion.button
//                 type="submit"
//                 className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-md transition ${
//                   isProcessing ? "opacity-70 cursor-not-allowed" : "hover:from-blue-600 hover:to-blue-800"
//                 }`}
//                 disabled={isProcessing}
//                 whileHover={{ scale: isProcessing ? 1 : 1.05 }}
//                 whileTap={{ scale: isProcessing ? 1 : 0.95 }}
//                 style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
//               >
//                 {isProcessing ? "Sending..." : "Send Message"}
//               </motion.button>
//             </form>
//             {submitStatus === "success" && (
//               <motion.p
//                 variants={itemVariants}
//                 className="text-green-400 mt-6 font-medium"
//               >
//                 Message sent successfully!
//               </motion.p>
//             )}
//             {submitStatus === "error" && (
//               <motion.p
//                 variants={itemVariants}
//                 className="text-red-400 mt-6 font-medium"
//               >
//                 There was an error sending your message. Please try again.
//               </motion.p>
//             )}
//           </motion.div>

//           {/* Contact Information Section */}
//           <motion.div variants={itemVariants} className="space-y-6">
//             <motion.h2
//               variants={itemVariants}
//               className={`font-bold text-blue-400 mb-6 ${
//                 isMobile ? "text-xl" : "text-2xl"
//               }`}
//             >
//               <AnimatedText text="Contact Information" />
//             </motion.h2>
//             <div className="space-y-6 bg-gray-800/50 backdrop-blur-sm rounded-lg p-6">
//               <motion.div
//                 className="flex items-center space-x-4"
//                 variants={itemVariants}
//               >
//                 <motion.div whileHover={{ scale: 1.2 }}>
//                   <Mail className="h-6 w-6 text-blue-400" />
//                 </motion.div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-white">Email</h3>
//                   <p className="text-gray-300">championaden.ca@gmail.com</p>
//                 </div>
//               </motion.div>
//               <motion.div
//                 className="flex items-center space-x-4"
//                 variants={itemVariants}
//               >
//                 <motion.div whileHover={{ scale: 1.2 }}>
//                   <Phone className="h-6 w-6 text-blue-400" />
//                 </motion.div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-white">Phone</h3>
//                   <p className="text-gray-300">+2349030155327</p>
//                 </div>
//               </motion.div>
//               <motion.div
//                 className="flex items-center space-x-4"
//                 variants={itemVariants}
//               >
//                 <motion.div whileHover={{ scale: 1.2 }}>
//                   <MapPin className="h-6 w-6 text-blue-400" />
//                 </motion.div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-white">Address</h3>
//                   <p className="text-gray-300">101, Ajah, Lagos, Nigeria</p>
//                 </div>
//               </motion.div>
//               <motion.div
//                 className="flex items-center space-x-4"
//                 variants={itemVariants}
//               >
//                 <motion.div whileHover={{ scale: 1.2 }}>
//                   <Clock className="h-6 w-6 text-blue-400" />
//                 </motion.div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-white">Availability</h3>
//                   <p className="text-gray-300">Open to work</p>
//                 </div>
//               </motion.div>
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold text-white mb-4">Follow Me</h3>
//                 <div className="flex space-x-4">
//                   <motion.a
//                     href="#"
//                     className="text-gray-400 hover:text-blue-400"
//                     whileHover={{ scale: 1.2 }}
//                   >
//                     <Instagram className="h-6 w-6" />
//                   </motion.a>
//                   <motion.a
//                     href="#"
//                     className="text-gray-400 hover:text-blue-400"
//                     whileHover={{ scale: 1.2 }}
//                   >
//                     <Linkedin className="h-6 w-6" />
//                   </motion.a>
//                   <motion.a
//                     href="https://github.com/MrChampion2020"
//                     className="text-gray-400 hover:text-blue-400"
//                     whileHover={{ scale: 1.2 }}
//                   >
//                     <Github className="h-6 w-6" />
//                   </motion.a>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </motion.section>
//       <Footer />
//     </div>
//   );
// }




// // import React, { useState } from "react";
// // import { MapPin, Phone, Mail, Clock } from "lucide-react";
// // import Navbar from "../../components/Navbar";
// // import Footer from "../../components/Footer";
// // import API_URL from "./config";
// // import axios from 'axios'; // Ensure axios is imported

// // export default function Contact() {
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     subject: "",
// //     message: "",
// //   });
// //   const [submitStatus, setSubmitStatus] = useState(null);
// //   const [isProcessing, setIsProcessing] = useState(false); // For showing the processing effect

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsProcessing(true); // Start processing
  
// //     try {
// //       const response = await axios.post(`${API_URL}/api/contact`, formData, {
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //       });
  
// //       if (response.status === 200) {
// //         setSubmitStatus("success");
// //         setFormData({ name: "", email: "", subject: "", message: "" });
// //       } else {
// //         setSubmitStatus("error");
// //       }
// //     } catch (error) {
// //       console.error("Error:", error);
// //       setSubmitStatus("error");
// //     } finally {
// //       setIsProcessing(false); // Stop processing after the response
// //     }
// //   };

// //   return (
// //     <div style={{ width: "100%", backgroundColor: "black", color: "#F0F4F8" }}> {/* Black background with light text */}
// //       <Navbar />
// //       <div
// //         style={{
// //           fontFamily: "Arial, sans-serif",
// //           maxWidth: "1200px",
// //           margin: "0 auto",
// //           padding: "40px 20px",
// //         }}
// //       >
// //         <h1
// //           style={{
// //             fontSize: "36px",
// //             fontWeight: "bold",
// //             textAlign: "center",
// //             marginBottom: "40px",
// //             color: "#8A2BE2", // Lighter blue for the heading
// //           }}
// //         >
// //           Contact Us
// //         </h1>

// //         <div
// //           style={{
// //             display: "flex",
// //             flexDirection: "column",
// //             gap: "40px",
// //             "@media (min-width: 768px)": {
// //               flexDirection: "row",
// //             },
// //           }}
// //         >
// //           <div
// //             style={{
// //               flex: "1",
// //               "@media (min-width: 768px)": {
// //                 marginRight: "40px",
// //               },
// //             }}
// //           >
// //             <h2
// //               style={{
// //                 fontSize: "20px",
// //                 fontWeight: "bold",
// //                 marginBottom: "20px",
// //                 color: "#0000FF", // Lighter blue for sub-heading
// //               }}
// //             >
// //               Get in Touch
// //             </h2>

// //             <form
// //               onSubmit={handleSubmit}
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 gap: "16px",
// //               }}
// //             >
// //               <div>
// //                 <label
// //                   htmlFor="name"
// //                   style={{
// //                     display: "block",
// //                     marginBottom: "5px",
// //                     fontWeight: "bold",
// //                     color: "#F0F4F8", // Light text color
// //                   }}
// //                 >
// //                   Name:
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="name"
// //                   name="name"
// //                   value={formData.name}
// //                   onChange={handleChange}
// //                   required
// //                   style={{
// //                     width: "100%",
// //                     padding: "10px",
// //                     fontSize: "16px",
// //                     border: "0.05px solid black",
// //                     borderRadius: "10px",
// //                     backgroundColor: "#191970",
// //                     color: "#F0F4F8", // Light text inside the input
// //                   }}
// //                 />
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="email"
// //                   style={{
// //                     display: "block",
// //                     marginBottom: "5px",
// //                     fontWeight: "bold",
// //                     color: "#F0F4F8",
// //                   }}
// //                 >
// //                   Email:
// //                 </label>
// //                 <input
// //                   type="email"
// //                   id="email"
// //                   name="email"
// //                   value={formData.email}
// //                   onChange={handleChange}
// //                   required
// //                   style={{
// //                     width: "100%",
// //                     padding: "10px",
// //                     fontSize: "16px",
// //                     border: "0.05px solid black",
// //                     borderRadius: "10px",
// //                     backgroundColor: "#191970",
// //                     color: "#F0F4F8",
// //                   }}
// //                 />
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="subject"
// //                   style={{
// //                     display: "block",
// //                     marginBottom: "5px",
// //                     fontWeight: "bold",
// //                     color: "#F0F4F8",
// //                   }}
// //                 >
// //                   Subject:
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="subject"
// //                   name="subject"
// //                   value={formData.subject}
// //                   onChange={handleChange}
// //                   required
// //                   style={{
// //                     width: "100%",
// //                     padding: "10px",
// //                     fontSize: "16px",
// //                     border: "0.05px solid black",
// //                     borderRadius: "10px",
// //                     backgroundColor: "#191970",
// //                     color: "#F0F4F8",
// //                   }}
// //                 />
// //               </div>

// //               <div>
// //                 <label
// //                   htmlFor="message"
// //                   style={{
// //                     display: "block",
// //                     marginBottom: "5px",
// //                     fontWeight: "bold",
// //                     color: "#F0F4F8",
// //                   }}
// //                 >
// //                   Message:
// //                 </label>
// //                 <textarea
// //                   id="message"
// //                   name="message"
// //                   value={formData.message}
// //                   onChange={handleChange}
// //                   required
// //                   style={{
// //                     width: "100%",
// //                     padding: "10px",
// //                     fontSize: "16px",
// //                     border: "0.05px solid black",
// //                     borderRadius: "10px",
// //                     backgroundColor: "#191970",
// //                     color: "#F0F4F8",
// //                     minHeight: "150px",
// //                     resize: "vertical",
// //                   }}
// //                 ></textarea>
// //               </div>

// //               <button
// //                 type="submit"
// //                 style={{
// //                   backgroundColor: isProcessing ? "#8a2be2" : "#0000FF", // Change color if processing
// //                   color: "white",
// //                   padding: "12px 24px",
// //                   fontSize: "16px",
// //                   fontWeight: "bold",
// //                   border: "none",
// //                   width: '50%',
// //                   borderRadius: "4px",
// //                   cursor: isProcessing ? "not-allowed" : "pointer", // Disable button if processing
// //                   transition: "background-color 0.3s ease",
// //                   ":hover": {
// //                     backgroundColor: isProcessing ? "#8a2be2" : "#0000FF",
// //                   },
// //                 }}
// //                 disabled={isProcessing} // Disable button while processing
// //               >
// //                 {isProcessing ? "Sending..." : "Send Message"}
// //               </button>
// //             </form>

// //             {submitStatus === "success" && (
// //               <p
// //                 style={{
// //                   color: "green",
// //                   marginTop: "20px",
// //                   fontWeight: "bold",
// //                 }}
// //               >
// //                 Message sent successfully!
// //               </p>
// //             )}

// //             {submitStatus === "error" && (
// //               <p
// //                 style={{
// //                   color: "red",
// //                   marginTop: "20px",
// //                   fontWeight: "bold",
// //                 }}
// //               >
// //                 There was an error sending your message. Please try again.
// //               </p>
// //             )}
// //           </div>

// //           <div style={{ flex: "1" }}>
// //             {/* Contact information */}
// //             <h2
// //               style={{
// //                 fontSize: "16px",
// //                 fontWeight: "bold",
// //                 marginBottom: "20px",
// //                 color: "#0000FF",
// //               }}
// //             >
// //               Contact Information
// //             </h2>

// //             <div
// //               style={{
// //                 display: "flex",
// //                 flexDirection: "column",
// //                 gap: "20px",
// //               }}
// //             >
// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "10px",
// //                 }}
// //               >
// //                 <MapPin size={24} color="#0000FF" />
// //                 <div>
                
// //                   <p style={{ color: "#0000FF" }}>Lagos, Nigeria</p>
// //                 </div>
// //               </div>

// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "10px",
// //                 }}
// //               >
// //                 <Phone size={24} color="#0000FF" />
// //                 <div>
                  
// //                   <p style={{ color: "#0000FF" }}>+234 champion</p>
// //                 </div>
// //               </div>

// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "10px",
// //                 }}
// //               >
// //                 <Mail size={24} color="#0000FF" />
// //                 <div>
                 
// //                 <p style={{ color: "#0000FF" }}>championaden.ca@gmail.com</p>
// //                 </div>
// //               </div>

// //               <div
// //                 style={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: "10px",
// //                 }}
// //               >
// //                 <Clock size={24} color="#0000FF" />
// //                 <div>
              
// //                   <p style={{ color: "#0000FF" }}>Open to work</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // }
