import { Vector3 } from "three";
import Box from "./box";
import Pallet from "./pallet";
import { Options, PALLET_STORAGE_DIRECTION } from "./scene3d";
import { createRng } from "@/helpers/rng";

export default function PalletBoxes({
  options,
  position,
}: {
  options: Options;
  position: [number, number, number];
}) {
  const rng = createRng(7);
  const boxes: [number, number, number, [number, number, number, number]][] =
    [];
  for (let i = 0; i < options.boxLengthCount; i++) {
    for (let j = 0; j < options.boxWidthCount; j++) {
      for (let k = 0; k < options.boxFloorsCount; k++) {
        boxes.push([i, j, k, [rng(), rng(), rng(), rng()]]);
      }
    }
  }

  return (
    <group
      position={position}
      rotation-z={
        options[PALLET_STORAGE_DIRECTION] === "longitudinale" ? Math.PI / 2 : 0
      }
    >
      <Pallet options={options} />

      {boxes.map(([i, j, k, seeds]) => (
        <Box
          hq={options.hq}
          position={
            new Vector3(
              options.palletLength / 2 +
                i * options.boxLengthSize -
                options.palletLength / 2 +
                options.boxLengthSize / 2 -
                (options.boxLengthSize * options.boxLengthCount) / 2,
              options.palletWidth / 2 +
                j * options.boxWidthSize -
                options.palletWidth / 2 +
                options.boxWidthSize / 2 -
                (options.boxWidthSize * options.boxWidthCount) / 2,
              k * options.boxHeight +
                options.boxHeight / 2 +
                options.palletHeight
            )
          }
          seeds={seeds}
          size={[
            options.boxLengthSize,
            options.boxWidthSize,
            options.boxHeight,
          ]}
          key={`${i}-${j}-${k}`}
        />
      ))}
    </group>
  );
}
