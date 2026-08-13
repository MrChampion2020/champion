import React, { useState, useEffect, useContext, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tilt } from "react-tilt";
import { Instagram, Linkedin, Github, Mail, Phone, MapPin, Clock } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BrandLoader from "../../components/BrandLoader";
import CvAccessModal from "../../components/CvAccessModal";
import ReviewSubmissionModal from "../../components/ReviewSubmissionModal";
import PhoneCountrySelect from "../../components/PhoneCountrySelect";
import heroPortrait from "../../assets/me/hero.jpeg";
import aboutPortrait from "../../assets/me/about.jpeg";
import { useMediaQuery } from "react-responsive";
import axios from "axios";
import API_URL from "./config";
import { ThemeContext } from "../../screens/context/ThemeContext";
import { homeProjects } from "../../data/projects";
import { DEFAULT_PHONE_COUNTRY } from "../../data/phoneCountries";
import { buildInternationalPhoneNumber, isValidPhoneNumber } from "../../utils/phoneValidation";
import {
  formatReviewMonthYear,
  getReviewAuthor,
  getReviewContent,
  getReviewInitials,
  getReviewRole,
} from "../../utils/reviews";

// Navigation Items
const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "about" },
  { label: "Projects", href: "projects" },
  { label: "Testimonials", href: "testimonials" },
  { label: "Contact", href: "contact" },
];

// Content Constants
const CONTENT = {
  hero: {
    role: "Full Stack Developer",
    name: "Sir Champion Aden",
    description:
      "I build secure, scalable web and mobile products for teams that need quality without the noise.",
    hireMe: "Start a project",
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
    title: "Projects",
    items: homeProjects,
  },
  testimonials: {
    title: "What Clients Say",
  },
  contact: {
    title: "Get in Touch",
    form: {
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      subjectLabel: "Subject",
      messageLabel: "Message",
      submitButton: "Send Message",
      sending: "Sending...",
      successMessage: "Message sent successfully!",
      errorMessage: "There was an error sending your message. Please try again.",
      validation: {
        required: "This field is required.",
        invalidEmail: "Please enter a valid email address.",
        invalidPhone: "Select a country code and enter a valid phone number.",
      },
      placeholders: {
        name: "Enter your name",
        email: "Enter your email",
        phone: "903 015 5327",
        subject: "Enter the subject",
        message: "Enter your message",
      },
      phoneHelpText: "Choose your country code, then enter the rest of your number without it.",
    },
    info: {
      title: "Contact Information",
      email: { label: "Email", value: "champion@feeda.us" },
      phone: { label: "Phone", value: "+2349030155327" },
      address: {
        label: "Address",
        value: "Plot 15 Unity Avenue Estate Ajah Lagos Nigeria",
      },
      availability: { label: "Availability", value: "Open to work" },
      followMe: "Follow Me",
    },
  },
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: "spring", bounce: 0.6 },
  },
};

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0, x: -50 },
  visible: {
    scale: 1,
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
  hover: { scale: 1.1, rotate: 2, transition: { duration: 0.3 } },
};

const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.5, ease: "easeOut" },
  },
  hover: { scale: 1.05, color: "var(--accent)", transition: { duration: 0.3 } },
};

const buttonVariants = {
  hover: { scale: 1.1, boxShadow: "var(--button-shadow-strong)" },
  tap: { scale: 0.95 },
};

const errorVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const inputVariants = {
  hover: { scale: 1.03, boxShadow: "0 0 10px var(--glow)" },
  tap: { scale: 0.98 },
  focus: { borderColor: "var(--accent)", boxShadow: "0 0 12px var(--glow)" },
};

const contactItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const headingUnderlineVariants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: { duration: 1, ease: "easeOut" },
  },
};

const sparkleVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: [0, 1, 0],
    scale: [0, 1.5, 0],
    transition: { duration: 1.5, repeat: Infinity, repeatDelay: 1 },
  },
};

