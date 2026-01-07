import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { CategoryRequestParams, CategoryResponse } from "../models/category";

export const browseCategories = async (
  clientCredentialToken: string,
  params: CategoryRequestParams
): Promise<CategoryResponse> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
      params: {
        locale: params.locale,
        limit: params.limit,
        offset: params.offset,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to browse categories");
  }
};
