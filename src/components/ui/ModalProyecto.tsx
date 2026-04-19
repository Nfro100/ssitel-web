import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import GaleriaModal from './GaleriaModal';

interface Proyecto {
    id: number;
    src: string;
    title: string;
    date: string;
    description?: string;
    detalles?: string[];
    cliente?: string;
    ubicacion?: string;
    imagenesAdicionales?: string[];
}

interface ModalProyectoProps {
    proyecto: Proyecto | null;
    isOpen: boolean;
    onClose: () => void;
}

const ModalProyecto = ({ proyecto, isOpen, onClose }: ModalProyectoProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [showGaleria, setShowGaleria] = useState(false);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen || !proyecto) return null;

    const imagenesGaleria = proyecto.imagenesAdicionales || [];

    const renderSpecificContent = (title: string) => {
        // ================== PLANTA EXTERNA ==================
        if (title === "Fibra Óptica Planta Externa" || title === "Servicios Planta Externa") {
            return (
                <div className="space-y-5 mt-4">
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">LEVANTAMIENTO E INGENIERÍA</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Iniciamos cada proyecto con levantamientos en campo para definir la mejor solución de red.
                            Con base en esta información, o en la ingeniería del cliente, desarrollamos planos y
                            documentación técnica, cumpliendo con la normatividad vigente.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">OBRA CIVIL E INFRAESTRUCTURA</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Ejecutamos la construcción de infraestructura necesaria para el proyecto, incluyendo
                            instalación de postería, canalización a cielo abierto, microcanalización y perforación direccional.
                            También realizamos instalación de ductería, registros y sistemas de tierras, garantizando una
                            base sólida y segura para la red.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">TENDIDO DE FIBRA ÓPTICA</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Con la infraestructura lista, realizamos el tendido e inmersión de fibra óptica en sistemas
                            aéreos y subterráneos. Ejecutamos el jalado e instalación en ductos, microductos y exoductos,
                            incluyendo fusiones, instalación de cierres de empalme, pruebas (OTDR y potencia) y puesta en
                            servicio, asegurando un desempeño óptimo de la red.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">MANTENIMIENTO DE RED</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Brindamos mantenimiento preventivo y correctivo, atendiendo fallas, daños y optimización de la red.
                            Contamos con personal especializado y atención 24/7, garantizando respuesta inmediata y
                            continuidad del servicio.
                        </p>
                    </div>
                </div>
            );
        }

        // ================== PLANTA INTERNA ==================
        if (title === "Servicios Planta Interna") {
            return (
                <div className="space-y-5 mt-4">
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">LEVANTAMIENTO E INGENIERÍA</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Realizamos levantamientos en sitio para definir la mejor solución de infraestructura interna,
                            considerando rutas, espacios técnicos y requerimientos del cliente. Desarrollamos planos,
                            memorias técnicas y documentación conforme a normatividad y estándares del proyecto.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">INSTALACIÓN DE INFRAESTRUCTURA</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Ejecutamos la adecuación e instalación de infraestructura interna, incluyendo canalizaciones,
                            charolas, tubería conduit, racks y gabinetes. Garantizamos una correcta organización, distribución
                            y protección del cableado dentro de sitios técnicos, edificios y centros de datos.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">CABLEADO Y CONECTIVIDAD</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Realizamos la instalación de cableado estructurado y fibra óptica, incluyendo tendido, peinado,
                            etiquetado y terminación ODF y equipos. Ejecutamos fusiones, conectorización y pruebas,
                            asegurando un rendimiento óptimo en redes de datos y telecomunicaciones.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">INTEGRACIÓN Y PUESTA EN SERVICIO</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Llevamos a cabo la integración de equipos activos, organización de enlaces y validación de servicios
                            mediante pruebas técnicas. Se realiza la puesta en operación garantizando funcionalidad, orden y
                            cumplimiento de estándares.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">MANTENIMIENTO DE RED</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Ofrecemos mantenimiento preventivo y correctivo en infraestructura interna, incluyendo revisión de
                            cableado, equipos y conexiones. Contamos con personal especializado y atención 24/7, asegurando
                            continuidad operativa y rápida atención a fallas.
                        </p>
                    </div>
                </div>
            );
        }

        // ================== INGENIERÍA Y DOCUMENTACIÓN TÉCNICA ==================
        if (title === "Ingeniería y Documentación Técnica") {
            return (
                <div className="space-y-5 mt-4">
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">DISEÑO Y GEORREFERENCIACIÓN</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Desarrollamos la base técnica del proyecto mediante herramientas especializadas que aseguran precisión en el diseño y ubicación de la red:
                            elaboración de planos en formatos DWG y PDF, en los que se define y dimensiona la red a construir, incluyendo la ubicación de los elementos a instalar, la cuantificación de materiales, así como las especificaciones técnicas y los métodos constructivos requeridos para su correcta ejecución.
                            Generación de archivos KMZ/KML para la georreferenciación de rutas, nodos y elementos de telecomunicaciones.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">DOCUMENTACIÓN DE CAMPO Y ESPECIFICACIONES</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Complementamos la ingeniería con información detallada para una ejecución eficiente y controlada:
                            reporte fotográfico de trayectorias, infraestructura existente y condiciones del sitio.
                            Integración de fichas técnicas de materiales y equipos.
                            Desarrollo de análisis y costeos del proyecto, definiendo los materiales necesarios para su implementación.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">EXPEDIENTE FINAL (AS-BUILT)</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Al concluir la obra, se entrega la documentación “As-Built”, que refleja las condiciones reales de la red instalada:
                            actualización de planos y documentación conforme a lo construido.
                            Integración de todos los entregables en un expediente técnico completo, organizado y alineado a los requerimientos del cliente.
                        </p>
                    </div>
                </div>
            );
        }

        // ================== TRÁMITES Y PERMISOS ==================
        if (title === "Trámites y Permisos") {
            return (
                <div className="space-y-5 mt-4">
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">GESTIÓN ANTE DEPENDENCIAS</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Realizamos la tramitación de permisos ante autoridades municipales, estatales y organismos como CFE y otras entidades regulatorias, asegurando la correcta autorización para la ejecución de obra.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">INTEGRACIÓN DE EXPEDIENTES</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Preparamos y organizamos la documentación técnica y administrativa requerida, incluyendo planos, memorias descriptivas y requisitos específicos solicitados por cada dependencia.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">SEGUIMIENTO Y CONTROL</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Damos seguimiento puntual al estatus de cada trámite, gestionando observaciones y asegurando tiempos de respuesta eficientes hasta la obtención de las autorizaciones correspondientes.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">CUMPLIMIENTO NORMATIVO</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Garantizamos que cada proyecto se desarrolle conforme a la normatividad vigente, reduciendo riesgos legales y evitando retrasos en la ejecución.
                        </p>
                    </div>
                </div>
            );
        }

        // ================== DESARROLLO DE SOLUCIONES TECNOLÓGICAS ==================
        if (title === "Desarrollo de Soluciones Tecnológicas") {
            return (
                <div className="space-y-5 mt-4">
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">DESARROLLO A LA MEDIDA</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Diseñamos y desarrollamos aplicaciones personalizadas para el control de procesos, gestión de información en campo y seguimiento de proyectos, permitiendo una operación más eficiente y organizada.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">DIGITALIZACIÓN DE PROCESOS</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Implementamos soluciones que permiten sustituir procesos manuales por plataformas digitales, facilitando la captura de información en tiempo real, control de avances y reducción de errores operativos.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">INTEGRACIÓN Y VISUALIZACIÓN DE DATOS</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Desarrollamos herramientas para la visualización de información técnica, geográfica y operativa, integrando datos de campo, ingeniería y ejecución en plataformas accesibles para la toma de decisiones.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">SOPORTE Y MEJORA CONTINUA</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Brindamos mantenimiento y actualización constante a las soluciones desarrolladas, adaptándolas a nuevos requerimientos operativos y tecnológicos, asegurando su funcionamiento y evolución continua.
                        </p>
                    </div>
                </div>
            );
        }

        // ================== NOC 24/7 ==================
        if (title === "NOC 24/7") {
            return (
                <div className="space-y-5 mt-4">
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">MONITOREO Y SUPERVISIÓN</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Realizamos monitoreo en tiempo real de enlaces y equipos, permitiendo la detección oportuna de fallas, degradaciones o eventos que puedan afectar la operación del servicio.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">ATENCIÓN Y GESTIÓN DE INCIDENCIAS</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Contamos con personal especializado para la atención inmediata de incidencias, ejecutando diagnósticos remotos, escalamiento de eventos y coordinación con cuadrillas en campo para una pronta solución.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">MANTENIMIENTO Y CONTINUIDAD OPERATIVA</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Damos seguimiento continuo a la red mediante acciones preventivas y correctivas, asegurando la estabilidad del servicio y la optimización del desempeño de la infraestructura.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">REPORTES Y CONTROL OPERATIVO</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Generamos reportes de desempeño, incidencias y niveles de servicio, brindando visibilidad y control sobre la operación de la red conforme a los requerimientos del cliente.
                        </p>
                    </div>
                </div>
            );
        }

        // ================== LABORATORIO FO ==================
        if (title === "Laboratorio FO") {
            return (
                <div className="space-y-5 mt-4">
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">PREPARACIÓN Y ENSAMBLE</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Realizamos la preparación de cables, armado de jumpers, pigtails y preconectorización, asegurando terminaciones precisas y listas para su instalación en campo.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">PRUEBAS Y CERTIFICACIÓN</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Ejecutamos pruebas especializadas mediante equipos como OTDR y medidores de potencia, verificando la continuidad, atenuación y calidad de las fibras ópticas, cumpliendo con los estándares del sector.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">DIAGNÓSTICO Y REPARACIÓN</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Identificamos fallas en enlaces y componentes mediante análisis técnico, realizando reparaciones, refusiones y acondicionamiento de fibra óptica para restablecer su correcto funcionamiento.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">CONTROL DE CALIDAD</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Aseguramos la calidad de cada componente and ensamble mediante procedimientos estandarizados, garantizando la confiabilidad y desempeño de la red desde su implementación.
                        </p>
                    </div>
                </div>
            );
        }

        // ================== SOLUCIONES IBS ==================
        if (title === "Soluciones IBS (In-Building Solutions)") {
            return (
                <div className="space-y-5 mt-4">
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">COBERTURA INTERIOR SIN LÍMITES</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Diseñamos e implementamos soluciones avanzadas para llevar conectividad de alta calidad a espacios interiores donde la señal exterior no es suficiente. Desde estudios de cobertura hasta la instalación de antenas, cableado y equipos especializados, garantizamos una distribución uniforme y confiable en edificios corporativos, centros comerciales, hoteles y recintos subterráneos.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">OPTIMIZACIÓN Y MANTENIMIENTO</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Optimización, ajuste y mantenimiento continuo de los sistemas para asegurar su correcto funcionamiento, alto desempeño y adaptación a nuevas necesidades de cobertura. Aseguramos la mejor experiencia de conectividad en todo momento.
                        </p>
                    </div>
                </div>
            );
        }

        // ================== MONTAJE Y DESMONTAJE DE EQUIPOS EN TORRES ==================
        if (title === "Montaje y Desmontaje de Equipos en Torres") {
            return (
                <div className="space-y-5 mt-4">
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">SEGURIDAD Y PRECISIÓN EN ALTURA</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Ejecutamos el montaje, desmontaje y modernización de equipos de telecomunicaciones en torres y estructuras elevadas. Nuestros técnicos especializados realizan la instalación, alineación y retiro de antenas, radios, herrajes y accesorios, cumpliendo estrictamente con las normas de seguridad y calidad vigentes.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[#00b4d8] font-mono-custom text-sm mb-2">MANTENIMIENTO Y ADECUACIÓN</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                            Realizamos trabajos de adecuación, mantenimiento y modernización de equipos en altura, asegurando la integridad de la infraestructura y la correcta operación de los sistemas, minimizando riesgos y tiempos de intervención.
                        </p>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md transition-all duration-300"
                onClick={handleBackdropClick}
            >
                <div
                    ref={modalRef}
                    className="relative max-w-6xl w-full bg-[#1e3a5f]/90 backdrop-blur-xl rounded-2xl border border-[#00b4d8]/30 shadow-[0_0_50px_rgba(0,180,216,0.3)] overflow-hidden animate-fade-up max-h-[90vh] overflow-y-auto"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-[#00b4d8]/30 hover:border-[#00b4d8]/50 transition-all duration-300"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col md:flex-row h-full">
                        <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                            <img
                                src={proyecto.src}
                                alt={proyecto.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                            <p className="font-mono-custom text-xs text-[#00b4d8] mb-2">
                                {proyecto.date}
                            </p>
                            <h3 className="font-display text-2xl md:text-3xl text-white mb-4">
                                {proyecto.title}
                            </h3>
                            <div className="w-12 h-px bg-[#00b4d8]/50 my-4" />
                            {proyecto.description && (
                                <p className="text-white/70 text-sm leading-relaxed mb-6">
                                    {proyecto.description}
                                </p>
                            )}
                            {renderSpecificContent(proyecto.title)}

                            {imagenesGaleria.length > 0 && (
                                <button
                                    onClick={() => setShowGaleria(true)}
                                    className="mt-6 w-full py-2 bg-[#00b4d8]/20 border border-[#00b4d8]/50 rounded-lg text-[#00b4d8] font-mono-custom text-sm uppercase tracking-wider hover:bg-[#00b4d8]/30 transition-all"
                                >
                                    Ver galería de imágenes
                                </button>
                            )}

                            <button
                                onClick={onClose}
                                className="mt-8 w-full py-3 bg-[#00b4d8]/20 border border-[#00b4d8]/50 rounded-lg text-[#00b4d8] font-mono-custom text-sm uppercase tracking-wider hover:bg-[#00b4d8]/30 transition-all duration-300"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showGaleria && (
                <GaleriaModal
                    isOpen={showGaleria}
                    onClose={() => setShowGaleria(false)}
                    titulo={proyecto.title}
                    descripcion={proyecto.description || "Galería de imágenes"}
                    imagenes={imagenesGaleria}
                />
            )}
        </>
    );
};

export default ModalProyecto;