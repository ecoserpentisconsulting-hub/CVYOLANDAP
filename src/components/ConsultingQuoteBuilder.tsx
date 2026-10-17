import React, { useState } from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { FileSpreadsheet, CheckCircle2, Clock, Send, MessageSquare, Sparkles, ChevronRight } from 'lucide-react';

export const ConsultingQuoteBuilder: React.FC = () => {
  const { data } = useWebsiteData();
  const isSectionVisible = data.sections.find((s) => s.id === 'cotizador')?.isVisible ?? true;
  if (!isSectionVisible) return null;

  const [selectedServiceId, setSelectedServiceId] = useState<string>(data.services[0]?.id || 'girh-servicios');
  const [altitudeZone, setAltitudeZone] = useState<string>('valle');
  const [scaleSize, setScaleSize] = useState<string>('mediana');
  const [clientType, setClientType] = useState<string>('asociacion');

  const activeService = data.services.find((s) => s.id === selectedServiceId) || data.services[0];

  const zoneInfo: Record<string, { label: string; desc: string }> = {
    valle: {
      label: 'Valle Interandino (2,400 - 3,200 msnm)',
      desc: 'Clima templado, cultivos intensivos de maíz gigante, frutales y hortalizas bajo riego.',
    },
    quechua: {
      label: 'Zona Quechua / Suni (3,200 - 3,800 msnm)',
      desc: 'Laderas de pendiente moderada a alta, papas nativas, quinua y cereales andinos.',
    },
    puna: {
      label: 'Cabeceras de Cuenca / Puna (>3,800 msnm)',
      desc: 'Área prioritaria para siembra y cosecha de agua (cochas rústicas), pastos naturales y camélidos.',
    },
  };

  const scaleInfo: Record<string, { label: string; time: string }> = {
    pequena: { label: 'Predio Individual / Familiar (Hasta 5 ha)', time: '2 a 3 semanas' },
    mediana: { label: 'Asociación / Cooperativa (5 a 30 ha)', time: '4 a 6 semanas' },
    comunal: { label: 'Comunidad Campesina / Sector (>30 ha)', time: '6 a 8 semanas' },
  };

  const clientTypeLabels: Record<string, string> = {
    asociacion: 'Asociación de Productores / Cooperativa',
    comunidad: 'Comunidad Campesina / Comité de Regantes',
    privado: 'Propietario Privado / Finca Agrícola',
    publico: 'Municipalidad / Entidad de Desarrollo',
  };

  const whatsappMessage = `Hola ${data.info.name}, deseo solicitar una cotización técnica:\n- Servicio: ${activeService.title}\n- Tipo de solicitante: ${clientTypeLabels[clientType]}\n- Zona: ${zoneInfo[altitudeZone].label}\n- Escala: ${scaleInfo[scaleSize].label}\n¿Podríamos programar una llamada o visita de diagnóstico?`;

  return (
    <section id="cotizador" className="py-16 md:py-24 bg-white border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {(() => {
          const header = data.sectionHeaders?.['cotizador'] || {
            kicker: 'Diagnóstico Rápido y Alcance de Trabajo',
            title: 'Configure el alcance de su consultoría agronómica',
            subtitle: 'Seleccione el tipo de asesoría, ubicación y dimensión para conocer los entregables técnicos recomendados y el cronograma estimado.'
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Service Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Paso 1. Seleccione el Servicio Técnico Requerido
              </label>
              <div className="space-y-2">
                {data.services.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                      selectedServiceId === s.id
                        ? 'border-[#1f5f3f] bg-emerald-50/40 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-stone-900">{s.title}</div>
                      <div className="text-xs text-stone-500 mt-0.5 line-clamp-1">{s.shortDesc}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                      selectedServiceId === s.id ? 'text-[#1f5f3f] rotate-90' : 'text-stone-400'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Zone & Altitude */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                Paso 2. Altitud y Microclima del Terreno
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {Object.entries(zoneInfo).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAltitudeZone(key)}
                    className={`p-3 text-left rounded-xl border transition-all text-xs ${
                      altitudeZone === key
                        ? 'border-[#1f5f3f] bg-emerald-50/60 font-bold text-stone-900 shadow-xs'
                        : 'border-stone-200 text-stone-600 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="font-bold mb-1 text-stone-900">{val.label.split('(')[0]}</div>
                    <div className="text-[11px] text-stone-500 font-normal">({val.label.split('(')[1]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Scale Size & Client Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Paso 3. Dimensión / Escala
                </label>
                <select
                  value={scaleSize}
                  onChange={(e) => setScaleSize(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1f5f3f]"
                >
                  {Object.entries(scaleInfo).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  Paso 4. Tipo de Organización
                </label>
                <select
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1f5f3f]"
                >
                  {Object.entries(clientTypeLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Scope Preview Card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-[#faf8f5] rounded-2xl p-6 border border-stone-200/90 shadow-sm space-y-6">
            
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1f5f3f]">
                Propuesta de Alcance y Ficha Técnica
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-stone-600">
                <Clock className="w-3.5 h-3.5 text-[#1f5f3f]" />
                <span>{scaleInfo[scaleSize].time}</span>
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-stone-900">
                {activeService.title}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {activeService.fullDesc}
              </p>
            </div>

            {/* Deliverables Checklist */}
            <div className="space-y-2 bg-white p-4 rounded-xl border border-stone-200/70">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                Entregables Técnicos Certificados (Firma CIP 90161):
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {activeService.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#1f5f3f] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Geographical considerations */}
            <div className="text-xs text-stone-600 p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/50">
              <span className="font-bold text-emerald-900 block mb-0.5">
                Consideración territorial para {zoneInfo[altitudeZone].label.split('(')[0]}:
              </span>
              <span>{zoneInfo[altitudeZone].desc}</span>
            </div>

            {/* WhatsApp Direct Action Button */}
            <a
              href={`https://wa.me/${data.info.phoneRaw}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#1f5f3f] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:bg-[#16472f] transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitar Cotización Formal por WhatsApp</span>
            </a>

            <p className="text-[11px] text-center text-stone-500">
              Respuesta técnica en menos de 24 horas hábiles · Atención personalizada
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
