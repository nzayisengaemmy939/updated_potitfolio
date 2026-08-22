import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  Code, 
  Github, 
  Linkedin,
  Mail, 
  Download, 
  ExternalLink, 
  Award, 
  Rocket, 
  Lightbulb, 
  Sparkles, 
  Monitor, 
  Server, 
  Database,
  TrendingUp, 
  Calendar, 
  FileText, 
  Phone, 
  X, 
  Check, 
  GraduationCap,
  Briefcase,
  Terminal,
  Palette,
  MapPin,
  Send,
  Building,
  CheckCircle2,
  Coffee,
  Heart,
  Copy,
  Users,
  MessageSquareQuote
} from 'lucide-react';
import pot_image from '../assets/pot_image.jpg';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
  description: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  highlight: string;
}

interface Project {
  title: string;
  client?: string;
  subtitle: string;
  description: string;
  story: string;
  tech: string[];
  demo?: string;
  featured?: boolean;
  category: string;
}

interface Achievement {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
}

interface Certification {
  title: string;
  issuer: string;
  icon: React.ReactNode;
  badge: string;
}

const LINKEDIN_URL = "https://www.linkedin.com/in/nzayisenga-emmanuel-bb6478404/";
const GITHUB_URL = "https://github.com/nzayisengaemmy939";
const EMAIL_ADDRESS = "emmykeen2001@gmail.com";
const PHONE_NUMBER = "+250 728 012 395";
const WHATSAPP_URL = "https://wa.me/250728012395";

