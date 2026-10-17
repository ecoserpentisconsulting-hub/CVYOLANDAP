import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PROFESSIONAL_INFO,
  VERIFIED_SERVICES,
  VERIFIED_PROJECTS,
  VERIFIED_EDUCATION_AND_CAREER,
  REGIONAL_ZONES,
  CROP_WATER_PROFILES,
  DEFAULT_SECTION_HEADERS,
  DEFAULT_HERO_CREDENTIALS,
  DEFAULT_FAQS,
  Service,
  Project,
  RegionalZone,
  CropWaterProfile,
  SectionHeaderData,
  HeroCredential,
  FAQItem
} from '../data/professionalData';

export interface SectionConfig {
  id: string;
  label: string;
  href: string;
  isVisible: boolean;
  description: string;
}

export interface PhotoTarget {
  id: string;
  type: 'hero_card' | 'hero_landscape' | 'project' | 'zone' | 'custom';
  currentUrl: string;
  label: string;
}

export interface WebsiteDataState {
  info: typeof PROFESSIONAL_INFO;
  sections: SectionConfig[];
  sectionHeaders: Record<string, SectionHeaderData>;
  heroCredentials: HeroCredential[];
  services: Service[];
  projects: Project[];
  education: typeof VERIFIED_EDUCATION_AND_CAREER;
  regionalZones: RegionalZone[];
  cropWaterProfiles: CropWaterProfile[];
  faqs: FAQItem[];
}

export const DEFAULT_SECTIONS: SectionConfig[] = [
  {
    id: 'perfil-cv',
    label: 'Perfil & CV',
    href: '#perfil-cv',
    isVisible: true,
    description: 'Resumen curricular, CIP, universidad y posgrado'
  },
  {
    id: 'servicios',
    label: 'Servicios',
    href: '#servicios',
    isVisible: true,
    description: 'Líneas de consultoría y asistencia técnica'
  },
  {
    id: 'proyectos',
    label: 'Proyectos & GIRH',
    href: '#proyectos',
    isVisible: true,
    description: 'Casos aplicados en territorio y microcuencas'
  },
  {
    id: 'calculadora',
    label: 'Calculadora Hídrica',
    href: '#calculadora',
    isVisible: true,
    description: 'Calculador interactivo de demanda de agua y riego'
  },
  {
    id: 'estadisticas-hidricas',
    label: 'Estadísticas & Impacto',
    href: '#estadisticas-hidricas',
    isVisible: true,
    description: 'Tablero de visitas y consultas generadas del calculador'
  },
  {
    id: 'cotizador',
    label: 'Cotizador de Asesoría',
    href: '#cotizador',
    isVisible: true,
    description: 'Herramienta de diagnóstico rápido y alcance'
  },
  {
    id: 'territorio',
    label: 'Territorio & Cuencas',
    href: '#territorio',
    isVisible: true,
    description: 'Áreas de trabajo en Cusco y sierra sur'
  },
  {
    id: 'trayectoria',
    label: 'Trayectoria',
    href: '#trayectoria',
    isVisible: true,
    description: 'Hitos cronológicos académicos y profesionales'
  },
  {
    id: 'contacto',
    label: 'Contacto',
    href: '#contacto',
    isVisible: true,
    description: 'Formulario y enlaces directos a WhatsApp y correo'
  }
];

const STORAGE_KEY = 'ypp_professional_website_custom_data_v5';

