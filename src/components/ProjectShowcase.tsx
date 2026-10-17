import React, { useState } from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { Project } from '../data/professionalData';
import { MapPin, ArrowRight, X, Check, MessageSquare } from 'lucide-react';

export const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const { data } = useWebsiteData();

  // Check if proyectos section is visible
  const isSectionVisible = data.sections.find((s) => s.id === 'proyectos')?.isVisible ?? true;

  if (!isSectionVisible) return null;

  const categories = [
    { id: 'all', label: 'Todos los Trabajos' },
    { id: 'girh', label: 'Gestión Integral del Agua (GIRH)' },
    { id: 'agroturismo', label: 'Agroturismo & Agrobiodiversidad' },
    { id: 'cambio-climatico', label: 'Cambio Climático' },
    { id: 'agroecologia', label: 'Agroecología Andina' },
    { id: 'cooperacion', label: 'Cooperación & Gestión' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? data.projects
    : data.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="proyectos" className="py-16 md:py-24 bg-white border-y border-stone-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        {(() => {
          const header = data.sectionHeaders?.['proyectos'] || {
            kicker: 'Investigaciones Aplicadas y Proyectos en Territorio',
            title: 'Gestión hídrica, conservación y desarrollo rural',
            subtitle: 'Trabajos de especialización técnica y de posgrado respaldados por instituciones académicas (UNSAAC, Fondo Verde) y experiencias en microcuencas del Cusco.'
          };

          return (
            <div className="max-w-3xl mb-10">
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

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-stone-100 rounded-2xl max-w-full overflow-x-auto mb-10 border border-stone-200/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              type="button"
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-white text-[#1f5f3f] shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#faf8f5] rounded-3xl overflow-hidden border border-stone-200/90 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-stone-300 hover:-translate-y-1 relative"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-16/10 overflow-hidden bg-stone-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                    {project.categoryLabel}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1 font-semibold text-stone-700">
                      <MapPin className="w-3.5 h-3.5 text-[#1f5f3f]" />
                      <span>{project.location}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 leading-snug group-hover:text-[#1f5f3f] transition-colors">
                    {project.title}
                  </h3>

                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    {project.academicOrInstitutionalBacking}
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-stone-200/80 text-stone-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom trigger */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1f5f3f] hover:text-emerald-800 transition-colors"
                  >
                    <span>Ver expediente técnico</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${data.info.phoneRaw}?text=${encodeURIComponent(
                      `Hola ${data.info.name}, deseo consultar detalles sobre el proyecto: "${project.title}".`
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
            </div>
          ))}
        </div>

        {/* Modal Technical Project Inspector */}
        {activeProject && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setActiveProject(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1f5f3f] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {activeProject.categoryLabel}
                    </span>
                    <span className="text-xs text-stone-500 font-semibold">
                      · {activeProject.location}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 leading-tight">
                    {activeProject.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 font-semibold">
                    {activeProject.academicOrInstitutionalBacking}
                  </p>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-2 text-stone-400 hover:text-stone-800 rounded-lg hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Project Image in Modal */}
              <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <div>
                  <div className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-1">
                    Resumen del Trabajo:
                  </div>
                  <p>{activeProject.summary}</p>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                  <div className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                    Objetivo Central:
                  </div>
                  <p className="text-stone-700 text-xs leading-relaxed">
                    {activeProject.objective}
                  </p>
                </div>

                <div>
                  <div className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2">
                    Metodología y Resultados Obtenidos:
                  </div>
                  <p className="text-xs text-stone-600">{activeProject.methodologyAndResults}</p>
                </div>

                <div>
                  <div className="font-bold text-stone-900 text-xs uppercase tracking-wider mb-2">
                    Pilares Técnicos y Aportes Clave:
                  </div>
                  <ul className="space-y-2">
                    {activeProject.keyPillars.map((pillar, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <Check className="w-4 h-4 text-[#1f5f3f] shrink-0 mt-0.5" />
                        <span>{pillar}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  Cerrar
                </button>

                <a
                  href={`https://wa.me/${data.info.phoneRaw}?text=${encodeURIComponent(
                    `Hola ${data.info.name}, deseo consultar la aplicación del modelo de "${activeProject.title}" para mi comunidad o proyecto.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1f5f3f] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#16472f] shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Consultar sobre este caso por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
