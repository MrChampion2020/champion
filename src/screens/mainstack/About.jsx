
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Users, Target, Award, TrendingUp, Quote } from 'lucide-react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import ReviewSubmissionModal from '../../components/ReviewSubmissionModal';
import aboutPortrait from '../../assets/me/about.jpeg';
import heroPortrait from '../../assets/me/hero.jpeg';
import heroSecPortrait from '../../assets/me/herosec.jpeg';
import developerPortraitA from '../../assets/me/WhatsApp Image 2026-03-20 at 10.51.14 PM.jpeg';
import developerPortraitB from '../../assets/me/WhatsApp Image 2026-03-20 at 10.56.41 PM (1).jpeg';
import API_URL from './config';
import {
  formatReviewMonthYear,
  getReviewAuthor,
  getReviewContent,
  getReviewInitials,
  getReviewRole,
} from '../../utils/reviews';

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.4, staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const AnimatedText = ({ text }) => (
  <span>
    {text.split('').map((char, index) => (
      <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
        {char}
      </motion.span>
    ))}
  </span>
);

const CountUpStat = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return undefined;
    }

    let frameId = 0;
    let startTime = 0;
    const duration = 1400;

    const tick = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * easedProgress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const stats = [
  { icon: <Users size={24} />, title: 'Clients Served', value: 50, suffix: '+' },
  { icon: <Target size={24} />, title: 'Projects Completed', value: 70, suffix: '+' },
  { icon: <Award size={24} />, title: 'Years of Experience', value: 7, suffix: '+' },
  { icon: <TrendingUp size={24} />, title: 'Client Retention', value: 90, suffix: '%' },
];

const team = [
  {
    caption: 'Full-Stack Delivery',
    name: 'From idea to production',
    role: 'Full Stack Engineering',
    description:
      'I design and build complete web platforms across frontend, backend, database design, testing, deployment, and post-launch iteration.',
    image: aboutPortrait,
    imageClassName: 'cartoon-character--top-focus',
  },
  {
    caption: 'User Experience',
    name: 'Interfaces people enjoy using',
    role: 'Frontend and UI Systems',
    description:
      'I turn product requirements into clean, responsive interfaces with thoughtful hierarchy, smooth interactions, and practical usability.',
    image: heroPortrait,
  },
  {
    caption: 'Mobile Products',
    name: 'Cross-platform app execution',
    role: 'React Native Development',
    description:
      'I ship mobile experiences with real-time features, secure APIs, and scalable architecture that feels polished on both Android and iOS.',
    image: developerPortraitA,
  },
  {
    caption: 'Security Mindset',
    name: 'Performance with protection',
    role: 'Cybersecurity and Reliability',
    description:
      'I build with authentication, data protection, and risk reduction in mind so products stay fast, resilient, and trustworthy in production.',
    image: heroSecPortrait,
  },
];

const craftedProjects = [
  {
    title: 'E-commerce Ecosystem',
    description: 'A robust platform with real-time inventory and secure payments using MERN stack.',
  },
  {
    title: 'Mobile Chat Innovation',
    description: 'A real-time chat app built with React Native and WebSockets, now in production.',
  },
  {
    title: 'Secure Enterprise Solutions',
    description: 'Custom cybersecurity frameworks protecting client data with cutting-edge tools.',
  },
];

