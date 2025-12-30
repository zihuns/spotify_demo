import {
  AddTracksToPlaylistRequest,
  CreatePlaylistRequest,
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
    throw error;
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

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  try {
    const { name, description, playlistPublic, collaborative } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      description,
      public: playlistPublic,
      collaborative,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to create playlist");
  }
};

export const addTracksToPlaylist = async (
  params: AddTracksToPlaylistRequest
): Promise<{ snapshot_id: string }> => {
  try {
    const response = await api.post(
      `/playlists/${params.playlist_id}/tracks`,
      params
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add tracks to playlist");
  }
};
