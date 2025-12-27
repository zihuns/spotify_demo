import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Restriction {
  reason?: string;
}

export interface Followers {
  href?: string | null;
  total?: number;
}

export interface ExplicitContent {
  filter_enabled?: boolean;
  filter_locked?: boolean;
}

export interface Owner {
  display_name?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
}

export interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface Track {
  album: SimplifiedAlbum;
  artists: Artist;
  available_markets?: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids?: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable?: boolean;
  linked_from?: Record<string, unknown>;
  restrictions?: Restriction;
  name: string;
  popularity?: number;
  preview_url?: string | null;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
}

export interface SimplifiedShow {
  available_markets?: string[];
  copyrights?: Array<{
    text?: string;
    type?: string;
  }>;
  description?: string;
  html_description?: string;
  explicit?: boolean;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  is_externally_hosted?: boolean;
  languages?: string[];
  media_type?: string;
  name?: string;
  publisher?: string;
  type?: string;
  uri?: string;
  total_episodes?: number;
}

export interface Episode {
  audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  /** @deprecated Use languages instead */
  language?: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: "episode";
  uri: string;
  restrictions?: Restriction;
  show: SimplifiedShow;
}
