import { OrderBy } from "@/types/index";
import { getChannels, searchChannels, editChannel } from "../api";
import { QUERY_KEYS } from "./queryKeys";
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
  } from "@tanstack/react-query";
import { IChannelQueryOptions } from "@/types/index";

// ============================================================
// CHANNEL QUERIES
// ============================================================

export const useGetChannels = (params: IChannelQueryOptions) => {
  const { order, searchTerm } = params;
  console.log('here is the order ', order)
  console.log( 'here is the searchTerm ', searchTerm)
    return useQuery({
      queryKey: [QUERY_KEYS.GET_CHANNELS, order, searchTerm],
      queryFn: () => getChannels(order, searchTerm),
      enabled: false,
      staleTime: 50000,
    });
};

  
export const useSearchChannels = (searchTerm: string) => {
    return useQuery({
      queryKey: [QUERY_KEYS.SEARCH_CHANNELS, searchTerm],
      queryFn: () => searchChannels(searchTerm),
      enabled: !!searchTerm, // Only run this query if searchTerm is not empty
    });
};

export const useEditChannel = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: editChannel,
      onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CHANNELS]
        });
      },
    });
  };