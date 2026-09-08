import img25424_240 from "@/assets/products/variants/25-4-24-240.avif";
import img25424_360 from "@/assets/products/variants/25-4-24-360.avif";
import img25424_520 from "@/assets/products/variants/25-4-24-520.avif";
import img25424_720 from "@/assets/products/variants/25-4-24-720.avif";
import imgKatiuska_240 from "@/assets/products/variants/katiuska-240.avif";
import imgKatiuska_360 from "@/assets/products/variants/katiuska-360.avif";
import imgKatiuska_520 from "@/assets/products/variants/katiuska-520.avif";
import imgKatiuska_720 from "@/assets/products/variants/katiuska-720.avif";
import imgMitakron_240 from "@/assets/products/variants/mitakron-240.avif";
import imgMitakron_360 from "@/assets/products/variants/mitakron-360.avif";
import imgMitakron_520 from "@/assets/products/variants/mitakron-520.avif";
import imgMitakron_720 from "@/assets/products/variants/mitakron-720.avif";
import imgPlatanate_240 from "@/assets/products/variants/cplatanate-240.avif";
import imgPlatanate_360 from "@/assets/products/variants/cplatanate-360.avif";
import imgPlatanate_520 from "@/assets/products/variants/cplatanate-520.avif";
import imgPlatanate_720 from "@/assets/products/variants/cplatanate-720.avif";
import imgSpasiva_240 from "@/assets/products/variants/spasiva-240.avif";
import imgSpasiva_360 from "@/assets/products/variants/spasiva-360.avif";
import imgSpasiva_520 from "@/assets/products/variants/spasiva-520.avif";
import imgSpasiva_720 from "@/assets/products/variants/spasiva-720.avif";
import imgBonanza_240 from "@/assets/products/variants/bonanza-240.avif";
import imgBonanza_360 from "@/assets/products/variants/bonanza-360.avif";
import imgBonanza_520 from "@/assets/products/variants/bonanza-520.avif";
import imgBonanza_720 from "@/assets/products/variants/bonanza-720.avif";
import imgYurika_240 from "@/assets/products/variants/Yurika-240.avif";
import imgYurika_360 from "@/assets/products/variants/Yurika-360.avif";
import imgYurika_520 from "@/assets/products/variants/Yurika-520.avif";
import imgYurika_720 from "@/assets/products/variants/Yurika-720.avif";
import imgZaneta_240 from "@/assets/products/variants/Zaneta-240.avif";
import imgZaneta_360 from "@/assets/products/variants/Zaneta-360.avif";
import imgZaneta_520 from "@/assets/products/variants/Zaneta-520.avif";
import imgZaneta_720 from "@/assets/products/variants/Zaneta-720.avif";
/*Fichas*/
import mitakronFicha from "@/assets/fichas/mitakron.avif";
import katiuskaFicha from "@/assets/fichas/katiuska.avif";
import platanateFicha from "@/assets/fichas/platanate.avif";
import ficha25424 from "@/assets/fichas/25-4-24.avif";
import spasivaFicha from "@/assets/fichas/spasiva.avif";
import bonanzaFicha from "@/assets/fichas/bonanza.avif";
import yurikaFicha from "@/assets/fichas/Yurika.avif";
import zanetaFicha from "@/assets/fichas/Zaneta.avif";

export interface IProduct {
  slug: string;
  name: string;
  formula: string;
  ficha: string;
  tagline: string;
  description: string;
  benefits: string[];
  image: ResponsiveImage;
  imageAlt?: string;
  /** Ruta al PDF de ficha técnica. Reemplazable cuando existan los PDFs oficiales. */
  datasheetUrl?: string;
}

export interface ResponsiveImage {
  src: string;
  srcSet: string;
}

