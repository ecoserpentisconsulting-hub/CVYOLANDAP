import React from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { GraduationCap, Award, ShieldCheck, MessageSquare, CheckCircle2 } from 'lucide-react';

export const TrajectorySection: React.FC = () => {
  const { data } = useWebsiteData();

  // Check if trayectoria section is visible
  const isSectionVisible = data.sections.find((s) => s.id === 'trayectoria')?.isVisible ?? true;
  
  if (!isSectionVisible) return null;

  const info = data.info;

  return (
    <section id="trayectoria" className="py-16 md:py-24 bg-[#faf8f5] border-t border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(() => {
          const header = data.sectionHeaders?.['trayectoria'] || {
            kicker: 'Curriculum Vitae & Trayectoria Acreditada',
            title: 'Formación académica rigurosa y experiencia profesional',
            subtitle: 'Información respaldada por la Universidad Nacional de San Antonio Abad del Cusco, el Colegio de Ingenieros del Perú y el Fondo Verde Institute.'
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

        {/* Grid: Academic & Professional Timeline + Official Credentials Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Timeline Cards (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {data.education.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-2 hover:border-stone-300 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1f5f3f] uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                    {item.category}
                  </span>
                  <span className="text-stone-500 font-bold">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 leading-snug">
                  {item.title}
                </h3>

                <div className="text-xs font-semibold text-stone-600">
                  {item.institution}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed pt-1">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Credentials Card (Right 5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6 sticky top-24">
              <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#1f5f3f]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base leading-tight">
                    Habilitación Profesional
                  </h3>
                  <p className="text-xs text-stone-500">
                    {info.college}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Número de Registro:</span>
                  <span className="font-bold text-stone-900 font-mono text-sm">{info.cip}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Consejo Departamental:</span>
                  <span className="font-semibold text-stone-800">Cusco</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Título Profesional:</span>
                  <span className="font-semibold text-stone-800">{info.profession}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Alma Mater:</span>
                  <span className="font-semibold text-stone-800 text-right max-w-[200px]">UNSAAC</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-500">Posgrado:</span>
                  <span className="font-semibold text-stone-800 text-right max-w-[200px]">Fondo Verde Institute</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${info.phoneRaw}?text=${encodeURIComponent(
                    `Hola ${info.name}, solicito información o confirmación de su disponibilidad para una consultoría técnica.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#1f5f3f] text-white py-3 rounded-full text-xs font-bold hover:bg-[#16472f] shadow-md transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contactar a la Profesional</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* FAQs Accordion Strip */}
        {data.faqs && data.faqs.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="mb-8">
              <span className="text-xs font-bold text-[#1f5f3f] uppercase tracking-wider">
                Respuestas a Dudas Habituales
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1">
                Preguntas Frecuentes sobre Consultoría Agrónoma
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#1f5f3f] uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                      {faq.category || 'Consulta'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {faq.question}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed pt-1">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
