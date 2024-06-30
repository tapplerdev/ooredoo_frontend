import React, { ChangeEvent, useState, useEffect } from 'react';
import { TableRowStyle } from '@/components/table/TableRowStyle';
import useUIStore from '@/store/UI/UIStore';
import { useGetChannels } from '@/lib/react-query/queries';
import { LoaderComponent } from '../loader/LoaderComponent';
import { IChannel } from '@/types';
import ChannelSearch from '../searchbar/ChannelSearchBar';
const Table: React.FC = () => {
  const { order, setOrder } = useUIStore();
  const { data: channels, isLoading } = useGetChannels({ order });
  const [hasFetched, setHasFetched] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCompany, setFilterCompany] = useState('');

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOrder(event.target.value as 'ASC' | 'DESC');
  };

  useEffect(() => {
    const fetchChannels = async () => {
      
      console.log('fetchChannels ran!');
    };

    if (hasFetched) {
      fetchChannels();
    }
  }, [order, filterStatus, filterCompany, hasFetched,]);

  if (isLoading) {
    return <LoaderComponent />;
  }

  const fetchChannels = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setHasFetched(true);
    
    console.log('fetchChannels ran!');
    e.currentTarget.blur();
  };

  const FetchChannelsButton = () => (
    <button 
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 transition-all duration-300"
      onClick={(e) => fetchChannels(e)}
      onMouseDown={(e) => e.preventDefault()}
    >
      Fetch
    </button>
  );

  if (!channels) {
    return <FetchChannelsButton />;
  }

  return (
    <div className="ml-64 flex-1">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <div className="flex space-x-4">
          <ChannelSearch />
        </div>
      </div>
      <table className="table-auto w-full border-gray border-2 border rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">Channel Name</th>
            <th scope="col" className="px-6 py-3">Channel #</th>
            <th scope="col" className="px-6 py-3">Product ID</th>
            <th scope="col" className="px-6 py-3">Package Name</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {channels?.data.map((channel: IChannel) => (
            <TableRowStyle key={channel.id} {...channel} />
          ))}
        </tbody>
      </table>
      <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span>
        </span>
        <ul className="inline-flex items-center -space-x-px text-sm h-8">
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
          </li>
          <li>
            <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
          </li>
          <li>
            <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Table;