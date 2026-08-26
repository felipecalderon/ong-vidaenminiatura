# Diagnóstico y recomendaciones para alinear Más Insectos con OBJETIVOS.md

## Resumen

La plataforma es visual y técnicamente sólida, pero su arquitectura pública está pensada como “plataforma de peticiones y noticias”, no como sitio institucional de una fundación. De los seis ejes de OBJETIVOS.md, hoy solo dos tienen presencia parcial —Investigación/Difusión y Educación/Concientización, ambos a través de Noticias—; la Acción Legal aparece indirectamente en Peticiones. Faltan como caminos públicos y accionables: sostenibilidad/donaciones, transparencia, alianzas, voluntariado y acción social.

La prioridad elegida para esta etapa es **Educación y Divulgación**. El documento partió como diagnóstico con recomendaciones y hoy está en fase de implementación.

## Diagnóstico

Lo que ya está bien y conviene conservar:

- Identidad visual y mundo “observación ultravioleta de campo”: consistente y diferenciadora.
- Núcleo de participación: peticiones, firmas, noticias y roles funcionan.
- Narrativa emocional y filosófica de la página Nosotros.

Brechas principales:

| Eje de OBJETIVOS.md | Estado actual | Brecha / recomendación |
|---|---|---|
| Investigación y Difusión Científica | ✅ Implementado | Hub de investigación construido: rutas `/investigacion` (listado, detalle, creación y edición), modelo `publicacion` con estudios, publicaciones y eventos, y migración `20260826185657_difusion_clientifica` aplicada. |
| Educación y Concientización | ✅ Implementado | Hub educativo construido: rutas `/aprende` (listado, detalle, creación, edición y mis recursos), modelo `recursoEducativo` con conceptos clave, guías, mitos/preguntas y cómo actuar, y migración aplicada. |
| Acción Legal e Institucional | Indirecta en Peticiones | Falta explicar el programa de incidencia, cambios normativos y acciones judiciales/extrajudiciales. |
| Redes y Cooperación | Ausente | No hay sección de alianzas, convenios ni cooperación. |
| Acción Social y Beneficencia | Ausente | No se comunican programas comunitarios ni el marco D.L. N° 3.063 / Ley N° 19.885. |
| Gestión Financiera y Sostenibilidad | Ausente | No hay transparencia, donaciones, postulación a fondos ni explicación de sostenibilidad. |

## Estado de implementación

- Investigación y Difusión Científica: ✅ Implementado (hub `/investigacion` con el modelo `publicacion`).
- Educación y Concientización: ✅ Implementado (hub `/aprende` con el modelo `recursoEducativo` y migración aplicada).
- Acción Legal e Institucional, Redes y Cooperación, Acción Social y Beneficencia, y Gestión Financiera y Sostenibilidad: Pendiente.

Otros hallazgos:

- La navegación principal solo tiene 5 rutas: Inicio, Nosotros, Investigación, Peticiones y Noticias. No se reconoce la fundación como institución con “Qué hacemos”, “Aprende”, “Participa” o “Transparencia”.
- La página Nosotros es poética, pero no comunica el objeto legal, los ejes de acción, la gobernanza ni el marco institucional.
- La terminología es inconsistente: “organización sin fines de lucro”, “organización de derecho animal”, “protección de seres vivos” y “Más Insectos” conviven sin una definición única. OBJETIVOS.md fija el foco en **insectos, arácnidos y otros invertebrados**.
- La sección “Perspectivas de la realidad” incluye cetáceos y una visión cósmica que, aunque valiosa, diluye el foco entomológico en un sitio cuyo valor diferencial son los invertebrados.
- Las categorías iniciales ya se acercan a los ejes, pero no están conectadas a una arquitectura institucional ni a una experiencia educativa.

## Recomendaciones priorizadas

### P0 — Institucionalizar la narrativa y la navegación

- Actualizar la página Nosotros para que cuente: qué es la fundación, su objeto principal, sus seis ejes de acción, su marco legal y quiénes la conforman. Mantener la emoción, pero poner la misión operativa primero.
- Reestructurar la navegación a una jerarquía centrada en la fundación, por ejemplo: Inicio, Nosotros, Aprende, Acción/Peticiones, Noticias, Participa. Si cinco elementos saturan el menú móvil, mover Aprende y Participa al footer y al home.
- Reemplazar copy ambiguo por “Fundación Más Insectos” y fijar la descripción: conservación, investigación, defensa y protección de insectos, arácnidos y otros invertebrados, sus ecosistemas y la biodiversidad general.

