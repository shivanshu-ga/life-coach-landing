import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import axios from 'axios';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '../components/ui/accordion';
import { 
  Brain, 
  Target, 
  Lightbulb, 
  Heart, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Users,
  TrendingUp,
  Shield,
  BookOpen,
  ShoppingCart,
  MessageCircle,
  Calendar,
  Award,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Get calendar configuration from environment or use defaults
const CALCOM_USERNAME = process.env.REACT_APP_CALCOM_USERNAME || 'shivanshu';
const GOOGLE_CALENDAR_LINK = process.env.REACT_APP_GOOGLE_CALENDAR_LINK || 'https://calendar.google.com/calendar/appointments';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Google Analytics
  useEffect(() => {
    const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;
    
    if (GA_TRACKING_ID && GA_TRACKING_ID !== 'G-XXXXXXXXXX') {
      // Load Google Analytics
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
      `;
      document.head.appendChild(script2);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.status === 200 || response.status === 201) {
        toast.success('Thank you! We will get back to you soon. Check your email!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try WhatsApp or call us directly.');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/917298888880?text=Hi%20Shivanshu,%20I%20would%20like%20to%20know%20more%20about%20your%20coaching%20programs', '_blank');
  };

  const openCalendar = () => {
    setShowCalendar(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-slate-900">Shivanshu Goel</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                Services
              </button>
              <button onClick={() => scrollToSection('book')} className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                Book
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
                FAQ
              </button>
            </nav>

            <Button 
              onClick={() => scrollToSection('contact')}
              className="hidden md:flex bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 space-y-3 animate-accordion-down">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left text-slate-700 hover:text-emerald-600 transition-colors font-medium py-2">
                Home
              </button>
              <button onClick={() => scrollToSection('about')} className="block w-full text-left text-slate-700 hover:text-emerald-600 transition-colors font-medium py-2">
                About
              </button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left text-slate-700 hover:text-emerald-600 transition-colors font-medium py-2">
                Services
              </button>
              <button onClick={() => scrollToSection('book')} className="block w-full text-left text-slate-700 hover:text-emerald-600 transition-colors font-medium py-2">
                Book
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-slate-700 hover:text-emerald-600 transition-colors font-medium py-2">
                Testimonials
              </button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-slate-700 hover:text-emerald-600 transition-colors font-medium py-2">
                FAQ
              </button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              >
                Get Started
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 opacity-60"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                  Transform Your Mind
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight">
                Stop <span className="text-emerald-600">Overthinking</span>.<br />
                Start <span className="text-teal-600">Living</span>.
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
                Turn mental chaos into clarity. Learn to think right, not just think less. 
                Coaching designed for young minds aged 18-30 ready to break free from the overthinking trap.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={openCalendar}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Consultation
                </Button>
                <Button 
                  onClick={() => scrollToSection('about')}
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-emerald-600" />
                  <span className="text-slate-700 font-semibold">500+ Lives Changed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <span className="text-slate-700 font-semibold">4.9/5 Rating</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-teal-400 rounded-3xl transform rotate-3 opacity-20"></div>
              <img 
                src="/images/coach-hero.jpeg" 
                alt="Shivanshu Goel - Life Coach"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  <div>
                    <p className="font-bold text-slate-900">Certified Coach</p>
                    <p className="text-sm text-slate-600">Mind Transformation Expert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">500+</div>
              <div className="text-slate-300">Lives Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-400 mb-2">95%</div>
              <div className="text-slate-300">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">5+</div>
              <div className="text-slate-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">4.9</div>
              <div className="text-slate-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
                Meet Your <span className="text-emerald-600">Coach</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-emerald-600 to-teal-600"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                Hi, I'm <strong>Shivanshu Goel</strong>, and I know what it's like to be trapped in your own thoughts. 
                After years of helping young professionals break free from overthinking patterns, I've developed 
                a unique methodology that transforms mental chaos into clarity.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                My approach isn't about thinking less—it's about <strong>thinking right</strong>. Through personalized 
                coaching sessions, I help you rewire your thought patterns, build mental resilience, and create 
                a life driven by purpose rather than anxiety.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Certified Expert</h4>
                    <p className="text-sm text-slate-600">Professional Life Coach</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Proven Results</h4>
                    <p className="text-sm text-slate-600">95% Success Rate</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/images/img1.jpeg" 
                alt="Coaching session"
                className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <img 
                src="/images/img2.jpeg" 
                alt="Mindfulness practice"
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8 transform hover:scale-105 transition-transform duration-300"
              />
              <img 
                src="/images/img3.jpeg" 
                alt="Personal growth"
                className="rounded-2xl shadow-lg w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <img 
                src="/images/img4.jpeg" 
                alt="Success story"
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8 transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Book Section */}
      <section id="book" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transform rotate-3 z-10">
                <Award className="inline h-5 w-5 mr-1" />
                Amazon Bestseller
              </div>
              <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-300">
                  <BookOpen className="h-32 w-32 mx-auto text-emerald-600 mb-4" />
                  <h3 className="text-3xl font-bold text-slate-900 text-center mb-2">Quiet the Chaos</h3>
                  <p className="text-slate-600 text-center text-lg">Understanding & Empowering Women Dealing with Overthinking</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold">
                  📚 Published Author
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
                Amazon <span className="text-amber-600">Bestseller</span> Author
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-amber-600 to-orange-600"></div>
              <p className="text-lg text-slate-600 leading-relaxed">
                <strong>"Quiet the Chaos"</strong> is a groundbreaking book that helps women understand and overcome 
                overthinking patterns. With practical strategies and empowering insights, this bestseller has transformed 
                thousands of lives.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Based on years of coaching experience, the book provides actionable techniques to break free from 
                mental loops and embrace clarity, confidence, and purpose.
              </p>
              
              <div className="pt-4">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6 text-emerald-600" />
                  Get Your Copy Now:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a 
                    href="https://www.amazon.in/s?k=Quiet+the+Chaos+Shivanshu+Goel" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Buy on Amazon
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://www.flipkart.com/quiet-chaos-understanding-empowering-women-dealing-overthinking/p/itm474d2082927d1?pid=9788119908905&lid=LSTBOK9788119908905O2MSDK&marketplace=FLIPKART&q=QUIET+THE+CHAOS&store=bks&srno=s_1_1&otracker=search&otracker1=search&fm=org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Buy on Flipkart
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://tr.ee/X-jeM87Umb" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <BookOpen className="h-5 w-5" />
                    Google Store
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a 
                    href="https://tr.ee/9Iz5nDGoY0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <BookOpen className="h-5 w-5" />
                    Google eBook
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              How I Can <span className="text-emerald-600">Help You</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Specialized coaching programs designed to transform overthinking into strategic thinking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-emerald-600">
              <CardContent className="p-8">
                <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                  <Brain className="h-8 w-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Overthinking Reset</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Break free from the endless loop of overthinking. Learn practical techniques to quiet 
                  your mind and make decisions with confidence.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span>Thought pattern analysis</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span>Mental clarity exercises</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span>Decision-making frameworks</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-teal-600">
              <CardContent className="p-8">
                <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-600 transition-colors duration-300">
                  <Target className="h-8 w-8 text-teal-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Strategic Thinking</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Transform reactive thinking into strategic planning. Develop a mindset that sees 
                  opportunities where others see obstacles.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span>Goal clarity sessions</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span>Priority mapping</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <span>Action planning tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-cyan-600">
              <CardContent className="p-8">
                <div className="bg-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors duration-300">
                  <Lightbulb className="h-8 w-8 text-cyan-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Mental Resilience</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Build unshakeable mental strength. Learn to bounce back from setbacks and maintain 
                  clarity under pressure.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                    <span>Stress management techniques</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                    <span>Emotional regulation</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                    <span>Confidence building</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-amber-600">
              <CardContent className="p-8">
                <div className="bg-amber-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-600 transition-colors duration-300">
                  <Heart className="h-8 w-8 text-amber-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Self-Awareness Journey</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Discover your authentic self. Understand your triggers, values, and what truly matters 
                  to you beyond the noise.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span>Values identification</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span>Personality insights</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span>Purpose discovery</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-emerald-600 md:col-span-2 lg:col-span-1">
              <CardContent className="p-8">
                <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors duration-300">
                  <Clock className="h-8 w-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Time Mastery</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Stop wasting time in analysis paralysis. Learn to manage your time effectively and 
                  take decisive action.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span>Productivity systems</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span>Focus techniques</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <span>Energy management</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Success <span className="text-emerald-400">Stories</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real transformations from real people who chose to stop overthinking
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  "Shivanshu helped me break free from years of overthinking. His practical approach 
                  made all the difference. I'm now more decisive and confident in my choices."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Arjun Mehta</h4>
                    <p className="text-sm text-slate-400">Software Engineer, 26</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  "I was stuck in analysis paralysis for months. After working with Shivanshu, 
                  I learned to trust my decisions and take action. Life-changing experience!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Priya Sharma</h4>
                    <p className="text-sm text-slate-400">Marketing Manager, 28</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 hover:border-emerald-500 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  "The mental clarity I gained is priceless. Shivanshu's coaching gave me tools 
                  I use daily. My anxiety levels dropped significantly within weeks."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Rohan Desai</h4>
                    <p className="text-sm text-slate-400">Entrepreneur, 24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Frequently Asked <span className="text-emerald-600">Questions</span>
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about the coaching program
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-emerald-600 transition-colors">
                How does the coaching program work?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                The coaching program consists of personalized one-on-one sessions tailored to your specific needs. 
                We'll work together to identify your overthinking patterns, develop strategies to overcome them, 
                and build sustainable mental clarity practices. Sessions are typically 60 minutes and can be conducted 
                in-person or online based on your preference.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-emerald-600 transition-colors">
                How long does it take to see results?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Most clients notice significant improvements within 3-4 weeks of consistent coaching. However, 
                the transformation journey is unique for everyone. Some clients experience breakthroughs in the 
                first session, while others may take a bit longer. The key is commitment and consistent practice 
                of the techniques we discuss.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-emerald-600 transition-colors">
                What makes your approach different?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Unlike generic self-help advice, my approach is rooted in practical, actionable strategies 
                specifically designed for young professionals and individuals in their 20s and early 30s. 
                I focus on "thinking right" rather than just "thinking less," combining modern psychology 
                with real-world application. Every session is personalized to your unique situation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-emerald-600 transition-colors">
                Is this coaching or therapy?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                This is coaching, not therapy. While therapy often focuses on healing past trauma, 
                coaching is forward-focused on achieving specific goals and developing skills. If you're 
                dealing with clinical mental health issues, I recommend consulting with a licensed therapist. 
                However, if you're looking to overcome overthinking, improve decision-making, and build 
                mental clarity, coaching is perfect for you.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-emerald-600 transition-colors">
                What if I'm not satisfied with the coaching?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Your satisfaction is my priority. I offer a satisfaction guarantee on the first session. 
                If after our initial consultation you don't feel this is the right fit, I'll provide a 
                full refund. My goal is to create a transformative experience, and I'm committed to 
                ensuring you get real value from our work together.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border border-slate-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:text-emerald-600 transition-colors">
                What's included in the coaching package?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed">
                Each coaching package includes weekly one-on-one sessions, personalized worksheets and exercises, 
                email support between sessions, progress tracking tools, and access to exclusive resources. 
                You'll also receive a custom action plan designed specifically for your goals and challenges. 
                Everything is tailored to help you achieve lasting transformation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact/CTA Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold">
                Ready to Transform Your Life?
              </h2>
              <p className="text-xl text-emerald-50 leading-relaxed">
                Book your free 30-minute consultation today and take the first step toward 
                mental clarity and purposeful living.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Call or WhatsApp</p>
                    <a href="tel:+917298888880" className="text-emerald-50 hover:text-white transition-colors">
                      +91 72988 88880
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-emerald-50">shivanshu.ga@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-emerald-50">Online & In-Person Sessions Available</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Book Free Consultation</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name" 
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <Input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com" 
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <Input 
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210" 
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      What brings you here? *
                    </label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me briefly about your challenges with overthinking..." 
                      required
                      className="w-full min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Submit Inquiry
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button 
                      type="button"
                      onClick={openCalendar}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Book Calendar
                    </Button>
                  </div>
                  <p className="text-sm text-slate-500 text-center">
                    100% confidential. No spam, ever.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-emerald-400" />
                <span className="text-2xl font-bold">Shivanshu Goel</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Transforming overthinking into clarity. Helping young minds build mental resilience and purpose.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                    Services
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('testimonials')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                    Testimonials
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('faq')} className="text-slate-400 hover:text-emerald-400 transition-colors">
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <p className="text-slate-400 mb-2">shivanshu.ga@gmail.com</p>
              <p className="text-slate-400 mb-4">+91 72988 88880</p>
              <p className="text-slate-400 text-sm">
                © 2025 Shivanshu Goel. All rights reserved.
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
            <p>Empowering minds, one thought at a time.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110 z-50 animate-bounce"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-8 w-8" />
      </button>

      {/* Calendar Booking Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <Calendar className="h-8 w-8" />
                <div>
                  <h3 className="text-2xl font-bold">Book Your Free Consultation</h3>
                  <p className="text-emerald-100">Choose a time that works best for you</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCalendar(false)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 100px)' }}>
                <div className="space-y-6">
                  {/* Cal.com Embed */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="bg-emerald-50 p-4 border-b border-emerald-100">
                      <h4 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Book via Cal.com
                      </h4>
                      <p className="text-sm text-emerald-700">Select a time that works for you</p>
                    </div>
                    <div className="p-4 bg-slate-50 text-center">
                      <p className="text-slate-600 mb-4">
                        Sign up at <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-semibold underline">cal.com</a> and update your username in the .env file
                      </p>
                      <p className="text-sm text-slate-500 mb-4">
                        Current username: <strong>{CALCOM_USERNAME}</strong>
                      </p>
                      {/* Uncomment when you have Cal.com username */}
                      {/* <iframe
                        src={`https://cal.com/${CALCOM_USERNAME}/30min`}
                        width="100%"
                        height="600"
                        frameBorder="0"
                        title="Book a consultation"
                      ></iframe> */}
                      <Button 
                        onClick={() => window.open(`https://cal.com/${CALCOM_USERNAME}`, '_blank')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        Open Cal.com Booking
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Google Calendar Option */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    <div className="bg-blue-50 p-4 border-b border-blue-100">
                      <h4 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Google Calendar
                      </h4>
                      <p className="text-sm text-blue-700">Or use Google Calendar booking</p>
                    </div>
                    <div className="p-6 text-center bg-slate-50">
                      <p className="text-slate-600 mb-4">
                        Update your Google Calendar booking link in the .env file
                      </p>
                      <Button 
                        onClick={() => window.open(GOOGLE_CALENDAR_LINK, '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Open Google Calendar
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Quick Contact Options */}
                  <div className="bg-slate-50 rounded-xl p-6 text-center space-y-4">
                    <h4 className="text-xl font-bold text-slate-900">Or Contact Directly</h4>
                    <p className="text-slate-600">
                      Prefer a more personal touch? Reach out directly!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                      <Button 
                        onClick={openWhatsApp}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        WhatsApp to Book
                      </Button>
                      <Button 
                        onClick={() => window.location.href = 'tel:+917298888880'}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Phone className="mr-2 h-5 w-5" />
                        Call Now
                      </Button>
                    </div>
                    <div className="pt-6 border-t border-slate-200 mt-6">
                      <p className="text-sm text-slate-500">
                        <strong>Phone:</strong> +91 72988 88880 | <strong>Email:</strong> shivanshu.ga@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
