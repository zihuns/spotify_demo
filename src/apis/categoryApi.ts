import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { CategoryRequestParams, CategoryResponse } from "../models/category";
import api from "../utils/api";

export const browseCategories = async (
  params: CategoryRequestParams
): Promise<CategoryResponse> => {
  try {
    const response = await api.get(
      `${SPOTIFY_BASE_URL}/browse/categories?locale=${params.locale}&limit=${params.limit}&offset=${params.offset}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to browse categories");
  }
};
