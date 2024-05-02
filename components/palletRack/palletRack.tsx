import { Vector3 } from "three";
import { Options } from "./scene3d";

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
          color={0xaaaaaa}
          roughness={0.25}
          metalness={1}
          wireframe={false}
          // shadowSide={FrontSide}
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
          color={0xaaaaaa}
          roughness={0.25}
          metalness={1}
          wireframe={false}
          // shadowSide={FrontSide}
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
            color={0xaaaaaa}
            roughness={0.25}
            metalness={1}
            wireframe={false}
            // shadowSide={FrontSide}
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
  const ladderThickness = options.palletRackLadderHeight;
  const totalWidth =
    options.palletRackBeamLength * (options.palletRackLadderCount + 1) +
    (options.palletRackLadderCount + 2) * ladderThickness;

  const laddersOptions = new Array(2 + options.palletRackLadderCount)
    .fill(1)
    .map((_, index) => {
      const height =
        options.palletRackLadderLength +
        (index === 0 || index === options.palletRackLadderCount + 1
          ? options.palletRackLadderExtLength
          : 0);
      return {
        position: [
          index * (options.palletRackBeamLength + ladderThickness) +
            ladderThickness / 2,
          0,
          height / 2,
        ],
        size: [
          ladderThickness,
          options.palletRackLadderWidth - ladderThickness,
          height,
        ] as [number, number, number],
      };
    });

  const BeamsOptions: {
    position: number[];
    size: [number, number, number, number];
  }[] = [];
  for (let x = 0; x < 1 + options.palletRackLadderCount; x++) {
    for (let z = 0; z < options.floorCount; z++) {
      BeamsOptions.push({
        position: [
          ladderThickness +
            options.palletRackBeamLength / 2 +
            x * (options.palletRackBeamLength + ladderThickness),
          0,
          z === 0
            ? options.groundCellHeight + options.palletRackBeamHeight / 2
            : options.groundCellHeight +
              z * options.floorCellHeight -
              options.palletRackBeamHeight / 2,
        ],
        size: [
          options.palletRackBeamLength,
          options.palletRackBeamWidth,
          options.palletRackBeamHeight,
          options.palletRackLadderWidth - options.palletRackBeamWidth,
        ],
      });
    }
  }

  new Array(2 + options.palletRackLadderCount).fill(1).map((_, index) => {
    const height =
      options.palletRackLadderLength +
      (index === 0 || index === options.palletRackLadderCount + 1
        ? options.palletRackLadderExtLength
        : 0);
    return {
      position: [
        index * (options.palletRackBeamLength + ladderThickness) +
          ladderThickness / 2,
        0,
        height / 2,
      ],
      size: [
        ladderThickness,
        options.palletRackLadderWidth - ladderThickness,
        height,
      ] as [number, number, number],
    };
  });

  return (
    <group position-x={-totalWidth / 2}>
      {laddersOptions.map((opt, index) => (
        <Ladder {...opt} hq={options.hq} key={index} />
      ))}
      {BeamsOptions.map((opt, index) => (
        <Beam {...opt} hq={options.hq} key={index} />
      ))}
    </group>
  );
}
