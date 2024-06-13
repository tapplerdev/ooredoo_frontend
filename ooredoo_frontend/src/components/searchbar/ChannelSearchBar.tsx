import React, { useState } from 'react';
import { useGetChannels } from '@/lib/react-query/queries';
import useUIStore from '@/store/UIStore';
const ChannelSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const { setSearchTerm, searchTerm } = useUIStore();

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setSearchInput('')
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