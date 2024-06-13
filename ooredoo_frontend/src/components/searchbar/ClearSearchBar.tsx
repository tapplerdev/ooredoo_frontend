import React, { useState } from 'react';
import useUIStore from '@/store/UIStore';
import { useGetChannels } from '@/lib/react-query/queries';

const ClearChannelSearch = () => {
  const { setSearchTerm, searchTerm, order } = useUIStore();
  const { refetch } = useGetChannels({order, searchTerm});
  console.log('Search term cleared: ', searchTerm)
  return (
        <button onClick={
            () => {
            setSearchTerm('')
            refetch()
        }}>Clear Search</button>
  )
};

export default ClearChannelSearch;