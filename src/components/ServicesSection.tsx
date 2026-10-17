import React, { useState } from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { Service } from '../data/professionalData';
import {
  Droplets,
  Mountain,
  Sprout,
  Compass,
  Users,
  Check,
  ArrowRight,
  X,
  MessageSquare
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);
  const { data } = useWebsiteData();

  // Check if services section is marked as visible
  const isSectionVisible = data.sections.find((s) => s.id === 'servicios')?.isVisible ?? true;

  if (!isSectionVisible) return null;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-6 h-6 text-[#1f5f3f]" />;
      case 'Mountain': return <Mountain className="w-6 h-6 text-[#1f5f3f]" />;
      case 'Sprout': return <Sprout className="w-6 h-6 text-[#1f5f3f]" />;
      case 'Compass': return <Compass className="w-6 h-6 text-[#1f5f3f]" />;
      case 'Users': return <Users className="w-6 h-6 text-[#1f5f3f]" />;
      default: return <Droplets className="w-6 h-6 text-[#1f5f3f]" />;
    }
  };

  return (
    <section id="servicios" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        {(() => {
          const header = data.sectionHeaders?.['servicios'] || {
            kicker: 'Servicios Profesionales Acreditados',
            title: 'Consultoría técnica en agronomía, cuencas y sostenibilidad',
            subtitle: 'Servicios profesionales directos formulados conforme a la normativa técnica peruana (ANA, MIDAGRI) y estándares internacionales de cooperación.'
          };

          return (
            <div className="max-w-3xl mb-12">
              <div className="text-xs font-semibold tracking-wider text-[#1f5f3f] uppercase mb-2">
                {header.kicker}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight [text-wrap:balance]">
                {header.title}
              </h2>
              <p className="mt-3 text-base text-stone-600">
                {header.subtitle}
              </p>
            </div>
          );
        })()}

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.services.map((service) => (
            <div
              key={service.id}
              className="bg-[#faf8f5] rounded-3xl p-6 sm:p-7 border border-stone-200/90 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:border-stone-300 relative group"
            >
              <div>
                {/* Header of card with icon */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center shadow-xs">
                    {getIcon(service.iconName)}
                  </div>
                  
                  <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-stone-200">
                    CIP 90161
                  </span>
                </div>

                <h3 className="text-lg font-bold text-stone-900 mb-2 leading-snug">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 mb-5 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Deliverables snippet */}
                <div className="space-y-2 mb-6 pt-3 border-t border-stone-200/60">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                    Entregables Principales:
                  </div>
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-[#1f5f3f] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom trigger */}
              <div className="pt-4 border-t border-stone-200/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveModalService(service)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1f5f3f] hover:text-emerald-800 transition-colors"
                >
                  <span>Ver ficha y alcance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/${data.info.phoneRaw}?text=${encodeURIComponent(
                    `Hola ${data.info.name}, solicito información detallada sobre el servicio: "${service.title}".`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-[#1f5f3f] hover:border-[#1f5f3f] transition-colors"
                  title="Consultar por WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Service Details */}
        {activeModalService && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setActiveModalService(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    {getIcon(activeModalService.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#1f5f3f] uppercase tracking-wider">
                      Ficha Técnica de Servicio
                    </span>
                    <h3 className="text-xl font-extrabold text-stone-900 leading-tight">
                      {activeModalService.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModalService(null)}
                  className="p-2 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p>{activeModalService.fullDesc}</p>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
                  <div className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Dirigido a:
                  </div>
                  <p className="text-stone-600 text-xs">
                    {activeModalService.targetEntities}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Entregables Técnicos Oficiales:
                  </div>
                  <ul className="space-y-2">
                    {activeModalService.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <Check className="w-4 h-4 text-[#1f5f3f] shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalService(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cerrar
                </button>

                <a
                  href={`https://wa.me/${data.info.phoneRaw}?text=${encodeURIComponent(
                    `Hola ${data.info.name}, deseo contratar o coordinar una asesoría para el servicio: "${activeModalService.title}".`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1f5f3f] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#16472f] shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Coordinar Servicio por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
