import React, { useState } from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { Droplets, Calculator, HelpCircle, ArrowRight, CheckCircle2, MessageSquare, AlertCircle, BarChart3 } from 'lucide-react';

export const WaterCalculator: React.FC = () => {
  const { data } = useWebsiteData();
  const isSectionVisible = data.sections.find((s) => s.id === 'calculadora')?.isVisible ?? true;
  if (!isSectionVisible) return null;

  const [selectedCropId, setSelectedCropId] = useState<string>('papa-nativa');
  const [hectares, setHectares] = useState<number>(2.5);
  const [soilType, setSoilType] = useState<'franco' | 'franco-arcilloso' | 'arenoso'>('franco');
  const [irrigationSystem, setIrrigationSystem] = useState<'inundacion' | 'aspersion' | 'goteo'>('aspersion');
  const [includeFrostProtection, setIncludeFrostProtection] = useState<boolean>(true);

  const crop = data.cropWaterProfiles.find((c) => c.id === selectedCropId) || data.cropWaterProfiles[0];

  // Mathematical Calculation of Andean Water Demand:
  // ETc average (mm/day)
  const avgEtcMm = (crop.dailyNeedMmMin + crop.dailyNeedMmMax) / 2;

  // Efficiency factor based on system
  const systemEfficiency: Record<string, number> = {
    inundacion: 0.45, // 45% efficiency in traditional flood furrow
    aspersion: 0.80,  // 80% efficiency in well-designed sprinkler
    goteo: 0.90,      // 90% efficiency in drip
  };

  const eff = systemEfficiency[irrigationSystem] || 0.8;

  // 1 mm = 10 m³ / hectare
  // Gross water requirement = (Net ETc * 10 m³/ha * hectares) / Efficiency
  const netDailyVolumeM3 = avgEtcMm * 10 * hectares;
  const grossDailyVolumeM3 = Math.round(netDailyVolumeM3 / eff);
  
  // Continuous flow rate required (liters per second for 10 hours operation window)
  const operatingHours = 10;
  const requiredLps = ((grossDailyVolumeM3 * 1000) / (operatingHours * 3600)).toFixed(2);

  // Water savings compared to traditional flood
  const traditionalVolumeM3 = Math.round(netDailyVolumeM3 / 0.45);
  const volumeSavedPerDayM3 = irrigationSystem === 'inundacion' ? 0 : Math.max(0, traditionalVolumeM3 - grossDailyVolumeM3);
  const percentSaved = irrigationSystem === 'inundacion' ? 0 : Math.round((volumeSavedPerDayM3 / traditionalVolumeM3) * 100);

  // Irrigation frequency guidance by soil
  const soilFrequencyModifier = {
    arenoso: 'Frecuencia más corta: regar cada 3 a 5 días con turnos breves.',
    franco: 'Frecuencia estándar: regar cada 6 a 8 días.',
    'franco-arcilloso': 'Alta retención: regar cada 8 a 10 días para evitar encharcamientos.',
  }[soilType];

  const shareText = `Hola ${data.info.name}, realicé un cálculo en su calculadora agronómica:\n- Cultivo: ${crop.name}\n- Área: ${hectares} ha\n- Suelo: ${soilType}\n- Sistema actual/deseado: ${irrigationSystem}\n- Volumen estimado: ${grossDailyVolumeM3} m³/día (${requiredLps} l/s)\n¿Podemos coordinar una visita técnica o cotización de diseño de riego?`;

  return (
    <section id="calculadora" className="py-16 md:py-24 bg-[#f4efe6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        {(() => {
          const header = data.sectionHeaders?.['calculadora'] || {
            kicker: 'Herramienta Técnica Interactiva',
            title: 'Calculador de Demanda Hídrica y Ahorro en Riego Andino',
            subtitle: 'Estime en segundos el volumen diario de agua (m³/día), el caudal de diseño necesario (litros por segundo) y el porcentaje de ahorro al tecnificar sus parcelas según el cultivo andino.'
          };

          return (
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex flex-wrap items-center justify-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#1f5f3f] uppercase bg-emerald-100/70 px-3 py-1 rounded-full border border-emerald-300/50">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{header.kicker}</span>
                </span>
                <a
                  href="#estadisticas-hidricas"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-700 hover:text-[#1f5f3f] bg-white px-3 py-1 rounded-full border border-stone-300/80 shadow-2xs hover:border-[#1f5f3f] transition-all"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Ver Estadísticas de Uso</span>
                  <span className="sm:hidden">Estadísticas</span>
                </a>
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

        {/* Main Calculator Workspace Card */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Input Controls (Left Column) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Crop Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  1. Seleccione el Cultivo Andino
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {data.cropWaterProfiles.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCropId(c.id)}
                      className={`text-left p-3 rounded-xl border transition-all ${
                        selectedCropId === c.id
                          ? 'border-[#1f5f3f] bg-emerald-50/50 shadow-xs'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm text-stone-900">{c.name}</div>
                      <div className="text-[11px] text-stone-500 italic">{c.scientificName}</div>
                      <div className="text-[11px] text-[#1f5f3f] font-medium mt-1">
                        Demanda: {c.dailyNeedMmMin} - {c.dailyNeedMmMax} mm/día
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    2. Superficie de la Parcela / Finca
                  </label>
                  <span className="text-sm font-extrabold text-[#1f5f3f] tabular-nums bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                    {hectares} Hectáreas ({hectares * 10000} m²)
                  </span>
                </div>
                <input
                  type="range"
                  min="0.25"
                  max="20"
                  step="0.25"
                  value={hectares}
                  onChange={(e) => setHectares(parseFloat(e.target.value))}
                  className="w-full accent-[#1f5f3f] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>0.25 ha (Huerto/familiar)</span>
                  <span>5 ha</span>
                  <span>10 ha</span>
                  <span>20 ha (Comunal/asociación)</span>
                </div>
              </div>

              {/* Soil Type and Irrigation System Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Soil Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    3. Textura del Suelo
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value as any)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1f5f3f]"
                  >
                    <option value="franco">Franco (Equilibrado / Valle)</option>
                    <option value="franco-arcilloso">Franco-Arcilloso (Pesado / Retiene humedad)</option>
                    <option value="arenoso">Arenoso / Pedregoso (Drenaje rápido)</option>
                  </select>
                </div>

                {/* System */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    4. Sistema de Riego Evaluado
                  </label>
                  <select
                    value={irrigationSystem}
                    onChange={(e) => setIrrigationSystem(e.target.value as any)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#1f5f3f]"
                  >
                    <option value="aspersion">Riego por Aspersión (Recomendado laderas)</option>
                    <option value="goteo">Riego por Goteo (Máxima eficiencia 90%)</option>
                    <option value="inundacion">Gravedad / Surco Tradicional (Línea base 45%)</option>
                  </select>
                </div>

              </div>

              {/* Frost protection checkbox */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="frostProtection"
                    checked={includeFrostProtection}
                    onChange={(e) => setIncludeFrostProtection(e.target.checked)}
                    className="w-4 h-4 accent-[#1f5f3f] rounded"
                  />
                  <label htmlFor="frostProtection" className="text-xs text-stone-700 font-medium cursor-pointer">
                    Considerar reserva de agua para riego antiheladas (sobre 3,300 msnm)
                  </label>
                </div>
              </div>

            </div>

            {/* Live Reactive Outputs (Right Column) */}
            <div className="lg:col-span-5 bg-[#faf8f5] rounded-2xl p-6 border border-stone-200/90 space-y-6">
              
              <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1f5f3f]">
                  Resultados Estimados de Ingeniería
                </span>
                <span className="text-[11px] text-stone-500">
                  Operación: {operatingHours} h/día
                </span>
              </div>

              {/* Major Metric Cards */}
              <div className="grid grid-cols-2 gap-3">
                
                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs">
                  <span className="text-[11px] font-medium text-stone-500 block">Demanda Bruta Diaria</span>
                  <span className="text-2xl font-extrabold text-[#1f5f3f] tabular-nums mt-1 block">
                    {grossDailyVolumeM3.toLocaleString()} <span className="text-xs font-semibold">m³/día</span>
                  </span>
                  <span className="text-[10px] text-stone-400">Volumen a suministrar</span>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs">
                  <span className="text-[11px] font-medium text-stone-500 block">Caudal Continuo</span>
                  <span className="text-2xl font-extrabold text-stone-900 tabular-nums mt-1 block">
                    {requiredLps} <span className="text-xs font-semibold">litros/seg</span>
                  </span>
                  <span className="text-[10px] text-stone-400">Aforo de fuente requerido</span>
                </div>

              </div>

              {/* Water Savings Gauge */}
              {irrigationSystem !== 'inundacion' ? (
                <div className="bg-emerald-50/80 border border-emerald-200/70 p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                    <span>Ahorro Hídrico frente a Gravedad</span>
                    <span className="text-base text-[#1f5f3f] tabular-nums font-extrabold">+{percentSaved}%</span>
                  </div>
                  <div className="w-full bg-emerald-200/60 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#1f5f3f] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentSaved}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-emerald-800 leading-tight">
                    Equivale a un ahorro de <strong>{volumeSavedPerDayM3.toLocaleString()} m³ de agua cada día</strong>, reduciendo el lavado de fertilizantes y evitando la erosión de laderas.
                  </div>
                </div>
              ) : (
                <div className="bg-amber-50/90 border border-amber-200 p-4 rounded-xl flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Con riego por inundación tradicional se pierde cerca del <strong>55% del agua</strong> por percolación profunda y escorrentía. Al tecnificarlo a aspersión o goteo podría abastecer el doble de terreno.
                  </p>
                </div>
              )}

              {/* Crop Specific Agronomic Advice */}
              <div className="space-y-2 text-xs text-stone-600 bg-white p-4 rounded-xl border border-stone-200/70">
                <div className="font-bold text-stone-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1f5f3f]" />
                  <span>Recomendación agronómica para {crop.name}:</span>
                </div>
                <p className="leading-relaxed">
                  <strong>Etapa crítica:</strong> {crop.criticalStage}.
                </p>
                <p className="leading-relaxed">
                  <strong>Frecuencia:</strong> {soilFrequencyModifier}
                </p>
                <p className="text-[11px] text-stone-500 italic mt-1">
                  * {crop.notes}
                </p>
              </div>

              {/* Action Button: Send directly to WhatsApp */}
              <a
                href={`https://wa.me/${data.info.phoneRaw}?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#1f5f3f] text-white py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:bg-[#16472f] transition-all active:scale-[0.98]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enviar este cálculo a {data.info.shortTitle} por WhatsApp</span>
              </a>

              {/* Secondary Action: View Statistics Dashboard */}
              <a
                href="#estadisticas-hidricas"
                className="w-full flex items-center justify-center gap-2 bg-white text-stone-700 py-2.5 px-4 rounded-xl font-bold text-xs border border-stone-300 hover:bg-stone-50 hover:text-[#1f5f3f] transition-all"
              >
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Ver Tablero de Visitas & Consultas Generadas</span>
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
