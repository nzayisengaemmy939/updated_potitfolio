import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Code, Github, Linkedin, Mail, Download, ExternalLink, Coffee, Users, Award, Target, Rocket, Lightbulb, Brain, Sparkles, Layers, Smartphone as Mobile, Monitor, Server, GitBranch, TrendingUp, MessageCircle, Calendar, FileText, Instagram, Phone, X, Check } from 'lucide-react';
import pot_image from '../assets/pot_image.jpg'
interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  description: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlight: string;
}

interface Achievement {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
}

interface PersonalityTrait {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Portfolio: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState('');
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    duration: '30'
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Refs for smooth scrolling
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
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
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date);
      }
    }
    return dates;
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend or scheduling service
    console.log('Scheduling request:', {
      ...scheduleForm,
      date: selectedDate,
      time: selectedTime
    });
    
    // For demo purposes, show success and close modal
    alert('Scheduling request sent! I\'ll get back to you within 24 hours to confirm the call.');
    setShowScheduleModal(false);
    // Reset form
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Smooth scrolling function
  const scrollToSection = (sectionName: string) => {
    setActiveSection(sectionName);
    
    switch (sectionName) {
      case 'home':
        homeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'about':
        aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'skills':
        skillsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'projects':
        projectsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'journey':
        journeyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      case 'contact':
        contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        break;
      default:
        homeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const greetings = [
    "Hi there! ",
    "Welcome to my world!",
    "Let's build something amazing!",
    "Ready to create magic?"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Typing effect for greeting
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
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentGreeting]);

  // Scroll event listener to update active section and back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      
      // Show/hide back to top button
      setShowBackToTop(window.scrollY > 500);
      
      // Get all section positions
      const sections = [
        { ref: homeRef, name: 'home' },
        { ref: aboutRef, name: 'about' },
        { ref: skillsRef, name: 'skills' },
        { ref: projectsRef, name: 'projects' },
        { ref: journeyRef, name: 'journey' },
        { ref: contactRef, name: 'contact' }
      ];
      
      // Find which section is currently in view
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
      icon: <Rocket className="w-8 h-8" />,
      title: "Projects Delivered",
      description: "Successfully completed full-stack applications",
      metric: "5+"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Client Satisfaction",
      description: "Maintained excellent client relationships",
      metric: "100%"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Hanga Pitch Hackathon Winner",
      description: "First place winner in innovative tech competition",
      metric: "🏆"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Professional Growth",
      description: "From intern to software engineer",
      metric: "3 Years"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Technologies Mastered",
      description: "Modern frameworks and tools",
      metric: "7+"
    }
  ];

  const personalityTraits: PersonalityTrait[] = [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "A fighting bull",
      description: "A strong, determined warrior"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Problem Solver",
      description: "I genuinely love turning complex challenges into simple solutions"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Quick Learner",
      description: "Always excited to dive into new technologies and frameworks"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Player",
      description: "Collaboration and mentoring are close to my heart"
    }
  ];

  const skills: Skill[] = [
    { 
      name: 'React/Next.js', 
      icon: <Monitor className="w-8 h-8" />, 
      level: 95,
      description: "My go-to for creating beautiful, interactive UIs"
    },
    { 
      name: 'TypeScript', 
      icon: <Code className="w-8 h-8" />, 
      level: 90,
      description: "Because I believe in writing code that speaks for itself"
    },
    { 
      name: 'Flutter', 
      icon: <Mobile className="w-8 h-8" />, 
      level: 85,
      description: "Bringing mobile experiences to life, one widget at a time"
    },
    { 
      name: 'Node.js', 
      icon: <Server className="w-8 h-8" />, 
      level: 88,
      description: "Backend magic that powers seamless user experiences"
    },
    { 
      name: 'Full Stack', 
      icon: <Layers className="w-8 h-8" />, 
      level: 92,
      description: "End-to-end solutions that just work beautifully"
    },
  ];

  const experiences: Experience[] = [
    {
      company: 'ABC Company Group',
      role: 'Software Engineer',
      period: 'Present',
      description: "Building scalable mobile apps, configuring robust databases, and creating QField-powered mapping solutions. Skilled in QGIS for efficient geospatial data management and visualization.",
      highlight: 'Leading a team of 3 developers on a major client project'
    },
    {
      company: 'UrutiHub',
      role: 'Professional Intern',
      period: '2025',
      description: 'This is where my journey truly began! Working alongside seasoned developers taught me not just to code, but to think like a problem-solver.',
      highlight: 'Contributed to 5+ production applications'
    }
  ];

  const projects = [
    {
      title: "E-Rental Platform",
      description: "Rental management system for properties and vehicles with booking, payments, and real-time tracking.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      image: "/e-rental.png",
      demo: "#",
      github: "#",
      type: "web",
      category: "Full-Stack Web Application"
    },
    {
      title: "Home Health Care",
      description: "Healthcare platform connecting patients with providers for appointments and medical records.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
      image: "/home_health.png",
      demo: "#",
      github: "#",
      type: "web",
      category: "Healthcare Platform"
    },
    {
      title: "Expense Tracker",
      description: "Mobile app for personal finance with expense tracking, budgeting, and data visualization.",
      tech: ["Flutter", "Dart", "SQLite", "Provider State Management"],
      image: "/expense_tracker.jpg",
      demo: "#",
      github: "#",
      type: "mobile",
      category: "Mobile Finance App"
    }
  ];

  const FloatingParticles = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00aaa9] rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-[#00aaa9]/10 text-gray-800 overflow-hidden">
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-[#00aaa9]">
              {typedText || "My Portfolio"}
            </div>
                         <div className="hidden md:flex space-x-8">
               {['Home', 'About', 'Skills', 'Projects', 'Journey', 'Contact'].map((item) => (
                 <button
                   key={item}
                   className={`transition-colors duration-300 relative group ${
                     activeSection === item.toLowerCase() 
                       ? 'text-[#00aaa9]' 
                       : 'text-gray-600 hover:text-[#00aaa9]'
                   }`}
                   onClick={() => scrollToSection(item.toLowerCase())}
                 >
                   {item}
                   <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#00aaa9] transition-all duration-300 ${
                     activeSection === item.toLowerCase() 
                       ? 'w-full' 
                       : 'w-0 group-hover:w-full'
                   }`}></span>
                 </button>
               ))}
             </div>
             
             {/* Mobile menu button */}
             <button
               className="md:hidden text-gray-600 hover:text-[#00aaa9] transition-colors duration-300"
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

       {/* Mobile Navigation Menu */}
       {mobileMenuOpen && (
         <div className="md:hidden fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 z-40 shadow-lg">
           <div className="px-4 py-4 space-y-2">
             {['Home', 'About', 'Skills', 'Projects', 'Journey', 'Contact'].map((item) => (
               <button
                 key={item}
                 className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                   activeSection === item.toLowerCase()
                     ? 'bg-[#00aaa9]/10 text-[#00aaa9] font-semibold'
                     : 'text-gray-600 hover:bg-gray-50 hover:text-[#00aaa9]'
                 }`}
                 onClick={() => {
                   scrollToSection(item.toLowerCase());
                   setMobileMenuOpen(false);
                 }}
               >
                 {item}
               </button>
             ))}
           </div>
         </div>
       )}

       {/* Hero Section */}
      <section ref={homeRef} className="relative min-h-screen flex items-center justify-center pt-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Text */}
            <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="space-y-4">
                {/* <div className="text-lg text-amber-600 font-medium">
                   Hello! I'm a
                </div> */}
                                 <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                   {/* <span className="text-[#00aaa9]">
                     Hi, I'm Nzayisenga Emmanuel
                   </span> */}
                   <br />
                   <span className="text-gray-800">Full-Stack Developer & CS Student</span>
                 </h1>
                 <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                   A passionate Full-Stack Developer and Computer Science student at the University of Rwanda, 
                   specializing in scalable web and mobile applications with Node.js, Flutter, React, and Next.js. 
                   I thrive on solving real-world problems through clean code and intuitive design, with expertise 
                   in cloud integrations, offline-first solutions, and multilingual experiences.
                 </p>
              </div>

                             <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-[#00aaa9]/30 shadow-sm">
                 <p className="text-sm text-gray-500 mb-2">💡 Currently excited about:</p>
                 <p className="text-[#00aaa9]">Cloud integrations, offline-first solutions, and multilingual user experiences</p>
               </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <button className="group bg-[#00aaa9] hover:bg-[#009999] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#00aaa9]/25 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Let's Create Something Amazing
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                                 <a href="/src/docs/Updated_cv.pdf" download className="border-2 border-[#00aaa9] text-[#00aaa9] hover:bg-[#00aaa9] hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center">
                   <Download className="inline-block mr-2 w-5 h-5" />
                   My Resume
                 </a>
              </div>

                                                           <div className="flex space-x-6 pt-4">
                  <a href="https://github.com/nzayisengaemmy939" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00aaa9] transition-colors duration-300 transform hover:scale-110 group">
                    <Github className="w-6 h-6" />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-[#00aaa9] transition-colors duration-300 transform hover:scale-110 group relative">
                    <Linkedin className="w-6 h-6" />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
                  </a>
                  <a href="https://www.instagram.com/emma1_____________/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00aaa9] transition-colors duration-300 transform hover:scale-110 group relative">
                    <Instagram className="w-6 h-6" />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
                  </a>
                  <a href="https://wa.me/250790838315" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00aaa9] transition-colors duration-300 transform hover:scale-110 group relative">
                    <Phone className="w-6 h-6" />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp</span>
                  </a>
                                   <a href="mailto:nzayisengaemmy2001@gmail.com" className="text-gray-500 hover:text-[#00aaa9] transition-colors duration-300 transform hover:scale-110 group relative">
                     <Mail className="w-6 h-6" />
                     <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Email</span>
                   </a>
                 </div>
            </div>

            {/* Hero Image */}
            <div className={`relative flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                {/* Animated border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00aaa9] via-blue-400 to-[#00aaa9] rounded-full opacity-75 blur-sm animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00aaa9] via-blue-400 to-[#00aaa9] rounded-full opacity-30 animate-spin" style={{animationDuration: '8s'}}></div>
                
                {/* Profile Image */}
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white/50 backdrop-blur-sm group">
                  <img
                    src={pot_image}
                    alt="That's me! 😊"
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Hover overlay with fun message */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-semibold">Hello there! </p>
                      <p className="text-[#00aaa9] text-sm mt-1">Ready to build amazing things?</p>
                    </div>
                  </div>
                </div>

                {/* Floating elements with emojis */}
                <div className="absolute top-10 -right-10 w-16 h-16 bg-gradient-to-r from-[#00aaa9]/20 to-blue-400/20 rounded-full blur-xl animate-bounce flex items-center justify-center text-2xl" style={{animationDelay: '0.5s'}}>
                  ☕
                </div>
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-[#00aaa9]/20 rounded-full blur-xl animate-bounce flex items-center justify-center text-3xl" style={{animationDelay: '1s'}}>
                  💻
                </div>
                <div className="absolute top-1/2 -left-16 w-12 h-12 bg-gradient-to-r from-[#00aaa9]/20 to-blue-600/20 rounded-full blur-xl animate-bounce flex items-center justify-center text-xl" style={{animationDelay: '1.5s'}}>
                  🚀
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section ref={aboutRef} className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#00aaa9]">
              My Achievements 🏆
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Numbers that tell my story of growth and success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {achievements.map((achievement, index) => (
                             <div
                 key={achievement.title}
                 className="group relative bg-gradient-to-br from-white/80 to-[#00aaa9]/10 backdrop-blur-lg rounded-xl p-6 border border-[#00aaa9]/30 hover:border-[#00aaa9]/50 transition-all duration-300 hover:transform hover:scale-105 text-center shadow-sm hover:shadow-lg"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00aaa9]/5 to-blue-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-[#00aaa9] group-hover:text-blue-600 transition-colors duration-300 mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  
                  <div className="text-4xl font-bold text-gray-800 mb-2 group-hover:text-[#00aaa9] transition-colors duration-300">
                    {achievement.metric}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
                  
                  {/* Achievement badge */}
                  <div className="mt-4 inline-block bg-gradient-to-r from-[#00aaa9]/20 to-blue-100 rounded-full px-3 py-1 text-xs text-[#00aaa9] border border-[#00aaa9]/30">
                    Verified Achievement
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section ref={skillsRef} className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#00aaa9]">
              A Little About Me
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Beyond the code, here's what makes me tick
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalityTraits.map((trait, index) => (
              <div
                key={trait.title}
                className="group bg-white/60 backdrop-blur-lg rounded-xl p-6 border border-[#00aaa9]/30 hover:border-[#00aaa9]/50 transition-all duration-300 hover:transform hover:-translate-y-2 shadow-sm hover:shadow-lg"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-[#00aaa9] group-hover:text-blue-600 transition-colors duration-300 mb-4 flex justify-center">
                  {trait.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">{trait.title}</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{trait.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={projectsRef} className="py-20 bg-white/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#00aaa9]">
              What I Love Working With
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              These are the tools that help me bring ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-[#00aaa9]/30 hover:border-[#00aaa9]/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-[#00aaa9] group-hover:text-blue-600 transition-colors duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{skill.name}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 italic">"{skill.description}"</p>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-[#00aaa9] to-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{width: `${skill.level}%`}}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{skill.level}% proficient</span>
                  <span className="text-xs text-[#00aaa9]">Always learning more!</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={journeyRef} className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#00aaa9]">
              My Journey So Far
            </h2>
            <p className="text-gray-600 mt-4">Every step has been a learning adventure</p>
          </div>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 pb-12 last:pb-0 group"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#00aaa9] to-blue-600 group-hover:shadow-lg group-hover:shadow-[#00aaa9]/30 transition-shadow duration-300"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-4 h-4 bg-[#00aaa9] rounded-full transform -translate-x-1/2 shadow-lg shadow-[#00aaa9]/50 group-hover:scale-125 transition-transform duration-300 border-2 border-white"></div>
                
                <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-[#00aaa9]/30 hover:border-[#00aaa9]/50 transition-all duration-300 group-hover:transform group-hover:-translate-y-1 shadow-sm hover:shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.role}</h3>
                      <p className="text-[#00aaa9] font-semibold">{exp.company}</p>
                      <div className="mt-2 inline-block bg-gradient-to-r from-[#00aaa9]/20 to-blue-100 rounded-full px-3 py-1 text-xs text-[#00aaa9] border border-[#00aaa9]/30">
                         {exp.highlight}
                      </div>
                    </div>
                    <span className="text-gray-500 font-medium bg-gray-100 px-3 py-1 rounded-full text-sm mt-2 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#00aaa9]">
              My Projects
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              A selection of my most notable projects
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group relative bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-[#00aaa9]/30 hover:border-[#00aaa9]/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                                 <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 shadow-lg">
                   <img
                     src={project.image}
                     alt={project.title}
                     className="w-full h-full object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 </div>
                 <div className="flex items-center justify-between mb-3">
                   <h3 className="text-2xl font-bold text-gray-800">{project.title}</h3>
                                       <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${
                      project.type === 'web' 
                        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                        : 'bg-green-100 text-green-700 border border-green-200'
                    }`}>
                      {project.type === 'web' ? (
                        <>
                          <Monitor className="w-3 h-3" />
                          Web App
                        </>
                      ) : (
                        <>
                          <Mobile className="w-3 h-3" />
                          Mobile App
                        </>
                      )}
                    </span>
                 </div>
                 <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {project.tech.map((tech, techIndex) => (
                     <span 
                       key={techIndex} 
                       className="px-3 py-1 bg-gradient-to-r from-[#00aaa9]/20 to-blue-100 text-[#00aaa9] text-xs font-medium rounded-full border border-[#00aaa9]/30"
                     >
                       {tech}
                     </span>
                   ))}
                 </div>
                <div className="mt-4 flex space-x-4">
                  {project.demo && (
                                         <a href={project.demo} target="_blank" rel="noopener noreferrer" className="group bg-[#00aaa9] hover:bg-[#009999] text-white px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300 transform hover:scale-105 flex items-center gap-2">
                       <Monitor className="w-4 h-4" />
                       Demo
                       <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </a>
                  )}
                                     {project.github && (
                     <a href={project.github} target="_blank" rel="noopener noreferrer" className="group bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300 transform hover:scale-105 flex items-center gap-2">
                       <GitBranch className="w-4 h-4" />
                       GitHub
                     </a>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

             {/* Contact Section */}
       <section ref={contactRef} className="py-20 relative z-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
                           <h2 className="text-4xl font-bold text-[#00aaa9]">
                Let's Connect! 💬
              </h2>
             <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
               Ready to bring your ideas to life? I'd love to hear about your project!
             </p>
           </div>

           <div className="grid lg:grid-cols-2 gap-12">
             {/* Contact Form */}
             <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-amber-200/50 shadow-lg">
               <h3 className="text-2xl font-bold text-gray-800 mb-6">Send me a message</h3>
               <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                     <input 
                       type="text" 
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all duration-300"
                       placeholder="Your first name"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                     <input 
                       type="text" 
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all duration-300"
                       placeholder="Your last name"
                     />
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                   <input 
                     type="email" 
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all duration-300"
                     placeholder="your.email@example.com"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                   <input 
                     type="text" 
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all duration-300"
                     placeholder="What's this about?"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                   <textarea 
                     rows={5}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all duration-300 resize-none"
                     placeholder="Tell me about your project, ideas, or just say hello! "
                   ></textarea>
                 </div>
                                   <button 
                    type="submit"
                    className="w-full bg-[#00aaa9] hover:bg-[#009999] text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#00aaa9]/25 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send Message
                  </button>
               </form>
             </div>

             {/* Contact Info */}
             <div className="space-y-8">
               <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-[#00aaa9]/30 shadow-lg">
                 <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in touch</h3>
                 <div className="space-y-4">
                                                            <div className="flex items-center space-x-4">
                       <div className="w-12 h-12 bg-gradient-to-r from-[#00aaa9]/20 to-blue-100 rounded-full flex items-center justify-center">
                         <MessageCircle className="w-6 h-6 text-[#00aaa9]" />
                       </div>
                       <div>
                         <p className="font-semibold text-gray-800">Email</p>
                         <p className="text-gray-600">nzayisengaemmy2001@gmail.com</p>
                       </div>
                     </div>
                                         <div className="flex items-center space-x-4">
                       <div className="w-12 h-12 bg-gradient-to-r from-[#00aaa9]/20 to-blue-100 rounded-full flex items-center justify-center">
                         <Linkedin className="w-6 h-6 text-[#00aaa9]" />
                       </div>
                       <div>
                         <p className="font-semibold text-gray-800">LinkedIn</p>
                         <p className="text-gray-600">linkedin.com/in/yourprofile</p>
                       </div>
                     </div>
                                           <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#00aaa9]/20 to-blue-100 rounded-full flex items-center justify-center">
                          <Instagram className="w-6 h-6 text-[#00aaa9]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Instagram</p>
                          <p className="text-gray-600">@emma1_____________</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#00aaa9]/20 to-blue-100 rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-[#00aaa9]" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">WhatsApp</p>
                          <p className="text-gray-600">+250 790 838 315</p>
                        </div>
                      </div>
                                         <div className="flex items-center space-x-4">
                       <div className="w-12 h-12 bg-gradient-to-r from-[#00aaa9]/20 to-blue-100 rounded-full flex items-center justify-center">
                         <GitBranch className="w-6 h-6 text-[#00aaa9]" />
                       </div>
                       <div>
                         <p className="font-semibold text-gray-800">GitHub</p>
                         <p className="text-gray-600">github.com/nzayisengaemmy939</p>
                       </div>
                     </div>
                 </div>
               </div>

               <div className="bg-gradient-to-br from-[#00aaa9]/10 to-blue-50 rounded-2xl p-8 border border-[#00aaa9]/30">
                 <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Response</h3>
                 <p className="text-gray-600 mb-4">
                   I typically respond within 24 hours. For urgent projects, feel free to reach out directly!
                 </p>
                                   <div className="flex space-x-4">
                                         <button 
                       onClick={() => setShowScheduleModal(true)}
                       className="flex-1 bg-[#00aaa9] hover:bg-[#009999] text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                     >
                       <Calendar className="w-4 h-4" />
                       Schedule Call
                     </button>
                                         <a href="/src/docs/Updated_cv.pdf" download className="flex-1 border-2 border-[#00aaa9] text-[#00aaa9] hover:bg-[#00aaa9] hover:text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                       <FileText className="w-4 h-4" />
                       Download CV
                     </a>
                  </div>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Footer */}
       <footer className="py-12 bg-white/60 backdrop-blur-lg border-t border-[#00aaa9]/30">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center">
             <div className="text-2xl font-bold text-[#00aaa9] mb-4">
               NZAYISENGA EMMANUEL
             </div>
             <p className="text-gray-600 mb-6">
               Senior Frontend Developer • Web & Mobile App Specialist
             </p>
                                                                                                             <div className="flex justify-center space-x-6 mb-6">
                  <a href="https://github.com/nzayisengaemmy939" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00aaa9] transition-colors duration-300 transform hover:scale-110">
                    <GitBranch className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-500 hover:text-[#00aaa9] transition-colors duration-300 transform hover:scale-110">
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/emma1_____________/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00aaa9] transition-colors duration-300 transform hover:scale-110">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="https://wa.me/250790838315" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#00aaa9] transition-colors duration-300 transform hover:scale-110">
                    <Phone className="w-6 h-6" />
                  </a>
                  <a href="mailto:nzayisengaemmy2001@gmail.com" className="text-gray-500 hover:text-[#00aaa9] transition-colors duration-300 transform hover:scale-110">
                    <MessageCircle className="w-6 h-6" />
                  </a>
                </div>
             <div className="border-t border-gray-200 pt-6">
               <p className="text-sm text-gray-500">
                 © 2024 NZAYISENGA EMMANUEL. Built with ❤️ using React & Tailwind CSS
               </p>
             </div>
           </div>
         </div>
               </footer>

        {/* Scheduling Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Schedule a Call</h3>
                  <p className="text-gray-600 mt-1">Let's discuss your project and find the perfect time to connect</p>
                </div>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <form onSubmit={handleScheduleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={scheduleForm.name}
                        onChange={(e) => setScheduleForm({...scheduleForm, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={scheduleForm.email}
                        onChange={(e) => setScheduleForm({...scheduleForm, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={scheduleForm.phone}
                        onChange={(e) => setScheduleForm({...scheduleForm, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Call Duration *</label>
                      <select
                        required
                        value={scheduleForm.duration}
                        onChange={(e) => setScheduleForm({...scheduleForm, duration: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all duration-300"
                      >
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="45">45 minutes</option>
                        <option value="60">1 hour</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Call *</label>
                    <textarea
                      required
                      rows={3}
                      value={scheduleForm.purpose}
                      onChange={(e) => setScheduleForm({...scheduleForm, purpose: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00aaa9] focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell me about your project, questions, or what you'd like to discuss..."
                    />
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Date *</label>
                    <div className="grid grid-cols-7 gap-2">
                      {getAvailableDates().map((date, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                            selectedDate && selectedDate.toDateString() === date.toDateString()
                              ? 'border-[#00aaa9] bg-[#00aaa9] text-white'
                              : 'border-gray-200 hover:border-[#00aaa9]/50 hover:bg-[#00aaa9]/5'
                          }`}
                        >
                          <div className="text-xs text-gray-500 mb-1">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div>{date.getDate()}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Select Time *</label>
                      <div className="grid grid-cols-6 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium ${
                              selectedTime === time
                                ? 'border-[#00aaa9] bg-[#00aaa9] text-white'
                                : 'border-gray-200 hover:border-[#00aaa9]/50 hover:bg-[#00aaa9]/5'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Selected Details */}
                  {selectedDate && selectedTime && (
                    <div className="bg-[#00aaa9]/10 border border-[#00aaa9]/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-[#00aaa9] mb-2">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">Appointment Details</span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Date:</span>
                          <span className="ml-2 font-medium text-gray-800">{formatDate(selectedDate)}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Time:</span>
                          <span className="ml-2 font-medium text-gray-800">{selectedTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <span className="ml-2 font-medium text-gray-800">{scheduleForm.duration} minutes</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Type:</span>
                          <span className="ml-2 font-medium text-gray-800">Video Call</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowScheduleModal(false)}
                      className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-gray-400 py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedDate || !selectedTime}
                      className="flex-1 bg-[#00aaa9] hover:bg-[#009999] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Schedule Call
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={() => scrollToSection('home')}
            className="fixed bottom-8 right-8 bg-[#00aaa9] hover:bg-[#009999] text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-40"
            aria-label="Back to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
     </div>
   );
 };

export default Portfolio;