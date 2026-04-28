// =============================================================================
// SSITEL Site Configuration - Información Real de la Empresa
// Servicios en Sistemas e Infraestructura en Telecomunicaciones S.A. de C.V.
// =============================================================================

// -- Site-wide settings -------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "SSITEL - Servicios en Sistemas e Infraestructura en Telecomunicaciones",
  description: "26 años de experiencia en telecomunicaciones. Especialistas en fibra óptica, obra civil, CCTV, NOC 24/7, canalizaciones y mantenimiento.",
  language: "es",
};

// -- Hero Section -------------------------------------------------------------
export interface HeroNavItem {
  label: string;
  sectionId: string;
  icon: "disc" | "play" | "calendar" | "music";
}

export interface HeroConfig {
  backgroundImage: string;
  brandName: string;
  decodeText: string;
  decodeChars: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryTarget: string;
  ctaSecondary: string;
  ctaSecondaryTarget: string;
  cornerLabel: string;
  cornerDetail: string;
  navItems: HeroNavItem[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.jpg",
  brandName: "SSITEL",
  decodeText: "CONECTIVIDAD SIN LIMITES",
  decodeChars: "01#@$%&*",
  subtitle: "Servicios en Sistemas e Infraestructura en Telecomunicaciones S.A. de C.V.",
  ctaPrimary: "Conócenos",
  ctaPrimaryTarget: "albums",
  ctaSecondary: "Nuestros Servicios",
  ctaSecondaryTarget: "gallery",
  cornerLabel: "EXPERIENCIA",
  cornerDetail: "26 Años",
  navItems: [
    { label: "Nosotros", sectionId: "albums", icon: "disc" },
    { label: "Servicios", sectionId: "gallery", icon: "play" },
    { label: "Infraestructura", sectionId: "tour", icon: "calendar" },
    { label: "Contacto", sectionId: "contact", icon: "music" },
  ],
};

// -- Album Cube Section (Nosotros) --------------------------------------------
export interface Album {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export interface AlbumCubeConfig {
  albums: Album[];
  cubeTextures: string[];
  scrollHint: string;
}

export const albumCubeConfig: AlbumCubeConfig = {
  albums: [
    {
      id: 1,
      title: "EXPERIENCIA",
      subtitle: "CON MÁS DE 26 AÑOS DE EXPERIENCIA",
      image: "/cube-1.jpg",
    },
    {
      id: 2,
      title: "CALIDAD",
      subtitle: "COMPROMISO CON LA EXCELENCIA",
      image: "/cube-2.jpg",
    },
    {
      id: 3,
      title: "EXPERTOS",
      subtitle: "PLANTA INTERNA Y EXTERNA",
      image: "/cube-3.jpg",
    },
    {
      id: 4,
      title: "360°",
      subtitle: "TRABAJO EN EQUIPO",
      image: "/cube-4.jpg",
    },
  ],
  cubeTextures: [
    "/cube-1.jpg",
    "/cube-2.jpg",
    "/cube-3.jpg",
    "/cube-4.jpg",
    "/cube-5.jpg",
    "/cube-6.jpg",
  ],
  scrollHint: "Descubre más sobre nosotros",
};

// -- Parallax Gallery Section (Servicios) -------------------------------------
export interface ParallaxImage {
  id: number;
  src: string;
  alt: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  date: string;
  description: string;
}

export interface ParallaxGalleryConfig {
  sectionLabel: string;
  sectionTitle: string;
  galleryLabel: string;
  galleryTitle: string;
  marqueeTexts: string[];
  endCtaText: string;
  parallaxImagesTop: ParallaxImage[];
  parallaxImagesBottom: ParallaxImage[];
  galleryImages: GalleryImage[];
}

export const parallaxGalleryConfig: ParallaxGalleryConfig = {
  sectionLabel: "NUESTROS SERVICIOS",
  sectionTitle: "SOLUCIONES INTEGRALES",
  galleryLabel: "PORTAFOLIO",
  galleryTitle: "SERVICIOS DESTACADOS",
  marqueeTexts: [
    "CONSTRUCCIÓN DE RED AÉREA Y SUBTERRÁNEA",
    "MANTENIMIENTO A REDES DE TELECOMUNICACIONES",
    "IMPLEMENTACION DE SITIOS IBS",
    "SERVICIOS DE INSTALACIÓN DE STREET CELL",
    "CANALIZACIONES CON PERFORACIÓN DIRECCIONAL",
    "CANALIZACIONES A CIELO ABIERTO",
    "MONTAJE Y DESMONTAJE DE ANTENAS",
    "INSTALACIÓN DE CÁMARAS DE SEGURIDAD",
  ],
  endCtaText: "Ver todos los servicios",
  parallaxImagesTop: [
    { id: 1, src: "/servicio-7.jpg", alt: "Instalación de fibra óptica" },
    { id: 2, src: "/servicio-8.jpg", alt: "CCTV y seguridad" },
    { id: 3, src: "/servicio-9.jpg", alt: "Centro de monitoreo NOC" },
    { id: 4, src: "/servicio-10.jpg", alt: "Almacén" },
    { id: 5, src: "/servicio-11.jpg", alt: "Fusionado de fibra" },
    { id: 6, src: "/servicio-12.jpg", alt: "Infraestructura subterránea" },
  ],
  parallaxImagesBottom: [
    { id: 1, src: "/servicio-12.jpg", alt: "Flotilla vehicular" },
    { id: 2, src: "/servicio-13.jpg", alt: "Equipo técnico" },
    { id: 3, src: "/servicio-14.jpg", alt: "Laboratorio" },
    { id: 4, src: "/servicio-15.jpg", alt: "Ingeniería de campo" },
    { id: 5, src: "/servicio-16.jpg", alt: "Red de fibra" },
    { id: 6, src: "/servicio-17.jpg", alt: "Data center" },
  ],
  galleryImages: [
    { 
      id: 1, 
      src: "/servicio-1.jpg", 
      title: "Servicios Planta Externa", 
      date: "Fibra Óptica",
      description: "Construcción de redes de fibra óptica en planta externa, incluyendo obra civil, tendido, fusiones y pruebas OTDR."
    },
    { 
      id: 2, 
      src: "/servicio-6.jpg", 
      title: "Servicios Planta Interna", 
      date: "Planta Interna",
      description: "Instalación de cableado estructurado y fibra óptica en interiores, canalizaciones, charolas y cuartos técnicos."
    },
    { 
      id: 3, 
      src: "/servicio-2.jpg", 
      title: "Ingeniería y Documentación Técnica", 
      date: "Ingeniería",
      description: "Desarrollo de planos, memorias técnicas, levantamientos de campo y gestión de proyectos de infraestructura."
    },
    { 
      id: 4, 
      src: "/servicio-3.jpg", 
      title: "NOC 24/7", 
      date: "Monitoreo",
      description: "Centro de Operaciones de Red con vigilancia continua, gestión de alarmas y soporte técnico en tiempo real."
    },
    { 
      id: 5, 
      src: "/servicio-7.jpg", 
      title: "Trámites y Permisos", 
      date: "Gestión",
      description: "Gestión especializada de permisos municipales, estatales y federales para el despliegue de infraestructura."
    },
    { 
      id: 6, 
      src: "/servicio-11.jpg", 
      title: "Soluciones IBS (In-Building Solutions)", 
      date: "Cobertura Interior",
      description: "Optimización de cobertura celular en interiores mediante sistemas de antenas distribuidas de alta eficiencia."
    },
    { 
      id: 7, 
      src: "/servicio-18.jpg", 
      title: "Montaje y Desmontaje de Equipos en Torres", 
      date: "Trabajos en Altura",
      description: "Instrucciones de rigging, instalación de antenas y equipos de radiofrecuencia en estructuras elevadas."
    },
  ],
};

// -- Tour Schedule Section (Infraestructura) ----------------------------------
export interface TourDate {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  image: string;
}

export interface TourScheduleConfig {
  sectionLabel: string;
  sectionTitle: string;
  vinylImage: string;
  bottomNote: string;
  bottomCtaText: string;
  tourDates: TourDate[];
}

export const tourScheduleConfig: TourScheduleConfig = {
  sectionLabel: "INFRAESTRUCTURA",
  sectionTitle: "NUESTRA CAPACIDAD OPERATIVA",
  vinylImage: "/vinyl-disc.png",
  bottomNote: "",
  bottomCtaText: "",
  tourDates: [
    {
      id: 1,
      title: "ALMACÉN",
      description: "Gestión y control de inventarios de materiales, equipos y herramientas, asegurando disponibilidad y trazabilidad en cada proyecto. Optimización de procesos logísticos para el suministro eficiente en campo.",
      buttonText: "Ver más",
      image: "/infra-almacen.jpg",
    },
    {
      id: 2,
      title: "FLOTILLA",
      description: "Unidades operativas certificadas, equipadas para trabajos en vialidades conforme a normativas vigentes. Operación 24/7 con capacidad de respuesta inmediata a nivel nacional.",
      buttonText: "Ver más",
      image: "/infra-flotilla.jpg",
    },
    {
      id: 3,
      title: "PERSONAL Y EQUIPAMIENTO",
      description: "Personal técnico especializado y certificado para la ejecución de proyectos de telecomunicaciones. Contamos con herramientas y equipos adecuados para garantizar calidad, seguridad y cumplimiento en cada intervención.",
      buttonText: "Ver más",
      image: "/infra-equipo.jpg",
    },
    {
      id: 4,
      title: "LABORATORIO FO",
      description: "Preparación, ensamble y validación de componentes de fibra óptica, incluyendo armado de jumpers, pigtails y preconectorización. Ejecución de pruebas OTDR y medición de potencia para garantizar la calidad, continuidad y desempeño de la red.",
      buttonText: "Ver más",
      image: "/infra-laboratorio.jpg",
    },
  ],
};
// -- Footer Section (Contacto) ------------------------------------------------
export interface FooterImage {
  id: number;
  src: string;
}

export interface SocialLink {
  icon: "instagram" | "twitter" | "youtube" | "music";
  label: string;
  href: string;
}

export interface FooterConfig {
  portraitImage: string;
  portraitAlt: string;
  heroTitle: string;
  heroSubtitle: string;
  artistLabel: string;
  artistName: string;
  artistSubtitle: string;
  brandName: string;
  brandDescription: string;
  quickLinksTitle: string;
  quickLinks: string[];
  contactTitle: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  addressLabel: string;
  address: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText: string;
  subscribeAlertMessage: string;
  copyrightText: string;
  bottomLinks: string[];
  socialLinks: SocialLink[];
  galleryImages: FooterImage[];
}

export const footerConfig: FooterConfig = {
  portraitImage: "/footer-portrait.jpg",
  portraitAlt: "SSITEL Telecomunicaciones",
  heroTitle: "CONECTANDO",
  heroSubtitle: "EL PRESENTE CON EL FUTURO",
  artistLabel: "",
  artistName: "SSITEL",
  artistSubtitle: "Servicios en Sistemas e Infraestructura en Telecomunicaciones S.A. de C.V.",
  brandName: "SSITEL",
  brandDescription: "Empresa dedicada al ramo de las Telecomunicaciones con 26 años de trayectoria. Expertos en obra civil y fibra óptica en Planta interna y externa. Contamos con unidades propias certificadas para trabajos en vialidades. Clientes: Telcel, AT&T, Telmex, Circuito Exterior Mexiquense.",
  quickLinksTitle: "Servicios",
  quickLinks: [
    "Servicios Planta Externa",
    "Servicios Planta Interna",
    "Ingeniería y Documentación Técnica",
    "NOC 24/7",
    "Trámites y Permisos",
    "Soluciones IBS (In-Building Solutions)",
    "Montaje y Desmontaje de Equipos en Torres",
  ],
  contactTitle: "Información de Contacto",
  emailLabel: "Correo Electrónico",
  email: "contacto@ssitel.net / administracion@ssitel.net",
  phoneLabel: "Teléfono",
  phone: "55-56-35-03-30",
  addressLabel: "Dirección",
  address: "Martha 18 San Lorenzo Xicoténcatl, Iztapalapa, Ciudad de México.",
  newsletterTitle: "Suscríbete",
  newsletterDescription: "Recibe nuestras últimas noticias y actualizaciones",
  newsletterButtonText: "Suscribirse",
  subscribeAlertMessage: "¡Gracias por suscribirte a SSITEL!",
  copyrightText: "© 2024 SSITEL. Servicios en Sistemas e Infraestructura en Telecomunicaciones S.A. de C.V. Todos los derechos reservados.",
  bottomLinks: ["Privacidad", "Términos", "Cookies"],
  socialLinks: [
    { icon: "instagram", label: "Instagram", href: "#" },
    { icon: "twitter", label: "LinkedIn", href: "#" },
    { icon: "youtube", label: "YouTube", href: "#" },
  ],
  galleryImages: [
    { id: 1, src: "/servicio-1.jpg" },
    { id: 2, src: "/servicio-2.jpg" },
    { id: 3, src: "/servicio-3.jpg" },
    { id: 4, src: "/servicio-4.jpg" },
  ],
};

// -- Servicios Detallados (para sección adicional) ----------------------------
export interface ServicioDetallado {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
}

export const serviciosDetallados: ServicioDetallado[] = [
  {
    id: 1,
    titulo: "Fibra Óptica",
    descripcion: "Construcción de infraestructura para telecomunicaciones. Cimentación especializada, colocación de postes y canalizaciones.",
    icono: "fiber",
  },
  {
    id: 2,
    titulo: "Obra Civil",
    descripcion: "Construcción de infraestructura para telecomunicaciones. Cimentación especializada, colocación de postes y canalizaciones.",
    icono: "construction",
  },
  {
    id: 3,
    titulo: "CCTV con IA",
    descripcion: "Instalación de más de 180 cámaras con inteligencia artificial para el C5 de la CDMX. Superpostes de hasta 15 metros.",
    icono: "camera",
  },
  {
    id: 4,
    titulo: "NOC 24/7",
    descripcion: "Network Operations Center operando 24 horas, 7 días a la semana. Monitoreo, gestión de alarmas y resolución de fallas.",
    icono: "monitor",
  },
  {
    id: 5,
    titulo: "Canalizaciones",
    descripcion: "Cepa a cielo abierto, minicepa y perforación direccional. Excavaciones con retroexcavadoras y maquinaria especializada.",
    icono: "pipe",
  },
  {
    id: 6,
    titulo: "Sitios IBS",
    descripcion: "In-Building Solutions. Potenciación de señal en espacios interiores con antenas especializadas para máxima cobertura.",
    icono: "signal",
  },
  {
    id: 7,
    titulo: "Street Cell",
    descripcion: "Instalación y mantenimiento preventivo de equipos Street Cell. Inspección y mantenimiento de red de fibra óptica.",
    icono: "cell",
  },
  {
    id: 8,
    titulo: "Torres",
    descripcion: "Montaje y desmontaje de equipos de torres. Retiro seguro de equipos e instalación de nuevas estructuras.",
    icono: "tower",
  },
];

// -- Clientes -----------------------------------------------------------------
export const clientes = [
  "Telcel",
  "AT&T",
  "Telmex",
  "Circuito Exterior Mexiquense",
];
