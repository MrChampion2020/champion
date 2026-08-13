import React, { useState, useEffect } from "react";
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
import BrandLoader from "../../components/BrandLoader";
import Footer from "../../components/Footer";
import PageHero from "../../components/PageHero";
import PhoneCountrySelect from "../../components/PhoneCountrySelect";
import heroPortrait from "../../assets/me/hero.jpeg";
import axios from "axios";
import API_URL from "./config";
import { useMediaQuery } from "react-responsive";
import { DEFAULT_PHONE_COUNTRY } from "../../data/phoneCountries";
import { buildInternationalPhoneNumber, isValidPhoneNumber } from "../../utils/phoneValidation";

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
  const [phoneCountry, setPhoneCountry] = useState(DEFAULT_PHONE_COUNTRY);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const validateField = (name, value, country = phoneCountry) => {
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
        if (value && !isValidPhoneNumber(value, country))
          errors.push("Select a country code and enter a valid phone number!");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });
    setFormErrors({ ...formErrors, [name]: validateField(name, value, phoneCountry) });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setFormErrors({ ...formErrors, [name]: validateField(name, formData[name], phoneCountry) });
  };

  const handlePhoneCountryChange = (nextCountry) => {
    setPhoneCountry(nextCountry);

    if (touched.phone || formData.phone) {
      setFormErrors({
        ...formErrors,
        phone: validateField("phone", formData.phone, nextCountry),
      });
    }
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
    const submission = {
      ...formData,
      phone: buildInternationalPhoneNumber(formData.phone, phoneCountry),
    };

    try {
      const response = await axios.post(`${API_URL}/api/contact`, submission, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 200) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        setPhoneCountry(DEFAULT_PHONE_COUNTRY);
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
        className: "theme-button-secondary opacity-70 cursor-not-allowed",
      };
    if (submitStatus === "success")
      return { text: "Sent!", className: "theme-button-primary" };
    if (submitStatus === "error")
      return { text: "Failed!", className: "theme-button-secondary border border-red-500 text-red-500" };
    return {
      text: "Send Message",
      className: "theme-button-primary",
    };
  };

  return (
    <div className="theme-page overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <PageHero
        eyebrow="Contact"
        title="Contact Me"
        description="I am committed to exceptional collaboration and clear communication. Reach out to discuss your product goals, timelines, and the digital experience you want to build next."
        image={heroPortrait}
        imageAlt="Champion Aden portrait"
      />
      {false && (
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
                color: { value: theme === "dark" ? "#8C6F4E" : "#191970" },
              },
              interactivity: {
                events: { onHover: { enable: true, mode: "repulse" } },
              },
              style: { position: "absolute", zIndex: 0 },
            }}
          />
        )}
        <div className="theme-hero-scrim" />
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
            style={{ color: "var(--brand-surface)", zIndex: 20, fontWeight: 700 }}
          >
            I'm committed to providing exceptional support and collaboration
            opportunities. Reach out to discuss your needs.
          </motion.p>
        </motion.div>
      </motion.section>
      )}
      {/* Contact Form and Info Section */}
      <motion.section
        id="contact-form"
        className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative scroll-mt-28"
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
                    {field === "phone" ? (
                      <>
                        <div className="phone-field-grid mt-2">
                          <PhoneCountrySelect
                            value={phoneCountry}
                            onChange={handlePhoneCountryChange}
                            triggerClassName="form-input rounded-lg"
                            ariaLabel="Country code"
                          />
                          <motion.input
                            type="tel"
                            id={field}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            inputMode="tel"
                            autoComplete="tel-national"
                            placeholder="903 015 5327"
                            className={`block w-full rounded-lg border border-gray-600 focus:border-[var(--accent)] focus:ring-0 p-3 form-input ${
                              getInputStatus(field) === "error"
                                ? "input-error"
                                : getInputStatus(field) === "success"
                                ? "input-success"
                                : ""
                            }`}
                            variants={inputVariants}
                            whileFocus="focus"
                            aria-label="Phone number"
                          />
                        </div>
                        <span className="phone-field-note">
                          Choose your country code, then enter the rest of your number without it.
                        </span>
                      </>
                    ) : (
                      <motion.input
                        type={field === "email" ? "email" : "text"}
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
                    )}
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
                  className={`rounded-lg px-6 py-3 font-medium glow ${
                    getButtonTextAndStyle().className
                  } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isProcessing}
                  whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                  aria-label="Submit form"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <BrandLoader inline />
                      {getButtonTextAndStyle().text}
                    </span>
                  ) : (
                    getButtonTextAndStyle().text
                  )}
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
                    value: "champion@feeda.us",
                  },
                  { icon: <Phone />, title: "Phone", value: "+2349030155327" },
                  {
                    icon: <MapPin />,
                    title: "Location",
                    value: "Plot 15 Unity Avenue Estate Ajah Lagos Nigeria",
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
        className="theme-progress-bar fixed bottom-0 left-0 z-50 h-1 w-full"
        style={{ scaleX }}
      />
      <Footer />
    </div>
  );
};

export default Contact;




