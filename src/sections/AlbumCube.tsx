import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { albumCubeConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

// Textos que cambian según la cara del cubo
const cubeTexts = [
  {
    title: "EMPRESA LÍDER",
    subtitle: "CON MÁS DE 26 AÑOS DE EXPERIENCIA",
    description: "Somos una empresa 100% mexicana con más de 26 años de trayectoria en el sector de telecomunicaciones. Nos especializamos en el diseño, despliegue y mantenimiento de infraestructura crítica, ofreciendo soluciones integrales que garantizan la excelencia técnica en cada proyecto."
  },
  {
    title: "POLÍTICA DE CALIDAD",
    subtitle: "COMPROMISO CON LA EXCELENCIA",
    description: "SSITEL es una empresa comprometida en la innovación de soluciones en ingeniería y construcción en telecomunicaciones incluyendo altos estándares de calidad, enfocada a identificar y solucionar las necesidades de nuestros clientes. Contamos con un grupo multidisciplinario especializado consciente en contribuir al cumplimiento de los requisitos legales, gubernamentales y normativos aplicables a la organización, con la finalidad de promover la mejora continua y mantener una cultura socialmente responsable."
  },
  {
    title: "EXPERTOS EN FIBRA ÓPTICA",
    subtitle: "PLANTA INTERNA Y EXTERNA",
    description: "En SSITEL somos especialistas en fibra óptica, ofreciendo soluciones integrales que abarcan desde el diseño e ingeniería hasta la instalación, puesta en marcha y mantenimiento de redes. Contamos con amplia experiencia en el tendido, canalización e instalación de fibra óptica en planta interna y externa, así como mantenimiento preventivo y correctivo. Trabajamos bajo un esquema llave en mano, alineándonos a la normatividad y estándares de nuestros clientes, garantizando proyectos de alta calidad, confiabilidad y cumplimiento."
  },
  {
    title: "COMUNICACIÓN 360°",
    subtitle: "TRABAJO EN EQUIPO",
    description: "Nuestro ÉXITO se basa en TRABAJAR EN CONJUNTO CON NUESTROS CLIENTES Y COLABORADORES, para establecer sólidas líneas de comunicación y esto nos permita diseñar soluciones de vanguardia que le representen una ventaja competitiva. Nuestra PROPUESTA DE VALOR se entrega a través de nuestro recurso humano, tecnología, metodología, servicios, soluciones y alianzas."
  }
];

interface CubeProps {
  rotationProgress: number;
}

const Cube = ({ rotationProgress }: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const textures = useTexture(albumCubeConfig.cubeTextures);

  // Responsive cube size
  const cubeSize = Math.min(viewport.width * 0.4, 3);

  useFrame(() => {
    if (meshRef.current) {
      // Map rotation progress (0-1) to rotation angles
      const targetRotationY = rotationProgress * Math.PI * 2;
      const targetRotationX = Math.sin(rotationProgress * Math.PI) * 0.3;

      // Smooth interpolation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          map={texture}
          roughness={0.2}
          metalness={0.1}
        />
      ))}
    </mesh>
  );
};

const AlbumCube = () => {
  // Null check: if config is empty, do not render
  if (albumCubeConfig.albums.length === 0 || albumCubeConfig.cubeTextures.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=300%',
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress;
        setRotationProgress(progress);

        // Calculate current album index
        const albumIndex = Math.min(
          Math.floor(progress * 4),
          albumCubeConfig.albums.length - 1
        );
        setCurrentAlbumIndex(albumIndex);

        // Velocity-based blur effect
        const velocity = Math.abs(self.getVelocity());
        const targetBlur = Math.min(velocity / 500, 8);
        const targetSpacing = Math.min(velocity / 100, 30);

        setBlurAmount(prev => prev + (targetBlur - prev) * 0.2);
        setLetterSpacing(prev => prev + (targetSpacing - prev) * 0.2);
      },
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
    };
  }, []);

  const currentAlbum = albumCubeConfig.albums[currentAlbumIndex];
  const currentText = cubeTexts[currentAlbumIndex];

  return (
    <section
      id="albums"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #152a45 0%, #1e3a5f 50%, #0f1f35 100%)' }}
    >
      {/* Background title with blur effect */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{
          filter: `blur(${blurAmount}px)`,
          letterSpacing: `${letterSpacing}px`,
        }}
      >
        <h2 className="font-display text-[20vw] text-white/5 uppercase whitespace-nowrap select-none">
          {currentAlbum.subtitle}
        </h2>
      </div>

      {/* TEXTO ENCUADRO TRANSPARENTE - ENCIMA DEL CUBO */}
      <div
        ref={textOverlayRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[90%] max-w-4xl"
      >
        <div
          className="text-center px-8 py-6 rounded-2xl transition-all duration-500"
          style={{
            background: 'rgba(30, 58, 95, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 180, 216, 0.1)'
          }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {currentText.title}
          </h2>
          <p className="font-mono-custom text-sm md:text-base text-[#00b4d8] uppercase tracking-wider mb-2">
            {currentText.subtitle}
          </p>
          <p className="font-mono-custom text-xs md:text-sm text-white/60">
            {currentText.description}
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pt-20">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <spotLight
              position={[-10, -10, -10]}
              angle={0.15}
              penumbra={1}
              intensity={0.5}
              color="#00b4d8"
            />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#00b4d8" />
            <Cube rotationProgress={rotationProgress} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>

      {/* Album info overlay */}
      <div className="absolute bottom-12 left-12 z-20">
        <p className="font-mono-custom text-xs text-[#00b4d8]/60 uppercase tracking-wider mb-2">
          {String(currentAlbum.id).padStart(2, '0')} / {String(albumCubeConfig.albums.length).padStart(2, '0')}
        </p>
        <h3 className="font-display text-4xl md:text-5xl text-white mb-2 transition-all duration-300">
          {currentAlbum.title}
        </h3>
        <p className="font-mono-custom text-sm text-white/50">
          {currentAlbum.subtitle}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col gap-3">
          {albumCubeConfig.albums.map((album, index) => (
            <div
              key={album.id}
              className={`w-2 rounded-full transition-all duration-300 ${index === currentAlbumIndex
                ? 'bg-[#00b4d8] h-8 shadow-[0_0_10px_rgba(0,180,216,0.5)]'
                : 'bg-white/20 h-2'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 right-12 z-20">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">
          {albumCubeConfig.scrollHint}
        </p>
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-12 left-12 w-20 h-px bg-gradient-to-r from-[#00b4d8]/50 to-transparent" />
      <div className="absolute top-12 left-12 w-px h-20 bg-gradient-to-b from-[#00b4d8]/50 to-transparent" />
      <div className="absolute bottom-12 right-12 w-20 h-px bg-gradient-to-l from-[#00b4d8]/50 to-transparent" />
      <div className="absolute bottom-12 right-12 w-px h-20 bg-gradient-to-t from-[#00b4d8]/50 to-transparent" />
    </section>
  );
};

export default AlbumCube;
