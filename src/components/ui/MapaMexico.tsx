// src/components/ui/MapaMexico.tsx
import { useState, useEffect, useRef } from 'react';

interface Region {
    estados: string[];
    etiquetas: { estadoId: string; texto: string; cx: number; cy: number }[];
}

const regiones: Record<string, Region> = {
    "Región 4": {
        estados: ["Nuevo León"],
        etiquetas: [{ estadoId: "Nuevo León", texto: "Monterrey", cx: 590, cy: 270 }]
    },
    "Región 5": {
        estados: ["Jalisco"],
        etiquetas: [{ estadoId: "Jalisco", texto: "Guadalajara", cx: 480, cy: 440 }]
    },
    "Región 6": {
        estados: ["Querétaro"],
        etiquetas: [{ estadoId: "Querétaro", texto: "Querétaro", cx: 590, cy: 430 }]
    },
    "Región 7": {
        estados: ["Puebla", "Veracruz"],
        etiquetas: [
            { estadoId: "Puebla", texto: "Puebla", cx: 620, cy: 480 },
            { estadoId: "Veracruz", texto: "Veracruz", cx: 720, cy: 460 }
        ]
    },
    "Región 8": {
        estados: ["Yucatán", "Campeche", "Quintana Roo", "Chiapas", "Tabasco"],
        etiquetas: [
            { estadoId: "Yucatán", texto: "Mérida", cx: 890, cy: 420 },
            { estadoId: "Campeche", texto: "Campeche", cx: 820, cy: 450 },
            { estadoId: "Quintana Roo", texto: "Chetumal", cx: 880, cy: 490 },
            { estadoId: "Chiapas", texto: "Tuxtla Gtz.", cx: 800, cy: 550 },
            { estadoId: "Tabasco", texto: "Villahermosa", cx: 780, cy: 510 }
        ]
    },
    "Región 9": {
        estados: ["Ciudad de México", "México", "Hidalgo", "Tlaxcala", "Morelos"],
        etiquetas: [{ estadoId: "Ciudad de México", texto: "CDMX y Área Metropolitana", cx: 610, cy: 470 }]
    }
};

