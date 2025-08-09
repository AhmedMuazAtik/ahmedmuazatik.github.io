import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Room } from "./Room";
import Particles from "./Particles";
import { Suspense, useRef } from "react";

function CinematicLights() {
  const movingLightRef = useRef();
  const rimLightRef = useRef();
  const fillLightRef = useRef();
  const flickerLightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Ana hareketli ışık (senin AnimatedLight mantığı)
    if (movingLightRef.current) {
      movingLightRef.current.position.y = 7 + Math.sin(t * 1.1) * 0.5;
    }

    // Rim Light hareketi
    if (rimLightRef.current) {
      rimLightRef.current.position.x = -5 + Math.sin(t * 0.5) * 0.3;
    }

    // Flicker
    if (flickerLightRef.current) {
      flickerLightRef.current.intensity =
        0.4 + Math.sin(t * 7) * 0.05 + Math.sin(t * 13) * 0.03;
    }
  });

  return (
    <group>
      {/* Ana hareketli ışık */}
      <spotLight
        ref={movingLightRef}
        position={[6, 8, 0]}
        angle={0.5}
        penumbra={0.6}
        intensity={80}
        distance={8}
        color="#ff8844"
      />

      {/* Rim Light - Arkadan mavi */}
      <spotLight
        ref={rimLightRef}
        position={[1, 8, 0]}
        angle={0.7}
        penumbra={0.5}
        intensity={200}
        distance={15}
        color="#ff8844"
      />

      {/* Fill Light - Ön beyaz */}
      <spotLight
        ref={fillLightRef}
        position={[1, 8, 0]}
        angle={0.8}
        penumbra={2}
        intensity={5}
        distance={12}
        color="#ffffff"
      />

      {/* Flicker Light - Turuncu */}
      <pointLight
        ref={flickerLightRef}
        position={[1, 4, 2]}
        intensity={2}
        distance={5}
        color="#ff8844"
      />
    </group>
  );
}

// Ayrı component: Canvas context içinde çalışır
function AnimatedLight() {
  const movingLightRef = useRef();
  const fillLightRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (movingLightRef.current) {
      movingLightRef.current.position.x = Math.sin(t * 1.1) * 1.5;
      movingLightRef.current.position.z = Math.cos(t * 1.5) * 1.5;
    }
    if (fillLightRef.current) {
      fillLightRef.current.intensity = 1.5 + Math.sin(t * 2) * 0.5;
    }
  });

  return (
    <spotLight
      ref={movingLightRef}
      position={[25, 7, 2]}
      angle={0.7}
      penumbra={0.6}
      intensity={15}
      distance={10}
      color="#ff8844"
    />
  );
}

export default function HeroExperience({ setPdfPath }) {
  const isMobile = useMediaQuery({ query: "(max-width: 1600px)" });

  const scale = isMobile ? 1.2 : 0.9;
  const position = isMobile ? [0, -5, 0] : [0, -2, 0];
  const rotation = [0.1, -1.55, -0.9];

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 15], fov: 45 }}
      gl={{ antialias: false }}
      style={{ touchAction: isMobile ? "pan-y" : "none" }} // ✅ mobilde scroll serbest
    >
      <ambientLight intensity={0.2} color="#1a1a40" />

      <Suspense fallback={null}>
        <Particles count={100} />

        {/* Model grubu */}
        <group scale={scale} position={position} rotation={rotation}>
          <Room setPdfPath={setPdfPath} isMobile={isMobile} />
          <AnimatedLight /> {/* Işık artık Canvas context içinde */}
          <CinematicLights />
        </group>
      </Suspense>
    </Canvas>
  );
}
