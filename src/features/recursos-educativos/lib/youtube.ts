const YOUTUBE_URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:[?&#].*)?$/;

export function extraerVideoIdYoutube(url: string): string | null {
  if (typeof url !== "string") return null;
  const match = url.trim().match(YOUTUBE_URL_REGEX);
  return match?.[1] ?? null;
}

export function esUrlYoutubeValida(url: string): boolean {
  return extraerVideoIdYoutube(url) !== null;
}

let apiPromise: Promise<void> | null = null;

export function cargarApiYouTube(): Promise<void> {
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(
        new Error("La API de YouTube solo está disponible en el navegador"),
      );
      return;
    }

    if (window.YT?.Player) {
      resolve();
      return;
    }

    const scriptExistente = document.getElementById("youtube-iframe-api");
    if (scriptExistente) {
      window.onYouTubeIframeAPIReady = () => resolve();
      return;
    }

    window.onYouTubeIframeAPIReady = () => resolve();

    const script = document.createElement("script");
    script.id = "youtube-iframe-api";
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => {
      apiPromise = null;
      reject(new Error("No se pudo cargar la API de YouTube"));
    };
    document.head.appendChild(script);
  });

  return apiPromise;
}
