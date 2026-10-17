import React, { useState } from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { andeanLandscapeImg, waterHarvestingImg } from '../data/professionalData';
import { MapPin, ChevronRight, Compass, ShieldCheck } from 'lucide-react';

export const RegionalMapExplorer: React.FC = () => {
  const { data } = useWebsiteData();
  const isSectionVisible = data.sections.find((s) => s.id === 'territorio')?.isVisible ?? true;
  if (!isSectionVisible) return null;

  const [activeZoneId, setActiveZoneId] = useState<string>('microcuenca-lucre');
  const selectedZone = data.regionalZones.find((z) => z.id === activeZoneId) || data.regionalZones[0];

  return (
    <section id="territorio" className="py-16 md:py-24 bg-[#f6f2ea] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        {(() => {
          const header = data.sectionHeaders?.['territorio'] || {
            kicker: 'Presencia Territorial y Cuencas Hidrográficas',
            title: 'Ámbito de acción e investigación en el territorio andino',
            subtitle: 'Experiencia técnica de campo en pisos altitudinales de Cusco, con énfasis en la microcuenca de Lucre, el sitio Ramsar Lucre-Huacarpay y valles interandinos.'
          };

          return (
            <div className="max-w-3xl mb-12">
              <div className="text-xs font-semibold tracking-wider text-[#1f5f3f] uppercase mb-2">
                {header.kicker}
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight [text-wrap:balance]">
                {header.title}
              </h2>
              <p className="mt-3 text-stone-600 text-sm sm:text-base">
                {header.subtitle}
              </p>
            </div>
          );
        })()}

        {/* Interactive Layout: Territory Zone List + Zone Inspector Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Zone Selector Buttons (Left 6 Cols) */}
          <div className="lg:col-span-6 space-y-3">
            {data.regionalZones.map((zone) => {
              const isActive = zone.id === activeZoneId;
              return (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setActiveZoneId(zone.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    isActive
                      ? 'bg-white border-[#1f5f3f] shadow-md ring-1 ring-[#1f5f3f]/30'
                      : 'bg-white/70 border-stone-200 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#1f5f3f]' : 'bg-stone-300'}`} />
                      <span className="font-bold text-sm sm:text-base text-stone-900">
                        {zone.name}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 flex items-center gap-3">
                      <span>{zone.province}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-stone-700">{zone.altitudeRange}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${isActive ? 'rotate-90 text-[#1f5f3f]' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Zone Showcase Card (Right 6 Cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#1f5f3f]">
                  Microcuenca / Ámbito
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                  {selectedZone.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium text-stone-500 block">Piso Ecológico</span>
                <span className="text-sm font-bold text-stone-800">{selectedZone.altitudeRange}</span>
              </div>
            </div>

            {/* Visual altitude & landscape card */}
            <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-stone-100 border border-stone-200">
              <img
                src={
                  selectedZone.id === 'microcuenca-lucre'
                    ? waterHarvestingImg
                    : andeanLandscapeImg
                }
                alt={selectedZone.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex items-end p-4">
                <div className="text-white">
                  <div className="text-xs font-bold text-amber-300">Enfoque de Intervención:</div>
                  <div className="text-sm font-medium">{selectedZone.focusArea}</div>
                </div>
              </div>
            </div>

            {/* Highlight and Key Impact */}
            <div className="space-y-3">
              <div className="bg-[#faf8f5] p-4 rounded-2xl border border-stone-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
                  Respaldo Técnico en el Territorio:
                </span>
                <p className="text-sm text-stone-800 leading-relaxed">
                  {selectedZone.highlight}
                </p>
              </div>
            </div>

            {/* Quick Action Button for Zone Consultation */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500">¿Requiere consultoría en esta zona?</span>
              <a
                href={`https://wa.me/${data.info.phoneRaw}?text=${encodeURIComponent(
                  `Hola ${data.info.name}, tengo una consulta para un proyecto agrícola o de gestión hídrica en la zona de ${selectedZone.name} (${selectedZone.province}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1f5f3f] hover:underline"
              >
                <span>Consultar por esta zona</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
