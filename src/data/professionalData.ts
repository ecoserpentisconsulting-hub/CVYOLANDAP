import cvOriginalImg from '../assets/cv_original.webp';
import cvImageJpg from '../assets/cv_image.jpg';
import andeanLandscapeImg from '../assets/images/andean_agricultural_landscape_1792095724280.jpg';
import waterHarvestingImg from '../assets/images/water_harvesting_cocha_1792095739786.jpg';
import nativeSeedsImg from '../assets/images/native_seeds_agroecology_1792095739524.jpg';

export { cvOriginalImg, cvImageJpg, andeanLandscapeImg, waterHarvestingImg, nativeSeedsImg };

export interface Project {
  id: string;
  title: string;
  category: 'girh' | 'cambio-climatico' | 'agroturismo' | 'agroecologia' | 'cooperacion';
  categoryLabel: string;
  location: string;
  scope: string;
  academicOrInstitutionalBacking: string;
  summary: string;
  objective: string;
  methodologyAndResults: string;
  keyPillars: string[];
  tags: string[];
  image: string;
  technicalSpecs: string[];
}

export interface Service {
  id: string;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  targetEntities: string;
  audience?: string;
  estimatedTimeline?: string;
}

export interface RegionalZone {
  id: string;
  name: string;
  province: string;
  altitudeRange: string;
  focusArea: string;
  highlight: string;
}

export interface CropWaterProfile {
  id: string;
  name: string;
  scientificName: string;
  dailyNeedMmMin: number;
  dailyNeedMmMax: number;
  criticalStage: string;
  recommendedSystem: string;
  efficiencyGain: string;
  frequencyDays: string;
  altitudeRange: string;
  notes: string;
}

export interface SectionHeaderData {
  kicker: string;
  title: string;
  subtitle: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface HeroCredential {
  id: string;
  label: string;
  title: string;
  institution: string;
}

export const DEFAULT_SECTION_HEADERS: Record<string, SectionHeaderData> = {
  'perfil-cv': {
    kicker: 'Perfil Profesional & Acreditación CIP',
    title: 'Ingeniería Agrónoma para un territorio resiliente',
    subtitle: 'Consultoría internacional en sostenibilidad • Gestión hídrica • Agroecología andina',
  },
  'servicios': {
    kicker: 'Servicios Profesionales Acreditados',
    title: 'Consultoría técnica en agronomía, cuencas y sostenibilidad',
    subtitle: 'Servicios profesionales directos formulados conforme a la normativa técnica peruana (ANA, MIDAGRI) y estándares internacionales de cooperación.',
  },
  'proyectos': {
    kicker: 'Investigaciones Aplicadas y Proyectos en Territorio',
    title: 'Gestión hídrica, conservación y desarrollo rural',
    subtitle: 'Trabajos de especialización técnica y de posgrado respaldados por instituciones académicas (UNSAAC, Fondo Verde) y experiencias en microcuencas del Cusco.',
  },
  'calculadora': {
    kicker: 'Herramienta Técnica Interactiva',
    title: 'Calculador de Demanda Hídrica y Ahorro en Riego Andino',
    subtitle: 'Estime en segundos el volumen diario de agua (m³/día), el caudal de diseño necesario (litros por segundo) y el porcentaje de ahorro al tecnificar sus parcelas según el cultivo andino.',
  },
  'estadisticas-hidricas': {
    kicker: 'Monitoreo de Consultas y Métricas de Riego',
    title: 'Tablero de Impacto Agronómico y Visitas Generadas',
    subtitle: 'Registro analítico de visitas a la calculadora técnica, consultas canalizadas hacia WhatsApp y adopción de tecnologías de riego en la sierra sur.',
  },
  'cotizador': {
    kicker: 'Diagnóstico Rápido y Alcance de Trabajo',
    title: 'Configure el alcance de su consultoría agronómica',
    subtitle: 'Seleccione el tipo de asesoría, ubicación y dimensión para conocer los entregables técnicos recomendados y el cronograma estimado.',
  },
  'territorio': {
    kicker: 'Presencia Territorial y Cuencas Hidrográficas',
    title: 'Ámbito de acción e investigación en el territorio andino',
    subtitle: 'Experiencia técnica de campo en pisos altitudinales de Cusco, con énfasis en la microcuenca de Lucre, el sitio Ramsar Lucre-Huacarpay y valles interandinos.',
  },
  'trayectoria': {
    kicker: 'Curriculum Vitae & Trayectoria Acreditada',
    title: 'Formación académica rigurosa y experiencia profesional',
    subtitle: 'Información respaldada por la Universidad Nacional de San Antonio Abad del Cusco, el Colegio de Ingenieros del Perú y el Fondo Verde Institute.',
  },
  'contacto': {
    kicker: 'Contacto Directo & Coordinación de Visitas',
    title: 'Inicie su proyecto agrícola o hídrico hoy',
    subtitle: 'Canales de comunicación directa con la profesional. Evaluamos solicitudes en todo el ámbito regional y de cooperación técnica.',
  },
};

export const DEFAULT_HERO_CREDENTIALS: HeroCredential[] = [
  {
    id: 'cred-1',
    label: 'Grado Académico de Pregrado',
    title: 'Ingeniera Agrónoma Colegiada',
    institution: 'UNSAAC · Reg. CIP 90161',
  },
  {
    id: 'cred-2',
    label: 'Posgrado Internacional',
    title: 'Máster en Cambio Climático y Valoración',
    institution: 'Fondo Verde International Institute (2013)',
  },
  {
    id: 'cred-3',
    label: 'Respaldo Institucional Oficial',
    title: 'Colegio de Ingenieros del Perú - CD Cusco',
    institution: 'Habilitada para suscripción técnica de expedientes y proyectos',
  },
];

export const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: '¿Qué incluye un estudio de Balance Hídrico y GIRH a nivel de microcuenca?',
    answer: 'Comprende el diagnóstico biofísico de la cuenca, aforo de fuentes de agua (manantiales, ríos), estimación de la demanda agrícola e hídrica poblacional, zonificación de áreas de recarga y el planteamiento concertado de reglas de distribución y gobernanza local.',
    category: 'Gestión Hídrica',
  },
  {
    id: 'faq-2',
    question: '¿Emite informes técnicos con firma y sello oficial del CIP?',
    answer: 'Sí. Todos los expedientes técnicos, memorias descriptivas, fichas de balance hídrico y evaluaciones de vulnerabilidad climática cuentan con habilitación vigente del Colegio de Ingenieros del Perú (CIP 90161).',
    category: 'Acreditación',
  },
  {
    id: 'faq-3',
    question: '¿Cómo se articula el agroturismo con la conservación de la agrobiodiversidad?',
    answer: 'Diseñamos circuitos vivenciales donde los campesinos valorizan sus cultivos nativos y saberes ancestrales frente a visitantes responsables, generando ingresos complementarios que reducen la presión extractiva y evitan la pérdida de germoplasma andino.',
    category: 'Agroturismo',
  },
  {
    id: 'faq-4',
    question: '¿Cuál es el ámbito geográfico de cobertura para visitas de campo?',
    answer: 'Atención presencial en todo el departamento del Cusco (Quispicanchi, Valle Sagrado, Anta, Canchis, Espinar, Chumbivilcas) y coordinación para consultorías en Apurímac, Puno y el sur del Perú.',
    category: 'Cobertura',
  },
];

export const PROFESSIONAL_INFO = {
  name: "Ing. Yolanda Paucar Pérez",
  shortTitle: "Yolanda Paucar",
  cip: "CIP 90161",
  college: "Colegio de Ingenieros del Perú - Consejo Departamental Cusco",
  profession: "Ingeniera Agrónoma",
  university: "Universidad Nacional de San Antonio Abad del Cusco (UNSAAC)",
  masterDegree: "Máster Internacional en Cambio Climático y Valoración (Fondo Verde Institute, 2013)",
  masterProject: "Gestión Integral de los Recursos Hídricos en la Microcuenca de Lucre",
  specialties: [
    "Producción y Medio Ambiente",
    "Gestión Integral de Recursos Hídricos (GIRH)",
    "Cambio Climático y Valoración Ambiental",
    "Agroecología Andina",
    "Turismo Rural Comunitario y Agroturismo",
    "Desarrollo Sostenible y Resiliencia Territorial"
  ],
  tagline: "Ingeniería Agrónoma para un territorio resiliente",
  subtagline: "Consultoría internacional en sostenibilidad • Gestión hídrica • Agroecología andina",
  coreValues: ["Sostenible", "Resiliente", "Territorial"],
  phone: "+51 984 931 878",
  phoneDisplay: "984-931878",
  phoneRaw: "51984931878",
  email: "yolypaucar@hotmail.com",
  location: "Cusco, Perú",
  officeHours: "Lunes a Viernes: 8:00 am - 6:00 pm · Sábados: 9:00 am - 1:00 pm",
  responseTime: "Respuesta habitual en menos de 2 horas vía WhatsApp",
  footerNotice: "Servicios de consultoría agronómica, formulación de proyectos GIRH y asistencia técnica conforme a estándares profesionales y éticos del CIP.",
  heroImageUser: cvOriginalImg,
  heroImageLandscape: andeanLandscapeImg,
  profileSummary: "Ingeniera Agrónoma colegiada (CIP 90161) egresada de la Universidad Nacional de San Antonio Abad del Cusco, con Máster Internacional en Cambio Climático y Valoración. Especialista en producción y medio ambiente, gestión integral de cuencas hídricas, turismo rural comunitario y desarrollo sostenible. Amplia experiencia profesional como coordinadora de proyectos y consultora técnica para organizaciones privadas, instituciones públicas y organismos de cooperación internacional."
};

