import { useEffect, useState } from "react";

export default function AppButton({ id, src, url, name }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    const image = new Image();
    // Assurez-vous que le crossOrigin est défini pour éviter les problèmes CORS
    image.crossOrigin = "Anonymous";
    image.src = src;
    image.onload = () => {
      // Crée un canvas temporaire
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0);

      // Tente de récupérer la couleur du pixel en haut à droite
      try {
        const pixelData = ctx.getImageData(2, 2, 1, 1).data;

        if (!pixelData) {
          // Gérez les pixels transparents comme vous le souhaitez ici
          // Par exemple, définissez une couleur de fond par défaut ou laissez-le transparent
          setColor("#FFF"); // ou une autre couleur par défaut
        } else {
          // Convertit les valeurs RGBA en chaîne hexadécimale pour les pixels non transparents
          const colorHex = "#" + ((1 << 24) + (pixelData[0] << 16) + (pixelData[1] << 8) + pixelData[2]).toString(16).slice(1);
          setColor(colorHex);
        }
      } catch (e) {
        console.error("Erreur lors de la récupération de la couleur du pixel : ", e);
        setColor("#FFF"); // Utilisez une couleur de repli en cas d'erreur
      }
    };
  }, [src]);
  console.log(name + " " + color);
  return (
    <a href={url} id={id}>
      <div className="flex flex-col justify-center items-center transition text-center cursor-pointer hover:scale-105">
        <div style={{ backgroundColor: color }} className={` w-20 h-20 rounded-xl flex justify-center items-center overflow-hidden`}>
          <img src={src} alt="app logo" className="w-full p-2 rounded-2xl " />
        </div>
        <p className="mt-1.5 text-bg_light text-xs">{name}</p>
      </div>
    </a>
  );
}
