import React from 'react';
import Logo from './Logo';

const SocialLink: React.FC<{ href: string, icon: React.ReactNode, label: string }> = ({ href, icon, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center text-slate-300 hover:text-brand-gold transition-colors duration-300">
        {icon}
        <span className="ml-3">{label}</span>
    </a>
);


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const icons = {
      whatsapp: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.908 6.161l.219.324-1.125 4.108 4.224-1.086.316.188z" /></svg>,
      email: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      instagram: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
      facebook: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" /></svg>,
      tiktok: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.86-.95-6.69-2.8-1.83-1.85-2.76-4.32-2.8-6.94-.03-2.51.01-5.02-.04-7.53-.04-1.54-.48-3.07-1.29-4.4-1.31-2.14-3.56-3.3-5.91-3.31V.02c1.52.01 3.04.01 4.57.03 1.52.02 3.04.02 4.56.02.01 0 .01 0 .01 0z" /></svg>,
      linktree: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>,
  };

  return (
    <footer className="bg-brand-blue text-slate-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
            <Logo className="h-20 w-20 mb-4" />
            <p className="font-semibold text-white text-lg">Badan Legislatif Mahasiswa</p>
            <p className="font-semibold text-white text-lg">Poltekkes Kemenkes Mataram</p>
        </div>

        <div className="mt-10 pt-10 border-t border-slate-700 grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          {/* Contact Us Section */}
          <div className="text-center md:text-left">
              <h3 className="font-bold text-white tracking-wider mb-4">CONTACT US</h3>
              <div className="space-y-4">
                  <SocialLink href="https://wa.me/6287848983964" icon={icons.whatsapp} label="Amel : +62 878-4898-3964" />
                  <SocialLink href="https://wa.me/6287804141843" icon={icons.whatsapp} label="Sendy : +62 878-0414-1843" />
              </div>
          </div>
          
          {/* Social Media Section */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-white tracking-wider mb-4">MEDIA SOSIAL</h3>
             <div className="space-y-4">
                <SocialLink href="mailto:blmpoltekkesmataram@gmail.com" icon={icons.email} label="blmpoltekkesmataram@gmail.com" />
                <SocialLink href="https://instagram.com/blmpoltekkesmtr" icon={icons.instagram} label="@blmpoltekkesmtr" />
                <SocialLink href="https://www.facebook.com/share/168p5H5E5p/" icon={icons.facebook} label="BLM Poltekkes Mataram" />
                <SocialLink href="https://tiktok.com/@blmpolkesram" icon={icons.tiktok} label="@blmpolkesram" />
                <SocialLink href="https://linktr.ee/BLM_POLTEKKES_MATARAM" icon={icons.linktree} label="Linktree" />
              </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-700 text-center">
             <p className="text-sm text-slate-400">
              &copy; {currentYear} BLM Poltekkes Kemenkes Mataram. All Rights Reserved.
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;