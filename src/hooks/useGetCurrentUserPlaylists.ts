import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import getCurrentUserPlaylists from "../apis/playlistApi";
import {
  getCurrentUserPlaylistRequest,
  getCurrentUserPlaylistResponse,
} from "../models/playlist";

const useGetCurrentUserPlaylists = ({
  limit,
  offset,
}: getCurrentUserPlaylistRequest): UseInfiniteQueryResult<
  InfiniteData<getCurrentUserPlaylistResponse, Error>,
  Error
> => {
  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUserPlaylists({ limit, offset: pageParam as number });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetCurrentUserPlaylists;
