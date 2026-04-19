// src/components/ui/CarruselSpotlight.tsx
import { useState, useEffect, useRef } from 'react';

// Configuración de logos de clientes
const clientesLogos = [
    { id: 1, nombre: "AT&T", imagen: "/att.png" },
    { id: 2, nombre: "Telcel", imagen: "/telcel.jpg" },
    { id: 3, nombre: "Telmex", imagen: "/telmex.png" },
    { id: 4, nombre: "Circuito Exterior Mexiquense", imagen: "/circuito.png" },
    { id: 5, nombre: "Helicom", imagen: "/helicom.png" },
    { id: 6, nombre: "Huawei", imagen: "/huawei.png" },
    { id: 7, nombre: "Megacable", imagen: "/megacable.png" },
    { id: 8, nombre: "ZTE", imagen: "/zte.png" },
    { id: 9, nombre: "American Tower", imagen: "/america.png" },
];

const CarruselSpotlight = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const totalItems = clientesLogos.length;

    const getVisibleIndices = () => {
        const left2 = (currentIndex - 2 + totalItems) % totalItems;
        const left1 = (currentIndex - 1 + totalItems) % totalItems;
        const right1 = (currentIndex + 1) % totalItems;
        const right2 = (currentIndex + 2) % totalItems;
        return { left2, left1, currentIndex, right1, right2 };
    };

    const { left2, left1, right1, right2 } = getVisibleIndices();

    useEffect(() => {
        if (isAutoPlaying) {
            autoPlayRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % totalItems);
            }, 3000);
        }
        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [isAutoPlaying, totalItems]);

    const handleManualChange = (newIndex: number) => {
        setIsAutoPlaying(false);
        setCurrentIndex(newIndex);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const goToNext = () => {
        handleManualChange((currentIndex + 1) % totalItems);
    };

    const goToPrev = () => {
        handleManualChange((currentIndex - 1 + totalItems) % totalItems);
    };

    return (
        <div
            className="w-full pt-24 pb-16 px-0 mt-12 relative overflow-hidden bg-black"
        >
            {/* Contenido del carrusel */}
            <div className="relative z-10">
                <div className="text-center mb-12">
                    <p className="font-mono-custom text-xs text-[#00b4d8]/70 uppercase tracking-wider mb-2">
                        NUESTROS CLIENTES
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl text-white">
                        Empresas que confían en nosotros
                    </h3>
                    <div className="w-20 h-px bg-[#00b4d8]/50 mx-auto mt-4" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                    {/* Botón anterior */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-10 h-10 rounded-full bg-[#1e3a5f]/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#00b4d8]/30 hover:border-[#00b4d8]/50 transition-all duration-300"
                        aria-label="Anterior"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Contenedor de imágenes - 5 visibles */}
                    <div className="flex items-center justify-center gap-3 md:gap-5 overflow-hidden px-4">
                        {/* Imagen izquierda 2 (más lejana) */}
                        <div
                            className="hidden lg:block flex-shrink-0 transition-all duration-500 cursor-pointer opacity-40 hover:opacity-70"
                            onClick={goToPrev}
                        >
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden bg-white border border-white/20">
                                <img
                                    src={clientesLogos[left2].imagen}
                                    alt={clientesLogos[left2].nombre}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-center text-white/30 text-xs mt-2 font-mono-custom hidden xl:block">
                                {clientesLogos[left2].nombre}
                            </p>
                        </div>

                        {/* Imagen izquierda 1 (cercana) */}
                        <div
                            className="hidden md:block flex-shrink-0 transition-all duration-500 cursor-pointer opacity-60 hover:opacity-90"
                            onClick={goToPrev}
                        >
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden bg-white border border-white/20">
                                <img
                                    src={clientesLogos[left1].imagen}
                                    alt={clientesLogos[left1].nombre}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-center text-white/40 text-xs mt-2 font-mono-custom hidden md:block">
                                {clientesLogos[left1].nombre}
                            </p>
                        </div>

                        {/* Imagen central (destacada) */}
                        <div
                            className="flex-shrink-0 transition-all duration-500 cursor-pointer"
                            onClick={goToNext}
                        >
                            <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden bg-white border-2 border-[#00b4d8] shadow-[0_0_30px_rgba(0,180,216,0.3)]">
                                <img
                                    src={clientesLogos[currentIndex].imagen}
                                    alt={clientesLogos[currentIndex].nombre}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-center text-[#00b4d8] text-sm md:text-base mt-4 font-display font-semibold">
                                {clientesLogos[currentIndex].nombre}
                            </p>
                        </div>

                        {/* Imagen derecha 1 (cercana) */}
                        <div
                            className="hidden md:block flex-shrink-0 transition-all duration-500 cursor-pointer opacity-60 hover:opacity-90"
                            onClick={goToNext}
                        >
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden bg-white border border-white/20">
                                <img
                                    src={clientesLogos[right1].imagen}
                                    alt={clientesLogos[right1].nombre}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-center text-white/40 text-xs mt-2 font-mono-custom hidden md:block">
                                {clientesLogos[right1].nombre}
                            </p>
                        </div>

                        {/* Imagen derecha 2 (más lejana) */}
                        <div
                            className="hidden lg:block flex-shrink-0 transition-all duration-500 cursor-pointer opacity-40 hover:opacity-70"
                            onClick={goToNext}
                        >
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden bg-white border border-white/20">
                                <img
                                    src={clientesLogos[right2].imagen}
                                    alt={clientesLogos[right2].nombre}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <p className="text-center text-white/30 text-xs mt-2 font-mono-custom hidden xl:block">
                                {clientesLogos[right2].nombre}
                            </p>
                        </div>
                    </div>

                    {/* Botón siguiente */}
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-10 h-10 rounded-full bg-[#1e3a5f]/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#00b4d8]/30 hover:border-[#00b4d8]/50 transition-all duration-300"
                        aria-label="Siguiente"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Indicadores */}
                <div className="flex justify-center gap-2 mt-8">
                    {clientesLogos.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleManualChange(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx
                                ? 'w-8 bg-[#00b4d8] shadow-[0_0_10px_rgba(0,180,216,0.5)]'
                                : 'w-2 bg-white/30 hover:bg-white/50'
                                }`}
                            aria-label={`Ir a ${clientesLogos[idx].nombre}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarruselSpotlight;