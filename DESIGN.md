---
name: Más Insectos
description: Observación ultravioleta de campo para educar y movilizar por los derechos de los insectos.
colors:
  background: "#f8fafc"
  foreground: "#18181b"
  primary: "#7c3aed"
  primary-fixed-dim: "#8b5cf6"
  primary-container: "#ede9fe"
  on-primary-container: "#4c1d95"
  secondary: "#6b7280"
  secondary-container: "#e5e7eb"
  tertiary: "#10b981"
  surface: "#ffffff"
  surface-dim: "#f4f4f5"
  surface-container: "#f3f4f6"
  surface-container-high: "#e5e7eb"
  surface-container-highest: "#dbe4f0"
  on-surface: "#18181b"
  on-surface-variant: "#52525b"
  outline: "#d4d4d8"
  outline-variant: "#cbd5e1"
  error: "#dc2626"
  dark-background: "#070414"
  dark-primary: "#c084fc"
  dark-primary-container: "#3b0764"
  dark-tertiary: "#22d3ee"
  dark-surface: "#0d0820"
  dark-surface-container: "#120a2d"
  dark-on-surface-variant: "#c084fc"
typography:
  display:
    fontFamily: "Figtree, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 5rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Figtree, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 3rem)"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Figtree, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Figtree, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.15em"
rounded:
  sm: "0.25rem"
  md: "0.5rem"
  lg: "0.5rem"
  xl: "0.75rem"
  card: "0.75rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "1rem 2rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "1rem 2rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.card}"
    padding: "1.75rem 2rem"
---

# Design System: Más Insectos

## Overview

**Creative North Star: “Observación ultravioleta de campo”**

Más Insectos combina divulgación ambiental con acción participativa. La interfaz se siente como una ventana de observación en luz ultravioleta: clara y accesible para aprender, pero suficientemente energética para llevar a las personas desde la comprensión hacia una firma, una petición o una contribución editorial.

El modo claro usa una base limpia y aireada, con violeta como señal de identidad y verde como señal ecológica y de progreso. El modo oscuro no es sólo una inversión cromática: crea una experiencia de observación ultravioleta inspirada en la visión de las abejas, con fondos profundos violetas, acentos luminosos e imágenes transformadas mediante el tratamiento `ultraviolet-image`.

**Key Characteristics:**

- Educativo, directo y movilizador.
- Editorial de campo: una imagen o causa domina cada momento importante.
- Alto contraste entre superficies limpias y acentos violetas/verde.
- Tipografía pesada y compacta para titulares; etiquetas pequeñas en mayúsculas para orientación.
- Capas tonales, bordes finos y sombras puntuales en lugar de ornamentación excesiva.
- El modo oscuro funciona como “vista de abeja” ultravioleta.

## Colors

La paleta articula una identidad ecológica digital: violeta para la causa y la acción, verde para lo vivo y el avance, y neutros slate para lectura y estructura.

### Primary

- **Violeta de activismo** (`#7c3aed`): botones primarios, enlaces, estados activos y llamadas a la acción.
- **Violeta luminoso** (`#8b5cf6`): respuesta hover y acento de interacción.
- **Violeta contenedor** (`#ede9fe`): fondos suaves y resaltados relacionados con la acción primaria.

### Secondary

- **Gris de apoyo** (`#6b7280`): metadatos, cifras secundarias y texto auxiliar.

### Tertiary

- **Verde vivo** (`#10b981`): progreso de firmas, categorías ecológicas y señales de avance.

### Neutral

- **Blanco superficie** (`#ffffff`): tarjetas y superficies principales.
- **Slate claro** (`#f8fafc`): lienzo del modo claro.
- **Gris superficie** (`#f3f4f6` / `#e5e7eb` / `#dbe4f0`): capas de contenedor y contraste suave.
- **Tinta** (`#18181b`): texto principal.
- **Pizarra secundaria** (`#52525b`): párrafos, descripciones y metadatos.
- **Borde** (`#cbd5e1`): divisores y límites de componentes.

### Dark mode

- **Violeta noche** (`#080214`): lienzo profundo.
- **Violeta ultravioleta** (`#c084fc`): acción y texto de énfasis.
- **Cian de percepción** (`#22d3ee`): terciario luminoso en la vista de abeja.
- **Superficie noche** (`#0d0620` / `#140933`): capas de profundidad.

**The Two-Mode Ecology Rule.** El modo claro debe priorizar limpieza y lectura; el modo oscuro puede intensificar el lenguaje ultravioleta, pero debe conservar contraste y jerarquía funcional.

## Typography

**Display Font:** Figtree, sans-serif

**Body Font:** Figtree, sans-serif

**Label/Mono Font:** Figtree para etiquetas; Geist Mono para código y datos monoespaciados.

**Character:** La tipografía es contemporánea, pesada y funcional. Los titulares condensan la atención con peso 900 y tracking negativo; el cuerpo mantiene una lectura sencilla y relajada.

### Hierarchy

- **Display** (900, `clamp(2.5rem, 7vw, 5rem)`, `0.92`): hero y declaraciones institucionales.
- **Headline** (900, `clamp(1.5rem, 3vw, 3rem)`, `1.1`): secciones, títulos de noticias y peticiones.
- **Title** (700–900, aproximadamente `1.125rem–1.5rem`): tarjetas, bloques informativos y formularios.
- **Body** (400, `1rem`, `1.6`): educación, resúmenes y contenido editorial.
- **Label** (700, `0.75rem`, `0.15em`, mayúsculas): navegación auxiliar, categorías, metadatos y botones.