export const products: IProduct[] = [
  {
    slug: "mitakron",
    name: "Mitakron",
    formula: "16-16-16 + 3,5 (CaO)",
    ficha: mitakronFicha,
    tagline: "Desarrollo vegetativo sostenible y levante garantizado",
    description:
      "Fertilizante compuesto complejo NPK con calcio, de reacción líquida y alta asimilación. Ideal para las etapas de levante, desarrollo y sostén del cultivo.",
    benefits: [
      "Nutrición balanceada NPK + Ca",
      "Fuentes de alta eficiencia y asimilación",
      "Ideal para etapa de desarrollo vegetativo",
    ],
    image: { src: imgMitakron_360, srcSet: `${imgMitakron_240} 240w, ${imgMitakron_360} 360w, ${imgMitakron_520} 520w, ${imgMitakron_720} 720w` },
  },
  {
    slug: "yurika",
    name: "Yurika",
    formula: "23-4-20-3(MgO)-4(S)",
    ficha: yurikaFicha,
    tagline: "Nutrición equilibrada para el desarrollo del cultivo",
    description:
      "Fertilizante compuesto NPK con magnesio y azufre, formulado para aportar una nutrición equilibrada y favorecer el desarrollo productivo del cultivo.",
    benefits: [
      "Aporta magnesio y azufre",
      "Nutrición equilibrada NPK",
      "Favorece el desarrollo del cultivo",
    ],
    image: { src: imgYurika_360, srcSet: `${imgYurika_240} 240w, ${imgYurika_360} 360w, ${imgYurika_520} 520w, ${imgYurika_720} 720w` },
    imageAlt: "Fertilizante Yurika 23-4-20-3(MgO)-4(S) - Ferticolombia",
  },
  {
    slug: "zaneta",
    name: "Zaneta",
    formula: "26-4-22",
    ficha: zanetaFicha,
    tagline: "Alta eficiencia para el rendimiento del cultivo",
    description:
      "Fertilizante compuesto NPK de alta concentración, diseñado para acompañar las etapas de mayor demanda nutricional del cultivo.",
    benefits: [
      "Alta concentración de nitrógeno y potasio",
      "Nutrición NPK eficiente",
      "Acompaña el rendimiento del cultivo",
    ],
    image: { src: imgZaneta_360, srcSet: `${imgZaneta_240} 240w, ${imgZaneta_360} 360w, ${imgZaneta_520} 520w, ${imgZaneta_720} 720w` },
    imageAlt: "Fertilizante Zaneta 26-4-22 - Ferticolombia",
  },
  {
    slug: "bonanza",
    name: "Bonanza",
    formula: "19-9-19 + 1 (CaO)",
    ficha: bonanzaFicha,
    tagline: "Fructificación y cargue de cosecha",
    description:
      "Fertilizante compuesto complejo NPK con calcio y fuentes de alta eficiencia. La mejor opción para lograr una cosecha óptima, con gran aporte en el proceso de fructificación y cargue.",
    benefits: [
      "Optimiza fructificación y cargue",
      "Balance NPK con calcio",
      "Fuentes de alta eficiencia agronómica",
    ],
    image: { src: imgBonanza_360, srcSet: `${imgBonanza_240} 240w, ${imgBonanza_360} 360w, ${imgBonanza_520} 520w, ${imgBonanza_720} 720w` },
  },
  {
    slug: "katiuska",
    name: "Katiuska",
    formula: "18-6-18 + 2 (MgO) + 2 (S)",
    ficha: katiuskaFicha,
    tagline: "Cargue y llenado del fruto",
    description:
      "Fertilizante complejo compuesto NPK con magnesio y azufre, ideal para las etapas de producción, cargue o cosecha. Aporta elementos secundarios para una nutrición más completa.",
    benefits: [
      "Aporta Mg y S secundarios",
      "Ayuda al llenado del fruto",
      "Fertilización más completa y eficiente",
    ],
    image: { src: imgKatiuska_360, srcSet: `${imgKatiuska_240} 240w, ${imgKatiuska_360} 360w, ${imgKatiuska_520} 520w, ${imgKatiuska_720} 720w` },
  },
  {
    slug: "platanate",
    name: "Platanate",
    formula: "15-4-30",
    ficha: platanateFicha,
    tagline: "Maduración del fruto junto con mejoras en calidad y tamaño",
    description:
      "Fertilizante compuesto mezclado NPK con alta concentración de potasio. Recomendado para la fase de engorde y maduración en cultivos con altas exigencias de K: frutales, hortalizas, cítricos y plátano.",
    benefits: [
      "Mejora tamaño y calidad del fruto",
      "Alto aporte de potasio (K₂O 30%)",
      "Ideal para plátano, cítricos y hortalizas",
    ],
    image: { src: imgPlatanate_360, srcSet: `${imgPlatanate_240} 240w, ${imgPlatanate_360} 360w, ${imgPlatanate_520} 520w, ${imgPlatanate_720} 720w` },
  },
  {
    slug: "spasiva",
    name: "Spasiva",
    formula: "21-5-20",
    ficha: spasivaFicha,
    tagline: "Mezcla física premium NPK",
    description:
      "Mezcla física Premium con fuentes de alta eficiencia y asimilación de NPK. Formulada para etapas de máxima demanda vegetativa y productiva del cultivo.",
    benefits: [
      "Eco amigable con el medio ambiente",
      "Menor concentración de metales pesados",
      "Rendimiento superior por hectárea",
    ],
    image: { src: imgSpasiva_360, srcSet: `${imgSpasiva_240} 240w, ${imgSpasiva_360} 360w, ${imgSpasiva_520} 520w, ${imgSpasiva_720} 720w` },
  },
  {
    slug: "25-4-24",
    name: "25-4-24",
    formula: "NPK 25-4-24",
    ficha: ficha25424,
    tagline: "Nutrición de precisión granulada",
    description:
      "Fertilizante compuesto mezclado NPK para aplicación al suelo. Uso agrícola granulado, ideal para planes de fertilización técnicos.",
    benefits: [
      "Relación N-K optimizada",
      "Aplicación edáfica uniforme",
      "Alta eficiencia agronómica",
    ],
    image: { src: img25424_360, srcSet: `${img25424_240} 240w, ${img25424_360} 360w, ${img25424_520} 520w, ${img25424_720} 720w` },
  },
];
