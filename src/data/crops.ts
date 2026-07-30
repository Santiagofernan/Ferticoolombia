import cafeImg from "@/assets/crops/cafe.webp";
import platanoImg from "@/assets/crops/platano.webp";
import maracuyaImg from "@/assets/crops/maracuya.webp";
import tomateImg from "@/assets/crops/tomate.webp";
import aguacateImg from "@/assets/crops/aguacate.webp";
import limonImg from "@/assets/crops/limon.webp";
import cañaImg from "@/assets/crops/caña.webp";
import papaImg  from "@/assets/crops/papa.webp";

export interface ICrop {
  slug: string;
  name: string;
  description: string;
  /** Slugs (de products.ts) recomendados para este cultivo. */
  recommended: string[];
  /** Imagen oficial del cultivo. */
  image: string;
  /** Palabra clave temática para overlay/accent. */
  accent: string;
}

export const crops: ICrop[] = [
  {
    slug: "cafe",
    name: "Café",
    description:
      "Nutrición balanceada para etapas de levante, floración y llenado del grano. Formulaciones que potencian rendimiento y calidad de taza.",
    recommended: ["mitakron", "katiuska", "spasiva"],
    image: cafeImg,
    accent: "Grano de altura",
  },
  {
    slug: "platano",
    name: "Plátano",
    description:
      "Alta demanda de potasio para engorde y llenado del racimo. Programa nutricional pensado para máxima productividad.",
    recommended: ["platanate", "katiuska", "kcl"],
    image: platanoImg,
    accent: "Racimos productivos",
  },
  {
    slug: "maracuya",
    name: "Maracuyá",
    description:
      "Aporte estratégico de potasio, calcio y micronutrientes para floración sostenida, cuaje y calidad de fruto exportable.",
    recommended: ["bonanza", "yurika", "21-0-21"],
    image: maracuyaImg,
    accent: "Fruta de exportación",
  },
  {
    slug: "tomate",
    name: "Tomate",
    description:
      "Programa nutricional de precisión para ciclos intensivos: firmeza, color, vida en anaquel y calidad post-cosecha.",
    recommended: ["mitakron", "25-4-24", "bonanza"],
    image: tomateImg,
    accent: "Cultivo de precisión",
  },
  {
    slug: "aguacate",
    name: "Aguacate",
    description:
      "Nutrición especializada para el desarrollo vegetativo, floración, cuajado y llenado del fruto.",
    recommended: ["Mitakron", "Katiuska"],
    image: aguacateImg,
    accent: "Fruto de exportación",
  },
  {
    slug: "limon",
    name: "Limon",
    description:
      "Formulaciones diseñadas para mejorar la producción, calidad y tamaño del fruto.",
    recommended: ["Platanate", "Mitakron"],
    image: limonImg,
    accent: "Fruto de exportación",
  },
  {
    slug: "caña",
    name: "Caña de azúcar",
    description:
      "Programas nutricionales para mejorar la productividad y calidad de la caña, con énfasis en el desarrollo de raíces y tallos.",
    recommended: ["Mitakron", "Katiuska"],
    image: cañaImg,
    accent: "Raíces y tallos fuertes",
  },
  {
    slug: "papa",
    name: "Papa",
    description:
      "Nutrición balanceada para etapas de crecimiento, floración y tuberización. Formulaciones que potencian rendimiento y calidad del tubérculo.",
    recommended: ["Mitakron", "Katiuska", "Spasiva"],
    image: papaImg, 
    accent: "Tuberización eficiente",
  },
];