**The Weight-and-Whisper Rule.** Los titulares llevan el peso de la movilización; las etiquetas pequeñas orientan sin competir con el contenido.

## Layout

La composición usa un contenedor centrado de hasta `max-w-7xl`, con padding horizontal responsive (`px-4`, `sm:px-6`, `lg:px-8`). Las páginas públicas alternan bloques de ancho completo —hero y petición destacada— con secciones de contenido en grids de una a tres columnas (`md:grid-cols-2`, `lg:grid-cols-3`).

El ritmo vertical se apoya en secciones de aproximadamente `4rem` (`mb-16`, `py-12`) y tarjetas con gaps de `1.5rem`. En móvil, las acciones se apilan y los grids colapsan a una columna; desde `md`, la interfaz introduce composición horizontal y densidad progresiva.

## Elevation & Depth

El sistema combina capas tonales con sombras suaves. Las superficies comunes se distinguen por color y borde; las sombras aparecen en tarjetas, diálogos, navegación flotante y estados hover. El hero destacado añade imagen, gradiente de lectura y un panel translúcido con `backdrop-blur-md` para separar acción y contenido sin perder la imagen.

### Shadow Vocabulary

- **Control sutil** (`shadow-xs`): inputs, filtros, controles y elementos de navegación.
- **Tarjeta** (`shadow-sm`): tarjetas de contenido y elevación hover moderada.
- **Panel** (`shadow-md` / `shadow-lg`): menús, diálogos y tarjetas institucionales elevadas.
- **Hero destacado** (`shadow-2xl`): panel de progreso sobre imagen.

## Shapes

La forma base es suave y utilitaria: radios de `4px`, `8px`, `12px` y `9999px` para chips y controles completamente redondeados. Tarjetas de contenido suelen usar `rounded-xl` o `rounded-2xl`; héroes institucionales y bloques destacados pueden subir a `rounded-3xl`. Los bordes son finos, en `outline-variant`, y la geometría debe mantenerse contenida y legible.

## Components

### Buttons

- **Shape:** radios de `8px` a `12px`.
- **Primary:** violeta de activismo sobre blanco, padding habitual `16px 32px`, etiqueta en mayúsculas con tracking amplio.
- **Hover / Focus:** violeta luminoso en hover; focus visible con anillo basado en `--ring`; acciones usan transiciones breves y escala activa ligera.
- **Secondary / Ghost:** fondo transparente, borde `outline-variant`, texto principal y fondo de superficie alto en hover.

### Chips

- **Style:** píldora (`rounded-full`) con fondo violeta translúcido o verde translúcido y borde tenue.
- **State:** etiquetas de categoría y estados informativos; texto pequeño, pesado, uppercase y tracking amplio.

### Cards / Containers

- **Corner Style:** `12px` en tarjetas base; `16px–24px` en bloques institucionales.
- **Background:** `surface` para contenido; `surface-container` para agrupación y hero.
- **Shadow Strategy:** flat con borde en reposo; `shadow-sm` o `shadow-lg` para hover y elevación funcional.
- **Border:** `outline-variant`, ocasionalmente con opacidad reducida.
- **Internal Padding:** `24px–32px` según densidad.

### Inputs / Fields

- **Style:** borde fino, fondo transparente o `surface`, altura habitual `36px`, padding horizontal `12px`, radio `8px`.
- **Focus:** cambio de borde a primary y anillo de aproximadamente `3px`.
- **Error / Disabled:** rojo semántico para error; opacidad reducida y cursor deshabilitado para disabled.

### Navigation

La navegación usa labels compactos y pesados, enlaces con `rounded-full`, y el violeta para el estado activo. El header comparte el sistema de superficies y debe conservar una lectura directa en móvil, con controles táctiles suficientemente amplios.

### Petition Progress

El progreso de firmas es un componente distintivo: cifra grande en tipografía headline, meta secundaria, barra de `8px` redondeada y relleno verde. En destacados puede vivir sobre una superficie translúcida con blur y conectarse directamente a la acción “Firmar”.

### Ultraviolet Image

En modo oscuro, las imágenes con clase `ultraviolet-image` reciben una transición y un filtro de inversión, hue rotation, saturación y contraste. Es un recurso de identidad para comunicar la vista de abeja; debe usarse con intención en imágenes relevantes, no como filtro indiscriminado.

## Do's and Don'ts

### Do:

- **Do** usar violeta para la acción principal y verde para progreso o vida ecológica.
- **Do** mantener una jerarquía fuerte entre titulares pesados, cuerpo legible y labels compactos.
- **Do** usar superficies tonales, bordes finos y sombras como señales funcionales.
- **Do** conservar el contraste y la legibilidad cuando se active la vista ultravioleta.
- **Do** diseñar las acciones de firmar, crear y explorar como pasos claros hacia la participación.

### Don't:

- **Don't** sustituir el foco en insectos por una estética animalista genérica.
- **Don't** convertir cada superficie en violeta o verde; ambos colores deben conservar valor como señales.
- **Don't** aplicar el filtro ultravioleta a toda imagen sin considerar lectura y contexto.
- **Don't** usar sombras pesadas como decoración donde una capa tonal o un borde sea suficiente.
- **Don't** sacrificar legibilidad por una apariencia tecnológica o luminosa.

## Portada: dirección comprometida

La portada usa una composición editorial asimétrica: el hero presenta la declaración institucional junto al ojo de abeja y la petición activa funciona como una segunda escena de observación, con la acción de firmar visible en el mismo campo. Las tarjetas secundarias son superficies de lectura —no mosaicos decorativos— y se elevan sólo al interactuar. El cian identifica vida y progreso; el violeta identifica causa, navegación y acción.
