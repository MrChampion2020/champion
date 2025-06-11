import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from '../screens/mainstack/Home'; // Assuming Home.jsx exists
import Services from '../screens/mainstack/Services'; // Placeholder or actual component
import Projects from '../screens/mainstack/Projects'; // Placeholder or actual component
import About from '../screens/mainstack/About'; // Placeholder or actual component
import Contact from '../screens/mainstack/Contact'; // Placeholder or actual component

// ScrollToTop Component to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const Navigation = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;


// import React, { useEffect } from "react";
// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import {
//   Services,
//   Home,
//   About,
//   Projects,
//   Contact,
// } from "../screens/index";

// // ScrollToTop Component to reset scroll position on route change
// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [pathname]);

//   return null;
// };

// const Navigation = () => {
//   return (
//     <BrowserRouter>
//       <ScrollToTop />
//       <Routes>
//         <Route path="/" element={<Home />} /> {/* Home Route */}
//         <Route path="/contact" element={<Contact />} /> {/* Contact Route */}
//         <Route path="/projects" element={<Projects />} /> {/* Projects Route */}
//         <Route path="/about" element={<About />} /> {/* About Route */}
//         <Route path="/services" element={<Services />} /> {/* Services Route */}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default Navigation;





// // import React from "react";
// // import { BrowserRouter, Route, Routes } from "react-router-dom";
// // import {
// //   Services,
// //   Home, 
// //   About, 
// //   Projects, 
// //   Contact,
// // } from "../screens/index";

// // const Navigation = () => {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Home />} />  {/* Home Route */}
// //         <Route path="contact" element={<Contact />} />  {/* Contact Route */}
// //         <Route path="projects" element={<Projects />} /> {/* Projects Route */}
// //         <Route path="about" element={<About />} />  {/* About Route */}
// //         <Route path="services" element={<Services />} />  {/* Services Route */}
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // };

// // export default Navigation;
