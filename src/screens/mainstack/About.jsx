import React, { useContext, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Users, Target, Award, TrendingUp, Quote } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ThemeContext } from '../../screens/context/ThemeContext';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import me from '../../assets/me.jpg';
import avatar1 from '../../assets/Avatar1.png';
import avatar2 from '../../assets/Avatar2.png';
import avatar3 from '../../assets/Avatar3.png';

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

const stats = [
  { icon: <Users size={24} />, title: 'Clients Served', value: '50+' },
  { icon: <Target size={24} />, title: 'Projects Completed', value: '70+' },
  { icon: <Award size={24} />, title: 'Years of Experience', value: '7+' },
  { icon: <TrendingUp size={24} />, title: 'Client Retention', value: '90%' },
];

const team = [
  {
    name: 'Champion Aden',
    role: 'Full Stack Developer & Cybersecurity Analyst',
    image: me,
  },
];

const testimonials = [
  {
    quote: 'Champion you will go places, your humility and response to work is too rare, you patiently listened and delivered every piece of the job and most importantly, very fast.',
    author: 'Dr. Omoregie, Client',
    avatar: avatar1,
  },
  {
    quote: 'Is mobile app that easy? you were too fast. Thank you Champion for making our app a reality',
    author: 'Michael Scott, CEO, Scottified',
    avatar: avatar2,
  },
  {
    quote: 'Champion\'s portfolio website elevated our brand. His skills in TypeScript and React are top-notch!',
    author: 'Mr. Charles, Founder, Prime Procurement',
    avatar: avatar3,
  },
];

