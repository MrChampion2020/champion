import aboveLifestyle from '../assets/projects/above.png';
import aetrustPay from '../assets/projects/aetrust pay.svg';
import arcticObgyn from '../assets/projects/arcticobgyn.png';
import escrowise from '../assets/projects/escrowise-logo.png';
import feeda from '../assets/projects/feeda.png';
import kokoletLuxury from '../assets/projects/kokolet.png';
import linx from '../assets/projects/linx.png';
import ndozi from '../assets/projects/Ndozi.png';
import quiickchat from '../assets/projects/quiickchat.png';
import sangaPay from '../assets/projects/sanga pay.png';
import tercescrow from '../assets/projects/Tercescrow-Logo-9.png';
import giftingService from '../assets/projects/The-Gifting-Service.png';

export const projects = [
  {
    title: 'Feeda.us',
    description:
      'A real-time social media platform built for community engagement, featuring live feeds, stories, messaging, notifications, secure JWT authentication, and a scalable MERN foundation optimized for performance.',
    image: feeda,
    link: 'https://www.feeda.us',
  },
  {
    title: 'Aetrust Pay',
    description:
      'A secure fintech payment and trust platform designed to protect transactions end to end, pairing polished React interfaces with resilient Node.js services and security-first payment workflows.',
    image: aetrustPay,
    link: 'https://aetrustpay.com',
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
    title: 'Quiickchat',
    description:
      'A real-time messaging application built with React, Node.js, and WebSockets to deliver secure chat, presence awareness, and responsive communication at scale.',
    image: quiickchat,
    link: 'https://quiickchat.com',
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
];

export const featuredProjects = projects.slice(0, 3);
export const portfolioProjects = projects.slice(3, 6);
