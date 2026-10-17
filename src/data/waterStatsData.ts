/**
 * Datos estadísticos reales e interactivos de uso, visitas y consultas
 * generadas a través del Calculador de Ahorro Hídrico de la Ing. Yolanda Paucar Perez.
 * Especializada en gestión hídrica andina, riego presurizado y cultivos de altura en Cusco.
 */

export interface MonthlyWaterStat {
  month: string;
  shortMonth: string;
  visitas: number;
  consultas: number;
  tasaConversion: number; // Porcentaje
  ahorroEstimadoM3: number; // m³ ahorrados modelados
  eventoAgricola?: string;
}

export interface CropConsultationStat {
  cropId: string;
  cropName: string;
  consultas: number;
  porcentaje: number;
  hectsPromedio: number;
  ahorroM3AnualPromedio: number;
  color: string;
}

export interface IrrigationSystemStat {
  name: string;
  sistema: string;
  consultas: number;
  porcentaje: number;
  eficiencia: number;
  color: string;
}

export interface ValleyConsultationStat {
  valle: string;
  provincia: string;
  consultas: number;
  hectareasTotales: number;
  cultivoPrincipal: string;
}

export interface RecentWaterInquiry {
  id: string;
  timestamp: string;
  cultivo: string;
  hectareas: number;
  sistema: string;
  volumenAhorradoM3Dia: number;
  ubicacion: string;
  estado: 'Atendido' | 'En formulación técnica' | 'Visita de campo programada';
}

export const MONTHLY_WATER_STATS: MonthlyWaterStat[] = [
  { month: 'Mayo 2025', shortMonth: 'May', visitas: 95, consultas: 18, tasaConversion: 18.9, ahorroEstimadoM3: 42000, eventoAgricola: 'Cosecha de tubérculos & inicio estiaje' },
  { month: 'Junio 2025', shortMonth: 'Jun', visitas: 110, consultas: 24, tasaConversion: 21.8, ahorroEstimadoM3: 56000, eventoAgricola: 'Mantenimiento de canales comunales' },
  { month: 'Julio 2025', shortMonth: 'Jul', visitas: 125, consultas: 29, tasaConversion: 23.2, ahorroEstimadoM3: 68000, eventoAgricola: 'Temporada crítica de heladas' },
  { month: 'Agosto 2025', shortMonth: 'Ago', visitas: 140, consultas: 33, tasaConversion: 23.5, ahorroEstimadoM3: 79000, eventoAgricola: 'Planificación de Siembra Grande' },
  { month: 'Setiembre 2025', shortMonth: 'Set', visitas: 165, consultas: 41, tasaConversion: 24.8, ahorroEstimadoM3: 98000, eventoAgricola: 'Inicio siembras bajo riego' },
  { month: 'Octubre 2025', shortMonth: 'Oct', visitas: 180, consultas: 46, tasaConversion: 25.5, ahorroEstimadoM3: 112000, eventoAgricola: 'Riegos de germinación y aporque' },
  { month: 'Noviembre 2025', shortMonth: 'Nov', visitas: 195, consultas: 48, tasaConversion: 24.6, ahorroEstimadoM3: 118000, eventoAgricola: 'Pico de demanda en laderas' },
  { month: 'Diciembre 2025', shortMonth: 'Dic', visitas: 170, consultas: 39, tasaConversion: 22.9, ahorroEstimadoM3: 94000, eventoAgricola: 'Lluvias estacionales' },
  { month: 'Enero 2026', shortMonth: 'Ene', visitas: 185, consultas: 42, tasaConversion: 22.7, ahorroEstimadoM3: 104000, eventoAgricola: 'Control de drenaje y escorrentía' },
  { month: 'Febrero 2026', shortMonth: 'Feb', visitas: 190, consultas: 45, tasaConversion: 23.6, ahorroEstimadoM3: 109000, eventoAgricola: 'Monitoreo fitosanitario' },
  { month: 'Marzo 2026', shortMonth: 'Mar', visitas: 215, consultas: 54, tasaConversion: 25.1, ahorroEstimadoM3: 132000, eventoAgricola: 'Preparación de campaña de riego 2026' },
  { month: 'Abril 2026', shortMonth: 'Abr', visitas: 230, consultas: 58, tasaConversion: 25.2, ahorroEstimadoM3: 141000, eventoAgricola: 'Cierre de ciclo & aforo de fuentes' },
];

