import getPath from "@/helpers/path";
import { useLoader } from "@react-three/fiber";
import { Color, DoubleSide, FrontSide, TextureLoader } from "three";
import { Options } from "./scene3d";

export default function Wall({ options }: { options: Options }) {
  const [colorMap] = useLoader(TextureLoader, [
    getPath("/assets/wall-texture.jpg"),
  ]);

  const colorPower = 0.99;
  const wallThick = 300;

  return (
    <mesh
      castShadow={options.hq}
      receiveShadow={options.hq}
      position={[
        0,
        options.palletRackLadderWidth / 2 + 300 + wallThick / 2,
        options.wallHeight / 2,
      ]}
      scale={1}
    >
      <boxGeometry args={[options.wallLength, wallThick, options.wallHeight]} />
      <meshStandardMaterial
        map={colorMap}
        color={new Color(colorPower, colorPower, colorPower)}
        wireframe={false}
        shadowSide={DoubleSide}
      />
    </mesh>
  );
}