export const VERIFIED_PROJECTS: Project[] = [
  {
    id: "girh-microcuenca-lucre",
    title: "Gestión Integral de los Recursos Hídricos en la Microcuenca de Lucre",
    category: "girh",
    categoryLabel: "Gestión Integral del Agua (GIRH)",
    location: "Microcuenca de Lucre, Quispicanchi - Cusco",
    scope: "Investigación aplicada y planificación hidrológica de microcuenca",
    academicOrInstitutionalBacking: "Fondo Verde Institute · Tesis de Máster Internacional (2013)",
    summary: "Diagnóstico biofísico, balance de demanda y oferta hídrica y propuesta de ordenamiento participativo para el uso sostenible del agua entre la agricultura, consumo humano y conservación del ecosistema.",
    objective: "Evaluar la vulnerabilidad climática de las fuentes hídricas y diseñar una estrategia de gestión integral del agua basada en la gobernanza local y la recarga de acuíferos.",
    methodologyAndResults: "Caracterización hidrológica de fuentes superficiales y subterráneas, aforo multitemporal, análisis de usos consuntivos y no consuntivos, y articulación con los comités de regantes y autoridades de la microcuenca.",
    keyPillars: [
      "Balance hidrológico de la microcuenca",
      "Plan de protección de fuentes y bofedales",
      "Acuerdos de gobernanza entre usuarios agrarios y poblacionales"
    ],
    tags: ["GIRH", "Microcuenca Lucre", "Recursos Hídricos", "Gobernanza"],
    image: waterHarvestingImg,
    technicalSpecs: [
      "Inventario geoespacial de manantiales y captaciones de la microcuenca",
      "Evaluación del impacto del cambio climático en el régimen de estiaje",
      "Propuesta de zonificación hidrológica y fajas de protección",
      "Lineamientos de articulación con la Autoridad Nacional del Agua (ANA)"
    ]
  },
  {
    id: "agroturismo-agrobiodiversidad-lucre-huacarpay",
    title: "Promoción del Agroturismo para la Conservación de la Agrobiodiversidad en el Humedal Lucre-Huacarpay",
    category: "agroturismo",
    categoryLabel: "Agroturismo y Conservación",
    location: "Humedal Ramsar Lucre-Huacarpay, Cusco",
    scope: "Publicación técnica y proyecto de desarrollo rural sostenible",
    academicOrInstitutionalBacking: "Investigación y Publicación en Desarrollo Sostenible (2006)",
    summary: "Revalorización del paisaje productivo andino, conservación de variedades nativas y diversificación de ingresos campesinos mediante el turismo rural comunitario y agroturismo.",
    objective: "Mitigar la pobreza rural mediante la puesta en valor de los sistemas agrícolas tradicionales, los saberes locales y la protección del sitio Ramsar Lucre-Huacarpay.",
    methodologyAndResults: "Diseño de rutas agroturísticas vivenciales en parcelas demostrativas, inventario de agrobiodiversidad local y capacitación a familias comuneras en servicios turísticos y buenas prácticas agrícolas.",
    keyPillars: [
      "Conservación in situ de germoplasma andino",
      "Puesta en valor del paisaje cultural y humedal",
      "Diversificación económica contra la pobreza rural"
    ],
    tags: ["Agroturismo", "Humedal Huacarpay", "Agrobiodiversidad", "Turismo Rural"],
    image: andeanLandscapeImg,
    technicalSpecs: [
      "Metodología de agroturismo con enfoque de conservación ambiental",
      "Rescate de técnicas ancestrales de cultivo y manejo de suelos",
      "Articulación intersectorial entre agricultura, ecoturismo y cultura local"
    ]
  },
  {
    id: "consultoria-cambio-climatico",
    title: "Consultoría en Adaptación al Cambio Climático y Resiliencia Territorial",
    category: "cambio-climatico",
    categoryLabel: "Cambio Climático & Sostenibilidad",
    location: "Región Cusco y Sierra Sur del Perú",
    scope: "Consultoría y asistencia técnica especializada",
    academicOrInstitutionalBacking: "Especialización de Máster en Cambio Climático y Valoración",
    summary: "Formulación de medidas de adaptación y mitigación frente a variaciones climáticas extremas (sequías, heladas, alteraciones de regímenes de lluvia) en sistemas agrarios altoandinos.",
    objective: "Desarrollar capacidades de resiliencia comunitaria y fortalecer las cadenas de producción agrícola familiar frente al estrés hídrico y térmico.",
    methodologyAndResults: "Diagnósticos de vulnerabilidad climática participativos, integración de bioindicadores andinos con datos meteorológicos y planes de contingencia productiva.",
    keyPillars: [
      "Planes de resiliencia agrícola comunitaria",
      "Siembra y cosecha de agua de lluvia",
      "Manejo adaptativo de cultivos andinos"
    ],
    tags: ["Cambio Climático", "Resiliencia Territorial", "Adaptación", "Sierra Sur"],
    image: waterHarvestingImg,
    technicalSpecs: [
      "Enfoque de gestión de riesgos climáticos en cuencas vulnerables",
      "Valoración ambiental y económica de servicios ecosistémicos",
      "Metodologías participativas de extensión rural"
    ]
  },
  {
    id: "agroecologia-produccion-medio-ambiente",
    title: "Asistencia Técnica en Agroecología, Manejo de Suelos y Producción Sostenible",
    category: "agroecologia",
    categoryLabel: "Agroecología Andina",
    location: "Valles y Comunidades Campesinas de Cusco",
    scope: "Coordinación técnica y acompañamiento agronómico",
    academicOrInstitutionalBacking: "Facultad de Ciencias Agrarias · UNSAAC",
    summary: "Transición hacia modelos agrícolas limpios, enriquecimiento biológico de suelos, uso de abonos orgánicos y control fitosanitario ecológico sin daño residual al ecosistema.",
    objective: "Proteger la salud del suelo andino, mejorar la fertilidad natural y garantizar la soberanía y seguridad alimentaria de los productores.",
    methodologyAndResults: "Talleres prácticos de elaboración de biopreparados, compostaje, manejo de microorganismos benéficos y rotación equilibrada de cultivos.",
    keyPillars: [
      "Nutrición biológica y regeneración de suelos",
      "Control ecológico de plagas y enfermedades",
      "Prácticas agrícolas no contaminantes"
    ],
    tags: ["Agroecología", "Suelos Andinos", "Producción Limpia", "Medio Ambiente"],
    image: nativeSeedsImg,
    technicalSpecs: [
      "Diagnóstico agroecológico de parcelas de cultivo",
      "Protocolos de biofertilización y conservación de materia orgánica",
      "Asesoría técnica adaptada al calendario agrícola andino"
    ]
  },
  {
    id: "coordinacion-proyectos-cooperacion",
    title: "Coordinación y Formulación de Proyectos de Desarrollo Rural y Cooperación",
    category: "cooperacion",
    categoryLabel: "Cooperación & Gestión Pública/Privada",
    location: "Ámbito Regional Cusco y Sur del Perú",
    scope: "Dirección, monitoreo y evaluación de intervenciones de desarrollo",
    academicOrInstitutionalBacking: "Experiencia en Organismos Públicos, Privados y de Cooperación Internacional",
    summary: "Planificación operativa, gestión presupuestal, supervisión técnica en campo y articulación comunitaria para proyectos de infraestructura agrícola y desarrollo económico rural.",
    objective: "Asegurar el cumplimiento riguroso de metas técnicas, la sostenibilidad de las obras en manos de las comunidades y la rendición técnica transparente ante cooperantes y el Estado.",
    methodologyAndResults: "Gestión por resultados, metodologías de marco lógico, evaluación de impacto y trabajo de campo directo con comunidades en quechua y castellano.",
    keyPillars: [
      "Planificación y monitoreo técnico de proyectos",
      "Articulación interinstitucional multiactor",
      "Supervisión y transferencia de capacidades"
    ],
    tags: ["Cooperación Internacional", "Gestión de Proyectos", "Desarrollo Rural", "Supervisión"],
    image: andeanLandscapeImg,
    technicalSpecs: [
      "Monitoreo con indicadores de impacto socioambiental",
      "Formulación técnica bajo estándares normativos vigentes",
      "Facilitación intercultural y resolución de conflictos por el agua"
    ]
  }
];

