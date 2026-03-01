import { useState, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/logo';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Oportunidades', href: '/oportunidades' },
    { name: 'Para Familias', href: '/familias' },
    { name: 'Modelo Institucional', href: '/modelo-institucional' },
  ];

  const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's an external link or a different page, don't prevent default
    if (href.startsWith('/')) return;

    // Only scroll if we are on the landing page
    if (window.location.pathname !== '/') return;

    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div 
        className={cn(
          "w-full max-w-5xl rounded-full transition-all duration-300 border bg-background-card/90 backdrop-blur-md shadow-sm",
          isScrolled 
            ? "border-primary/20 shadow-md" 
            : "border-border-soft"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 md:px-8">
          {/* Logo */}
          <Link to="/" onClick={(e) => scrollToSection(e as any, '#hero')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo />
            <span className="px-2 py-0.5 rounded-md bg-primary-badge text-primary text-[10px] font-bold tracking-wider">BETA</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-background-base rounded-full p-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => scrollToSection(e as any, link.href)}
                className="text-sm font-medium text-text-secondary hover:text-primary hover:bg-background-card px-4 py-1.5 rounded-full transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button 
                className="hidden md:flex bg-primary hover:bg-primary-dark text-white rounded-full px-6 h-10 shadow-md shadow-primary/20"
              >
                Acceso Institucional
              </Button>
            </Link>
            
            <button
              className="md:hidden p-2 text-text-primary hover:bg-black/5 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-4 right-4 bg-background-card rounded-2xl shadow-2xl border border-border-soft p-6 md:hidden z-50 overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => {
                    scrollToSection(e as any, link.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-lg font-medium py-3 px-4 rounded-xl text-text-primary hover:bg-background-base hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border-soft my-2" />
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full rounded-xl py-4 bg-primary hover:bg-primary-dark text-white">
                  Acceso Institucional
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
