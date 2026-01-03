import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { getNewReleasesResponse } from "../models/album";
import api from "../utils/api";
import { Track } from "../models/track";

export const getNewReleases = async (
  clientCredentialToken: string,
  limit: number = 50
): Promise<getNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/browse/new-releases?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch new releases");
  }
};

export const getTracks = async (albumId: string): Promise<Track> => {
  try {
    const response = await api.get(`${SPOTIFY_BASE_URL}/albums/${albumId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch tracks");
  }
};
