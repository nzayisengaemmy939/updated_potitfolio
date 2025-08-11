import React, { useState, useEffect } from 'react';
import { ChevronRight, Code, Database, Smartphone, Globe, Github, Linkedin, Mail, Download, ExternalLink, Coffee, Heart, Zap, Users, Award, Target, Briefcase, Star } from 'lucide-react';
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

  const greetings = [
    "Hi there! 👋",
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

  const achievements: Achievement[] = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Projects Delivered",
      description: "Successfully completed full-stack applications",
      metric: "15+"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Client Satisfaction",
      description: "Maintained excellent client relationships",
      metric: "100%"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Professional Growth",
      description: "From intern to software engineer",
      metric: "2 Years"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Technologies Mastered",
      description: "Modern frameworks and tools",
      metric: "10+"
    }
  ];

  const personalityTraits: PersonalityTrait[] = [
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Coffee Enthusiast",
      description: "Fueled by great coffee and even greater ideas"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Problem Solver",
      description: "I genuinely love turning complex challenges into simple solutions"
    },
    {
      icon: <Zap className="w-6 h-6" />,
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
      icon: <Code className="w-8 h-8" />, 
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
      icon: <Smartphone className="w-8 h-8" />, 
      level: 85,
      description: "Bringing mobile experiences to life, one widget at a time"
    },
    { 
      name: 'Node.js', 
      icon: <Database className="w-8 h-8" />, 
      level: 88,
      description: "Backend magic that powers seamless user experiences"
    },
    { 
      name: 'Full Stack', 
      icon: <Globe className="w-8 h-8" />, 
      level: 92,
      description: "End-to-end solutions that just work beautifully"
    },
  ];

  const experiences: Experience[] = [
    {
      company: 'ABC Company Group',
      role: 'Software Engineer',
      period: 'Present',
      description: 'Currently building scalable web applications and mentoring junior developers. Every day brings new challenges that I genuinely enjoy solving.',
      highlight: 'Leading a team of 3 developers on a major client project'
    },
    {
      company: 'UrutiHub',
      role: 'Professional Intern',
      period: '2023-2024',
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
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20 animate-pulse"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 text-gray-800 overflow-hidden">
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {typedText || "My Portfolio"}
            </div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Journey', 'Contact'].map((item) => (
                <button
                  key={item}
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-300 relative group"
                  onClick={() => setActiveSection(item.toLowerCase())}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Text */}
            <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="space-y-4">
                {/* <div className="text-lg text-purple-600 font-medium">
                  👋 Hello! I'm a
                </div> */}
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 bg-clip-text text-transparent">
                    Passionate
                  </span>
                  <br />
                  <span className="text-gray-800">Full Stack Developer</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  I believe in the magic of turning <em>wild ideas</em> into beautiful, functional reality. 
                  When I'm not crafting code with React, Next.js, and Flutter, you'll find me 
                  exploring the latest tech trends or enjoying a perfect cup of coffee ☕
                </p>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-purple-200/30 shadow-sm">
                <p className="text-sm text-gray-500 mb-2">💡 Currently excited about:</p>
                <p className="text-purple-600">Building AI-powered web applications & exploring Web3 technologies</p>
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <button className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                  Let's Create Something Amazing
                  <ChevronRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                  <Download className="inline-block mr-2 w-5 h-5" />
                  My Resume
                </button>
              </div>

              <div className="flex space-x-6 pt-4">
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 transform hover:scale-110 group">
                  <Github className="w-6 h-6" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 transform hover:scale-110 group relative">
                  <Linkedin className="w-6 h-6" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 transform hover:scale-110 group relative">
                  <Mail className="w-6 h-6" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">Email</span>
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className={`relative flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                {/* Animated border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 rounded-full opacity-75 blur-sm animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 rounded-full opacity-30 animate-spin" style={{animationDuration: '8s'}}></div>
                
                {/* Profile Image */}
                <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white/50 backdrop-blur-sm group">
                  <img
                    src={pot_image}
                    alt="That's me! 😊"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Hover overlay with fun message */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white font-semibold">Hello there! 👋</p>
                      <p className="text-purple-400 text-sm mt-1">Ready to build amazing things?</p>
                    </div>
                  </div>
                </div>

                {/* Floating elements with emojis */}
                <div className="absolute top-10 -right-10 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-bounce flex items-center justify-center text-2xl" style={{animationDelay: '0.5s'}}>
                  ☕
                </div>
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-bounce flex items-center justify-center text-3xl" style={{animationDelay: '1s'}}>
                  💻
                </div>
                <div className="absolute top-1/2 -left-16 w-12 h-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-xl animate-bounce flex items-center justify-center text-xl" style={{animationDelay: '1.5s'}}>
                  🚀
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              My Achievements 🏆
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Numbers that tell my story of growth and success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className="group relative bg-gradient-to-br from-white/80 to-purple-50/50 backdrop-blur-lg rounded-xl p-8 border border-purple-200/30 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center shadow-sm hover:shadow-lg"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-blue-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="text-purple-600 group-hover:text-blue-600 transition-colors duration-300 mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  
                  <div className="text-4xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {achievement.metric}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
                  
                  {/* Achievement badge */}
                  <div className="mt-4 inline-block bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-3 py-1 text-xs text-purple-700 border border-purple-200">
                    Verified Achievement
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
                className="group bg-white/60 backdrop-blur-lg rounded-xl p-6 border border-purple-200/30 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:-translate-y-2 shadow-sm hover:shadow-lg"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-purple-600 group-hover:text-blue-600 transition-colors duration-300 mb-4 flex justify-center">
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
      <section className="py-20 bg-white/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
                className="group relative bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-200/50 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-purple-600 group-hover:text-blue-600 transition-colors duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{skill.name}</h3>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 italic">"{skill.description}"</p>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{width: `${skill.level}%`}}
                  ></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{skill.level}% proficient</span>
                  <span className="text-xs text-purple-600">Always learning more!</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600 to-blue-600 group-hover:shadow-lg group-hover:shadow-purple-400/30 transition-shadow duration-300"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-4 h-4 bg-purple-600 rounded-full transform -translate-x-1/2 shadow-lg shadow-purple-400/50 group-hover:scale-125 transition-transform duration-300 border-2 border-white"></div>
                
                <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-200/50 hover:border-purple-400/50 transition-all duration-300 group-hover:transform group-hover:-translate-y-1 shadow-sm hover:shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{exp.role}</h3>
                      <p className="text-purple-600 font-semibold">{exp.company}</p>
                      <div className="mt-2 inline-block bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-3 py-1 text-xs text-purple-700 border border-purple-200">
                        🎯 {exp.highlight}
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
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
                className="group relative bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-200/50 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 shadow-sm hover:shadow-lg"
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
                   <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                     project.type === 'web' 
                       ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                       : 'bg-green-100 text-green-700 border border-green-200'
                   }`}>
                     {project.type === 'web' ? '🌐 Web App' : '📱 Mobile App'}
                   </span>
                 </div>
                 <p className="text-gray-600 text-sm mb-4 leading-relaxed">{project.description}</p>
                 <div className="flex flex-wrap gap-2 mb-4">
                   {project.tech.map((tech, techIndex) => (
                     <span 
                       key={techIndex} 
                       className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-medium rounded-full border border-purple-200"
                     >
                       {tech}
                     </span>
                   ))}
                 </div>
                <div className="mt-4 flex space-x-4">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="group bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300 transform hover:scale-105">
                      Demo
                      <ExternalLink className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="group bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-300 transform hover:scale-105">
                      GitHub
                      <Github className="inline-block ml-2 w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

             {/* Contact Section */}
       <section className="py-20 relative z-10">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
               Let's Connect! 💬
             </h2>
             <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
               Ready to bring your ideas to life? I'd love to hear about your project!
             </p>
           </div>

           <div className="grid lg:grid-cols-2 gap-12">
             {/* Contact Form */}
             <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-purple-200/50 shadow-lg">
               <h3 className="text-2xl font-bold text-gray-800 mb-6">Send me a message</h3>
               <form className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                     <input 
                       type="text" 
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                       placeholder="Your first name"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                     <input 
                       type="text" 
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                       placeholder="Your last name"
                     />
                   </div>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                   <input 
                     type="email" 
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                     placeholder="your.email@example.com"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                   <input 
                     type="text" 
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                     placeholder="What's this about?"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                   <textarea 
                     rows={5}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                     placeholder="Tell me about your project, ideas, or just say hello! 👋"
                   ></textarea>
                 </div>
                 <button 
                   type="submit"
                   className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
                 >
                   Send Message 📤
                 </button>
               </form>
             </div>

             {/* Contact Info */}
             <div className="space-y-8">
               <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-purple-200/50 shadow-lg">
                 <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in touch</h3>
                 <div className="space-y-4">
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                       <Mail className="w-6 h-6 text-purple-600" />
                     </div>
                     <div>
                       <p className="font-semibold text-gray-800">Email</p>
                       <p className="text-gray-600">hello@yourportfolio.com</p>
                     </div>
                   </div>
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                       <Linkedin className="w-6 h-6 text-purple-600" />
                     </div>
                     <div>
                       <p className="font-semibold text-gray-800">LinkedIn</p>
                       <p className="text-gray-600">linkedin.com/in/yourprofile</p>
                     </div>
                   </div>
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                       <Github className="w-6 h-6 text-purple-600" />
                     </div>
                     <div>
                       <p className="font-semibold text-gray-800">GitHub</p>
                       <p className="text-gray-600">github.com/yourusername</p>
                     </div>
                   </div>
                 </div>
               </div>

               <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200/50">
                 <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Response</h3>
                 <p className="text-gray-600 mb-4">
                   I typically respond within 24 hours. For urgent projects, feel free to reach out directly!
                 </p>
                 <div className="flex space-x-4">
                   <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                     Schedule Call 📅
                   </button>
                   <button className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                     Download CV 📄
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>

       {/* Footer */}
       <footer className="py-12 bg-white/60 backdrop-blur-lg border-t border-purple-200/50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center">
             <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
               Your Name
             </div>
             <p className="text-gray-600 mb-6">
               Full Stack Developer • Web & Mobile App Specialist
             </p>
             <div className="flex justify-center space-x-6 mb-6">
               <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 transform hover:scale-110">
                 <Github className="w-6 h-6" />
               </a>
               <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 transform hover:scale-110">
                 <Linkedin className="w-6 h-6" />
               </a>
               <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors duration-300 transform hover:scale-110">
                 <Mail className="w-6 h-6" />
               </a>
             </div>
             <div className="border-t border-gray-200 pt-6">
               <p className="text-sm text-gray-500">
                 © 2024 Your Name. Built with ❤️ using React & Tailwind CSS
               </p>
             </div>
           </div>
         </div>
       </footer>
    </div>
  );
};

export default Portfolio;