const iconVariants = {
  hover: {
    scale: 1.5,
    rotate: 360,
    skewX: 10,
    filter: "drop-shadow(0 0 10px var(--glow))",
    color: "transparent",
    background: "linear-gradient(45deg, var(--brand-primary), var(--accent))",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    transition: {
      scale: { duration: 0.4, type: "spring", stiffness: 100, damping: 10 },
      rotate: { duration: 0.8, ease: "linear" },
      skewX: { duration: 0.3, ease: "easeOut" },
      filter: { duration: 0.5, ease: "easeInOut" },
      background: { duration: 0.4 },
    },
  },
};

// Typewriter Text Component
const TypewriterText = ({ text, delay = 100, showCursor = false, className = "" }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursorBlink, setShowCursorBlink] = useState(true);

  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setShowCursorBlink(true);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  useEffect(() => {
    if (showCursor) {
      const cursorInterval = setInterval(() => {
        setShowCursorBlink((prev) => !prev);
      }, 500);
      return () => clearInterval(cursorInterval);
    }
  }, [showCursor]);

  return (
    <span className={`typewriter-text relative ${className}`.trim()}>
      {displayText}
      {showCursor && (
        <motion.span
          className="ml-1 inline-block h-5 w-0.5"
          style={{ backgroundColor: "var(--accent)" }}
          animate={{ opacity: showCursorBlink ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        />
      )}
    </span>
  );
};

// Custom Heading Components
const AboutHeading = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.h2
      ref={ref}
      initial="hidden"
      variants={containerVariants}
      animate={isInView ? "visible" : "hidden"}
      className="relative font-bold text-center mb-12 text-2xl sm:text-3xl lg:text-4xl"
      style={{
        color: "var(--text-primary)",
        background: "linear-gradient(to right, var(--brand-primary), var(--accent))",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
      }}
      aria-label={text}
    >
      <span className="about-underline relative">
        {text.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} style={{ display: "inline-block", marginRight: "8px" }}>
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                variants={letterVariants}
                style={{ display: "inline-block" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
        <motion.span
          className="theme-progress-bar absolute bottom-[-8px] left-0 h-1"
          variants={headingUnderlineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        />
      </span>
    </motion.h2>
  );
};

const ProjectsHeading = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const { theme } = useContext(ThemeContext);

  return (
    <motion.h2
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="gradient-text glitch relative mb-12 text-center text-2xl font-bold uppercase sm:text-3xl lg:text-4xl"
      aria-label={text}
      data-text={text}
      style={{ textShadow: `0 0 10px rgba(${theme === "dark" ? "140, 111, 78" : "25, 25, 112"}, ${theme === "dark" ? 0.35 : 0.2})` }}
    >
      <motion.span
        className="absolute inset-0 h-full w-full border-t border-b"
        style={{ borderColor: "var(--accent)" }}
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {text}
      <motion.span
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(45deg, transparent, rgba(140, 111, 78, 0.22), transparent)",
          filter: "blur(5px)",
        }}
      />
    </motion.h2>
  );
};

const TestimonialsHeading = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.h2
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="gradient-text testimonial-glow relative mb-12 text-center text-2xl font-bold sm:text-3xl lg:text-4xl"
      aria-label={text}
    >
      <TypewriterText text={text} delay={100} showCursor={true} />
      <span className="absolute inset-0 w-full h-full particle-dots" />
      {[...Array(5)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: "var(--accent)",
          }}
          variants={sparkleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: Math.random() * 1 }}
        />
      ))}
    </motion.h2>
  );
};

const ContactHeading = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const { theme } = useContext(ThemeContext);

  return (
    <motion.h2
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="circuit-underline gradient-text relative mb-12 text-center text-2xl font-bold sm:text-3xl lg:text-4xl"
      aria-label={text}
      style={{ textShadow: `0 0 8px rgba(${theme === "dark" ? "140, 111, 78" : "25, 25, 112"}, 0.28)` }}
    >
      {text}
      <motion.span
        className="theme-progress-bar absolute bottom-[-10px] left-0 h-1"
        variants={headingUnderlineVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <svg width="0" height="0">
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "var(--brand-primary)", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "var(--accent)", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      </motion.span>
      <motion.span
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, rgba(140, 111, 78, 0.24), transparent)",
          filter: "blur(10px)",
        }}
      />
    </motion.h2>
  );
};

