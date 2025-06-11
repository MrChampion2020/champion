import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Instagram, Linkedin, Github, Mail, Phone, MapPin, Clock } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Background from "../../components/Background";
import me from "../../assets/me.png";
import me2 from "../../assets/mine.jpg";
import shopfast from "../../assets/shopfast.png";
import catchup from "../../assets/catchup.png";
import primeprocurement from "../../assets/primepro.png";
import portfolio from "../../assets/portfolio.png";
import avatar1 from "../../assets/Avatar1.png";
import avatar2 from "../../assets/Avatar2.png";
import avatar3 from "../../assets/Avatar3.png";
import bg from "../../assets/bgdark.png";
import Feeda from "../../assets/Feeda.png";
import delivery from "../../assets/delivery.jpeg";


import { useMediaQuery } from "react-responsive";
import logo from "../../assets/logo.png";
import axios from "axios";
import API_URL from "./config";

// Content Constants
const CONTENT = {
  hero: {
    greeting: "Hi, I am",
    name: "Sir Champion Aden",
    description: "Full Stack Developer crafting scalable web and mobile applications with MERN stack and modern technologies.",
    hireMe: "Hire Me",
    downloadCV: "Download CV",
  },
  // about: {
  //   title: "About Me",
  //   description1: "With over 5 years of experience as a Full Stack Developer, I specialize in building scalable web and mobile applications using the MERN stack. Currently, I lead React Native development at Pejul Digital Agency and freelance as a React.js developer for Pixel Freelancer, USA.",
  //   description2: "My expertise includes JavaScript (ES6+), TypeScript, Node.js, Express, MongoDB, and React Native. I’m passionate about creating intuitive user experiences and implementing modern authentication methods like JWT.",
  //   skills: ["React", "Node.js", "MongoDB", "TypeScript", "React Native", "Express"],

  about: {
  title: "About Me",
  intro: "Hi, I'm Champion Aden — a passionate Full Stack Developer and Cybersecurity Analyst with a deep commitment to building secure, high-performing digital experiences across web and mobile platforms.",
  description1: "With over 7 years of hands-on experience, I specialize in building scalable and robust applications using modern technologies such as Node.js, React.js, TypeScript, and React Native. I'm currently leading React Native development at Pejul Digital Agency and also freelance as a React.js developer for Pixel Freelancer, USA.",
  description2: "My skill set spans across front-end and back-end development, UI/UX design in Figma, mobile app development, and foundational knowledge in Web3 and PHP. I’m especially passionate about creating intuitive user experiences and embedding security-first principles through authentication protocols like JWT and beyond.",
  skills: [
    "React",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "React Native",
    "Express",
    "HTML",
    "CSS",
    "Figma",
    "Web3",
    "PHP",
    "Cybersecurity"
  ],


  },
  projects: {
    title: "Featured Projects",
    items: [
      {
        image: delivery,
        title: "Fast Delivery",
        description: "A scalable delivery platform built with MERN stack, featuring secure payments and user authentication.",
        link: "https://expo.dev/artifacts/eas/jwurCuUxhKGd9GswnjU2Pw.apk",
      },
      {
        image: catchup,
        title: "Node.js Chat Application",
        description: "A real-time chat application using Node.js, Express, and WebSockets for seamless communication.",
        link: "https://catchup-eight.vercel.app",
      },
      {
        image: primeprocurement,
        title: "Prime Procurement Website",
        description: "A professional company portfolio website showcasing services, built with modern web technologies.",
        link: "https://www.primeprocurementus.com",
      },
    ],
  },
  portfolio: {
    title: "Portfolio",
    items: [
      {
        image: shopfast,
        title: "ShopFast E-commerce",
        description: "An interactive e-commerce platform with secure payment options and user accounts.",
        link: "https://shopfast-gilt.vercel.app",
      },
      {
        image: Feeda,
        title: "Feeda",
        description: "A modern real-time Mobile chat app with a clean UI, powered by Node.js and WebSockets. react native with typescript, in production now",
        link: "",
      },
      {
        image: portfolio,
        title: "Personal Portfolio",
        description: "A TypeScript-based portfolio showcasing my skills and projects.",
        link: "https://me.championaden.online",
      },
    ],
  },
  testimonials: {
    title: "What Clients Say",
    items: [
      {
        name: "Dr. Omoregie",
        role: "Client",
        remark: "Champion you will go places, your humility and response to work is too rare, you patiently listened and delivered every piece of the job and most importantly, very fast.",
        avatar: avatar1,
      },
      {
        name: "Michael Scott",
        role: "CEO, Scottified",
        remark: "Is mobile app that easy? you were too fast. Thank you Champion for making our app a reality",
        avatar: avatar2,
      },
      {
        name: "Mr. Charles",
        role: "Founder, Prime Procurement",
        remark: "Champion's portfolio website elevated our brand. His skills in TypeScript and React are top-notch!",
        avatar: avatar3,
      },
    ],
  },
  contact: {
    title: "Get in Touch",
    form: {
      nameLabel: "Name",
      emailLabel: "Email",
      subjectLabel: "Subject",
      messageLabel: "Message",
      submitButton: "Send Message",
      sending: "Sending...",
      successMessage: "Message sent successfully!",
      errorMessage: "There was an error sending your message. Please try again.",
      validation: {
        required: "This field is required.",
        invalidEmail: "Please enter a valid email address.",
      },
    },
    info: {
      title: "Contact Information",
      email: {
        label: "Email",
        value: "championaden.ca@gmail.com",
      },
      phone: {
        label: "Phone",
        value: "+2349030155327",
      },
      address: {
        label: "Address",
        value: "101, Ajah, Lagos, Nigeria",
      },
      availability: {
        label: "Availability",
        value: "Open to work",
      },
      followMe: "Follow Me",
    },
  },
};

// Wave Animation Component
const WaveAnimation = ({ className }) => {
  return (
    <motion.svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
      initial={{ opacity: 0.4, rotate: 0 }}
      animate={{ opacity: 0.8, rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M200,80 C240,80 270,110 270,150 C270,190 240,220 200,220 C160,220 130,190 130,150 C130,110 160,80 200,80 Z"
        fill="none"
        stroke="silver"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
      <path
        d="M200,60 C250,60 290,100 290,150 C290,200 250,240 200,240 C150,240 110,200 110,150 C110,100 150,60 200,60 Z"
        fill="none"
        stroke="silver"
        strokeWidth="1"
      />
      <path
        d="M200,40 C260,40 310,90 310,150 C310,210 260,260 200,260 C140,260 90,210 90,150 C90,90 140,40 200,40 Z"
        fill="none"
        stroke="silver"
        strokeWidth="1"
        strokeDasharray="10,5"
      />
    </motion.svg>
  );
};

// Profile Wave Animation Component
const ProfileWave = ({ className }) => (
  <motion.svg
    width="280"
    height="280"
    viewBox="0 0 280 280"
    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
    initial={{ opacity: 0.4, rotate: 0 }}
    animate={{ opacity: 0.8, rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <path
      d="M140,70 C160,70 175,85 175,105 C175,125 160,140 140,140 C120,140 105,125 105,105 C105,85 120,70 140,70 Z"
      fill="none"
      stroke="silver"
      strokeWidth="1"
      strokeDasharray="5,5"
    />
    <path
      d="M140,60 C165,60 185,80 185,105 C185,130 165,150 140,150 C115,150 95,130 95,105 C95,80 115,60 140,60 Z"
      fill="none"
      stroke="silver"
      strokeWidth="1"
    />
    <path
      d="M140,50 C170,50 195,75 195,105 C195,135 170,160 140,160 C110,160 85,135 85,105 C85,75 110,50 140,50 Z"
      fill="none"
      stroke="silver"
      strokeWidth="1"
      strokeDasharray="10,5"
    />
  </motion.svg>
);

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: "spring", bounce: 0.4 },
  },
};

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0, rotate: 3 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" },
  tap: { scale: 0.95 },
};

const errorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// Typewriter Text Component
const TypewriterText = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
};

// Custom Heading Components
const AboutHeading = ({ text }) => (
  <motion.h2
    variants={itemVariants}
    className="relative font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-12 text-2xl sm:text-3xl lg:text-4xl"
    aria-label={text}
  >
    <span className="about-underline">
      {text.split("").map((char, index) => (
        <motion.span key={index} variants={letterVariants} style={{ display: "inline-block" }}>
          {char}
        </motion.span>
      ))}
    </span>
  </motion.h2>
);

