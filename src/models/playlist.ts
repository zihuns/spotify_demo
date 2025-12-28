import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Followers, Image, Owner } from "./commonType";
import { Track, Episode } from "./track";

export interface getCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type getCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}
export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface Playlist extends BasePlaylist {
  tracks?: ApiResponse<PlaylistTrack>;
  followers?: Followers;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string[];
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track: Track | Episode;
}

// Type aliases for compatibility
export type IPlaylist = SimplifiedPlaylist;
