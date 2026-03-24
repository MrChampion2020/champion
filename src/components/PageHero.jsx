import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.15, staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 16 },
  },
};

const PageHero = ({ eyebrow, title, description, image, children }) => {
  return (
    <motion.section
      className="page-hero relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-background">
        <div className="tech-wheel page-hero-wheel page-hero-wheel-a" />
        <div className="tech-wheel page-hero-wheel page-hero-wheel-b" />
        <div className="shade-gradient page-hero-glow page-hero-glow-a" />
        <div className="shade-gradient page-hero-glow page-hero-glow-b" />
      </div>
      <div className="page-hero-image-wrap" aria-hidden="true">
        <img src={image} alt="" className="page-hero-image" />
      </div>
      <div className="theme-hero-scrim page-hero-overlay" />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="page-hero-shell">
          <motion.div className="page-hero-card glass-card" variants={itemVariants}>
            {eyebrow ? <span className="page-hero-chip">{eyebrow}</span> : null}
            <motion.h1
              className="gradient-text mt-4 text-4xl font-extrabold sm:text-5xl md:text-6xl"
              variants={itemVariants}
            >
              {title}
            </motion.h1>
            <motion.p
              className="page-hero-description mt-4 max-w-2xl text-base font-semibold sm:text-lg md:text-xl"
              variants={itemVariants}
            >
              {description}
            </motion.p>
            {children ? (
              <motion.div className="page-hero-actions" variants={itemVariants}>
                {children}
              </motion.div>
            ) : null}
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default PageHero;
