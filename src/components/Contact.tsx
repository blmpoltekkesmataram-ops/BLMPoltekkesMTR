import React from 'react';
import SectionWrapper from './SectionWrapper';

const Contact: React.FC = () => {
  return (
    <SectionWrapper id="kontak" title="Hubungi Kami" bgClass="bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-slate-700 mb-8">
          Punya aspirasi atau pertanyaan? Jangan ragu untuk menghubungi kami melalui saluran berikut.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          <a href="mailto:blmpoltekkesmtr@gmail.com" className="group flex items-center text-lg font-medium text-brand-blue hover:text-brand-gold transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-slate-400 group-hover:text-brand-gold transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            blmpoltekkesmtr@gmail.com
          </a>
          <a href="https://www.instagram.com/blmpoltekkesmtr" target="_blank" rel="noopener noreferrer" className="group flex items-center text-lg font-medium text-brand-blue hover:text-brand-gold transition-colors duration-300">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-slate-400 group-hover:text-brand-gold transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 21.172a4 4 0 01-5.656 0l-4.242-4.242a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 0L10 16.172l4.828-4.828a1 1 0 011.414 0l1.414 1.414a1 1 0 010 1.414l-4.242 4.242zM12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>
            @blmpoltekkesmtr
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
