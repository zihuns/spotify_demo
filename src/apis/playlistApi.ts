import {
  getCurrentUserPlaylistRequest,
  getCurrentUserPlaylistResponse,
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
