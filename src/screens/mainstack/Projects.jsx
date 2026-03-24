import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { X, ExternalLink } from 'lucide-react';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BrandLoader from '../../components/BrandLoader';
import PageHero from '../../components/PageHero';
import heroPortrait from '../../assets/me/hero.jpeg';
import API_URL from './config';
import { projects } from '../../data/projects';

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

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
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

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentProjects, setCurrentProjects] = useState([]);
  const [isLoadingCurrentProjects, setIsLoadingCurrentProjects] = useState(true);
  const [currentProjectsError, setCurrentProjectsError] = useState("");
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const loadCurrentProjects = async () => {
      setIsLoadingCurrentProjects(true);
      setCurrentProjectsError("");

      try {
        const response = await axios.get(`${API_URL}/api/projects/current?limit=6`);
        setCurrentProjects(response.data?.projects ?? []);
      } catch (error) {
        setCurrentProjectsError("Current project updates are unavailable right now.");
      } finally {
        setIsLoadingCurrentProjects(false);
      }
    };

    loadCurrentProjects();
  }, []);

  return (
    <div className="theme-page overflow-x-hidden">
      <Navbar />
      {/* Hero Section */}
      <PageHero
        eyebrow="Projects"
        title="Featured Projects"
        description="Explore fintech, commerce, healthcare, communication, and brand platforms crafted with a sharp focus on trust, performance, and polished user experience."
        image={heroPortrait}
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
            className="text-5xl md:text-7xl font-extrabold gradient-text mb-4"
            variants={itemVariants}
          >
            <AnimatedText text="Featured Projects" />
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-1xl mx-auto"
            style={{ color: 'var(--brand-surface)', fontWeight: 700 }}
            variants={itemVariants}
          >
            Explore fintech, commerce, healthcare, communication, and brand platforms crafted with a sharp focus on trust, performance, and polished user experience.
          </motion.p>
        </motion.div>
      </motion.section>
      )}
      {/* Projects Section */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {projects.map((project) => (
            <Tilt key={project.title} options={{ max: 20, scale: 1.05, perspective: 1000 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedProject(project)}
                whileHover={{ y: -10, boxShadow: 'var(--shadow-lifted)' }}
              >
                <div className={`project-image-shell project-image-shell--card ${project.imageShellClassName ?? ""}`}>
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-contain"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className="p-6">
                  <motion.h3
                    className="text-xl font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                    whileHover={{ color: 'var(--accent)' }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.div>
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <div className="glass-card current-projects-shell">
          <div className="current-projects-header">
            <div>
              <span className="current-projects-eyebrow">Currently in Build</span>
              <h2 className="gradient-text mt-3 text-3xl sm:text-4xl font-bold">
                Live Work in Progress
              </h2>
              <p className="current-projects-intro">
                Fresh updates from the admin desk, highlighting what is actively
                being designed, built, or tested right now.
              </p>
            </div>
          </div>
          {currentProjectsError ? (
            <p className="admin-status-error mt-6">{currentProjectsError}</p>
          ) : null}
          {isLoadingCurrentProjects ? (
            <BrandLoader label="Loading current projects" compact className="mt-8" />
          ) : currentProjects.length ? (
            <div className="current-project-grid mt-8">
              {currentProjects.map((project) => (
                <article key={project.id} className="current-project-card">
                  <div className="current-project-image-shell">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="current-project-image"
                    />
                  </div>
                  <div className="current-project-copy">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="current-project-actions">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-button-primary px-5 py-3 inline-flex items-center"
                        >
                          Open Test Link
                          <ExternalLink size={15} className="ml-2" />
                        </a>
                      ) : (
                        <span className="theme-chip">Private build</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="current-project-empty mt-8">
              <p>No current projects have been published yet.</p>
            </div>
          )}
        </div>
      </motion.section>
      {/* Full-Screen Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="glass-card rounded-2xl p-8 max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
          >
            <motion.button
              className="absolute top-4 right-4 rounded-full p-2 futuristic-glow glow"
              onClick={() => setSelectedProject(null)}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} style={{ color: 'var(--text-primary)' }} />
            </motion.button>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`project-image-shell h-64 rounded-xl ${selectedProject.imageShellClassName ?? ""}`}>
                <motion.img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full rounded-xl object-contain"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold mb-4 gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {selectedProject.title}
                  </motion.h3>
                  <motion.p
                    className="text-sm md:text-base mb-6"
                    style={{ color: 'var(--text-secondary)' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {selectedProject.description}
                  </motion.p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {selectedProject.link && (
                    <motion.a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-button-primary glow px-6 py-3 flex items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {selectedProject.linkLabel ?? 'Preview Project'} <ExternalLink size={16} className="ml-2" />
                    </motion.a>
                  )}
                  {selectedProject.secondaryLink && (
                    <motion.a
                      href={selectedProject.secondaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-button-secondary glow px-6 py-3 flex items-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      {selectedProject.secondaryLabel ?? 'Open Link'} <ExternalLink size={16} className="ml-2" />
                    </motion.a>
                  )}
                  <motion.button
                    className="theme-button-secondary glow px-6 py-3"
                    onClick={() => setSelectedProject(null)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      {/* Scroll Progress Bar */}
      <motion.div
        className="theme-progress-bar fixed bottom-0 left-0 z-50 h-1 w-full"
        style={{ scaleX }}
      />
      <Footer />
    </div>
  );
};

export default Projects;

