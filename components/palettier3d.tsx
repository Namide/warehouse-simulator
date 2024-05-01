"use client";

const SCALE = 1000;

import { Vector3, TextureLoader, Color, Euler } from "three";
import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { createRng } from "@/helpers/rng";

function Pallet(props: { position: Vector3; size: number[] }) {
  const [plankMap] = useLoader(TextureLoader, [
    (process.env.PATH || '') + "/assets/plank-texture.jpg",
  ]);

  const cleatSize: [number, number, number] = [
    props.size[0],
    (props.size[2] * 2) / 3,
    props.size[2] - 15,
  ];

  const plankSize: [number, number, number] = [
    100, // 10cm
    props.size[1],
    15, // 1.5cm
  ];

  const plankCount = Math.round(props.size[0] / 150);

  const getPlankPos = (x: number): Vector3 =>
    new Vector3(
      x <= 0
        ? plankSize[0] / 2 - props.size[0] / 2
        : x >= 1
        ? props.size[0] / 2 - plankSize[0] / 2
        : (getPlankPos(1).x - getPlankPos(0).x) * x + getPlankPos(0).x,
      0,
      props.size[2] - plankSize[2] / 2
    );

  return (
    <group position={props.position}>
      {[-0.5, 0, 0.5].map((index) => (
        <mesh
          position={
            new Vector3(
              0,
              index * props.size[1] - (Math.sign(index) * cleatSize[1]) / 2,
              props.size[2] - (cleatSize[2] / 2 + plankSize[2])
            )
          }
          scale={1}
          key={index}
        >
          <boxGeometry args={cleatSize} />
          <meshStandardMaterial
            map={plankMap}
            color="blanchedalmond"
            wireframe={false}
          />
        </mesh>
      ))}
      {new Array(plankCount).fill(true).map((_, index) => (
        <mesh
          position={getPlankPos(index / (plankCount - 1))}
          scale={1}
          key={"b" + index}
        >
          <boxGeometry args={plankSize} />
          <meshStandardMaterial
            map={plankMap}
            color="blanchedalmond"
            wireframe={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Box(props: { position: Vector3; size: [number, number, number], seeds: [number, number, number, number] }) {

  const [colorMap] = useLoader(TextureLoader, [
    (process.env.PATH || '') + "/assets/box-texture.jpg",
  ]);
  const colorPower = props.seeds[3] * 0.2 + 0.5;

  return (
    <mesh
      position={props.position}
      scale={1}
      rotation={
        new Euler(
          props.seeds[0] * 0.05,
          props.seeds[1] * 0.05,
          props.seeds[2] * 0.05
        )
      }
    >
      <boxGeometry args={props.size} />
      <meshStandardMaterial
        map={colorMap}
        color={new Color(colorPower, colorPower, colorPower)}
        wireframe={false}
      />
    </mesh>
  );
}

export default function Palettier3D({
  palletLength,
  palletWidth,
  palletHeight,
  boxLengthSize,
  boxLengthCount,
  boxWidthSize,
  boxWidthCount,
  boxHeight,
  boxFloorsCount,
}: {
  palletLength: number;
  palletWidth: number;
  palletHeight: number;
  boxLengthSize: number;
  boxLengthCount: number;
  boxWidthCount: number;
  boxWidthSize: number;
  boxHeight: number;
  boxFloorsCount: number;
}) {
  const palletSize = [palletLength, palletWidth, palletHeight];

  const rng = createRng(7)
  const boxes: [number, number, number, [number, number, number, number]][] = [];
  for (let i = 0; i < boxLengthCount; i++) {
    for (let j = 0; j < boxWidthCount; j++) {
      for (let k = 0; k < boxFloorsCount; k++) {
        boxes.push([i, j, k, [rng(), rng(), rng(), rng()]]);
      }
    }
  }

  const CAM_MIN_DISTANCE = Math.max(palletLength, palletWidth) / SCALE

  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [CAM_MIN_DISTANCE * 2, CAM_MIN_DISTANCE, CAM_MIN_DISTANCE], far: 30, near: 0.1 }}>

        {/* https://github.com/pmndrs/drei?tab=readme-ov-file#environment */}
        <Environment
          files={`${process.env.PATH || ''}/assets/warehouse.hdr`}
          environmentIntensity={1}
          backgroundIntensity={1}
          ground={{ radius: 10, height: 3, scale: 8 }}
        ></Environment>
        {/* <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[3000, 3000, 3000]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        /> */}
        {/* <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> */}

        <group rotation={new Euler(-Math.PI / 2, 0, 0)} scale={1 / SCALE}>
          <Pallet position={new Vector3(0, 0, 0)} size={palletSize} />

          {boxes.map(([i, j, k, seeds]) => (
            <Box
              position={
                new Vector3(
                  palletLength / 2 +
                    i * boxLengthSize -
                    palletLength / 2 +
                    boxLengthSize / 2 -
                    (boxLengthSize * boxLengthCount) / 2,
                  palletWidth / 2 +
                    j * boxWidthSize -
                    palletWidth / 2 +
                    boxWidthSize / 2 -
                    (boxWidthSize * boxWidthCount) / 2,
                  k * boxHeight + boxHeight / 2 + palletHeight
                )
              }
              seeds={seeds}
              size={[boxLengthSize, boxWidthSize, boxHeight]}
              key={`${i}-${j}-${k}`}
            />
          ))}
        </group>

        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} minDistance={CAM_MIN_DISTANCE} maxDistance={8} enablePan={false} />
      </Canvas>
    </div>
  );
}