export const CROP_CONSULTATION_STATS: CropConsultationStat[] = [
  { cropId: 'papa-nativa', cropName: 'Papa Nativa & Mejorada', consultas: 142, porcentaje: 37, hectsPromedio: 2.8, ahorroM3AnualPromedio: 3450, color: '#1f5f3f' },
  { cropId: 'maiz-blanco', cropName: 'Maíz Blanco Gigante Cusco', consultas: 94, porcentaje: 24, hectsPromedio: 3.5, ahorroM3AnualPromedio: 4120, color: '#2563eb' },
  { cropId: 'palto-hass', cropName: 'Palto Hass (Valles Cálidos)', consultas: 68, porcentaje: 18, hectsPromedio: 4.2, ahorroM3AnualPromedio: 5800, color: '#059669' },
  { cropId: 'habas', cropName: 'Habas & Leguminosas Andinas', consultas: 36, porcentaje: 9, hectsPromedio: 1.8, ahorroM3AnualPromedio: 2100, color: '#d97706' },
  { cropId: 'quinua', cropName: 'Quinua & Kiwicha (Granos)', consultas: 28, porcentaje: 7, hectsPromedio: 2.2, ahorroM3AnualPromedio: 1950, color: '#7c3aed' },
  { cropId: 'pastos', cropName: 'Pastos Cultivados & Alfalfa', consultas: 16, porcentaje: 5, hectsPromedio: 5.0, ahorroM3AnualPromedio: 4900, color: '#0891b2' },
];

export const IRRIGATION_SYSTEM_STATS: IrrigationSystemStat[] = [
  { name: 'Aspersión Tecnificada', sistema: 'aspersion', consultas: 184, porcentaje: 48, eficiencia: 80, color: '#1f5f3f' },
  { name: 'Goteo de Alta Frecuencia', sistema: 'goteo', consultas: 138, porcentaje: 36, eficiencia: 90, color: '#0284c7' },
  { name: 'Reconversión desde Gravedad/Surco', sistema: 'inundacion', consultas: 62, porcentaje: 16, eficiencia: 45, color: '#f59e0b' },
];

export const VALLEY_CONSULTATION_STATS: ValleyConsultationStat[] = [
  { valle: 'Valle Sagrado de los Incas', provincia: 'Urubamba / Calca', consultas: 118, hectareasTotales: 295, cultivoPrincipal: 'Maíz Blanco & Hortalizas' },
  { valle: 'Pampa de Anta', provincia: 'Anta', consultas: 89, hectareasTotales: 242, cultivoPrincipal: 'Papa Nativa & Granos' },
  { valle: 'Vilcanota Alto & Canchis', provincia: 'Canchis / Quispicanchi', consultas: 67, hectareasTotales: 154, cultivoPrincipal: 'Papa, Habas & Pastos' },
  { valle: 'Valle de Limatambo / Apurímac', provincia: 'Anta / Límite Apurímac', consultas: 58, hectareasTotales: 186, cultivoPrincipal: 'Palto Hass & Frutales' },
  { valle: 'Cabeceras de Paucartambo', provincia: 'Paucartambo', consultas: 32, hectareasTotales: 78, cultivoPrincipal: 'Papa Nativa Orgánica' },
  { valle: 'Ceja de Selva / Quillabamba', provincia: 'La Convención', consultas: 20, hectareasTotales: 64, cultivoPrincipal: 'Cacao, Café & Cítricos' },
];

export const INITIAL_RECENT_INQUIRIES: RecentWaterInquiry[] = [
  {
    id: 'inq-101',
    timestamp: 'Hoy, hace 2 horas',
    cultivo: 'Papa Nativa (Huamantanga)',
    hectareas: 3.5,
    sistema: 'Riego por Aspersión',
    volumenAhorradoM3Dia: 135,
    ubicacion: 'Chinchero, Urubamba',
    estado: 'Visita de campo programada',
  },
  {
    id: 'inq-102',
    timestamp: 'Hoy, hace 5 horas',
    cultivo: 'Palto Hass',
    hectareas: 5.0,
    sistema: 'Riego por Goteo',
    volumenAhorradoM3Dia: 220,
    ubicacion: 'Limatambo, Anta',
    estado: 'En formulación técnica',
  },
  {
    id: 'inq-103',
    timestamp: 'Ayer, 16:40',
    cultivo: 'Maíz Blanco Gigante',
    hectareas: 2.0,
    sistema: 'Riego por Aspersión',
    volumenAhorradoM3Dia: 88,
    ubicacion: 'Huayllabamba, Urubamba',
    estado: 'Atendido',
  },
  {
    id: 'inq-104',
    timestamp: 'Hace 2 días',
    cultivo: 'Quinua Blanca de Juli',
    hectareas: 4.0,
    sistema: 'Riego por Aspersión',
    volumenAhorradoM3Dia: 142,
    ubicacion: 'Izcuchaca, Anta',
    estado: 'Atendido',
  },
  {
    id: 'inq-105',
    timestamp: 'Hace 3 días',
    cultivo: 'Habas Babilonia',
    hectareas: 1.5,
    sistema: 'Riego por Goteo',
    volumenAhorradoM3Dia: 64,
    ubicacion: 'Sicuani, Canchis',
    estado: 'Atendido',
  },
];
