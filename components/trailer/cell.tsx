import PalletBoxes from "./palletBoxes";
import { Options, PALLET_STORAGE_DIRECTION } from "./scene3d";

export default function Cell({
  options,
  position,
}: {
  options: Options;
  position: [number, number, number];
}) {
  const palletBoxesPositions: [number, number, number][] = new Array(
    options.palletRackByCell
  )
    .fill(1)
    .map((_, index) => {
      const widthMax = options.palletRackBeamLength;
      const pallettWidth =
        options[PALLET_STORAGE_DIRECTION] === "longitudinale"
          ? options.palletWidth
          : options.palletLength;
      const emptyWidth = widthMax - pallettWidth * options.palletRackByCell;
      const margin = emptyWidth / (options.palletRackByCell * 2);
      const x =
        margin +
        pallettWidth / 2 +
        index * (pallettWidth + 2 * margin) -
        widthMax / 2;

      return [x, 0, 0];
    });

  return (
    <group position={position}>
      {palletBoxesPositions.map((palletBoxesPosition, index) => (
        <PalletBoxes
          options={options}
          position={palletBoxesPosition}
          key={index}
        />
      ))}
    </group>
  );
}