const Portfolio: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSkillTab, setSelectedSkillTab] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    duration: '30'
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [contactSent, setContactSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Refs for smooth scrolling
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Available time slots (9 AM to 6 PM)
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  // Generate next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your scheduling request was received. I will confirm our call via email within 24 hours.');
    setShowScheduleModal(false);
    setScheduleForm({
      name: '',
      email: '',
      phone: '',
      purpose: '',
      duration: '30'
    });
    setSelectedDate(null);
    setSelectedTime('');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const scrollToSection = (sectionName: string) => {
    setActiveSection(sectionName);
    const mapping: Record<string, React.RefObject<HTMLDivElement | null>> = {
      home: homeRef,
      about: aboutRef,
      skills: skillsRef,
      projects: projectsRef,
      journey: journeyRef,
      education: educationRef,
      contact: contactRef
    };

    mapping[sectionName]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const greetings = [
    "React (Vite) & Node.js Specialist",
    "Clean Architecture & Scalable Systems",
    "Building intuitive, high-performance apps",
    "Passionate Problem Solver & CS Graduate"
  ];

  useEffect(() => {
    setIsVisible(true);
    const greeting = greetings[currentGreeting];
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < greeting.length) {
        setTypedText(greeting.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentGreeting((prev) => (prev + 1) % greetings.length);
          setTypedText('');
        }, 2200);
      }
    }, 70);

    return () => clearInterval(typingInterval);
  }, [currentGreeting]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      setShowBackToTop(window.scrollY > 400);

      const sections = [
        { ref: homeRef, name: 'home' },
        { ref: aboutRef, name: 'about' },
        { ref: skillsRef, name: 'skills' },
        { ref: projectsRef, name: 'projects' },
        { ref: journeyRef, name: 'journey' },
        { ref: educationRef, name: 'education' },
        { ref: contactRef, name: 'contact' }
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const achievements: Achievement[] = [
    {
      icon: <Award className="w-6 h-6 text-amber-500" />,
      title: "1st Place Hackathon Winner",
      description: "Hanga Pitch Hackathon 2024 (RISA & Rwanda ICT Chamber) for AI-powered community innovation",
      metric: "🏆 1st"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#00aaa9]" />,
      title: "Hands-on Experience",
      description: "4+ years building full-stack platforms across frontend, backend, and APIs",
      metric: "4+ Yrs"
    },
    {
      icon: <Rocket className="w-6 h-6 text-teal-600" />,
      title: "Production Products",
      description: "Shipped digital platforms for enterprise, telecom, and hospitality leaders",
      metric: "5+ Apps"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      title: "Client & User Trust",
      description: "Dedicated to smooth user experiences, clean architecture, and reliable performance",
      metric: "100%"
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-indigo-600" />,
      title: "Computer Science",
      description: "B.Sc. in Computer Science graduate from the University of Rwanda",
      metric: "B.Sc."
    }
  ];

  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Craft",
      icon: <Monitor className="w-5 h-5 text-[#00aaa9]" />,
      description: "Creating responsive, accessible, and delightful interactive web interfaces",
      skills: [
        { name: "React.js", level: 95 },
        { name: "Vite", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript (ES6+)", level: 92 },
        { name: "Tailwind CSS", level: 95 },
        { name: "HTML5 / CSS3", level: 95 },
        { name: "Bootstrap", level: 88 }
      ]
    },
    {
      title: "Backend & Systems",
      icon: <Server className="w-5 h-5 text-[#00aaa9]" />,
      description: "Designing reliable REST APIs, clean architecture, and server performance",
      skills: [
        { name: "Node.js", level: 92 },
        { name: "Express.js", level: 90 },
        { name: "RESTful API Architecture", level: 92 },
        { name: "Authentication & Security", level: 88 },
        { name: "System Optimization", level: 90 }
      ]
    },
    {
      title: "Databases & Storage",
      icon: <Database className="w-5 h-5 text-[#00aaa9]" />,
      description: "Structuring resilient relational and NoSQL data foundations",
      skills: [
        { name: "PostgreSQL", level: 90 },
        { name: "MongoDB", level: 88 },
        { name: "SQLite", level: 85 },
        { name: "Firebase", level: 85 }
      ]
    },
    {
      title: "DevOps & Infrastructure",
      icon: <Terminal className="w-5 h-5 text-[#00aaa9]" />,
      description: "Containerization, Linux administration, and modern deployment flows",
      skills: [
        { name: "Docker", level: 85 },
        { name: "Container Orchestration", level: 82 },
        { name: "Linux Server Admin", level: 88 },
        { name: "Git & GitHub Workflows", level: 92 },
        { name: "CI/CD Pipelines", level: 82 }
      ]
    },
    {
      title: "UI/UX & Design",
      icon: <Palette className="w-5 h-5 text-[#00aaa9]" />,
      description: "User research, Figma prototypes, and human-centred interface design",
      skills: [
        { name: "UX/UI Design", level: 90 },
        { name: "Figma Prototyping", level: 88 },
        { name: "User-Centred Design", level: 92 },
        { name: "Responsive Layouts", level: 94 }
      ]
    }
  ];

  const experiences: Experience[] = [
    {
      company: 'UrutiHub',
      role: 'Software Developer',
      period: '2024 – Present',
      location: 'Kigali, Rwanda',
      description: [
        'Developed full-stack platforms using React (Vite), Node.js, and PostgreSQL, delivering scalable digital products for clients across multiple industries.',
        'Built and maintained production applications end-to-end, from database design and API development to responsive, user-centred frontend interfaces.',
        'Collaborated with cross-functional teams to ship features, optimise performance, and ensure clean, maintainable architecture.'
      ],
      highlight: 'Production full-stack engineering across fintech, telecom & enterprise applications'
    }
  ];

  const projects: Project[] = [
    {
      title: "Skol Football",
      client: "Skol Brewery Rwanda",
      subtitle: "Football Prediction & Fan Experience Platform",
      description: "Built and deployed an interactive platform that lets fans predict match outcomes and win prizes, while also offering curated travel packages so supporters can fly to the home of champions and experience live football firsthand. Features include a real-time prediction engine, leaderboard, automated winner selection, and a seamless trip-booking flow, all wrapped in a mobile-first responsive UI.",
      story: "Boosted fan engagement with transparent live algorithms, leaderboard tracking, and automated draw selections.",
      tech: ["React.js", "Vite", "Node.js", "PostgreSQL", "Tailwind CSS"],
      demo: "https://skolfootball.rw",
      featured: true,
      category: "Fan Experience Platform"
    },
    {
      title: "Twagiye Morocco",
      client: "Skol Brewery Rwanda",
      subtitle: "AFCON Winner Selection Platform",
      description: "Created a draw platform for Skol Brewery Rwanda to randomly select winners for a trip to watch the Africa Cup of Nations, implementing a fair and transparent algorithm for promotional campaign engagement.",
      story: "Engineered an auditable draw mechanism ensuring fair chance winner selection for thousands of participants.",
      tech: ["React.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Algorithm Design"],
      featured: true,
      category: "Draw & Selection Platform"
    },
    {
      title: "AM Promo",
      client: "Airtel Rwanda",
      subtitle: "Promotional Winner Selection Platform",
      description: "Developed a digital platform for Airtel Rwanda to manage promotional campaigns and randomly select winners, ensuring a secure and transparent selection process.",
      story: "Delivered a reliable promotional engine with data integrity and security for telecom subscriber campaigns.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      featured: true,
      category: "Telecom Campaign System"
    },
    {
      title: "Ikoro House",
      client: "Ikoro House",
      subtitle: "Hospitality Management Platform",
      description: "Built a web platform for Ikoro House to manage hotel services, bookings, and online presence with a responsive UI across devices.",
      story: "Empowered guests with seamless booking inquiries and service discovery across mobile and desktop devices.",
      tech: ["React.js", "Node.js", "Tailwind CSS", "Responsive UX"],
      demo: "https://ikorohouse.com",
      featured: false,
      category: "Hospitality & Booking"
    },
    {
      title: "Urutiq Accounting Platform",
      subtitle: "Business Accounting Solution",
      description: "Contributed to the development of Urutiq, a business accounting and financial management solution used by Rwandan companies including Flames Holding.",
      story: "Streamlined business accounting workflows and invoice management for Rwandan enterprises.",
      tech: ["React.js", "Vite", "Node.js", "PostgreSQL", "Tailwind CSS"],
      demo: "https://urutiq.com",
      featured: false,
      category: "FinTech & Accounting"
    }
  ];

  const certifications: Certification[] = [
    {
      title: "JavaScript Algorithms and Data Structures",
      issuer: "FreeCodeCamp",
      icon: <Code className="w-5 h-5 text-[#00aaa9]" />,
      badge: "Verified"
    },
    {
      title: "Responsive Web Design",
      issuer: "FreeCodeCamp",
      icon: <Monitor className="w-5 h-5 text-teal-600" />,
      badge: "Verified"
    },
    {
      title: "React.js Development Training",
      issuer: "Energy Power Tech Solution Ltd.",
      icon: <Rocket className="w-5 h-5 text-amber-500" />,
      badge: "Training"
    }
  ];

  const humanValues = [
    {
      icon: <Coffee className="w-5 h-5 text-amber-600" />,
      title: "Curiosity & Craftsmanship",
      description: "I care deeply about how things work under the hood. Clean architecture, expressive code, and thoughtful design make all the difference."
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: "People-Centric Engineering",
      description: "Behind every line of code is a person trying to accomplish a goal. I build software that is intuitive, respectful of time, and accessible."
    },
    {
      icon: <Users className="w-5 h-5 text-blue-500" />,
      title: "Collaborative & Empathetic",
      description: "Great products emerge from honest communication, shared knowledge, active listening, and supporting the entire team."
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-emerald-500" />,
      title: "Real-World Impact",
      description: "From winning the Hanga Pitch Hackathon to building platforms for enterprises, I am driven by solving real community & business challenges."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-amber-50/20 text-gray-800 selection:bg-[#00aaa9]/20 selection:text-[#008f8e] font-sans antialiased">
      
      {/* Sleek Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/90 border-b border-gray-200/70 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo / Brand */}
            <div 
              onClick={() => scrollToSection('home')} 
              className="cursor-pointer flex items-center space-x-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00aaa9] to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                NE
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 group-hover:text-[#00aaa9] transition-colors leading-tight">
                  NZAYISENGA Emmanuel
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">
                  Full-Stack Engineer
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links - Compact & Clean */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About', id: 'about' },
                { name: 'Skills', id: 'skills' },
                { name: 'Projects', id: 'projects' },
                { name: 'Experience', id: 'journey' },
                { name: 'Education', id: 'education' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeSection === item.id 
                      ? 'text-[#00aaa9] bg-[#00aaa9]/10 font-bold' 
                      : 'text-gray-600 hover:text-[#00aaa9] hover:bg-gray-100/60'
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop Quick Actions - Elegantly Proportioned */}
            <div className="hidden md:flex items-center space-x-2.5">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg text-gray-500 hover:text-[#0077B5] hover:bg-blue-50 border border-gray-200/80 flex items-center justify-center transition-all"
                title="LinkedIn Profile"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="/Emmanuel_Nzayisenga_CV.pdf"
                download="Emmanuel_Nzayisenga_CV.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-[#00aaa9] text-[#00aaa9] hover:bg-[#00aaa9] hover:text-white transition-all shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                CV Resume
              </a>

              <button
                onClick={() => setShowScheduleModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#00aaa9] hover:bg-[#009291] text-white shadow-sm transition-all hover:shadow"
              >
                <Calendar className="w-3.5 h-3.5" />
                Let's Talk
              </button>
            </div>
            
            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-1.5 rounded-lg text-gray-600 hover:text-[#00aaa9] hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 inset-x-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/80 z-40 shadow-lg py-3 px-5 space-y-1.5 animate-in slide-in-from-top duration-200">
          {[
            { name: 'Home', id: 'home' },
            { name: 'About & Values', id: 'about' },
            { name: 'Skills & Stack', id: 'skills' },
            { name: 'Projects', id: 'projects' },
            { name: 'Experience', id: 'journey' },
            { name: 'Education & Certs', id: 'education' },
            { name: 'Contact', id: 'contact' }
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full text-left px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-[#00aaa9]/15 text-[#00aaa9] font-bold'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => {
                scrollToSection(item.id);
                setMobileMenuOpen(false);
              }}
            >
              {item.name}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2 border-t border-gray-100">
            <div className="flex gap-2">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg border border-blue-200 text-[#0077B5] text-xs font-semibold flex items-center justify-center gap-1.5 bg-blue-50/50"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
              <a
                href="/Emmanuel_Nzayisenga_CV.pdf"
                download="Emmanuel_Nzayisenga_CV.pdf"
                className="flex-1 py-2 rounded-lg border border-[#00aaa9] text-[#00aaa9] text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> CV (PDF)
              </a>
            </div>
            <button
              onClick={() => {
                setShowScheduleModal(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 rounded-lg bg-[#00aaa9] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" /> Schedule Call
            </button>
          </div>
        </div>
      )}

      {/* Hero Section - Clean, Harmonious Layout */}
      <section ref={homeRef} className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Hero Left Content */}
            <div className={`lg:col-span-7 space-y-5 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Open for Opportunities
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 border border-gray-200 text-gray-600 text-xs font-medium">
                  <MapPin className="w-3 h-3 text-[#00aaa9]" /> Kigali, Rwanda
                </span>
              </div>

              {/* Title & Introduction */}
              <div className="space-y-1.5">
                <p className="text-sm sm:text-base font-semibold text-gray-600">
                  Hey there, I'm <span className="text-[#00aaa9] font-bold">Emmanuel Nzayisenga</span> 👋
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  Full-Stack Software <span className="text-[#00aaa9]">Engineer</span>
                </h1>
                <div className="h-6 flex items-center text-sm sm:text-base font-medium text-teal-700">
                  <span>{typedText}</span>
                  <span className="w-0.5 h-4 bg-[#00aaa9] ml-1 animate-pulse"></span>
                </div>
              </div>

              {/* Bio Summary */}
              <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
                Full-Stack Software Engineer with <strong className="text-gray-900 font-semibold">4+ years of hands-on experience</strong> across 
                frontend and backend development. Specializes in building scalable, production applications using 
                <strong className="text-gray-900 font-semibold"> React (Vite)</strong> and <strong className="text-gray-900 font-semibold">Node.js</strong>, 
                ensuring high performance, clean architecture, and user-centred design.
              </p>

              {/* Impact Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3.5 border border-teal-100 shadow-2xs flex items-start gap-3 max-w-xl">
                <div className="p-2 rounded-lg bg-teal-50 text-[#00aaa9] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-gray-900 block">Proven Track Record</span>
                  <p className="text-gray-600 text-xs mt-0.5">
                    <strong>1st Place Winner</strong> at Hanga Pitch Hackathon 2024 • Delivered production platforms for <strong>Skol Brewery</strong>, <strong>Airtel</strong>, and local enterprises.
                  </p>
                </div>
              </div>

              {/* Action Buttons - Perfectly Scaled */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="group bg-[#00aaa9] hover:bg-[#009291] text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 transform hover:scale-[1.02] shadow-sm flex items-center gap-1.5"
                >
                  <Rocket className="w-4 h-4" />
                  View Featured Work
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a 
                  href="/Emmanuel_Nzayisenga_CV.pdf" 
                  download="Emmanuel_Nzayisenga_CV.pdf" 
                  className="border border-[#00aaa9] text-[#00aaa9] hover:bg-[#00aaa9] hover:text-white px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 inline-flex items-center gap-1.5 bg-white shadow-2xs"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Email Copied! ✨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              {/* Social Channels */}
              <div className="flex items-center space-x-2.5 pt-1">
                <span className="text-[11px] uppercase tracking-wider text-gray-400 font-bold">Connect:</span>
                
                <a 
                  href={LINKEDIN_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#0077B5] hover:border-[#0077B5] transition-all"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>

                <a 
                  href={GITHUB_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-all"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a 
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#00aaa9] hover:border-[#00aaa9] transition-all"
                  aria-label="Email"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>

                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:border-emerald-600 transition-all"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Hero Right Profile Card */}
            <div className={`lg:col-span-5 flex justify-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative w-full max-w-sm">
                
                {/* Profile Card Container */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-teal-100 shadow-xl space-y-4">
                  
                  {/* Photo container */}
                  <div className="relative w-full h-64 sm:h-72 rounded-xl overflow-hidden shadow-inner group">
                    <img
                      src={pot_image}
                      alt="Emmanuel Nzayisenga"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-transparent to-transparent flex items-end p-4">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#00aaa9] text-white text-[11px] font-semibold tracking-wide inline-block mb-1 shadow-xs">
                          Software Developer @ UrutiHub
                        </span>
                        <h3 className="text-lg font-bold text-white leading-tight">Nzayisenga Emmanuel</h3>
                        <p className="text-teal-200 text-xs">University of Rwanda CS Graduate</p>
                      </div>
                    </div>
                  </div>

                  {/* LinkedIn Connect Pill */}
                  <a 
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 hover:bg-blue-100/70 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#0077B5] text-white flex items-center justify-center shadow-2xs">
                        <Linkedin className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-gray-900 block group-hover:text-[#0077B5] transition-colors leading-tight">
                          Connect on LinkedIn
                        </span>
                        <span className="text-[10px] text-gray-500">nzayisenga-emmanuel</span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0077B5] transition-colors" />
                  </a>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-50 rounded-xl p-2 border border-gray-200/70">
                      <span className="block text-base font-black text-[#00aaa9]">4+</span>
                      <span className="text-[10px] text-gray-500 font-medium">Years Exp</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2 border border-gray-200/70">
                      <span className="block text-base font-black text-[#00aaa9]">5+</span>
                      <span className="text-[10px] text-gray-500 font-medium">Production</span>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-2 border border-gray-200/70">
                      <span className="block text-base font-black text-amber-500">1st 🏆</span>
                      <span className="text-[10px] text-gray-500 font-medium">Hackathon</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About & Achievements Section */}
      <section ref={aboutRef} className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-[#00aaa9] font-bold text-xs tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Beyond The Code
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Values, Milestones & Story 🏆
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
              Solving real-world problems with empathy, clean code, and resilient architecture
            </p>
          </div>

          {/* Achievement Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-5 border border-gray-200/80 hover:border-[#00aaa9]/60 transition-all hover:shadow-md text-center"
              >
                <div className="mb-2 flex justify-center">
                  {achievement.icon}
                </div>
                <div className="text-2xl font-black text-gray-900 mb-0.5">
                  {achievement.metric}
                </div>
                <h3 className="text-xs font-bold text-gray-800 mb-1">{achievement.title}</h3>
                <p className="text-gray-500 text-[11px] leading-normal">{achievement.description}</p>
              </div>
            ))}
          </div>

          {/* Engineering Philosophy Quote & Principles */}
          <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-teal-100 shadow-sm space-y-6">
            <div className="max-w-2xl mx-auto text-center">
              <MessageSquareQuote className="w-6 h-6 text-[#00aaa9] mx-auto mb-2 opacity-80" />
              <blockquote className="text-sm sm:text-base font-medium text-gray-800 italic leading-relaxed">
                "Writing software is an exercise in empathy. When we build clean architecture and intuitive interfaces, we respect both the users and the engineers who maintain the system."
              </blockquote>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
              {humanValues.map((trait, index) => (
                <div key={index} className="bg-slate-50/90 rounded-xl p-4 border border-gray-200/60 hover:bg-white hover:border-[#00aaa9]/40 transition-all">
                  <div className="mb-2">{trait.icon}</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{trait.title}</h4>
                  <p className="text-gray-600 text-xs leading-relaxed">{trait.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Skills & Tech Stack Section */}
      <section ref={skillsRef} className="py-16 bg-white/60 backdrop-blur-sm relative z-10 border-y border-teal-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-[#00aaa9] font-bold text-xs tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Technical Arsenal
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Skills & Core Technologies
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
              Categorized competencies across frontend, backend, databases, DevOps, and UI/UX design
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {skillCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSkillTab(idx)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedSkillTab === idx
                    ? 'bg-[#00aaa9] text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#00aaa9]/50'
                }`}
              >
                {cat.icon}
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Active Category Display */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-teal-100 shadow-md">
            <div className="flex items-center space-x-3 mb-5 pb-4 border-b border-gray-100">
              <div className="p-2 bg-teal-50 rounded-xl text-[#00aaa9]">
                {skillCategories[selectedSkillTab].icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {skillCategories[selectedSkillTab].title}
                </h3>
                <p className="text-gray-500 text-xs">
                  {skillCategories[selectedSkillTab].description}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {skillCategories[selectedSkillTab].skills.map((skill, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-gray-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00aaa9]" />
                      {skill.name}
                    </span>
                    <span className="text-[#00aaa9] font-mono">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-[#00aaa9] h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick tags */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">Technologies Overview:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "React.js", "Vite", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3",
                  "Node.js", "Express.js", "RESTful APIs", "Clean Architecture", "PostgreSQL", "MongoDB", "SQLite", "Firebase",
                  "Docker", "Container Orchestration", "Linux Administration", "Git & GitHub", "CI/CD",
                  "UX/UI Design", "Figma"
                ].map((tag, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 bg-teal-50 border border-teal-200/60 text-[#008f8e] text-[11px] font-medium rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Projects Section */}
      <section ref={projectsRef} className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-[#00aaa9] font-bold text-xs tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Featured Work
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Production Projects & Platforms
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
              Real-world systems delivered for enterprise, breweries, telecom, and hospitality clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#00aaa9]/60 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 bg-teal-50 text-[#00aaa9] text-[11px] font-bold rounded-full border border-teal-200">
                      {project.category}
                    </span>
                    {project.client && (
                      <span className="text-[11px] font-semibold text-gray-500 flex items-center gap-1">
                        <Building className="w-3 h-3 text-gray-400" />
                        {project.client}
                      </span>
                    )}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#00aaa9] transition-colors mb-0.5">
                    {project.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-[#00aaa9] mb-2.5">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 text-xs leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Impact Story */}
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-gray-100 text-[11px] text-gray-600 italic mb-4">
                    💡 <span className="font-semibold text-gray-700">Impact:</span> {project.story}
                  </div>
                </div>

                <div>
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-medium rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions / Links */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#00aaa9] hover:text-[#008f8e] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Visit Live Platform
                      </a>
                    ) : (
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Production Deployed
                      </span>
                    )}

                    <span className="text-[11px] font-mono text-gray-400">
                      0{index + 1}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Experience Section */}
      <section ref={journeyRef} className="py-16 bg-white/60 backdrop-blur-sm relative z-10 border-t border-teal-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-[#00aaa9] font-bold text-xs tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Career Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Professional Experience
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
              Hands-on engineering roles building full-stack products in agile environments
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 pb-4 last:pb-0">
                
                {/* Timeline Line */}
                <div className="absolute left-2.5 top-3 bottom-0 w-0.5 bg-gradient-to-b from-[#00aaa9] to-teal-200"></div>
                
                {/* Timeline Dot */}
                <div className="absolute left-0 top-1 w-5 h-5 bg-[#00aaa9] rounded-full flex items-center justify-center text-white shadow-sm border-2 border-white">
                  <Briefcase className="w-2.5 h-2.5" />
                </div>

                <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[#00aaa9] font-bold text-sm">{exp.company}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#00aaa9] font-bold text-xs">
                      {exp.period}
                    </span>
                  </div>

                  <div className="mb-3 inline-block bg-teal-50 text-teal-800 text-xs font-semibold px-2.5 py-1 rounded-md border border-teal-200/50">
                    ⭐ {exp.highlight}
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-gray-600 text-xs sm:text-sm leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#00aaa9] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Education & Certifications Section */}
      <section ref={educationRef} className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-[#00aaa9] font-bold text-xs tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Credentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Education & Certifications
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
              Formal computer science university education paired with verified industry training
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Education Box */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-teal-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Education</h3>
                    <p className="text-gray-500 text-xs">University Foundation</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-bold text-gray-900">B.Sc. in Computer Science</h4>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                      Graduate
                    </span>
                  </div>
                  <p className="text-indigo-900 font-semibold text-xs">University of Rwanda</p>
                  <p className="text-gray-600 text-xs mt-1.5 leading-relaxed">
                    Solid grounding in software engineering principles, algorithms, data structures, database design, operating systems, and distributed web architecture.
                  </p>
                </div>
              </div>

              {/* Hackathon Achievement */}
              <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-2.5">
                <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-amber-900">1st Place — Hanga Pitch Hackathon 2024</h5>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Organized by Rwanda Information Society Authority (RISA) & Rwanda ICT Chamber for AI innovation.
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications Box */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-teal-100 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#00aaa9]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Certifications & Training</h3>
                  <p className="text-gray-500 text-xs">Verified technical competency</p>
                </div>
              </div>

              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div 
                    key={index}
                    className="p-3.5 rounded-xl bg-slate-50 border border-gray-200/70 hover:bg-white hover:border-[#00aaa9]/40 transition-all flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-white border border-gray-200 shadow-2xs shrink-0">
                        {cert.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{cert.title}</h4>
                        <p className="text-[#00aaa9] text-[11px] font-semibold">{cert.issuer}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-teal-50 text-[#00aaa9] border border-teal-200 rounded-full text-[10px] font-bold shrink-0">
                      {cert.badge}
                    </span>
                  </div>
                ))}
              </div>

              {/* Resume download footer */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-gray-500">
                  Coursework and experience details in CV.
                </span>
                <a
                  href="/Emmanuel_Nzayisenga_CV.pdf"
                  download="Emmanuel_Nzayisenga_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00aaa9] hover:bg-[#009291] text-white text-xs font-semibold transition-all shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" /> Download CV
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-16 relative z-10 bg-gradient-to-b from-transparent to-teal-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <span className="text-[#00aaa9] font-bold text-xs tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Get In Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Let's Have a Conversation 💬
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-xl mx-auto">
              Have a project in mind, an engineering inquiry, or want to discuss opportunities? I'd love to connect!
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-teal-100 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Send a Message</h3>
              <p className="text-gray-500 text-xs mb-5">Drop a note below and I will get back to you promptly.</p>

              {contactSent ? (
                <div className="p-5 rounded-xl bg-teal-50 border border-teal-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#00aaa9] mx-auto" />
                  <h4 className="text-sm font-bold text-gray-900">Message Received!</h4>
                  <p className="text-xs text-gray-600">Thank you for reaching out, Emmanuel will respond to your email shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3.5">
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Your Name *
                      </label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all text-xs sm:text-sm outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Your Email *
                      </label>
                      <input 
                        type="email" 
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all text-xs sm:text-sm outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Subject
                    </label>
                    <input 
                      type="text" 
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all text-xs sm:text-sm outline-none"
                      placeholder="Project discussion / Full-stack inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Message *
                    </label>
                    <textarea 
                      rows={3}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all text-xs sm:text-sm outline-none resize-none"
                      placeholder="Tell me about your project goals, timelines, or anything you'd like to collaborate on..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#00aaa9] hover:bg-[#009291] text-white py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="bg-white rounded-2xl p-6 border border-teal-100 shadow-md space-y-3">
                <h3 className="text-lg font-bold text-gray-900 mb-1">Connect Directly</h3>
                
                <div className="space-y-2">
                  
                  {/* LinkedIn */}
                  <a 
                    href={LINKEDIN_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0077B5] group-hover:scale-105 transition-transform shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-500 font-semibold uppercase">LinkedIn</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#0077B5] transition-colors truncate">
                        nzayisenga-emmanuel
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href={`mailto:${EMAIL_ADDRESS}`} 
                    className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-teal-50/70 border border-transparent hover:border-teal-200 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#00aaa9] group-hover:scale-105 transition-transform shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-500 font-semibold uppercase">Email</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#00aaa9] transition-colors truncate">
                        {EMAIL_ADDRESS}
                      </p>
                    </div>
                  </a>

                  {/* Phone & WhatsApp */}
                  <a 
                    href={WHATSAPP_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-500 font-semibold uppercase">Phone / WhatsApp</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">
                        {PHONE_NUMBER}
                      </p>
                    </div>
                  </a>

                  {/* GitHub */}
                  <a 
                    href={GITHUB_URL} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-gray-100 border border-transparent hover:border-gray-300 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-800 group-hover:scale-105 transition-transform shrink-0">
                      <Github className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-500 font-semibold uppercase">GitHub</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-black transition-colors truncate">
                        github.com/nzayisengaemmy939
                      </p>
                    </div>
                  </a>

                </div>
              </div>

              {/* Consultation Card */}
              <div className="bg-gradient-to-br from-[#00aaa9] to-teal-700 rounded-2xl p-5 text-white shadow-md space-y-3">
                <h4 className="text-sm sm:text-base font-bold">Need a fast consultation?</h4>
                <p className="text-teal-100 text-xs leading-relaxed">
                  Book a direct 15 to 30-minute discovery call to discuss your application architecture, roadmap, or hiring needs.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="flex-1 bg-white text-[#00aaa9] hover:bg-teal-50 py-2 rounded-lg font-bold text-xs transition-all shadow-2xs flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Schedule Call
                  </button>
                  <a
                    href="/Emmanuel_Nzayisenga_CV.pdf"
                    download="Emmanuel_Nzayisenga_CV.pdf"
                    className="flex-1 border border-white text-white hover:bg-white/10 py-2 rounded-lg font-bold text-xs transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" /> Download CV
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-teal-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#00aaa9] text-white flex items-center justify-center font-black text-xs">
              NE
            </div>
            <span className="text-sm font-bold text-gray-900">
              NZAYISENGA EMMANUEL
            </span>
          </div>

          <p className="text-gray-500 text-xs max-w-md mx-auto">
            Full-Stack Software Engineer • React (Vite), Node.js, PostgreSQL & Clean Architecture
          </p>

          <div className="flex justify-center space-x-4">
            <a 
              href={LINKEDIN_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-[#0077B5] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href={GITHUB_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-black transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={`mailto:${EMAIL_ADDRESS}`} 
              className="text-gray-400 hover:text-[#00aaa9] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-emerald-600 transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-4 border-t border-gray-100 text-[11px] text-gray-400 flex flex-col sm:flex-row items-center justify-center gap-1">
            <span>© {new Date().getFullYear()} Emmanuel Nzayisenga.</span>
            <span>Crafted with React, Vite & Tailwind CSS.</span>
          </div>
        </div>
      </footer>

      {/* Scheduling Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Schedule a Discovery Call</h3>
                <p className="text-gray-500 text-xs mt-0.5">Select a date & time to connect</p>
              </div>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5">
              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={scheduleForm.name}
                      onChange={(e) => setScheduleForm({...scheduleForm, name: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent text-xs outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={scheduleForm.email}
                      onChange={(e) => setScheduleForm({...scheduleForm, email: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent text-xs outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={scheduleForm.phone}
                      onChange={(e) => setScheduleForm({...scheduleForm, phone: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent text-xs outline-none"
                      placeholder="+250 780 000 000"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Call Duration *
                    </label>
                    <select
                      required
                      value={scheduleForm.duration}
                      onChange={(e) => setScheduleForm({...scheduleForm, duration: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent text-xs outline-none bg-white"
                    >
                      <option value="15">15 mins — Quick Intro</option>
                      <option value="30">30 mins — Project Discovery</option>
                      <option value="45">45 mins — Architecture Review</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Topic / Notes *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={scheduleForm.purpose}
                    onChange={(e) => setScheduleForm({...scheduleForm, purpose: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent text-xs outline-none resize-none"
                    placeholder="Briefly describe your project or goal..."
                  />
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Select Date *
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                    {getAvailableDates().slice(0, 7).map((date, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setSelectedDate(date)}
                        className={`p-2 rounded-lg border text-center transition-all text-xs ${
                          selectedDate && selectedDate.toDateString() === date.toDateString()
                            ? 'border-[#00aaa9] bg-[#00aaa9] text-white shadow-2xs'
                            : 'border-gray-200 hover:border-[#00aaa9]/50 hover:bg-teal-50/50'
                        }`}
                      >
                        <div className="text-[9px] opacity-80 mb-0.5">
                          {date.toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-xs font-bold">{date.getDate()}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Select Time *
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {timeSlots.slice(0, 12).map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-1.5 px-1 rounded-md border text-[11px] font-semibold transition-all ${
                            selectedTime === time
                              ? 'border-[#00aaa9] bg-[#00aaa9] text-white shadow-2xs'
                              : 'border-gray-200 hover:border-[#00aaa9]/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Summary */}
                {selectedDate && selectedTime && (
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-[#00aaa9] font-bold">
                      <Check className="w-4 h-4" />
                      <span>{formatDate(selectedDate)} at {selectedTime}</span>
                    </div>
                    <span className="text-gray-500 font-semibold">{scheduleForm.duration} Mins</span>
                  </div>
                )}

                {/* Modal Buttons */}
                <div className="flex gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 py-2.5 rounded-xl bg-[#00aaa9] hover:bg-[#009291] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-xs shadow-sm"
                  >
                    Confirm Call
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Floating Button */}
      {showBackToTop && (
        <button
          onClick={() => scrollToSection('home')}
          className="fixed bottom-5 right-5 bg-[#00aaa9] hover:bg-[#009291] text-white p-2.5 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 z-40"
          aria-label="Back to top"
        >
          <ChevronRight className="w-4 h-4 -rotate-90" />
        </button>
      )}

    </div>
  );
};

export default Portfolio;