// Home Component
const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: [],
    email: [],
    phone: [],
    subject: [],
    message: [],
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false,
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY);
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isCvAccessModalOpen, setIsCvAccessModalOpen] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const loadReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/reviews?limit=6`);
        const nextReviews = response.data?.reviews ?? [];

        if (!isCancelled) {
          setReviews(nextReviews);
        }
      } catch {
        if (!isCancelled) {
          setReviews([]);
        }
      }
    };

    loadReviews();

    return () => {
      isCancelled = true;
    };
  }, []);

  const validateField = (name, value, country = phoneCountry) => {
    const errors = [];

    switch (name) {
      case "name":
        if (!value) errors.push(CONTENT.contact.form.validation.required);
        if (value.length < 2) errors.push("Name is too short.");
        if (value.length > 50) errors.push("Name is too long.");
        if (!/^[a-zA-Z\s'-]+$/.test(value)) errors.push("Name can only contain letters, spaces, or hyphens.");
        break;
      case "email":
        if (!value) errors.push(CONTENT.contact.form.validation.required);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.push(CONTENT.contact.form.validation.invalidEmail);
        if (value.length > 100) errors.push("Email is too long.");
        break;
      case "phone":
        if (!value) errors.push(CONTENT.contact.form.validation.required);
        if (value && !isValidPhoneNumber(value, country)) errors.push(CONTENT.contact.form.validation.invalidPhone);
        break;
      case "subject":
        if (!value) errors.push(CONTENT.contact.form.validation.required);
        if (value.length < 3) errors.push("Subject is too short.");
        if (value.length > 100) errors.push("Subject is too long.");
        break;
      case "message":
        if (!value) errors.push(CONTENT.contact.form.validation.required);
        if (value.length < 10) errors.push("Message is too short.");
        if (value.length > 1000) errors.push("Message is too long.");
        break;
      default:
        break;
    }

    return errors;
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      phone: validateField("phone", formData.phone),
      subject: validateField("subject", formData.subject),
      message: validateField("message", formData.message),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err.length === 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value, phoneCountry) });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, formData[name], phoneCountry) });
  };

  const handlePhoneCountryChange = (nextCountry) => {
    setPhoneCountry(nextCountry);

    if (touched.phone || formData.phone) {
      setErrors({
        ...errors,
        phone: validateField("phone", formData.phone, nextCountry),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    if (!validateForm()) return;
    setIsProcessing(true);

    const submission = {
      ...formData,
      phone: buildInternationalPhoneNumber(formData.phone, phoneCountry),
    };

    try {
      const response = await axios.post(`${API_URL}/api/contact`, submission, {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      });
      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setPhoneCountry(DEFAULT_PHONE_COUNTRY);
        setTouched({ name: false, email: false, phone: false, subject: false, message: false });
        setErrors({ name: [], email: [], phone: [], subject: [], message: [] });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  const getInputStatus = (field) => {
    if (!touched[field]) return "neutral";
    return errors[field].length === 0 && formData[field] ? "success" : "error";
  };

  const contactRef = useRef(null);
  const isContactInView = useInView(contactRef, { once: true, amount: 0.4 });

  return (
    <div className="theme-page overflow-x-hidden">

      {/* Hero Section */}
      <Navbar navItems={navItems ?? []} />
      <section className="home-hero relative overflow-hidden">
        <div className="home-hero-decor" aria-hidden="true">
          <div className="tech-wheel home-hero-wheel" />
          <div className="shade-gradient home-hero-glow" />
        </div>
        <div className="theme-hero-scrim home-hero-overlay" />
        <motion.div
          className="home-hero-grid max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="home-hero-copy">
            <span className="home-hero-eyebrow">{CONTENT.hero.role}</span>
            <motion.h1
              variants={itemVariants}
              className={`home-hero-title ${
                isMobile ? "text-4xl sm:text-5xl" : "text-6xl lg:text-7xl"
              }`}
            >
              {CONTENT.hero.name}
            </motion.h1>
            <motion.p
              variants={textVariants}
              className="home-hero-lead max-w-xl"
            >
              {CONTENT.hero.description}
            </motion.p>
            <motion.div variants={itemVariants} className="home-hero-actions">
              <motion.a
                href="contact"
                className="theme-button-primary px-6 py-3"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {CONTENT.hero.hireMe}
              </motion.a>
              <motion.button
                type="button"
                className="theme-button-secondary px-6 py-3"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setIsCvAccessModalOpen(true)}
              >
                {CONTENT.hero.downloadCV}
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            variants={imageVariants}
            className="home-hero-visual hidden lg:block"
            aria-hidden="true"
          >
            <Tilt
              className="home-hero-portrait-tilt"
              options={{ max: 14, scale: 1.04, perspective: 1200, speed: 700 }}
            >
              <img
                src={heroPortrait}
                alt=""
                className="home-hero-portrait"
              />
            </Tilt>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="home-projects-section theme-section-muted relative overflow-hidden py-24">
        <div className="home-projects-decor" aria-hidden="true">
          <div className="tech-wheel home-projects-wheel" />
          <div className="shade-gradient home-projects-glow-a" />
          <div className="shade-gradient home-projects-glow-b" />
        </div>
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span variants={itemVariants} className="home-section-eyebrow">
            Selected Work
          </motion.span>
          <ProjectsHeading text={CONTENT.projects.title} />
          <div className="home-projects-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(CONTENT.projects.items ?? []).map((project, index) => (
              <Tilt
                key={project.title}
                className="home-project-tilt"
                options={{ max: 10, scale: 1.02, perspective: 1200, speed: 600 }}
              >
                <motion.div
                  variants={itemVariants}
                  className="glass-card home-project-card overflow-hidden rounded-2xl h-full flex flex-col"
                  whileHover={{ y: -8, boxShadow: "var(--shadow-lifted)" }}
                >
                  {index === 0 ? <span className="home-project-badge">Latest Build</span> : null}
                  <div className={`project-image-shell project-image-shell--card ${project.imageShellClassName ?? ""}`}>
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-contain"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <div className="home-project-card-body flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                      {project.title}
                    </h3>
                    {project.timeline ? (
                      <p className="project-timeline mb-2 text-xs font-semibold uppercase tracking-wide">
                        {project.timeline}
                      </p>
                    ) : null}
                    <p className="home-project-description theme-muted mb-4 flex-1 text-sm">
                      {project.description}
                    </p>
                    {project.link ? (
                      <motion.a
                        href={project.link}
                        whileHover={{ x: 6 }}
                        className="theme-link font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.linkLabel ?? "View Project"}
                      </motion.a>
                    ) : (
                      <span className="theme-muted font-medium">Preview on request</span>
                    )}
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
          <motion.div className="mt-12 flex justify-center" variants={itemVariants}>
            <motion.a
              href="/projects"
              className="theme-button-secondary px-6 py-3"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              View All Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section id="about" className="theme-section-soft py-20 backdrop-blur-sm">
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
                src={aboutPortrait}
                alt="About Champion Aden"
                className="h-[100%] w-full rounded-lg object-cover object-top shadow-lg backdrop-blur-sm"
              />
            </motion.div>
            <motion.div variants={containerVariants} className="space-y-6">
              <motion.p variants={textVariants} className={`theme-muted ${isMobile ? "text-base" : "text-lg"}`}>
                {CONTENT.about.description1}
              </motion.p>
              <motion.p variants={textVariants} className={`theme-muted ${isMobile ? "text-base" : "text-lg"}`}>
                {CONTENT.about.description2}
              </motion.p>
              <motion.div variants={containerVariants} className="flex flex-wrap gap-4">
                {(CONTENT.about.skills ?? []).map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.08, backgroundColor: "var(--accent)", color: "var(--button-text)" }}
                    className="theme-chip px-4 py-2 text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Customer Remarks Section */}
      <section id="testimonials" className="theme-section-muted py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <TestimonialsHeading text={CONTENT.testimonials.title} />
          <motion.div
            className="mb-8 flex justify-center"
            variants={itemVariants}
          >
            <motion.button
              type="button"
              className="theme-button-secondary px-6 py-3"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsReviewModalOpen(true)}
            >
              Add Your Review
            </motion.button>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.length ? reviews.map((review) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                className="glass-card rounded-lg p-6 shadow-lg backdrop-blur-sm"
                whileHover={{ scale: 1.05, rotate: 2, boxShadow: "var(--shadow-lifted)" }}
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    className="mr-4 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.08)] text-sm font-extrabold"
                    style={{ color: "var(--accent)" }}
                    variants={imageVariants}
                    whileHover="hover"
                  >
                    {getReviewInitials(review)}
                  </motion.div>
                  <div>
                    <motion.h3 variants={textVariants} className="text-lg font-semibold" style={{ color: "var(--text-primary)" }}>
                      {getReviewAuthor(review)}
                    </motion.h3>
                    <motion.p variants={textVariants} className="theme-muted text-sm">
                      {[getReviewRole(review) || "Client", formatReviewMonthYear(review.createdAt)]
                        .filter(Boolean)
                        .join(" | ")}
                    </motion.p>
                  </div>
                </div>
                <motion.p variants={textVariants} className="theme-muted italic">
                  "{getReviewContent(review)}"
                </motion.p>
              </motion.div>
            )) : (
              <div className="glass-card blog-status-card md:col-span-2 lg:col-span-3">
                <p className="theme-muted text-center">
                  Reviews will appear here once approved by admin.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </section>
      <ReviewSubmissionModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reviews={reviews}
      />
      <CvAccessModal
        isOpen={isCvAccessModalOpen}
        onClose={() => setIsCvAccessModalOpen(false)}
      />

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="theme-section-muted py-20">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate={isContactInView ? "visible" : "hidden"}
        >
          <ContactHeading text={CONTENT.contact.title} />
          <div className={`grid ${isTablet ? "grid-cols-1" : "grid-cols-2"} gap-12`}>
            <motion.div
              variants={itemVariants}
              className="glass-card space-y-6 rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {["name", "email", "phone", "subject", "message"].map((field) => (
                  <motion.div key={field} variants={itemVariants}>
                    <motion.label
                      htmlFor={field}
                      variants={textVariants}
                      className="theme-muted block text-sm font-medium"
                    >
                      {CONTENT.contact.form[`${field}Label`]}
                    </motion.label>
                    {field === "message" ? (
                      <motion.textarea
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={5}
                        placeholder={CONTENT.contact.form.placeholders[field]}
                        className={`theme-form-input mt-1 block w-full rounded-lg p-3 ${
                          getInputStatus(field) === "error" ? "input-error" : getInputStatus(field) === "success" ? "input-success" : ""
                        }`}
                        variants={inputVariants}
                        whileHover="hover"
                        whileTap="tap"
                        whileFocus="focus"
                      />
                    ) : field === "phone" ? (
                      <>
                        <div className="phone-field-grid mt-1">
                          <PhoneCountrySelect
                            value={phoneCountry}
                            onChange={handlePhoneCountryChange}
                            triggerClassName="theme-form-input rounded-full"
                            ariaLabel="Country code"
                          />
                          <motion.input
                            type="tel"
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={CONTENT.contact.form.placeholders[field]}
                            inputMode="tel"
                            autoComplete="tel-national"
                            className={`theme-form-input block w-full rounded-full p-3 ${
                              getInputStatus(field) === "error" ? "input-error" : getInputStatus(field) === "success" ? "input-success" : ""
                            }`}
                            variants={inputVariants}
                            whileHover="hover"
                            whileTap="tap"
                            whileFocus="focus"
                          />
                        </div>
                        <p className="phone-field-note">
                          {CONTENT.contact.form.phoneHelpText}
                        </p>
                      </>
                    ) : (
                      <motion.input
                        type={field === "email" ? "email" : "text"}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder={CONTENT.contact.form.placeholders[field]}
                        className={`theme-form-input mt-1 block w-full rounded-full p-3 ${
                          getInputStatus(field) === "error" ? "input-error" : getInputStatus(field) === "success" ? "input-success" : ""
                        }`}
                        variants={inputVariants}
                        whileHover="hover"
                        whileTap="tap"
                        whileFocus="focus"
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
                  </motion.div>
                ))}
                <motion.button
                  type="submit"
                  className="theme-button-primary px-6 py-3"
                  disabled={isProcessing}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  style={{ width: isMobile ? "100%" : isTablet ? "50%" : "auto" }}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">
                        <BrandLoader inline />
                      </span>
                      {CONTENT.contact.form.sending}
                    </span>
                  ) : (
                    CONTENT.contact.form.submitButton
                  )}
                </motion.button>
              </form>
              {submitStatus === "success" && (
                <motion.p
                  variants={textVariants}
                  className="mt-6 font-medium text-green-500"
                >
                  {CONTENT.contact.form.successMessage}
                </motion.p>
              )}
              {submitStatus === "error" && (
                <motion.p
                  variants={textVariants}
                  className={`text-red-400 mt-6 font-medium`}
                >
                  {CONTENT.contact.form.errorMessage}
                </motion.p>
              )}
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isContactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <motion.h3
                variants={textVariants}
                className={`gradient-text font-bold ${isMobile ? "text-xl" : "text-2xl"}`}
              >
                {CONTENT.contact.info.title}
              </motion.h3>
              <motion.div
                variants={containerVariants}
                className="glass-card rounded-lg p-6 backdrop-blur-sm"
              >
                <motion.div variants={contactItemVariants} className="flex items-center space-x-4 mb-4">
                  <motion.div variants={iconVariants} whileHover="hover">
                    <Mail className="h-6 w-6" style={{ color: "var(--accent)" }} />
                  </motion.div>
                  <div>
                    <motion.h4
                      variants={textVariants}
                      className="text-lg font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {CONTENT.contact.info.email.label}
                    </motion.h4>
                    <motion.p variants={textVariants} className="theme-muted">
                      {CONTENT.contact.info.email.value}
                    </motion.p>
                  </div>
                </motion.div>
                <motion.div variants={contactItemVariants} className="flex items-center space-x-4 mb-4">
                  <motion.div variants={iconVariants} whileHover="hover">
                    <Phone className="h-6 w-6" style={{ color: "var(--accent)" }} />
                  </motion.div>
                  <div>
                    <motion.h4
                      variants={textVariants}
                      className="text-lg font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {CONTENT.contact.info.phone.label}
                    </motion.h4>
                    <motion.p variants={textVariants} className="theme-muted">
                      {CONTENT.contact.info.phone.value}
                    </motion.p>
                  </div>
                </motion.div>
                <motion.div variants={contactItemVariants} className="flex items-center space-x-4 mb-4">
                  <motion.div variants={iconVariants} whileHover="hover">
                    <MapPin className="h-6 w-6" style={{ color: "var(--accent)" }} />
                  </motion.div>
                  <div>
                    <motion.h4
                      variants={textVariants}
                      className="text-lg font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {CONTENT.contact.info.address.label}
                    </motion.h4>
                    <motion.p variants={textVariants} className="theme-muted">
                      {CONTENT.contact.info.address.value}
                    </motion.p>
                  </div>
                </motion.div>
                <motion.div variants={contactItemVariants} className="flex items-center space-x-4 mb-4">
                  <motion.div variants={iconVariants} whileHover="hover">
                    <Clock className="h-6 w-6" style={{ color: "var(--accent)" }} />
                  </motion.div>
                  <div>
                    <motion.h4
                      variants={textVariants}
                      className="text-lg font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {CONTENT.contact.info.availability.label}
                    </motion.h4>
                    <motion.p variants={textVariants} className="theme-muted">
                      {CONTENT.contact.info.availability.value}
                    </motion.p>
                  </div>
                </motion.div>
                <div className="mt-6">
                  <motion.h4
                    variants={textVariants}
                    className="mb-4 text-lg font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {CONTENT.contact.info.followMe}
                  </motion.h4>
                  <motion.div variants={containerVariants} className="flex space-x-4">
                    <motion.a
                      href="https://www.instagram.com/sirchampio_n/"
                      variants={iconVariants}
                      whileHover="hover"
                      className="social-icon"
                    >
                      <Instagram className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/sirchampion/"
                      variants={iconVariants}
                      whileHover="hover"
                      className="social-icon"
                    >
                      <Linkedin className="h-6 w-6" />
                    </motion.a>
                    <motion.a
                      href="https://github.com/MrChampion2020"
                      variants={iconVariants}
                      whileHover="hover"
                      className="social-icon"
                    >
                      <Github className="h-6 w-6" />
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;




