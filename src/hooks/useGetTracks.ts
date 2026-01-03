import { useQuery } from "@tanstack/react-query";
import { getTracks } from "../apis/albumApi";

const useGetTracks = (albumIds: string[]) => {
  return useQuery({
    queryKey: ["tracks", albumIds],
    queryFn: async () => {
      const tracks = albumIds.map((albumId) => {
        return getTracks(albumId);
      });
      return Promise.all(tracks);
    },
  });
};

export default useGetTracks;
