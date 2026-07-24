import aboveLifestyle from '../assets/projects/above.png';
import arcticObgyn from '../assets/projects/arcticobgyn.png';
import auntyB from '../assets/projects/auntyB.png';
import escrowise from '../assets/projects/escrowise-logo.png';
import feeda from '../assets/projects/feeda.png';
import foodhub247 from '../assets/projects/foodhub247.png';
import kokoletLuxury from '../assets/projects/kokolet.png';
import linx from '../assets/projects/linx.png';
import ndozi from '../assets/projects/Ndozi.png';
import sangaPay from '../assets/projects/sanga pay.png';
import tercescrow from '../assets/projects/Tercescrow-Logo-9.png';
import giftingService from '../assets/projects/The-Gifting-Service.png';
// import verifynin from '../assets/projects/verifynin.png';

export const projects = [
  {
    title: 'Feeda.us',
    description:
      'A real-time social media platform built for community engagement, featuring live feeds, stories, messaging, notifications, secure JWT authentication, and a scalable MERN foundation optimized for performance.',
    image: feeda,
    link: 'https://www.feeda.us',
  },
  {
    title: 'Escrowise.io',
    description:
      'A modern escrow marketplace engineered with Next.js, TypeScript, Prisma, and PostgreSQL to deliver protected buyer-seller transactions, automated dispute handling, and a high-confidence payment experience.',
    image: escrowise,
    link: 'https://www.escrowise.io',
  },
  {
    title: 'Tercescrow',
    description:
      'A secure gift-card trading platform delivered across web and mobile, built with React Native, Node.js, Express, MongoDB, and fast REST APIs to support trusted transactions and real-time activity.',
    image: tercescrow,
    link: 'https://tercescrow.com/',
    linkLabel: 'View Web App',
    secondaryLink: 'https://play.google.com/store/apps/details?id=com.tercescrow.app',
    secondaryLabel: 'Open Play Store',
  },
  {
    title: 'Above Lifestyle',
    description:
      'A premium leisure destination platform for booking, reservations, dining discovery, and nightlife experiences, built with React and MERN services for responsive multi-device engagement.',
    image: aboveLifestyle,
    link: 'https://abovelifestyle.com/',
  },
  {
    title: 'Linx',
    description:
      'A conversion-focused marketing platform developed to strengthen brand visibility through fast React delivery, SEO foundations, lead capture flows, analytics, and polished omni-channel user journeys.',
    image: linx,
    link: 'https://linxdash.com',
  },
  {
    title: 'Sanga Pay',
    description:
      'A streamlined digital payments experience crafted to emphasize clarity, trust, and transaction speed across mobile and desktop, with a polished interface designed for confident payment flows.',
    image: sangaPay,
    imageShellClassName: 'project-image-shell--brand',
    link: '',
  },
  {
    title: 'The Gifting Service',
    description:
      'A personalized gifting ecommerce platform built with React, Next.js, and secure backend services to support custom purchase flows, polished SEO, and a seamless checkout experience.',
    image: giftingService,
    link: 'https://thegiftingservice.com/',
  },
  {
    title: 'Arctic OBGYN',
    description:
      'A patient-facing healthcare portal with secure appointment scheduling, encrypted data handling, JWT authentication, and HIPAA-aligned safeguards for a dependable clinical web experience.',
    image: arcticObgyn,
    link: 'https://arcticobgyn.com/',
  },
  {
    title: 'Kokolet Luxury',
    description:
      'A sneaker and fashion ecommerce experience engineered with responsive TypeScript and React interfaces, scalable MERN services, and optimized shopping flows for premium retail discovery.',
    image: kokoletLuxury,
    link: 'https://kokoletluxury.com/',
  },
  {
    title: 'Ndozi',
    description:
      'A business platform designed to strengthen brand credibility, service discovery, and customer conversion through clear information architecture and dependable web infrastructure.',
    image: ndozi,
    link: 'https://ndozi.com/',
  },
  // {
  //   title: 'VerifyNIN.ng',
  //   description:
  //     'A secure national identity verification platform for real-time NIN validation across businesses and institutions. Built with HTML, CSS, JavaScript, and PHP with MySQL, including client and admin dashboards, secure authentication, fraud prevention, and mobile-responsive verification flows.',
  //   image: verifynin,
  //   link: 'https://verifynin.ng',
  //   timeline: 'February 2026 – March 2026',
  // },
  {
    title: 'FoodHub247.com',
    description:
      'A full e-commerce marketplace for dried proteins and food ingredients, engineered with HTML, CSS, JavaScript, and PHP. Delivers catalog browsing, cart and checkout, Paystack and Flutterwave payments, order tracking, affiliate features, and an admin panel for product and order management.',
    image: foodhub247,
    link: 'https://foodhub247.com',
    timeline: 'May 15, 2026 – May 26, 2026',
  },
  {
    title: 'AuntyBCompere.com',
    description:
      'A professional service website for AuntyBCompere, a premium Event MC/Compere specializing in corporate events, birthdays, traditional weddings (Alaga Iduro/Ijoko), and luxury Eru-Iyawo packaging. Built from scratch with HTML, CSS, JavaScript, and PHP, featuring elegant UI/UX, client testimonials, contact and inquiry flows, dynamic content management, secure form handling, and mobile-first performance.',
    image: auntyB,
    link: 'https://auntybcompere.com/',
    timeline: 'September 2025 – January 2026',
  },
];

export const featuredProjects = projects.slice(0, 3);
export const portfolioProjects = projects.slice(3, 6);
