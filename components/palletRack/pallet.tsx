import getPath from "@/helpers/path";
import { useLoader } from "@react-three/fiber";
import { FrontSide, TextureLoader, Vector3 } from "three";

export default function Pallet(props: {
  position: Vector3;
  size: number[];
  hq: boolean;
}) {
  const [plankMap] = useLoader(TextureLoader, [
    getPath("/assets/plank-texture.jpg"),
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
          castShadow={props.hq}
          receiveShadow={props.hq}
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
            shadowSide={FrontSide}
          />
        </mesh>
      ))}
      {new Array(plankCount).fill(true).map((_, index) => (
        <mesh
          castShadow={props.hq}
          receiveShadow={props.hq}
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
