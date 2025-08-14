"use client";

import { button, folder, useControls } from "leva";
import Scene3D, { eventDispatcher } from "@/components/container/scene3d";
import { useEffect } from "react";

function getInput(min: number, value: number, max: number, label: string, step = 1) {
  return {
    value,
    label,
    min,
    max,
    step,
  };
}

let firstMount = true;

export default function ContainerInputs() {
  const options = useControls({
    Titre: "Warehouse Simulator",
    Container: folder({
      containerLength: getInput(2844, 5000, 12014, "L (mm)"),
      containerWidth: getInput(2337, 2337, 4000, "l (mm)"),
      containerHeight: getInput(2388, 2390, 2692, "h (mm)"),
    }),
    Charge: folder({
      "Dans la Longueur du container": folder({
        boxLengthCount: getInput(1, 3, 30, "Nbre"),
        boxLengthSize: getInput(50, 250, 600, "Taille"),
      }),
      "Dans la largeur du container": folder({
        boxWidthCount: getInput(1, 2, 30, "Nbre"),
        boxWidthSize: getInput(50, 250, 600, "Taille"),
      }),
      boxHeight: getInput(50, 200, 1500, "h mm"),
      boxFloorsCount: getInput(1, 1, 20, "Lits"),
      // hasBox: { value: false, label: "Afficher" },
    }),

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
