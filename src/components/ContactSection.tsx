import React, { useState } from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { Phone, Mail, MapPin, MessageSquare, Check, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { data } = useWebsiteData();

  // Check if contacto section is visible
  const isSectionVisible = data.sections.find((s) => s.id === 'contacto')?.isVisible ?? true;
  if (!isSectionVisible) return null;

  const info = data.info;

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    location: '',
    topic: 'Gestión Integral de Recursos Hídricos (GIRH)',
    details: '',
  });

  const [submittedStatus, setSubmittedStatus] = useState<'idle' | 'success'>('idle');

  const topics = [
    'Gestión Integral de Recursos Hídricos (GIRH)',
    'Sostenibilidad y Adaptación al Cambio Climático',
    'Agroecología Andina y Manejo de Suelos',
    'Turismo Rural Comunitario y Agroturismo',
    'Coordinación y Formulación de Proyectos de Cooperación',
    'Otra consulta agronómica o ambiental',
  ];

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola ${info.name}, le escribo desde su página web:\n- Nombre: ${formData.name || 'No especificado'}\n- Organización/Predio: ${formData.organization || 'Particular'}\n- Ubicación: ${formData.location || info.location}\n- Tema: ${formData.topic}\n- Teléfono de contacto: ${formData.phone || 'El mismo de este chat'}\n- Mensaje: ${formData.details || 'Deseo coordinar una consulta técnica.'}`;
    
    const url = `https://wa.me/${info.phoneRaw}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmittedStatus('success');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`Consulta Técnica: ${formData.topic}`);
    const body = encodeURIComponent(
      `Estimada ${info.name},\n\nMi nombre es ${formData.name || ''} de ${formData.organization || ''} en ${formData.location || info.location}.\n\nRequiero información sobre: ${formData.topic}\nTeléfono: ${formData.phone}\nDetalles:\n${formData.details}\n\nAtentamente,\n${formData.name}`
    );
    window.location.href = `mailto:${info.email}?subject=${subject}&body=${body}`;
    setSubmittedStatus('success');
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-white border-t border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        {(() => {
          const header = data.sectionHeaders?.['contacto'] || {
            kicker: 'Contacto Directo & Coordinación de Visitas',
            title: 'Inicie su proyecto agrícola o hídrico hoy',
            subtitle: `Canales de comunicación directa con la ${info.name} (${info.cip}). Evaluamos solicitudes en todo el ámbito regional y de cooperación técnica.`
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Direct Cards (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary WhatsApp Card */}
            <div className="bg-[#1f5f3f] text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="inline-flex p-3 bg-white/10 rounded-2xl backdrop-blur-xs">
                <MessageSquare className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider block">
                  Canal Prioritario & Rápido
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  WhatsApp Directo
                </h3>
                <p className="text-xs text-emerald-100 mt-1 leading-relaxed">
                  Para consultas técnicas inmediatas, envío de términos de referencia (TDR), fotos de fuentes o documentos preliminares.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${info.phoneRaw}?text=${encodeURIComponent(
                    `Hola ${info.name}, deseo consultar sobre sus servicios profesionales.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-white text-[#1f5f3f] py-3.5 px-6 rounded-full font-bold text-sm shadow-md hover:bg-emerald-50 transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chatear al {info.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Email & Details Card */}
            <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-5">
              
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 shrink-0">
                  <Mail className="w-5 h-5 text-[#1f5f3f]" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase block">Correo Electrónico</span>
                  <a
                    href={`mailto:${info.email}`}
                    className="text-sm sm:text-base font-bold text-stone-900 hover:text-[#1f5f3f] transition-colors break-all"
                  >
                    {info.email}
                  </a>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    Recepción de convocatorias y propuestas formales
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 shrink-0">
                  <MapPin className="w-5 h-5 text-[#1f5f3f]" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase block">Sede & Desplazamiento</span>
                  <span className="text-sm font-bold text-stone-900 block">
                    {info.location}
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    Atención en campo y proyectos en el ámbito andino
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-white rounded-xl border border-stone-200 shrink-0">
                  <Clock className="w-5 h-5 text-[#1f5f3f]" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-stone-500 uppercase block">Horario de Atención</span>
                  <span className="text-sm font-semibold text-stone-800 block">
                    Lunes a Viernes: 8:30 am - 6:00 pm
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-0.5">
                    Salidas a campo y visitas técnicas previa coordinación
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Contact Form (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-[#faf8f5] rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
            
            <div className="border-b border-stone-200 pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1f5f3f]">
                Formulario de Consulta Técnica
              </span>
              <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                Envíe los datos de su requerimiento o proyecto
              </h3>
            </div>

            {submittedStatus === 'success' ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#1f5f3f] text-white flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-950">
                  ¡Mensaje preparado con éxito!
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Se ha generado la consulta técnica para {info.name}. Le responderemos a la brevedad.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmittedStatus('idle')}
                    className="text-xs font-bold text-stone-700 hover:underline"
                  >
                    Enviar otra consulta
                  </button>
                  <a
                    href={`https://wa.me/${info.phoneRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#1f5f3f] hover:underline"
                  >
                    Abrir WhatsApp directo
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppSend} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Nombre y Apellidos *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Ing. Juan Pérez / Representante"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Organización / Institución / Comunidad
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. ONG / Municipalidad / Asociación"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1f5f3f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Teléfono de Contacto
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej. 984 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                      Ubicación del Proyecto / Microcuenca
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Lucre / Quispicanchi / Urubamba"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1f5f3f]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Línea de Especialidad *
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1f5f3f]"
                  >
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Detalle del requerimiento o consulta técnica
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describa el objetivo de la consultoría, ámbito geográfico o tipo de asistencia técnica requerida..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1f5f3f]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1f5f3f] text-white py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm shadow-md hover:bg-[#16472f] transition-all active:scale-[0.98]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enviar consulta por WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailSend}
                    className="inline-flex items-center justify-center gap-2 bg-white border border-stone-300 text-stone-800 py-3.5 px-6 rounded-full font-semibold text-xs sm:text-sm shadow-xs hover:bg-stone-50 transition-all active:scale-[0.98]"
                  >
                    <Mail className="w-4 h-4 text-[#1f5f3f]" />
                    <span>Enviar por Correo</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
