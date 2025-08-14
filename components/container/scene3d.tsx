"use client";

const SCALE = 1500;
export const PALLET_STORAGE_DIRECTION = "Rotation";

export const eventDispatcher = new EventTarget();

import { Euler, MultiplyBlending } from "three";
import React, { useEffect, useRef, useState } from "react";
import {
  Bloom,
  EffectComposer,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, BakeShadows } from "@react-three/drei";
import { BlendFunction } from "postprocessing";
import getPath from "@/helpers/path";
import Boxes from "./boxes";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Gltf } from "@react-three/drei";
import ContainerModel from "./container";

export type Options = {
  containerLength: number;
  containerWidth: number;
  containerHeight: number;
  boxLengthCount: number;
  boxLengthSize: number;
  boxWidthCount: number;
  boxWidthSize: number;
  boxHeight: number;
  boxFloorsCount: number;
  hq: boolean;
};

function Render3D({
  children,
  hq,
  camera,
}: {
  children: React.ReactNode;
  hq: boolean;
  camera: {
    position: [number, number, number];
    far: number;
    near: number;
  };
}) {
  return (
    <Canvas camera={camera} shadows={hq && "soft"}>
      {children}

      {hq && (
        <>
          <directionalLight
            intensity={5}
            castShadow
            position={[1, 5, 1]}
            shadow-bias={-0.0001}
            shadow-mapSize-x={2048}
            shadow-mapSize-y={2048}
          />
          {/* <ambientLight intensity={0.2} /> */}
          <mesh receiveShadow rotation-x={-Math.PI / 2}>
            <circleGeometry args={[4]} />
            <meshStandardMaterial
              envMapIntensity={0}
              blending={MultiplyBlending}
              color={"#BCBCBC"}
            />
          </mesh>
        </>
      )}

      <EffectComposer enabled={hq}>
        {/* <DepthOfField
            focusDistance={CAM_MIN_DISTANCE}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          /> */}
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
          intensity={0.1}
        />
        {/*opacity={0.02} /> */}
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
        <ToneMapping
          blendFunction={BlendFunction.NORMAL} // blend mode
          adaptive={true} // toggle adaptive luminance map usage
          resolution={256} // texture resolution of the luminance map
          middleGrey={6} // middle grey factor
          maxLuminance={32.0} // maximum luminance
          averageLuminance={5.0} // average luminance
          adaptationRate={1.0} // luminance adaptation rate
        />
      </EffectComposer>
    </Canvas>
  );
}

export default function Scene3D({ options }: { options: Options }) {
  const MAX_DISTANCE = 8;
  const CAM_MIN_DISTANCE =
    Math.max(options.containerLength, options.containerWidth) / SCALE;
  const key = Math.random();

  const [target, setTarget] = useState([0, 0, 0]);
  const [position, setPosition] = useState([
    MAX_DISTANCE * 2,
    MAX_DISTANCE,
    MAX_DISTANCE,
  ]);

  useEffect(() => {
    function onCenter() {
      setTarget([
        Math.random() * 0.001,
        Math.random() * 0.001,
        Math.random() * 0.001,
      ]);
      setPosition([
        CAM_MIN_DISTANCE * 2 + Math.random() * 0.001,
        CAM_MIN_DISTANCE + Math.random() * 0.001,
        CAM_MIN_DISTANCE + Math.random() * 0.001,
      ]);
    }

    eventDispatcher.addEventListener("center", onCenter);

    return () => {
      eventDispatcher.removeEventListener("center", onCenter);
    };
  }, [CAM_MIN_DISTANCE]);

  const gltf = useLoader(GLTFLoader, "/assets/container.glb");

  return (
    <div className="w-screen h-screen">
      <Render3D
        hq={options.hq}
        camera={{
          position: [CAM_MIN_DISTANCE * 2, CAM_MIN_DISTANCE, CAM_MIN_DISTANCE],
          far: 100,
          near: 0.1,
        }}
      >
        <BakeShadows key={key} />
        {/* https://github.com/pmndrs/drei?tab=readme-ov-file#environment */}
        <Environment
          files={getPath("/assets/farm.hdr")}
          environmentIntensity={options.hq ? 0.4 : 0.8}
          backgroundIntensity={options.hq ? 1 : 0.8}
          ground={{ radius: 100, height: 10, scale: MAX_DISTANCE * 1.25 }}
        ></Environment>
        {/* <spotLight
          position={[3000, 3000, 3000]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        /> */}
        {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}

        <group
          rotation={new Euler(-Math.PI / 2, 0, -Math.PI / 2)}
          scale={1 / SCALE}
          position={[-options.containerLength / (2 * SCALE), 0.065 * options.containerHeight / 1000, 0]}
        >
          <Boxes options={options} position={[0, 0, 0]} />
        </group>

        {/* <Gltf src="/assets/container.glb" /> */}
        <ContainerModel
          position={[
            -options.containerLength / (2 * SCALE),
            0.065 * options.containerHeight / SCALE,
            0,
          ]}
          scale={[
            options.containerLength / SCALE,
            options.containerHeight / SCALE,
            options.containerWidth / SCALE,
          ]}
        />

        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={CAM_MIN_DISTANCE}
          maxDistance={MAX_DISTANCE}
          enablePan={true}
          // position={camPos}
          target-x={target[0]}
          target-y={target[1]}
          target-z={target[2]}
          object-position-x={position[0]}
          object-position-y={position[1]}
          object-position-z={position[2]}
        />
      </Render3D>
    </div>
  );
}
