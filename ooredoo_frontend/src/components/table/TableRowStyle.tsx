import React, { useState, useEffect } from 'react';

import editicon from '../../assets/editicon.svg';
import { IChannel } from '@/types/index';
import useUIStore from '@/store/UI/UIStore';


const TableRowStyle: React.FC<IChannel> = ({ id, channel_number, product_id, package_name, channel_name }) => {
  const { setEditChannel } = useUIStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<IChannel>({
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
    await setEditChannel();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ id, channel_number, product_id, package_name, channel_name });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: name === 'channel_number' || name === 'product_id' ? Number(value) : value });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  useEffect(() => {
    if (isEditing) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isEditing]);

  return (
    <tr className="bg-white">
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap no">
        <a href="#" className="font-bold text-blue-500 no-underline hover:underline">{id}</a>
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {isEditing ? (
          <input
            type="number"
            name="channel_number"
            value={editData.channel_number}
            onChange={handleChange}
            className="border p-1"
          />
        ) : (
          channel_number
        )}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {isEditing ? (
          <input
            type="number"
            name="product_id"
            value={editData.product_id}
            onChange={handleChange}
            className="border p-1"
          />
        ) : (
          product_id
        )}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
        {isEditing ? (
          <input
            type="text"
            name="package_name"
            value={editData.package_name}
            onChange={handleChange}
            className="border p-1"
          />
        ) : (
          package_name
        )}
      </td>
      <td className="p-3 text-sm text-gray-700 whitespace-nowrap flex items-center space-x-2 justify-between">
        {isEditing ? (
          <input
            type="text"
            name="channel_name"
            value={editData.channel_name}
            onChange={handleChange}
            className="border p-1"
          />
        ) : (
          <span>{channel_name}</span>
        )}
        {isEditing ? (
          <>
            <button type="button" onClick={handleSaveClick} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Save</button>
            <button type="button" onClick={handleCancel} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Cancel</button>
          </>
        ) : (
          <img
            src={editicon}
            onClick={handleEditClick}
            alt="Edit Icon"
            className="object-scaledown h-5 cursor-pointer hover:bg-gray-200 focus:bg-gray-200"
          />
        )}
      </td>
    </tr>
  );
};

export default TableRowStyle;