export const VERIFIED_SERVICES: Service[] = [
  {
    id: "girh-servicios",
    title: "Gestión Integral de Recursos Hídricos (GIRH) & Cuencas",
    iconName: "Droplets",
    shortDesc: "Estudios hidrológicos, balance hídrico, delimitación de microcuencas y planes de ordenamiento del agua para comunidades y organizaciones.",
    fullDesc: "Diagnóstico integral del sistema hídrico de la cuenca, aforos de manantiales y ríos, análisis de disponibilidad y demanda hídrica, elaboración de planes de gestión de cuenca y protección de fuentes frente a eventos de estiaje.",
    deliverables: [
      "Estudio de balance hídrico de cuenca / microcuenca",
      "Inventario geoespacial de fuentes de agua y tomas de captación",
      "Propuesta de gobernanza y acuerdos de uso equitativo del agua",
      "Plan de protección de cabeceras de cuenca y zonas de recarga"
    ],
    targetEntities: "Juntas de usuarios de agua, comités de regantes, municipalidades y entidades de desarrollo rural",
    audience: "Juntas de regantes, municipalidades y entidades de cuenca",
    estimatedTimeline: "4 a 6 semanas"
  },
  {
    id: "cambio-climatico-servicios",
    title: "Consultoría en Sostenibilidad, Cambio Climático y Resiliencia",
    iconName: "Mountain",
    shortDesc: "Diagnósticos de vulnerabilidad climática, planes de adaptación y estrategias de resiliencia territorial para sistemas agropecuarios.",
    fullDesc: "Evaluación del impacto del cambio climático en la producción agrícola y los recursos naturales, diseño de medidas de contingencia frente a sequías y heladas, y valorización ambiental de los servicios ecosistémicos.",
    deliverables: [
      "Plan de adaptación al cambio climático sectorial o comunal",
      "Matriz de evaluación de vulnerabilidad agroclimática",
      "Propuesta de siembra y cosecha de agua de lluvia",
      "Estrategia de resiliencia productiva para la agricultura familiar"
    ],
    targetEntities: "Organismos de cooperación internacional, ONG de desarrollo, gobiernos locales y regionales",
    audience: "Cooperación internacional y gobiernos subnacionales",
    estimatedTimeline: "3 a 5 semanas"
  },
  {
    id: "agroecologia-servicios",
    title: "Asesoría en Agroecología y Producción Limpia",
    iconName: "Sprout",
    shortDesc: "Asistencia técnica en manejo biológico de suelos, abonos orgánicos, control ecológico de plagas y conservación de agrobiodiversidad.",
    fullDesc: "Acompañamiento técnico a productores en la transición agroecológica, revalorización de cultivos andinos nativos, optimización de la fertilidad del suelo y reducción de la dependencia de insumos químicos sintéticos.",
    deliverables: [
      "Plan de manejo agroecológico del predio",
      "Recetarios de biopreparados y manejo de microorganismos de montaña",
      "Guías de campo para control biológico y etológico de plagas",
      "Talleres prácticos de capacitación 'aprender haciendo'"
    ],
    targetEntities: "Asociaciones de productores, cooperativas agrarias, fundos sostenibles y proyectos de seguridad alimentaria",
    audience: "Asociaciones de productores y fincas sostenibles",
    estimatedTimeline: "2 a 4 semanas"
  },
  {
    id: "agroturismo-servicios",
    title: "Agroturismo y Turismo Rural Comunitario",
    iconName: "Compass",
    shortDesc: "Diseño y puesta en valor de circuitos agroturísticos, paisaje cultural andino y conservación de la biodiversidad agrícola.",
    fullDesc: "Formulación de proyectos que articulan la actividad agrícola tradicional con el turismo vivencial y de naturaleza, promoviendo la conservación de la agrobiodiversidad como fuente de ingresos para las familias rurales.",
    deliverables: [
      "Diseño de rutas y circuitos agroturísticos comunitarios",
      "Fichas de catalogación del patrimonio agrícola y paisajístico",
      "Módulos de capacitación a familias campesinas anfitrionas",
      "Estrategia de articulación con operadores de turismo responsable"
    ],
    targetEntities: "Comunidades campesinas, asociaciones de turismo rural, direcciones de turismo y proyectos de ecoturismo",
    audience: "Comunidades y asociaciones de turismo vivencial",
    estimatedTimeline: "3 a 6 semanas"
  },
  {
    id: "coordinacion-proyectos-servicios",
    title: "Coordinación, Monitoreo y Asistencia Técnica de Proyectos",
    iconName: "Users",
    shortDesc: "Coordinación técnica en campo, formulación bajo marco lógico y supervisión de proyectos de desarrollo rural y cooperación.",
    fullDesc: "Dirección técnica y operativa de proyectos de inversión productiva y cooperación internacional, supervisión del cumplimiento de metas agronómicas y articulación intercultural con las autoridades comunales.",
    deliverables: [
      "Términos de referencia y planes operativos de proyecto",
      "Informes de monitoreo técnico y evaluación de avances",
      "Protocolos de transferencia tecnológica comunal",
      "Informes finales de cierre y lecciones aprendidas"
    ],
    targetEntities: "Organismos de cooperación técnica internacional, ministerios, gobiernos subnacionales y fundaciones",
    audience: "Cooperación técnica y sector público",
    estimatedTimeline: "Continuo o por hitos"
  }
];