### P0 — Crear el hub educativo “Aprende”

- Crear una ruta pública `/aprende` o `/educacion` que convierta la educación en el camino principal.
- Incluir, al menos, cuatro bloques navegables: conceptos clave, guías de identificación, mitos y preguntas frecuentes, y “cómo puedes actuar”.
- Reutilizar el contenido de Noticias con categorías educativas y cerrar cada recurso con una CTA concreta: firmar, crear petición, compartir o sumarse como voluntario/a.
- No inventar contenidos científicos: derivar el material de las noticias existentes, OBJETIVOS.md y la página Nosotros.

### P1 — Conectar los seis ejes como “Qué hacemos”

- Crear una página institucional `/que-hacemos` con seis tarjetas, una por eje, cada una con descripción, tipo de actividad y enlace a su contenido correspondiente.
- Reconfigurar las categorías del seed para que reflejen mejor los ejes, manteniendo etiquetas accionables: “Educación y Divulgación”, “Investigación y Ciencia”, “Acción Legal”, “Redes y Cooperación”, “Acción Social”, “Institucional y Transparencia”.
- Vincular Peticiones a la Acción Legal/institucional, no presentarlas como una funcionalidad aislada.

### P1 — Agregar confianza institucional sin inventar datos

- Crear `/transparencia` con propósito fundacional, ejes, gobernanza, sostenibilidad y formas de colaborar. Incluir donaciones solo como CTA/comunicación, sin implementar pasarela de pago hasta decidir proveedor y cumplimiento legal.
- Crear `/participa` que agrupe firmar, crear petición, compartir noticias, voluntariado y alianzas.
- No inventar métricas de impacto, alianzas, resultados de campañas ni testimonios. Usar solo información presente en el repositorio.

### P2 — Refinar contenido para no diluir el foco

- Reducir o reubicar la sección de cetáceos y la “responsabilidad cósmica”; si se conservan, enmarcarlas como reflexión de marca y no como actividad fundacional central.
- Mantener la visión antiespecista, pero priorizar siempre invertebrados, ecosistemas y biodiversidad.
- Actualizar SEO, footer y enlaces rápidos para que reflejen Aprende, Qué hacemos, Participa y Transparencia.

## Cambios de rutas, interfaces y datos sugeridos

Estas son decisiones técnicas del diagnóstico; algunas ya están en implementación:

- Rutas públicas implementadas: `/investigacion` (hub de investigación) y `/aprende` (hub educativo).
- Rutas públicas propuestas para fases posteriores: `/que-hacemos`, `/participa` y `/transparencia`.
- Posible ampliación del modelo de contenido sin romper Noticias: agregar un enum o tipo de contenido (`RECURSO_EDUCATIVO`, `PROYECTO`, `EVENTO`, `ALIANZA`, `PROGRAMA`), o crear un modelo `recursoEducativo` con `titulo`, `slug`, `resumen`, `contenido`, `categoria`, `estado` y `fecha_publicacion`.
- Si se agregan donaciones, no acoplarlas a Peticiones ni Noticias; crear un flujo separado y solo después de definir proveedor de pago, requisitos legales y contabilidad de la fundación.

## Criterios de validación

- Cada eje de OBJETIVOS.md debe ser encontrable desde el home en uno o dos clics, con un lenguaje claro.
- La ruta principal de Educación debe llevar a una acción concreta de participación, no terminar en lectura pasiva.
- La navegación móvil debe seguir siendo operable con una sola mano y etiquetas explícitas, sin menús solo de iconos.
- El copy debe usar de forma consistente “insectos, arácnidos y otros invertebrados” y evitar afirmaciones no respaldadas.
- Las rutas nuevas deben tener metadata SEO, estados vacíos útiles y enlaces sin roturas.
- Las funcionalidades actuales de Peticiones, Noticias y Administración deben seguir funcionando después de reordenar navegación o categorías.
- No debe aparecer contenido inventado sobre impacto, aliados, métricas o resultados legales.

## Supuestos

- Se conserva la identidad visual actual; no se propone un rediseño de marca.
- La prioridad pública es Educación y Divulgación, según lo indicado.
- El plan está en fase de implementación: los cambios acordados se implementan y verifican en el repositorio, sin ejecutar build ni lint durante el desarrollo.
- Las nuevas secciones institucionales se resuelven primero como páginas estáticas o derivadas del contenido existente; los pagos y donaciones se tratan como comunicación hasta que exista una decisión legal y de proveedor.
- No se eliminan Peticiones ni Noticias; se reordenan y se conectan mejor con los objetivos fundacionales.
