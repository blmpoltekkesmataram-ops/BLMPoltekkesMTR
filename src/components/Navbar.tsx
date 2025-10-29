import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const navLinks = [
    { label: 'Beranda' },
    { label: 'Profil' },
    { 
      label: 'Struktur', 
      sublinks: [
        { label: 'Struktur BLM' },
        { label: 'Alur Ormawa' },
      ]
    },
    { label: 'Berita' },
    { label: 'Aspirasi' },
    { label: 'Galeri' },
];

interface NavbarProps {
    currentPage: string;
    setPage: (page: string) => void;
    isLoggedIn: boolean;
    onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage, isLoggedIn, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleNavigate = (page: string) => {
      setPage(page);
      setIsOpen(false);
      setOpenSubmenu(null);
      window.scrollTo(0, 0);
  }
  
  const handleSubmenuToggle = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navBgClass = scrolled || isOpen ? 'bg-brand-blue shadow-lg' : 'bg-transparent';
  const navTopClass = isLoggedIn ? 'top-14' : 'top-0';

  return (
    <nav className={`fixed left-0 right-0 z-40 transition-all duration-300 ${navBgClass} ${navTopClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
             <button onClick={() => handleNavigate('Beranda')} className="flex items-center gap-2 text-white text-xl font-bold font-serif tracking-wider">
              <Logo className="h-10 w-10" />
              <span className="hidden sm:inline">BLM POLTEKKES MTR</span>
            </button>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = link.sublinks ? link.sublinks.some(sub => sub.label === currentPage) : currentPage === link.label;
                if (link.sublinks) {
                  return (
                    <div key={link.label} className="relative group">
                      <button className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${isActive ? 'text-white bg-brand-gold/20' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}>
                        {link.label}
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-brand-blue rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                        <div className="py-1">
                          {link.sublinks.map(sublink => (
                            <button key={sublink.label} onClick={() => handleNavigate(sublink.label)} className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white">
                              {sublink.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <button key={link.label} onClick={() => handleNavigate(link.label)} className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${isActive ? 'text-white bg-brand-gold/20' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}>
                    {link.label}
                  </button>
                );
              })}
              {!isLoggedIn && (
                <div className="ml-4">
                   <button
                      onClick={onLoginClick}
                      className="block md:inline-block px-3 py-2 rounded-md text-sm font-medium text-slate-300 bg-brand-gold/20 hover:bg-brand-gold/40 transition-colors"
                    >
                      Login
                    </button>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)} type="button"
              className="bg-white/10 inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-brand-blue">
            {navLinks.map((link) => {
               const isActive = link.sublinks ? link.sublinks.some(sub => sub.label === currentPage) : currentPage === link.label;
               if(link.sublinks) {
                 const isSubmenuOpen = openSubmenu === link.label;
                 return (
                   <div key={link.label}>
                     <button onClick={() => handleSubmenuToggle(link.label)} className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${isActive ? 'text-white bg-brand-gold/20' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}>
                       {link.label}
                       <svg className={`w-4 h-4 transition-transform duration-300 ${isSubmenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                     </button>
                     {isSubmenuOpen && (
                       <div className="pl-4 mt-1 space-y-1">
                         {link.sublinks.map(sublink => (
                            <button key={sublink.label} onClick={() => handleNavigate(sublink.label)} className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${currentPage === sublink.label ? 'text-white bg-brand-gold/20' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}>
                              {sublink.label}
                            </button>
                         ))}
                       </div>
                     )}
                   </div>
                 )
               }
               return (
                <button key={link.label} onClick={() => handleNavigate(link.label)} className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out ${isActive ? 'text-white bg-brand-gold/20' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}>
                  {link.label}
                </button>
               );
            })}
            {!isLoggedIn && (
              <div className="pt-2 px-2">
                <button
                  onClick={onLoginClick}
                  className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-slate-300 bg-brand-gold/20 hover:bg-brand-gold/40 transition-colors"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
