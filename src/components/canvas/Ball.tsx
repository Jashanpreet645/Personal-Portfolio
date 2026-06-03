import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Decal,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

type BallProps = {
  imgUrl: string;
};

const Ball: React.FC<BallProps> = ({ imgUrl }) => {
  const [decal] = useTexture([imgUrl]);

  if (decal) {
    decal.wrapS = THREE.ClampToEdgeWrapping;
    decal.wrapT = THREE.ClampToEdgeWrapping;
    decal.anisotropy = 16;
    decal.needsUpdate = true;
  }

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.28]}
          scale={1}
          map={decal}
          // @ts-ignore
          flatShading
        />
      </mesh>
    </>
  );
};

type BallCanvasProps = {
  icon: string;
};

const CustomControls: React.FC = () => {
  const { camera, invalidate } = useThree();
  const controlsRef = useRef<any>(null);
  const isInteracting = useRef(false);
  const lastInteractionTime = useRef(0);

  useFrame((state, delta) => {
    const d = Math.min(0.1, delta);

    if (!isInteracting.current && Date.now() - lastInteractionTime.current > 1500) {
      const targetPos = new THREE.Vector3(0, 0, 8);
      const targetLook = new THREE.Vector3(0, 0, 0);

      const distPos = camera.position.distanceTo(targetPos);
      let distLook = 0;
      if (controlsRef.current) {
        distLook = controlsRef.current.target.distanceTo(targetLook);
      }

      // If we are not yet back to default position, interpolate and request another frame
      if (distPos > 0.005 || distLook > 0.005) {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 4 * d);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0, 4 * d);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 8, 4 * d);

        // Normalize and scale to keep camera distance at exactly 8 to prevent zoom in/out effect during lerp
        camera.position.normalize().multiplyScalar(8);

        if (controlsRef.current) {
          controlsRef.current.target.x = THREE.MathUtils.lerp(controlsRef.current.target.x, 0, 4 * d);
          controlsRef.current.target.y = THREE.MathUtils.lerp(controlsRef.current.target.y, 0, 4 * d);
          controlsRef.current.target.z = THREE.MathUtils.lerp(controlsRef.current.target.z, 0, 4 * d);
          controlsRef.current.update();
        }
        state.invalidate();
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      onStart={() => {
        isInteracting.current = true;
      }}
      onEnd={() => {
        isInteracting.current = false;
        lastInteractionTime.current = Date.now();
        // Request a render in 1.5s to start the return animation
        setTimeout(() => {
          invalidate();
        }, 1500);
      }}
    />
  );
};

export const BallCanvas: React.FC<BallCanvasProps> = ({ icon }) => {
  return (
    <Canvas
      frameloop="demand"
      dpr={1}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ 
        preserveDrawingBuffer: false, 
        antialias: false, 
        powerPreference: "high-performance" 
      }}
    >
      <Suspense fallback={null}>
        <CustomControls />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};
