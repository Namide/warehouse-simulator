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
        boxLengthCount: { value: 3, label: "Nbre" },
        boxLengthSize: { value: 250, label: "Dimension" },
      }),
      "Sur la largeur de la palette": folder({
        boxWidthCount: { value: 2, label: "Nbre" },
        boxWidthSize: { value: 300, label: "Dimension" },
      }),
      boxHeight: { value: 200, label: "Hauteur" },
    }),
    boxFloorsCount: { value: 2, label: "Nbre de lits" },
  })


  return (
    <div className="w-screen h-screen">
      <Palettier3d {...sizes} />
    </div>
  );
}
