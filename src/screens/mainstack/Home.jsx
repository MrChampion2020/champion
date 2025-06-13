import React, { useState, useEffect, useContext } from "react";
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
import Feeda from "../../assets/Feeda.png";
import delivery from "../../assets/delivery.jpeg";
import { useMediaQuery } from "react-responsive";
import logo from "../../assets/logo.png";
import axios from "axios";
import API_URL from "./config";
import { ThemeContext } from "../../screens/context/ThemeContext";

// Navigation Items
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Portfolio", href: "portfolio" },
  { label: "Testimonials", href: "testimonials" },
  { label: "Contact", href: "contact" },
];

// Content Constants
const CONTENT = {
  hero: {
    greeting: "Hi, I am",
    name: "Sir Champion Aden",
    description: "Full Stack Developer crafting scalable web and mobile applications with MERN stack and modern technologies.",
    hireMe: "Hire Me",
    downloadCV: "Download CV",
  },
  about: {
    title: "About Me",
    intro: "Hi, I'm Champion Aden — a passionate Full Stack Developer and Cybersecurity Analyst with a deep commitment to building secure, high-performing digital experiences across web and mobile platforms.",
    description1: "With over 7 years of industry experience, I have cultivated deep expertise in designing and developing modern, scalable, and maintainable applications across both the front and back end. My technical foundation is built on JavaScript and TypeScript, with a focus on the MERN stack (MongoDB, Express.js, React.js, Node.js) and React Native for mobile solutions. My approach blends engineering precision with user-centered thinking to deliver solutions that are not only functional but also elegant and efficient.",
    description2: "I am well-versed in the complete software development lifecycle — from wireframing in Figma and architecting APIs, to deploying production-ready apps with robust security layers. I regularly implement secure authentication methods like JWT and OAuth2, optimize performance for web and mobile platforms, and integrate cloud services and third-party APIs. With additional fluency in PHP. I am driven by a deep love for clean code, meaningful impact, and continuous learning in a rapidly evolving tech ecosystem.",
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
      width="100%"
      height="100%"
      viewBox="0 0 400 400"
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
      style={{ maxWidth: "min(400px, 80vw)", maxHeight: "min(400px, 80vw)" }}
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
    width="100%"
    height="100%"
    viewBox="0 0 280 280"
    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}
    style={{ maxWidth: "min(280px, 60vw)", maxHeight: "min(280px, 60vw)" }}
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
  const { theme, toggleTheme } = useContext(ThemeContext);
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
  const [errors, setErrors] = useState({
    name: [],
    email: [],
    subject: [],
    message: [],
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const validateField = (name, value) => {
    const errors = [];

    switch (name) {
      case "name":
        if (!value) errors.push("Yo, put a name in there, dummy!");
        if (value.length < 2) errors.push("Name’s too short, c’mon, give more!");
        if (value.length > 50) errors.push("Whoa, name’s too long, chill out!");
        if (!/^[a-zA-Z\s'-]+$/.test(value)) errors.push("No weird stuff in name, just letters and spaces, okay?");
        break;
      case "email":
        if (!value) errors.push("Oops, need an email, silly!");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.push("That email looks funky, fix it!");
        if (value.length > 100) errors.push("Email’s too big, shrink it down!");
        if (!/\.[a-zA-Z]{2,}$/.test(value)) errors.push("Gimme a real email domain, dude!");
        break;
      case "subject":
        if (!value) errors.push("Hey, gimme a subject, don’t be lazy!");
        if (value.length < 3) errors.push("Subject’s too tiny, make it bigger!");
        if (value.length > 100) errors.push("Subject’s too huge, cut it down!");
        break;
      case "message":
        if (!value) errors.push("Write something, you goofball!");
        if (value.length < 10) errors.push("Message’s too short, add more junk!");
        if (value.length > 1000) errors.push("Whoa, message’s a novel, tone it down!");
        if (value.split(/\s+/).length < 3) errors.push("Need more words, at least 3, lazybones!");
        break;
      default:
        break;
    }

    return errors;
  };

  const validateForm = () => {
    const newErrors = {
      name: [],
      email: [],
      subject: [],
      message: [],
    };
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
      if (newErrors[field].length > 0) isValid = false;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });

    // Real-time validation
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, formData[name]) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, subject: true, message: true });

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    try {
      const response = await axios.post(`${API_URL}/api/contact`, formData, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000, // 10-second timeout
      });
      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({ name: [], email: [], subject: [], message: [] });
        setTouched({ name: false, email: false, subject: false, message: false });
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

  const getInputStatus = (field) => {
    if (!touched[field]) return "neutral";
    return errors[field].length === 0 && formData[field] ? "success" : "error";
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-white"} text-${theme === "dark" ? "white" : "gray-900"} font-sans overflow-x-hidden`}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
          body { font-family: 'Inter', sans-serif; }
          .tech-outline {
            text-shadow: 0 0 5px rgba(59, 130, 246, ${theme === "dark" ? 0.8 : 0.5}), 0 0 10px rgba(147, 51, 234, ${theme === "dark" ? 0.5 : 0.3});
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
            text-shadow: 0 4px 8px rgba(0, 0, 0, ${theme === "dark" ? 0.3 : 0.1}), 0 2px 4px rgba(59, 130, 246, ${theme === "dark" ? 0.5 : 0.3});
            background: rgba(${theme === "dark" ? 255 : 0}, ${theme === "dark" ? 255 : 0}, ${theme === "dark" ? 255 : 0}, ${theme === "dark" ? 0.05 : 0.1});
            backdrop-filter: blur(10px);
            padding: 8px 16px;
            border-radius: 8px;
            transform: perspective(1000px) rotateX(0deg);
            transition: transform 0.3s ease;
          }
          .testimonial-glow {
            text-shadow: 0 0 10px rgba(59, 130, 246, ${theme === "dark" ? 0.8 : 0.5});
            position: relative;
          }
          .particle-dots::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(59, 130, 246, ${theme === "dark" ? 0.3 : 0.1}) 1px, transparent 1px);
            background-size: 10px 10px;
            opacity: ${theme === "dark" ? 0.5 : 0.3};
            animation: particles 5s linear infinite;
          }
          @keyframes particles {
            0% { transform: translateY(0); opacity: ${theme === "dark" ? 0.5 : 0.3}; }
            100% { transform: translateY(-10px); opacity: ${theme === "dark" ? 0.2 : 0.1}; }
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
          .input-success {
            border-color: #32cd32 !important;
            box-shadow: 0 0 8px rgba(50, 205, 50, 0.3);
          }
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
          .dark {
            --card-bg: rgba(17, 24, 39, 0.7);
            --text-primary: #ffffff;
            --text-secondary: #d1d5db;
            --accent: #3b82f6;
            --nav-text: #ffffff;
          }
          .light {
            --card-bg: rgba(255, 255, 255, 0.8);
            --text-primary: #111827;
            --text-secondary: #4b5563;
            --accent: #9333ea;
            --nav-text: #111827;
          }
          .glass-card {
            background: var(--card-bg);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          .navbar-item {
            color: var(--nav-text, #ffffff);
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 8px;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            display: inline-block;
          }
          .navbar-item:hover {
            color: ${theme === "dark" ? "#3b82f6" : "#9333ea"};
            background: rgba(${theme === "dark" ? "59, 130, 246" : "147, 51, 234"}, 0.1);
            box-shadow: 0 0 15px rgba(${theme === "dark" ? "59, 130, 246" : "147, 51, 234"}, 0.3);
            transform: translateY(-2px);
          }
          .navbar-item::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: ${theme === "dark" ? "#3b82f6" : "#9333ea"};
            transition: width 0.3s ease;
          }
          .navbar-item:hover::after {
            width: 100%;
          }
          .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, ${theme === "dark" ? 0.7 : 0.3}), rgba(0, 0, 0, ${theme === "dark" ? 0.7 : 0.1}));
            overflow: hidden;
            z-index: 0;
          }
          .tech-wheel {
            position: absolute;
            border-radius: 50%;
            border: 2px dashed ${theme === "dark" ? "#3b82f6" : "#9333ea"};
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
          .tech-wheel:nth-child(3) {
            width: min(400px, 50vw);
            height: min(400px, 50vw);
            bottom: -10%;
            left: clamp(40%, 50%, 60%);
            animation-duration: 18s;
          }
          .shade-gradient {
            position: absolute;
            width: min(500px, 60vw);
            height: min(500px, 60vw);
            background: radial-gradient(circle, rgba(${theme === "dark" ? "59, 130, 246" : "147, 51, 234"}, 0.3), transparent);
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
            .tech-wheel:nth-child(3) {
              width: min(250px, 60vw);
              height: min(250px, 60vw);
              bottom: -5%;
              left: 50%;
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
          }
        `}
      </style>

      {/* Hero Section */}
      <Navbar navItems={navItems ?? []} />
      <section className={`py-20 lg:py-32 flex flex-col justify-center min-h-screen relative overflow-hidden`}>
        <div className="hero-background">
          <div className="tech-wheel"></div>
          <div className="tech-wheel"></div>
          <div className="tech-wheel"></div>
          <div className="shade-gradient"></div>
          <div className="shade-gradient"></div>
        </div>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="lg:flex lg:items-center lg:justify-between">
            <motion.div variants={itemVariants} className="space-y-8 max-w-full">
              <motion.h1
                variants={itemVariants}
                className={`font-bold tracking-tight tech-outline ${
                  isMobile ? "text-3xl" : isTablet ? "text-4xl" : isDesktop ? "text-5xl" : "text-6xl"
                }`}
              >
                <span className="block text-blue-200">
                  <TypewriterText text={CONTENT.hero.greeting} delay={100} />
                </span>
                <span className={`block ${theme === "dark" ? "text-black" : "text-white"}`}>
                  <TypewriterText text={CONTENT.hero.name} delay={100} />
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className={`${isMobile ? "text-base" : "text-xl"} max-w-3xl ${theme === "dark" ? "text-gray-200" : "text-black"}`}
                style={{ fontWeight: 600 }}
              >
                {CONTENT.hero.description}
              </motion.p>
              <motion.div variants={itemVariants} className="flex space-x-6">
                <motion.a
                  href="https://www.instagram.com/sirchampio_n/"
                  whileHover={{ scale: 1.2 }}
                  className={`text-${theme === "dark" ? "gray-400" : "gray-600"} hover:text-${theme === "dark" ? "blue-400" : "purple-600"}`}
                >
                  <Instagram className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/sirchampion/"
                  whileHover={{ scale: 1.2 }}
                  className={`text-${theme === "dark" ? "gray-400" : "gray-600"} hover:text-${theme === "dark" ? "blue-400" : "purple-600"}`}
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://github.com/MrChampion2020"
                  whileHover={{ scale: 1.2 }}
                  className={`text-${theme === "dark" ? "gray-400" : "gray-600"} hover:text-${theme === "dark" ? "blue-400" : "purple-600"}`}
                >
                  <Github className="h-6 w-6" />
                </motion.a>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <motion.a
                  href="contact"
                  className={`px-6 py-3 ${theme === "dark" ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gradient-to-r from-purple-500 to-blue-600"} text-white font-medium rounded-full hover:${theme === "dark" ? "from-blue-600 hover:to-purple-700" : "from-purple-600 hover:to-blue-700"} transition`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
                >
                  {CONTENT.hero.hireMe}
                </motion.a>
                <motion.a
                  href="/cv"
                  className={`px-6 py-3 border ${theme === "dark" ? "border-gray-600 text-gray-200" : "border-gray-400 text-gray-800"} font-medium rounded-full hover:${theme === "dark" ? "bg-gray-800" : "bg-gray-200"} transition`}
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
              className="mt-10 lg:mt-0 lg:ml-10 relative max-w-full"
            >
              <WaveAnimation className={`${isMobile ? "scale-75" : isTablet ? "scale-90" : "scale-100"}`} />
              <ProfileWave className={`${isMobile ? "scale-75" : isTablet ? "scale-90" : "scale-100"}`} />
              <img
                src={me}
                alt="Champion Aden"
                className="w-64 h-64 rounded-full shadow-lg object-cover relative z-50 mt-10 lg:mt-0 lg:ml-10"
                style={{ transform: `translateY(${parallaxY.get()}px)`, border: `2px solid ${theme === "dark" ? "grey" : "#d1d5db"}`, borderRadius: "50%", maxWidth: "100%" }}
              />
            </motion.div>
          </div>
        </motion.div>
        <Background />
      </section>

      {/* About Me Section */}
      <section id="about" className={`py-20 ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-100/50"} backdrop-blur-sm`}>
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
                className={`w-full h-[100%] rounded-lg shadow-lg object-cover backdrop-blur-sm ${theme === "dark" ? "bg-gray-700/30" : "bg-gray-200/30"}`}
              />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6">
              <p className={`text-${theme === "dark" ? "gray-200" : "gray-700"} ${isMobile ? "text-base" : "text-lg"}`}>
                {CONTENT.about.description1}
              </p>
              <p className={`text-${theme === "dark" ? "gray-200" : "gray-700"} ${isMobile ? "text-base" : "text-lg"}`}>
                {CONTENT.about.description2}
              </p>
              <div className="flex flex-wrap gap-4">
                {(CONTENT.about.skills ?? []).map((skill) => (
                  <motion.span
                    key={skill}
                    className={`px-4 py-2 ${theme === "dark" ? "bg-gray-700/30 text-gray-200" : "bg-gray-200/30 text-gray-800"} backdrop-blur-sm rounded-full text-sm font-medium`}
                    whileHover={{ scale: 1.1, backgroundColor: theme === "dark" ? "#1E40AF" : "#9333EA" }}
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
      <section id="projects" className={`py-20 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <ProjectsHeading text={CONTENT.projects.title} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(CONTENT.projects.items ?? []).map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-${theme === "dark" ? "gray-800/30" : "gray-200/30"} backdrop-blur-sm rounded-lg shadow-lg overflow-hidden glass-card`}
                whileHover={{ scale: 1.03, boxShadow: `0 10px 20px rgba(0, 0, 0, ${theme === "dark" ? 0.3 : 0.1})` }}
              >
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                  variants={imageVariants}
                  whileHover="hover"
                />
                <div className="p-6">
                  <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-2`}>{project.title}</h3>
                  <p className={`text-${theme === "dark" ? "gray-200" : "gray-700"} mb-4`}>{project.description}</p>
                  <motion.a
                    href={project.link}
                    className={`text-${theme === "dark" ? "blue-400" : "purple-600"} hover:text-${theme === "dark" ? "purple-400" : "blue-600"} font-medium`}
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
      <section id="portfolio" className={`py-20 ${theme === "dark" ? "bg-gray-800/50" : "bg-gray-100/50"} backdrop-blur-sm`}>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PortfolioHeading text={CONTENT.portfolio.title} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(CONTENT.portfolio.items ?? []).map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-${theme === "dark" ? "gray-700/30" : "gray-200/30"} backdrop-blur-sm rounded-lg shadow-lg overflow-hidden glass-card`}
                whileHover={{ scale: 1.03, boxShadow: `0 10px 20px rgba(0, 0, 0, ${theme === "dark" ? 0.3 : 0.1})` }}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  variants={imageVariants}
                  whileHover="hover"
                />
                <div className="p-6">
                  <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-2`}>{item.title}</h3>
                  <p className={`text-${theme === "dark" ? "gray-200" : "gray-700"} mb-4`}>{item.description}</p>
                  <motion.a
                    href={item.link}
                    className={`text-${theme === "dark" ? "blue-400" : "purple-600"} hover:text-${theme === "dark" ? "purple-400" : "blue-600"} font-medium`}
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
      <section id="testimonials" className={`py-20 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <TestimonialsHeading text={CONTENT.testimonials.title} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(CONTENT.testimonials.items ?? []).map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-${theme === "dark" ? "gray-800/30" : "gray-200/30"} backdrop-blur-sm rounded-lg shadow-lg p-6 glass-card`}
                whileHover={{ scale: 1.03, boxShadow: `0 10px 20px rgba(0, 0, 0, ${theme === "dark" ? 0.3 : 0.1})` }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{testimonial.name}</h3>
                    <p className={`text-${theme === "dark" ? "gray-400" : "gray-600"} text-sm`}>{testimonial.role}</p>
                  </div>
                </div>
                <p className={`text-${theme === "dark" ? "gray-200" : "gray-700"} italic`}>"{testimonial.remark}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
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
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {["name", "email", "subject", "message"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {CONTENT.contact.form[`${field}Label`]}
                    </label>
                    {field === "message" ? (
                      <motion.textarea
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={5}
                        className={`mt-1 block w-full rounded-lg border-${theme === "dark" ? "gray-600" : "gray-400"} bg-${theme === "dark" ? "gray-800/30" : "gray-100/30"} backdrop-blur-sm text-${theme === "dark" ? "white" : "gray-900"} shadow-sm focus:border-${theme === "dark" ? "blue-500" : "purple-600"} focus:ring-${theme === "dark" ? "blue-500" : "purple-600"} p-3 ${
                          getInputStatus(field) === "error" ? "input-error" : getInputStatus(field) === "success" ? "input-success" : ""
                        }`}
                        variants={itemVariants}
                        whileFocus={{ scale: 1.02, boxShadow: `0 0 8px rgba(${theme === "dark" ? 59 : 147}, ${theme === "dark" ? 130 : 51}, ${theme === "dark" ? 246 : 234}, 0.5)` }}
                      />
                    ) : (
                      <motion.input
                        type={field === "email" ? "email" : "text"}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`mt-1 block w-full rounded-full border-${theme === "dark" ? "gray-600" : "gray-400"} bg-${theme === "dark" ? "gray-800/30" : "gray-100/30"} backdrop-blur-sm text-${theme === "dark" ? "white" : "gray-900"} shadow-sm focus:border-${theme === "dark" ? "blue-500" : "purple-600"} focus:ring-${theme === "dark" ? "blue-500" : "purple-600"} p-3 ${
                          getInputStatus(field) === "error" ? "input-error" : getInputStatus(field) === "success" ? "input-success" : ""
                        }`}
                        variants={itemVariants}
                        whileFocus={{ scale: 1.02, boxShadow: `0 0 8px rgba(${theme === "dark" ? 59 : 147}, ${theme === "dark" ? 130 : 51}, ${theme === "dark" ? 246 : 234}, 0.5)` }}
                      />
                    )}
                    {(Array.isArray(errors[field]) ? errors[field] : []).map((error, index) => (
                      <motion.p
                        key={index}
                        variants={errorVariants}
                        initial="hidden"
                        animate={touched[field] ? "visible" : "hidden"}
                        className="text-red-400 text-sm mt-1"
                      >
                        {error}
                      </motion.p>
                    ))}
                  </div>
                ))}
                <motion.button
                  type="submit"
                  className={`px-6 py-3 ${theme === "dark" ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gradient-to-r from-purple-500 to-blue-600"} text-white font-medium rounded-full transition ${isProcessing ? "opacity-70 cursor-not-allowed" : `hover:${theme === "dark" ? "from-blue-600 hover:to-purple-700" : "from-purple-600 hover:to-blue-700"}`}`}
                  disabled={isProcessing}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
                      </svg>
                      {CONTENT.contact.form.sending}
                    </span>
                  ) : (
                    CONTENT.contact.form.submitButton
                  )}
                </motion.button>
              </form>
              {submitStatus === "success" && (
                <motion.p
                  variants={itemVariants}
                  className={`text-${theme === "dark" ? "green-400" : "green-600"} mt-6 font-medium`}
                >
                  {CONTENT.contact.form.successMessage}
                </motion.p>
              )}
              {submitStatus === "error" && (
                <motion.p
                  variants={itemVariants}
                  className={`text-${theme === "dark" ? "red-400" : "red-600"} mt-6 font-medium`}
                >
                  {CONTENT.contact.form.errorMessage}
                </motion.p>
              )}
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className={`font-bold ${theme === "dark" ? "text-blue-400" : "text-purple-600"} ${isMobile ? "text-xl" : "text-2xl"}`}>
                {CONTENT.contact.info.title}
              </h3>
              <div className={`space-y-6 ${theme === "dark" ? "bg-gray-800/30" : "bg-gray-200/30"} backdrop-blur-sm rounded-lg p-6 glass-card`}>
                <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <Mail className={`h-6 w-6 ${theme === "dark" ? "text-blue-400" : "text-purple-600"}`} />
                  </motion.div>
                  <div>
                    <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{CONTENT.contact.info.email.label}</h4>
                    <p className={`text-${theme === "dark" ? "gray-200" : "gray-700"}`}>{CONTENT.contact.info.email.value}</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <Phone className={`h-6 w-6 ${theme === "dark" ? "text-blue-400" : "text-purple-600"}`} />
                  </motion.div>
                  <div>
                    <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{CONTENT.contact.info.phone.label}</h4>
                    <p className={`text-${theme === "dark" ? "gray-200" : "gray-700"}`}>{CONTENT.contact.info.phone.value}</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <MapPin className={`h-6 w-6 ${theme === "dark" ? "text-blue-400" : "text-purple-600"}`} />
                  </motion.div>
                  <div>
                    <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{CONTENT.contact.info.address.label}</h4>
                    <p className={`text-${theme === "dark" ? "gray-200" : "gray-700"}`}>{CONTENT.contact.info.address.value}</p>
                  </div>
                </motion.div>
                <motion.div className="flex items-center space-x-4" variants={itemVariants}>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <Clock className={`h-6 w-6 ${theme === "dark" ? "text-blue-400" : "text-purple-600"}`} />
                  </motion.div>
                  <div>
                    <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{CONTENT.contact.info.availability.label}</h4>
                    <p className={`text-${theme === "dark" ? "gray-200" : "gray-700"}`}>{CONTENT.contact.info.availability.value}</p>
                  </div>
                </motion.div>
                <div className="mt-6">
                  <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4`}>{CONTENT.contact.info.followMe}</h4>
                  <div className="flex space-x-4">
                    <motion.a
                      href="#"
                      className={`text-${theme === "dark" ? "gray-400" : "gray-600"} hover:text-${theme === "dark" ? "blue-400" : "purple-600"}`}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Instagram className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className={`text-${theme === "dark" ? "gray-400" : "gray-600"} hover:text-${theme === "dark" ? "blue-400" : "purple-600"}`}
                      whileHover={{ scale: 1.2 }}
                    >
                      <Linkedin className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      href="https://github.com/MrChampion2020"
                      className={`text-${theme === "dark" ? "gray-400" : "gray-600"} hover:text-${theme === "dark" ? "blue-400" : "purple-600"}`}
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