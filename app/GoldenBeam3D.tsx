"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function GoldenBeam() {
  return (
    <mesh>
      <torusGeometry args={[1, 0.08, 32, 128]} />
      <meshStandardMaterial
        color={"#FFD700"}
        emissive={"#FFD700"}
        emissiveIntensity={1.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function GoldenBeam3D() {
  return (
    <div style={{ width: "100%", height: 120, position: "absolute", top: -20, left: 0, pointerEvents: "none", zIndex: 2 }}>
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <GoldenBeam />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
} 