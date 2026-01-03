import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetNewReleases = (limit: number = 50) => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return getNewReleases(clientCredentialToken, limit);
    },
  });
};

export default useGetNewReleases;
