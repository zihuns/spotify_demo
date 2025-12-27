import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Image, Owner } from "./commonType";

export interface getCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type getCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface SimplifiedPlaylist {
  collaborative?: boolean;
  description?: string;
  external_urls: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: {
    href?: string;
    total?: number;
  };
  type?: string;
}

// Type aliases for compatibility
export type IGetCurrentUserPlaylistRequest = getCurrentUserPlaylistRequest;
export type IPlaylist = SimplifiedPlaylist;
export type TGetCurrentUserPlaylistResponse = getCurrentUserPlaylistResponse;
