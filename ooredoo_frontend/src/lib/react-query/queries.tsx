import { getChannels, searchChannels, editChannel, useSignInAccount } from "../api";
import { QUERY_KEYS } from "./queryKeys";
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
  } from "@tanstack/react-query";
import { DefaultChannelQueryOptions, IChannelQueryOptions } from "@/types/index";
import { AuthRequest, AuthResponse } from "@/store/auth/types";


// ============================================================
// USER QUERIES
// ============================================================

export const useUserSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AuthRequest) => useSignInAccount(params),
    onSuccess: (data: AuthResponse) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CHANNELS]
      })
    }
  });
};


// ============================================================
// CHANNEL QUERIES
// ============================================================




export const useGetChannels = (params: IChannelQueryOptions = DefaultChannelQueryOptions) => {

  // console.log('here is the order ', order)
  // console.log( 'here is the searchTerm ', searchTerm)
    return useQuery({
      queryKey: [QUERY_KEYS.GET_CHANNELS],
      queryFn: () => getChannels(params),
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
        console.log('it was successful to edit the channel!')
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CHANNELS]
        });
      },
    });
  };