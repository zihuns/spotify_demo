import {
  getCurrentUserPlaylistRequest,
  getCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  Playlist,
} from "../models/playlist";
import api from "../utils/api";

const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: getCurrentUserPlaylistRequest): Promise<getCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get("/me/playlists", {
      params: {
        limit,
        offset,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch current user playlists");
  }
};

export default getCurrentUserPlaylists;

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch playlist");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch playlist items");
  }
};
