import React, { useState, useEffect } from 'react';
import useUIStore from '@/store/UI/UIStore';
import { useGetChannels } from '@/lib/react-query/queries';
import { LoaderComponent } from '../loader/LoaderComponent';

const ClearChannelSearch = () => {
  const { order, setFilter } = useUIStore();
  const { refetch, isRefetching, data: channels } = useGetChannels({ order });
  const [resetFetch, setResetFetch] = useState(false);
  const clearSearchQuery = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setResetFetch(true)
    setFilter(undefined)
    event.currentTarget.blur();
    if (!channels) {
      console.log('no channels!')
      return;
    }
    await refetch();
  };

  useEffect(() => {
    if (resetFetch) {
      refetch();
      setResetFetch(false)
    }
  }, [resetFetch, refetch]);

  if (isRefetching) {
    return <LoaderComponent />
  }
  return (
    <button
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 transition-all duration-300"
      onClick={clearSearchQuery}
      onMouseDown={(e) => e.preventDefault()} // Prevent button from keeping focus after click
    >
      Clear
    </button>
  );
};

export default ClearChannelSearch;