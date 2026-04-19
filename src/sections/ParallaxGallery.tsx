import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Ticket, ArrowRight } from 'lucide-react';
import { parallaxGalleryConfig } from '../config';
import ModalProyecto from '../components/ui/ModalProyecto';

gsap.registerPlugin(ScrollTrigger);

const ParallaxGallery = () => {
  if (
    parallaxGalleryConfig.parallaxImagesTop.length === 0 &&
    parallaxGalleryConfig.galleryImages.length === 0 &&
    !parallaxGalleryConfig.sectionTitle
  ) {
    return null;
  }

  const [selectedProyecto, setSelectedProyecto] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryTrackRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRefs = useRef<ScrollTrigger[]>([]);

  // Función para normalizar el título y obtener el nombre de la carpeta
  const getFolderName = (title: string): string => {
    const mapping: Record<string, string> = {
      "Servicios Planta Externa": "servicios-planta-externa",
      "Servicios Planta Interna": "servicios-planta-interna",
      "Ingeniería y Documentación Técnica": "ingenieria-documentacion",
      "NOC 24/7": "noc-24-7",
      "Trámites y Permisos": "tramites-permisos",
      "Desarrollo de Soluciones Tecnológicas": "desarrollo-soluciones",
      "Soluciones IBS (In-Building Solutions)": "soluciones-ibs",
      "Montaje y Desmontaje de Equipos en Torres": "montaje-torres",
      "Laboratorio FO": "laboratorio-fo",
    };
    return mapping[title] || title.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Cargar imágenes desde la carpeta correspondiente
  const loadImagesFromFolder = async (folderName: string): Promise<string[]> => {
    const imagenes: string[] = [];
    const maxFiles = 30;
    const extensions = ['jpg', 'jpeg', 'png', 'webp'];

    for (let i = 1; i <= maxFiles; i++) {
      for (const ext of extensions) {
        const imgPath = `/capacidad/${folderName}/${i}.${ext}`;
        const exists = await new Promise<boolean>((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = imgPath;
          setTimeout(() => resolve(false), 1000);
        });
        if (exists) {
          imagenes.push(imgPath);
          break;
        }
      }
    }
    return imagenes;
  };

  const openServiceModal = async (service: any) => {
    setLoadingImages(true);
    const folderName = getFolderName(service.title);
    const galleryImages = await loadImagesFromFolder(folderName);

    const proyectoEnriquecido = {
      ...service,
      description: `Detalles del servicio: ${service.title}.`,
      detalles: [
        "Servicio profesional de alta calidad",
        "Personal técnico certificado",
        "Equipamiento de última generación",
        "Garantía y soporte continuo"
      ],
      cliente: "Múltiples clientes",
      ubicacion: "Nacional",
      imagenesAdicionales: galleryImages
    };

    setSelectedProyecto(proyectoEnriquecido);
    setIsModalOpen(true);
    setLoadingImages(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProyecto(null);
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (topRowRef.current && bottomRowRef.current) {
        const st1 = ScrollTrigger.create({
          trigger: parallaxContainerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (topRowRef.current) {
              gsap.set(topRowRef.current, { x: -progress * 300 });
            }
            if (bottomRowRef.current) {
              gsap.set(bottomRowRef.current, { x: progress * 300 - 150 });
            }
          },
        });
        scrollTriggerRefs.current.push(st1);
      }

      if (galleryRef.current && galleryTrackRef.current) {
        const trackWidth = galleryTrackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const st2 = ScrollTrigger.create({
          trigger: galleryRef.current,
          start: 'top top',
          end: () => `+=${trackWidth - viewportWidth}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (galleryTrackRef.current) {
              const x = -self.progress * (trackWidth - viewportWidth);
              gsap.set(galleryTrackRef.current, { x });
            }
          },
        });
        scrollTriggerRefs.current.push(st2);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      scrollTriggerRefs.current.forEach(st => st.kill());
      scrollTriggerRefs.current = [];
    };
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="relative w-full bg-void-black">
      {/* Parallax Strips Section */}
      <div ref={parallaxContainerRef} className="relative py-20 overflow-hidden">
        <div className="px-12 mb-12">
          <p className="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider mb-2">
            {parallaxGalleryConfig.sectionLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            {parallaxGalleryConfig.sectionTitle}
          </h2>
        </div>
        <div ref={topRowRef} className="flex gap-4 mb-4 will-change-transform">
          {parallaxGalleryConfig.parallaxImagesTop.map((image) => (
            <div key={image.id} className="relative flex-shrink-0 w-[400px] h-[250px] overflow-hidden rounded-lg image-hover-scale">
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/50 to-transparent" />
            </div>
          ))}
        </div>
        <div className="relative py-8 bg-void-dark overflow-hidden border-y border-white/5">
          <div className="animate-marquee flex whitespace-nowrap">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 mx-8 text-2xl font-display text-white/20">
                {parallaxGalleryConfig.marqueeTexts.map((text, j) => (
                  <span key={j}>{text}</span>
                ))}
                <Ticket className="w-6 h-6" />
                <ArrowRight className="w-6 h-6" />
              </span>
            ))}
          </div>
        </div>
        <div ref={bottomRowRef} className="flex gap-4 will-change-transform" style={{ transform: 'translateX(-150px)' }}>
          {parallaxGalleryConfig.parallaxImagesBottom.map((image) => (
            <div key={image.id} className="relative flex-shrink-0 w-[400px] h-[250px] overflow-hidden rounded-lg image-hover-scale">
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-void-black/50 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Gallery Section */}
      <div ref={galleryRef} className="relative h-screen overflow-hidden">
        <div className="absolute top-12 left-12 z-20">
          <p className="font-mono-custom text-xs text-neon-soft/60 uppercase tracking-wider mb-2">
            {parallaxGalleryConfig.galleryLabel}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            {parallaxGalleryConfig.galleryTitle}
          </h2>
        </div>

        <div ref={galleryTrackRef} className="flex items-center gap-8 h-full px-12 pt-24 will-change-transform">
          {parallaxGalleryConfig.galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="relative flex-shrink-0 group cursor-pointer"
              style={{ marginTop: index % 2 === 0 ? '0' : '60px' }}
              onClick={() => openServiceModal(image)}
            >
              <div className="relative w-[450px] h-[300px] overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/10 transition-colors duration-300" />
              </div>

              {/* Contenedor del título (sin botón) */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <p className="font-mono-custom text-xs text-neon-soft/80 mb-1">{image.date}</p>
                <h3 className="font-display text-2xl text-white">{image.title}</h3>
              </div>

              {/* Index number */}
              <div className="absolute -top-8 -left-4 font-mono-custom text-7xl text-white/5 font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-12 left-12 right-12 h-px bg-white/10">
          <div className="h-full bg-neon-cyan/50 w-0" id="gallery-progress" />
        </div>
      </div>

      <ModalProyecto
        proyecto={selectedProyecto}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default ParallaxGallery;