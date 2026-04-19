import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';
import { tourScheduleConfig } from '../config';
import CarruselSpotlight from '../components/ui/CarruselSpotlight';
import GaleriaModal from '../components/ui/GaleriaModal';
import MapaMexico from '../components/ui/MapaMexico';

gsap.registerPlugin(ScrollTrigger);

// Nuevo tipo de datos para las tarjetas
interface CapacidadItem {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
}

const TourSchedule = () => {
  if (!tourScheduleConfig.tourDates || tourScheduleConfig.tourDates.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [galeriaImagenes, setGaleriaImagenes] = useState<string[]>([]);

  // Convertir los datos del config al nuevo formato
  const capacidades: CapacidadItem[] = tourScheduleConfig.tourDates.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    buttonText: item.buttonText,
    image: item.image,
  }));

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.capacidad-card') || [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const loadImages = async (folderName: string): Promise<string[]> => {
    const imagenes: string[] = [];
    const maxFiles = 30;
    const extensions = ['jpg', 'jpeg', 'png', 'webp'];

    for (let i = 1; i <= maxFiles; i++) {
      for (const ext of extensions) {
        const imgPath = `/capacidad/${folderName}/${i}.${ext}`;
        console.log(`Probando: ${imgPath}`);

        const exists = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => {
            console.log(`✅ Existe: ${imgPath}`);
            resolve(true);
          };
          img.onerror = () => {
            console.log(`❌ No existe: ${imgPath}`);
            resolve(false);
          };
          img.src = imgPath;
          setTimeout(() => {
            console.log(`⏱️ Timeout: ${imgPath}`);
            resolve(false);
          }, 2000);
        });

        if (exists) {
          imagenes.push(imgPath);
          break; // pasa al siguiente número
        }
      }
    }

    console.log(`📦 Total encontradas en ${folderName}:`, imagenes);
    return imagenes;
  };

  const handleVerMas = async (capacidad: CapacidadItem) => {
    setSelectedTitle(capacidad.title);
    setSelectedDescription(capacidad.description);

    // Mapeo de títulos a nombres de carpetas
    const folderMap: Record<string, string> = {
      'ALMACÉN': 'almacen',
      'FLOTILLA': 'flotilla',
      'PERSONAL Y EQUIPAMIENTO': 'equipo-tecnico',
      'LABORATORIO FO': 'laboratorio-fo',
    };

    const folderName = folderMap[capacidad.title] || capacidad.title.toLowerCase().replace(/ /g, '-');
    const imagenes = await loadImages(folderName);

    // Si no encuentra imágenes dinámicas, por lo menos muestra la principal de la tarjeta
    setGaleriaImagenes(imagenes.length > 0 ? imagenes : [capacidad.image]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setGaleriaImagenes([]);
  };

  return (
    <section
      id="tour"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-void-black py-20 overflow-hidden"
    >
      {/* Vinyl disc decorativo */}
      {tourScheduleConfig.vinylImage && (
        <div className="absolute top-20 right-20 w-64 h-64 md:w-80 md:h-80 z-0 opacity-20">
          <img
            src={tourScheduleConfig.vinylImage}
            alt="Vinyl Disc"
            className="w-full h-full animate-spin-slow"
          />
        </div>
      )}

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-20">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="font-mono-custom text-xs text-[#00b4d8] uppercase tracking-wider mb-2">
            {tourScheduleConfig.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white">
            {tourScheduleConfig.sectionTitle}
          </h2>
          <div className="w-20 h-px bg-[#00b4d8]/50 mx-auto mt-6" />
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capacidades.map((capacidad) => (
            <div
              key={capacidad.id}
              className="capacidad-card group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-[#00b4d8]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,180,216,0.15)]"
            >
              {/* Imagen */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={capacidad.image}
                  alt={capacidad.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Contenido */}
              <div className="p-6">
                <h3 className="font-display text-xl text-white mb-3">
                  {capacidad.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {capacidad.description}
                </p>
                <button
                  onClick={() => handleVerMas(capacidad)}
                  className="inline-flex items-center gap-2 text-[#00b4d8] text-sm font-mono-custom uppercase tracking-wider hover:gap-3 transition-all duration-300"
                >
                  <span>{capacidad.buttonText}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carrusel Spotlight de Clientes (Full Width) */}
      <div className="relative z-20 w-full mb-20">
        <CarruselSpotlight />
      </div>

      {/* Mapa de presencia nacional */}
      <MapaMexico />

      {/* Bloque de nota final y CTA eliminado */}

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <GaleriaModal
        isOpen={modalOpen}
        onClose={closeModal}
        titulo={selectedTitle}
        descripcion={selectedDescription}
        imagenes={galeriaImagenes}
      />
    </section>
  );
};

export default TourSchedule;