export const SERVICES = VERIFIED_SERVICES;
export const PROJECTS = VERIFIED_PROJECTS;

export const REGIONAL_ZONES: RegionalZone[] = [
  {
    id: "microcuenca-lucre",
    name: "Microcuenca de Lucre & Huacarpay",
    province: "Quispicanchi, Cusco",
    altitudeRange: "3,000 - 3,900 msnm",
    focusArea: "Gestión Integral de Recursos Hídricos (GIRH), Agroturismo y Conservación del Humedal",
    highlight: "Área de investigación y tesis de máster en GIRH y conservación de agrobiodiversidad."
  },
  {
    id: "valle-sagrado",
    name: "Valle Sagrado de los Incas",
    province: "Urubamba & Calca, Cusco",
    altitudeRange: "2,700 - 3,100 msnm",
    focusArea: "Gestión de agua para riego, agroecología andina y paisajes productivos",
    highlight: "Asesoría en tecnologías de riego y producción limpia en pisos de valle."
  },
  {
    id: "cuenca-vilcanota",
    name: "Cuenca del Río Vilcanota / Urubamba",
    province: "Cusco & Canchis",
    altitudeRange: "3,100 - 4,200 msnm",
    focusArea: "Planificación territorial de cuencas, gobernanza del agua y resiliencia climática",
    highlight: "Balance hídrico y articulación entre comunidades de cabecera y valle."
  },
  {
    id: "sierra-sur",
    name: "Sierra Sur del Perú",
    province: "Cusco, Apurímac y Puno",
    altitudeRange: "2,800 - 4,300 msnm",
    focusArea: "Proyectos de desarrollo rural, cooperación internacional y adaptación a sequías y heladas",
    highlight: "Coordinación y asistencia técnica con organismos internacionales y sector público."
  }
];

