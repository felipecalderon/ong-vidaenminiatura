"use server";

import openai from "@/lib/openai";

const SYSTEM_PROMPT = `Eres editor SEO de un medio digital.

Genera un extracto para la noticia siguiendo estrictamente estas reglas:

- Entre 30 y 40 palabras.
- Debe resumir el hecho principal.
- No incluir opiniones ni especulación.
- No repetir el titular.
- Escribir en español neutro.
- Optimizar para SEO usando naturalmente la palabra clave principal.
- No usar comillas.
- No comenzar con "La noticia trata sobre" ni similares.`;

interface GenerarExtractoInput {
  titulo: string;
  contenido: string;
}

interface GenerarExtractoResult {
  success: true;
  extracto: string;
}

interface GenerarExtractoError {
  success: false;
  error: string;
}

export type GenerarExtractoResult2 =
  | GenerarExtractoResult
  | GenerarExtractoError;

export async function generarExtractoAction(
  input: GenerarExtractoInput,
): Promise<GenerarExtractoResult | GenerarExtractoError> {
  const { titulo, contenido } = input;

  if (!titulo?.trim() || !contenido?.trim()) {
    return {
      success: false,
      error:
        "El título y el contenido son requeridos para generar el extracto.",
    };
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 120,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Título: ${titulo}\n\nContenido:\n${contenido}`,
        },
      ],
    });

    const extracto = response.choices[0]?.message?.content?.trim();

    if (!extracto) {
      return {
        success: false,
        error: "La IA no devolvió un extracto válido. Intenta de nuevo.",
      };
    }

    return { success: true, extracto };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error al contactar la IA.";
    return { success: false, error: message };
  }
}
