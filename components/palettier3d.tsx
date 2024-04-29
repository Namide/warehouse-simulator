"use client";

import { createRoot } from "react-dom/client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { folder, useControls } from "leva";
import React, { useRef, useState } from "react";
import {
  BufferGeometry,
  Material,
  Mesh,
  NormalBufferAttributes,
  Object3DEventMap,
  Group,
  Vector3,
  TextureLoader,
  Color,
  Euler,
} from "three";
import { OrbitControls } from "@react-three/drei";

function Pallet(props: { position: Vector3; size: number[] }) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<any>();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

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
      -plankSize[2] / 2
    );

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => {
  //   if (meshRef.current) meshRef.current.rotation.x += delta;
  // });

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <group ref={meshRef} position={props.position}>
      {[-0.5, 0, 0.5].map((index) => (
        <mesh
          position={
            new Vector3(
              0,
              index * props.size[1] - (Math.sign(index) * cleatSize[1]) / 2,
              -(cleatSize[2] / 2 + plankSize[2])
            )
          }
          scale={active ? 1 : 1}
          // onClick={(event) => setActive(!active)}
          // onPointerOver={(event) => setHover(true)}
          // onPointerOut={(event) => setHover(false)}
          key={index}
        >
          <boxGeometry args={cleatSize} />
          <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
        </mesh>
      ))}
      {new Array(plankCount).fill(true).map((_, index) => (
        <mesh
          position={getPlankPos(index / (plankCount - 1))}
          scale={1}
          // onClick={(event) => setActive(!active)}
          // onPointerOver={(event) => setHover(true)}
          // onPointerOut={(event) => setHover(false)}
          key={"b" + index}
        >
          <boxGeometry args={plankSize} />
          <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
        </mesh>
      ))}
    </group>
  );
}

function Box(props: { position: Vector3; size: [number, number, number] }) {
  const [colorMap] = useLoader(TextureLoader, ["/assets/box-texture.jpg"]);
  const colorPower = Math.random() * 0.2
  return (
    <mesh
      position={props.position}
      scale={1}
      rotation={new Euler(Math.random() * 0.05, Math.random() * 0.05, Math.random() * 0.05, )}
    >
      <boxGeometry args={props.size} />
      <meshStandardMaterial
        map={colorMap}
        emissive={
          new Color(
            colorPower,
            colorPower,
            colorPower
          )
        }
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

  const boxes: ReturnType<typeof Box>[] = [];

  for (let i = 0; i < boxLengthCount; i++) {
    for (let j = 0; j < boxWidthCount; j++) {
      for (let k = 0; k < boxFloorsCount; k++) {
        boxes.push(
          Box({
            position: new Vector3(
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
              k * boxHeight + boxHeight / 2
            ),
            size: [boxLengthSize, boxWidthSize, boxHeight],
          })
        );
      }
    }
  }

  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [2000, 0, 1000], far: 4000, up: [0, 0, 1] }}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[3000, 3000, 3000]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Pallet position={new Vector3(0, 0, 0)} size={palletSize} />

        {boxes}

        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}
