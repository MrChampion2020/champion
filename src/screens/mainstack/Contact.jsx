import React, { useState, useContext, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Linkedin, Github, CheckCircle, AlertCircle } from 'lucide-react';
import { Tilt } from 'react-tilt';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ThemeContext } from '../../screens/context/ThemeContext';
import axios from 'axios';
import API_URL from './config';
import { useMediaQuery } from 'react-responsive';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const inputVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  focus: { scale: 1.02, boxShadow: '0 0 12px var(--accent)' },
};

const errorVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
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
  const { theme } = useContext(ThemeContext) || { theme: 'dark' };
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({ name: [], email: [], subject: [], message: [] });
  const [touched, setTouched] = useState({ name: false, email: false, subject: false, message: false });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [particlesInit, setParticlesInit] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const validateField = (name, value) => {
    const errors = [];

    switch (name) {
      case 'name':
        if (!value) errors.push('Yo, put a name in there, dummy!');
        if (value.length < 2) errors.push('Name’s too short, c’mon, give more!');
        if (value.length > 50) errors.push('Whoa, name’s too long, chill out!');
        if (!/^[a-zA-Z\s'-]+$/.test(value)) errors.push('No weird stuff in name, just letters and spaces, okay?');
        break;
      case 'email':
        if (!value) errors.push('Oops, need an email, silly!');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.push('That email looks funky, fix it!');
        if (value.length > 100) errors.push('Email’s too big, shrink it down!');
        if (!/\.[a-zA-Z]{2,}$/.test(value)) errors.push('Gimme a real email domain, dude!');
        break;
      case 'subject':
        if (!value) errors.push('Hey, gimme a subject, don’t be lazy!');
        if (value.length < 3) errors.push('Subject’s too tiny, make it bigger!');
        if (value.length > 100) errors.push('Subject’s too huge, cut it down!');
        break;
      case 'message':
        if (!value) errors.push('Write something, you goofball!');
        if (value.length < 10) errors.push('Message’s too short, add more junk!');
        if (value.length > 1000) errors.push('Whoa, message’s a novel, tone it down!');
        if (value.split(/\s+/).length < 3) errors.push('Need more words, at least 3, lazybones!');
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
      console.log('Particles initialized');
    } catch (error) {
      console.error('Particles init error:', error);
    }
  }, []);

  useEffect(() => {
    console.log('Contact rendered, theme:', theme, 'particlesInit:', particlesInit);
  }, [theme, particlesInit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setTouched({ ...touched, [name]: true });

    // Real-time validation
    setFormErrors({ ...formErrors, [name]: validateField(name, value) });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setFormErrors({ ...formErrors, [name]: validateField(name, formData[name]) });
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
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Clear input fields on success
        setFormErrors({ name: [], email: [], subject: [], message: [] });
        setTouched({ name: false, email: false, subject: false, message: false });
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

  const getInputStatus = (field) => {
    if (!touched[field]) return 'neutral';
    return formErrors[field].length === 0 && formData[field] ? 'success' : 'error';
  };

  const getButtonTextAndStyle = () => {
    if (isProcessing) return { text: 'Sending...', className: 'opacity-50 cursor-not-allowed' };
    if (submitStatus === 'success') return { text: 'Sent!', className: 'bg-green-500' };
    if (submitStatus === 'error') return { text: 'Failed!', className: 'bg-red-500' };
    return { text: 'Send Message', className: 'bg-gradient-to-r from-blue-600 to-purple-600' };
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
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
          }
          .light {
            --card-bg: rgba(255, 255, 255, 0.8);
            --text-primary: #111827;
            --text-secondary: #4b5563;
            --accent: var(--neon-purple);
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
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
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
        <Particles
          id="particles"
          init={initParticles}
          options={{
            particles: {
              number: { value: 50 },
              size: { value: 3 },
              move: { speed: 0.5 },
              links: { enable: true, distance: 150, opacity: 0.4 },
              color: { value: theme === 'dark' ? '#3b82f6' : '#9333ea' },
            },
            interactivity: {
              events: { onHover: { enable: true, mode: 'repulse' } },
            },
            style: { position: 'absolute', zIndex: 0 },
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 10 }}
        />
        <motion.div
          className="relative text-center hero-text"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold gradient-text mb-4"
            variants={itemVariants}
            style={{ zIndex: 20 }}
          >
            <AnimatedText text="Contact Us" />
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            variants={itemVariants}
            style={{ color: 'var(--text-secondary)', zIndex: 20 }}
          >
            I am committed to providing exceptional support and collaboration opportunities. Please reach out to discuss your needs.
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
          style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
        />
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
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {['name', 'email', 'subject'].map((field) => (
                  <div key={field} className="input-container">
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
                      onBlur={handleBlur}
                      className={`mt-2 block w-full rounded-lg bg-gray-700/30 text-white border border-gray-600 focus:border-[var(--accent)] focus:ring-0 p-3 ${
                        getInputStatus(field) === 'error' ? 'input-error' :
                        getInputStatus(field) === 'success' ? 'input-success' : ''
                      }`}
                      variants={inputVariants}
                      whileFocus="focus"
                    />
                    {getInputStatus(field) === 'success' && (
                      <CheckCircle className="input-status-icon text-green-500" size={20} />
                    )}
                    {getInputStatus(field) === 'error' && (
                      <AlertCircle className="input-status-icon text-red-500" size={20} />
                    )}
                    {formErrors[field].map((error, index) => (
                      <motion.span
                        key={index}
                        variants={errorVariants}
                        initial="hidden"
                        animate={touched[field] ? 'visible' : 'hidden'}
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
                    style={{ color: 'var(--text-secondary)' }}
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
                    className={`mt-2 block w-full rounded-lg bg-gray-700/30 text-white border border-gray-600 focus:border-[var(--accent)] focus:ring-0 p-3 ${
                      getInputStatus('message') === 'error' ? 'input-error' :
                      getInputStatus('message') === 'success' ? 'input-success' : ''
                    }`}
                    variants={inputVariants}
                    whileFocus="focus"
                  />
                  {getInputStatus('message') === 'success' && (
                    <CheckCircle className="input-status-icon text-green-500" size={20} style={{ top: '30px' }} />
                  )}
                  {getInputStatus('message') === 'error' && (
                    <AlertCircle className="input-status-icon text-red-500" size={20} style={{ top: '30px' }} />
                  )}
                  {formErrors.message.map((error, index) => (
                    <motion.span
                      key={index}
                      variants={errorVariants}
                      initial="hidden"
                      animate={touched.message ? 'visible' : 'hidden'}
                      className="error-message"
                    >
                      {error}
                    </motion.span>
                  ))}
                </div>
                <motion.button
                  type="submit"
                  className={`px-6 py-3 rounded-lg text-white font-medium glow ${getButtonTextAndStyle().className} ${
                    isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isProcessing}
                  whileHover={{ scale: isProcessing ? 1 : 1.05 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.95 }}
                >
                  {getButtonTextAndStyle().text}
                </motion.button>
              </form>
            </motion.div>
          </Tilt>
          {/* Contact Info Section */}
          <Tilt options={{ max: 15, scale: 1.03 }}>
            <motion.div variants={itemVariants} className="glass-card rounded-xl p-8">
              <motion.h2
                variants={itemVariants}
                className={`text-2xl font-bold mb-6 gradient-text ${isMobile ? 'text-xl' : ''}`}
              >
                <AnimatedText text="Contact Info" />
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
                      <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {info.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {info.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div className="mt-6">
                  <h3 className="text-base font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
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
      <motion.div
        className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 z-50"
        style={{ scaleX }}
      />
      <Footer />
    </div>
  );
};

export default Contact;