export const ResponsabilidadSection = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-outline-variant/60 bg-linear-to-br from-surface-container/60 via-surface/40 to-surface-container/30 p-8 md:p-12 backdrop-blur-sm">
      <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-tertiary/5 blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-xs font-label uppercase tracking-[0.15em] text-primary">
          Un deber universal
        </h2>

        <p className="text-lg md:text-xl lg:text-2xl font-headline font-black tracking-tight text-on-background leading-relaxed">
          Cada organismo es una ventana única que observa el universo. Cuando
          destruimos un ecosistema, extinguimos una especie o cuando nosotros
          mismos nos desconectamos de nuestros sentidos por el ruido y las
          pantallas, estamos cerrando ventanas.{" "}
          <span className="bg-linear-to-r from-primary to-tertiary bg-clip-text text-transparent">
            Estamos dejando al universo cada vez más ciego de sí mismo.
          </span>
        </p>

        <div className="h-px w-16 bg-outline-variant mx-auto my-6" />

        <p className="text-sm md:text-base text-on-surface-variant font-body leading-relaxed max-w-xl mx-auto">
          Solemos decir <i>Vamos al bosque a desconectarnos</i> pero la realidad
          es que día a día vivimos desconectados, nuestro subconsciente busca
          volver a la naturaleza para{" "}
          <strong>
            reconectar nuestra mente con el universo y la realidad...
          </strong>
        </p>
      </div>
    </section>
  );
};
