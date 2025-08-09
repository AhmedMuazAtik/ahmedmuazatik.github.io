import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ResumeModel } from './ResumeModel'

export function Room({ setCameraTarget, isMobile, setPdfPath, ...props }) {
  const { scene, nodes } = useGLTF('/models/pillar.glb');
  const mixer = useRef(null);
  const actionsRef = useRef([]);
  const { gl } = useThree();
  const floatingBookRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 0.7;
    gl.outputEncoding = THREE.sRGBEncoding;
  }, [gl]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.envMapIntensity = 0.4;
        child.material.metalness = 0.1;
        child.material.roughness = 0.8;
        child.material.toneMapped = true;
      }
      if (child.isLight) {
        child.visible = false;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (floatingBookRef.current) {
      const targetY = isHovered ? 2.6 : 2.3;
      floatingBookRef.current.position.y += (targetY - floatingBookRef.current.position.y) * 0.1;

      if (isHovered) {
        setRotationAngle((prev) => prev + delta * 0.5);
        floatingBookRef.current.rotation.y = rotationAngle;
        floatingBookRef.current.rotation.x = Math.sin(rotationAngle * 0.5) * 0.1;
        floatingBookRef.current.rotation.z = Math.sin(rotationAngle * 0.3) * 0.1;
      } else {
        floatingBookRef.current.rotation.set(0, 0, 0);
      }
    }
  });

  const handleBookClick = (path) => {
    setPdfPath(path);       // PDF dosyasının yolu
    setShowPDF(true);       // modalı göstermek için
  };

  return (
    <>
      <group {...props} dispose={null}>

        <ResumeModel isMobile={isMobile} onBookClick={(path) => setPdfPath(path)} scale={[5, 5, 5]} />
      </group>
    </>
  );
}