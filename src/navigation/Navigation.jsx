import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import BrandLoader from '../components/BrandLoader';

const Home = lazy(() => import('../screens/mainstack/Home'));
const Services = lazy(() => import('../screens/mainstack/Services'));
const Projects = lazy(() => import('../screens/mainstack/Projects'));
const About = lazy(() => import('../screens/mainstack/About'));
const Contact = lazy(() => import('../screens/mainstack/Contact'));
const Blog = lazy(() => import('../screens/mainstack/Blog'));
const Admin = lazy(() => import('../screens/mainstack/Admin'));

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
      <Suspense
        fallback={<BrandLoader fullscreen label="Loading page" />}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Navigation;
