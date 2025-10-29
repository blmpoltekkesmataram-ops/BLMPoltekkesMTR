import React, { useState, useEffect, useRef } from 'react';

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
  bgClass?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children, bgClass = 'bg-slate-50' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);


  const paddingTopClass = ['profil', 'struktur', 'leadership', 'ormawa', 'berita', 'aspirasi', 'galeri', 'struktur-blm', 'alur-ormawa'].includes(id) ? 'pt-28 sm:pt-32 pb-16 sm:pb-20' : 'py-16 sm:py-20';

  return (
    <section 
      ref={sectionRef} 
      id={id} 
      className={`transition-opacity duration-1000 ease-out ${bgClass} ${paddingTopClass} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">{title}</h2>
          <div className="mt-4 w-24 h-1 bg-brand-gold mx-auto rounded"></div>
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;