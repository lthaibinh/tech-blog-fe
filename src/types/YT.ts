export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

export enum PlayerError {
  InvalidParam = 2,
  Html5Error = 5,
  VideoNotFound = 100,
  EmbeddingNotAllowed = 101,
  EmbeddingNotAllowed2 = 150,
}

export enum AutoHide {
  AlwaysVisible = 0,
  HideAllControls = 1,
  HideProgressBar = 2,
}

export enum AutoPlay {
  NoAutoPlay = 0,
  AutoPlay = 1,
}

export enum ClosedCaptionsLoadPolicy {
  UserDefault = 0,
  ForceOn = 1,
}

export type ProgressBarColor = "red" | "white";

export enum Controls {
  Hide = 0,
  ShowLoadPlayer = 1,
  ShowDelayLoadPlayer = 2,
}

export enum KeyboardControls {
  Enable = 0,
  Disable = 1,
}

export enum JsApi {
  Disable = 0,
  Enable = 1,
}

export enum FullscreenButton {
  Hide = 0,
  Show = 1,
}

export enum IvLoadPolicy {
  Show = 1,
  Hide = 3,
}

export type ListType = "search" | "user_uploads" | "playlist";

export enum Loop {
  SinglePlay = 0,
  Loop = 1,
}

export enum ModestBranding {
  Full = 0,
  Modest = 1,
}

export enum Mute {
  NotMuted = 0,
  Muted = 1,
}

export enum PlaysInline {
  Fullscreen = 0,
  Inline = 1,
}

export enum RelatedVideos {
  Hide = 0,
  Show = 1,
}

export enum ShowInfo {
  Hide = 0,
  Show = 1,
}

export interface PlayerEvent {
  target: Player;
}

export interface OnStateChangeEvent extends PlayerEvent {
  data: PlayerState;
}

export interface OnPlaybackQualityChangeEvent extends PlayerEvent {
  data: string;
}

export interface OnPlaybackRateChangeEvent extends PlayerEvent {
  data: number;
}

export interface OnErrorEvent extends PlayerEvent {
  data: PlayerError;
}

export interface PlayerEventHandler<TEvent extends PlayerEvent> {
  (event: TEvent): void;
}

export interface PlayerOptions {
  width?: string | number;
  height?: string | number;
  videoId?: string;
  playerVars?: PlayerVars;
  events?: Events;
  host?: string;
}

export type SuggestedVideoQuality =
  | "default"
  | "small"
  | "medium"
  | "large"
  | "hd720"
  | "hd1080"
  | "highres";

export interface PlayerVars {
  autohide?: AutoHide;
  autoplay?: AutoPlay;
  cc_load_policy?: ClosedCaptionsLoadPolicy;
  cc_lang_pref?: string;
  color?: ProgressBarColor;
  controls?: Controls;
  disablekb?: KeyboardControls;
  enablejsapi?: JsApi;
  end?: number;
  fs?: FullscreenButton;
  hl?: string;
  iv_load_policy?: IvLoadPolicy;
  list?: string;
  listType?: ListType;
  loop?: Loop;
  modestbranding?: ModestBranding;
  mute?: Mute;
  origin?: string;
  playlist?: string;
  playsinline?: PlaysInline;
  rel?: RelatedVideos;
  showinfo?: ShowInfo;
  start?: number;
}

export interface Events {
  onReady?: PlayerEventHandler<PlayerEvent>;
  onStateChange?: PlayerEventHandler<OnStateChangeEvent>;
  onPlaybackQualityChange?: PlayerEventHandler<OnPlaybackQualityChangeEvent>;
  onPlaybackRateChange?: PlayerEventHandler<OnPlaybackRateChangeEvent>;
  onError?: PlayerEventHandler<OnErrorEvent>;
  onApiChange?: PlayerEventHandler<PlayerEvent>;
}

export interface VideoOrPlaylistSettings {
  startSeconds?: number;
  endSeconds?: number;
  suggestedQuality?: SuggestedVideoQuality;
}

export interface VideoByIdSettings extends VideoOrPlaylistSettings {
  videoId: string;
}

export interface VideoByMediaContentUrlSettings
  extends VideoOrPlaylistSettings {
  mediaContentUrl: string;
}

export interface IPlaylistSettings extends VideoOrPlaylistSettings {
  list: string;
  listType?: ListType;
  index?: number;
}

export interface SphericalProperties {
  enableOrientationSensor?: boolean;
  fov?: number;
  pitch?: number;
  roll?: number;
  yaw?: number;
}

export interface Player {
  cueVideoById(
    videoId: string | VideoByIdSettings,
    startSeconds?: number,
    suggestedQuality?: SuggestedVideoQuality
  ): void;
  loadVideoById(
    videoId: string | VideoByIdSettings,
    startSeconds?: number,
    suggestedQuality?: SuggestedVideoQuality
  ): void;
  cueVideoByUrl(
    mediaContentUrl: string | VideoByMediaContentUrlSettings,
    startSeconds?: number,
    suggestedQuality?: SuggestedVideoQuality
  ): void;
  loadVideoByUrl(
    mediaContentUrl: string | VideoByMediaContentUrlSettings,
    startSeconds?: number,
    suggestedQuality?: SuggestedVideoQuality
  ): void;
  cuePlaylist(
    playlist: string | string[] | IPlaylistSettings,
    index?: number,
    startSeconds?: number,
    suggestedQuality?: SuggestedVideoQuality
  ): void;
  loadPlaylist(
    playlist: string | string[] | IPlaylistSettings,
    index?: number,
    startSeconds?: number,
    suggestedQuality?: SuggestedVideoQuality
  ): void;
  playVideo(): void;
  pauseVideo(): void;
  stopVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  nextVideo(): void;
  previousVideo(): void;
  playVideoAt(index: number): void;
  mute(): void;
  unMute(): void;
  isMuted(): boolean;
  setVolume(volume: number): void;
  getVolume(): number;
  setSize(width: number, height: number): void;
  getPlaybackRate(): number;
  setPlaybackRate(suggestedRate: number): void;
  getAvailablePlaybackRates(): number[];
  setLoop(loopPlaylists: boolean): void;
  setShuffle(shufflePlaylist: boolean): void;
  getVideoLoadedFraction(): number;
  getPlayerState(): PlayerState;
  getCurrentTime(): number;
  getPlaybackQuality(): SuggestedVideoQuality;
  setPlaybackQuality(suggestedQuality: SuggestedVideoQuality): void;
  getAvailableQualityLevels(): SuggestedVideoQuality[];
  getDuration(): number;
  getVideoUrl(): string;
  getSphericalProperties(): SphericalProperties;
  setSphericalProperties(option: SphericalProperties): void;
  getVideoEmbedCode(): string;
  getPlaylist(): string[];
  getPlaylistIndex(): number;
  addEventListener<TEvent extends PlayerEvent>(
    eventName: keyof Events,
    listener: (event: TEvent) => void
  ): void;
  removeEventListener<TEvent extends PlayerEvent>(
    eventName: keyof Events,
    listener: (event: TEvent) => void
  ): void;
  getIframe(): HTMLIFrameElement;
  destroy(): void;
}

export interface IYoutube {
  Player: (id: string, options: PlayerOptions) => Player;
  loading: number;
  loaded: number;
  PlayerState: {
    UNSTARTED: number;
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };
}
