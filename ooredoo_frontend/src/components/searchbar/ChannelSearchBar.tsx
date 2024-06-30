import React, { useState, useEffect, useRef } from 'react';
import useUIStore from '@/store/UI/UIStore';
import { useGetChannels } from '@/lib/react-query/queries';
import { filterOptions } from './types';
import { ObjectEnum } from '@/utils/types';
const ChannelSearch: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const { filter, setFilter, order } = useUIStore();
  const { refetch } = useGetChannels({ searchTerm, filter, order });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch()
    // setSearchTerm(searchInput);
  };

  // useEffect(() => {
  //   if (searchTerm) {
  //     refetch();
  //   }
  // }, [searchTerm, filterOption, refetch]);
  // const defaultSearchParams = {
  //   orderBy: {
  //     ASC : 'asc'
  //   },
  //   filter: filterOption,
  //   searchInputObject: {
  //     search: searchInput
  //   }
  // }
  // const [channelSearchOptions, setChannelSearchOptions] = useState(defaultSearchParams)

  // console.log(`Here is the entire UIStore now: ${searchTerm}, ${filter}, ${order}`)
  console.log (`Here is the UIStore global store: ${filter}, ${order}`);
  console.log(`Here is the local searchterm state: ${searchTerm}`);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const handleOptionClick = (option: ObjectEnum<typeof filterOptions>) => {
    setFilter(option)
    setIsDropdownOpen(!isDropdownOpen)
  }
  
  document.addEventListener('mousedown', handleClickOutside)
  // console.log('here is channelsearchoptions now: ', channelSearchOptions)
  
  // useEffect(() => {
  //     setChannelSearchOptions((prevOptions) => ({
  //       ...prevOptions,
  //       searchInputObject: { search: searchInput },
  //       filter: filterOption
  //     }));
  //   }, [searchInput, filterOption]);

  return (
    <form className="flex flex-col w-128 mx-auto p-3" onSubmit={handleSubmit}>
      <div className="flex relative">
        <button
          id="dropdown-button"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
          onClick={toggleDropdown}
        >
          {filter ? filter : "Filter"}
          <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        <div
          id="dropdown"
          className={`absolute top-full left-0 z-10 mt-2 ${isDropdownOpen ? 'block opacity-100' : 'hidden opacity-0'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 transition-opacity duration-300 ease-in-out`}
          ref={dropdownRef}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            <li>
              <button type="button" onClick={() => {
                setFilter(undefined)
                setIsDropdownOpen(!isDropdownOpen)
              }}
              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Filter
              </button>
            </li>
            <li>
              <button type="button" onClick={() => handleOptionClick('Channels')}
              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Channels
              </button>
            </li>
            <li>
              <button type="button" 
              onClick={() => handleOptionClick('Packages')}
              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Packages
              </button>
            </li>
            <li>
              <button type="button"
              onClick={() => handleOptionClick('Platform')} 
              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Platform
              </button>
            </li>
            <li>
              <button type="button"
              onClick={() => handleOptionClick('Offerings')} 
              className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Product Offerings
              </button>
            </li>
          </ul>
        </div>
        <div className="relative w-full">
        <input
        type="text"
        id="search-dropdown"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={filter ? `Search ${filter}` : 'Search'}
        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 transition-all duration-300 ease-in-out"
      />
          <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white transition duration-500 ease-in-out bg-ooredoo-primary rounded-e-lg border border-ooredoo-primary hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-blue-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
            <span className="">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChannelSearch;