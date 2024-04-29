"use client";

import { folder, useControls } from 'leva'

export default function Videos() {
  const { palletLength, palletWidth, palletHaut, boxLengthNbre, boxLengthSize, boxWidthNbre, boxWidthSize, boxHeight } = useControls({
    Palette: folder({
      palletLength: { value: 123, label: "Longueur" },
      palletWidth: { value: 123, label: "Largeur" },
      palletHaut: { value: 123, label: "Hauteur" },
    }),
    "Dimensions d'un lit": folder({
      "Sur la longueur de la palette": folder({
        boxLengthNbre: { value: 123, label: "Nbre" },
        boxLengthSize: { value: 123, label: "Dimension" },
      }),
      "Sur la largeur de la palette": folder({
        boxWidthNbre: { value: 123, label: "Nbre" },
        boxWidthSize: { value: 123, label: "Dimension" },
      }),
      boxHeight: { value: 123, label: "Hauteur" },
    })
  })


  return (
    <div>
      <h2>Palette</h2>
        {palletLength}
    </div>
  );
}
