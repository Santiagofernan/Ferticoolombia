import cafeImg from "@/assets/crops/cafe.avif";
import cafe640 from "@/assets/crops/variants/cafe-640.avif";
import cafe960 from "@/assets/crops/variants/cafe-960.avif";
import cafe1280 from "@/assets/crops/variants/cafe-1280.avif";
import platanoImg from "@/assets/crops/platano.avif";
import platano640 from "@/assets/crops/variants/platano-640.avif";
import maracuyaImg from "@/assets/crops/maracuya.avif";
import maracuya640 from "@/assets/crops/variants/maracuya-640.avif";
import maracuya960 from "@/assets/crops/variants/maracuya-960.avif";
import maracuya1280 from "@/assets/crops/variants/maracuya-1280.avif";
import tomateImg from "@/assets/crops/tomate.avif";
import tomate640 from "@/assets/crops/variants/tomate-640.avif";
import tomate960 from "@/assets/crops/variants/tomate-960.avif";
import tomate1280 from "@/assets/crops/variants/tomate-1280.avif";
import aguacateImg from "@/assets/crops/aguacate.avif";
import aguacate640 from "@/assets/crops/variants/aguacate-640.avif";
import aguacate960 from "@/assets/crops/variants/aguacate-960.avif";
import aguacate1280 from "@/assets/crops/variants/aguacate-1280.avif";
import limonImg from "@/assets/crops/limon.avif";
import limon640 from "@/assets/crops/variants/limon-640.avif";
import limon960 from "@/assets/crops/variants/limon-960.avif";
import limon1280 from "@/assets/crops/variants/limon-1280.avif";
import cañaImg from "@/assets/crops/caña.avif";
import caña640 from "@/assets/crops/variants/caña-640.avif";
import caña960 from "@/assets/crops/variants/caña-960.avif";
import caña1280 from "@/assets/crops/variants/caña-1280.avif";
import papaImg from "@/assets/crops/papa.avif";
import papa640 from "@/assets/crops/variants/papa-640.avif";

export interface ICrop {
  slug: string;
  name: string;
  description: string;
  /** Slugs (de products.ts) recomendados para este cultivo. */
  recommended: string[];
  /** Imagen oficial del cultivo. */
  image: ResponsiveCropImage;
  /** Palabra clave temática para overlay/accent. */
  accent: string;
}

export interface ResponsiveCropImage {
  src: string;
  srcSet: string;
}

export const cropImages = {
  cafe: { src: cafe960, srcSet: `${cafe640} 640w, ${cafe960} 960w, ${cafe1280} 1280w, ${cafeImg} 1920w` },
  platano: { src: platano640, srcSet: `${platano640} 640w, ${platanoImg} 844w` },
  maracuya: { src: maracuya960, srcSet: `${maracuya640} 640w, ${maracuya960} 960w, ${maracuya1280} 1280w, ${maracuyaImg} 1920w` },
  tomate: { src: tomate960, srcSet: `${tomate640} 640w, ${tomate960} 960w, ${tomate1280} 1280w, ${tomateImg} 1920w` },
  aguacate: { src: aguacate960, srcSet: `${aguacate640} 640w, ${aguacate960} 960w, ${aguacate1280} 1280w, ${aguacateImg} 1920w` },
  limon: { src: limon960, srcSet: `${limon640} 640w, ${limon960} 960w, ${limon1280} 1280w, ${limonImg} 1920w` },
  caña: { src: caña960, srcSet: `${caña640} 640w, ${caña960} 960w, ${caña1280} 1280w, ${cañaImg} 1920w` },
  papa: { src: papa640, srcSet: `${papa640} 640w, ${papaImg} 800w` },
} as const;

export const crops: ICrop[] = [
  {
    slug: "cafe",
    name: "Café",
    description:
      "Nutrición balanceada para etapas de levante, floración y llenado del grano. Formulaciones que potencian rendimiento y calidad de taza.",
    recommended: ["mitakron", "katiuska", "spasiva"],
    image: cropImages.cafe,
    accent: "Grano de altura",
  },
  {
    slug: "platano",
    name: "Plátano",
    description:
      "Alta demanda de potasio para engorde y llenado del racimo. Programa nutricional pensado para máxima productividad.",
    recommended: ["platanate", "katiuska", "kcl"],
    image: cropImages.platano,
    accent: "Racimos productivos",
  },
  {
    slug: "maracuya",
    name: "Maracuyá",
    description:
      "Aporte estratégico de potasio, calcio y micronutrientes para floración sostenida, cuaje y calidad de fruto exportable.",
    recommended: ["bonanza", "yurika", "21-0-21"],
    image: cropImages.maracuya,
    accent: "Fruta de exportación",
  },
  {
    slug: "tomate",
    name: "Tomate",
    description:
      "Programa nutricional de precisión para ciclos intensivos: firmeza, color, vida en anaquel y calidad post-cosecha.",
    recommended: ["mitakron", "25-4-24", "bonanza"],
    image: cropImages.tomate,
    accent: "Cultivo de precisión",
  },
  {
    slug: "aguacate",
    name: "Aguacate",
    description:
      "Nutrición especializada para el desarrollo vegetativo, floración, cuajado y llenado del fruto.",
    recommended: ["Mitakron", "Katiuska"],
    image: cropImages.aguacate,
    accent: "Fruto de exportación",
  },
  {
    slug: "limon",
    name: "Limon",
    description:
      "Formulaciones diseñadas para mejorar la producción, calidad y tamaño del fruto.",
    recommended: ["Platanate", "Mitakron"],
    image: cropImages.limon,
    accent: "Fruto de exportación",
  },
  {
    slug: "caña",
    name: "Caña de azúcar",
    description:
      "Programas nutricionales para mejorar la productividad y calidad de la caña, con énfasis en el desarrollo de raíces y tallos.",
    recommended: ["Mitakron", "Katiuska"],
    image: cropImages.caña,
    accent: "Raíces y tallos fuertes",
  },
  {
    slug: "papa",
    name: "Papa",
    description:
      "Nutrición balanceada para etapas de crecimiento, floración y tuberización. Formulaciones que potencian rendimiento y calidad del tubérculo.",
    recommended: ["Mitakron", "Katiuska", "Spasiva"],
    image: cropImages.papa, 
    accent: "Tuberización eficiente",
  },
];
