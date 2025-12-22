import { useQuery } from "@tanstack/react-query";
import { getClinentCredentialToken } from "../apis/authApi";

const useClientCredentialToken = (): string | undefined => {
  const { data } = useQuery({
    queryKey: ["client-credential-token"],
    queryFn: getClinentCredentialToken,
  });
  const clientCredentialToken = data?.access_token;
  return clientCredentialToken;
};

export default useClientCredentialToken;
