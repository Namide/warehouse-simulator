import { PalletBoxes, LastPalletBoxes } from "./palletBoxes";
import { Options, PALLET_STORAGE_DIRECTION } from "./scene3d";

export default function Cell({
  options,
  position,
}: {
  options: Options;
  position: [number, number, number];
}) {
  const palletBoxesPositions: [number, number, number][] = [];

  const palletLength =
    options[PALLET_STORAGE_DIRECTION] === "longitudinale"
      ? options.palletLength
      : options.palletWidth;
  // Width
  for (let j = 0; j < options.palletRackWidthCount; j++) {
    const widthMax = options.trailerWidth;
    const pallettWidth =
      options[PALLET_STORAGE_DIRECTION] === "longitudinale"
        ? options.palletWidth
        : options.palletLength;
    const emptyWidth = widthMax - pallettWidth * options.palletRackWidthCount;
    const margin = emptyWidth / (options.palletRackWidthCount * 2);
    const x =
      margin +
      pallettWidth / 2 +
      j * (pallettWidth + 2 * margin) -
      widthMax / 2;

    // Length
    for (let i = 0; i < options.palletRackLenghtCount; i++) {
      const y = -i * palletLength - palletLength / 2;

      // Height
      for (let k = 0; k < options.palletRackHeightCount; k++) {
        const palletHeight =
          options.palletHeight + options.boxHeight * options.boxFloorsCount;
        const z = k * palletHeight;
        palletBoxesPositions.push([x, y, z]);
      }
    }
  }

  const lastPalletBoxesPositions: [number, number, number][] = [];

  if (options.hasLastPallet) {
    const lastY =
    -options.palletRackLenghtCount * palletLength - (options.lastPalletRotation === "longitudinale"
          ? options.palletLength
          : options.palletWidth) / 2;
    
    // Width
    for (let j = 0; j < options.lastPalletWidthCount; j++) {
      const widthMax = options.trailerWidth;
      const pallettWidth =
        options.lastPalletRotation === "longitudinale"
          ? options.palletWidth
          : options.palletLength;
      const emptyWidth = widthMax - pallettWidth * options.lastPalletWidthCount;
      const margin = emptyWidth / (options.lastPalletWidthCount * 2);
      const x =
        margin +
        pallettWidth / 2 +
        j * (pallettWidth + 2 * margin) -
        widthMax / 2;
  
      // Height
      for (let k = 0; k < options.palletRackHeightCount; k++) {
        const palletHeight =
          options.palletHeight + options.boxHeight * options.boxFloorsCount;
        const z = k * palletHeight;
        lastPalletBoxesPositions.push([x, lastY, z]);
      }
    }
  }

  return (
    <group position={position}>
      {palletBoxesPositions.map((palletBoxesPosition, index) => (
        <PalletBoxes
          options={options}
          position={palletBoxesPosition}
          key={index}
        />
      ))}
      {lastPalletBoxesPositions.map((lastPalletBoxesPosition, index) => (
        <LastPalletBoxes
          options={options}
          position={lastPalletBoxesPosition}
          key={index}
        />
      ))}
    </group>
  );
}
