import React, { useContext, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { Users, Target, Award, TrendingUp, Quote } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ThemeContext } from '../../screens/context/ThemeContext';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useCallback } from 'react';
import me from '../../assets/me.jpg';
import team1 from '../../assets/me.jpg';
import team2 from '../../assets/me.jpg';

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
  { icon: <Users size={24} />, title: 'Clients Served', value: '30+' },
  { icon: <Target size={24} />, title: 'Projects Completed', value: '50+' },
  { icon: <Award size={24} />, title: 'Years of Experience', value: '5+' },
  { icon: <TrendingUp size={24} />, title: 'Annual Growth', value: '25%' },
];

const team = [
  { name: 'Champion Aden', role: 'Lead Developer', image: me },
  { name: 'Alex Doe', role: 'UI/UX Designer', image: team1 },
  { name: 'Jane Smith', role: 'Backend Engineer', image: team2 },
];

const testimonials = [
  {
    quote: 'Champion transformed our digital presence with a stunning app!',
    author: 'John Doe, CEO of TechCorp',
  },
  {
    quote: 'Their team delivered beyond expectations, highly recommended!',
    author: 'Sarah Lee, Founder of StartUpX',
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
        {particlesInit && (
          <Particles
            id="tsparticles"
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
          className="relative z-10 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold gradient-text mb-4"
            variants={itemVariants}
          >
            <AnimatedText text="About Us" />
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
            variants={itemVariants}
          >
            Crafting the future of digital innovation with passion and expertise.
          </motion.p>
        </motion.div>
      </motion.section>
      {/* Mission Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center gradient-text mb-12"
          variants={itemVariants}
        >
          Our Mission
        </motion.h2>
        <motion.p
          className="text-lg max-w-3xl mx-auto text-center"
          style={{ color: 'var(--text-secondary)' }}
          variants={itemVariants}
        >
          We strive to empower businesses with innovative digital solutions, blending cutting-edge technology with creative design to deliver unparalleled user experiences.
        </motion.p>
      </motion.section>
      {/* Team Section */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden"
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
          className="text-3xl md:text-4xl font-bold text-center gradient-text mb-12"
          variants={itemVariants}
        >
          Our Team
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
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
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center gradient-text mb-12"
          variants={itemVariants}
        >
          Our Achievements
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {stats.map((stat, index) => (
            <Tilt key={index} options={{ max: 15, scale: 1.03 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-6 text-center"
                whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
              >
                <motion.div
                  className="mb-2 text-[var(--accent)]"
                  whileHover={{ scale: 1.2 }}
                >
                  {stat.icon}
                </motion.div>
                <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden"
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
          className="text-3xl md:text-4xl font-bold text-center gradient-text mb-12"
          variants={itemVariants}
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {testimonials.map((testimonial, index) => (
            <Tilt key={index} options={{ max: 15, scale: 1.03 }}>
              <motion.div
                variants={itemVariants}
                className="glass-card rounded-xl p-8"
                whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
              >
                <Quote className="text-[var(--accent)] mb-4" size={32} />
                <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {testimonial.quote}
                </p>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                  {testimonial.author}
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




// import React, { useContext } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Tilt } from 'react-tilt';
// import { Users, Target, Award, TrendingUp } from 'lucide-react';
// import Navbar from '../../components/Navbar';
// import Footer from '../../components/Footer';
// import { ThemeContext } from '../../screens/context/ThemeContext';
// import bgs from '../../assets/bgmid.png';
// import me from '../../assets/me.png';

// // Animation Variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { delayChildren: 0.4, staggerChildren: 0.3 },
//   },
// };

// const itemVariants = {
//   hidden: { y: 50, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } },
// };

// const titleVariants = {
//   hidden: { opacity: 0, scale: 0.8 },
//   visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
// };

// const stats = [
//   { icon: <Users size={24} />, title: 'Clients Served', value: '30+' },
//   { icon: <Target size={24} />, title: 'Projects Completed', value: '50+' },
//   { icon: <Award size={24} />, title: 'Years of Experience', value: '5+' },
//   { icon: <TrendingUp size={24} />, title: 'Annual Growth', value: '25%' },
// ];

// const About = () => {
//   const { theme } = useContext(ThemeContext);
//   const { scrollYProgress } = useScroll();
//   const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

//   return (
//     <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
//       <style>
//         {`
//           :root {
//             --neon-blue: #3b82f6;
//             --neon-purple: #9333ea;
//           }
//           .dark {
//             --card-bg: rgba(17, 24, 39, 0.6);
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
//             backdrop-filter: blur(10px);
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
//       <motion.div
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
//           variants={titleVariants}
//           className="text-4xl md:text-5xl font-extrabold text-center mb-16 gradient-text"
//         >
//           About Me
//         </motion.h2>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
//           <Tilt options={{ max: 20, scale: 1.05 }}>
//             <motion.div variants={itemVariants} className="glass-card rounded-xl overflow-hidden">
//               <motion.img
//                 src={me}
//                 alt="About Champion Aden"
//                 className="w-full h-auto"
//                 whileHover={{ scale: 1.1 }}
//                 transition={{ duration: 0.3 }}
//               />
//             </motion.div>
//           </Tilt>
//           <motion.div variants={itemVariants} className="glass-card rounded-xl p-8">
//             <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
//               With over 5 years in web and mobile app development, I craft intuitive digital solutions using cutting-edge technologies to deliver exceptional user experiences.
//             </p>
//             <p className="text-lg mb-4" style={{ color: 'var(--text-secondary)' }}>
//               Proficient in React, Next.js, Node.js, and mobile frameworks, I combine technical expertise with creative problem-solving for scalable, innovative applications.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               {['React', 'Next.js', 'Node.js', 'Mobile Development'].map((tech, index) => (
//                 <motion.span
//                   key={index}
//                   className="px-4 py-2 rounded-full glow"
//                   style={{ background: 'var(--card-bg)', color: 'var(--text-primary)' }}
//                   whileHover={{ scale: 1.1, background: 'var(--accent)', color: '#fff' }}
//                 >
//                   {tech}
//                 </motion.span>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//         <motion.div variants={itemVariants} className="mt-16">
//           <motion.h3
//             variants={titleVariants}
//             className="text-3xl font-bold text-center mb-8 gradient-text"
//           >
//             My Stats
//           </motion.h3>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
//             {stats.map((stat, index) => (
//               <Tilt key={index} options={{ max: 15, scale: 1.03 }}>
//                 <motion.div
//                   variants={itemVariants}
//                   className="glass-card rounded-xl p-6 text-center"
//                   whileHover={{ y: -10, boxShadow: '0 12px 40px rgba(59, 130, 246, 0.3)' }}
//                 >
//                   <motion.div
//                     className="mb-2 text-[var(--accent)]"
//                     whileHover={{ scale: 1.2 }}
//                   >
//                     {stat.icon}
//                   </motion.div>
//                   <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
//                     {stat.value}
//                   </p>
//                   <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
//                     {stat.title}
//                   </p>
//                 </motion.div>
//               </Tilt>
//             ))}
//           </div>
//         </motion.div>
//       </motion.div>
//       <motion.div
//         className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
//         style={{ scaleX }}
//       />
//       <Footer />
//     </div>
//   );
// };

// export default About;



// // import React from "react";
// // import { motion } from "framer-motion";
// // import { Users, Target, Award, TrendingUp } from "lucide-react";
// // import Navbar from "../../components/Navbar";
// // import Footer from "../../components/Footer";
// // import bgs from "../../assets/bgmid.png";
// // import me from "../../assets/me.png";


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
// //   hidden: { y: 20, opacity: 0 },
// //   visible: {
// //     y: 0,
// //     opacity: 1,
// //   },
// // };

// // const stats = [
// //   { icon: <Users size={24} />, title: "Clients Served", value: "30+" },
// //   { icon: <Target size={24} />, title: "Projects Completed", value: "50+" },
// //   { icon: <Award size={24} />, title: "Years of Experience", value: "5+" },
// //   { icon: <TrendingUp size={24} />, title: "Annual Growth", value: "25%" },
// // ];

// // export default function About() {
// //   return (
// //     <div className="bg-gray-100 dark:bg-gray-900 py-20"
// //     style={{
// //       position: "relative",
// //           backgroundImage: `url(${bgs})`,
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //           width: "100vw",
// //     }}>
// //       <Navbar />
// //       <motion.div
// //         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
// //         variants={containerVariants}
// //         initial="hidden"
// //         whileInView="visible"
// //         viewport={{ once: true }}
// //         style={{
// //           backgroundColor: 'black',
// //           width: '100vw',
// //           marginTop: 50
// //         }}
// //       >
// //         <motion.h2
// //           variants={itemVariants}
// //           className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-12"
// //         style={{
// //           fontSize: '20px',
// //           color: 'grey'
// //         }}
// //         >
// //           About Me
// //         </motion.h2>
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
// //         style={{
// //           backgroundImage: `url(${bgs})`,
// //           backgroundSize: "cover",
// //           backgroundPosition: "center",
// //         }}>
// //           <motion.div variants={itemVariants}
// //           style={{
// //             borderRadius: '10%',
// //             backgroundColor: 'darkblue'
// //           }}
// //           >
// //             <img
// //               src={me}
// //               alt="About Your Name"
// //               className="rounded-lg shadow-lg"
// //               width={600}
// //               height={400}
// //             />
// //           </motion.div>
// //           <motion.div variants={itemVariants} className="space-y-6">
// //             <p className="text-lg text-gray-700 dark:text-gray-300"
// //             style={{
// //               color: 'grey'
// //             }}>
// //               With over 5 years of experience in web and mobile app development,
// //               I specialize in creating intuitive and efficient digital
// //               solutions. My passion lies in leveraging cutting-edge technologies
// //               to solve complex problems and deliver exceptional user
// //               experiences.
// //             </p>
// //             <p className="text-lg text-gray-700 dark:text-gray-300"
// //             style={{
// //               color: 'grey'
// //             }}>
// //               I'm proficient in a wide range of technologies including React,
// //               Next.js, Node.js, and various mobile development frameworks. My
// //               approach combines technical expertise with creative
// //               problem-solving to build scalable and innovative applications.
// //             </p>
// //             <div className="flex flex-wrap gap-4">
// //               <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200">
// //                 React
// //               </span>
// //               <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200">
// //                 Next.js
// //               </span>
// //               <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200">
// //                 Node.js
// //               </span>
// //               <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200">
// //                 Mobile Development
// //               </span>
// //             </div>
// //           </motion.div>
// //         </div>
// //         <motion.div variants={itemVariants} className="mt-16">
// //           <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8"
// //           style={{
// //             color: 'grey'
// //           }}>
// //             My Stats
// //           </h3>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
// //             {stats.map((stat, index) => (
// //               <div key={index} className="text-center">
// //                 <div className="text-blue-600 dark:text-blue-400 mb-2">
// //                   {stat.icon}
// //                 </div>
// //                 <p className="text-xl font-bold text-gray-900 dark:text-white"
// //                 style={{
// //                   color: 'grey'
// //                 }}>
// //                   {stat.value}
// //                 </p>
// //                 <p className="text-sm text-gray-600 dark:text-gray-400">
// //                   {stat.title}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </motion.div>
// //       </motion.div>
// //       <Footer />
// //     </div>
// //   );
// // }
