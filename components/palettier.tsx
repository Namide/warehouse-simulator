"use client";

import { folder, useControls } from 'leva'
import Palettier3d from "@/components/palettier3d"

export default function Palettier() {
  const sizes = useControls({
    Palette: folder({
      palletLength: { value: 1200, label: "Longueur mm", min: 1, max: 5000 },
      palletWidth: { value: 800, label: "Largeur mm", min: 1, max: 5000 },
      palletHeight: { value: 100, label: "Hauteur mm", min: 1, max: 300 },
    }),
    "Dimensions d'un lit": folder({
      "Sur la longueur de la palette": folder({
        boxLengthCount: { value: 3, label: "Nbre", min: 1, max: 30 },
        boxLengthSize: { value: 250, label: "Dimension", min: 1, max: 1000 },
      }),
      "Sur la largeur de la palette": folder({
        boxWidthCount: { value: 2, label: "Nbre", min: 1, max: 30 },
        boxWidthSize: { value: 300, label: "Dimension", min: 1, max: 1000 },
      }),
      boxHeight: { value: 200, label: "Hauteur", min: 1, max: 1000 },
    }),
    boxFloorsCount: { value: 2, label: "Nbre de lits", min: 1, max: 100 },
  })


  return (
    <div className="w-screen h-screen">
      <Palettier3d {...sizes} />
    </div>
  );
}
