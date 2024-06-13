import React, { ChangeEvent, useState, useEffect } from 'react';
import TableRowStyle from './TableRowStyle';
import useUIStore from '@/store/UIStore';
import { useGetChannels, useSearchChannels } from '@/lib/react-query/queries';

const Table: React.FC = () => {
  const { order, setOrder, searchTerm } = useUIStore();

  console.log('here is the order ', order)
  console.log('here is the searchTerm ', searchTerm)
  const { data: channels, isLoading, refetch } = useGetChannels({order, searchTerm});
  const [fetched, setFetched] = useState(false);
  
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value as 'ASC' | 'DESC');
  };

  // Refetch data when params update
  useEffect(() => {
    if (order !== undefined) {
      refetch()
    }
  }, [order]);

  useEffect(() => {
    if (searchTerm !== ''){
      refetch()
    }
  }, [searchTerm]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log('Current search term from table:', searchTerm); // Check if this updates
  const ErrorMessage = () => {
    return (
      <div>
        <button onClick={() => refetch()}>Fetch Channels</button>
      </div>
    )
  }

  console.log('this is the data from all channels ', channels)

  if (!channels){
    return <ErrorMessage />
  }

  return (
    <div className="p-5 h-full">
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <form onSubmit={(e) => e.preventDefault()}>
          <select
            value={order}
            onChange={handleSortChange}
            className="ml-2 p-1 border rounded mt-4"
          >
            <option value=""></option>
            <option value="ASC">Ascending by ID</option>
            <option value="DESC">Descending by ID</option>
          </select>
        </form>
        <table className="w-full mt-4">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Channel Number</th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Product ID</th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Package</th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Channel Name</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
               {channels?.map((channel) => (
                <TableRowStyle key={channel.id} {...channel} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;