const About = () => {
  const { theme } = useContext(ThemeContext);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [particlesInit, setParticlesInit] = useState(false);

  const initParticles = useCallback(async (engine) => {
    await loadSlim(engine);
    setParticlesInit(true);
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} overflow-x-hidden`}>
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
          .parallax-bg {
            background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
            opacity: 0.1;
          }
          .hero-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, ${theme === 'dark' ? 0.7 : 0.3}), rgba(0, 0, 0, ${theme === 'dark' ? 0.7 : 0.1}));
            overflow: hidden;
            z-index: 0;
          }
          .tech-wheel {
            position: absolute;
            border-radius: 50%;
            border: 2px dashed ${theme === 'dark' ? '#3b82f6' : '#9333ea'};
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
            background: radial-gradient(circle, rgba(${theme === 'dark' ? '59, 130, 246' : '147, 51, 234'}, 0.3), transparent);
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
                color: { value: theme === 'dark' ? '#3b82f6' : '#9333ea' },
              },
              interactivity: {
                events: { onHover: { enable: true, mode: 'repulse' } },
              },
            }}
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}
        />
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
            style={{ color: 'var(--text-secondary)' }}
            variants={itemVariants}
          >
            Building secure, scalable digital experiences with passion and expertise.
          </motion.p>
        </motion.div>
      </motion.section>
      {/* Mission Section */}
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
          My Mission
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg max-w-3xl mx-auto text-center"
          style={{ color: 'var(--text-secondary)' }}
          variants={itemVariants}
        >
          To empower businesses and individuals with innovative, secure, and user-centric digital solutions, leveraging the MERN stack, React Native, and cybersecurity expertise to create impactful web and mobile applications.
        </motion.p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10 max-w-3xl mx-auto">
          {team.map((member, index) => (
            <Tilt key={index} options={{ max: 20, scale: 1.05 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-6 text-center"
                whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
              >
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  whileHover={{ scale: 1.1 }}
                />
                <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                  {member.name}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {member.role}
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
                whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
              >
                <motion.div
                  className="mb-2 text-[var(--accent)]"
                  whileHover={{ scale: 1.2 }}
                >
                  {stat.icon}
                </motion.div>
                <p className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative z-10">
          {testimonials.map((testimonial, index) => (
            <Tilt key={index} options={{ max: 15, scale: 1.03 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-6 sm:p-8"
                whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      {testimonial.author}
                    </p>
                  </div>
                </div>
                <Quote className="text-[var(--accent)] mb-4" size={24} />
                <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                  {testimonial.quote}
                </p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </motion.section>
      <motion.div
        className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
        style={{ scaleX }}
      />
      <Footer />
    </div>
  );
};

export default About;


// import React, { useContext, useEffect, useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Tilt } from 'react-tilt';
// import { Users, Target, Award, TrendingUp, Quote } from 'lucide-react';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import { ThemeContext } from '../../screens/context/ThemeContext';
// import Particles from '@tsparticles/react';
// import { loadSlim } from '@tsparticles/slim';
// import { useCallback } from 'react';
// import me from '../../assets/me.jpg';
// import team1 from '../../assets/me.jpg';
// import team2 from '../../assets/me.jpg';

// // Animation Variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { delayChildren: 0.4, staggerChildren: 0.3 } },
// };

// const itemVariants = {
//   hidden: { y: 50, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } },
// };

// const letterVariants = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
// };

// const AnimatedText = ({ text }) => (
//   <span>
//     {text.split('').map((char, index) => (
//       <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
//         {char}
//       </motion.span>
//     ))}
//   </span>
// );

// const stats = [
//   { icon: <Users size={24} />, title: 'Clients Served', value: '30+' },
//   { icon: <Target size={24} />, title: 'Projects Completed', value: '50+' },
//   { icon: <Award size={24} />, title: 'Years of Experience', value: '5+' },
//   { icon: <TrendingUp size={24} />, title: 'Annual Growth', value: '25%' },
// ];

// const team = [
//   { name: 'Champion Aden', role: 'Lead Developer', image: me },
//   { name: 'Alex Doe', role: 'UI/UX Designer', image: team1 },
//   { name: 'Jane Smith', role: 'Backend Engineer', image: team2 },
// ];

// const testimonials = [
//   {
//     quote: 'Champion transformed our digital presence with a stunning app!',
//     author: 'John Doe, CEO of TechCorp',
//   },
//   {
//     quote: 'Their team delivered beyond expectations, highly recommended!',
//     author: 'Sarah Lee, Founder of StartUpX',
//   },
// ];

// const About = () => {
//   const { theme } = useContext(ThemeContext);
//   const { scrollYProgress } = useScroll();
//   const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
//   const [particlesInit, setParticlesInit] = useState(false);

//   const initParticles = useCallback(async (engine) => {
//     await loadSlim(engine);
//     setParticlesInit(true);
//   }, []);

//   return (
//     <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
//       <style>
//         {`
//           :root {
//             --neon-blue: #3b82f6;
//             --neon-purple: #9333ea;
//           }
//           .dark {
//             --card-bg: rgba(17, 24, 39, 0.7);
//             --text-primary: #ffffff;
//             --text-secondary: #d1d5db;
//             --accent: var(--neon-blue);
//           }
//           .light {
//             --card-bg: rgba(255, 255, 255, 0.8);
//             --text-primary: #111827;
//             --text-secondary: #4b5563;
//             --accent: var(--neon-purple);
//           }
//           .glass-card {
//             background: var(--card-bg);
//             backdrop-filter: blur(12px);
//             border: 1px solid rgba(255, 255, 255, 0.1);
//             box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
//           }
//           .glow {
//             box-shadow: 0 0 15px var(--accent);
//           }
//           .gradient-text {
//             background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
//             -webkit-background-clip: text;
//             background-clip: text;
//             color: transparent;
//           }
//           .parallax-bg {
//             background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
//             opacity: 0.1;
//           }
//         `}
//       </style>
//       <Navbar />
//       {/* Hero Section */}
//       <motion.section
//         className="relative h-[60vh] flex items-center justify-center overflow-hidden"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         {particlesInit && (
//           <Particles
//             id="tsparticles"
//             options={{
//               particles: {
//                 number: { value: 50 },
//                 size: { value: 3 },
//                 move: { speed: 0.5 },
//                 links: { enable: true, distance: 150, opacity: 0.4 },
//                 color: { value: theme === 'dark' ? '#3b82f6' : '#9333ea' },
//               },
//               interactivity: {
//                 events: { onHover: { enable: true, mode: 'repulse' } },
//               },
//             }}
//           />
//         )}
//         <div
//           className="absolute inset-0"
//           style={{ background: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}
//         />
//         <motion.div
//           className="relative z-10 text-center"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           <motion.h1
//             className="text-5xl md:text-7xl font-extrabold gradient-text mb-4"
//             variants={itemVariants}
//           >
//             <AnimatedText text="About Us" />
//           </motion.h1>
//           <motion.p
//             className="text-lg md:text-xl max-w-2xl mx-auto"
//             style={{ color: 'var(--text-secondary)' }}
//             variants={itemVariants}
//           >
//             Crafting the future of digital innovation with passion and expertise.
//           </motion.p>
//         </motion.div>
//       </motion.section>
//       {/* Mission Section */}
//       <motion.section
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative"
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false }}
//       >
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold text-center gradient-text mb-12"
//           variants={itemVariants}
//         >
//           Our Mission
//         </motion.h2>
//         <motion.p
//           className="text-lg max-w-3xl mx-auto text-center"
//           style={{ color: 'var(--text-secondary)' }}
//           variants={itemVariants}
//         >
//           We strive to empower businesses with innovative digital solutions, blending cutting-edge technology with creative design to deliver unparalleled user experiences.
//         </motion.p>
//       </motion.section>
//       {/* Team Section */}
//       <motion.section
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden"
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false }}
//       >
//         <motion.div
//           className="absolute inset-0 parallax-bg"
//           style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
//         />
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold text-center gradient-text mb-12"
//           variants={itemVariants}
//         >
//           Our Team
//         </motion.h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
//           {team.map((member, index) => (
//             <Tilt key={index} options={{ max: 20, scale: 1.05 }}>
//               <motion.div
//                 variants={itemVariants}
//                 className="glass-card rounded-xl p-6 text-center"
//                 whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
//               >
//                 <motion.img
//                   src={member.image}
//                   alt={member.name}
//                   className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
//                   whileHover={{ scale: 1.1 }}
//                 />
//                 <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
//                   {member.name}
//                 </h3>
//                 <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                   {member.role}
//                 </p>
//               </motion.div>
//             </Tilt>
//           ))}
//         </div>
//       </motion.section>
//       {/* Stats Section */}
//       <motion.section
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false }}
//       >
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold text-center gradient-text mb-12"
//           variants={itemVariants}
//         >
//           Our Achievements
//         </motion.h2>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
//           {stats.map((stat, index) => (
//             <Tilt key={index} options={{ max: 15, scale: 1.03 }}>
//               <motion.div
//                 variants={itemVariants}
//                 className="glass-card rounded-xl p-6 text-center"
//                 whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
//               >
//                 <motion.div
//                   className="mb-2 text-[var(--accent)]"
//                   whileHover={{ scale: 1.2 }}
//                 >
//                   {stat.icon}
//                 </motion.div>
//                 <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
//                   {stat.value}
//                 </p>
//                 <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                   {stat.title}
//                 </p>
//               </motion.div>
//             </Tilt>
//           ))}
//         </div>
//       </motion.section>
//       {/* Testimonials Section */}
//       <motion.section
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden"
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: false }}
//       >
//         <motion.div
//           className="absolute inset-0 parallax-bg"
//           style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
//         />
//         <motion.h2
//           className="text-3xl md:text-4xl font-bold text-center gradient-text mb-12"
//           variants={itemVariants}
//         >
//           What Our Clients Say
//         </motion.h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
//           {testimonials.map((testimonial, index) => (
//             <Tilt key={index} options={{ max: 15, scale: 1.03 }}>
//               <motion.div
//                 variants={itemVariants}
//                 className="glass-card rounded-xl p-8"
//                 whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
//               >
//                 <Quote className="text-[var(--accent)] mb-4" size={32} />
//                 <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
//                   {testimonial.quote}
//                 </p>
//                 <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
//                   {testimonial.author}
//                 </p>
//               </motion.div>
//             </Tilt>
//           ))}
//         </div>
//       </motion.section>
//       <motion.div
//         className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
//         style={{ scaleX }}
//       />
//       <Footer />
//     </div>
//   );
// };

