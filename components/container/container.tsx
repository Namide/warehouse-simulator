"use client";

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function ContainerModel(props: { position?: [number, number, number], scale?: [number, number, number] }) {
  // const groupRef = useRef();
  const { nodes, materials } = useGLTF("/assets/container.glb");

  console.log(materials);

  return (
    <group {...props} /* ref={groupRef} */ /* {...props} */ dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["12281_Container_v2_L2"].geometry}
      >
        <meshStandardMaterial
          {...materials["12281_container"]}
          transparent
          side={THREE.DoubleSide}
          opacity={0.75}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["12281_Container_v2_L2_1"].geometry}
      >
        <meshStandardMaterial
          {...materials["_container_alum"]}
          transparent
          side={THREE.DoubleSide}
          opacity={0.5}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["12281_Container_v2_L2_2"].geometry}
      >
        <meshStandardMaterial
          {...materials["wood"]}
          transparent
          side={THREE.DoubleSide}
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/assets/container.glb");
