import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  InfiniteData,
} from "@tanstack/react-query";
import { CategoryRequestParams, CategoryResponse } from "../models/category";
import { browseCategories } from "../apis/categoryApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useBrowseCategories = (
  params: CategoryRequestParams
): UseInfiniteQueryResult<InfiniteData<CategoryResponse, Error>, Error> => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["browse-categories", params],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return browseCategories({ ...params, offset: pageParam as number });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextUrl = lastPage.categories?.next;
      if (nextUrl) {
        const nextOffset = new URL(nextUrl).searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
    enabled: !!params,
  });
};

export default useBrowseCategories;
