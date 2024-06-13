// import { useState } from 'react';
// import useChannelStore from '@/store/UIStore';
// import editicon from '../../assets/editicon.svg';

// const ChannelTableHeader = () => {
//   const { fetchChannels } = useChannelStore();
//   const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');

//   const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const newOrder = event.target.value as 'ASC' | 'DESC';
//     setSortOrder(newOrder);
//     fetchChannels(newOrder);
//   };

//   return (
//     <div className="flex items-center">
//       <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Filter</th>
//       <img
//         src={editicon}
//         alt="Edit Icon"
//         className="object-scaledown h-5 cursor-pointer hover:bg-gray-200 focus:bg-gray-200"
//       />
//       <select
//         value={sortOrder}
//         onChange={handleSortChange}
//         className="ml-2 p-1 border rounded"
//       >
//         <option value="ASC">Ascending by ID</option>
//         <option value="DESC">Descending by ID</option>
//       </select>
//     </div>
//   );
// };

// export default ChannelTableHeader;