import React, { useState, useRef, useEffect } from 'react';
import { useWebsiteData } from '../context/WebsiteDataContext';
import { processAndCompressImage } from '../utils/imageCompressor';
import {
  X,
  Upload,
  Link,
  Image as ImageIcon,
  Check,
  Trash2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  FileImage
} from 'lucide-react';
import {
  cvOriginalImg,
  cvImageJpg,
  andeanLandscapeImg,
  waterHarvestingImg,
  nativeSeedsImg
} from '../data/professionalData';

export const PRESET_IMAGES = [
  {
    label: 'Tarjeta Oficial del CV (Alta Definición)',
    url: cvOriginalImg,
  },
  {
    label: 'Tarjeta Oficial de Respaldo (JPG)',
    url: cvImageJpg,
  },
  {
    label: 'Terrazas y Riego Andino en Cusco',
    url: andeanLandscapeImg,
  },
  {
    label: 'Cocha Altoandina - Siembra de Agua',
    url: waterHarvestingImg,
  },
  {
    label: 'Agrobiodiversidad y Semillas Nativas',
    url: nativeSeedsImg,
  },
];

export const ImageUploaderModal: React.FC = () => {
  const { activePhotoTarget, setActivePhotoTarget, updateImage } = useWebsiteData();

  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'gallery'>('upload');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync initial target URL when opened
  useEffect(() => {
    if (activePhotoTarget) {
      setPreviewUrl(activePhotoTarget.currentUrl || '');
      setUrlInput(activePhotoTarget.currentUrl || '');
      setErrorMessage(null);
      setIsProcessing(false);
    }
  }, [activePhotoTarget]);

  if (!activePhotoTarget) return null;

  const handleProcessFile = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor seleccione un archivo de imagen válido (JPG, PNG, WEBP, GIF, SVG).');
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage(null);
      // Automatically compress and resize to max 1400px so it fits anywhere cleanly
      const dataUrl = await processAndCompressImage(file, 1400, 1400, 0.85);
      setPreviewUrl(dataUrl);
      setUrlInput('');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error al procesar la imagen seleccionada.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      setErrorMessage('Ingrese un enlace URL de imagen válido.');
      return;
    }
    setPreviewUrl(urlInput.trim());
    setErrorMessage(null);
  };

  const handleSelectPreset = (presetUrl: string) => {
    setPreviewUrl(presetUrl);
    setUrlInput(presetUrl);
    setErrorMessage(null);
  };

  const handleSave = () => {
    if (!previewUrl) {
      setErrorMessage('Seleccione o suba una imagen antes de guardar.');
      return;
    }
    updateImage(activePhotoTarget.id, activePhotoTarget.type, previewUrl);
    setActivePhotoTarget(null);
  };

  const handleRemoveImage = () => {
    updateImage(activePhotoTarget.id, activePhotoTarget.type, '');
    setActivePhotoTarget(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setActivePhotoTarget(null)}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1f5f3f] flex items-center justify-center text-white shrink-0">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                Cambiar Fotografía
              </h3>
              <p className="text-[11px] text-stone-400 line-clamp-1">
                Destino: {activePhotoTarget.label}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActivePhotoTarget(null)}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-stone-200 bg-stone-100 px-6 pt-2 gap-2 text-xs font-semibold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`py-2 px-3.5 rounded-t-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'upload'
                ? 'bg-white text-[#1f5f3f] border-t-2 border-[#1f5f3f] shadow-2xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Subir desde mi equipo / celular</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`py-2 px-3.5 rounded-t-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'url'
                ? 'bg-white text-[#1f5f3f] border-t-2 border-[#1f5f3f] shadow-2xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            <span>Pegar Enlace Web</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`py-2 px-3.5 rounded-t-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-white text-[#1f5f3f] border-t-2 border-[#1f5f3f] shadow-2xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Galería Temática</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* TAB 1: UPLOAD FROM DEVICE */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all space-y-2 group ${
                  isDragOver
                    ? 'border-[#1f5f3f] bg-emerald-50/70 scale-[1.01]'
                    : 'border-stone-300 hover:border-[#1f5f3f] bg-stone-50 hover:bg-emerald-50/30'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-stone-200 group-hover:bg-emerald-100 flex items-center justify-center mx-auto text-stone-600 group-hover:text-[#1f5f3f] transition-colors">
                  {isProcessing ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-[#1f5f3f]" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </div>
                <div className="text-xs sm:text-sm font-bold text-stone-800">
                  {isProcessing
                    ? 'Procesando y optimizando imagen...'
                    : 'Haga clic para examinar o arrastre su foto aquí'}
                </div>
                <p className="text-[11px] text-stone-500">
                  Formatos compatibles: JPG, PNG, WEBP, GIF. La imagen se optimiza y se guarda directamente en su navegador.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PASTE URL */}
          {activeTab === 'url' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                Enlace directo de la imagen (URL pública):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://i.postimg.cc/... o https://ejemplo.com/foto.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleApplyUrl();
                    }
                  }}
                  className="flex-1 p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#1f5f3f] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  Cargar
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Puede utilizar enlaces de Postimages, Imgur, Google Drive (enlace directo), Unsplash o cualquier servidor de imágenes.
              </p>
            </div>
          )}

          {/* TAB 3: GALLERY PRESETS */}
          {activeTab === 'gallery' && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Fotografías temáticas recomendadas:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(preset.url)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      previewUrl === preset.url
                        ? 'border-[#1f5f3f] bg-emerald-50 ring-2 ring-[#1f5f3f]/30'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="w-14 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-stone-800 line-clamp-2">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Message if any */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Live Preview Box */}
          <div className="border border-stone-200 rounded-2xl p-3.5 bg-stone-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileImage className="w-3.5 h-3.5 text-[#1f5f3f]" />
                <span>Vista Previa de la Fotografía:</span>
              </span>
              {previewUrl && (
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Lista para aplicar
                </span>
              )}
            </div>
            
            <div className="relative aspect-16/10 rounded-xl overflow-hidden bg-stone-200 border border-stone-300 flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Vista previa seleccionada"
                  className="w-full h-full object-contain bg-stone-900/5"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    setErrorMessage('La imagen no pudo cargarse desde la dirección indicada. Verifique que el enlace sea público.');
                  }}
                />
              ) : (
                <div className="text-xs text-stone-500 italic flex flex-col items-center gap-1">
                  <ImageIcon className="w-6 h-6 text-stone-400" />
                  <span>Sin fotografía seleccionada</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleRemoveImage}
            className="inline-flex items-center gap-1.5 text-xs text-rose-700 hover:text-rose-900 font-bold px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors"
            title="Quitar o anular la foto de este elemento"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Anular Foto</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActivePhotoTarget(null)}
              className="text-xs font-semibold text-stone-600 hover:text-stone-900 px-4 py-2"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 bg-[#1f5f3f] text-white px-5 py-2.5 rounded-full text-xs font-bold hover:bg-[#16472f] shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>Aplicar y Guardar Foto</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
