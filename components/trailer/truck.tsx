"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import getPath from "@/helpers/path";

export default function TruckModel(props: {
  position?: [number, number, number];
  scale: [number, number, number];
  transparent: boolean;
}) {
  // const groupRef = useRef();
  const { nodes, materials } = useGLTF(getPath("/assets/truck.glb"));

  // materials.bodycolour.wireframe = true
  materials.bodycolour.transparent = props.transparent;
  materials.bodycolour.opacity = props.transparent ? 0.5 : 1;

  const globalReductor = 1.5;

  const newScale: [number, number, number] = [
    (props.scale[0] * globalReductor) / (1000 * 3.53395), // largeur
    (props.scale[1] * globalReductor) / (1000 * 3.79822), // hauteur
    (props.scale[2] * globalReductor) / (1000 * 15.8563), // longueur
  ];

  const wheelScales: [number, number, number] = [
    2.256,
    (2.256 * ((1000 * 15.8563) / props.scale[2])) / globalReductor,
    (2.256 * ((1000 * 3.79822) / props.scale[1])) / globalReductor,
  ];

  const wheelZ = ( (props.scale[1] - 2400) / (2700 - 2400)) / 7 - 0.14;

  // Generated with https://gltf.pmnd.rs/
  return (
    <group
      position={props.position}
      dispose={null}
      scale={[1 / globalReductor, 1 / globalReductor, 1 / globalReductor]}
    >
      <group scale={newScale}>
        <group rotation={[Math.PI / 2, 0, Math.PI]} scale={2.256}>
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Truck_body_Truck_bodyL as THREE.Mesh).geometry}
            material={materials.bodycolour}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Truck_body_Truck_bodyL_1 as THREE.Mesh).geometry}
            material={materials.diffuse_black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Truck_body_Truck_bodyL_2 as THREE.Mesh).geometry}
            material={materials.door_knob}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Truck_body_Truck_bodyL_3 as THREE.Mesh).geometry}
            material={materials.flat_black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Truck_body_Truck_bodyL_4 as THREE.Mesh).geometry}
            material={materials["signal_light.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Truck_body_Truck_bodyL_5 as THREE.Mesh).geometry}
            material={materials.full_glossy}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Truck_body_Truck_bodyL_6 as THREE.Mesh).geometry}
            material={materials.gloss_black}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Truck_body_Truck_bodyL_7 as THREE.Mesh).geometry}
            material={materials.tyres}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.Truck_body_Truck_bodyL_8 as THREE.Mesh).geometry}
            material={materials.deep_black}
          />
        </group>
        <group
          position={[1.664, -1.069 + wheelZ, 1.382]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={wheelScales}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle029 as THREE.Mesh).geometry}
            material={materials["tyres.011"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle029_1 as THREE.Mesh).geometry}
            material={materials["wheels.009"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle029_2 as THREE.Mesh).geometry}
            material={materials["tyres.009"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle029_3 as THREE.Mesh).geometry}
            material={materials["wheels.011"]}
          />
        </group>
        <group
          position={[1.664, -1.069 + wheelZ, 8.976]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={wheelScales}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle003 as THREE.Mesh).geometry}
            material={materials["tyres.011"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle003_1 as THREE.Mesh).geometry}
            material={materials["wheels.009"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle003_2 as THREE.Mesh).geometry}
            material={materials["tyres.009"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle003_3 as THREE.Mesh).geometry}
            material={materials["wheels.011"]}
          />
        </group>
        <group
          position={[1.664, -1.069 + wheelZ, 10.976]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={wheelScales}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle004 as THREE.Mesh).geometry}
            material={materials["tyres.011"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle004_1 as THREE.Mesh).geometry}
            material={materials["wheels.009"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle004_2 as THREE.Mesh).geometry}
            material={materials["tyres.009"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={(nodes.wheels_Circle004_3 as THREE.Mesh).geometry}
            material={materials["wheels.011"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes["truck-inside"] as THREE.Mesh).geometry}
          material={materials.bodycolour}
          // material={(nodes["truck-inside"] as THREE.Mesh).material}
          scale={[3.534, 3.798, 15.856]}
        />
      </group>

      <group
        position={[1.668, -1.069, -1.741]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={2.256}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028 as THREE.Mesh).geometry}
          material={materials["tyres.010"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_1 as THREE.Mesh).geometry}
          material={materials["tyres.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_2 as THREE.Mesh).geometry}
          material={materials["wheels.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_3 as THREE.Mesh).geometry}
          material={materials["wheels.010"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_4 as THREE.Mesh).geometry}
          material={materials.head_paint}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_5 as THREE.Mesh).geometry}
          material={materials.glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_6 as THREE.Mesh).geometry}
          material={materials.full_glossy}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_7 as THREE.Mesh).geometry}
          material={materials.full_glass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_8 as THREE.Mesh).geometry}
          material={materials.light_emit}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_9 as THREE.Mesh).geometry}
          material={materials.flat_black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_10 as THREE.Mesh).geometry}
          material={materials.deep_black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_11 as THREE.Mesh).geometry}
          material={materials.door_knob}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_12 as THREE.Mesh).geometry}
          material={materials.signal_light}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_13 as THREE.Mesh).geometry}
          material={materials.windglass}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_14 as THREE.Mesh).geometry}
          material={materials.gloss_black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_15 as THREE.Mesh).geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.wheels_Circle028_16 as THREE.Mesh).geometry}
          material={(nodes.wheels_Circle028_16 as THREE.Mesh).material}
        />
      </group>
    </group>
  );
}
