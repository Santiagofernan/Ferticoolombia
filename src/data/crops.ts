import cafeImg from "@/assets/crops/cafe.jpg";
import platanoImg from "@/assets/crops/platano.jpg";
import maracuyaImg from "@/assets/crops/maracuya.jpg";
import tomateImg from "@/assets/crops/tomate.jpg";

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
];
