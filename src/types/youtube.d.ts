interface YTPlayerOptions {
  videoId: string;
  playerVars?: Record<string, string | number | boolean | undefined>;
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
  };
}

interface YTPlayer {
  destroy(): void;
  playVideo(): void;
}

interface Window {
  YT?: {
    Player: new (
      element: HTMLElement | string,
      options: YTPlayerOptions,
    ) => YTPlayer;
  };
  onYouTubeIframeAPIReady?: () => void;
}
