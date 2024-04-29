"use client";

import { folder, useControls } from 'leva'
import Palettier3d from "@/components/palettier3d"

export default function Palettier() {
  const sizes = useControls({
    Palette: folder({
      palletLength: { value: 1200, label: "Longueur mm" },
      palletWidth: { value: 800, label: "Largeur mm" },
      palletHeight: { value: 100, label: "Hauteur mm" },
    }),
    "Dimensions d'un lit": folder({
      "Sur la longueur de la palette": folder({
        boxLengthCount: { value: 123, label: "Nbre" },
        boxLengthSize: { value: 123, label: "Dimension" },
      }),
      "Sur la largeur de la palette": folder({
        boxWidthNbre: { value: 123, label: "Nbre" },
        boxWidthSize: { value: 123, label: "Dimension" },
      }),
      boxHeight: { value: 123, label: "Hauteur" },
    }),
    boxFloorsCount: { value: 2, label: "Nbre de lits" },
  })


  return (
    <div className="w-screen h-screen">
      <h2>Palette</h2>
      <Palettier3d {...sizes} />
    </div>
  );
}
