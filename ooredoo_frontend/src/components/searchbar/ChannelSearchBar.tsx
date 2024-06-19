import React, { useState } from 'react';
import useUIStore from '@/store/UI/UIStore';
import { useGetChannels } from '@/lib/react-query/queries';
const ChannelSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const { searchTerm, setSearchTerm } = useUIStore();
  const { refetch } = useGetChannels({ searchTerm })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setSearchInput('')
    refetch()
  };

  console.log('here is the searchinput ', searchInput)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search channels"
        />
        <button type="submit">Search</button>
      </form>

      
    </div>
  );
};

export default ChannelSearch;