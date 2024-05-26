import { useState, ChangeEvent } from 'react';
import { ChannelProps } from "../../types";
import TableRowStyle from "./TableRowStyle";
import editicon from '../../assets/editicon.svg';
import useChannelStore from "../../store/channelStore";

const Table: React.FC<{ channels: ChannelProps[] }> = ({ channels }) => {
  const { fetchChannels } = useChannelStore();
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC');

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newOrder = event.target.value as 'ASC' | 'DESC';
    console.log('here is the newOrder from handlesortchange', newOrder)
    setSortOrder(newOrder);
    fetchChannels(newOrder);
  };

  return (
    <div className="p-5 h-full">
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">ID</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">Channel Number</th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Product ID</th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Package</th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Channel Name</th>
              <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                <div className="flex items-center">
                  Filter
                  <select
                    value={sortOrder}
                    onChange={handleSortChange}
                    className="ml-2 p-1 border rounded"
                  >
                    <option value="ASC">Ascending by ID</option>
                    <option value="DESC">Descending by ID</option>
                  </select>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {channels.map((channel: ChannelProps) => (
              <TableRowStyle key={channel.id} {...channel} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;

