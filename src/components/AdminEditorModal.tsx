import React, { useState } from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { Service, Project, RegionalZone, CropWaterProfile, FAQItem, HeroCredential, andeanLandscapeImg } from '../data/professionalData';
import {
  X,
  Eye,
  EyeOff,
  Edit3,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Check,
  Layers,
  User,
  Briefcase,
  FolderKanban,
  FileText,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  Camera,
  GraduationCap,
  Type,
  HelpCircle,
  Phone,
  MapPin,
  Calculator,
  Award,
  ShieldCheck,
  Search,
  Sparkles
} from 'lucide-react';

export const AdminEditorModal: React.FC = () => {
  const {
    data,
    isEditorOpen,
    setIsEditorOpen,
    editorActiveTab,
    setEditorActiveTab,
    updateInfo,
    updateSectionHeader,
    updateHeroCredential,
    toggleSectionVisibility,
    updateSectionLabel,
    moveSectionUp,
    moveSectionDown,
    addCustomSection,
    deleteSectionPermanently,
    updateService,
    addService,
    deleteService,
    updateProject,
    addProject,
    deleteProject,
    updateEducationItem,
    addEducationItem,
    deleteEducationItem,
    updateRegionalZone,
    addRegionalZone,
    deleteRegionalZone,
    updateCropProfile,
    addCropProfile,
    deleteCropProfile,
    updateFaq,
    addFaq,
    deleteFaq,
    setActivePhotoTarget,
    resetToDefaults,
    exportJSON,
    importJSON,
  } = useWebsiteData();

  const [copySuccess, setCopySuccess] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importText, setImportText] = useState('');

  // States for adding new items
  const [showAddTabForm, setShowAddTabForm] = useState(false);
  const [newTabLabel, setNewTabLabel] = useState('');
  const [newTabHref, setNewTabHref] = useState('');
  const [newTabDesc, setNewTabDesc] = useState('');

  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceDesc, setNewServiceDesc] = useState('');
  const [newServiceDeliverable, setNewServiceDeliverable] = useState('');
  const [newServiceTarget, setNewServiceTarget] = useState('');

  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectLoc, setNewProjectLoc] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectBacking, setNewProjectBacking] = useState('');

  const [showAddCropForm, setShowAddCropForm] = useState(false);
  const [newCropName, setNewCropName] = useState('');
  const [newCropSciName, setNewCropSciName] = useState('');
  const [newCropMinMm, setNewCropMinMm] = useState(3.5);
  const [newCropMaxMm, setNewCropMaxMm] = useState(5.5);
  const [newCropSystem, setNewCropSystem] = useState('Aspersión o goteo');
  const [newCropStage, setNewCropStage] = useState('Floración y tuberización');
  const [newCropNotes, setNewCropNotes] = useState('');

  const [showAddZoneForm, setShowAddZoneForm] = useState(false);
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneProvince, setNewZoneProvince] = useState('');
  const [newZoneAltitude, setNewZoneAltitude] = useState('');
  const [newZoneFocus, setNewZoneFocus] = useState('');
  const [newZoneHighlight, setNewZoneHighlight] = useState('');

  const [showAddFaqForm, setShowAddFaqForm] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [newFaqCategory, setNewFaqCategory] = useState('Consultoría');

  if (!isEditorOpen) return null;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(exportJSON());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleImportSubmit = () => {
    const success = importJSON(importText);
    if (success) {
      setImportError(null);
      setImportText('');
    } else {
      setImportError('El formato JSON no es válido.');
    }
  };

  const handleCreateCustomTab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTabLabel.trim()) return;
    addCustomSection({
      label: newTabLabel.trim(),
      href: newTabHref.trim() || `#${newTabLabel.toLowerCase().replace(/\s+/g, '-')}`,
      description: newTabDesc.trim() || 'Pestaña personalizada',
    });
    setNewTabLabel('');
    setNewTabHref('');
    setNewTabDesc('');
    setShowAddTabForm(false);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim()) return;
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: newServiceTitle.trim(),
      iconName: 'Droplets',
      shortDesc: newServiceDesc.trim() || 'Asistencia técnica especializada.',
      fullDesc: newServiceDesc.trim() || 'Asistencia técnica y formulación técnica.',
      deliverables: newServiceDeliverable ? [newServiceDeliverable] : ['Informe técnico y memoria descriptiva'],
      targetEntities: newServiceTarget.trim() || 'Comunidades campesinas, municipalidades y entidades públicas/privadas',
    };
    addService(newService);
    setNewServiceTitle('');
    setNewServiceDesc('');
    setNewServiceDeliverable('');
    setNewServiceTarget('');
    setShowAddServiceForm(false);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim()) return;
    const newProj: Project = {
      id: `project-${Date.now()}`,
      title: newProjectTitle.trim(),
      category: 'girh',
      categoryLabel: 'Gestión Integral del Agua (GIRH)',
      location: newProjectLoc.trim() || 'Cusco, Perú',
      scope: 'Consultoría y desarrollo en territorio',
      academicOrInstitutionalBacking: newProjectBacking.trim() || 'UNSAAC · Acreditación Técnica',
      summary: newProjectDesc.trim() || 'Proyecto de gestión hídrica y desarrollo territorial.',
      objective: 'Fortalecer la resiliencia y el manejo sostenible de recursos en cuencas.',
      methodologyAndResults: 'Diagnóstico participativo, levantamiento hidrográfico y monitoreo de campo.',
      keyPillars: ['Planificación territorial', 'Eficiencia en riego', 'Gobernanza local'],
      tags: ['Cusco', 'Agroecología', 'GIRH'],
      image: andeanLandscapeImg,
      technicalSpecs: ['Expediente técnico con balance hídrico'],
    };
    addProject(newProj);
    setNewProjectTitle('');
    setNewProjectLoc('');
    setNewProjectDesc('');
    setNewProjectBacking('');
    setShowAddProjectForm(false);
  };

  const handleCreateCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCropName.trim()) return;
    const newCrop: CropWaterProfile = {
      id: `crop-${Date.now()}`,
      name: newCropName.trim(),
      scientificName: newCropSciName.trim() || 'Especie andina',
      dailyNeedMmMin: Number(newCropMinMm),
      dailyNeedMmMax: Number(newCropMaxMm),
      criticalStage: newCropStage.trim() || 'Crecimiento y floración',
      recommendedSystem: newCropSystem.trim() || 'Aspersión presurizada',
      efficiencyGain: '40% - 45% respecto a gravedad',
      frequencyDays: 'Cada 6 a 8 días',
      altitudeRange: '2,800 - 3,800 msnm',
      notes: newCropNotes.trim() || 'Cultivo adaptado a valles andinos.',
    };
    addCropProfile(newCrop);
    setNewCropName('');
    setNewCropSciName('');
    setNewCropNotes('');
    setShowAddCropForm(false);
  };

  const handleCreateZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneName.trim()) return;
    const newZone: RegionalZone = {
      id: `zone-${Date.now()}`,
      name: newZoneName.trim(),
      province: newZoneProvince.trim() || 'Cusco',
      altitudeRange: newZoneAltitude.trim() || '3,000 - 3,800 msnm',
      focusArea: newZoneFocus.trim() || 'Gestión hídrica y agroecología',
      highlight: newZoneHighlight.trim() || 'Intervención técnica en territorio andino.',
    };
    addRegionalZone(newZone);
    setNewZoneName('');
    setNewZoneProvince('');
    setNewZoneAltitude('');
    setNewZoneFocus('');
    setNewZoneHighlight('');
    setShowAddZoneForm(false);
  };

  const handleCreateFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      question: newFaqQuestion.trim(),
      answer: newFaqAnswer.trim(),
      category: newFaqCategory.trim() || 'General',
    };
    addFaq(newFaq);
    setNewFaqQuestion('');
    setNewFaqAnswer('');
    setShowAddFaqForm(false);
  };

  const tabsConfig = [
    { id: 'sections', label: 'Pestañas & Menú', icon: Layers, badge: null },
    { id: 'headers', label: 'Títulos & Textos', icon: Type, badge: 'Global' },
    { id: 'photos', label: 'Fotos & Galería', icon: ImageIcon, badge: null },
    { id: 'info', label: 'Perfil & Hero', icon: User, badge: null },
    { id: 'services', label: 'Servicios', icon: Briefcase, badge: data.services.length },
    { id: 'projects', label: 'Proyectos & GIRH', icon: FolderKanban, badge: data.projects.length },
    { id: 'calculator', label: 'Calculadora Hídrica', icon: Calculator, badge: data.cropWaterProfiles.length },
    { id: 'territory', label: 'Territorio & Cuencas', icon: MapPin, badge: data.regionalZones.length },
    { id: 'trajectory', label: 'Trayectoria & CV', icon: GraduationCap, badge: data.education.length },
    { id: 'faqs', label: 'Preguntas (FAQ)', icon: HelpCircle, badge: data.faqs.length },
    { id: 'contact', label: 'Contacto & Pie', icon: Phone, badge: null },
    { id: 'backup', label: 'Respaldo JSON', icon: Download, badge: null },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-y-auto"
      onClick={() => setIsEditorOpen(false)}
    >
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Editor Top Bar */}
        <div className="px-5 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1f5f3f] flex items-center justify-center text-white shrink-0">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Panel Integral de Edición de Todo el Contenido
              </h3>
              <p className="text-[11px] text-stone-400">
                Modifique textos, títulos, servicios, cultivos, proyectos, fotos, preguntas y pestañas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm('¿Desea restaurar todos los textos, servicios, proyectos y fotos al estado verificado original del CV?')) {
                  resetToDefaults();
                }
              }}
              title="Restaurar datos predeterminados originales"
              className="text-xs text-stone-400 hover:text-white flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-stone-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Restaurar Original</span>
            </button>
            <button
              onClick={() => setIsEditorOpen(false)}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Cerrar editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Editor Tab Navigation Bar */}
        <div className="flex items-center gap-1 px-4 pt-2.5 bg-stone-100 border-b border-stone-200 overflow-x-auto shrink-0 scrollbar-none">
          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = editorActiveTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setEditorActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-white text-[#1f5f3f] border-t-2 border-[#1f5f3f] shadow-xs font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1f5f3f]' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
                {tab.badge !== null && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Editor Body Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-stone-50/40">

          {/* TAB 1: PESTAÑAS & MENÚ */}
          {editorActiveTab === 'sections' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <strong>Control Total de Pestañas y Menú:</strong> Puede retirar cualquier pestaña del menú y de la página con el botón "Visible/Anulada", cambiar el nombre visible, subir/bajar de orden o crear pestañas nuevas.
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddTabForm(!showAddTabForm)}
                  className="inline-flex items-center gap-1.5 bg-[#1f5f3f] text-white px-3.5 py-2 rounded-xl font-bold text-xs whitespace-nowrap shadow-xs hover:bg-[#16472f] shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Pestaña</span>
                </button>
              </div>

              {/* Form add custom tab */}
              {showAddTabForm && (
                <form onSubmit={handleCreateCustomTab} className="bg-white border border-stone-300 p-4 rounded-2xl space-y-3 shadow-xs">
                  <div className="font-bold text-xs text-stone-800 uppercase tracking-wider">
                    Nueva Pestaña Personalizada:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Nombre de pestaña (ej. Publicaciones)"
                      value={newTabLabel}
                      onChange={(e) => setNewTabLabel(e.target.value)}
                      className="p-2 text-xs bg-white border border-stone-300 rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Enlace ancla (ej. #publicaciones)"
                      value={newTabHref}
                      onChange={(e) => setNewTabHref(e.target.value)}
                      className="p-2 text-xs bg-white border border-stone-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Breve descripción"
                      value={newTabDesc}
                      onChange={(e) => setNewTabDesc(e.target.value)}
                      className="p-2 text-xs bg-white border border-stone-300 rounded-lg"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddTabForm(false)}
                      className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#1f5f3f] text-white rounded-lg text-xs font-bold"
                    >
                      Guardar Pestaña
                    </button>
                  </div>
                </form>
              )}

              {/* Sections list */}
              <div className="space-y-3">
                {data.sections.map((section, idx) => (
                  <div
                    key={section.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      section.isVisible
                        ? 'bg-white border-stone-300 shadow-2xs'
                        : 'bg-rose-50/50 border-dashed border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {/* Reorder buttons */}
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => moveSectionUp(idx)}
                          disabled={idx === 0}
                          className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-600 disabled:opacity-30 disabled:pointer-events-none"
                          title="Subir posición"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSectionDown(idx)}
                          disabled={idx === data.sections.length - 1}
                          className="p-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-600 disabled:opacity-30 disabled:pointer-events-none"
                          title="Bajar posición"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-stone-900">
                            {section.label}
                          </span>
                          <span className="text-[11px] font-mono text-stone-400">
                            ({section.href})
                          </span>
                          {!section.isVisible && (
                            <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold uppercase">
                              Anulada / Oculta
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-stone-500">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <input
                        type="text"
                        value={section.label}
                        onChange={(e) => updateSectionLabel(section.id, e.target.value)}
                        placeholder="Nombre de pestaña"
                        className="p-2 text-xs bg-white border border-stone-300 rounded-lg w-36 sm:w-44 focus:ring-1 focus:ring-[#1f5f3f] focus:outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => toggleSectionVisibility(section.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          section.isVisible
                            ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                            : 'bg-rose-600 text-white hover:bg-rose-700'
                        }`}
                        title={section.isVisible ? 'Clic para anular / retirar' : 'Clic para reactivar'}
                      >
                        {section.isVisible ? (
                          <>
                            <Eye className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Visible</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5 text-white" />
                            <span>Anulada (Activar)</span>
                          </>
                        )}
                      </button>

                      {section.id.startsWith('custom-') && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`¿Eliminar permanentemente la pestaña "${section.label}"?`)) {
                              deleteSectionPermanently(section.id);
                            }
                          }}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg"
                          title="Eliminar pestaña"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TÍTULOS Y ENCABEZADOS DE SECCIÓN */}
          {editorActiveTab === 'headers' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950">
                <strong>Edición de Encabezados y Títulos:</strong> Personalice libremente el Kicker (etiqueta superior verde), el Título Principal y la Descripción que encabeza cada una de las secciones de la página.
              </div>

              <div className="space-y-4">
                {data.sections.map((sec) => {
                  const currentHeader = data.sectionHeaders[sec.id] || {
                    kicker: sec.label,
                    title: sec.label,
                    subtitle: sec.description,
                  };

                  return (
                    <div key={sec.id} className="bg-white p-5 rounded-2xl border border-stone-300 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                            Sección: {sec.label}
                          </span>
                          <span className="text-[11px] font-mono text-stone-400">
                            ({sec.href})
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          sec.isVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {sec.isVisible ? 'Activa' : 'Anulada'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                            Kicker / Etiqueta superior:
                          </label>
                          <input
                            type="text"
                            value={currentHeader.kicker || ''}
                            onChange={(e) => updateSectionHeader(sec.id, { kicker: e.target.value })}
                            placeholder="Ej. Servicios Profesionales Acreditados"
                            className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:ring-1 focus:ring-[#1f5f3f] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                            Título Principal de la Sección:
                          </label>
                          <input
                            type="text"
                            value={currentHeader.title || ''}
                            onChange={(e) => updateSectionHeader(sec.id, { title: e.target.value })}
                            placeholder="Título llamativo de la sección"
                            className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg font-bold text-stone-900 focus:ring-1 focus:ring-[#1f5f3f] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1">
                          Descripción o Subtítulo Explicativo:
                        </label>
                        <textarea
                          rows={2}
                          value={currentHeader.subtitle || ''}
                          onChange={(e) => updateSectionHeader(sec.id, { subtitle: e.target.value })}
                          placeholder="Párrafo explicativo debajo del título"
                          className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:ring-1 focus:ring-[#1f5f3f] focus:outline-none"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: FOTOS & GALERÍA */}
          {editorActiveTab === 'photos' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950">
                <strong>Gestor Central de Fotografías:</strong> Cambie cualquier imagen de la página web (subir desde su celular/computadora o pegar enlace). Todos los cambios son inmediatos.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Photo 1: Hero CV Card */}
                <div className="bg-white rounded-2xl p-4 border border-stone-300 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                        Foto 1: Tarjeta Oficial del CV
                      </span>
                      <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono">
                        Hero Principal
                      </span>
                    </div>
                    <div className="aspect-16/10 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 mb-2">
                      <img
                        src={data.info.heroImageUser}
                        alt="Tarjeta del CV"
                        className="w-full h-full object-contain bg-[#f6f1e8]"
                      />
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {data.info.heroImageUser}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActivePhotoTarget({
                        id: 'hero',
                        type: 'hero_card',
                        currentUrl: data.info.heroImageUser,
                        label: 'Foto de Tarjeta del CV',
                      });
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1f5f3f] hover:bg-[#16472f] text-white py-2.5 rounded-xl font-bold text-xs transition-colors shadow-2xs"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Cambiar Foto de Tarjeta del CV</span>
                  </button>
                </div>

                {/* Photo 2: Hero Landscape */}
                <div className="bg-white rounded-2xl p-4 border border-stone-300 shadow-2xs space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                        Foto 2: Ámbito Territorial / Paisaje
                      </span>
                      <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono">
                        Hero Secundario
                      </span>
                    </div>
                    <div className="aspect-16/10 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 mb-2">
                      <img
                        src={data.info.heroImageLandscape}
                        alt="Ámbito territorial"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {data.info.heroImageLandscape}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActivePhotoTarget({
                        id: 'hero',
                        type: 'hero_landscape',
                        currentUrl: data.info.heroImageLandscape,
                        label: 'Foto de Ámbito Territorial',
                      });
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1f5f3f] hover:bg-[#16472f] text-white py-2.5 rounded-xl font-bold text-xs transition-colors shadow-2xs"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Cambiar Foto de Ámbito Territorial</span>
                  </button>
                </div>

                {/* Photos of each project */}
                {data.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white rounded-2xl p-4 border border-stone-300 shadow-2xs space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-stone-800 uppercase tracking-wider line-clamp-1">
                          Foto: {proj.title}
                        </span>
                        <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded font-mono shrink-0">
                          Proyecto
                        </span>
                      </div>
                      <div className="aspect-16/10 rounded-xl overflow-hidden bg-stone-100 border border-stone-200 mb-2">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1">
                        {proj.image}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActivePhotoTarget({
                          id: proj.id,
                          type: 'project',
                          currentUrl: proj.image,
                          label: `Foto de Proyecto: ${proj.title}`,
                        });
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-white py-2.5 rounded-xl font-bold text-xs transition-colors shadow-2xs"
                    >
                      <Camera className="w-4 h-4 text-emerald-400" />
                      <span>Cambiar Fotografía de este Proyecto</span>
                    </button>
                  </div>
                ))}

              </div>
            </div>
          )}

          {/* TAB 4: PERSONAL INFO & HERO */}
          {editorActiveTab === 'info' && (
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950">
                Modifique los datos profesionales exactos de la <strong>{data.info.name}</strong>. Se reflejan en la cabecera, hero, credenciales y contacto.
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-300 shadow-2xs space-y-4">
                <h4 className="font-bold text-sm text-stone-900 border-b pb-2">
                  Datos de Identificación Profesional
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Nombre Completo:</label>
                    <input
                      type="text"
                      value={data.info.name}
                      onChange={(e) => updateInfo({ name: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Número de CIP:</label>
                    <input
                      type="text"
                      value={data.info.cip}
                      onChange={(e) => updateInfo({ cip: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Profesión de Pregrado:</label>
                    <input
                      type="text"
                      value={data.info.profession}
                      onChange={(e) => updateInfo({ profession: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Universidad / Alma Mater:</label>
                    <input
                      type="text"
                      value={data.info.university}
                      onChange={(e) => updateInfo({ university: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">Grado de Maestría / Posgrado:</label>
                    <input
                      type="text"
                      value={data.info.masterDegree}
                      onChange={(e) => updateInfo({ masterDegree: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">Titular Principal del Hero (Tagline):</label>
                    <input
                      type="text"
                      value={data.info.tagline}
                      onChange={(e) => updateInfo({ tagline: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">Subtítulo de Especialidades:</label>
                    <input
                      type="text"
                      value={data.info.subtagline}
                      onChange={(e) => updateInfo({ subtagline: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">Resumen Profesional (Perfil CV):</label>
                    <textarea
                      rows={4}
                      value={data.info.profileSummary}
                      onChange={(e) => updateInfo({ profileSummary: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>
                </div>
              </div>

              {/* Editable Hero Credential Cards */}
              <div className="bg-white p-5 rounded-2xl border border-stone-300 shadow-2xs space-y-4">
                <h4 className="font-bold text-sm text-stone-900 border-b pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1f5f3f]" />
                  <span>Tarjetas de Acreditación Oficial (Debajo del Hero)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.heroCredentials.map((cred) => (
                    <div key={cred.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
                      <input
                        type="text"
                        value={cred.label}
                        onChange={(e) => updateHeroCredential(cred.id, { label: e.target.value })}
                        placeholder="Etiqueta (ej. Grado Pregrado)"
                        className="w-full p-1.5 text-[11px] font-bold text-[#1f5f3f] bg-white border border-stone-200 rounded"
                      />
                      <input
                        type="text"
                        value={cred.title}
                        onChange={(e) => updateHeroCredential(cred.id, { title: e.target.value })}
                        placeholder="Título (ej. Ing. Agrónoma)"
                        className="w-full p-1.5 text-xs font-bold text-stone-900 bg-white border border-stone-200 rounded"
                      />
                      <input
                        type="text"
                        value={cred.institution}
                        onChange={(e) => updateHeroCredential(cred.id, { institution: e.target.value })}
                        placeholder="Institución o detalle"
                        className="w-full p-1.5 text-[11px] text-stone-600 bg-white border border-stone-200 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES */}
          {editorActiveTab === 'services' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <div className="text-xs text-emerald-950">
                  Edite, anule o agregue líneas de asesoría y servicios técnicos.
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddServiceForm(!showAddServiceForm)}
                  className="inline-flex items-center gap-1.5 bg-[#1f5f3f] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#16472f]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Nuevo Servicio</span>
                </button>
              </div>

              {showAddServiceForm && (
                <form onSubmit={handleCreateService} className="bg-white border border-stone-300 p-4 rounded-2xl space-y-3 shadow-xs">
                  <div className="font-bold text-xs text-stone-900 uppercase tracking-wider">
                    Registrar Nuevo Servicio:
                  </div>
                  <input
                    type="text"
                    placeholder="Título del servicio"
                    value={newServiceTitle}
                    onChange={(e) => setNewServiceTitle(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                    required
                  />
                  <textarea
                    rows={2}
                    placeholder="Descripción resumida"
                    value={newServiceDesc}
                    onChange={(e) => setNewServiceDesc(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Entregable principal (ej. Expediente de riego)"
                    value={newServiceDeliverable}
                    onChange={(e) => setNewServiceDeliverable(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Dirigido a (ej. Cooperativas agrarias, regantes)"
                    value={newServiceTarget}
                    onChange={(e) => setNewServiceTarget(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddServiceForm(false)}
                      className="px-3 py-1.5 text-xs text-stone-600"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#1f5f3f] text-white rounded-xl text-xs font-bold"
                    >
                      Guardar Servicio
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {data.services.map((service) => (
                  <div key={service.id} className="p-4 rounded-2xl border border-stone-300 bg-white space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => updateService(service.id, { title: e.target.value })}
                        className="font-bold text-sm text-stone-900 border-b border-stone-300 focus:border-[#1f5f3f] focus:outline-none flex-1 py-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`¿Desea anular / eliminar el servicio "${service.title}"?`)) {
                            deleteService(service.id);
                          }
                        }}
                        className="text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Anular</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          Descripción Corta:
                        </label>
                        <textarea
                          rows={2}
                          value={service.shortDesc}
                          onChange={(e) => updateService(service.id, { shortDesc: e.target.value })}
                          className="w-full p-2 text-xs text-stone-700 bg-stone-50 border border-stone-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          Descripción Completa (Ficha Técnica):
                        </label>
                        <textarea
                          rows={2}
                          value={service.fullDesc}
                          onChange={(e) => updateService(service.id, { fullDesc: e.target.value })}
                          className="w-full p-2 text-xs text-stone-700 bg-stone-50 border border-stone-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Dirigido a:
                      </label>
                      <input
                        type="text"
                        value={service.targetEntities}
                        onChange={(e) => updateService(service.id, { targetEntities: e.target.value })}
                        className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PROJECTS */}
          {editorActiveTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <div className="text-xs text-emerald-950">
                  Gestione expedientes técnicos, proyectos de investigación, GIRH y agroturismo.
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddProjectForm(!showAddProjectForm)}
                  className="inline-flex items-center gap-1.5 bg-[#1f5f3f] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#16472f]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Proyecto</span>
                </button>
              </div>

              {showAddProjectForm && (
                <form onSubmit={handleCreateProject} className="bg-white border border-stone-300 p-4 rounded-2xl space-y-3 shadow-xs">
                  <div className="font-bold text-xs text-stone-900 uppercase tracking-wider">
                    Registrar Nuevo Proyecto:
                  </div>
                  <input
                    type="text"
                    placeholder="Título del proyecto"
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Ubicación (ej. Microcuenca de Lucre, Cusco)"
                      value={newProjectLoc}
                      onChange={(e) => setNewProjectLoc(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                    />
                    <input
                      type="text"
                      placeholder="Respaldo institucional (ej. UNSAAC, Fondo Verde)"
                      value={newProjectBacking}
                      onChange={(e) => setNewProjectBacking(e.target.value)}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Resumen del trabajo o caso aplicado"
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddProjectForm(false)}
                      className="px-3 py-1.5 text-xs text-stone-600"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#1f5f3f] text-white rounded-xl text-xs font-bold"
                    >
                      Guardar Proyecto
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-2xl border border-stone-300 bg-white space-y-3 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                        className="font-bold text-sm text-stone-900 border-b border-stone-300 focus:border-[#1f5f3f] focus:outline-none flex-1 py-1"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActivePhotoTarget({
                              id: proj.id,
                              type: 'project',
                              currentUrl: proj.image,
                              label: `Foto de: ${proj.title}`,
                            });
                          }}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-800 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 border border-stone-200"
                        >
                          <Camera className="w-3.5 h-3.5 text-[#1f5f3f]" />
                          <span>Cambiar Foto</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`¿Desea anular / eliminar el proyecto "${proj.title}"?`)) {
                              deleteProject(proj.id);
                            }
                          }}
                          className="text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Anular</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          Ubicación:
                        </label>
                        <input
                          type="text"
                          value={proj.location}
                          onChange={(e) => updateProject(proj.id, { location: e.target.value })}
                          className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          Respaldo Académico / Institucional:
                        </label>
                        <input
                          type="text"
                          value={proj.academicOrInstitutionalBacking}
                          onChange={(e) => updateProject(proj.id, { academicOrInstitutionalBacking: e.target.value })}
                          className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Resumen del Proyecto:
                      </label>
                      <textarea
                        rows={2}
                        value={proj.summary}
                        onChange={(e) => updateProject(proj.id, { summary: e.target.value })}
                        className="w-full p-2 text-xs text-stone-600 bg-stone-50 border border-stone-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Objetivo Central:
                      </label>
                      <input
                        type="text"
                        value={proj.objective}
                        onChange={(e) => updateProject(proj.id, { objective: e.target.value })}
                        className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: CALCULATOR CROPS */}
          {editorActiveTab === 'calculator' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <div className="text-xs text-emerald-950">
                  Modifique las demandas de agua (mm/día), sistemas de riego y datos técnicos de cada cultivo andino en el calculador interactivo.
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddCropForm(!showAddCropForm)}
                  className="inline-flex items-center gap-1.5 bg-[#1f5f3f] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#16472f]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Cultivo</span>
                </button>
              </div>

              {showAddCropForm && (
                <form onSubmit={handleCreateCrop} className="bg-white border border-stone-300 p-4 rounded-2xl space-y-3 shadow-xs">
                  <div className="font-bold text-xs text-stone-900 uppercase tracking-wider">
                    Registrar Nuevo Cultivo Andino:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Nombre del cultivo (ej. Haba Andina)"
                      value={newCropName}
                      onChange={(e) => setNewCropName(e.target.value)}
                      className="p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Nombre científico (ej. Vicia faba)"
                      value={newCropSciName}
                      onChange={(e) => setNewCropSciName(e.target.value)}
                      className="p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                    />
                    <div>
                      <label className="text-[10px] text-stone-500 font-bold">Demanda Mín (mm/día):</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newCropMinMm}
                        onChange={(e) => setNewCropMinMm(parseFloat(e.target.value))}
                        className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-stone-500 font-bold">Demanda Máx (mm/día):</label>
                      <input
                        type="number"
                        step="0.1"
                        value={newCropMaxMm}
                        onChange={(e) => setNewCropMaxMm(parseFloat(e.target.value))}
                        className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Sistema de riego recomendado"
                    value={newCropSystem}
                    onChange={(e) => setNewCropSystem(e.target.value)}
                    className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Notas o recomendaciones agronómicas"
                    value={newCropNotes}
                    onChange={(e) => setNewCropNotes(e.target.value)}
                    className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddCropForm(false)}
                      className="px-3 py-1.5 text-xs text-stone-600"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#1f5f3f] text-white rounded-xl text-xs font-bold"
                    >
                      Guardar Cultivo
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {data.cropWaterProfiles.map((crop) => (
                  <div key={crop.id} className="p-4 rounded-2xl border border-stone-300 bg-white space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="text"
                        value={crop.name}
                        onChange={(e) => updateCropProfile(crop.id, { name: e.target.value })}
                        className="font-bold text-sm text-stone-900 border-b border-stone-300 focus:border-[#1f5f3f] focus:outline-none flex-1 py-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`¿Eliminar el cultivo "${crop.name}" del calculador?`)) {
                            deleteCropProfile(crop.id);
                          }
                        }}
                        className="text-rose-600 hover:text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg text-xs font-bold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          Demanda Mín (mm/día):
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={crop.dailyNeedMmMin}
                          onChange={(e) => updateCropProfile(crop.id, { dailyNeedMmMin: parseFloat(e.target.value) || 1 })}
                          className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          Demanda Máx (mm/día):
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={crop.dailyNeedMmMax}
                          onChange={(e) => updateCropProfile(crop.id, { dailyNeedMmMax: parseFloat(e.target.value) || 1 })}
                          className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          Sistema Recomendado:
                        </label>
                        <input
                          type="text"
                          value={crop.recommendedSystem}
                          onChange={(e) => updateCropProfile(crop.id, { recommendedSystem: e.target.value })}
                          className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Notas Agronómicas:
                      </label>
                      <input
                        type="text"
                        value={crop.notes}
                        onChange={(e) => updateCropProfile(crop.id, { notes: e.target.value })}
                        className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: TERRITORY & ZONES */}
          {editorActiveTab === 'territory' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <div className="text-xs text-emerald-950">
                  Modifique las microcuencas, altitudes y áreas de intervención en el explorador territorial.
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddZoneForm(!showAddZoneForm)}
                  className="inline-flex items-center gap-1.5 bg-[#1f5f3f] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#16472f]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Microcuenca / Zona</span>
                </button>
              </div>

              {showAddZoneForm && (
                <form onSubmit={handleCreateZone} className="bg-white border border-stone-300 p-4 rounded-2xl space-y-3 shadow-xs">
                  <div className="font-bold text-xs text-stone-900 uppercase tracking-wider">
                    Registrar Nueva Zona Territorial:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Nombre (ej. Cuenca del Río Huatanay)"
                      value={newZoneName}
                      onChange={(e) => setNewZoneName(e.target.value)}
                      className="p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Provincia (ej. Cusco)"
                      value={newZoneProvince}
                      onChange={(e) => setNewZoneProvince(e.target.value)}
                      className="p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Rango Altitudinal (ej. 3,200 - 3,600 msnm)"
                      value={newZoneAltitude}
                      onChange={(e) => setNewZoneAltitude(e.target.value)}
                      className="p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Área de Enfoque"
                    value={newZoneFocus}
                    onChange={(e) => setNewZoneFocus(e.target.value)}
                    className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                  />
                  <textarea
                    rows={2}
                    placeholder="Hito destacado / Experiencia de la profesional en esta zona"
                    value={newZoneHighlight}
                    onChange={(e) => setNewZoneHighlight(e.target.value)}
                    className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddZoneForm(false)}
                      className="px-3 py-1.5 text-xs text-stone-600"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#1f5f3f] text-white rounded-xl text-xs font-bold"
                    >
                      Guardar Zona
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {data.regionalZones.map((zone) => (
                  <div key={zone.id} className="p-4 rounded-2xl border border-stone-300 bg-white space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="text"
                        value={zone.name}
                        onChange={(e) => updateRegionalZone(zone.id, { name: e.target.value })}
                        className="font-bold text-sm text-stone-900 border-b border-stone-300 focus:border-[#1f5f3f] focus:outline-none flex-1 py-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`¿Eliminar la zona "${zone.name}"?`)) {
                            deleteRegionalZone(zone.id);
                          }
                        }}
                        className="text-rose-600 hover:text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg text-xs font-bold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          Provincia / Ámbito:
                        </label>
                        <input
                          type="text"
                          value={zone.province}
                          onChange={(e) => updateRegionalZone(zone.id, { province: e.target.value })}
                          className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                          Rango Altitudinal:
                        </label>
                        <input
                          type="text"
                          value={zone.altitudeRange}
                          onChange={(e) => updateRegionalZone(zone.id, { altitudeRange: e.target.value })}
                          className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Área de Enfoque:
                      </label>
                      <input
                        type="text"
                        value={zone.focusArea}
                        onChange={(e) => updateRegionalZone(zone.id, { focusArea: e.target.value })}
                        className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                        Hito Destacado:
                      </label>
                      <textarea
                        rows={2}
                        value={zone.highlight}
                        onChange={(e) => updateRegionalZone(zone.id, { highlight: e.target.value })}
                        className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: TRAJECTORY & CV */}
          {editorActiveTab === 'trajectory' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <div className="text-xs text-emerald-950">
                  Hitos académicos de pregrado, posgrado y trayectoria profesional oficial.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addEducationItem({
                      category: 'Trayectoria',
                      title: 'Nueva Acreditación o Hito',
                      institution: 'Institución / Entidad',
                      period: 'Periodo / Año',
                      detail: 'Descripción del logro académico o profesional',
                    });
                  }}
                  className="inline-flex items-center gap-1.5 bg-[#1f5f3f] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#16472f]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Hito</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.education.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-stone-300 bg-white space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={item.period}
                          onChange={(e) => updateEducationItem(idx, { period: e.target.value })}
                          className="p-1.5 text-xs font-bold text-[#1f5f3f] bg-stone-50 border border-stone-200 rounded-lg w-32"
                        />
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateEducationItem(idx, { title: e.target.value })}
                          className="p-1.5 text-xs font-bold text-stone-900 border border-stone-200 rounded-lg flex-1"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`¿Anular hito "${item.title}"?`)) {
                            deleteEducationItem(idx);
                          }
                        }}
                        className="text-rose-600 hover:text-rose-800 bg-rose-50 p-1.5 rounded-lg text-xs"
                        title="Anular hito"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={item.institution}
                      onChange={(e) => updateEducationItem(idx, { institution: e.target.value })}
                      className="w-full p-1.5 text-xs text-stone-600 bg-stone-50 border border-stone-200 rounded-lg"
                      placeholder="Institución o entidad"
                    />
                    <textarea
                      rows={2}
                      value={item.detail}
                      onChange={(e) => updateEducationItem(idx, { detail: e.target.value })}
                      className="w-full p-1.5 text-xs text-stone-600 bg-stone-50 border border-stone-200 rounded-lg"
                      placeholder="Detalle o descripción"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: FAQS */}
          {editorActiveTab === 'faqs' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <div className="text-xs text-emerald-950">
                  Edite o agregue las preguntas frecuentes que se muestran a productores, comunidades y cooperantes.
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddFaqForm(!showAddFaqForm)}
                  className="inline-flex items-center gap-1.5 bg-[#1f5f3f] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#16472f]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Pregunta</span>
                </button>
              </div>

              {showAddFaqForm && (
                <form onSubmit={handleCreateFaq} className="bg-white border border-stone-300 p-4 rounded-2xl space-y-3 shadow-xs">
                  <div className="font-bold text-xs text-stone-900 uppercase tracking-wider">
                    Nueva Pregunta Frecuente:
                  </div>
                  <input
                    type="text"
                    placeholder="Categoría (ej. Riego, Informes, Cobertura)"
                    value={newFaqCategory}
                    onChange={(e) => setNewFaqCategory(e.target.value)}
                    className="w-full p-2 text-xs bg-stone-50 border border-stone-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="¿Cuál es la pregunta?"
                    value={newFaqQuestion}
                    onChange={(e) => setNewFaqQuestion(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl font-bold"
                    required
                  />
                  <textarea
                    rows={3}
                    placeholder="Respuesta detallada y clara"
                    value={newFaqAnswer}
                    onChange={(e) => setNewFaqAnswer(e.target.value)}
                    className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl"
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddFaqForm(false)}
                      className="px-3 py-1.5 text-xs text-stone-600"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#1f5f3f] text-white rounded-xl text-xs font-bold"
                    >
                      Guardar Pregunta
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {data.faqs.map((faq) => (
                  <div key={faq.id} className="p-4 rounded-2xl border border-stone-300 bg-white space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={faq.category || 'General'}
                          onChange={(e) => updateFaq(faq.id, { category: e.target.value })}
                          className="p-1 text-[11px] font-bold text-[#1f5f3f] bg-emerald-50 border border-emerald-200 rounded w-28"
                        />
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateFaq(faq.id, { question: e.target.value })}
                          className="font-bold text-xs sm:text-sm text-stone-900 border-b border-stone-300 focus:border-[#1f5f3f] focus:outline-none flex-1 py-1"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`¿Eliminar la pregunta "${faq.question}"?`)) {
                            deleteFaq(faq.id);
                          }
                        }}
                        className="text-rose-600 hover:text-rose-800 bg-rose-50 px-2.5 py-1 rounded-lg text-xs font-bold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <textarea
                      rows={3}
                      value={faq.answer}
                      onChange={(e) => updateFaq(faq.id, { answer: e.target.value })}
                      className="w-full p-2.5 text-xs text-stone-700 bg-stone-50 border border-stone-200 rounded-lg leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: CONTACT & FOOTER */}
          {editorActiveTab === 'contact' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950">
                Personalice los canales de contacto, horarios de atención, WhatsApp, correo y textos del pie de página.
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-300 shadow-2xs space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Teléfono / WhatsApp (Visual):</label>
                    <input
                      type="text"
                      value={data.info.phoneDisplay}
                      onChange={(e) => updateInfo({ phoneDisplay: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Número WhatsApp para enlace (sin espacios):</label>
                    <input
                      type="text"
                      value={data.info.phoneRaw}
                      onChange={(e) => updateInfo({ phoneRaw: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Correo Electrónico:</label>
                    <input
                      type="email"
                      value={data.info.email}
                      onChange={(e) => updateInfo({ email: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Ubicación Geográfica:</label>
                    <input
                      type="text"
                      value={data.info.location}
                      onChange={(e) => updateInfo({ location: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">Horarios de Atención:</label>
                    <input
                      type="text"
                      value={data.info.officeHours || ''}
                      onChange={(e) => updateInfo({ officeHours: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                      placeholder="Lunes a Viernes: 8:00 am - 6:00 pm"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">Tiempo de Respuesta:</label>
                    <input
                      type="text"
                      value={data.info.responseTime || ''}
                      onChange={(e) => updateInfo({ responseTime: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                      placeholder="Respuesta habitual en menos de 2 horas vía WhatsApp"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-stone-700 mb-1">Aviso Ético / Texto del Pie de Página:</label>
                    <textarea
                      rows={2}
                      value={data.info.footerNotice || ''}
                      onChange={(e) => updateInfo({ footerNotice: e.target.value })}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-1 focus:ring-[#1f5f3f]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: BACKUP & RESTORE */}
          {editorActiveTab === 'backup' && (
            <div className="space-y-6">
              <div className="bg-white border border-stone-300 p-5 rounded-2xl space-y-3 shadow-2xs">
                <h4 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#1f5f3f]" />
                  <span>Descargar o Copiar Respaldo Completo (JSON)</span>
                </h4>
                <p className="text-xs text-stone-600">
                  Guarde todos sus textos, encabezados, fotos personalizadas, cultivos, servicios y pestañas en un solo bloque JSON para restaurar en cualquier dispositivo.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyJSON}
                    className="inline-flex items-center gap-1.5 bg-[#1f5f3f] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#16472f]"
                  >
                    {copySuccess ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                    <span>{copySuccess ? '¡Copiado al portapapeles!' : 'Copiar Configuración JSON'}</span>
                  </button>
                </div>
              </div>

              <div className="bg-white border border-stone-300 p-5 rounded-2xl space-y-3 shadow-2xs">
                <h4 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#1f5f3f]" />
                  <span>Importar Configuración desde JSON</span>
                </h4>
                <textarea
                  rows={4}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Pegue aquí el texto JSON exportado..."
                  className="w-full p-3 text-xs font-mono bg-stone-50 border border-stone-300 rounded-xl"
                />
                {importError && (
                  <p className="text-xs text-rose-600 font-bold">{importError}</p>
                )}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleImportSubmit}
                    disabled={!importText.trim()}
                    className="inline-flex items-center gap-1.5 bg-stone-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-stone-800 disabled:opacity-40"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Importar y Aplicar Todo</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Editor Modal Bottom Bar */}
        <div className="px-5 py-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-stone-500 font-medium hidden sm:inline">
            Todos los cambios se guardan automáticamente en su navegador.
          </span>
          <button
            type="button"
            onClick={() => setIsEditorOpen(false)}
            className="inline-flex items-center gap-2 bg-[#1f5f3f] hover:bg-[#16472f] text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-md active:scale-95 ml-auto sm:ml-0"
          >
            <Check className="w-4 h-4" />
            <span>Listo / Cerrar Panel</span>
          </button>
        </div>

      </div>
    </div>
  );
};
