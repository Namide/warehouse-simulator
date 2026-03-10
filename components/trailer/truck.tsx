"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import getPath from "@/helpers/path";

export default function TruckModel(props: {
  position?: [number, number, number];
  scale?: [number, number, number];
}) {
  // const groupRef = useRef();
  const { nodes, materials } = useGLTF(getPath("/assets/truck.glb"));

  console.log(materials);

  return (
    <group {...props} dispose={null} scale={[0.2, 0.2, 0.2]}>
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
      <group
        position={[1.664, -1.069, 1.382]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={2.256}
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
        position={[1.664, -1.069, 8.976]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={2.256}
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
        position={[1.664, -1.069, 10.976]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={2.256}
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
        material={(nodes["truck-inside"] as THREE.Mesh).material}
        scale={[3.534, 3.798, 15.856]}
      />
    </group>
  );
}
