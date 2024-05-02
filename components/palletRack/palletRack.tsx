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
  console.log(horizontalBarsCount);
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
          color="blanchedalmond"
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
          color="blanchedalmond"
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
            color="red"
            wireframe={false}
            // shadowSide={FrontSide}
          />
        </mesh>
      ))}
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
        ],
      };
    });

  // const [plankMap] = useLoader(TextureLoader, [
  //   getPath("/assets/plank-texture.jpg"),
  // ]);

  // const cleatSize: [number, number, number] = [
  //   props.size[0],
  //   (props.size[2] * 2) / 3,
  //   props.size[2] - 15,
  // ];

  // const plankSize: [number, number, number] = [
  //   100, // 10cm
  //   props.size[1],
  //   15, // 1.5cm
  // ];

  // const plankCount = Math.round(props.size[0] / 150);

  // const getPlankPos = (x: number): Vector3 =>
  //   new Vector3(
  //     x <= 0
  //       ? plankSize[0] / 2 - props.size[0] / 2
  //       : x >= 1
  //       ? props.size[0] / 2 - plankSize[0] / 2
  //       : (getPlankPos(1).x - getPlankPos(0).x) * x + getPlankPos(0).x,
  //     0,
  //     props.size[2] - plankSize[2] / 2
  //   );

  return (
    <group position-x={-totalWidth / 2}>
      {laddersOptions.map((opt, index) => (
        <Ladder {...opt} hq={options.hq} key={index} />
      ))}

      {/* {[-0.5, 0, 0.5].map((index) => (
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
      ))} */}
    </group>
  );
}
