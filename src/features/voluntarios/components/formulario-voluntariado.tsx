"use client";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Loader2,
  MailCheck,
  Send,
  Sparkles,
} from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { postularVoluntarioAction } from "../actions/postular-voluntario";
import {
  AREAS_VOLUNTARIADO,
  type CrearVoluntarioInput,
} from "../schemas/crear-voluntario.schema";

interface DatosConfirmados {
  nombre: string;
  correo: string;
  areas_interes: string[];
}

export const FormularioVoluntariado = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const [estadoEnvio, setEstadoEnvio] = useState<{
    tipo: "exito" | "duplicado" | null;
    mensaje: string;
    datos?: DatosConfirmados;
  }>({
    tipo: null,
    mensaje: "",
  });

  const [formData, setFormData] = useState<CrearVoluntarioInput>({
    nombre: "",
    correo: "",
    telefono: "",
    ciudad: "",
    profesion_ocupacion: "",
    areas_interes: [],
    disponibilidad: "",
    motivacion: "",
  });

  const handleToggleArea = (area: string) => {
    setFormData((prev) => {
      const exists = prev.areas_interes.includes(area);
      if (exists) {
        return {
          ...prev,
          areas_interes: prev.areas_interes.filter((a) => a !== area),
        };
      }
      return {
        ...prev,
        areas_interes: [...prev.areas_interes, area],
      };
    });
  };

  const handleReset = () => {
    setFormData({
      nombre: "",
      correo: "",
      telefono: "",
      ciudad: "",
      profesion_ocupacion: "",
      areas_interes: [],
      disponibilidad: "",
      motivacion: "",
    });
    setErrorEnvio(null);
    setEstadoEnvio({ tipo: null, mensaje: "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorEnvio(null);

    if (!formData.nombre.trim()) {
      const err = "Por favor ingresa tu nombre completo.";
      setErrorEnvio(err);
      toast.error(err);
      return;
    }
    if (!formData.correo.trim()) {
      const err = "Por favor ingresa un correo electrónico válido.";
      setErrorEnvio(err);
      toast.error(err);
      return;
    }
    if (formData.areas_interes.length === 0) {
      const err = "Selecciona al menos un área de interés para participar.";
      setErrorEnvio(err);
      toast.error(err);
      return;
    }
    if (!formData.motivacion.trim() || formData.motivacion.trim().length < 15) {
      const err = "Por favor describe tu motivación (mínimo 15 caracteres).";
      setErrorEnvio(err);
      toast.error(err);
      return;
    }

    startTransition(async () => {
      const res = await postularVoluntarioAction(formData);

      if (res.success) {
        if (res.isDuplicate) {
          setEstadoEnvio({
            tipo: "duplicado",
            mensaje:
              res.message ||
              "Ya has enviado una solicitud al voluntariado con este correo. Tu postulación está en revisión, te pedimos paciencia; pronto serás contactado.",
          });
          toast.info("Ya registramos una solicitud previa con este correo.");
        } else {
          setEstadoEnvio({
            tipo: "exito",
            mensaje:
              res.message ||
              "¡Gracias por tu postulación! Hemos recibido tus datos y te contactaremos a la brevedad.",
            datos: {
              nombre: res.voluntario?.nombre || formData.nombre,
              correo: res.voluntario?.correo || formData.correo,
              areas_interes:
                res.voluntario?.areas_interes || formData.areas_interes,
            },
          });
          toast.success("¡Postulación recibida con éxito!");
        }

        // Desplazamiento suave para enfocar el mensaje de respuesta
        setTimeout(() => {
          containerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 50);
      } else {
        const errorMsg =
          res.error ||
          "No se pudo procesar la postulación. Intenta nuevamente.";
        setErrorEnvio(errorMsg);
        toast.error(errorMsg);
      }
    });
  };

  // ── Pantalla de Duplicado (Ya envió solicitud) ──────────────────────────
  if (estadoEnvio.tipo === "duplicado") {
    return (
      <div
        ref={containerRef}
        className="rounded-2xl border border-tertiary/30 bg-surface p-8 md:p-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 shadow-lg"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-tertiary/10 border border-tertiary/20 shadow-inner">
          <Clock className="h-8 w-8 text-tertiary animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-tertiary/10 border border-tertiary/20 px-3 py-1 text-xs font-label uppercase tracking-widest text-tertiary font-bold">
            <Clock className="h-3 w-3" />
            <span>Postulación Previa en Revisión</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-headline font-bold text-on-background">
            Ya recibimos tu postulación
          </h3>
          <p className="text-on-surface-variant font-body text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            {estadoEnvio.mensaje}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-surface-container/50 border border-outline-variant/40 max-w-md mx-auto text-xs text-on-surface-variant text-left space-y-1.5">
          <p className="font-semibold text-on-background">¿Qué puedes hacer?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              Revisa tu bandeja de entrada o spam si no viste la confirmación.
            </li>
            <li>
              Si necesitas actualizar datos urgentes, escríbenos a{" "}
              <span className="text-tertiary font-medium">
                hola@masinsectos.org
              </span>
              .
            </li>
          </ul>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 text-xs font-label uppercase tracking-widest font-bold text-tertiary hover:underline cursor-pointer"
          >
            ← Volver al formulario
          </button>
        </div>
      </div>
    );
  }

  // ── Pantalla de Éxito ───────────────────────────────────────────────────
  if (estadoEnvio.tipo === "exito") {
    const { nombre, correo, areas_interes } = estadoEnvio.datos || formData;

    return (
      <div
        ref={containerRef}
        className="rounded-2xl border border-primary/30 bg-surface p-8 md:p-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300 shadow-xl relative overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 border border-primary/30 shadow-inner">
          <CheckCircle2 className="h-9 w-9 text-primary" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/25 px-3 py-1 text-xs font-label uppercase tracking-widest text-primary font-bold">
            <Sparkles className="h-3 w-3" />
            <span>Postulación Recibida con Éxito</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-headline font-bold text-on-background">
            ¡Gracias por sumarte, {nombre.split(" ")[0]}!
          </h3>
          <p className="text-on-surface-variant font-body text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Hemos registrado tu postulación en la Red de Voluntariado de
            Fundación Más Insectos.
          </p>
        </div>

        {/* Resumen de la postulación */}
        <div className="p-5 rounded-xl bg-surface-container/60 border border-outline-variant/50 max-w-lg mx-auto text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-label uppercase tracking-wider text-primary font-bold">
            <MailCheck className="h-4 w-4" />
            <span>Detalles del Registro</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-on-surface-variant block">Postulante:</span>
              <strong className="text-on-background font-medium">
                {nombre}
              </strong>
            </div>
            <div>
              <span className="text-on-surface-variant block">Correo:</span>
              <strong className="text-on-background font-medium break-all">
                {correo}
              </strong>
            </div>
          </div>

          {areas_interes.length > 0 && (
            <div className="pt-1 border-t border-outline-variant/30">
              <span className="text-on-surface-variant text-xs block mb-1.5">
                Áreas seleccionadas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {areas_interes.map((area) => (
                  <span
                    key={area}
                    className="inline-block px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-[11px] font-medium"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Próximos Pasos */}
        <div className="max-w-lg mx-auto text-left p-4 rounded-xl bg-surface-container/30 border border-outline-variant/30 space-y-2">
          <h4 className="text-xs font-label uppercase tracking-wider font-bold text-on-background">
            ¿Qué sucede ahora?
          </h4>
          <ol className="text-xs text-on-surface-variant space-y-1.5 list-decimal list-inside leading-relaxed">
            <li>
              <strong>Acuse de recibo:</strong> Enviamos una confirmación a tu
              correo (revisa también tu carpeta de spam).
            </li>
            <li>
              <strong>Revisión:</strong> El equipo coordina las brigadas según
              los proyectos e iniciativas activas.
            </li>
            <li>
              <strong>Contacto e inducción:</strong> Te escribiremos para
              coordinar tu bienvenida e integración.
            </li>
          </ol>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/25 hover:bg-primary/20 text-primary px-6 py-2.5 text-xs font-label uppercase tracking-widest font-bold transition-colors cursor-pointer"
          >
            Enviar otra postulación
          </button>
        </div>
      </div>
    );
  }

  // ── Formulario Activo ───────────────────────────────────────────────────
  return (
    <div ref={containerRef} className="relative">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-outline-variant/60 bg-surface p-6 md:p-10 backdrop-blur-sm shadow-md"
      >
        <div className="border-b border-outline-variant/40 pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/15 text-primary">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-headline font-bold text-on-background">
                Formulario de Postulación a Voluntariado
              </h3>
              <p className="text-xs text-on-surface-variant font-body">
                Únete a nuestras brigadas de educación, ciencia, leyes y
                territorio.
              </p>
            </div>
          </div>
        </div>

        {errorEnvio && (
          <div className="flex items-center gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400 text-sm animate-in fade-in duration-200">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="font-medium">{errorEnvio}</p>
          </div>
        )}

        <fieldset
          disabled={isPending}
          className="space-y-6 disabled:opacity-70 transition-opacity"
        >
          {/* Datos Personales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="nombre"
                className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-medium"
              >
                Nombre Completo <span className="text-primary">*</span>
              </label>
              <input
                id="nombre"
                type="text"
                required
                value={formData.nombre}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nombre: e.target.value }))
                }
                placeholder="Ej: Camila Soto Rivas"
                className="w-full rounded-xl border border-outline-variant bg-surface-container/50 px-4 py-2.5 text-sm text-on-background placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="correo"
                className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-medium"
              >
                Correo Electrónico <span className="text-primary">*</span>
              </label>
              <input
                id="correo"
                type="email"
                required
                value={formData.correo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, correo: e.target.value }))
                }
                placeholder="ejemplo@correo.cl"
                className="w-full rounded-xl border border-outline-variant bg-surface-container/50 px-4 py-2.5 text-sm text-on-background placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="telefono"
                className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-medium"
              >
                Teléfono / WhatsApp (Opcional)
              </label>
              <input
                id="telefono"
                type="tel"
                value={formData.telefono || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, telefono: e.target.value }))
                }
                placeholder="+56 9 1234 5678"
                className="w-full rounded-xl border border-outline-variant bg-surface-container/50 px-4 py-2.5 text-sm text-on-background placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="ciudad"
                className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-medium"
              >
                Ciudad / Región
              </label>
              <input
                id="ciudad"
                type="text"
                value={formData.ciudad || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, ciudad: e.target.value }))
                }
                placeholder="Ej: Temuco, La Araucanía / Santiago / Valparaíso"
                className="w-full rounded-xl border border-outline-variant bg-surface-container/50 px-4 py-2.5 text-sm text-on-background placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
          </div>

          {/* Profesión & Disponibilidad */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="profesion"
                className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-medium"
              >
                Ocupación / Profesión / Área de estudio
              </label>
              <input
                id="profesion"
                type="text"
                value={formData.profesion_ocupacion || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    profesion_ocupacion: e.target.value,
                  }))
                }
                placeholder="Ej: Biología, Derecho, Estudiante, Diseño, etc."
                className="w-full rounded-xl border border-outline-variant bg-surface-container/50 px-4 py-2.5 text-sm text-on-background placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="disponibilidad"
                className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-medium"
              >
                Disponibilidad estimada
              </label>
              <input
                id="disponibilidad"
                type="text"
                value={formData.disponibilidad || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    disponibilidad: e.target.value,
                  }))
                }
                placeholder="Ej: 2-4 hrs semanales, Fines de semana, Remoto"
                className="w-full rounded-xl border border-outline-variant bg-surface-container/50 px-4 py-2.5 text-sm text-on-background placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>
          </div>

          {/* Áreas de Interés */}
          <div className="space-y-2.5">
            <label
              htmlFor="areas"
              className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-medium block"
            >
              Áreas en las que te gustaría participar{" "}
              <span className="text-primary">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {AREAS_VOLUNTARIADO.map((area) => {
                const isSelected = formData.areas_interes.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => handleToggleArea(area)}
                    className={`text-xs px-3.5 py-2 rounded-xl border font-label font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-primary text-on-primary border-primary shadow-sm"
                        : "bg-surface-container/50 text-on-surface-variant border-outline-variant hover:border-primary/40 hover:text-on-background"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {area}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Motivación */}
          <div className="space-y-1.5">
            <label
              htmlFor="motivacion"
              className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-medium"
            >
              ¿Por qué te gustaría ser voluntario en Fundación + Insectos?{" "}
              <span className="text-primary">*</span>
            </label>
            <textarea
              id="motivacion"
              required
              rows={3}
              value={formData.motivacion}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, motivacion: e.target.value }))
              }
              placeholder="Cuéntanos tus intereses, experiencias previas o cómo te gustaría aportar a la protección de los invertebrados..."
              className="w-full rounded-xl border border-outline-variant bg-surface-container/50 px-4 py-2.5 text-sm text-on-background placeholder:text-on-surface-variant/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-y"
            />
          </div>

          {/* Botón de Envío */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-on-primary px-8 py-3.5 font-label uppercase tracking-widest text-xs font-bold hover:bg-primary-fixed-dim transition-[background-color,transform] duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Enviando postulación...</span>
                </>
              ) : (
                <>
                  <span>Enviar Postulación</span>
                  <Send className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
