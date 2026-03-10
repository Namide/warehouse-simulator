import getPath from "@/helpers/path";
import { useLoader } from "@react-three/fiber";
import { FrontSide, TextureLoader, Vector3 } from "three";
import { Options } from "./scene3d";

export default function Pallet({ options }: { options: Options }) {
  const palletSize = [
    options.palletLength,
    options.palletWidth,
    options.palletHeight,
  ];

  const [plankMap] = useLoader(TextureLoader, [
    getPath("/assets/plank-texture.jpg"),
  ]);

  const cleatSize: [number, number, number] = [
    palletSize[0],
    (palletSize[2] * 2) / 3,
    palletSize[2] - 15,
  ];

  const plankSize: [number, number, number] = [
    100, // 10cm
    palletSize[1],
    15, // 1.5cm
  ];

  const plankCount = Math.round(palletSize[0] / 150);

  const getPlankPos = (x: number): Vector3 =>
    new Vector3(
      x <= 0
        ? plankSize[0] / 2 - palletSize[0] / 2
        : x >= 1
        ? palletSize[0] / 2 - plankSize[0] / 2
        : (getPlankPos(1).x - getPlankPos(0).x) * x + getPlankPos(0).x,
      0,
      palletSize[2] - plankSize[2] / 2
    );

  return (
    <group>
      {[-0.5, 0, 0.5].map((index) => (
        <mesh
          castShadow={options.hq}
          receiveShadow={options.hq}
          position={
            new Vector3(
              0,
              index * palletSize[1] - (Math.sign(index) * cleatSize[1]) / 2,
              palletSize[2] - (cleatSize[2] / 2 + plankSize[2])
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
            shadowSide={FrontSide}
          />
        </mesh>
      ))}
      {new Array(plankCount).fill(true).map((_, index) => (
        <mesh
          castShadow={options.hq}
          receiveShadow={options.hq}
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
