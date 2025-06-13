import React, { useState, useContext, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  X,
  Linkedin,
  Github,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Tilt } from "react-tilt";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ThemeContext } from "../../screens/context/ThemeContext";
import axios from "axios";
import API_URL from "./config";
import { useMediaQuery } from "react-responsive";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.3, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  }),
};

const inputVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  focus: { scale: 1.02, boxShadow: "0 0 12px var(--accent)" },
};

const errorVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
};

// Animated Text Component
const AnimatedText = ({ text }) => (
  <span>
    {text.split("").map((char, index) => (
      <motion.span
        key={index}
        custom={index}
        variants={letterVariants}
        style={{ display: "inline-block" }}
      >
        {char}
      </motion.span>
    ))}
  </span>
);

const Contact = () => {
  const { theme } = useContext(ThemeContext) || { theme: "dark" };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({
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
  const [particlesInit, setParticlesInit] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const validateField = (name, value) => {
    const errors = [];

    switch (name) {
      case "name":
        if (!value) errors.push("Name is required!");
        if (value.length < 2) errors.push("Name must be at least 2 characters!");
        if (value.length > 50) errors.push("Name cannot exceed 50 characters!");
        if (!/^[a-zA-Z\s'-]+$/.test(value))
          errors.push("Name can only contain letters, spaces, or hyphens!");
        break;
      case "email":
        if (!value) errors.push("Email is required!");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          errors.push("Invalid email format!");
        if (value.length > 100) errors.push("Email cannot exceed 100 characters!");
        if (!/\.[a-zA-Z]{2,}$/.test(value))
          errors.push("Email must have a valid domain!");
        break;
      case "phone":
        if (!value) errors.push("Phone number is required!");
        if (!/^\+?[1-9]\d{1,14}$/.test(value))
          errors.push("Invalid phone number format (e.g., +2349030155327)!");
        if (value.length > 15) errors.push("Phone number cannot exceed 15 digits!");
        break;
      case "subject":
        if (!value) errors.push("Subject is required!");
        if (value.length < 3) errors.push("Subject must be at least 3 characters!");
        if (value.length > 100) errors.push("Subject cannot exceed 100 characters!");
        break;
      case "message":
        if (!value) errors.push("Message is required!");
        if (value.length < 10) errors.push("Message must be at least 10 characters!");
        if (value.length > 1000) errors.push("Message cannot exceed 1000 characters!");
        if (value.split(/\s+/).length < 3)
          errors.push("Message must contain at least 3 words!");
        break;
      default:
        break;
    }

    return errors;
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    Object.keys(formData).forEach((field) => {
      const fieldErrors = validateField(field, formData[field]);
      errors[field] = fieldErrors;
      if (fieldErrors.length > 0) isValid = false;
    });

    setFormErrors(errors);
    return isValid;
  };

  const initParticles = useCallback(async (engine) => {
    try {
      await loadSlim(engine);
      setParticlesInit(true);
    } catch (error) {
      console.error("Particles init error:", error);
    }
  }, []);

  useEffect(() => {
    console.log("Contact rendered, theme:", theme, "particlesInit:", particlesInit);
  }, [theme, particlesInit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });
    setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setFormErrors({ ...formErrors, [name]: validateField(name, formData[name]) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      subject: true,
      message: true,
    });

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
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setFormErrors({
          name: [],
          email: [],
          phone: [],
          subject: [],
          message: [],
        });
        setTouched({
          name: false,
          email: false,
          phone: false,
          subject: false,
          message: false,
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  const getInputStatus = (field) => {
    if (!touched[field]) return "neutral";
    return formErrors[field].length === 0 && formData[field] ? "success" : "error";
  };

  const getButtonTextAndStyle = () => {
    if (isProcessing)
      return {
        text: "Sending...",
        className: "opacity-50 cursor-not-allowed text-white bg-gray-600",
      };
    if (submitStatus === "success")
      return { text: "Sent!", className: "bg-green-500 text-white" };
    if (submitStatus === "error")
      return { text: "Failed!", className: "bg-red-500 text-white" };
    return {
      text: "Send Message",
      className: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
    };
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      } overflow-x-hidden`}
    >
      <style>
        {`
          :root {
            --neon-blue: #3b82f6;
            --neon-purple: #9333ea;
          }
          .dark {
            --card-bg: rgba(17, 24, 39, 0.7);
            --text-primary: #ffffff;
            --text-secondary: #d1d5db;
            --accent: var(--neon-blue);
            --input-bg: transparent;
            --input-text: #ffffff;
          }
          .light {
            --card-bg: rgba(255, 255, 255, 0.8);
            --text-primary: black;
            --text-secondary: #4b5563;
            --accent: var(--neon-purple);
            --input-bg: rgba(243, 244, 246, 0.9);
            --input-text: #1f2937;
          }
          .glass-card {
            background: var(--card-bg);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          .glow {
            box-shadow: 0 0 8px var(--accent);
          }
          .gradient-text {
            background: linear-gradient(to right, var(--neon-blue), var(--neon-purple));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          .parallax-bg {
            background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
            opacity: 0.1;
          }
          @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
          body { font-family: 'Comic Neue', cursive; }
          .hero-text {
            position: relative;
            z-index: 20 !important;
          }
          .input-container {
            position: relative;
          }
          .input-status-icon {
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
          }
          .error-message {
            display: block;
            color: #ff6347;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            font-style: italic;
          }
          .input-error {
            border-color: #ff6347 !important;
            box-shadow: 0 0 8px rgba(255, 99, 71, 0.3);
            animation: shake 0.5s;
          }
          .input-success {
            border-color: #32cd32 !important;
            box-shadow: 0 0 8px rgba(50, 205, 50, 0.3);
          }
          .form-input {
            background: var(--input-bg);
            color: var(--input-text, #1f2937) !important;
          }
          .form-input::placeholder,
          .form-input,
          .form-input:focus {
            color: var(--input-text) !important;
          }
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
          .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, ${
              theme === "dark" ? 0.7 : 0.3
            }), rgba(0, 0, 0, ${theme === "dark" ? 0.7 : 0.1}));
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
          .shade-gradient {
            position: absolute;
            width: min(400px, 50vw);
            height: min(400px, 50vw);
            background: radial-gradient(circle, rgba(${
              theme === "dark" ? "59, 130, 246" : "147, 51, 234"
            }, 0.3), transparent);
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
      <Navbar />
      {/* Hero Section */}
      <motion.section
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
      >
        <div className="hero-background">
          <div className="tech-wheel"></div>
          <div className="tech-wheel"></div>
          <div className="shade-gradient"></div>
          <div className="shade-gradient"></div>
        </div>
        {particlesInit && (
          <Particles
            id="particles"
            init={initParticles}
            options={{
              particles: {
                number: { value: 50 },
                size: { value: 3 },
                move: { speed: 0.5 },
                links: { enable: true, distance: 150, opacity: 0.4 },
                color: { value: theme === "dark" ? "#3b82f6" : "#9333ea" },
              },
              interactivity: {
                events: { onHover: { enable: true, mode: "repulse" } },
              },
              style: { position: "absolute", zIndex: 0 },
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: 1 }}
        />
        <motion.div
          className="relative text-center hero-text max-w-full px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text mb-4"
            variants={itemVariants}
            style={{ zIndex: 20 }}
          >
            <AnimatedText text="Contact Me" />
          </motion.h1>
          <motion.p
            className="text-base sm:text-xl md:text-xl max-w-1xl/2 mx-auto"
            variants={itemVariants}
            style={{ color: "white", zIndex: 20, fontWeight: 700 }}
          >
            I'm committed to providing exceptional support and collaboration
            opportunities. Reach out to discuss your needs.
          </motion.p>
        </motion.div>
      </motion.section>
      {/* Contact Form and Info Section */}
      <motion.section
        className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{
            transform: useTransform(
              scrollYProgress,
              [0, 1],
              ["translateY(0%)", "translateY(-20%)"]
            ),
          }}
        />
        <div
          className={`grid ${isTablet ? "grid-cols-1" : "grid-cols-2"} gap-12`}
        >
          {/* Form Section */}
          <Tilt options={{ max: 15, scale: 1.03 }}>
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-xl p-8"
            >
              <motion.h2
                variants={itemVariants}
                className={`text-2xl font-bold mb-6 gradient-text ${
                  isMobile ? "text-xl" : ""
                }`}
              >
                <AnimatedText text="Send a Message" />
              </motion.h2>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {["name", "email", "phone", "subject"].map((field) => (
                  <div key={field} className="input-container">
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <motion.input
                      type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-2 block w-full rounded-lg border border-gray-600 focus:border-[var(--accent)] focus:ring-0 p-3 form-input ${
                        getInputStatus(field) === "error"
                          ? "input-error"
                          : getInputStatus(field) === "success"
                          ? "input-success"
                          : ""
                      }`}
                      variants={inputVariants}
                      whileFocus="focus"
                      aria-label={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                    {getInputStatus(field) === "success" && (
                      <CheckCircle
                        className="input-status-icon text-green-500"
                        size={20}
                      />
                    )}
                    {getInputStatus(field) === "error" && (
                      <AlertCircle
                        className="input-status-icon text-red-500"
                        size={20}
                      />
                    )}
                    {formErrors[field].map((error, index) => (
                      <motion.span
                        key={index}
                        variants={errorVariants}
                        initial="hidden"
                        animate={touched[field] ? "visible" : "hidden"}
                        className="error-message"
                      >
                        {error}
                      </motion.span>
                    ))}
                  </div>
                ))}
                <div className="input-container">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    className={`mt-2 block w-full rounded-lg border border-gray-600 focus:border-[var(--accent)] focus:ring-0 p-3 form-input ${
                      getInputStatus("message") === "error"
                        ? "input-error"
                        : getInputStatus("message") === "success"
                        ? "input-success"
                        : ""
                    }`}
                    variants={inputVariants}
                    whileFocus="focus"
                    aria-label="Message"
                  />
                  {getInputStatus("message") === "success" && (
                    <CheckCircle
                      className="input-status-icon text-green-500"
                      size={20}
                      style={{ top: "30px" }}
                    />
                  )}
                  {getInputStatus("message") === "error" && (
                    <AlertCircle
                      className="input-status-icon text-red-500"
                      size={20}
                      style={{ top: "30px" }}
                    />
                  )}
                  {formErrors.message.map((error, index) => (
                    <motion.span
                      key={index}
                      variants={errorVariants}
                      initial="hidden"
                      animate={touched.message ? "visible" : "hidden"}
                      className="error-message"
                    >
                      {error}
                    </motion.span>
                  ))}
                </div>
                <motion.button
                  type="submit"
                  className={`px-6 py-3 rounded-lg font-medium glow ${
                    getButtonTextAndStyle().className
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isProcessing}
                  whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                  aria-label="Submit form"
                >
                  {getButtonTextAndStyle().text}
                </motion.button>
              </form>
            </motion.div>
          </Tilt>
          {/* Contact Info Section */}
          <Tilt options={{ max: 15, scale: 1.03 }}>
            <motion.div
              variants={itemVariants}
              className="glass-card rounded-xl p-8"
            >
              <motion.h2
                variants={itemVariants}
                className={`text-2xl font-bold mb-6 gradient-text ${
                  isMobile ? "text-xl" : ""
                }`}
              >
                <AnimatedText text="Contact Info" />
              </motion.h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Mail />,
                    title: "Email",
                    value: "championaden.ca@gmail.com",
                  },
                  { icon: <Phone />, title: "Phone", value: "+2349030155327" },
                  {
                    icon: <MapPin />,
                    title: "Location",
                    value: "Ajah, Lagos, Nigeria",
                  },
                  {
                    icon: <Clock />,
                    title: "Availability",
                    value: "Open to work",
                  },
                ].map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4"
                    variants={itemVariants}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="text-[var(--accent)]"
                    >
                      {info.icon}
                    </motion.div>
                    <div>
                      <h3
                        className="text-base font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {info.title}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div className="mt-6">
                  <h3
                    className="text-base font-semibold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Follow Me
                  </h3>
                  <div className="flex space-x-4">
                    {[
                      {
                        icon: <Instagram />,
                        href: "https://www.instagram.com/sirchampion",
                      },
                      {
                        icon: <Linkedin />,
                        href: "https://www.linkedin.com/in/sirchampion",
                      },
                      { icon: <X />, href: "https://x.com/sirchampionad" },
                      {
                        icon: <Github />,
                        href: "https://github.com/MrChampion2020",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
                        whileHover={{ scale: 1.2 }}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${social.href}`}
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
      <motion.div
        className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50"
        style={{ scaleX }}
      />
      <Footer />
    </div>
  );
};

export default Contact;



