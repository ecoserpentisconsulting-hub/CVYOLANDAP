/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WebsiteDataProvider, useWebsiteData } from './context/WebsiteDataContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProjectShowcase } from './components/ProjectShowcase';
import { WaterCalculator } from './components/WaterCalculator';
import { WaterCalculatorDashboard } from './components/WaterCalculatorDashboard';
import { ConsultingQuoteBuilder } from './components/ConsultingQuoteBuilder';
import { RegionalMapExplorer } from './components/RegionalMapExplorer';
import { TrajectorySection } from './components/TrajectorySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MessageSquare, CheckCircle2 } from 'lucide-react';

function WebsiteContent() {
  const { data, toastMessage } = useWebsiteData();
  const info = data.info;

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f2ea] text-stone-900 selection:bg-[#1f5f3f] selection:text-white relative">
      {/* Primary Sticky Top Bar */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section & Verifiable Credentials */}
        <Hero />

        {/* Core Services */}
        <ServicesSection />

        {/* Technical Projects Portfolio & GIRH */}
        <ProjectShowcase />

        {/* Interactive Andean Water Demand & Irrigation Savings Calculator */}
        <WaterCalculator />

        {/* Visual Dashboard of Visits & Consultations Generated via Recharts */}
        <WaterCalculatorDashboard />

        {/* Interactive Scope & Consulting Quote Builder */}
        <ConsultingQuoteBuilder />

        {/* Andean Territorial & Watershed Presence */}
        <RegionalMapExplorer />

        {/* Trajectory, Official CIP Backing, Testimonials & FAQs */}
        <TrajectorySection />

        {/* Direct Contact & WhatsApp Composer */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification Alert (for CSV downloads and inquiries) */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-stone-700 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* Floating Client Contact Action */}
      <aside aria-label="Contacto directo" className="fixed bottom-6 right-6 z-40">
        <a
          href={`https://wa.me/${info.phoneRaw}?text=${encodeURIComponent(
            `Hola ${info.name}, deseo comunicarme para una asesoría agronómica o de gestión hídrica.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Contactar a ${info.name} por WhatsApp`}
          className="group flex items-center gap-2.5 bg-[#1f5f3f] text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:bg-[#16472f] hover:shadow-2xl transition-all active:scale-95"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs font-bold whitespace-nowrap">
            WhatsApp {info.phoneDisplay}
          </span>
        </a>
      </aside>
    </div>
  );
}

export default function App() {
  return (
    <WebsiteDataProvider>
      <WebsiteContent />
    </WebsiteDataProvider>
  );
}
