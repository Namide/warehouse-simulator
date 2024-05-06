"use client";

const SCALE = 1000;

import { Vector3, Euler, MultiplyBlending, Object3D } from "three";
import React, { useEffect, useRef } from "react";
import {
  Bloom,
  EffectComposer,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { createRng } from "@/helpers/rng";
import { BlendFunction } from "postprocessing";
import getPath from "@/helpers/path";
import Pallet from "./pallet";
import Box from "./box";
import PalletRack from "./palletRack";
import PalletBoxes from "./palletBoxes";
import Cell from "./cell";

export type Options = {
  palletLength: number;
  palletWidth: number;
  palletHeight: number;
  boxLengthCount: number;
  boxLengthSize: number;
  boxWidthCount: number;
  boxWidthSize: number;
  boxHeight: number;
  boxFloorsCount: number;
  palletRackBeamLength: number;
  palletRackBeamHeight: number;
  palletRackBeamWidth: number;
  palletRackByCell: number;
  palletRackRotate: "longitudinale" | "transversale";
  groundCellHeight: number;
  floorCellHeight: number;
  floorCount: number;
  palletRackLadderLength: number;
  palletRackLadderHeight: number;
  palletRackLadderWidth: number;
  palletRackLadderCount: number;
  palletRackLadderExtLength: number;
  hq: boolean;
};

// https://docs.pmnd.rs/react-three-fiber/advanced/scaling-performance#instancing
function Instances({
  count = 100000,
  temp = new Object3D(),
  children,
}: {
  count: number;
  temp: Object3D;
  children: React.ReactNode;
}) {
  const instancedMeshRef = useRef<any>();
  useEffect(() => {
    // Set positions
    for (let i = 0; i < count; i++) {
      temp.position.set(Math.random(), Math.random(), Math.random());
      temp.updateMatrix();
      instancedMeshRef.current.setMatrixAt(i, temp.matrix);
    }
    // Update the instance
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, count]}>
      {children}
    </instancedMesh>
  );
}

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
            position={[-1, 5, -3]}
            shadow-bias={-0.0001}
          />
          {/* <ambientLight intensity={0.2} /> */}
          <mesh receiveShadow rotation-x={-Math.PI / 2}>
            <circleGeometry args={[4]} />
            <meshStandardMaterial
              envMapIntensity={0}
              blending={MultiplyBlending}
              color={"#C5C5C5"}
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
  const CAM_MIN_DISTANCE =
    Math.max(options.palletLength, options.palletWidth) / SCALE;

  return (
    <div className="w-screen h-screen">
      <Render3D
        hq={options.hq}
        camera={{
          position: [CAM_MIN_DISTANCE * 2, CAM_MIN_DISTANCE, CAM_MIN_DISTANCE],
          far: 30,
          near: 0.1,
        }}
      >
        {/* https://github.com/pmndrs/drei?tab=readme-ov-file#environment */}
        <Environment
          files={getPath("/assets/warehouse.hdr")}
          environmentIntensity={options.hq ? 0.4 : 0.8}
          backgroundIntensity={options.hq ? 1 : 0.8}
          ground={{ radius: 10, height: 3, scale: 8 }}
        ></Environment>
        {/* <spotLight
          position={[3000, 3000, 3000]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        /> */}
        {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}

        <group rotation={new Euler(-Math.PI / 2, 0, 0)} scale={1 / SCALE}>
          <PalletRack options={options} />
          <Cell options={options} position={[0, 0, 0]} />
        </group>

        <OrbitControls
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={CAM_MIN_DISTANCE}
          maxDistance={8}
          enablePan={false}
        />
      </Render3D>
    </div>
  );
}