// export default About;




// // import React, { useContext } from 'react';
// // import { motion, useScroll, useTransform } from 'framer-motion';
// // import { Tilt } from 'react-tilt';
// // import { Users, Target, Award, TrendingUp } from 'lucide-react';
// // import Navbar from '../../components/Navbar';
// // import Footer from '../../components/Footer';
// // import { ThemeContext } from '../../screens/context/ThemeContext';
// // import bgs from '../../assets/bgmid.png';
// // import me from '../../assets/me.png';

// // // Animation Variants
// // const containerVariants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: { delayChildren: 0.4, staggerChildren: 0.3 },
// //   },
// // };

// // const itemVariants = {
// //   hidden: { y: 50, opacity: 0 },
// //   visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } },
// // };

// // const titleVariants = {
// //   hidden: { opacity: 0, scale: 0.8 },
// //   visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
// // };

// // const stats = [
// //   { icon: <Users size={24} />, title: 'Clients Served', value: '30+' },
// //   { icon: <Target size={24} />, title: 'Projects Completed', value: '50+' },
// //   { icon: <Award size={24} />, title: 'Years of Experience', value: '5+' },
// //   { icon: <TrendingUp size={24} />, title: 'Annual Growth', value: '25%' },
// // ];

// // const About = () => {
// //   const { theme } = useContext(ThemeContext);
// //   const { scrollYProgress } = useScroll();
// //   const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

