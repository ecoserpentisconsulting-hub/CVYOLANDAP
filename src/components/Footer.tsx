import React from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { ArrowUp, ShieldCheck, Mail, MessageSquare, Edit3 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setIsEditorOpen } = useWebsiteData();
  const info = data.info;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const visibleLinks = data.sections.filter((s) => s.isVisible);

  return (
    <footer className="bg-stone-900 text-stone-300 text-xs border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Specialty */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-white">
                {info.name}
              </span>
              <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                {info.cip}
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm max-w-md leading-relaxed">
              {info.tagline}. {info.subtagline}.
            </p>
            {info.footerNotice && (
              <p className="text-stone-500 text-[11px] leading-relaxed max-w-md pt-1 border-t border-stone-800">
                {info.footerNotice}
              </p>
            )}
            <div className="flex items-center gap-2 text-stone-400 text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{info.college}</span>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsEditorOpen(true)}
                className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white bg-stone-800 px-3 py-1.5 rounded-lg text-xs transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Modificar Contenido o Retirar Pestañas</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation (Only visible tabs) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Pestañas Activas
            </h4>
            <ul className="space-y-2">
              {visibleLinks.map((sec) => (
                <li key={sec.id}>
                  <a href={sec.href} className="hover:text-emerald-400 transition-colors">
                    {sec.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Contacto Directo
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`https://wa.me/${info.phoneRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp: {info.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${info.email}`}
                  className="flex items-center gap-2 hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span>{info.email}</span>
                </a>
              </li>
              <li className="text-stone-400 pt-1 leading-relaxed">
                {info.location}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {info.name} · {info.cip}. Todos los derechos reservados.
          </div>
          <button
            onClick={scrollToTop}
            type="button"
            className="flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors"
          >
            <span>Subir al inicio</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