const MapaMexico = () => {
    const [svgContent, setSvgContent] = useState<string>('');
    const [regionSeleccionada, setRegionSeleccionada] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        fetch('/mapa.svg')
            .then(res => res.text())
            .then(data => setSvgContent(data))
            .catch(err => console.error('Error cargando el mapa:', err));
    }, []);

    useEffect(() => {
        if (!svgContent || !containerRef.current) return;

        containerRef.current.innerHTML = svgContent;
        const svg = containerRef.current.querySelector('svg') as SVGSVGElement;
        if (!svg) return;
        svgRef.current = svg;

        // Configuración para que el mapa se vea grande y limpio
        svg.removeAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.display = 'block';

        const paths = Array.from(svg.querySelectorAll('#features path')) as SVGPathElement[];

        const limpiarResaltado = () => {
            paths.forEach(path => path.classList.remove('estado-resaltado'));
            const elementos = svg.querySelectorAll('.anim-line, .region-label');
            elementos.forEach(el => el.remove());
        };

        const resaltarRegion = (nombreRegion: string) => {
            limpiarResaltado();
            const region = regiones[nombreRegion];
            if (!region) return;

            region.estados.forEach(nombreEstado => {
                const pathEstado = paths.find(p => p.getAttribute('name') === nombreEstado);
                if (pathEstado) pathEstado.classList.add('estado-resaltado');
            });

            setRegionSeleccionada(nombreRegion);

            // Tus etiquetas y líneas (se mantienen)
            region.etiquetas.forEach(item => {
                const pathEstado = paths.find(p => p.getAttribute('name') === item.estadoId);
                if (!pathEstado) return;

                const bbox = pathEstado.getBBox();
                const centroX = bbox.x + bbox.width / 2;
                const centroY = bbox.y + bbox.height / 2;

                const grupo = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', centroX.toString());
                line.setAttribute('y1', centroY.toString());
                line.setAttribute('x2', centroX.toString());
                line.setAttribute('y2', centroY.toString());
                line.classList.add('anim-line');

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', item.cx.toString());
                text.setAttribute('y', item.cy.toString());
                text.textContent = item.texto;
                text.classList.add('region-label');

                grupo.appendChild(line);
                grupo.appendChild(text);
                svg.appendChild(grupo);

                setTimeout(() => {
                    line.setAttribute('x2', item.cx.toString());
                    line.setAttribute('y2', item.cy.toString());
                }, 50);
                setTimeout(() => {
                    text.style.opacity = '1';
                }, 300);
            });
        };

        const panel = document.getElementById('panelRegionesMapa');
        if (panel) {
            panel.innerHTML = '';
            Object.keys(regiones).forEach(nombreRegion => {
                const btn = document.createElement('button');
                btn.textContent = nombreRegion;
                btn.className = 'btn-region-mapa';
                btn.addEventListener('click', () => {
                    panel.querySelectorAll('.btn-region-mapa').forEach(b => b.classList.remove('activo'));
                    btn.classList.add('activo');
                    resaltarRegion(nombreRegion);
                });
                panel.appendChild(btn);
            });
        }

        return () => limpiarResaltado();
    }, [svgContent]);

    return (
        <div className="w-full mt-6 mb-2  flex flex-col items-center">
            {/* Título más arriba */}
            <div className="text-center -mt-2 mb-4 w-full">
                <p className="font-mono-custom text-xs text-[#00b4d8]/70 uppercase tracking-wider mb-1">
                    PRESENCIA NACIONAL
                </p>
                <h3 className="font-display text-2xl md:text-3xl text-white">
                    Cobertura en todo México
                </h3>
                <div className="w-20 h-px bg-[#00b4d8]/50 mx-auto mt-4" />
            </div>

            {/* Botones de regiones */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 px-2" id="panelRegionesMapa"></div>

            {/* Contenedor del mapa + Panel flotante */}
            <div className="relative w-full max-w-[1220px] mx-auto" style={{ height: '520px' }}>

                {/* Mapa sin cuadro de fondo */}
                <div
                    ref={containerRef}
                    className="w-full h-full bg-transparent"
                />

                {/* Cuadro flotante más a la derecha */}
                {regionSeleccionada && (
                    <div className="absolute top-6 right-[-80px] md:right-[-110px] lg:right-[-130px] 
                                  bg-[#0f253f]/95 backdrop-blur-xl border border-[#00b4d8]/30 
                                  rounded-2xl shadow-2xl w-72 z-30 p-6 text-white">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="font-bold text-[#00b4d8] text-lg">
                                {regionSeleccionada}
                            </h4>
                            <button
                                onClick={() => setRegionSeleccionada(null)}
                                className="text-white/70 hover:text-white text-2xl leading-none"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-sm text-white/70 mb-3">Entidades federativas:</p>

                        <ul className="space-y-2">
                            {regiones[regionSeleccionada].estados.map(estado => (
                                <li
                                    key={estado}
                                    className="bg-[#1a3557] px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                                >
                                    <span className="text-[#f97316]">•</span>
                                    {estado}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-5 pt-4 border-t border-white/10">
                            <p className="text-xs text-white/60 mb-2">Ciudades principales:</p>
                            {regiones[regionSeleccionada].etiquetas.map(item => (
                                <div key={item.estadoId} className="text-xs text-white/80 py-1">
                                    • {item.texto}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .btn-region-mapa {
                    background: #1e3a5f;
                    color: white;
                    border: none;
                    padding: 6px 14px;
                    border-radius: 30px;
                    font-weight: 500;
                    font-size: 11.5px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .btn-region-mapa:hover {
                    background: #00b4d8;
                    transform: scale(1.05);
                }
                .btn-region-mapa.activo {
                    background: #f97316;
                    box-shadow: 0 0 12px rgba(249,115,22,0.4);
                }

                #features path {
                    fill: #1e3a5f;
                    stroke: #ffffff;
                    stroke-width: 0.6;
                    transition: fill 0.3s ease;
                }
                #features path:hover {
                    fill: #2c5282;
                }
                #features path.estado-resaltado {
                    fill: #f97316 !important;
                    stroke: #ffffff;
                    stroke-width: 1.4;
                }

                .region-label {
                    font-size: 15.5px;
                    font-weight: 700;
                    fill: #ffffff;
                    stroke: #1e3a5f;
                    stroke-width: 0.6px;
                    paint-order: stroke;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }

                .anim-line {
                    stroke: #f97316;
                    stroke-width: 2.5;
                    stroke-dasharray: 6 3;
                    transition: all 0.7s ease;
                }
            `}</style>
        </div>
    );
};

export default MapaMexico;