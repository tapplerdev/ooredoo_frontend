import React, { useState, useEffect, useCallback } from 'react';
import editicon from '@/assets/editicon.svg';
import { IChannel } from '@/types/index';
import useUIStore from '@/store/UI/UIStore';
import { useAuthStore } from '@/store/auth/AuthStore';
import { useEditChannel, useGetChannels } from '@/lib/react-query/queries';

export const TableRowStyle: React.FC<IChannel> = ({ id, channel_number, product_id, package_name, channel_name }) => {
  const { user } = useAuthStore();
  const user_id = user?.user_id;
  const { mutateAsync: editChannel } = useEditChannel();
  const [isEditing, setIsEditing] = useState(false);
  const { order } = useUIStore();
  const { refetch } = useGetChannels({ order });
  const [editData, setEditData] = useState<Partial<IChannel>>({
    id,
    channel_number,
    product_id,
    package_name,
    channel_name,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (user_id) {
      await editChannel({ ...editData, user_id });
      setIsEditing(false);
      await refetch();
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ id, channel_number, product_id, package_name, channel_name });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: name === 'channel_number' || name === 'product_id' ? Number(value) : value });
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  }, [handleCancel]);

  useEffect(() => {
    if (isEditing) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditing, handleKeyDown]);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 transition duration-500 ease-in-out dark:hover:bg-gray-600 text-center">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input id={`checkbox-table-search-${id}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
          <label htmlFor={`checkbox-table-search-${id}`} className="sr-only">checkbox</label>
        </div>
      </td>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {isEditing ? (
          <input
            type="text"
            name="channel_name"
            value={editData.channel_name || ''}
            onChange={handleChange}
            className="border p-1 w-full transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md"
          
          />
        ) : (
          <span>{channel_name}</span>
        )}
      </th>
      <td className="px-6 py-4">
        {isEditing ? (
          <input
            type="number"
            name="channel_number"
            value={editData.channel_number || ''}
            onChange={handleChange}
            className="border p-1 w-full transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md"
        
          />
        ) : (
          channel_number
        )}
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <input
            type="number"
            name="product_id"
            value={editData.product_id || ''}
            onChange={handleChange}
            className="border p-1 w-full transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md"
   
          />
        ) : (
          product_id
        )}
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <input
            type="text"
            name="package_name"
            value={editData.package_name || ''}
            onChange={handleChange}
            className="border p-1 w-full transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 rounded-md"
     
          />
        ) : (
          package_name
        )}
      </td>
      <td className="px-6 py-4">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSaveClick}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition-all duration-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Save
            </button>
            {/* <button
              type="button"
              onClick={handleCancel}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 transition-all duration-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Cancel
            </button> */}
          </>
        ) : (
          <img
            src={editicon}
            onClick={handleEditClick}
            alt="Edit Icon"
            className="object-scale-down h-5 cursor-pointer hover:bg-gray-200 focus:bg-gray-200 transition-all duration-300 m-auto"
          />
        )}
      </td>
    </tr>
  );
};
