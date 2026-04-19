import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Minus, Square, Maximize2 } from 'lucide-react';

interface GaleriaModalProps {
    isOpen: boolean;
    onClose: () => void;
    titulo: string;
    descripcion?: string;
    imagenes: string[];
}

const GaleriaModal = ({ isOpen, onClose, titulo, descripcion, imagenes }: GaleriaModalProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    useEffect(() => {
        setCurrentIndex(0);
    }, [imagenes]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        }, 200);
    };

    const handleMinimize = () => {
        // Minimizar: simplemente cerrar con animación
        handleClose();
    };

    if (!isOpen && !isClosing) return null;

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % imagenes.length);
    };

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
                isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={handleClose}
        >
            <div
                className={`
                    relative flex flex-col bg-white/10 backdrop-blur-xl rounded-2xl 
                    border border-white/20 shadow-2xl transition-all duration-300 ease-out
                    ${isMaximized ? 'w-full h-full max-w-full max-h-full rounded-none' : 'w-full max-w-5xl max-h-[90vh]'}
                    ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
                `}
                onClick={(e) => e.stopPropagation()}
                style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
            >
                {/* Barra de título */}
                <div className={`flex items-center justify-between px-4 py-3 border-b border-white/20 bg-white/5 ${isMaximized ? '' : 'rounded-t-2xl'}`}>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleClose}
                            className="group w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors flex items-center justify-center"
                            aria-label="Cerrar"
                        >
                            <X className="w-2 h-2 text-white opacity-0 group-hover:opacity-100" />
                        </button>
                        <button
                            onClick={handleMinimize}
                            className="group w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors flex items-center justify-center"
                            aria-label="Minimizar"
                        >
                            <Minus className="w-2 h-2 text-white opacity-0 group-hover:opacity-100" />
                        </button>
                        <button
                            onClick={toggleMaximize}
                            className="group w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors flex items-center justify-center"
                            aria-label="Maximizar"
                        >
                            {isMaximized ? (
                                <Square className="w-2 h-2 text-white opacity-0 group-hover:opacity-100" />
                            ) : (
                                <Maximize2 className="w-2 h-2 text-white opacity-0 group-hover:opacity-100" />
                            )}
                        </button>
                    </div>
                    <h3 className="font-display text-sm text-white/80 tracking-wide">{titulo}</h3>
                    <div className="w-16" />
                </div>

                {/* Contenido de la imagen */}
                <div className="relative flex-1 flex flex-col items-center justify-center p-6 overflow-auto bg-black/20">
                    <div className="relative flex items-center justify-center w-full h-full">
                        {/* Marco de vidrio alrededor de la imagen */}
                        <div className="relative max-w-full max-h-full bg-black/30 rounded-xl p-2 backdrop-blur-sm border border-white/20 shadow-inner">
                            <img
                                src={imagenes[currentIndex]}
                                alt={`${titulo} - Imagen ${currentIndex + 1}`}
                                className={`max-w-full object-contain rounded-lg shadow-xl ${isMaximized ? 'max-h-[85vh]' : 'max-h-[60vh]'}`}
                                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
                            />
                        </div>
                    </div>

                    {imagenes.length > 1 && (
                        <>
                            <button
                                onClick={goToPrevious}
                                className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-[#00b4d8]/50 transition-all duration-300"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-[#00b4d8]/50 transition-all duration-300"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </>
                    )}
                </div>

                {/* Barra inferior (tipo dock) */}
                <div className={`flex items-center justify-between px-6 py-3 border-t border-white/20 bg-white/5 ${isMaximized ? '' : 'rounded-b-2xl'}`}>
                    <div className="text-xs text-white/50 font-mono-custom">
                        {currentIndex + 1} / {imagenes.length}
                    </div>
                    <div className="flex gap-2">
                        {imagenes.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    currentIndex === idx
                                        ? 'w-6 bg-[#00b4d8] shadow-[0_0_8px_rgba(0,180,216,0.6)]'
                                        : 'w-1.5 bg-white/30 hover:bg-white/50'
                                }`}
                            />
                        ))}
                    </div>
                    {descripcion && (
                        <div className="text-xs text-white/50 font-mono-custom truncate max-w-[200px] hidden md:block">
                            {descripcion}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GaleriaModal;