import React, { useState } from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data } = useWebsiteData();

  // Only show navigation links whose section is marked as visible
  const visibleNavLinks = data.sections.filter((s) => s.isVisible);

  return (
    <header className="sticky top-0 z-40 bg-[#f6f2eae6] backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          
          {/* Brand Element */}
          <a
            href="#"
            className="flex items-baseline gap-2 text-stone-900 group whitespace-nowrap shrink-0"
          >
            <span className="font-serif font-bold text-lg md:text-xl tracking-tight text-[#1f5f3f] group-hover:text-emerald-800 transition-colors">
              {data.info.name}
            </span>
            <span className="text-xs font-semibold tracking-wider text-stone-500 uppercase hidden sm:inline">
              • {data.info.cip}
            </span>
          </a>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-semibold text-stone-700">
            {visibleNavLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="hover:text-[#1f5f3f] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-stone-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Primary Action Button (WhatsApp) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${data.info.phoneRaw}?text=${encodeURIComponent(
                `Hola ${data.info.name}, deseo consultar sobre sus servicios profesionales en agronomía y gestión hídrica.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1f5f3f] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-sm hover:bg-[#16472f] hover:shadow-md transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: {data.info.phoneDisplay}</span>
            </a>
          </div>

          {/* Mobile buttons */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`https://wa.me/${data.info.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="p-2 text-white bg-[#1f5f3f] rounded-full shadow-sm hover:bg-[#16472f]"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-stone-700 hover:text-stone-900 focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#f9f7f2] px-4 pt-3 pb-6 space-y-3">
          {visibleNavLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 text-base font-semibold text-stone-800 hover:text-[#1f5f3f] border-b border-stone-200/50"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3">
            <a
              href={`https://wa.me/${data.info.phoneRaw}?text=${encodeURIComponent(
                `Hola ${data.info.name}, deseo consultar sobre sus servicios profesionales.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#1f5f3f] text-white py-3 rounded-xl text-xs font-bold shadow-md hover:bg-[#16472f] transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contactar por WhatsApp ({data.info.phoneDisplay})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
