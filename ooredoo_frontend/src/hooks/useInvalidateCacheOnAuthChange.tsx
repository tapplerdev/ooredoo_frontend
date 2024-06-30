import { useEffect } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from '../../src/lib/react-query/queryKeys'
import useUIStore from '@/store/UI/UIStore';
import { useAuthStore } from '@/store/auth/AuthStore';
// Used for invalidating query cache on reload of the app
const useInvalidateCacheOnAuthChange = () => {
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const { setOrder } = useUIStore();
  useEffect(() => {
    //   console.log('invalidating queries from useinvalidatecachonauthchange')
    //   console.log('Here is the current cache: ', queryClient.getQueryData([QUERY_KEYS.GET_CHANNELS]))
    //   queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEYS.GET_CHANNELS],
    //   });
    //   queryClient.removeQueries({queryKey: [QUERY_KEYS.GET_CHANNELS], exact: true});
    //   queryClient.clear();
      setOrder('ASC');
    queryClient.removeQueries({queryKey: [QUERY_KEYS.GET_CHANNELS]})
  }, [isAuthenticated]);
  
};

export default useInvalidateCacheOnAuthChange;