import React, { useState, useMemo } from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import {
  MONTHLY_WATER_STATS,
  CROP_CONSULTATION_STATS,
  IRRIGATION_SYSTEM_STATS,
  VALLEY_CONSULTATION_STATS,
  INITIAL_RECENT_INQUIRIES,
  RecentWaterInquiry,
} from '../data/waterStatsData';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Users,
  MessageSquare,
  Droplets,
  Sprout,
  BarChart3,
  PieChart as PieIcon,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  Filter,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const WaterCalculatorDashboard: React.FC = () => {
  const { data, showToast } = useWebsiteData();
  const isSectionVisible = data.sections.find((s) => s.id === 'estadisticas-hidricas')?.isVisible ?? true;

  if (!isSectionVisible) return null;

  // Local state for interactive filtering and live simulations
  const [timeFilter, setTimeFilter] = useState<'12m' | '6m' | '3m'>('12m');
  const [activeTab, setActiveTab] = useState<'tendencias' | 'cultivos' | 'sistemas' | 'valles'>('tendencias');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('todos');
  const [recentInquiries, setRecentInquiries] = useState<RecentWaterInquiry[]>(INITIAL_RECENT_INQUIRIES);
  const [simulatedConsultationsCount, setSimulatedConsultationsCount] = useState<number>(0);

  // Filtered monthly stats according to time selection
  const filteredMonthlyStats = useMemo(() => {
    let sliced = [...MONTHLY_WATER_STATS];
    if (timeFilter === '3m') {
      sliced = sliced.slice(-3);
    } else if (timeFilter === '6m') {
      sliced = sliced.slice(-6);
    }

    if (simulatedConsultationsCount > 0) {
      // Add simulated consultations to the last month
      const lastIndex = sliced.length - 1;
      const updatedLast = {
        ...sliced[lastIndex],
        consultas: sliced[lastIndex].consultas + simulatedConsultationsCount,
        visitas: sliced[lastIndex].visitas + simulatedConsultationsCount * 2,
        tasaConversion: Number(
          (
            ((sliced[lastIndex].consultas + simulatedConsultationsCount) /
              (sliced[lastIndex].visitas + simulatedConsultationsCount * 2)) *
            100
          ).toFixed(1)
        ),
      };
      sliced[lastIndex] = updatedLast;
    }

    return sliced;
  }, [timeFilter, simulatedConsultationsCount]);

  // Aggregate KPI metrics
  const totalVisits = useMemo(() => {
    return filteredMonthlyStats.reduce((acc, curr) => acc + curr.visitas, 0);
  }, [filteredMonthlyStats]);

  const totalConsultations = useMemo(() => {
    return filteredMonthlyStats.reduce((acc, curr) => acc + curr.consultas, 0);
  }, [filteredMonthlyStats]);

  const avgConversionRate = useMemo(() => {
    if (totalVisits === 0) return 0;
    return ((totalConsultations / totalVisits) * 100).toFixed(1);
  }, [totalVisits, totalConsultations]);

  const totalWaterSavedM3 = useMemo(() => {
    return filteredMonthlyStats.reduce((acc, curr) => acc + curr.ahorroEstimadoM3, 0);
  }, [filteredMonthlyStats]);

  // Handle simulating a live calculation inquiry from the website
  const handleSimulateInquiry = () => {
    const crops = [
      { name: 'Papa Nativa (Q\'ompis)', m3: 110, loc: 'Paucartambo, Cusco' },
      { name: 'Maíz Blanco Gigante', m3: 95, loc: 'Urubamba, Valle Sagrado' },
      { name: 'Palto Hass', m3: 180, loc: 'Limatambo, Anta' },
      { name: 'Habas Criollas', m3: 75, loc: 'Canchis, Cusco' },
    ];
    const picked = crops[Math.floor(Math.random() * crops.length)];
    const newInq: RecentWaterInquiry = {
      id: `inq-${Date.now()}`,
      timestamp: 'Hace unos instantes',
      cultivo: picked.name,
      hectareas: Number((Math.random() * 3 + 1).toFixed(1)),
      sistema: Math.random() > 0.5 ? 'Riego por Aspersión' : 'Riego por Goteo',
      volumenAhorradoM3Dia: picked.m3,
      ubicacion: picked.loc,
      estado: 'Visita de campo programada',
    };

    setRecentInquiries([newInq, ...recentInquiries.slice(0, 5)]);
    setSimulatedConsultationsCount((prev) => prev + 1);
    showToast(`¡Consulta técnica simulada para ${picked.name}! Gráficos y contadores actualizados.`);
  };

  // CSV Export for Agronomic Impact and Consultations
  const handleExportCSV = () => {
    const headers = 'Mes,Visitas Calculador,Consultas Técnicas,Tasa Conversión (%),Ahorro Modelado (m3),Hito Agrícola\n';
    const rows = filteredMonthlyStats
      .map(
        (s) =>
          `"${s.month}",${s.visitas},${s.consultas},${s.tasaConversion}%,${s.ahorroEstimadoM3},"${s.eventoAgricola || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `estadisticas_calculador_hidrico_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Reporte de estadísticas hídricas descargado en formato CSV');
  };

  return (
    <section id="estadisticas-hidricas" className="py-16 md:py-24 bg-[#eae4d5] relative border-t border-stone-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Section Title & Description */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          {(() => {
            const header = data.sectionHeaders?.['estadisticas-hidricas'] || {
              kicker: 'Monitoreo de Impacto Agronómico & Consultas',
              title: 'Tablero Estadístico de Visitas y Consultas del Calculador',
              subtitle: 'Métricas dinámicas de productores, asociaciones comunales y empresas agropecuarias que utilizaron el Calculador de Demanda Hídrica para estimar su ahorro en riego y contactar a la profesional.'
            };

            return (
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/90 text-[#1f5f3f] rounded-full text-xs font-bold tracking-wider uppercase mb-2 border border-emerald-300/60">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>{header.kicker}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 tracking-tight [text-wrap:balance]">
                  {header.title}
                </h2>
                <p className="mt-2 text-stone-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  {header.subtitle}
                </p>
              </div>
            );
          })()}

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Simulate Live Inquiry Button */}
            <button
              type="button"
              onClick={handleSimulateInquiry}
              className="flex items-center gap-1.5 bg-[#1f5f3f] text-white px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#16472f] shadow-xs transition-all active:scale-95"
              title="Registrar una consulta técnica de prueba para verificar reactividad"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Simular Consulta Técnica</span>
            </button>

            {/* Export CSV Button */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 bg-white text-stone-700 px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-stone-50 border border-stone-300 shadow-2xs transition-all active:scale-95"
              title="Exportar registros a archivo CSV"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Exportar Datos</span>
            </button>

            {/* Time Window Selector */}
            <div className="bg-stone-200/90 p-1 rounded-xl flex items-center border border-stone-300 text-xs font-bold">
              <button
                type="button"
                onClick={() => setTimeFilter('3m')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  timeFilter === '3m' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                3 Meses
              </button>
              <button
                type="button"
                onClick={() => setTimeFilter('6m')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  timeFilter === '6m' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                6 Meses
              </button>
              <button
                type="button"
                onClick={() => setTimeFilter('12m')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  timeFilter === '12m' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Año Agrícola
              </button>
            </div>
          </div>
        </div>

        {/* Metric Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {/* Card 1: Total Visits */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Visitas al Calculador
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1f5f3f] flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-stone-900 tabular-nums">
                {totalVisits.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +14.8%
              </span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">
              Productores y técnicos que evaluaron parcelas
            </p>
          </div>

          {/* Card 2: Consultations Generated */}
          <div className="bg-white rounded-2xl p-5 border border-[#1f5f3f]/30 shadow-2xs ring-1 ring-[#1f5f3f]/10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1f5f3f]">
                Consultas Generadas
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#1f5f3f] text-white flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#1f5f3f] tabular-nums">
                {totalConsultations.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +21.2%
              </span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">
              Solicitudes enviadas a WhatsApp / Asesoría CIP
            </p>
          </div>

          {/* Card 3: Technical Conversion Rate */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Tasa de Conversión
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-stone-900 tabular-nums">
                {avgConversionRate}%
              </span>
              <span className="text-xs font-semibold text-stone-500">
                de visitantes
              </span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">
              Decisión inmediata de contactar para asistencia técnica
            </p>
          </div>

          {/* Card 4: Estimated Water Savings */}
          <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Ahorro Hídrico Modelado
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Droplets className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-stone-900 tabular-nums">
                {(totalWaterSavedM3 / 1000).toFixed(0)}k
              </span>
              <span className="text-xs font-semibold text-stone-500">
                m³ agua
              </span>
            </div>
            <p className="mt-1 text-[11px] text-stone-500">
              Volumen evitado frente a riego por inundación
            </p>
          </div>

        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 border-b border-stone-300">
          <button
            type="button"
            onClick={() => setActiveTab('tendencias')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'tendencias'
                ? 'bg-[#1f5f3f] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-300/80'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Evolución Mensual (Visitas vs Consultas)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cultivos')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'cultivos'
                ? 'bg-[#1f5f3f] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-300/80'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Consultas por Cultivo Andino</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sistemas')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'sistemas'
                ? 'bg-[#1f5f3f] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-300/80'
            }`}
          >
            <PieIcon className="w-4 h-4" />
            <span>Sistemas de Riego Evaluados</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('valles')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === 'valles'
                ? 'bg-[#1f5f3f] text-white shadow-xs'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-300/80'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Valles & Provincias de Procedencia</span>
          </button>
        </div>

        {/* Tab 1: Evolución Mensual (Recharts AreaChart & BarChart) */}
        {activeTab === 'tendencias' && (
          <div className="space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200/90 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-stone-900 flex items-center gap-2">
                    <span>Curva de Visitas y Consultas Técnicas Efectivas</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-50 text-[#1f5f3f] font-semibold border border-emerald-200">
                      Recharts Interactivo
                    </span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Comparativa mes a mes del flujo de usuarios en el calculador y cuántos decidieron canalizar su requerimiento a asesoría técnica formal.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                    <span className="text-stone-700">Visitas Calculador</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="text-stone-700">Consultas Técnicas</span>
                  </div>
                </div>
              </div>

              {/* Recharts AreaChart Container */}
              <div className="h-72 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={filteredMonthlyStats}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorVisitas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1f5f3f" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#1f5f3f" stopOpacity={0.02} />
                      </linearGradient>
                      <linearGradient id="colorConsultas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d97706" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#d97706" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="shortMonth"
                      tick={{ fill: '#4b5563', fontSize: 12, fontWeight: 500 }}
                      axisLine={{ stroke: '#cbd5e1' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: '#4b5563', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const dataPoint = payload[0].payload as (typeof MONTHLY_WATER_STATS)[0];
                          return (
                            <div className="bg-stone-900 text-white p-3.5 rounded-xl shadow-xl border border-stone-700 text-xs space-y-1.5 max-w-xs">
                              <p className="font-extrabold text-sm border-b border-stone-700 pb-1 text-emerald-400">
                                {dataPoint.month}
                              </p>
                              <div className="flex justify-between gap-4">
                                <span className="text-stone-300">Visitas Calculador:</span>
                                <span className="font-bold text-white">{dataPoint.visitas}</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-stone-300">Consultas Generadas:</span>
                                <span className="font-bold text-amber-400">{dataPoint.consultas}</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-stone-300">Tasa de Conversión:</span>
                                <span className="font-bold text-emerald-300">{dataPoint.tasaConversion}%</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-stone-300">Ahorro Modelado:</span>
                                <span className="font-bold text-blue-300">{dataPoint.ahorroEstimadoM3.toLocaleString()} m³</span>
                              </div>
                              {dataPoint.eventoAgricola && (
                                <p className="text-[10px] text-stone-400 italic pt-1 border-t border-stone-800">
                                  Hito: {dataPoint.eventoAgricola}
                                </p>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="visitas"
                      name="Visitas al Calculador"
                      stroke="#1f5f3f"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorVisitas)"
                    />
                    <Area
                      type="monotone"
                      dataKey="consultas"
                      name="Consultas Técnicas"
                      stroke="#d97706"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorConsultas)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Month-by-month agricultural context bar */}
              <div className="mt-6 pt-5 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-800 block">Pico de Consultas</span>
                  <span className="text-stone-500 text-[11px] block mt-0.5">
                    Marzo - Mayo: Preparación para siembra bajo riego y estiaje.
                  </span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-800 block">Riego Antiheladas</span>
                  <span className="text-stone-500 text-[11px] block mt-0.5">
                    Junio - Julio: Consultas sobre aspersión nocturna en zonas de altura.
                  </span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-800 block">Tiempo de Respuesta</span>
                  <span className="text-stone-500 text-[11px] block mt-0.5">
                    Menor a 24 horas hábiles por contacto directo con la Ing. Yolanda.
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="font-bold text-[#1f5f3f] block">Conversión Agronómica</span>
                  <span className="text-emerald-800 text-[11px] block mt-0.5">
                    23.8% promedio: Alta intención de tecnificación en parcelas andinas.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Consultas por Cultivo Andino (BarChart) */}
        {activeTab === 'cultivos' && (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-stone-900">
                  Distribución de Consultas Técnicas por Cultivo Andino
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Cantidad de productores y parcelas evaluadas según cultivo andino y ahorro medio proyectado.
                </p>
              </div>
              <div className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
                Líder en demanda: <strong>Papa Nativa & Maíz Blanco Urubamba</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Recharts BarChart */}
              <div className="lg:col-span-7 h-72 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={CROP_CONSULTATION_STATS}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                    <XAxis type="number" tick={{ fill: '#4b5563', fontSize: 12 }} />
                    <YAxis
                      dataKey="cropName"
                      type="category"
                      tick={{ fill: '#1f2937', fontSize: 11, fontWeight: 600 }}
                      width={130}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as (typeof CROP_CONSULTATION_STATS)[0];
                          return (
                            <div className="bg-stone-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                              <p className="font-bold text-emerald-400 text-sm">{item.cropName}</p>
                              <p>Consultas Registradas: <strong>{item.consultas}</strong> ({item.porcentaje}%)</p>
                              <p>Superficie promedio: <strong>{item.hectsPromedio} ha</strong></p>
                              <p>Ahorro hídrico medio: <strong>{item.ahorroM3AnualPromedio.toLocaleString()} m³/año/ha</strong></p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="consultas" radius={[0, 8, 8, 0]}>
                      {CROP_CONSULTATION_STATS.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Crop Stats Cards */}
              <div className="lg:col-span-5 space-y-2.5">
                {CROP_CONSULTATION_STATS.map((crop) => (
                  <div
                    key={crop.cropId}
                    className="p-3 bg-stone-50 rounded-xl border border-stone-200/90 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-md shrink-0"
                        style={{ backgroundColor: crop.color }}
                      />
                      <div>
                        <span className="font-bold text-stone-900 block">{crop.cropName}</span>
                        <span className="text-[11px] text-stone-500">
                          {crop.hectsPromedio} ha promedio · {crop.ahorroM3AnualPromedio.toLocaleString()} m³ ahorro/ha
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-extrabold text-stone-900 tabular-nums text-sm">
                        {crop.consultas}
                      </span>
                      <span className="text-[11px] text-stone-400 block">{crop.porcentaje}% total</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Sistemas de Riego Evaluados (PieChart & Eficiencia) */}
        {activeTab === 'sistemas' && (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-base sm:text-lg text-stone-900">
                  Preferencia Tecnológica en las Consultas
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Distribución de los sistemas de riego seleccionados por los usuarios al calcular su requerimiento.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Recharts PieChart */}
              <div className="lg:col-span-6 h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={IRRIGATION_SYSTEM_STATS}
                      dataKey="consultas"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={95}
                      paddingAngle={4}
                    >
                      {IRRIGATION_SYSTEM_STATS.map((entry, index) => (
                        <Cell key={`pie-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as (typeof IRRIGATION_SYSTEM_STATS)[0];
                          return (
                            <div className="bg-stone-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                              <p className="font-bold text-emerald-400 text-sm">{data.name}</p>
                              <p>Consultas: <strong>{data.consultas}</strong> ({data.porcentaje}%)</p>
                              <p>Eficiencia en aplicación: <strong>{data.eficiencia}%</strong></p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Explanatory cards */}
              <div className="lg:col-span-6 space-y-3.5">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-emerald-950 text-xs sm:text-sm">Riego por Aspersión (48%)</span>
                    <span className="text-xs font-extrabold text-[#1f5f3f]">Eficiencia: 80%</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    El más solicitado para parcelas en pendiente y laderas de Cusco (chacras de papa, maíz y forrajes). Permite adaptar boquillas para combate de heladas.
                  </p>
                </div>

                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sky-950 text-xs sm:text-sm">Riego por Goteo (36%)</span>
                    <span className="text-xs font-extrabold text-sky-700">Eficiencia: 90%</span>
                  </div>
                  <p className="text-xs text-sky-800 leading-relaxed">
                    Crecimiento exponencial en valles interandinos y frutales (palto Hass en Limatambo y hortalizas bajo invernadero en Calca/Urubamba).
                  </p>
                </div>

                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-950 text-xs sm:text-sm">Reconversión de Gravedad/Surco (16%)</span>
                    <span className="text-xs font-extrabold text-amber-800">Eficiencia: 45%</span>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    Productores tradicionales que usan el calculador para fundamentar expedientes técnicos de tecnificación ante Agro Rural, PSI y fondos municipales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Procedencia Territorial (Valles de Cusco) */}
        {activeTab === 'valles' && (
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-stone-200/90 shadow-sm space-y-6">
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900">
                Procedencia Territorial de las Consultas en la Región Cusco
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Zonas donde los productores u organizaciones han modelado sus fuentes hídricas con el calculador.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {VALLEY_CONSULTATION_STATS.map((valley, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 hover:border-[#1f5f3f]/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-stone-500 uppercase">
                      {valley.provincia}
                    </span>
                    <span className="text-xs font-extrabold text-[#1f5f3f] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {valley.consultas} consultas
                    </span>
                  </div>
                  <div className="font-bold text-stone-900 text-sm mb-1">{valley.valle}</div>
                  <div className="text-xs text-stone-600">
                    <strong>{valley.hectareasTotales} ha</strong> modeladas
                  </div>
                  <div className="text-[11px] text-stone-500 mt-2 pt-2 border-t border-stone-200">
                    Cultivo predominante: <span className="font-semibold text-stone-700">{valley.cultivoPrincipal}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Live Inquiries Log Table */}
        <div className="mt-8 bg-white p-6 md:p-8 rounded-3xl border border-stone-200/90 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#1f5f3f] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-stone-900">
                  Registro de Consultas Recientes Generadas vía Calculador
                </h3>
                <p className="text-[11px] text-stone-500">
                  Interacciones canalizadas directamente a WhatsApp y correo profesional de la Ing. Yolanda Paucar
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>En vivo</span>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-500 uppercase tracking-wider font-semibold">
                  <th className="py-2.5 px-3">Fecha / Hora</th>
                  <th className="py-2.5 px-3">Cultivo Evaluado</th>
                  <th className="py-2.5 px-3">Área (ha)</th>
                  <th className="py-2.5 px-3">Sistema de Riego</th>
                  <th className="py-2.5 px-3">Ahorro Diario</th>
                  <th className="py-2.5 px-3">Localidad</th>
                  <th className="py-2.5 px-3">Estado Técnico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-3 font-medium text-stone-600 whitespace-nowrap">
                      {inq.timestamp}
                    </td>
                    <td className="py-3 px-3 font-bold text-stone-900 whitespace-nowrap">
                      {inq.cultivo}
                    </td>
                    <td className="py-3 px-3 font-semibold text-stone-700 tabular-nums">
                      {inq.hectareas} ha
                    </td>
                    <td className="py-3 px-3 text-stone-700">
                      {inq.sistema}
                    </td>
                    <td className="py-3 px-3 font-bold text-[#1f5f3f] tabular-nums whitespace-nowrap">
                      +{inq.volumenAhorradoM3Dia} m³/día
                    </td>
                    <td className="py-3 px-3 text-stone-600 whitespace-nowrap">
                      {inq.ubicacion}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-[#1f5f3f]" />
                        {inq.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick link to Water Calculator */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500">
              ¿Desea ingresar los parámetros de su propia parcela o cooperativa?
            </span>
            <a
              href="#calculadora"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#1f5f3f] hover:text-[#16472f] hover:underline"
            >
              <span>Ir al Calculador Interactivo de Demanda Hídrica</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