export const CROP_WATER_PROFILES: CropWaterProfile[] = [
  {
    id: "papa-nativa",
    name: "Papa Nativa Andina",
    scientificName: "Solanum tuberosum andigenum",
    dailyNeedMmMin: 3.5,
    dailyNeedMmMax: 5.5,
    criticalStage: "Tuberización y floración",
    recommendedSystem: "Aspersión de baja presión o goteo",
    efficiencyGain: "40% - 45% respecto al riego tradicional",
    frequencyDays: "Cada 5 a 7 días según textura",
    altitudeRange: "3,200 - 4,100 msnm",
    notes: "Evitar encharcamientos en maduración para proteger la sanidad de los tubérculos nativos."
  },
  {
    id: "maiz-urubamba",
    name: "Maíz Blanco Gigante",
    scientificName: "Zea mays var. amilácea",
    dailyNeedMmMin: 4.5,
    dailyNeedMmMax: 7.0,
    criticalStage: "Floración (panoja) y llenado de grano",
    recommendedSystem: "Aspersión sectorial o goteo",
    efficiencyGain: "45% - 50% de ahorro hídrico",
    frequencyDays: "Cada 6 a 8 días",
    altitudeRange: "2,700 - 3,100 msnm",
    notes: "Cultivo emblemático de valles interandinos con alta demanda en floración."
  },
  {
    id: "quinua",
    name: "Quinua Andina",
    scientificName: "Chenopodium quinoa",
    dailyNeedMmMin: 2.5,
    dailyNeedMmMax: 4.0,
    criticalStage: "Emergencia y fase lechosa",
    recommendedSystem: "Microaspersión o aspersión",
    efficiencyGain: "50% de eficiencia frente a gravedad",
    frequencyDays: "Cada 8 a 12 días",
    altitudeRange: "3,000 - 3,900 msnm",
    notes: "Alta rusticidad andina; sensible a la saturación hídrica prolongada."
  },
  {
    id: "hortalizas",
    name: "Hortalizas de Huerto Andino",
    scientificName: "Hortícolas variadas",
    dailyNeedMmMin: 3.0,
    dailyNeedMmMax: 5.0,
    criticalStage: "Crecimiento vegetativo continuo",
    recommendedSystem: "Goteo o microaspersión",
    efficiencyGain: "60% de eficiencia neta",
    frequencyDays: "Riego frecuente en pulsos cortos",
    altitudeRange: "2,600 - 3,500 msnm",
    notes: "Base de la producción limpia agroecológica y soberanía alimentaria."
  },
  {
    id: "alfalfa-pastos",
    name: "Alfalfa y Pastos Andinos",
    scientificName: "Medicago sativa / Lolium",
    dailyNeedMmMin: 4.0,
    dailyNeedMmMax: 6.5,
    criticalStage: "Rebrote post-corte o pastoreo",
    recommendedSystem: "Aspersión presurizada",
    efficiencyGain: "40% de ahorro hídrico",
    frequencyDays: "Cada 7 a 10 días",
    altitudeRange: "2,800 - 3,850 msnm",
    notes: "Soporte clave de la actividad agropecuaria y protección de suelos contra la erosión."
  }
];

export const VERIFIED_EDUCATION_AND_CAREER = [
  {
    category: "Posgrado",
    title: "Máster Internacional en Cambio Climático y Valoración",
    institution: "Fondo Verde Institute",
    period: "Graduación: 2013",
    detail: "Proyecto de graduación: 'Gestión Integral de los Recursos Hídricos en la Microcuenca de Lucre'. Especialización en evaluación de impacto, resiliencia y valorización ambiental."
  },
  {
    category: "Pregrado",
    title: "Ingeniera Agrónoma Colegiada y Habilitada",
    institution: "Universidad Nacional de San Antonio Abad del Cusco (UNSAAC)",
    period: "Registro CIP N° 90161",
    detail: "Facultad de Ciencias Agrarias. Formación sólida en edafología, hidrología, producción vegetal y extensión rural andina."
  },
  {
    category: "Investigación",
    title: "Investigación y Publicación en Agroturismo y Agrobiodiversidad",
    institution: "Proyecto Lucre - Humedal Lucre-Huacarpay",
    period: "2006 en adelante",
    detail: "Coautora del trabajo 'Promoción del agroturismo para la conservación y uso sostenible de la agrobiodiversidad, el carácter del paisaje andino y la reducción de la pobreza rural'."
  },
  {
    category: "Experiencia Profesional",
    title: "Coordinadora de Proyectos y Consultora en Desarrollo Rural",
    institution: "Organizaciones Públicas, Privadas y de Cooperación Internacional",
    period: "Trayectoria Continua",
    detail: "Coordinación de intervenciones en desarrollo rural, gestión hídrica, fortalecimiento de capacidades comunales y producción sostenible en Cusco y el sur del Perú."
  }
];