// //   return (
// //     <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
// //       <style>
// //         {`
// //           :root {
// //             --neon-blue: #3b82f6;
// //             --neon-purple: #9333ea;
// //           }
// //           .dark {
// //             --card-bg: rgba(17, 24, 39, 0.6);
// //             --text-primary: #ffffff;
// //             --text-secondary: #d1d5db;
// //             --accent: var(--neon-blue);
// //           }
// //           .light {
// //             --card-bg: rgba(255, 255, 255, 0.8);
// //             --text-primary: #111827;
// //             --text-secondary: #4b5563;
// //             --accent: var(--neon-purple);
// //           }
// //           .glass-card {
// //             background: var(--card-bg);
// //             backdrop-filter: blur(10px);
// //             border: 1px solid rgba(255, 255, 255, 0.1);
// //             box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
// //           }
// //           .glow {
// //             box-shadow: 0 0 15px var(--accent);
// //           }
// //           .gradient-text {
// //             background: linear-gradient(45deg, var(--neon-blue), var(--neon-purple));
// //             -webkit-background-clip: text;
// //             background-clip: text;
// //             color: transparent;
// //           }
// //           .parallax-bg {
// //             background: linear-gradient(135deg, var(--neon-blue), var(--neon-purple));
// //             opacity: 0.1;
// //           }
// //         `}
// //       </style>
// //       <Navbar />
// //       <motion.div
// //         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden"
// //         variants={containerVariants}
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: false }}
// //       >
// //         <motion.div
// //           className="absolute inset-0 parallax-bg"
// //           style={{ transform: useTransform(scrollYProgress, [0, 1], ['translateY(0%)', 'translateY(-20%)']) }}
// //         />
// //         <motion.h2
// //           variants={titleVariants}
// //           className="text-4xl md:text-5xl font-extrabold text-center mb-16 gradient-text"
// //         >
// //           About Me
// //         </motion.h2>
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
// //           <Tilt options={{ max: 20, scale: 1.05 }}>
// //             <motion.div variants={itemVariants} className="glass-card rounded-xl overflow-hidden">
// //               <motion.img
// //                 src={me}
// //                 alt="About Champion Aden"
// //                 className="w-full h-auto"
// //                 whileHover={{ scale: 1.1 }}
// //                 transition={{ duration: 0.3 }}
// //               />
// //             </motion.div>
// //           </Tilt>
// //           <motion.div variants={itemVariants} className="glass-card rounded-xl p-8">
// //             <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
// //               With over 5 years in web and mobile app development, I craft intuitive digital solutions using cutting-edge technologies to deliver exceptional user experiences.
// //             </p>
// //             <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
// //               Proficient in React, Next.js, Node.js, and mobile frameworks, I combine technical expertise with creative problem-solving for scalable, innovative applications.
// //             </p>
// //             <div className="flex flex-wrap gap-4">
// //               {['React', 'Next.js', 'Node.js', 'Mobile Development'].map((tech, index) => (
// //                 <motion.span
// //                   key={index}
// //                   className="px-4 py-2 rounded-full glow"
// //                   style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}
// //                   whileHover={{ scale: 1.1, background: 'var(--accent)', color: '#fff' }}
// //                 >
// //                   {tech}
// //                 </motion.span>
// //               ))}
// //             </div>
// //           </motion.div>
// //         </div>
// //         <motion.div variants={itemVariants} className="mt-16">
// //           <motion.h3
// //             variants={titleVariants}
// //             className="text-3xl font-bold text-center mb-8 gradient-text"
// //           >
// //             My Stats
// //           </motion.h3>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
// //             {stats.map((stat, index) => (
// //               <Tilt key={index} options={{ max: 15, scale: 1.03 }}>
// //                 <motion.div
// //                   variants={itemVariants}
// //                   className="glass-card rounded-xl p-6 text-center"
// //                   whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
// //                 >
// //                   <motion.div
// //                     className="mb-2 text-[var(--accent)]"
// //                     whileHover={{ scale: 1.2 }}
// //                   >
// //                     {stat.icon}
// //                   </motion.div>
// //                   <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
// //                     {stat.value}
// //                   </p>
// //                   <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
// //                     {stat.title}
// //                   </p>
// //                 </motion.div>
// //               </Tilt>
// //             ))}
// //           </div>
// //         </motion.div>
// //       </motion.div>
// //       <motion.div
// //         className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
// //         style={{ scaleX }}
// //       />
// //       <Footer />
// //     </div>
// //   );
// // };

// // export default About;



// // // import React from "react";
// // // import { motion } from "framer-motion";
// // // import { Users, Target, Award, TrendingUp } from "lucide-react";
// // // import Navbar from "../../components/Navbar";
// // // import Footer from "../../components/Footer";
// // // import bgs from "../../assets/bgmid.png";
// // // import me from "../../assets/me.png";