const About = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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

  return (
    <div className="theme-page overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <PageHero
        eyebrow="About"
        title="About Sir Champion"
        description="Step into a world where code meets creativity and security protects innovation. This journey is shaped by product thinking, clean execution, and measurable digital impact."
        image={aboutPortrait}
        imageAlt="Champion Aden portrait"
      />
      {false && (
      <motion.section
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-background">
          <div className="tech-wheel"></div>
          <div className="tech-wheel"></div>
          <div className="shade-gradient"></div>
          <div className="shade-gradient"></div>
        </div>
        {particlesInit && (
          <Particles
            id="tsparticles"
            init={initParticles}
            options={{
              particles: {
                number: { value: 50 },
                size: { value: 3 },
                move: { speed: 0.5 },
                links: { enable: true, distance: 150, opacity: 0.4 },
                color: { value: theme === 'dark' ? '#8C6F4E' : '#191970' },
              },
              interactivity: {
                events: { onHover: { enable: true, mode: 'repulse' } },
              },
            }}
          />
        )}
        <div className="theme-hero-scrim" />
        <motion.div
          className="relative z-10 text-center max-w-full px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold gradient-text mb-4"
            variants={itemVariants}
          >
            <AnimatedText text="About Champion Aden" />
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--brand-surface)', fontWeight: 700 }}
            variants={itemVariants}
          >
            Step into a world where code meets creativity, and security guards innovation—welcome to my journey!
          </motion.p>
        </motion.div>
      </motion.section>
      )}
      {/* Bio Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-8 sm:mb-12"
          variants={itemVariants}
        >
          My Story
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg max-w-3xl mx-auto text-center"
          style={{ color: 'var(--text-secondary)' }}
          variants={itemVariants}
        >
          With over 7 years in the tech industry, I’ve evolved from a curious coder to a Full Stack Developer and Cybersecurity Analyst. My journey began with a passion for solving real-world problems through software, leading me to master the MERN stack, React Native, and advanced security protocols. I thrive at the intersection of innovation and protection, crafting solutions that are both scalable and secure. From building e-commerce platforms to fortifying digital defenses, my work reflects a commitment to excellence and client success.
        </motion.p>
      </motion.section>
      {/* We Crafted Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
        />
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-8 sm:mb-12"
          variants={itemVariants}
        >
          What We’ve Crafted
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {craftedProjects.map((project, index) => (
            <Tilt key={index} options={{ max: 20, scale: 1.05 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-6 text-center"
                whileHover={{ y: -10, boxShadow: 'var(--shadow-lifted)' }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {project.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.section>
      {/* Team Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
        />
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-8 sm:mb-12"
          variants={itemVariants}
        >
          Meet the Developer
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 max-w-5xl mx-auto">
          {team.map((member, index) => (
            <Tilt key={index} options={{ max: 20, scale: 1.05 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-6 text-center h-full"
                whileHover={{ y: -10, boxShadow: 'var(--shadow-lifted)' }}
              >
                <div
                  className={`cartoon-character ${member.imageClassName ?? ''}`.trim()}
                  style={{ backgroundImage: `url(${member.image})` }}
                />
                <p
                  className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.18em]"
                  style={{ color: 'var(--accent)' }}
                >
                  {member.caption}
                </p>
                <h3 className="text-lg sm:text-xl font-bold mt-4 mb-2" style={{ color: 'var(--text-primary)' }}>
                  {member.name}
                </h3>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>
                  {member.description}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.section>
      {/* Stats Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-8 sm:mb-12"
          variants={itemVariants}
        >
          My Achievements
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 relative z-10">
          {stats.map((stat, index) => (
            <Tilt key={index} options={{ max: 15, scale: 1.03 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-4 sm:p-6 text-center"
                whileHover={{ y: -10, boxShadow: 'var(--shadow-lifted)' }}
              >
                <motion.div
                  className="mb-2 text-[var(--accent)]"
                  whileHover={{ scale: 1.2 }}
                >
                  {stat.icon}
                </motion.div>
                <p className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  <CountUpStat value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {stat.title}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.section>
      {/* Testimonials Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
        />
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center gradient-text mb-8 sm:mb-12"
          variants={itemVariants}
        >
          What Clients Say
        </motion.h2>
        <motion.div
          className="mb-8 flex justify-center relative z-10"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {reviews.length ? reviews.map((review) => (
            <Tilt key={review.id} options={{ max: 15, scale: 1.03 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-6 sm:p-8"
                whileHover={{ y: -10, boxShadow: 'var(--shadow-lifted)' }}
              >
                <div className="flex items-center mb-4">
                  <div
                    className="mr-3 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.08)] text-sm font-extrabold"
                    style={{ color: 'var(--accent)' }}
                  >
                    {getReviewInitials(review)}
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {getReviewAuthor(review)}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: 'var(--text-secondary)' }}>
                      {[getReviewRole(review) || 'Client', formatReviewMonthYear(review.createdAt)]
                        .filter(Boolean)
                        .join(' | ')}
                    </p>
                  </div>
                </div>
                <Quote className="text-[var(--accent)] mb-4" size={24} />
                <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                  {getReviewContent(review)}
                </p>
              </motion.div>
            </Tilt>
          )) : (
            <div className="glass-card blog-status-card sm:col-span-2 lg:col-span-3 relative z-10">
              <p className="theme-muted text-center">
                Reviews will appear here once approved by admin.
              </p>
            </div>
          )}
        </div>
      </motion.section>
      <ReviewSubmissionModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reviews={reviews}
      />
      <motion.div
        className="theme-progress-bar fixed bottom-0 left-0 z-50 h-1 w-full"
        style={{ scaleX }}
      />
      <Footer />
    </div>
  );
};

export default About;

