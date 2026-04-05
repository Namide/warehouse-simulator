"use client";

import { LevaInputs, button, folder, useControls } from "leva";
import Scene3D, {
  PALLET_STORAGE_DIRECTION,
  eventDispatcher,
} from "@/components/trailer/scene3d";
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

export default function TrailerInputs() {
  const options = useControls({
    Titre: "Warehouse Simulator",
    Remorque: folder({
      trailerLength: getInput(7500, 7500, 13600, "L (mm)"),
      trailerWidth: getInput(2450, 2450, 2450, "l (mm)"),
      trailerHeight: getInput(2400, 2500, 2700, "h (mm)"),
    }),
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
    // "Espace disponible": folder({
    //   wallLength: getInput(1000, 3000, 20000, "L (mm)"),
    //   wallHeight: getInput(4000, 3000, 8000, "h (mm)"),
    //   hasWall: { value: false, label: "Afficher" },
    // }),

    // Palettier: folder({
    Chargement: folder({
      // palletRackByCell: getInput(1, 1, 4, "Palettes/alvéole"),
      [PALLET_STORAGE_DIRECTION]: {
        options: ["longitudinale", "transversale"] as (
          | "longitudinale"
          | "transversale"
        )[],
        type: LevaInputs.SELECT,
      },
      palletRackWidthCount: getInput(1, 1, 4, "Nbre L"),
      palletRackLenghtCount: getInput(1, 1, 14, "Nbre l"),
      palletRackHeightCount: getInput(1, 1, 5, "Nbre h"),
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
