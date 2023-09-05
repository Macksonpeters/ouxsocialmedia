import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useApiGet = (queryKey: string, endpoint: string) => {
  const token = "fS8iRczRqdTpWgHlGExQsiIeaoUra38f";

  const fetchGetReq = () => {
    try {
      return axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (error) {
      throw error;
    }
  };

  // useQuery api get req

  const { data, isLoading, error, refetch, isFetching } = useQuery(
    [queryKey],
    fetchGetReq
  );

  return { data, isLoading, error, refetch, isFetching };
};

export default useApiGet;
