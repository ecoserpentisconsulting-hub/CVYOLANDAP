import React, { useState } from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { cvOriginalImg } from '../data/professionalData';
import { MessageSquare, Mail, Award, GraduationCap, Globe2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const [activeImageTab, setActiveImageTab] = useState<'card' | 'field'>('card');
  const { data } = useWebsiteData();
  const info = data.info;

  const currentHeroImg = activeImageTab === 'card' ? info.heroImageUser : info.heroImageLandscape;

  // Check if perfil-cv section is visible
  const isPerfilSectionVisible = data.sections.find((s) => s.id === 'perfil-cv')?.isVisible ?? true;

  if (!isPerfilSectionVisible) {
    return null;
  }

  return (
    <section id="perfil-cv" className="relative overflow-hidden pt-6 pb-12 md:py-16 bg-[#f6f2ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: True CV Information */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider text-[#1f5f3f] uppercase">
              <span>{info.name}</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>{info.cip}</span>
              <span aria-hidden="true" className="text-stone-400">·</span>
              <span>{info.location}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1f5f3f] leading-[1.12] [text-wrap:balance]">
              {info.tagline}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl font-normal">
              {info.subtagline}
            </p>

            {/* Core Values */}
            <div className="flex items-center gap-3 text-xs font-semibold text-stone-600 tracking-wide uppercase pt-1">
              {info.coreValues.map((val, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-stone-300">•</span>}
                  <span className="text-[#1f5f3f] font-bold">{val}</span>
                </React.Fragment>
              ))}
            </div>

            {/* Professional Summary */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl pt-1">
              {info.profileSummary}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${info.phoneRaw}?text=${encodeURIComponent(
                  `Hola ${info.name}, me comunico desde su página web para coordinar una consulta técnica sobre sostenibilidad y gestión hídrica.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#1f5f3f] text-white px-6 py-3.5 rounded-full font-bold text-sm shadow-md hover:bg-[#16472f] hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp: {info.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${info.email}?subject=Consulta%20Profesional%20${encodeURIComponent(info.name)}`}
                className="inline-flex items-center gap-2.5 bg-white border border-stone-300 text-stone-800 px-6 py-3.5 rounded-full font-semibold text-sm shadow-sm hover:bg-stone-50 hover:border-stone-400 transition-all active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-[#1f5f3f]" />
                <span>{info.email}</span>
              </a>
            </div>

            {/* Verified Credentials Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-200">
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-[#1f5f3f] shrink-0 mt-0.5" />
                <span className="text-xs text-stone-700 leading-tight">UNSAAC · Ing. Agrónoma Colegiada</span>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#1f5f3f] shrink-0 mt-0.5" />
                <span className="text-xs text-stone-700 leading-tight">Máster en Cambio Climático (Fondo Verde)</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe2 className="w-4 h-4 text-[#1f5f3f] shrink-0 mt-0.5" />
                <span className="text-xs text-stone-700 leading-tight">Consultoría en Cooperación Internacional</span>
              </div>
            </div>

          </div>

          {/* Right Column: Original Image & Presentation Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-md border border-stone-200">
              
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                  Fotografía & Registro
                </span>
                <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveImageTab('card')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeImageTab === 'card'
                        ? 'bg-white text-[#1f5f3f] shadow-xs font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Tarjeta del CV
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImageTab('field')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeImageTab === 'field'
                        ? 'bg-white text-[#1f5f3f] shadow-xs font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Ámbito Territorial
                  </button>
                </div>
              </div>

              {/* Image Frame */}
              <div className="relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 aspect-16/11 flex items-center justify-center">
                <img
                  src={currentHeroImg || cvOriginalImg}
                  alt={`${info.name} - ${info.cip}`}
                  className="w-full h-full object-contain bg-[#f6f1e8]"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== cvOriginalImg && !target.src.endsWith('cv_original.webp')) {
                      target.src = cvOriginalImg;
                    }
                  }}
                />
              </div>

              {/* Bottom bar of image card */}
              <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
                <span className="font-bold text-[#1f5f3f]">
                  {info.cip} · {info.location}
                </span>

                <span className="text-stone-500 font-medium">
                  {info.college}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Verifiable Credentials Strip below Hero Split */}
        <div className="mt-12 pt-8 border-t border-stone-200/80">
          <div className="mb-4">
            <span className="text-xs font-bold text-[#1f5f3f] uppercase tracking-wider">
              Acreditación Oficial & Respaldos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(data.heroCredentials || []).map((cred) => (
              <div key={cred.id} className="bg-white/80 rounded-2xl p-5 border border-stone-200/70 space-y-1">
                <div className="text-xs font-bold text-[#1f5f3f] uppercase tracking-wider">
                  {cred.label}
                </div>
                <div className="text-sm font-bold text-stone-900">
                  {cred.title}
                </div>
                <div className="text-xs text-stone-600">
                  {cred.institution}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