interface WebsiteContextType {
  data: WebsiteDataState;
  isEditorOpen: boolean;
  setIsEditorOpen: (open: boolean) => void;
  editorActiveTab: string;
  setEditorActiveTab: (tab: string) => void;
  openEditorTo: (tab: string) => void;
  isLiveEditing: boolean;
  setIsLiveEditing: (active: boolean) => void;
  activePhotoTarget: PhotoTarget | null;
  setActivePhotoTarget: (target: PhotoTarget | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  updateImage: (id: string, type: string, newUrl: string) => void;
  updateInfo: (updates: Partial<typeof PROFESSIONAL_INFO>) => void;
  updateSectionHeader: (sectionId: string, updates: Partial<SectionHeaderData>) => void;
  updateHeroCredential: (id: string, updates: Partial<HeroCredential>) => void;
  toggleSectionVisibility: (sectionId: string) => void;
  anularSection: (sectionId: string) => void;
  reactivateSection: (sectionId: string) => void;
  updateSectionLabel: (sectionId: string, newLabel: string) => void;
  reorderSections: (newSections: SectionConfig[]) => void;
  moveSectionUp: (index: number) => void;
  moveSectionDown: (index: number) => void;
  addCustomSection: (newSec: { label: string; href: string; description: string }) => void;
  deleteSectionPermanently: (sectionId: string) => void;
  updateService: (id: string, updated: Partial<Service>) => void;
  addService: (service: Service) => void;
  deleteService: (id: string) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updateEducationItem: (index: number, updated: any) => void;
  addEducationItem: (item: any) => void;
  deleteEducationItem: (index: number) => void;
  updateRegionalZone: (id: string, updated: Partial<RegionalZone>) => void;
  addRegionalZone: (zone: RegionalZone) => void;
  deleteRegionalZone: (id: string) => void;
  updateCropProfile: (id: string, updated: Partial<CropWaterProfile>) => void;
  addCropProfile: (crop: CropWaterProfile) => void;
  deleteCropProfile: (id: string) => void;
  updateFaq: (id: string, updated: Partial<FAQItem>) => void;
  addFaq: (faq: FAQItem) => void;
  deleteFaq: (id: string) => void;
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonString: string) => boolean;
}

const WebsiteDataContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<WebsiteDataState>(() => {
    try {
      // Check v5, fallback to v4 if existing
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('ypp_professional_website_custom_data_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        let loadedSections = parsed.sections && parsed.sections.length > 0 ? parsed.sections : [...DEFAULT_SECTIONS];
        // Ensure any new default sections are merged if missing
        const existingIds = new Set(loadedSections.map((s: any) => s.id));
        DEFAULT_SECTIONS.forEach((ds) => {
          if (!existingIds.has(ds.id)) {
            loadedSections.push(ds);
          }
        });

        // Ensure hero images are valid and not dead external links or unbundled /src/ paths
        const savedHeroUser = parsed.info?.heroImageUser;
        const isValidUserImg =
          savedHeroUser &&
          !savedHeroUser.includes('postimg.cc') &&
          !savedHeroUser.startsWith('/src/assets');
        const heroImageUser = isValidUserImg ? savedHeroUser : PROFESSIONAL_INFO.heroImageUser;

        const savedHeroLandscape = parsed.info?.heroImageLandscape;
        const isValidLandscapeImg =
          savedHeroLandscape && !savedHeroLandscape.startsWith('/src/assets');
        const heroImageLandscape = isValidLandscapeImg ? savedHeroLandscape : PROFESSIONAL_INFO.heroImageLandscape;

        // Sanitize projects images if they have old "/src/assets" strings
        const loadedProjects = (parsed.projects || VERIFIED_PROJECTS).map((p: any) => {
          if (p.image && p.image.startsWith('/src/assets')) {
            const defProj = VERIFIED_PROJECTS.find((vp) => vp.id === p.id);
            return { ...p, image: defProj ? defProj.image : p.image };
          }
          return p;
        });

        return {
          info: {
            ...PROFESSIONAL_INFO,
            ...(parsed.info || {}),
            heroImageUser,
            heroImageLandscape,
          },
          sections: loadedSections,
          sectionHeaders: { ...DEFAULT_SECTION_HEADERS, ...(parsed.sectionHeaders || {}) },
          heroCredentials: parsed.heroCredentials && parsed.heroCredentials.length > 0 ? parsed.heroCredentials : DEFAULT_HERO_CREDENTIALS,
          services: parsed.services || VERIFIED_SERVICES,
          projects: loadedProjects,
          education: parsed.education || VERIFIED_EDUCATION_AND_CAREER,
          regionalZones: parsed.regionalZones || REGIONAL_ZONES,
          cropWaterProfiles: parsed.cropWaterProfiles || CROP_WATER_PROFILES,
          faqs: parsed.faqs && parsed.faqs.length > 0 ? parsed.faqs : DEFAULT_FAQS,
        };
      }
    } catch (e) {
      console.warn('Error reading stored website data, using defaults', e);
    }

    return {
      info: PROFESSIONAL_INFO,
      sections: DEFAULT_SECTIONS,
      sectionHeaders: DEFAULT_SECTION_HEADERS,
      heroCredentials: DEFAULT_HERO_CREDENTIALS,
      services: VERIFIED_SERVICES,
      projects: VERIFIED_PROJECTS,
      education: VERIFIED_EDUCATION_AND_CAREER,
      regionalZones: REGIONAL_ZONES,
      cropWaterProfiles: CROP_WATER_PROFILES,
      faqs: DEFAULT_FAQS,
    };
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorActiveTab, setEditorActiveTab] = useState('sections');
  const [isLiveEditing, setIsLiveEditing] = useState(false);
  const [activePhotoTarget, setActivePhotoTarget] = useState<PhotoTarget | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  }, []);

  const openEditorTo = useCallback((tab: string) => {
    setEditorActiveTab(tab);
    setIsEditorOpen(true);
  }, []);

  // Auto-persist changes to localStorage safely
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Error saving to localStorage (likely quota)', e);
    }
  }, [data]);

  const updateInfo = (updates: Partial<typeof PROFESSIONAL_INFO>) => {
    setData((prev) => ({
      ...prev,
      info: { ...prev.info, ...updates },
    }));
    showToast('Datos personales y CV actualizados');
  };

  const updateSectionHeader = (sectionId: string, updates: Partial<SectionHeaderData>) => {
    setData((prev) => ({
      ...prev,
      sectionHeaders: {
        ...prev.sectionHeaders,
        [sectionId]: {
          ...(prev.sectionHeaders[sectionId] || DEFAULT_SECTION_HEADERS[sectionId] || { kicker: '', title: '', subtitle: '' }),
          ...updates,
        },
      },
    }));
    showToast('Encabezado de sección actualizado');
  };

  const updateHeroCredential = (id: string, updates: Partial<HeroCredential>) => {
    setData((prev) => ({
      ...prev,
      heroCredentials: prev.heroCredentials.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    }));
    showToast('Acreditación del Hero actualizada');
  };

  const updateImage = (id: string, type: string, newUrl: string) => {
    setData((prev) => {
      if (type === 'hero_card') {
        return {
          ...prev,
          info: { ...prev.info, heroImageUser: newUrl },
        };
      }
      if (type === 'hero_landscape') {
        return {
          ...prev,
          info: { ...prev.info, heroImageLandscape: newUrl },
        };
      }
      if (type === 'project') {
        return {
          ...prev,
          projects: prev.projects.map((p) => (p.id === id ? { ...p, image: newUrl } : p)),
        };
      }
      if (type === 'zone') {
        return {
          ...prev,
          regionalZones: prev.regionalZones.map((z) => (z.id === id ? { ...z, image: newUrl } : z)),
        };
      }
      return prev;
    });
    showToast('¡Fotografía guardada y actualizada con éxito!');
  };

  const toggleSectionVisibility = (sectionId: string) => {
    setData((prev) => {
      const targetSec = prev.sections.find((s) => s.id === sectionId);
      const willBeVisible = targetSec ? !targetSec.isVisible : true;
      showToast(willBeVisible ? `Pestaña "${targetSec?.label}" ahora está VISIBLE` : `Pestaña "${targetSec?.label}" fue RETIRADA / OCULTADA`);
      return {
        ...prev,
        sections: prev.sections.map((sec) =>
          sec.id === sectionId ? { ...sec, isVisible: !sec.isVisible } : sec
        ),
      };
    });
  };

  const anularSection = (sectionId: string) => {
    setData((prev) => {
      const targetSec = prev.sections.find((s) => s.id === sectionId);
      showToast(`Sección "${targetSec?.label || sectionId}" anulada (retirada del menú y de la vista).`);
      return {
        ...prev,
        sections: prev.sections.map((sec) =>
          sec.id === sectionId ? { ...sec, isVisible: false } : sec
        ),
      };
    });
  };

  const reactivateSection = (sectionId: string) => {
    setData((prev) => {
      const targetSec = prev.sections.find((s) => s.id === sectionId);
      showToast(`Sección "${targetSec?.label || sectionId}" restaurada y visible.`);
      return {
        ...prev,
        sections: prev.sections.map((sec) =>
          sec.id === sectionId ? { ...sec, isVisible: true } : sec
        ),
      };
    });
  };

  const updateSectionLabel = (sectionId: string, newLabel: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) =>
        sec.id === sectionId ? { ...sec, label: newLabel } : sec
      ),
    }));
  };

  const reorderSections = (newSections: SectionConfig[]) => {
    setData((prev) => ({
      ...prev,
      sections: newSections,
    }));
    showToast('Orden de pestañas guardado');
  };

  const moveSectionUp = (index: number) => {
    if (index <= 0) return;
    setData((prev) => {
      const next = [...prev.sections];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return { ...prev, sections: next };
    });
  };

  const moveSectionDown = (index: number) => {
    setData((prev) => {
      if (index >= prev.sections.length - 1) return prev;
      const next = [...prev.sections];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return { ...prev, sections: next };
    });
  };

  const addCustomSection = (newSec: { label: string; href: string; description: string }) => {
    const id = `custom-${Date.now()}`;
    const formattedHref = newSec.href.startsWith('#') ? newSec.href : `#${newSec.href}`;
    const newSectionConfig: SectionConfig = {
      id,
      label: newSec.label || 'Nueva Pestaña',
      href: formattedHref,
      isVisible: true,
      description: newSec.description || 'Pestaña personalizada',
    };
    setData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSectionConfig],
      sectionHeaders: {
        ...prev.sectionHeaders,
        [id]: {
          kicker: 'Sección Personalizada',
          title: newSec.label || 'Nueva Pestaña',
          subtitle: newSec.description || '',
        },
      },
    }));
    showToast(`Pestaña "${newSectionConfig.label}" agregada`);
  };

  const deleteSectionPermanently = (sectionId: string) => {
    setData((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
    }));
    showToast('Pestaña eliminada del sistema');
  };

  const updateService = (id: string, updated: Partial<Service>) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
    showToast('Servicio actualizado');
  };

  const addService = (newService: Service) => {
    setData((prev) => ({
      ...prev,
      services: [newService, ...prev.services],
    }));
    showToast('Nuevo servicio agregado');
  };

  const deleteService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
    showToast('Servicio anulado / eliminado');
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
    showToast('Proyecto actualizado');
  };

  const addProject = (newProject: Project) => {
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
    showToast('Nuevo proyecto agregado');
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    showToast('Proyecto anulado / retirado');
  };

  const updateEducationItem = (index: number, updated: any) => {
    setData((prev) => {
      const nextEd = [...prev.education];
      nextEd[index] = { ...nextEd[index], ...updated };
      return { ...prev, education: nextEd };
    });
    showToast('Hito de trayectoria actualizado');
  };

  const addEducationItem = (item: any) => {
    setData((prev) => ({
      ...prev,
      education: [item, ...prev.education],
    }));
    showToast('Nuevo hito de trayectoria agregado');
  };

  const deleteEducationItem = (index: number) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
    showToast('Hito de trayectoria anulado / eliminado');
  };

  const updateRegionalZone = (id: string, updated: Partial<RegionalZone>) => {
    setData((prev) => ({
      ...prev,
      regionalZones: prev.regionalZones.map((z) => (z.id === id ? { ...z, ...updated } : z)),
    }));
    showToast('Zona territorial actualizada');
  };

  const addRegionalZone = (zone: RegionalZone) => {
    setData((prev) => ({
      ...prev,
      regionalZones: [...prev.regionalZones, zone],
    }));
    showToast('Nueva zona territorial agregada');
  };

  const deleteRegionalZone = (id: string) => {
    setData((prev) => ({
      ...prev,
      regionalZones: prev.regionalZones.filter((z) => z.id !== id),
    }));
    showToast('Zona territorial eliminada');
  };

  const updateCropProfile = (id: string, updated: Partial<CropWaterProfile>) => {
    setData((prev) => ({
      ...prev,
      cropWaterProfiles: prev.cropWaterProfiles.map((c) => (c.id === id ? { ...c, ...updated } : c)),
    }));
    showToast('Perfil de cultivo actualizado');
  };

  const addCropProfile = (crop: CropWaterProfile) => {
    setData((prev) => ({
      ...prev,
      cropWaterProfiles: [...prev.cropWaterProfiles, crop],
    }));
    showToast('Nuevo cultivo agregado al calculador');
  };

  const deleteCropProfile = (id: string) => {
    setData((prev) => ({
      ...prev,
      cropWaterProfiles: prev.cropWaterProfiles.filter((c) => c.id !== id),
    }));
    showToast('Cultivo eliminado del calculador');
  };

  const updateFaq = (id: string, updated: Partial<FAQItem>) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    }));
    showToast('Pregunta frecuente actualizada');
  };

  const addFaq = (faq: FAQItem) => {
    setData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, faq],
    }));
    showToast('Nueva pregunta frecuente agregada');
  };

  const deleteFaq = (id: string) => {
    setData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((f) => f.id !== id),
    }));
    showToast('Pregunta frecuente eliminada');
  };

  const resetToDefaults = () => {
    const defaultState: WebsiteDataState = {
      info: PROFESSIONAL_INFO,
      sections: DEFAULT_SECTIONS,
      sectionHeaders: DEFAULT_SECTION_HEADERS,
      heroCredentials: DEFAULT_HERO_CREDENTIALS,
      services: VERIFIED_SERVICES,
      projects: VERIFIED_PROJECTS,
      education: VERIFIED_EDUCATION_AND_CAREER,
      regionalZones: REGIONAL_ZONES,
      cropWaterProfiles: CROP_WATER_PROFILES,
      faqs: DEFAULT_FAQS,
    };
    setData(defaultState);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Todos los datos restaurados a los originales del CV');
  };

  const exportJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.info && Array.isArray(parsed.sections)) {
        setData({
          info: { ...PROFESSIONAL_INFO, ...(parsed.info || {}) },
          sections: parsed.sections || DEFAULT_SECTIONS,
          sectionHeaders: { ...DEFAULT_SECTION_HEADERS, ...(parsed.sectionHeaders || {}) },
          heroCredentials: parsed.heroCredentials || DEFAULT_HERO_CREDENTIALS,
          services: parsed.services || VERIFIED_SERVICES,
          projects: parsed.projects || VERIFIED_PROJECTS,
          education: parsed.education || VERIFIED_EDUCATION_AND_CAREER,
          regionalZones: parsed.regionalZones || REGIONAL_ZONES,
          cropWaterProfiles: parsed.cropWaterProfiles || CROP_WATER_PROFILES,
          faqs: parsed.faqs || DEFAULT_FAQS,
        });
        showToast('¡Configuración completa importada con éxito!');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <WebsiteDataContext.Provider
      value={{
        data,
        isEditorOpen,
        setIsEditorOpen,
        editorActiveTab,
        setEditorActiveTab,
        openEditorTo,
        isLiveEditing,
        setIsLiveEditing,
        activePhotoTarget,
        setActivePhotoTarget,
        toastMessage,
        showToast,
        updateImage,
        updateInfo,
        updateSectionHeader,
        updateHeroCredential,
        toggleSectionVisibility,
        anularSection,
        reactivateSection,
        updateSectionLabel,
        reorderSections,
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
        resetToDefaults,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </WebsiteDataContext.Provider>
  );
};

export const useWebsiteData = () => {
  const context = useContext(WebsiteDataContext);
  if (!context) {
    throw new Error('useWebsiteData must be used within a WebsiteDataProvider');
  }
  return context;
};