// // // const containerVariants = {
// // //   hidden: { opacity: 0 },
// // //   visible: {
// // //     opacity: 1,
// // //     transition: {
// // //       delayChildren: 0.3,
// // //       staggerChildren: 0.2,
// // //     },
// // //   },
// // // };

// // // const itemVariants = {
// // //   hidden: { y: 20, opacity: 0 },
// // //   visible: {
// // //     y: 0,
// // //     opacity: 1,
// // //   },
// // // };

// // // const stats = [
// // //   { icon: <Users size={24} />, title: "Clients Served", value: "30+" },
// // //   { icon: <Target size={24} />, title: "Projects Completed", value: "50+" },
// // //   { icon: <Award size={24} />, title: "Years of Experience", value: "5+" },
// // //   { icon: <TrendingUp size={24} />, title: "Annual Growth", value: "25%" },
// // // ];

// // // export default function About() {
// // //   return (
// // //     <div className="bg-gray-100 dark:bg-gray-900 py-20"
// // //     style={{
// // //       position: "relative",
// // //           backgroundImage: `url(${bgs})`,
// // //           backgroundSize: "cover",
// // //           backgroundPosition: "center",
// // //           width: "100vw",
// // //     }}>
// // //       <Navbar />
// // //       <motion.div
// // //         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
// // //         variants={containerVariants}
// // //         initial="hidden"
// // //         whileInView="visible"
// // //         viewport={{ once: true }}
// // //         style={{
// // //           backgroundColor: 'black',
// // //           width: '100vw',
// // //           marginTop: 50
// // //         }}
// // //       >
// // //         <motion.h2
// // //           variants={itemVariants}
// // //           className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-12"
// // //         style={{
// // //           fontSize: '20px',
// // //           color: 'grey'
// // //         }}
// // //         >
// // //           About Me
// // //         </motion.h2>
// // //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
// // //         style={{
// // //           backgroundImage: `url(${bgs})`,
// // //           backgroundSize: "cover",
// // //           backgroundPosition: "center",
// // //         }}>
// // //           <motion.div variants={itemVariants}
// // //           style={{
// // //             borderRadius: '10%',
// // //             backgroundColor: 'darkblue'
// // //           }}
// // //           >
// // //             <img
// // //               src={me}
// // //               alt="About Your Name"
// // //               className="rounded-lg shadow-lg"
// // //               width={600}
// // //               height={400}
// // //             />
// // //           </motion.div>
// // //           <motion.div variants={itemVariants} className="space-y-6">
// // //             <p className="text-lg text-gray-700 dark:text-gray-300"
// // //             style={{
// // //               color: 'grey'
// // //             }}>
// // //               With over 5 years of experience in web and mobile app development,
// // //               I specialize in creating intuitive and efficient digital
// // //               solutions. My passion lies in leveraging cutting-edge technologies
// // //               to solve complex problems and deliver exceptional user
// // //               experiences.
// // //             </p>
// // //             <p className="text-lg text-gray-700 dark:text-gray-300"
// // //             style={{
// // //               color: 'grey'
// // //             }}>
// // //               I'm proficient in a wide range of technologies including React,
// // //               Next.js, Node.js, and various mobile development frameworks. My
// // //               approach combines technical expertise with creative
// // //               problem-solving to build scalable and innovative applications.
// // //             </p>
// // //             <div className="flex flex-wrap gap-4">
// // //               <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200">
// // //                 React
// // //               </span>
// // //               <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200">
// // //                 Next.js
// // //               </span>
// // //               <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200">
// // //                 Node.js
// // //               </span>
// // //               <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200">
// // //                 Mobile Development
// // //               </span>
// // //             </div>
// // //           </motion.div>
// // //         </div>
// // //         <motion.div variants={itemVariants} className="mt-16">
// // //           <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8"
// // //           style={{
// // //             color: 'grey'
// // //           }}>
// // //             My Stats
// // //           </h3>
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// // //             {stats.map((stat, index) => (
// // //               <div key={index} className="text-center">
// // //                 <div className="text-blue-600 dark:text-blue-400 mb-2">
// // //                   {stat.icon}
// // //                 </div>
// // //                 <p className="text-xl font-bold text-gray-900 dark:text-white"
// // //                 style={{
// // //                   color: 'grey'
// // //                 }}>
// // //                   {stat.value}
// // //                 </p>
// // //                 <p className="text-sm text-gray-600 dark:text-gray-400">
// // //                   {stat.title}
// // //                 </p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </motion.div>
// // //       </motion.div>
// // //       <Footer />
// // //     </div>
// // //   );
// // // }
