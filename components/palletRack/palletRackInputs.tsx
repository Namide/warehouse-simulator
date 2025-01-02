"use client";

import { LevaInputs, button, folder, useControls } from "leva";
import Scene3D, {
  PALLET_STORAGE_DIRECTION,
  eventDispatcher,
} from "@/components/palletRack/scene3d";
import { useEffect } from "react";

function getInput(min: number, value: number, max: number, label: string) {
  return {
    value,
    label,
    min,
    max,
    step: 1,
  };
}

let firstMount = true;

export default function PalletRackInputs() {
  const options = useControls({
    Titre: "Warehouse Simulator",
    Palette: folder({
      palletLength: getInput(1, 1000, 2000, "L (mm)"),
      palletWidth: getInput(1, 500, 2000, "l (mm)"),
      palletHeight: getInput(1, 100, 300, "h (mm)"),
    }),
    Charge: folder({
      "Sur la Longueur de la palette": folder({
        boxLengthCount: getInput(1, 3, 30, "Nbre"),
        boxLengthSize: getInput(50, 250, 600, "Taille"),
      }),
      "Sur la largeur de la palette": folder({
        boxWidthCount: getInput(1, 2, 30, "Nbre"),
        boxWidthSize: getInput(50, 250, 600, "Taille"),
      }),
      boxHeight: getInput(50, 200, 1500, "h mm"),
      boxFloorsCount: getInput(1, 1, 20, "Lits"),
      hasBox: { value: false, label: "Afficher" },
    }),
    "Espace disponible": folder({
      wallLength: getInput(1000, 3000, 20000, "L (mm)"),
      wallHeight: getInput(4000, 3000, 8000, "h (mm)"),
      hasWall: { value: false, label: "Afficher" },
    }),

    // Palettier: folder({
    Lisses: folder({
      palletRackBeamLength: getInput(1, 1000, 4000, "L (mm)"),
      palletRackBeamHeight: getInput(1, 100, 500, "h (mm)"), // plus petit
      palletRackBeamWidth: getInput(1, 50, 500, "Ép (mm)"),
      palletRackByCell: getInput(1, 1, 4, "Palettes/alvéole"),
      [PALLET_STORAGE_DIRECTION]: {
        options: ["longitudinale", "transversale"] as (
          | "longitudinale"
          | "transversale"
        )[],
        type: LevaInputs.SELECT,
      },
    }),

    Niveaux: folder({
      groundCellHeight: getInput(1, 1000, 3000, "h du RdC"),
      floorCellHeight: getInput(1, 1000, 3000, "h étage"),
      floorCount: getInput(0, 0, 20, "Nbre"),
      hasPalletRack: { value: false, label: "Afficher" },
    }),
    "Échelles intermédiaires": folder({
      palletRackLadderLength: getInput(1, 3000, 15000, "h (mm)"),
      palletRackLadderHeight: getInput(1, 50, 300, "l (mm)"),
      palletRackLadderWidth: getInput(1, 500, 5000, "Prof (mm)"),
      palletRackLadderCount: getInput(0, 0, 20, "Nbre"),
    }),
    "Échelles extrémités": folder({
      palletRackLadderExtLength: getInput(1, 3500, 20000, "h (mm)"),
    }),
    // }),

    hq: { value: true, label: "hq" },
    "Centrer la caméra": button(() => {
      eventDispatcher.dispatchEvent(new Event("center"));
    }),
  });

  // Ugly way to force inputs folders to close
  const onMounted = () => {
    if (firstMount) {
      const list = document.body.querySelectorAll(".leva-c-dosbYs");

      if (list.length) {
        list.forEach((item) => (item as HTMLElement).click());
        firstMount = false;
      } else {
        window.requestAnimationFrame(onMounted);
      }
    }
  };
  window.requestAnimationFrame(onMounted);

  // Update page title from "Titre" options
  useEffect(() => {
    document.title = options.Titre;
  });

  return (
    <div className="w-screen h-screen">
      <Scene3D options={options} />
    </div>
  );
}
