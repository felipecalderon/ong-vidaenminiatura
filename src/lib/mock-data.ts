// Mock data basado en el esquema de Prisma para la fundación de insectos y arácnidos

export type Rol = "USUARIO" | "AUTOR" | "ADMINISTRADOR";
export type EstadoUsuario = "ACTIVO" | "SUSPENDIDO";
export type EstadoPeticion = "BORRADOR" | "PUBLICADA" | "CERRADA" | "ARCHIVADA";
export type EstadoNoticia = "BORRADOR" | "PUBLICADA" | "ARCHIVADA";

export interface Usuario {
  id: string;
  auth0_id: string;
  correo: string;
  nombre: string;
  nickname?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  email_verified?: boolean;
  rol: Rol;
  estado: EstadoUsuario;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface Categoria {
  id: string;
  nombre: string;
  slug: string;
  descripcion?: string;
  color?: string;
  activo: boolean;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
}

export interface Peticion {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  imagen: string;
  estado: EstadoPeticion;
  cantidad_firmas: number;
  meta_firmas: number;
  categoria_id: string;
  usuario_id: string;
  fecha_publicacion?: Date;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  categoria?: Categoria;
  usuario?: Usuario;
}

export interface Firma {
  id: string;
  usuario_id: string;
  peticion_id: string;
  fecha_creacion: Date;
  usuario?: Usuario;
  peticion?: Peticion;
}

export interface Noticia {
  id: string;
  titulo: string;
  slug: string;
  resumen: string;
  contenido: string;
  imagen: string;
  estado: EstadoNoticia;
  categoria_id: string;
  autor_id: string;
  fecha_publicacion?: Date;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  categoria?: Categoria;
  autor?: Usuario;
}

// Datos mock
export const usuarios: Usuario[] = [
  {
    id: "1",
    auth0_id: "auth0|1",
    correo: "maria@insectos.org",
    nombre: "María García",
    nickname: "mariag",
    picture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rol: "ADMINISTRADOR",
    estado: "ACTIVO",
    fecha_creacion: new Date("2024-01-01"),
    fecha_actualizacion: new Date("2024-01-01"),
  },
  {
    id: "2",
    auth0_id: "auth0|2",
    correo: "carlos@insectos.org",
    nombre: "Carlos Mendoza",
    nickname: "carlosm",
    picture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rol: "AUTOR",
    estado: "ACTIVO",
    fecha_creacion: new Date("2024-02-15"),
    fecha_actualizacion: new Date("2024-02-15"),
  },
  {
    id: "3",
    auth0_id: "auth0|3",
    correo: "ana@gmail.com",
    nombre: "Ana Rodríguez",
    nickname: "anar",
    picture:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rol: "USUARIO",
    estado: "ACTIVO",
    fecha_creacion: new Date("2024-03-10"),
    fecha_actualizacion: new Date("2024-03-10"),
  },
];

export const categorias: Categoria[] = [
  {
    id: "1",
    nombre: "Abejas y Polinizadores",
    slug: "abejas-polinizadores",
    descripcion: "Protección de abejas, abejorros y otros polinizadores",
    color: "#FFD700",
    activo: true,
    fecha_creacion: new Date("2024-01-01"),
    fecha_actualizacion: new Date("2024-01-01"),
  },
  {
    id: "2",
    nombre: "Mariposas",
    slug: "mariposas",
    descripcion: "Conservación de mariposas y polillas",
    color: "#FF6B6B",
    activo: true,
    fecha_creacion: new Date("2024-01-01"),
    fecha_actualizacion: new Date("2024-01-01"),
  },
  {
    id: "3",
    nombre: "Arañas y Arácnidos",
    slug: "aranas-aracnidos",
    descripcion: "Protección de arañas, escorpiones y otros arácnidos",
    color: "#8B4513",
    activo: true,
    fecha_creacion: new Date("2024-01-01"),
    fecha_actualizacion: new Date("2024-01-01"),
  },
  {
    id: "4",
    nombre: "Hábitat Natural",
    slug: "habitat-natural",
    descripcion: "Preservación de ecosistemas y hábitats de insectos",
    color: "#228B22",
    activo: true,
    fecha_creacion: new Date("2024-01-01"),
    fecha_actualizacion: new Date("2024-01-01"),
  },
  {
    id: "5",
    nombre: "Pesticidas y Químicos",
    slug: "pesticidas-quimicos",
    descripcion: "Lucha contra el uso de pesticidas dañinos",
    color: "#DC143C",
    activo: true,
    fecha_creacion: new Date("2024-01-01"),
    fecha_actualizacion: new Date("2024-01-01"),
  },
];

export const peticiones: Peticion[] = [
  {
    id: "1",
    titulo: "Prohibir pesticidas neonicotinoides en toda la región",
    slug: "prohibir-pesticidas-neonicotinoides",
    resumen:
      "Los neonicotinoides están matando a millones de abejas cada año. Exigimos su prohibición inmediata para proteger a nuestros polinizadores.",
    contenido: `Los pesticidas neonicotinoides representan una de las mayores amenazas para las poblaciones de abejas y otros polinizadores en todo el mundo. Estos químicos, utilizados ampliamente en la agricultura, afectan directamente el sistema nervioso de los insectos, causando desorientación, parálisis y muerte.

Estudios científicos han demostrado que incluso en dosis subletales, los neonicotinoides:
- Reducen la capacidad de las abejas para navegar y encontrar su colmena
- Afectan la reproducción y el desarrollo de las colonias
- Debilitan el sistema inmunológico de los insectos
- Persisten en el suelo y el agua durante años

Por estas razones, exigimos a las autoridades:
1. La prohibición total del uso de neonicotinoides en agricultura
2. Programas de apoyo para agricultores en la transición a métodos sostenibles
3. Mayor inversión en investigación de alternativas seguras
4. Monitoreo constante de las poblaciones de polinizadores`,
    imagen:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    cantidad_firmas: 12543,
    meta_firmas: 15000,
    categoria_id: "5",
    usuario_id: "1",
    fecha_publicacion: new Date("2024-06-01"),
    fecha_creacion: new Date("2024-05-28"),
    fecha_actualizacion: new Date("2024-06-15"),
  },
  {
    id: "2",
    titulo: "Crear corredores ecológicos para mariposas monarca",
    slug: "corredores-ecologicos-mariposas-monarca",
    resumen:
      "La mariposa monarca está en peligro. Necesitamos crear corredores de plantas nativas para asegurar su ruta migratoria.",
    contenido: `La mariposa monarca, símbolo de la naturaleza migratoria, enfrenta una crisis sin precedentes. Su población ha disminuido más del 80% en las últimas décadas debido a la pérdida de hábitat y el uso de pesticidas.

Esta petición busca establecer una red de corredores ecológicos que incluyan:
- Plantación de algodoncillo (asclepias), la única planta donde las monarcas depositan sus huevos
- Flores nativas que proporcionen néctar durante toda la temporada
- Zonas de descanso protegidas en puntos clave de la ruta migratoria
- Áreas de reproducción libres de pesticidas

Tu firma ayudará a:
- Proteger una especie icónica de nuestra biodiversidad
- Mantener los servicios de polinización que benefician a la agricultura
- Educar a las comunidades sobre la importancia de los insectos
- Crear espacios verdes que beneficien a múltiples especies`,
    imagen:
      "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    cantidad_firmas: 8921,
    meta_firmas: 10000,
    categoria_id: "2",
    usuario_id: "2",
    fecha_publicacion: new Date("2024-07-10"),
    fecha_creacion: new Date("2024-07-05"),
    fecha_actualizacion: new Date("2024-07-20"),
  },
  {
    id: "3",
    titulo: "Proteger los hábitats de tarántulas en zonas rurales",
    slug: "proteger-habitats-tarantulas",
    resumen:
      "Las tarántulas son depredadores esenciales que controlan plagas. Sus hábitats están siendo destruidos por la urbanización.",
    contenido: `Las tarántulas, a pesar de su apariencia intimidante, son aliadas cruciales en el control natural de plagas. Estos arácnidos ayudan a mantener el equilibrio ecológico al alimentarse de insectos que pueden ser perjudiciales para los cultivos.

Sin embargo, la expansión urbana y la agricultura intensiva están destruyendo sus hábitats naturales a un ritmo alarmante. Esta petición solicita:

1. Designar áreas protegidas para especies de tarántulas endémicas
2. Implementar regulaciones de construcción que respeten los ecosistemas
3. Crear programas de educación para reducir el miedo injustificado hacia estos arácnidos
4. Prohibir la captura y venta de tarántulas silvestres

Las tarántulas pueden vivir hasta 30 años y son indicadores importantes de la salud del ecosistema. Protegerlas significa proteger toda la cadena alimenticia de la que forman parte.`,
    imagen:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    cantidad_firmas: 3456,
    meta_firmas: 5000,
    categoria_id: "3",
    usuario_id: "3",
    fecha_publicacion: new Date("2024-08-05"),
    fecha_creacion: new Date("2024-08-01"),
    fecha_actualizacion: new Date("2024-08-10"),
  },
  {
    id: "4",
    titulo: "Incluir la educación sobre insectos en el currículo escolar",
    slug: "educacion-insectos-escuelas",
    resumen:
      "Los niños deben aprender sobre la importancia de los insectos desde temprana edad para cambiar la percepción negativa que existe.",
    contenido: `La entomofobia (miedo a los insectos) es uno de los miedos más comunes, pero es aprendido, no innato. Muchos niños comienzan con curiosidad natural hacia los insectos hasta que los adultos les transmiten sus propios temores.

Proponemos incluir en el currículo escolar:

- Unidades sobre la importancia ecológica de los insectos
- Proyectos de observación de insectos locales
- Visitas a jardines de polinizadores y apiarios educativos
- Materiales que presenten a los insectos de manera positiva

Beneficios de esta educación:
- Futuros ciudadanos más conscientes del medio ambiente
- Reducción de la matanza innecesaria de insectos beneficiosos
- Mayor apoyo a políticas de conservación
- Posibles vocaciones en entomología y conservación`,
    imagen:
      "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    cantidad_firmas: 15234,
    meta_firmas: 20000,
    categoria_id: "1",
    usuario_id: "1",
    fecha_publicacion: new Date("2024-04-15"),
    fecha_creacion: new Date("2024-04-10"),
    fecha_actualizacion: new Date("2024-05-01"),
  },
  {
    id: "5",
    titulo: "Crear el primer santuario de abejas nativas en la ciudad",
    slug: "santuario-abejas-nativas",
    resumen:
      "Las abejas nativas necesitan espacios urbanos protegidos. Propongamos el primer santuario dedicado exclusivamente a su conservación.",
    contenido: `Mientras las abejas melíferas reciben mucha atención, las abejas nativas solitarias son igual de importantes para la polinización y están siendo olvidadas. Muchas especies de abejas nativas están en peligro de extinción.

Este santuario incluiría:
- Hoteles para abejas solitarias
- Jardines con plantas nativas de floración escalonada
- Áreas de anidación con diferentes tipos de suelo
- Centro de investigación y monitoreo
- Espacios educativos para visitantes

Las abejas nativas:
- Polinizan cultivos específicos mejor que las abejas melíferas
- No producen miel pero son esenciales para la biodiversidad
- Son generalmente dóciles y rara vez pican
- Necesitan recursos diferentes a las abejas de colmena`,
    imagen:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    cantidad_firmas: 6789,
    meta_firmas: 8000,
    categoria_id: "1",
    usuario_id: "2",
    fecha_publicacion: new Date("2024-09-01"),
    fecha_creacion: new Date("2024-08-25"),
    fecha_actualizacion: new Date("2024-09-05"),
  },
  {
    id: "6",
    titulo: "Detener la deforestación en el bosque de las luciérnagas",
    slug: "proteger-bosque-luciernagas",
    resumen:
      "El único bosque conocido donde miles de luciérnagas se congregan está amenazado por un proyecto de desarrollo inmobiliario.",
    contenido: `El Bosque de las Luciérnagas es un fenómeno natural único donde miles de estos insectos bioluminiscentes crean un espectáculo nocturno impresionante. Sin embargo, un proyecto de desarrollo inmobiliario amenaza con destruir este ecosistema irreemplazable.

Las luciérnagas:
- Requieren condiciones muy específicas de humedad y oscuridad
- Son extremadamente sensibles a la contaminación lumínica
- Tardan varios años en desarrollarse desde larva hasta adulto
- No pueden migrar a otros lugares si su hábitat es destruido

Exigimos:
1. La cancelación inmediata del proyecto de desarrollo
2. Declarar el área como reserva natural protegida
3. Implementar regulaciones de iluminación en áreas circundantes
4. Crear un programa de ecoturismo sostenible que beneficie a la comunidad local`,
    imagen:
      "https://images.unsplash.com/photo-1621278401803-d7cb95ad6fe9?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    cantidad_firmas: 21456,
    meta_firmas: 25000,
    categoria_id: "4",
    usuario_id: "1",
    fecha_publicacion: new Date("2024-03-20"),
    fecha_creacion: new Date("2024-03-15"),
    fecha_actualizacion: new Date("2024-04-01"),
  },
];

export const noticias: Noticia[] = [
  {
    id: "1",
    titulo: "Descubren nueva especie de abeja en el Amazonas",
    slug: "nueva-especie-abeja-amazonas",
    resumen:
      "Científicos han identificado una nueva especie de abeja con propiedades de polinización únicas que podría ser clave para la conservación.",
    contenido: `Un equipo de entomólogos ha descubierto una nueva especie de abeja en las profundidades del Amazonas brasileño. La especie, provisionalmente llamada"Apis amazonica", presenta características únicas que la distinguen de cualquier otra abeja conocida.

## Características únicas

La nueva especie tiene un patrón de coloración iridiscente que los científicos creen que podría estar relacionado con la comunicación entre individuos. Además, su lengua es significativamente más larga que la de otras abejas, permitiéndole acceder al néctar de flores que otras especies no pueden polinizar.

## Importancia para la conservación

"Este descubrimiento nos recuerda cuánto nos falta por conocer sobre la biodiversidad de nuestro planeta", comentó la Dra. Elena Vásquez, líder del equipo de investigación."Cada nueva especie que encontramos es una pieza más del rompecabezas ecológico".

## Próximos pasos

El equipo planea realizar estudios más detallados sobre el comportamiento y la ecología de esta nueva especie para entender mejor su papel en el ecosistema amazónico.`,
    imagen:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    categoria_id: "1",
    autor_id: "2",
    fecha_publicacion: new Date("2024-09-15"),
    fecha_creacion: new Date("2024-09-14"),
    fecha_actualizacion: new Date("2024-09-15"),
  },
  {
    id: "2",
    titulo: "Victoria: se prohíben tres pesticidas dañinos para las abejas",
    slug: "prohibicion-pesticidas-abejas",
    resumen:
      "Después de años de campaña, el gobierno anuncia la prohibición de tres neonicotinoides que estaban devastando las poblaciones de abejas.",
    contenido: `En una victoria histórica para los defensores del medio ambiente, el Ministerio de Agricultura ha anunciado la prohibición total de tres pesticidas neonicotinoides que científicos habían identificado como extremadamente dañinos para las abejas y otros polinizadores.

## Los pesticidas prohibidos

Los tres químicos prohibidos son:
- Imidacloprid
- Clothianidin 
- Thiamethoxam

Estos compuestos habían sido vinculados con el síndrome de colapso de colonias que ha diezmado las poblaciones de abejas en todo el mundo.

## Reacciones

"Esta es una victoria que costó años de trabajo, miles de firmas y la persistencia de muchos activistas", declaró María García, directora de la Fundación Insectos Vivos."Pero es solo el comienzo. Debemos seguir luchando por alternativas más seguras".

## Implementación

La prohibición entrará en vigor en seis meses, dando tiempo a los agricultores para adaptarse a métodos de control de plagas más sostenibles.`,
    imagen:
      "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    categoria_id: "5",
    autor_id: "1",
    fecha_publicacion: new Date("2024-09-10"),
    fecha_creacion: new Date("2024-09-09"),
    fecha_actualizacion: new Date("2024-09-10"),
  },
  {
    id: "3",
    titulo: "Guía completa: Cómo crear un jardín amigable para polinizadores",
    slug: "guia-jardin-polinizadores",
    resumen:
      "Todo lo que necesitas saber para transformar tu jardín en un refugio para abejas, mariposas y otros insectos beneficiosos.",
    contenido: `¿Quieres ayudar a los polinizadores desde tu propio hogar? Crear un jardín amigable para estos insectos es más fácil de lo que piensas y puede hacer una gran diferencia en tu comunidad.

## Plantas recomendadas

### Para abejas:
- Lavanda
- Romero
- Salvia
- Girasoles
- Tomillo

### Para mariposas:
- Buddleja (arbusto de las mariposas)
- Lantana
- Zinnia
- Verbena
- Equinácea

## Consejos importantes

1. **Evita los pesticidas**: Incluso los productos"orgánicos"pueden ser dañinos para los insectos.
2. **Proporciona agua**: Un plato poco profundo con piedras donde los insectos puedan posarse.
3. **Deja áreas"desordenadas"**: Los insectos necesitan lugares para anidar y refugiarse.
4. **Planta en grupos**: Las abejas y mariposas prefieren grandes manchas de la misma flor.

## Hoteles para insectos

Considera instalar un"hotel de insectos"con tubos de bambú y bloques de madera perforados para las abejas solitarias.`,
    imagen:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    categoria_id: "4",
    autor_id: "2",
    fecha_publicacion: new Date("2024-09-05"),
    fecha_creacion: new Date("2024-09-04"),
    fecha_actualizacion: new Date("2024-09-05"),
  },
  {
    id: "4",
    titulo: "Las arañas: aliadas incomprendidas en el control de plagas",
    slug: "aranas-control-plagas",
    resumen:
      "Un nuevo estudio revela que las arañas eliminan más insectos dañinos que todos los pesticidas combinados.",
    contenido: `Un estudio publicado en la revista Science of Nature ha revelado datos sorprendentes sobre el papel de las arañas en el control natural de plagas. Los investigadores estiman que las arañas del mundo consumen entre 400 y 800 millones de toneladas de insectos al año.

## Resultados del estudio

- Las arañas son responsables de controlar poblaciones de mosquitos, moscas y otros insectos vectores de enfermedades
- En áreas agrícolas, reducen significativamente las plagas que dañan los cultivos
- Su presencia está correlacionada con ecosistemas más saludables

## Cambiando percepciones

"La aracnofobia es uno de los miedos más comunes, pero está basada en malentendidos", explica el Dr. Roberto Sánchez, coautor del estudio."La mayoría de las arañas son completamente inofensivas para los humanos y extremadamente beneficiosas".

## Cómo convivir con arañas

- No las mates si las encuentras en casa - usa un vaso para sacarlas afuera
- Aprende a identificar las pocas especies que pueden ser peligrosas
- Aprecia su trabajo silencioso controlando moscas y mosquitos`,
    imagen:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    categoria_id: "3",
    autor_id: "1",
    fecha_publicacion: new Date("2024-08-28"),
    fecha_creacion: new Date("2024-08-27"),
    fecha_actualizacion: new Date("2024-08-28"),
  },
  {
    id: "5",
    titulo: "Alerta: La población de mariposas monarca cae un 22% este año",
    slug: "caida-poblacion-mariposas-monarca",
    resumen:
      "Los últimos censos muestran una preocupante disminución en la migración de mariposas monarca hacia los santuarios de invierno.",
    contenido: `Los resultados del censo anual de mariposas monarca en sus santuarios de invierno mexicanos muestran una disminución del 22% respecto al año anterior, encendiendo las alarmas entre los conservacionistas.

## Causas identificadas

Los científicos señalan varios factores contribuyentes:
- **Pérdida de hábitat**: La destrucción de plantas de algodoncillo continúa
- **Cambio climático**: Eventos climáticos extremos durante la migración
- **Pesticidas**: El uso de herbicidas elimina las plantas que necesitan las orugas

## Impacto a largo plazo

"Si esta tendencia continúa, podríamos ver la desaparición funcional de la migración monarca en las próximas décadas", advierte la bióloga Carmen López.

## Qué puedes hacer

- Planta algodoncillo nativo en tu jardín
- Firma peticiones para proteger los corredores migratorios
- Participa en programas de ciencia ciudadana para monitorear poblaciones
- Dona a organizaciones de conservación de mariposas`,
    imagen:
      "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    categoria_id: "2",
    autor_id: "2",
    fecha_publicacion: new Date("2024-08-20"),
    fecha_creacion: new Date("2024-08-19"),
    fecha_actualizacion: new Date("2024-08-20"),
  },
  {
    id: "6",
    titulo: "Éxito: El santuario de luciérnagas será protegido permanentemente",
    slug: "santuario-luciernagas-protegido",
    resumen:
      "Gracias a más de 20,000 firmas, el gobierno ha declarado el Bosque de las Luciérnagas como área natural protegida.",
    contenido: `En una emotiva ceremonia, el Ministro de Medio Ambiente firmó el decreto que establece el Bosque de las Luciérnagas como Área Natural Protegida, garantizando su conservación para las futuras generaciones.

## El poder de la acción colectiva

La petición"Detener la deforestación en el bosque de las luciérnagas"reunió más de 21,000 firmas en nuestra plataforma, lo que llamó la atención de los medios nacionales e internacionales.

## Qué significa esta protección

- Prohibición total de desarrollo urbano en la zona
- Regulaciones estrictas de iluminación artificial
- Creación de un fondo para investigación y conservación
- Programa de ecoturismo controlado que beneficiará a las comunidades locales

## Mensaje de agradecimiento

"Cada firma contó. Cada persona que compartió la petición contribuyó a este logro", expresó María García en representación de todos los activistas."Esto demuestra que juntos podemos proteger nuestro patrimonio natural".

## El trabajo continúa

Aunque celebramos esta victoria, recordamos que hay muchas otras batallas por librar. Mantente atento a nuevas peticiones y sigue apoyando la conservación de nuestros insectos.`,
    imagen:
      "https://images.unsplash.com/photo-1621278401803-d7cb95ad6fe9?w=800&h=400&fit=crop",
    estado: "PUBLICADA",
    categoria_id: "4",
    autor_id: "1",
    fecha_publicacion: new Date("2024-09-18"),
    fecha_creacion: new Date("2024-09-17"),
    fecha_actualizacion: new Date("2024-09-18"),
  },
];

// Helper functions
export function getPeticionWithRelations(
  peticionId: string,
): Peticion | undefined {
  const peticion = peticiones.find((p) => p.id === peticionId);
  if (!peticion) return undefined;

  return {
    ...peticion,
    categoria: categorias.find((c) => c.id === peticion.categoria_id),
    usuario: usuarios.find((u) => u.id === peticion.usuario_id),
  };
}

export function getNoticiaWithRelations(
  noticiaId: string,
): Noticia | undefined {
  const noticia = noticias.find((n) => n.id === noticiaId);
  if (!noticia) return undefined;

  return {
    ...noticia,
    categoria: categorias.find((c) => c.id === noticia.categoria_id),
    autor: usuarios.find((u) => u.id === noticia.autor_id),
  };
}

export function getPeticionBySlug(slug: string): Peticion | undefined {
  const peticion = peticiones.find((p) => p.slug === slug);
  if (!peticion) return undefined;

  return {
    ...peticion,
    categoria: categorias.find((c) => c.id === peticion.categoria_id),
    usuario: usuarios.find((u) => u.id === peticion.usuario_id),
  };
}

export function getNoticiaBySlug(slug: string): Noticia | undefined {
  const noticia = noticias.find((n) => n.slug === slug);
  if (!noticia) return undefined;

  return {
    ...noticia,
    categoria: categorias.find((c) => c.id === noticia.categoria_id),
    autor: usuarios.find((u) => u.id === noticia.autor_id),
  };
}

export function getPeticionesPublicadas(): Peticion[] {
  return peticiones
    .filter((p) => p.estado === "PUBLICADA")
    .map((p) => ({
      ...p,
      categoria: categorias.find((c) => c.id === p.categoria_id),
      usuario: usuarios.find((u) => u.id === p.usuario_id),
    }))
    .sort(
      (a, b) =>
        (b.fecha_publicacion?.getTime() || 0) -
        (a.fecha_publicacion?.getTime() || 0),
    );
}

export function getNoticiasPublicadas(): Noticia[] {
  return noticias
    .filter((n) => n.estado === "PUBLICADA")
    .map((n) => ({
      ...n,
      categoria: categorias.find((c) => c.id === n.categoria_id),
      autor: usuarios.find((u) => u.id === n.autor_id),
    }))
    .sort(
      (a, b) =>
        (b.fecha_publicacion?.getTime() || 0) -
        (a.fecha_publicacion?.getTime() || 0),
    );
}
