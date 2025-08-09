import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { playSound } from "../../../playSound";

export function ResumeModel({ isMobile, ...props }) {
  const { nodes, materials } = useGLTF("/models/pillar.glb");

  const groupRef = useRef();
  const resumeRef = useRef();
  const ozgecmisRef = useRef();
  const topLightResume = useRef();
  const bottomLightResume = useRef();
  const topLightOzgecmis = useRef();
  const bottomLightOzgecmis = useRef();

  const [hoveredResume, setHoveredResume] = useState(false);
  const [hoveredOzgecmis, setHoveredOzgecmis] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const { mouse, scene } = useThree();

  // Scroll değerini state'e al
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || window.pageYOffset);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ortam aydınlatmasını biraz parlak yap
  useEffect(() => {
    scene.environmentIntensity = 1.5;
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      const targetRotY = mouse.x * 0.2;
      const targetRotZ = scrollY * 0.0005;

      groupRef.current.rotation.y +=
        (targetRotY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.z +=
        (targetRotZ - groupRef.current.rotation.z) * 0.05;
    }

    const resumeTargetY = hoveredResume ? 0.065 : 0;
    const ozgecmisTargetY = hoveredOzgecmis ? 0.082 : 0;

    if (resumeRef.current) {
      resumeRef.current.position.y +=
        (resumeTargetY - resumeRef.current.position.y) * 0.1;
    }
    if (ozgecmisRef.current) {
      ozgecmisRef.current.position.y +=
        (ozgecmisTargetY - ozgecmisRef.current.position.y) * 0.1;
    }

    if (topLightResume.current) {
      topLightResume.current.intensity +=
        ((hoveredResume ? 8 : 0) - topLightResume.current.intensity) * 0.2;
      bottomLightResume.current.intensity +=
        ((hoveredResume ? 5 : 0) - bottomLightResume.current.intensity) * 0.2;
    }
    if (topLightOzgecmis.current) {
      topLightOzgecmis.current.intensity +=
        ((hoveredOzgecmis ? 8 : 0) - topLightOzgecmis.current.intensity) * 0.2;
      bottomLightOzgecmis.current.intensity +=
        ((hoveredOzgecmis ? 5 : 0) - bottomLightOzgecmis.current.intensity) *
        0.2;
    }
  });

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* HDR ortam ışığı (cam efekti için gerekli) */}
      <Environment preset="city" />

      <group ref={groupRef} {...props} position={[0, -2.8, 0]}>
        <mesh geometry={nodes.statue.geometry}>
          <meshStandardMaterial
            color={"#fafafa"}
            roughness={1}
            metalness={0.35}
          />
        </mesh>

        {/* Resume kitabı */}
        <group
          ref={resumeRef}
          onPointerOver={() => {
            playSound("/images/sfx/hoverin.wav", 1);
            setHoveredResume(true);
            window.dispatchEvent(new Event("cursor-hover"));
          }}
          onPointerOut={() => {
            playSound("/images/sfx/hoverout.wav", 1);
            setHoveredResume(false);
            window.dispatchEvent(new Event("cursor-leave"));
          }}
        >
          <mesh
            geometry={nodes.resume.geometry}
            material={materials.resume}
            material-emissive={hoveredResume ? "#ff8844" : "#000000"}
            material-emissiveIntensity={hoveredResume ? 3 : 0}
            onPointerDown={(e) => {
              if (!isMobile) {
                openInNewTab("/pdfs/resume.pdf");
                e.stopPropagation();
                playSound("/images/sfx/clickin.wav", 1);
              }
            }}
            onClick={(e) => {
              if (isMobile) {
                e.stopPropagation();
                playSound("/images/sfx/clickin.wav", 1);
                openInNewTab("/pdfs/resume.pdf");
              }
            }}
          />

          <mesh
            geometry={nodes.resumetext.geometry}
            material={materials.resumetext}
          />
          <spotLight
            ref={topLightResume}
            position={[0, 0.5, 0]}
            angle={0.6}
            penumbra={0.5}
            intensity={0}
            distance={3}
            color={"#ffd700"}
          />
          <spotLight
            ref={bottomLightResume}
            position={[0, -0.4, 0]}
            angle={0.8}
            penumbra={0.4}
            intensity={0}
            distance={3}
            color={"#ffd700"}
          />
        </group>

        {/* Özgeçmiş kitabı */}
        <group
          ref={ozgecmisRef}
          onPointerOver={() => {
            playSound("/images/sfx/hoverin.wav", 1);
            setHoveredOzgecmis(true);
            window.dispatchEvent(new Event("cursor-hover"));
          }}
          onPointerOut={() => {
            playSound("/images/sfx/hoverout.wav", 1);
            setHoveredOzgecmis(false);
            window.dispatchEvent(new Event("cursor-leave"));
          }}
        >
          <mesh
            geometry={nodes.ozgecmis.geometry}
            material={materials.ozgecmis}
            material-emissive={hoveredOzgecmis ? "#ff8844" : "#000000"}
            material-emissiveIntensity={hoveredOzgecmis ? 3 : 0}
            onPointerDown={(e) => {
              if (!isMobile) {
                e.stopPropagation();
                openInNewTab("/pdfs/ozgecmis.pdf");
                playSound("/images/sfx/clickin.wav", 1);
              }
            }}
            onClick={(e) => {
              if (isMobile) {
                e.stopPropagation();
                playSound("/images/sfx/clickin.wav", 1);
                openInNewTab("/pdfs/ozgecmis.pdf");
              }
            }}
          />

          <mesh
            geometry={nodes.ozgecmistext.geometry}
            material={materials.ozgecmistext}
          />
          <spotLight
            ref={topLightOzgecmis}
            position={[0, 0.5, 0]}
            angle={0.6}
            penumbra={0.5}
            intensity={0}
            distance={3}
            color={"#ffd700"}
          />
          <spotLight
            ref={bottomLightOzgecmis}
            position={[0, -0.4, 0]}
            angle={0.8}
            penumbra={0.4}
            intensity={0}
            distance={3}
            color={"#ffd700"}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/models/pillar.glb");
