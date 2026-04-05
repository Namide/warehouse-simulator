import getPath from "@/helpers/path";
import { useLoader } from "@react-three/fiber";
import { Color, Euler, FrontSide, TextureLoader, Vector3 } from "three";

export default function Box(props: {
  position: Vector3;
  size: [number, number, number];
  seeds: [number, number, number, number];
  hq: boolean;
}) {
  const [colorMap] = useLoader(TextureLoader, [
    getPath("/assets/box-texture.jpg"),
  ]);
  const colorPower = props.seeds[3] * 0.2 + 0.5;

  return (
    <mesh
      castShadow={props.hq}
      receiveShadow={props.hq}
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
        shadowSide={FrontSide}
      />
    </mesh>
  );
}