const ProjectsHeading = ({ text }) => (
  <motion.h2
    variants={itemVariants}
    className="relative font-bold text-center text-blue-400 uppercase mb-12 text-2xl sm:text-3xl lg:text-4xl glitch"
    aria-label={text}
    data-text={text}
  >
    <motion.span
      className="absolute inset-0 w-full h-full border-t border-b border-blue-500"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
    {text}
  </motion.h2>
);

const PortfolioHeading = ({ text }) => (
  <motion.h2
    variants={itemVariants}
    className="relative font-bold text-center text-white mb-12 text-2xl sm:text-3xl lg:text-4xl portfolio-3d"
    aria-label={text}
    whileHover={{ rotateX: 5, rotateY: 5 }}
  >
    {text}
  </motion.h2>
);

const TestimonialsHeading = ({ text }) => (
  <motion.h2
    variants={itemVariants}
    className="relative font-bold text-center text-blue-400 mb-12 text-2xl sm:text-3xl lg:text-4xl testimonial-glow"
    aria-label={text}
  >
    <TypewriterText text={text} delay={100} />
    <span className="absolute inset-0 w-full h-full particle-dots" />
  </motion.h2>
);

const ContactHeading = ({ text }) => (
  <motion.h2
    variants={itemVariants}
    className="relative font-bold text-center text-blue-400 mb-12 text-2xl sm:text-3xl lg:text-4xl circuit-underline"
    aria-label={text}
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.6 }}
  >
    {text}
  </motion.h2>
);

