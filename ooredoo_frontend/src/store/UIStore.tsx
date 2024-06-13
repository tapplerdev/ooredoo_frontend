// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// interface Channel {
//   id: number;
//   channel_number: number;
//   product_id: number;
//   package_name: string;
//   channel_name: string;
// }

// type OrderBy = 'ASC' | 'DESC';

// interface ChannelStore {
//   channels: Channel[];
//   loading: boolean;
//   fetchChannels: (order: OrderBy) => Promise<void>;
//   searchChannels: (name: string) => Promise<void>;
//   sortChannelsById: (order: OrderBy) => void;
//   editChannel: (id: number, updatedData: Partial<Channel>) => Promise<void>;
//   clearChannels: () => void;
// }

// const useChannelStore = create<ChannelStore>()(
//   persist(
//     (set) => ({
//       channels: [],
//       loading: false,
//       fetchChannels: async (order: OrderBy = 'ASC') => {
//         set({ loading: true });
//         try {
//           const response = await fetch(`http://localhost:3000/api/channels?order=${order}`);
//           const data: Channel[] = await response.json();
//           set({ channels: data });
//         } catch (error) {
//           console.error('Failed to fetch channels:', error);
//         } finally {
//           set({ loading: false });
//         }
//       },
//       searchChannels: async (name: string) => {
//         set({ loading: true });
//         try {
//           const response = await fetch(`http://localhost:3000/api/channels/search?name=${name}`);
//           const data: Channel[] = await response.json();
//           set({ channels: data });
//         } catch (error) {
//           console.error('Failed to search channels:', error);
//         } finally {
//           set({ loading: false });
//         }
//       },
//       sortChannelsById: (order: OrderBy) => {
//         set((state) => {
//           const sortedChannels = [...state.channels].sort((a, b) => {
//             if (order === 'ASC') {
//               return a.id - b.id;
//             } else {
//               return b.id - a.id;
//             }
//           });
//           return { channels: sortedChannels };
//         });
//       },
//       clearChannels: () => set({ channels: [] }),
//       editChannel: async (id: number, updatedData: Partial<Channel>) => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/channels/change-channel/${id}`, {
//             method: 'PATCH',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(updatedData),
//           });

//           if (!response.ok) {
//             throw new Error('Failed to update channel');
//           }

//           const updatedChannel: Channel = await response.json();

//           set((state) => ({
//             channels: state.channels.map((channel) =>
//               channel.id === id ? { ...channel, ...updatedChannel } : channel
//             ),
//           }));
//         } catch (error) {
//           console.error('Failed to update channel:', error);
//         }
//       },
//     }),
//     {
//       name: 'channel-store',
//       onRehydrateStorage: () => (state) => {
//         if (state) {
//           setTimeout(() => {
//             state.channels = [];
//             localStorage.removeItem('channel-store');
//           }, 60000);
//         }
//       },
//     }
//   )
// );

// export default useChannelStore;


import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IChannelQueryOptions, OrderBy } from '@/types/index.ts'


interface UIState {
  order: OrderBy | undefined;
  setOrder: (order: OrderBy) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearchTerm: () => void;
  setEditChannel: () => void;
}

const useUIStore = create<UIState>()(
    (set) => ({
      order: undefined,
      searchTerm: '',
      setOrder: (order) => set({ order: order }),
      setSearchTerm: (term: string) => set({ searchTerm: term }),
      clearSearchTerm: () => set({ searchTerm: '' }),
      setEditChannel: () => set({})
    }),
);


export default useUIStore;