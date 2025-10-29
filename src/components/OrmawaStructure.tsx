import React from 'react';
import SectionWrapper from './SectionWrapper';

const OrgBox: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
  <div className={`border-2 border-slate-800 bg-white shadow-md py-3 px-4 rounded-md text-center font-semibold text-brand-blue transition-all duration-300 hover:scale-105 hover:shadow-xl ${className}`}>
    {name}
  </div>
);

const LegendItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-4 text-sm md:text-base">{children}</div>
);

const OrmawaStructure: React.FC = () => {
  return (
    <SectionWrapper id="ormawa" title="Struktur Hubungan Ormawa" bgClass="bg-white">
      <div className="max-w-4xl mx-auto p-4 md:p-8 bg-slate-50 rounded-lg shadow-xl border-t-4 border-brand-gold">
        {/* Chart Area using relative positioning for line accuracy */}
        <div className="relative w-full h-[450px] font-sans">
          {/* Organization Boxes - Placed with absolute positioning for precision */}
          <div className="absolute top-8 left-4 w-28"><OrgBox name="BLM" /></div>
          <div className="absolute top-8 right-4 w-28"><OrgBox name="BEM" /></div>
          <div className="absolute top-48 left-1/2 -translate-x-[11rem] w-28"><OrgBox name="HMJ" /></div>
          <div className="absolute top-48 right-4 w-28"><OrgBox name="UKM" /></div>
          <div className="absolute top-80 left-1/2 -translate-x-[11rem] w-28"><OrgBox name="HIMA Prodi" /></div>

          {/* --- Connecting Lines --- */}
          {/* Solid Line: BLM -> BEM (LPJ) */}
          <div className="absolute top-[3.7rem] left-[calc(4px+7rem)] right-[calc(4px+7rem)] h-px border-t-2 border-solid border-slate-800"></div>
          {/* Dashed Line: BEM -> BLM (Pengawasan) */}
          <div className="absolute top-[4.3rem] left-[calc(4px+7rem)] right-[calc(4px+7rem)] h-px border-t-2 border-dashed border-slate-800"></div>
          
          {/* Solid Lines: BEM -> HMJ/UKM Tree */}
          <div className="absolute top-[6.3rem] right-[calc(4px+3.5rem)] w-px h-[5rem] bg-slate-800"></div>
          <div className="absolute top-[11.3rem] right-[calc(4px)] left-[calc(50%-11rem+3.5rem)] h-px bg-slate-800"></div>
          <div className="absolute top-[11.3rem] left-1/2 -translate-x-[7.5rem] w-px h-[1rem] bg-slate-800"></div>
          
          {/* Solid Line: HMJ -> HIMA Prodi */}
          <div className="absolute top-[15.3rem] left-1/2 -translate-x-[7.5rem] w-px h-[4rem] bg-slate-800"></div>

          {/* Dashed Lines: BLM -> HMJ & HIMA Prodi (Pengawasan) */}
          <div className="absolute top-[6.3rem] left-[calc(4px+3.5rem)] w-px h-[10rem] border-l-2 border-dashed border-slate-800"></div>
          <div className="absolute top-[13.3rem] left-[calc(4px+3.5rem)] right-[calc(50%-7.5rem+1px)] h-px border-t-2 border-dashed border-slate-800"></div>
          <div className="absolute top-[21.3rem] left-[calc(4px+3.5rem)] right-[calc(50%-7.5rem+1px)] h-px border-t-2 border-dashed border-slate-800"></div>
        </div>

        {/* Legend */}
        <div className="mt-8 pt-8 border-t-2 border-slate-200">
          <h3 className="text-xl font-bold text-brand-blue mb-6">Keterangan:</h3>
          <div className="space-y-4 text-slate-700">
            <LegendItem>
              <div className="w-12 h-6 border-2 border-slate-800 rounded bg-white"></div>
              <span>: Organisasi</span>
            </LegendItem>
            <LegendItem>
              <div className="w-12 h-px border-b-2 border-slate-800"></div>
              <span>: Laporan Pertanggung Jawaban</span>
            </LegendItem>
            <LegendItem>
              <div className="w-12 h-px border-b-2 border-dashed border-slate-800"></div>
              <span>: Pengawasan</span>
            </LegendItem>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default OrmawaStructure;
