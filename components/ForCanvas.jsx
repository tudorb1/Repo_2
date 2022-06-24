import {
  Lightformer,
  PerspectiveCamera,
  Preload,
  Scroll,
  ScrollControls,
  SpotLight,
  useDepthBuffer,
  useScroll,
} from "@react-three/drei";
import { Canvas, Camera, useFrame, extend, useThree } from "@react-three/fiber";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { GodRays } from "@react-three/postprocessing";
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { Suspense, useEffect, useRef, useMemo, useState } from "react";
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { FogExp2, Vector2 } from "three";
import * as React from 'react';
import styles from "../styles/Component.module.scss";
import Model from "./ModelLoad";


extend({ EffectComposer, RenderPass, FilmPass, UnrealBloomPass });

const Effect = () => {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  useEffect(() => void composer.current.setSize(size.width, size.height), [size]);
  const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
  useFrame(() => composer.current.render(), 1);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass attachArray="passes" args={[aspect, 1.6, 1.3, 0.02]} />
      <filmPass attachArray="passes" args={[0.2, 0.8, 1500, false]} />
    </effectComposer>
  )
};

export default function ForCanvas() {

  return (
    <>
      <div className={styles.scene} id="div1">
        <Canvas
          shadows
        >
          <PerspectiveCamera />
          <fog attach="fog" args={["#050505", 40, 60]} />
          {/* <directionalLight position={[20, 100, 0]} /> */}
          {/* <ambientLight position={[115.634 ,-0.199677, 151.107 ]} scale={1} /> */}
          <ambientLight position={[-38.1183, -269.879, 175.15]} scale={1} />
          <Suspense fallback={null}>
            <ScrollControls pages={15} distance={3}>
              <Scroll>
                <Model scale={1} />
              </Scroll>
            </ScrollControls>
            <Preload all />
            <Effect />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
