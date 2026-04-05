import { DoubleSide, Vector3 } from "three";
import { Options } from "./scene3d";
import Cell from "./cell";

function Ladder({
  position,
  size,
  hq,
}: {
  position: number[];
  size: [number, number, number];
  hq: boolean;
}) {
  const horizontalBarsCount = Math.round(size[2] / 1000);
  const horizontalBars = new Array(horizontalBarsCount)
    .fill(1)
    .map((_, index) => ({
      position: [
        0,
        0,
        (index * size[2]) / horizontalBarsCount +
          size[2] / (2 * horizontalBarsCount) -
          size[2] / 2,
      ],
      size: [(size[0] * 2) / 3, size[1] - size[0], (size[0] * 2) / 3] as const,
    }));

  return (
    <group position={new Vector3(...position)}>
      <mesh
        castShadow={hq}
        receiveShadow={hq}
        position={new Vector3(0, size[1] / 2, 0)}
        scale={1}
      >
        <boxGeometry args={[size[0], size[0], size[2]]} />
        <meshStandardMaterial
          // map={plankMap}
          color={0x607990}
          roughness={0.25}
          metalness={1}
          wireframe={false}
          shadowSide={DoubleSide}
        />
      </mesh>
      <mesh
        castShadow={hq}
        receiveShadow={hq}
        position={new Vector3(0, -size[1] / 2, 0)}
        scale={1}
      >
        <boxGeometry args={[size[0], size[0], size[2]]} />
        <meshStandardMaterial
          // map={plankMap}
          color={0x607990}
          roughness={0.25}
          metalness={1}
          wireframe={false}
          shadowSide={DoubleSide}
        />
      </mesh>
      {horizontalBars.map((opt, index) => (
        <mesh
          castShadow={hq}
          receiveShadow={hq}
          position={new Vector3(...opt.position)}
          scale={1}
          key={index}
        >
          <boxGeometry args={[...opt.size]} />
          <meshStandardMaterial
            // map={plankMap}
            color={0x607990}
            roughness={0.25}
            metalness={1}
            wireframe={false}
            shadowSide={DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function Beam({
  position,
  size,
  hq,
}: {
  position: number[];
  size: [number, number, number, number];
  hq: boolean;
}) {
  return (
    <group position={new Vector3(...position)}>
      <mesh
        castShadow={hq}
        receiveShadow={hq}
        position={new Vector3(0, size[3] / 2, 0)}
        scale={1}
      >
        <boxGeometry args={[size[0], size[1], size[2]]} />
        <meshStandardMaterial
          // map={plankMap}
          color={0xff7700}
          metalness={1}
          roughness={0.2}
          wireframe={false}
          // shadowSide={FrontSide}
        />
      </mesh>
      <mesh
        castShadow={hq}
        receiveShadow={hq}
        position={new Vector3(-size[0] / 2 - 10, size[3] / 2 + size[1] / 2, 0)}
        scale={1}
      >
        <boxGeometry args={[20, 10, size[2]]} />
        <meshStandardMaterial
          // map={plankMap}
          color={0xff7700}
          metalness={1}
          roughness={0.2}
          wireframe={false}
          // shadowSide={FrontSide}
        />
      </mesh>
      <mesh
        castShadow={hq}
        receiveShadow={hq}
        position={new Vector3(-size[0] / 2 - 10, -size[3] / 2 - size[1] / 2, 0)}
        scale={1}
      >
        <boxGeometry args={[20, 10, size[2]]} />
        <meshStandardMaterial
          // map={plankMap}
          color={0xff7700}
          metalness={1}
          roughness={0.2}
          wireframe={false}
          // shadowSide={FrontSide}
        />
      </mesh>
      <mesh
        castShadow={hq}
        receiveShadow={hq}
        position={new Vector3(0, -size[3] / 2, 0)}
        scale={1}
      >
        <boxGeometry args={[size[0], size[1], size[2]]} />
        <meshStandardMaterial
          // map={plankMap}
          color={0xff7700}
          metalness={1}
          roughness={0.2}
          wireframe={false}
          // shadowSide={FrontSide}
        />
      </mesh>
      <mesh
        castShadow={hq}
        receiveShadow={hq}
        position={new Vector3(size[0] / 2 + 10, size[3] / 2 + size[1] / 2, 0)}
        scale={1}
      >
        <boxGeometry args={[20, 10, size[2]]} />
        <meshStandardMaterial
          // map={plankMap}
          color={0xff7700}
          metalness={1}
          roughness={0.2}
          wireframe={false}
          // shadowSide={FrontSide}
        />
      </mesh>
      <mesh
        castShadow={hq}
        receiveShadow={hq}
        position={new Vector3(size[0] / 2 + 10, -size[3] / 2 - size[1] / 2, 0)}
        scale={1}
      >
        <boxGeometry args={[20, 10, size[2]]} />
        <meshStandardMaterial
          // map={plankMap}
          color={0xff7700}
          metalness={1}
          roughness={0.2}
          wireframe={false}
          // shadowSide={FrontSide}
        />
      </mesh>
    </group>
  );
}

export default function PalletRack({ options }: { options: Options }) {
  const cellsOptions: {
    position: [number, number, number];
  }[] = [];

  const posX = options.trailerWidth / 2;

  cellsOptions.push({
    position: [posX, 0, 0],
  });

  return (
    <group position-x={-options.trailerWidth / 2}>
      {cellsOptions.map((opt, index) => (
        <Cell options={options} position={opt.position} key={index} />
      ))}
    </group>
  );
}
