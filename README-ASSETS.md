# Guía de assets locales — Ferticoolombia

Todas las imágenes viven dentro de `src/assets/` y se importan como módulos ES estándar de Vite (`import img from "@/assets/..."`). Los assets se sirven localmente y se procesan durante el build.

## Estructura

```
src/assets/
├── about/          → Foto usada en la sección "Quiénes Somos"
├── backgrounds/    → Fondos fullscreen de secciones (parallax, etc.)
├── brand/          → Logo, isotipo y marca WhatsApp
├── brands/         → Fotos de planta/logística + logos de aliados (Yara, Acron, Coocentral)
├── crops/          → Imágenes de la sección Cultivos
├── hero/           → Slides del carrusel principal (h1..h7)
├── parallax/       → Imagen de la sección Parallax CTA
├── products/       → Etiquetas oficiales de los productos
└── stats/          → Fondo de la sección de estadísticas
```

## Mapa de imágenes → componentes

| Imagen | Componente |
|---|---|
| `about/coffee.jpg` | `src/components/sections/About.tsx` |
| `hero/h1.jpg` … `hero/h7.jpg` | `src/components/layout/Hero.tsx`, `About.tsx` |
| `hero/h3.jpg` | `src/components/sections/Contact.tsx` (fondo) |
| `brand/logo.png` | `src/components/layout/Footer.tsx` |
| `brand/logo-icon.png` | `src/components/layout/Navbar.tsx`, `Brands.tsx` |
| `brand/whatsapp.webp` | `src/components/sections/Contact.tsx` |
| `brands/plant-aerial.jpg`, `plant-interior.jpg`, `plant-4..7.jpg` | `src/components/sections/Brands.tsx` (carrusel de fondo) |
| `brands/logistics-1..4.jpg`, `fertilizer-hold.jpg` | `src/components/sections/Brands.tsx` |
| `brands/acron.jpg`, `brands/coocentral.svg` | `src/components/sections/Brands.tsx` (logos aliados) |
| `brands/yara.svg`, `brands/bg.jpg` | Reservados para futuras marcas / fondo alterno |
| `crops/cafe.jpg`, `platano.jpg`, `maracuya.jpg`, `tomate.jpg` | `src/data/crops.ts` → `Crops.tsx` |
| `parallax/cafe.jpg` | `src/components/sections/ParallaxCta.tsx` |
| `products/*.png` (12 SKUs) | `src/data/products.ts` → `Products.tsx` |
| `backgrounds/products-bg-coffee.jpg` | `src/components/sections/Products.tsx` (fondo parallax) |
| `stats/coffee-field.jpg` | `src/components/sections/Stats.tsx` |

## Cómo añadir nuevas imágenes

1. Guarda el archivo en la carpeta correspondiente:
   - Fondos fullscreen → `src/assets/backgrounds/`
   - Nuevos productos → `src/assets/products/`
   - Cultivos → `src/assets/crops/`
   - Fotos institucionales / planta → `src/assets/brands/`
   - Assets de marca (logo, íconos) → `src/assets/brand/`
2. Impórtalo con el alias `@/assets/...`:
   ```ts
   import nuevoProducto from "@/assets/products/nuevo.png";
   ```
3. Úsalo directamente como `src` o `backgroundImage`. Vite lo procesa, hashea y optimiza en build.

## Ejecutar en local (VS Code)

```bash
npm install     # o bun install
npm run dev
```

Ya no se producen errores 404 de `/__l5e/assets-v1/...` porque todas las imágenes son locales y las resuelve Vite.

## Descarga del pack completo

Todas las imágenes originales están empaquetadas en `assets-complete.zip` (adjunto en este mensaje).