// Home Component
const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const isDesktop = useMediaQuery({ query: "(max-width: 1024px)" });

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 300], [0, -50]);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      newErrors.name = CONTENT.contact.form.validation.required;
    }
    if (!formData.email.trim()) {
      newErrors.email = CONTENT.contact.form.validation.required;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = CONTENT.contact.form.validation.invalidEmail;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = CONTENT.contact.form.validation.required;
    }
    if (!formData.message.trim()) {
      newErrors.message = CONTENT.contact.form.validation.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for the field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsProcessing(true);
    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
          body { font-family: 'Inter', sans-serif; }
          .tech-outline {
            text-shadow: 0 0 5px rgba(59, 130, 246, 0.8), 0 0 10px rgba(147, 51, 234, 0.5);
            font-weight: 800;
          }
          .about-underline::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 50%;
            width: 0;
            height: 3px;
            background: linear-gradient(to right, #3b82f6, #9333ea);
            transition: width 0.4s ease, left 0.4s ease;
          }
          .about-underline:hover::after {
            width: 100%;
            left: 0;
          }
          .glitch {
            position: relative;
            animation: glitch 2s linear infinite;
          }
          .glitch::before, .glitch::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            clip: rect(0, 900px, 0, 0);
          }
          .glitch::before {
            left: 2px;
            text-shadow: -1px 0 #3b82f6;
            animation: glitch-top 1s linear infinite;
          }
          .glitch::after {
            left: -2px;
            text-shadow: 1px 0 #9333ea;
            animation: glitch-bottom 1.5s linear infinite;
          }
          @keyframes glitch {
            0%, 100% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
          }
          @keyframes glitch-top {
            0% { clip: rect(0, 900px, 0, 0); }
            10% { clip: rect(10px, 900px, 20px, 0); }
            20% { clip: rect(50px, 900px, 60px, 0); }
            30% { clip: rect(20px, 900px, 30px, 0); }
            100% { clip: rect(0, 900px, 0, 0); }
          }
          @keyframes glitch-bottom {
            0% { clip: rect(0, 900px, 0, 0); }
            10% { clip: rect(80px, 900px, 90px, 0); }
            20% { clip: rect(40px, 900px, 50px, 0); }
            30% { clip: rect(60px, 900px, 70px, 0); }
            100% { clip: rect(0, 900px, 0, 0); }
          }
          .portfolio-3d {
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(59, 130, 246, 0.5);
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            padding: 8px 16px;
            border-radius: 8px;
            transform: perspective(1000px) rotateX(0deg);
            transition: transform 0.3s ease;
          }
          .testimonial-glow {
            text-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
            position: relative;
          }
          .particle-dots::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px);
            background-size: 10px 10px;
            opacity: 0.5;
            animation: particles 5s linear infinite;
          }
          @keyframes particles {
            0% { transform: translateY(0); opacity: 0.5; }
            100% { transform: translateY(-10px); opacity: 0.2; }
          }
          .circuit-underline::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 0;
            height: 2px;
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="2"><path d="M0,1 H5 V0 H10" fill="none" stroke="%233b82f6" stroke-width="1"/></svg>') repeat-x;
            animation: circuit-draw 2s linear forwards;
          }
          @keyframes circuit-draw {
            to { width: 100%; }
          }
          .input-error {
            border-color: #f87171 !important;
          }
        `}
      </style>

      {/* Hero Section */}
      <Navbar />
      <section
        className="py-20 lg:py-32 flex flex-col justify-center min-h-screen relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:flex lg:items-center lg:justify-between">
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.h1
                variants={itemVariants}
                className={`font-bold tracking-tight tech-outline ${
                  isMobile ? "text-3xl" : isTablet ? "text-4xl" : isDesktop ? "text-5xl" : "text-6xl"
                }`}
              >
                <span className="block text-blue-200">
                  <TypewriterText text={CONTENT.hero.greeting} delay={100} />
                </span>
                <span className="block text-black">
                  <TypewriterText text={CONTENT.hero.name} delay={100} />
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className={`${isMobile ? "text-base" : "text-xl"} max-w-3xl text-gray-200`}
              >
                {CONTENT.hero.description}
              </motion.p>
              <motion.div variants={itemVariants} className="flex space-x-6">
                <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-gray-400 hover:text-blue-400">
                  <Instagram className="h-6 w-6" />
                </motion.a>
                <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-gray-400 hover:text-blue-400">
                  <Linkedin className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://github.com/MrChampion2020"
                  whileHover={{ scale: 1.2 }}
                  className="text-gray-400 hover:text-blue-400"
                >
                  <Github className="h-6 w-6" />
                </motion.a>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <motion.a
                  href="#contact"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-purple-700 transition"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
                >
                  {CONTENT.hero.hireMe}
                </motion.a>
                <motion.a
                  href="/cv"
                  className="px-6 py-3 border border-gray-600 text-gray-200 font-medium rounded-full hover:bg-gray-800 transition"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
                >
                  {CONTENT.hero.downloadCV}
                </motion.a>
              </motion.div>
            </motion.div>
            <motion.div
              variants={imageVariants}
              whileHover="hover"
              className="mt-10 lg:mt-0 lg:ml-10 relative"
            >
              <WaveAnimation className={`${isMobile ? "scale-75" : isTablet ? "scale-90" : "scale-100"}`} />
              <ProfileWave className={`${isMobile ? "scale-75" : isTablet ? "scale-90" : "scale-100"}`} />
              <img
                src={me}
                alt="Champion Aden"
                className="w-64 h-64 rounded-full shadow-lg object-cover relative z-50 mt-10 lg:mt-0 lg:ml-10"
                style={{ transform: `translateY(${parallaxY.get()}px)`, border: "2px solid grey", borderRadius: "50%" }}
              />
            </motion.div>
          </div>
        </motion.div>
        <Background />
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AboutHeading text={CONTENT.about.title} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={imageVariants} whileHover="hover" className="h-[600px]">
              <img
                src={me2}
                alt="About Champion Aden"
                className="w-full h-[100%] rounded-lg shadow-lg object-cover backdrop-blur-sm bg-gray-700/30"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6">
              <p className={`text-gray-200 ${isMobile ? "text-base" : "text-lg"}`}>
                {CONTENT.about.description1}
              </p>
              <p className={`text-gray-200 ${isMobile ? "text-base" : "text-lg"}`}>
                {CONTENT.about.description2}
              </p>
              <div className="flex flex-wrap gap-4">
                {CONTENT.about.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    className="px-4 py-2 bg-gray-700/30 backdrop-blur-sm text-gray-200 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.1, backgroundColor: "#1E40AF" }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ProjectsHeading text={CONTENT.projects.title} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CONTENT.projects.items.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-[50%] h-48 object-cover"
                  variants={imageVariants}
                  whileHover="hover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-200 mb-4">{project.description}</p>
                  <motion.a
                    href={project.link}
                    className="text-blue-400 hover:text-purple-400 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                  >
                    View Project
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-gray-800/50 backdrop-blur-sm">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PortfolioHeading text={CONTENT.portfolio.title} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CONTENT.portfolio.items.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-700/30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  variants={imageVariants}
                  whileHover="hover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-200 mb-4">{item.description}</p>
                  <motion.a
                    href={item.link}
                    className="text-blue-400 hover:text-purple-400 font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                  >
                    View Live Site
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Customer Remarks Section */}
      <section id="testimonials" className="py-20 bg-gray-900">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <TestimonialsHeading text={CONTENT.testimonials.title} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CONTENT.testimonials.items.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/30 backdrop-blur-sm rounded-lg shadow-lg p-6"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-200 italic">"{testimonial.remark}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ContactHeading text={CONTENT.contact.title} />
          <div className={`grid ${isTablet ? "grid-cols-1" : "grid-cols-2"} gap-12`}>
            <motion.div variants={itemVariants} className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    {CONTENT.contact.form.nameLabel}
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-full border-gray-600 bg-gray-800/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 ${errors.name ? 'input-error' : ''}`}
                    variants={itemVariants}
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
                  />
                  {errors.name && (
                    <motion.p
                      variants={errorVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    {CONTENT.contact.form.emailLabel}
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-full border-gray-600 bg-gray-800/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 ${errors.email ? 'input-error' : ''}`}
                    variants={itemVariants}
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
                  />
                  {errors.email && (
                    <motion.p
                      variants={errorVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                    {CONTENT.contact.form.subjectLabel}
                  </label>
                  <motion.input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-full border-gray-600 bg-gray-800/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 ${errors.subject ? 'input-error' : ''}`}
                    variants={itemVariants}
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
                  />
                  {errors.subject && (
                    <motion.p
                      variants={errorVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.subject}
                    </motion.p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    {CONTENT.contact.form.messageLabel}
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`mt-1 block w-full rounded-lg border-gray-600 bg-gray-800/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 ${errors.message ? 'input-error' : ''}`}
                    variants={itemVariants}
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
                  />
                  {errors.message && (
                    <motion.p
                      variants={errorVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-red-400 text-sm mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full transition ${
                    isProcessing ? "opacity-70 cursor-not-allowed" : "hover:from-blue-600 hover:to-purple-700"
                  }`}
                  disabled={isProcessing}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
                >
                  {isProcessing ? CONTENT.contact.form.sending : CONTENT.contact.form.submitButton}
                </motion.button>
              </form>
              {submitStatus === "success" && (
                <motion.p
                  variants={itemVariants}
                  className="text-green-400 mt-6 font-medium"
                >
                  {CONTENT.contact.form.successMessage}
                </motion.p>
              )}
              {submitStatus === "error" && (
                <motion.p
                  variants={itemVariants}
                  className="text-red-400 mt-6 font-medium"
                >
                  {CONTENT.contact.form.errorMessage}
                </motion.p>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className={`font-bold text-blue-400 ${isMobile ? "text-xl" : "text-2xl"}`}>
                {CONTENT.contact.info.title}
              </h3>
              <div className="space-y-6 bg-gray-800/30 backdrop-blur-sm rounded-lg p-6">
                <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <Mail className="h-6 w-6 text-blue-400" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{CONTENT.contact.info.email.label}</h4>
                    <p className="text-gray-200">{CONTENT.contact.info.email.value}</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <Phone className="h-6 w-6 text-blue-400" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{CONTENT.contact.info.phone.label}</h4>
                    <p className="text-gray-200">{CONTENT.contact.info.phone.value}</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <MapPin className="h-6 w-6 text-blue-400" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{CONTENT.contact.info.address.label}</h4>
                    <p className="text-gray-200">{CONTENT.contact.info.address.value}</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <Clock className="h-6 w-6 text-blue-400" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{CONTENT.contact.info.availability.label}</h4>
                    <p className="text-gray-200">{CONTENT.contact.info.availability.value}</p>
                  </div>
                </motion.div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-4">{CONTENT.contact.info.followMe}</h4>
                  <div className="flex space-x-4">
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-blue-400"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Instagram className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-blue-400"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Linkedin className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      href="https://github.com/MrChampion2020"
                      className="text-gray-400 hover:text-blue-400"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Github className="h-6 w-6" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;







  
  
  // import React, { useState, useEffect } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { Instagram, Linkedin, Github, Mail, Phone, MapPin, Clock } from "lucide-react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import Background from "../../components/Background";
// import me from "../../assets/me.png";
// import me2 from "../../assets/mine.jpg";
// import shopfast from "../../assets/bgdark.png";
// import catchup from "../../assets/bgdark.png";
// import primeprocurement from "../../assets/bgdark.png";
// import portfolio from "../../assets/bgdark.png";
// import avatar1 from "../../assets/Avatar1.png";
// import avatar2 from "../../assets/Avatar1.png";
// import avatar3 from "../../assets/Avatar1.png";
// import bg from "../../assets/bgdark.png";
// import { useMediaQuery } from "react-responsive";
// import axios from "axios";
// import API_URL from "./config";

// // Content Constants
// const CONTENT = {
//   hero: {
//     greeting: "Hi, I am",
//     name: "Champion Aden",
//     description: "Full Stack Developer crafting scalable web and mobile applications with MERN stack and modern technologies.",
//     hireMe: "Hire Me",
//     downloadCV: "Download CV",
//   },
//   about: {
//     title: "About Me",
//     description1: "With over 5 years of experience as a Full Stack Developer, I specialize in building scalable web and mobile applications using the MERN stack. Currently, I lead React Native development at Pejul Digital Agency and freelance as a React.js developer for Pixel Freelancer, USA.",
//     description2: "My expertise includes JavaScript (ES6+), TypeScript, Node.js, Express, MongoDB, and React Native. I’m passionate about creating intuitive user experiences and implementing modern authentication methods like JWT.",
//     skills: ["React", "Node.js", "MongoDB", "TypeScript", "React Native", "Express"],
//   },
//   projects: {
//     title: "Featured Projects",
//     items: [
//       {
//         image: shopfast,
//         title: "ShopFast E-commerce",
//         description: "A scalable e-commerce platform built with MERN stack, featuring secure payments and user authentication.",
//         link: "https://shopfast-gilt.wercelapp",
//       },
//       {
//         image: catchup,
//         title: "Node.js Chat Application",
//         description: "A real-time chat application using Node.js, Express, and WebSockets for seamless communication.",
//         link: "https://catchup-eight.wercelapp",
//       },
//       {
//         image: primeprocurement,
//         title: "Prime Procurement Website",
//         description: "A professional company portfolio website showcasing services, built with modern web technologies.",
//         link: "https://www.primeprocurementus.com",
//       },
//     ],
//   },
//   portfolio: {
//     title: "Portfolio",
//     items: [
//       {
//         image: shopfast,
//         title: "ShopFast E-commerce",
//         description: "An interactive e-commerce platform with secure payment options and user accounts.",
//         link: "https://shopfast-gilt.wercelapp",
//       },
//       {
//         image: catchup,
//         title: "CatchUp Chat",
//         description: "A modern real-time chat app with a clean UI, powered by Node.js and WebSockets.",
//         link: "https://catchup-eight.wercelapp",
//       },
//       {
//         image: portfolio,
//         title: "Personal Portfolio",
//         description: "A TypeScript-based portfolio showcasing my skills and projects.",
//         link: "https://me.championaden.online",
//       },
//     ],
//   },
//   testimonials: {
//     title: "What Clients Say",
//     items: [
//       {
//         name: "Dr. Omoregie",
//         role: "Client",
//         remark: "Champion you will go places, your humility and reponse to work is too rare, you patiently listened and delivered every piece of the job and most importantly, very fast.",
//         avatar: avatar1,
//       },
//       {
//         name: "Michael Scott",
//         role: "CTO, Scottified",
//         remark: "Is mobile app that easy? you were too fast. Thank you Champion for making our app a reality",
//         avatar: avatar2,
//       },
//       {
//         name: "Mr. Charles",
//         role: "Founder, Prime Procurement",
//         remark: "Champion's portfolio website elevated our brand. His skills in TypeScript and React are top-notch!",
//         avatar: avatar3,
//       },
//     ],
//   },
//   contact: {
//     title: "Get in Touch",
//     form: {
//       nameLabel: "Name",
//       emailLabel: "Email",
//       subjectLabel: "Subject",
//       messageLabel: "Message",
//       submitButton: "Send Message",
//       sending: "Sending...",
//       successMessage: "Message sent successfully!",
//       errorMessage: "There was an error sending your message. Please try again.",
//     },
//     info: {
//       title: "Contact Information",
//       email: {
//         label: "Email",
//         value: "championaden.ca@gmail.com",
//       },
//       phone: {
//         label: "Phone",
//         value: "+2349030155327",
//       },
//       address: {
//         label: "Address",
//         value: "101, Ajah, Lagos, Nigeria",
//       },
//       availability: {
//         label: "Availability",
//         value: "Open to work",
//       },
//       followMe: "Follow Me",
//     },
//   },
// };

// // Wave Animation Component
// const WaveAnimation = ({ className }) => {
//   return (
//     <motion.svg
//       width="400"
//       height="400"
//       viewBox="0 0 400 400"
//       className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
//       initial={{ opacity: 0.4, rotate: 0 }}
//       animate={{ opacity: 0.8, rotate: 360 }}
//       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//     >
//       <path
//         d="M200,80 C240,80 270,110 270,150 C270,190 240,220 200,220 C160,220 130,190 130,150 C130,110 160,80 200,80 Z"
//         fill="none"
//         stroke="silver"
//         strokeWidth="1"
//         strokeDasharray="5,5"
//       />
//       <path
//         d="M200,60 C250,60 290,100 290,150 C290,200 250,240 200,240 C150,240 110,200 110,150 C110,100 150,60 200,60 Z"
//         fill="none"
//         stroke="silver"
//         strokeWidth="1"
//       />
//       <path
//         d="M200,40 C260,40 310,90 310,150 C310,210 260,260 200,260 C140,260 90,210 90,150 C90,90 140,40 200,40 Z"
//         fill="none"
//         stroke="silver"
//         strokeWidth="1"
//         strokeDasharray="10,5"
//       />
//     </motion.svg>
//   );
// };

// // Profile Wave Animation Component
// const ProfileWave = ({ className }) => (
//   <motion.svg
//     width="280"
//     height="280"
//     viewBox="0 0 280 280"
//     className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
//     initial={{ opacity: 0.4, rotate: 0 }}
//     animate={{ opacity: 0.8, rotate: 360 }}
//     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//     >
//       <path
//         d="M140,70 C160,70 175,85 175,105 C175,125 160,140 140,140 C120,140 105,125 105,105 C105,85 120,70 140,70 Z"
//         fill="none"
//         stroke="silver"
//         strokeWidth="1"
//         strokeDasharray="5,5"
//       />
//       <path
//         d="M140,60 C165,60 185,80 185,105 C185,130 165,150 140,150 C115,150 95,130 95,105 C95,80 115,60 140,60 Z"
//         fill="none"
//         stroke="silver"
//         strokeWidth="1"
//       />
//       <path
//         d="M140,50 C170,50 195,75 195,105 C195,135 170,160 140,160 C110,160 85,135 85,105 C85,75 110,50 140,50 Z"
//         fill="none"
//         stroke="silver"
//         strokeWidth="1"
//         strokeDasharray="10,5"
//       />
//     </motion.svg>
// );

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

// const imageVariants = {
//   hidden: { scale: 0.9, opacity: 0, rotate: 3 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     rotate: 0,
//     transition: { duration: 0.8, ease: "easeOut" },
//   },
//   hover: { scale: 1.05, transition: { duration: 0.3 } },
// };

// const buttonVariants = {
//   hover: { scale: 1.05, boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" },
//   tap: { scale: 0.95 },
// };

// // Typewriter Text Component
// const TypewriterText = ({ text, delay = 100 }) => {
//   const [displayText, setDisplayText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     if (currentIndex < text.length) {
//       const timeout = setTimeout(() => {
//         setDisplayText((prev) => prev + text[currentIndex]);
//         setCurrentIndex((prev) => prev + 1);
//       }, delay);
//       return () => clearTimeout(timeout);
//     }
//   }, [currentIndex, text, delay]);

//   return <span>{displayText}</span>;
// };

// // Home Component
// const Home = () => {
//   const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
//   const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
//   const isDesktop = useMediaQuery({ query: "(max-width: 1024px)" });

//   const { scrollY } = useScroll();
//   const parallaxY = useTransform(scrollY, [0, 300], [0, -50]);

//   // Contact Form State
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [submitStatus, setSubmitStatus] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);
//     try {
//       const response = await axios.post(`${API_URL}/api/contact`, formData, {
//         headers: { "Content-Type": "application/json" },
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
//           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
//           body { font-family: 'Inter', sans-serif; }
//           .tech-outline {
//             text-shadow: 0 0 5px rgba(59, 130, 246, 0.8), 0 0 10px rgba(147, 51, 234, 0.5);
//             font-weight: 800;
//           }
//         `}
//       </style>

//       {/* Hero Section */}
//       <Navbar />
//       <section
//         className="py-20 lg:py-32 flex flex-col justify-center min-h-screen relative overflow-hidden"
//         style={{
//           backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <motion.div
//           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <div className="lg:flex lg:items-center lg:justify-between">
//             <motion.div variants={itemVariants} className="space-y-8">
//               <motion.h1
//                 variants={itemVariants}
//                 className={`font-bold tracking-tight tech-outline ${
//                   isMobile ? "text-3xl" : isTablet ? "text-4xl" : isDesktop ? "text-5xl" : "text-6xl"
//                 }`}
//               >
//                 <span className="block text-navy">
//                   <TypewriterText text={CONTENT.hero.greeting} delay={100} />
//                 </span>
//                 <span className="block text-black">
//                   <TypewriterText text={CONTENT.hero.name} delay={100} />
//                 </span>
//               </motion.h1>


//               <motion.p
//                 variants={itemVariants}
//                 className={`${isMobile ? "text-base" : "text-xl"} max-w-3xl text-gray-200`}
//               >
//                 {CONTENT.hero.description}
//               </motion.p>
//               <motion.div variants={itemVariants} className="flex space-x-6">
//                 <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-gray-400 hover:text-blue-400">
//                   <Instagram className="h-6 w-6" />
//                 </motion.a>
//                 <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-gray-400 hover:text-blue-400">
//                   <Linkedin className="h-6 w-6" />
//                 </motion.a>
//                 <motion.a
//                   href="https://github.com/MrChampion2020"
//                   whileHover={{ scale: 1.2 }}
//                   className="text-gray-400 hover:text-blue-400"
//                 >
//                   <Github className="h-6 w-6" />
//                 </motion.a>
//               </motion.div>
//               <motion.div
//                 variants={itemVariants}
//                 className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
//               >
//                 <motion.a
//                   href="#contact"
//                   className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-purple-700 transition"
//                   variants={buttonVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                   style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
//                 >
//                   {CONTENT.hero.hireMe}
//                 </motion.a>
//                 <motion.a
//                   href="/cv"
//                   className="px-6 py-3 border border-gray-600 text-gray-200 font-medium rounded-full hover:bg-gray-800 transition"
//                   variants={buttonVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                   style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
//                 >
//                   {CONTENT.hero.downloadCV}
//                 </motion.a>
//               </motion.div>
//             </motion.div>
//             <motion.div
//               variants={imageVariants}
//               whileHover="hover"
//               className="mt-10 lg:mt-0 lg:ml-10 relative"
//             >
//               <WaveAnimation className={`${isMobile ? "scale-75" : isTablet ? "scale-90" : "scale-100"}`} />
//               <ProfileWave className={`${isMobile ? "scale-75" : isTablet ? "scale-90" : "scale-100"}`} />
//               <img
//                 src={me}
//                 alt="Champion Aden"
//                 className="w-64 h-64 rounded-full shadow-lg object-cover relative z-50 mt-10 lg:mt-0 lg:ml-10"
//                 style={{ transform: `translateY(${parallaxY.get()}px)`, border: "2px solid grey", borderRadius: "50%" }}
//               />
//             </motion.div>
//           </div>
//         </motion.div>
//         <Background />
//       </section>

//       {/* About Me Section */}
//       <section id="about" className="py-20 bg-gray-800/50 backdrop-blur-sm">
//         <motion.div
//           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <motion.h2
//             variants={itemVariants}
//             className={`font-bold text-center text-blue-400 mb-12 ${
//               isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
//             }`}
//           >
//             {CONTENT.about.title}
//           </motion.h2>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <motion.div variants={imageVariants} whileHover="hover" className="h-[600px]">
//               <img
//                 src={me2}
//                 alt="About Champion Aden"
//                 className="w-full h-[100%] rounded-lg shadow-lg object-cover backdrop-blur-sm bg-gray-700/30"
//               />
//             </motion.div>
//             <motion.div variants={itemVariants} className="space-y-6">
//               <p className={`text-gray-200 ${isMobile ? "text-base" : "text-lg"}`}>
//                 {CONTENT.about.description1}
//               </p>
//               <p className={`text-gray-200 ${isMobile ? "text-base" : "text-lg"}`}>
//                 {CONTENT.about.description2}
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 {CONTENT.about.skills.map((skill) => (
//                   <motion.span
//                     key={skill}
//                     className="px-4 py-2 bg-gray-700/30 backdrop-blur-sm text-gray-200 rounded-full text-sm font-medium"
//                     whileHover={{ scale: 1.1, backgroundColor: "#1E40AF" }}
//                   >
//                     {skill}
//                   </motion.span>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>

//       {/* Projects Section */}
//       <section id="projects" className="py-20 bg-gray-900">
//         <motion.div
//           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <motion.h2
//             variants={itemVariants}
//             className={`font-bold text-center text-blue-400 mb-12 ${
//               isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
//             }`}
//           >
//             {CONTENT.projects.title}
//           </motion.h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {CONTENT.projects.items.map((project, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="bg-gray-800/30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
//                 whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
//               >
//                 <motion.img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-48 object-cover"
//                   variants={imageVariants}
//                   whileHover="hover"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
//                   <p className="text-gray-200 mb-4">{project.description}</p>
//                   <motion.a
//                     href={project.link}
//                     className="text-blue-400 hover:text-purple-400 font-medium"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ x: 5 }}
//                   >
//                     View Project
//                   </motion.a>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </section>

//       {/* Portfolio Section */}
//       <section id="portfolio" className="py-20 bg-gray-800/50 backdrop-blur-sm">
//         <motion.div
//           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <motion.h2
//             variants={itemVariants}
//             className={`font-bold text-center text-blue-400 mb-12 ${
//               isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
//             }`}
//           >
//             {CONTENT.portfolio.title}
//           </motion.h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {CONTENT.portfolio.items.map((item, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="bg-gray-700/30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
//                 whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
//               >
//                 <motion.img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-48 object-cover"
//                   variants={imageVariants}
//                   whileHover="hover"
//                 />
//                 <div className="p-6">
//                   <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
//                   <p className="text-gray-200 mb-4">{item.description}</p>
//                   <motion.a
//                     href={item.link}
//                     className="text-blue-400 hover:text-purple-400 font-medium"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ x: 5 }}
//                   >
//                     View Live Site
//                   </motion.a>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </section>

//       {/* Customer Remarks Section */}
//       <section id="testimonials" className="py-20 bg-gray-900">
//         <motion.div
//           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <motion.h2
//             variants={itemVariants}
//             className={`font-bold text-center text-blue-400 mb-12 ${
//               isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
//             }`}
//           >
//             {CONTENT.testimonials.title}
//           </motion.h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {CONTENT.testimonials.items.map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 className="bg-gray-800/30 backdrop-blur-sm rounded-lg shadow-lg p-6"
//                 whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
//               >
//                 <div className="flex items-center mb-4">
//                   <img
//                     src={testimonial.avatar}
//                     alt={testimonial.name}
//                     className="w-12 h-12 rounded-full mr-4 object-cover"
//                   />
//                   <div>
//                     <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
//                     <p className="text-gray-400 text-sm">{testimonial.role}</p>
//                   </div>
//                 </div>
//                 <p className="text-gray-200 italic">"{testimonial.remark}"</p>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-20 bg-gray-900">
//         <motion.div
//           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <motion.h2
//             variants={itemVariants}
//             className={`font-bold text-center text-blue-400 mb-12 ${
//               isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
//             }`}
//           >
//             {CONTENT.contact.title}
//           </motion.h2>
//           <div className={`grid ${isTablet ? "grid-cols-1" : "grid-cols-2"} gap-12`}>
//             <motion.div variants={itemVariants} className="space-y-6">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-300">
//                     {CONTENT.contact.form.nameLabel}
//                   </label>
//                   <motion.input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full rounded-full border-gray-600 bg-gray-700/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
//                     variants={itemVariants}
//                     whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-300">
//                     {CONTENT.contact.form.emailLabel}
//                   </label>
//                   <motion.input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full rounded-full border-gray-600 bg-gray-700/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
//                     variants={itemVariants}
//                     whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
//                     {CONTENT.contact.form.subjectLabel}
//                   </label>
//                   <motion.input
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleChange}
//                     required
//                     className="mt-1 block w-full rounded-full border-gray-600 bg-gray-700/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
//                     variants={itemVariants}
//                     whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="message" className="block text-sm font-medium text-gray-300">
//                     {CONTENT.contact.form.messageLabel}
//                   </label>
//                   <motion.textarea
//                     id="message"
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     rows={5}
//                     className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
//                     variants={itemVariants}
//                     whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
//                   />
//                 </div>
//                 <motion.button
//                   type="submit"
//                   className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full transition ${
//                     isProcessing ? "opacity-70 cursor-not-allowed" : "hover:from-blue-600 hover:to-purple-700"
//                   }`}
//                   disabled={isProcessing}
//                   variants={buttonVariants}
//                   whileHover="hover"
//                   whileTap="tap"
//                   style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
//                 >
//                   {isProcessing ? CONTENT.contact.form.sending : CONTENT.contact.form.submitButton}
//                 </motion.button>
//               </form>
//               {submitStatus === "success" && (
//                 <motion.p
//                   variants={itemVariants}
//                   className="text-green-400 mt-6 font-medium"
//                 >
//                   {CONTENT.contact.form.successMessage}
//                 </motion.p>
//               )}
//               {submitStatus === "error" && (
//                 <motion.p
//                   variants={itemVariants}
//                   className="text-red-400 mt-6 font-medium"
//                 >
//                   {CONTENT.contact.form.errorMessage}
//                 </motion.p>
//               )}
//             </motion.div>
//             <motion.div variants={itemVariants} className="space-y-6">
//               <h3 className={`font-bold text-blue-400 ${isMobile ? "text-xl" : "text-2xl"}`}>
//                 {CONTENT.contact.info.title}
//               </h3>
//               <div className="space-y-6 bg-gray-800/30 backdrop-blur-sm rounded-lg p-6">
//                 <motion.div className="flex items-center space-x-4" variants={itemVariants}>
//                   <motion.div whileHover={{ scale: 1.2 }}>
//                     <Mail className="h-6 w-6 text-blue-400" />
//                   </motion.div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-white">{CONTENT.contact.info.email.label}</h4>
//                     <p className="text-gray-200">{CONTENT.contact.info.email.value}</p>
//                   </div>
//                 </motion.div>
//                 <motion.div className="flex items-center space-x-4" variants={itemVariants}>
//                   <motion.div whileHover={{ scale: 1.2 }}>
//                     <Phone className="h-6 w-6 text-blue-400" />
//                   </motion.div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-white">{CONTENT.contact.info.phone.label}</h4>
//                     <p className="text-gray-200">{CONTENT.contact.info.phone.value}</p>
//                   </div>
//                 </motion.div>
//                 <motion.div className="flex items-center space-x-4" variants={itemVariants}>
//                   <motion.div whileHover={{ scale: 1.2 }}>
//                     <MapPin className="h-6 w-6 text-blue-400" />
//                   </motion.div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-white">{CONTENT.contact.info.address.label}</h4>
//                     <p className="text-gray-200">{CONTENT.contact.info.address.value}</p>
//                   </div>
//                 </motion.div>
//                 <motion.div className="flex items-center space-x-4" variants={itemVariants}>
//                   <motion.div whileHover={{ scale: 1.2 }}>
//                     <Clock className="h-6 w-6 text-blue-400" />
//                   </motion.div>
//                   <div>
//                     <h4 className="text-lg font-semibold text-white">{CONTENT.contact.info.availability.label}</h4>
//                     <p className="text-gray-200">{CONTENT.contact.info.availability.value}</p>
//                   </div>
//                 </motion.div>
//                 <div className="mt-6">
//                   <h4 className="text-lg font-semibold text-white mb-4">{CONTENT.contact.info.followMe}</h4>
//                   <div className="flex space-x-4">
//                     <motion.a
//                       href="#"
//                       className="text-gray-400 hover:text-blue-400"
//                       whileHover={{ scale: 1.2 }}
//                     >
//                       <Instagram className="h-6 w-6" />
//                     </motion.a>
//                     <motion.a
//                       href="#"
//                       className="text-gray-400 hover:text-blue-400"
//                       whileHover={{ scale: 1.2 }}
//                     >
//                       <Linkedin className="h-6 w-6" />
//                     </motion.a>
//                     <motion.a
//                       href="https://github.com/MrChampion2020"
//                       className="text-gray-400 hover:text-blue-400"
//                       whileHover={{ scale: 1.2 }}
//                     >
//                       <Github className="h-6 w-6" />
//                     </motion.a>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default Home;



// // import React from "react";
// // import { motion, useScroll, useTransform } from "framer-motion";
// // import { Instagram, Linkedin, Github, Mail, Phone, MapPin, Clock } from "lucide-react";
// // import Navbar from "../../components/Navbar";
// // import Footer from "../../components/Footer";
// // import Background from "../../components/Background";
// // import me from "../../assets/me.png";
// // import me2 from "../../assets/MIK_9255~2.jpg";
// // import shopfast from "../../assets/bgdark.png";
// // import catchup from "../../assets/bgdark.png";
// // import primeprocurement from "../../assets/bgdark.png";
// // import portfolio from "../../assets/bgdark.png";
// // import avatar1 from "../../assets/Avatar1.png"; // Placeholder for testimonial avatars
// // import avatar2 from "../../assets/Avatar1.png";
// // import avatar3 from "../../assets/Avatar1.png";
// // import bg from "../../assets/bgdark.png";
// // import { useMediaQuery } from "react-responsive";
// // import axios from "axios";
// // import API_URL from "./config";

// // // Wave Animation Component (Background Orbit)
// // const WaveAnimation = ({ className }) => {
// //   return (
// //     <motion.svg
// //       width="400"
// //       height="400"
// //       viewBox="0 0 400 400"
// //       className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
// //       initial={{ opacity: 0.4, rotate: 0 }}
// //       animate={{ opacity: 0.8, rotate: 360 }}
// //       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //     >
// //       <path
// //         d="M200,80 C240,80 270,110 270,150 C270,190 240,220 200,220 C160,220 130,190 130,150 C130,110 160,80 200,80 Z"
// //         fill="none"
// //         stroke="silver"
// //         strokeWidth="1"
// //         strokeDasharray="5,5"
// //       />
// //       <path
// //         d="M200,60 C250,60 290,100 290,150 C290,200 250,240 200,240 C150,240 110,200 110,150 C110,100 150,60 200,60 Z"
// //         fill="none"
// //         stroke="silver"
// //         strokeWidth="1"
// //       />
// //       <path
// //         d="M200,40 C260,40 310,90 310,150 C310,210 260,260 200,260 C140,260 90,210 90,150 C90,90 140,40 200,40 Z"
// //         fill="none"
// //         stroke="silver"
// //         strokeWidth="1"
// //         strokeDasharray="10,5"
// //       />
// //     </motion.svg>
// //   );
// // };

// // // Profile Wave Animation Component (Around Profile Picture)
// // const ProfileWave = ({ className }) => (
// //   <motion.svg
// //     width="280"
// //     height="280"
// //     viewBox="0 0 280 280"
// //     className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
// //     initial={{ opacity: 0.4, rotate: 0 }}
// //     animate={{ opacity: 0.8, rotate: 360 }}
// //     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //   >
// //     <path
// //       d="M140,70 C160,70 175,85 175,105 C175,125 160,140 140,140 C120,140 105,125 105,105 C105,85 120,70 140,70 Z"
// //       fill="none"
// //       stroke="silver"
// //       strokeWidth="1"
// //       strokeDasharray="5,5"
// //     />
// //     <path
// //       d="M140,60 C165,60 185,80 185,105 C185,130 165,150 140,150 C115,150 95,130 95,105 C95,80 115,60 140,60 Z"
// //       fill="none"
// //       stroke="silver"
// //       strokeWidth="1"
// //     />
// //     <path
// //       d="M140,50 C170,50 195,75 195,105 C195,135 170,160 140,160 C110,160 85,135 85,105 C85,75 110,50 140,50 Z"
// //       fill="none"
// //       stroke="silver"
// //       strokeWidth="1"
// //       strokeDasharray="10,5"
// //     />
// //   </motion.svg>
// // );

// // // Animation Variants
// // const containerVariants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       delayChildren: 0.3,
// //       staggerChildren: 0.2,
// //     },
// //   },
// // };

// // const itemVariants = {
// //   hidden: { y: 50, opacity: 0 },
// //   visible: {
// //     y: 0,
// //     opacity: 1,
// //     transition: { duration: 0.8, ease: "easeOut" },
// //   },
// // };

// // const letterVariants = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: { duration: 0.5 },
// //   },
// // };

// // const imageVariants = {
// //   hidden: { scale: 0.9, opacity: 0, rotate: 3 },
// //   visible: {
// //     scale: 1,
// //     opacity: 1,
// //     rotate: 0,
// //     transition: { duration: 0.8, ease: "easeOut" },
// //   },
// //   hover: { scale: 1.05, transition: { duration: 0.3 } },
// // };

// // const buttonVariants = {
// //   hover: { scale: 1.05, boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" },
// //   tap: { scale: 0.95 },
// // };

// // // Animated Text Component
// // const AnimatedText = ({ text }) => {
// //   return (
// //     <span>
// //       {text.split("").map((char, index) => (
// //         <motion.span
// //           key={index}
// //           variants={letterVariants}
// //           style={{ display: "inline-block" }}
// //         >
// //           {char}
// //         </motion.span>
// //       ))}
// //     </span>
// //   );
// // };

// // // Project and Portfolio Data
// // const projects = [
// //   {
// //     image: shopfast,
// //     title: "ShopFast E-commerce",
// //     description: "A scalable e-commerce platform built with MERN stack, featuring secure payments and user authentication.",
// //     link: "https://shopfast-gilt.wercelapp",
// //   },
// //   {
// //     image: catchup,
// //     title: "Node.js Chat Application",
// //     description: "A real-time chat application using Node.js, Express, and WebSockets for seamless communication.",
// //     link: "https://catchup-eight.wercelapp",
// //   },
// //   {
// //     image: primeprocurement,
// //     title: "Prime Procurement Website",
// //     description: "A professional company portfolio website showcasing services, built with modern web technologies.",
// //     link: "https://www.primeprocurementus.com",
// //   },
// // ];

// // const portfolioItems = [
// //   {
// //     image: shopfast,
// //     title: "ShopFast E-commerce",
// //     description: "An interactive e-commerce platform with secure payment options and user accounts.",
// //     link: "https://shopfast-gilt.wercelapp",
// //   },
// //   {
// //     image: catchup,
// //     title: "CatchUp Chat",
// //     description: "A modern real-time chat app with a clean UI, powered by Node.js and WebSockets.",
// //     link: "https://catchup-eight.wercelapp",
// //   },
// //   {
// //     image: portfolio,
// //     title: "Personal Portfolio",
// //     description: "A TypeScript-based portfolio showcasing my skills and projects.",
// //     link: "https://me.championaden.online",
// //   },
// // ];

// // // Customer Remarks Data
// // const testimonials = [
// //   {
// //     name: "Dr. Omoregie",
// //     role: "Client",
// //     remark: "Champion you will go places, your humility and reponse to work is too rare, you patiently listened and delivered every piece of the job and most importantly, very fast.",
// //     avatar: avatar1,
// //   },
// //   {
// //     name: "Michael Scott",
// //     role: "CTO, Scottified",
// //     remark: "Is mobile app that easy? you were too fast. Thank you Champion for making our app a reality",
// //     avatar: avatar2,
// //   },
// //   {
// //     name: "Mr. Charles",
// //     role: "Founder, Prime Procurement",
// //     remark: "Champion's portfolio website elevated our brand. His skills in TypeScript and React are top-notch!",
// //     avatar: avatar3,
// //   },
// // ];

// // const Home = () => {
// //   const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
// //   const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
// //   const isDesktop = useMediaQuery({ query: "(max-width: 1024px)" });
// //   const isLarge = useMediaQuery({ query: "(min-width: 1280px)" });

// //   const { scrollY } = useScroll();
// //   const parallaxY = useTransform(scrollY, [0, 300], [0, -50]);

// //   // Contact Form State
// //   const [formData, setFormData] = React.useState({
// //     name: "",
// //     email: "",
// //     subject: "",
// //     message: "",
// //   });
// //   const [submitStatus, setSubmitStatus] = React.useState(null);
// //   const [isProcessing, setIsProcessing] = React.useState(false);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsProcessing(true);
// //     try {
// //       const response = await axios.post(`${API_URL}/api/contact`, formData, {
// //         headers: { "Content-Type": "application/json" },
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
// //       setIsProcessing(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white font-sans">
// //       <style>
// //         {`
// //           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
// //           body { font-family: 'Inter', sans-serif; }
// //         `}
// //       </style>

// //       {/* Hero Section */}
// //       <Navbar />
// //       <section
// //         className="py-20 lg:py-32 flex flex-col justify-center min-h-screen relative overflow-hidden"
// //         style={{
// //           backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bg})`,
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //         }}
// //       >
// //         <motion.div
// //           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
// //           variants={containerVariants}
// //           initial="hidden"
// //           animate="visible"
// //         >
// //           <div className="lg:flex lg:items-center lg:justify-between">
// //             <motion.div variants={itemVariants} className="space-y-8">
// //               <motion.h1
// //                 variants={itemVariants}
// //                 className={`font-bold tracking-tight ${
// //                   isMobile ? "text-3xl" : isTablet ? "text-4xl" : isDesktop ? "text-5xl" : "text-6xl"
// //                 }`}
// //               >
// //                 <span className="block text-gray-400">
// //                   <AnimatedText text="Hello, I'm" />
// //                 </span>
// //                 <span className="block text-blue-400">
// //                   <AnimatedText text="Champion Aden" />
// //                 </span>
// //               </motion.h1>
// //               <motion.p
// //                 variants={itemVariants}
// //                 className={`${isMobile ? "text-base" : "text-xl"} max-w-3xl text-gray-200`}
// //               >
// //                 Full Stack Developer crafting scalable web and mobile applications with MERN stack and modern technologies.
// //               </motion.p>
// //               <motion.div variants={itemVariants} className="flex space-x-6">
// //                 <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-gray-400 hover:text-blue-400">
// //                   <Instagram className="h-6 w-6" />
// //                 </motion.a>
// //                 <motion.a href="#" whileHover={{ scale: 1.2 }} className="text-gray-400 hover:text-blue-400">
// //                   <Linkedin className="h-6 w-6" />
// //                 </motion.a>
// //                 <motion.a
// //                   href="https://github.com/MrChampion2020"
// //                   whileHover={{ scale: 1.2 }}
// //                   className="text-gray-400 hover:text-blue-400"
// //                 >
// //                   <Github className="h-6 w-6" />
// //                 </motion.a>
// //               </motion.div>
// //               <motion.div
// //                 variants={itemVariants}
// //                 className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
// //               >
// //                 <motion.a
// //                   href="#contact"
// //                   className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full hover:from-blue-600 hover:to-purple-700 transition"
// //                   variants={buttonVariants}
// //                   whileHover="hover"
// //                   whileTap="tap"
// //                   style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
// //                 >
// //                   Hire Me
// //                 </motion.a>
// //                 <motion.a
// //                   href="/cv"
// //                   className="px-6 py-3 border border-gray-600 text-gray-200 font-medium rounded-full hover:bg-gray-800 transition"
// //                   variants={buttonVariants}
// //                   whileHover="hover"
// //                   whileTap="tap"
// //                   style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
// //                 >
// //                   Download CV
// //                 </motion.a>
// //               </motion.div>
// //             </motion.div>
// //             <motion.div
// //               variants={imageVariants}
// //               whileHover="hover"
// //               className="mt-10 lg:mt-0 lg:ml-10 relative"

// //             >
// //               <WaveAnimation className={`${isMobile ? "scale-75" : isTablet ? "scale-90" : "scale-100"}`} />
// //               <ProfileWave className={`${isMobile ? "scale-75" : isTablet ? "scale-90" : "scale-100"}`} />
// //               <img
// //                 src={me}
// //                 alt="Champion Aden"
// //                 className="w-64 h-64 rounded-full shadow-lg object-cover relative z-50 mt-10 lg:mt-0 lg:ml-10"
// //                 style={{ transform: `translateY(${parallaxY.get()}px)`, border: "2px solid grey", borderRadius: "50%" }}
              

// //               />
// //             </motion.div>
// //           </div>
// //         </motion.div>
// //         <Background />
// //       </section>

// //       {/* About Me Section */}
// //       <section id="about" className="py-20 bg-gray-800/50 backdrop-blur-sm">
// //         <motion.div
// //           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
// //           variants={containerVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true }}
// //         >
// //           <motion.h2
// //             variants={itemVariants}
// //             className={`font-bold text-center text-blue-400 mb-12 ${
// //               isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
// //             }`}
// //           >
// //             <AnimatedText text="About Me" />
// //           </motion.h2>
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
// //             <motion.div variants={imageVariants} whileHover="hover" className="h-[600px]">
// //               <img
// //                 src={me2}
// //                 alt="About Champion Aden"
// //                 className="w-full h-[100%] rounded-lg shadow-lg object-cover backdrop-blur-sm bg-gray-700/30"
// //               />
// //             </motion.div>
// //             <motion.div variants={itemVariants} className="space-y-6">
// //               <p className={`text-gray-200 ${isMobile ? "text-base" : "text-lg"}`}>
// //                 With over 5 years of experience as a Full Stack Developer, I specialize in building scalable web and mobile applications using the MERN stack. Currently, I lead React Native development at Pejul Digital Agency and freelance as a React.js developer for Pixel Freelancer, USA.
// //               </p>
// //               <p className={`text-gray-200 ${isMobile ? "text-base" : "text-lg"}`}>
// //                 My expertise includes JavaScript (ES6+), TypeScript, Node.js, Express, MongoDB, and React Native. I’m passionate about creating intuitive user experiences and implementing modern authentication methods like JWT.
// //               </p>
// //               <div className="flex flex-wrap gap-4">
// //                 {["React", "Node.js", "MongoDB", "TypeScript", "React Native", "Express"].map((skill) => (
// //                   <motion.span
// //                     key={skill}
// //                     className="px-4 py-2 bg-gray-700/30 backdrop-blur-sm text-gray-200 rounded-full text-sm font-medium"
// //                     whileHover={{ scale: 1.1, backgroundColor: "#1E40AF" }}
// //                   >
// //                     {skill}
// //                   </motion.span>
// //                 ))}
// //               </div>
// //             </motion.div>
// //           </div>
// //         </motion.div>
// //       </section>

// //       {/* Projects Section */}
// //       <section id="projects" className="py-20 bg-gray-900">
// //         <motion.div
// //           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
// //           variants={containerVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true }}
// //         >
// //           <motion.h2
// //             variants={itemVariants}
// //             className={`font-bold text-center text-blue-400 mb-12 ${
// //               isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
// //             }`}
// //           >
// //             <AnimatedText text="Featured Projects" />
// //           </motion.h2>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {projects.map((project, index) => (
// //               <motion.div
// //                 key={index}
// //                 variants={itemVariants}
// //                 className="bg-gray-800/30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
// //                 whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
// //               >
// //                 <motion.img
// //                   src={project.image}
// //                   alt={project.title}
// //                   className="w-full h-48 object-cover"
// //                   variants={imageVariants}
// //                   whileHover="hover"
// //                 />
// //                 <div className="p-6">
// //                   <h3 className="text-xl font-bold text-white mb-2">
// //                     <AnimatedText text={project.title} />
// //                   </h3>
// //                   <p className="text-gray-200 mb-4">{project.description}</p>
// //                   <motion.a
// //                     href={project.link}
// //                     className="text-blue-400 hover:text-purple-400 font-medium"
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     whileHover={{ x: 5 }}
// //                   >
// //                     View Project
// //                   </motion.a>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </motion.div>
// //       </section>

// //       {/* Portfolio Section */}
// //       <section id="portfolio" className="py-20 bg-gray-800/50 backdrop-blur-sm">
// //         <motion.div
// //           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
// //           variants={containerVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true }}
// //         >
// //           <motion.h2
// //             variants={itemVariants}
// //             className={`font-bold text-center text-blue-400 mb-12 ${
// //               isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
// //             }`}
// //           >
// //             <AnimatedText text="Portfolio" />
// //           </motion.h2>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {portfolioItems.map((item, index) => (
// //               <motion.div
// //                 key={index}
// //                 variants={itemVariants}
// //                 className="bg-gray-700/30 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
// //                 whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
// //               >
// //                 <motion.img
// //                   src={item.image}
// //                   alt={item.title}
// //                   className="w-full h-48 object-cover"
// //                   variants={imageVariants}
// //                   whileHover="hover"
// //                 />
// //                 <div className="p-6">
// //                   <h3 className="text-xl font-bold text-white mb-2">
// //                     <AnimatedText text={item.title} />
// //                   </h3>
// //                   <p className="text-gray-200 mb-4">{item.description}</p>
// //                   <motion.a
// //                     href={item.link}
// //                     className="text-blue-400 hover:text-purple-400 font-medium"
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     whileHover={{ x: 5 }}
// //                   >
// //                     View Live Site
// //                   </motion.a>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </motion.div>
// //       </section>

// //       {/* Customer Remarks Section */}
// //       <section id="testimonials" className="py-20 bg-gray-900">
// //         <motion.div
// //           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
// //           variants={containerVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true }}
// //         >
// //           <motion.h2
// //             variants={itemVariants}
// //             className={`font-bold text-center text-blue-400 mb-12 ${
// //               isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
// //             }`}
// //           >
// //             <AnimatedText text="What Clients Say" />
// //           </motion.h2>
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {testimonials.map((testimonial, index) => (
// //               <motion.div
// //                 key={index}
// //                 variants={itemVariants}
// //                 className="bg-gray-800/30 backdrop-blur-sm rounded-lg shadow-lg p-6"
// //                 whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)" }}
// //               >
// //                 <div className="flex items-center mb-4">
// //                   <img
// //                     src={testimonial.avatar}
// //                     alt={testimonial.name}
// //                     className="w-12 h-12 rounded-full mr-4 object-cover"
// //                   />
// //                   <div>
// //                     <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
// //                     <p className="text-gray-400 text-sm">{testimonial.role}</p>
// //                   </div>
// //                 </div>
// //                 <p className="text-gray-200 italic">"{testimonial.remark}"</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </motion.div>
// //       </section>




// //       {/* Contact Section */}
// //       <section id="contact" className="py-20 bg-gray-900">
// //         <motion.div
// //           className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
// //           variants={containerVariants}
// //           initial="hidden"
// //           whileInView="visible"
// //           viewport={{ once: true }}
// //         >
// //           <motion.h2
// //             variants={itemVariants}
// //             className={`font-bold text-center text-blue-400 mb-12 ${
// //               isMobile ? "text-2xl" : isTablet ? "text-3xl" : "text-4xl"
// //             }`}
// //           >
// //             <AnimatedText text="Get in Touch" />
// //           </motion.h2>
// //           <div className={`grid ${isTablet ? "grid-cols-1" : "grid-cols-2"} gap-12`}>
// //             <motion.div variants={itemVariants} className="space-y-6">
// //               <form onSubmit={handleSubmit} className="space-y-6">
// //                 <div>
// //                   <label htmlFor="name" className="block text-sm font-medium text-gray-300">
// //                     Name
// //                   </label>
// //                   <motion.input
// //                     type="text"
// //                     id="name"
// //                     name="name"
// //                     value={formData.name}
// //                     onChange={handleChange}
// //                     required
// //                     className="mt-1 block w-full rounded-full border-gray-600 bg-gray-700/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
// //                     variants={itemVariants}
// //                     whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="email" className="block text-sm font-medium text-gray-300">
// //                     Email
// //                   </label>
// //                   <motion.input
// //                     type="email"
// //                     id="email"
// //                     name="email"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     required
// //                     className="mt-1 block w-full rounded-full border-gray-600 bg-gray-700/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
// //                     variants={itemVariants}
// //                     whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
// //                     Subject
// //                   </label>
// //                   <motion.input
// //                     type="text"
// //                     id="subject"
// //                     name="subject"
// //                     value={formData.subject}
// //                     onChange={handleChange}
// //                     required
// //                     className="mt-1 block w-full rounded-full border-gray-600 bg-gray-700/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
// //                     variants={itemVariants}
// //                     whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="message" className="block text-sm font-medium text-gray-300">
// //                     Message
// //                   </label>
// //                   <motion.textarea
// //                     id="message"
// //                     name="message"
// //                     value={formData.message}
// //                     onChange={handleChange}
// //                     required
// //                     rows={5}
// //                     className="mt-1 block w-full rounded-lg border-gray-600 bg-gray-700/30 backdrop-blur-sm text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3"
// //                     variants={itemVariants}
// //                     whileFocus={{ scale: 1.02, boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)" }}
// //                   />
// //                 </div>
// //                 <motion.button
// //                   type="submit"
// //                   className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-full transition ${
// //                     isProcessing ? "opacity-70 cursor-not-allowed" : "hover:from-blue-600 hover:to-purple-700"
// //                   }`}
// //                   disabled={isProcessing}
// //                   variants={buttonVariants}
// //                   whileHover="hover"
// //                   whileTap="tap"
// //                   style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
// //                 >
// //                   {isProcessing ? "Sending..." : "Send Message"}
// //                 </motion.button>
// //               </form>
// //               {submitStatus === "success" && (
// //                 <motion.p
// //                   variants={itemVariants}
// //                   className="text-green-400 mt-6 font-medium"
// //                 >
// //                   Message sent successfully!
// //                 </motion.p>
// //               )}
// //               {submitStatus === "error" && (
// //                 <motion.p
// //                   variants={itemVariants}
// //                   className="text-red-400 mt-6 font-medium"
// //                 >
// //                   There was an error sending your message. Please try again.
// //                 </motion.p>
// //               )}
// //             </motion.div>
// //             <motion.div variants={itemVariants} className="space-y-6">
// //               <h3 className={`font-bold text-blue-400 ${isMobile ? "text-xl" : "text-2xl"}`}>Contact Information</h3>
// //               <div className="space-y-6 bg-gray-800/30 backdrop-blur-sm rounded-lg p-6">
// //                 <motion.div className="flex items-center space-x-4" variants={itemVariants}>
// //                   <motion.div whileHover={{ scale: 1.2 }}>
// //                     <Mail className="h-6 w-6 text-blue-400" />
// //                   </motion.div>
// //                   <div>
// //                     <h4 className="text-lg font-semibold text-white">Email</h4>
// //                     <p className="text-gray-200">championaden.ca@gmail.com</p>
// //                   </div>
// //                 </motion.div>
// //                 <motion.div className="flex items-center space-x-4" variants={itemVariants}>
// //                   <motion.div whileHover={{ scale: 1.2 }}>
// //                     <Phone className="h-6 w-6 text-blue-400" />
// //                   </motion.div>
// //                   <div>
// //                     <h4 className="text-lg font-semibold text-white">Phone</h4>
// //                     <p className="text-gray-200">+2349030155327</p>
// //                   </div>
// //                 </motion.div>
// //                 <motion.div className="flex items-center space-x-4" variants={itemVariants}>
// //                   <motion.div whileHover={{ scale: 1.2 }}>
// //                     <MapPin className="h-6 w-6 text-blue-400" />
// //                   </motion.div>
// //                   <div>
// //                     <h4 className="text-lg font-semibold text-white">Address</h4>
// //                     <p className="text-gray-200">101, Ajah, Lagos, Nigeria</p>
// //                   </div>
// //                 </motion.div>
// //                 <motion.div className="flex items-center space-x-4" variants={itemVariants}>
// //                   <motion.div whileHover={{ scale: 1.2 }}>
// //                     <Clock className="h-6 w-6 text-blue-400" />
// //                   </motion.div>
// //                   <div>
// //                     <h4 className="text-lg font-semibold text-white">Availability</h4>
// //                     <p className="text-gray-200">Open to work</p>
// //                   </div>
// //                 </motion.div>
// //                 <div className="mt-6">
// //                   <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
// //                   <div className="flex space-x-4">
// //                     <motion.a
// //                       href="#"
// //                       className="text-gray-400 hover:text-blue-400"
// //                       whileHover={{ scale: 1.2 }}
// //                     >
// //                       <Instagram className="h-6 w-6" />
// //                     </motion.a>
// //                     <motion.a
// //                       href="#"
// //                       className="text-gray-400 hover:text-blue-400"
// //                       whileHover={{ scale: 1.2 }}
// //                     >
// //                       <Linkedin className="h-6 w-6" />
// //                     </motion.a>
// //                     <motion.a
// //                       href="https://github.com/MrChampion2020"
// //                       className="text-gray-400 hover:text-blue-400"
// //                       whileHover={{ scale: 1.2 }}
// //                     >
// //                       <Github className="h-6 w-6" />
// //                     </motion.a>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </motion.div>
// //       </section>

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default Home;

