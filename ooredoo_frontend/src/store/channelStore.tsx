import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Channel {
    id: number;
    channel_number: number;
    product_id: number;
    package_name: string;
    channel_name: string;
  }
  type orderBy = 'ASC' | 'DESC'
  interface ChannelStore {
    channels: Channel[];
    fetchChannels: (order: orderBy) => Promise<void>;
    editChannel: (id: number, updatedData: Partial<Channel>) => Promise<void>;
  }

  const useChannelStore = create<ChannelStore>()(
    persist(
      (set) => ({
        channels: [],
        fetchChannels: async (order: 'ASC' | 'DESC' = 'ASC') => {
            try {
                console.log('here is the order from festchanells zustand: ', order)
              const response = await fetch(`http://localhost:3000/api/channels?order=${order}`); // Replace with your API endpoint
              const data: Channel[] = await response.json();
              set({ channels: data });
            } catch (error) {
              console.error('Failed to fetch channels:', error);
            }
        },
        clearChannels: () => set({ channels: [] }),
        editChannel: async (id: number, updatedData: Partial<Channel>) => {
            try {
                const response = await fetch(`http://localhost:3000/api/channels/change-channel/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                });

                if (!response.ok) {
                    throw Error('Failed to update channel')
                }
                const updatedChannel: Channel = await response.json();

                set((state) => ({
                    channels: state.channels.map((channel) => 
                        channel.id === id ? {...channel, ...updatedChannel} : channel
                    )
                }))
            } catch (error){
                console.error('Failed to update channel ', error)
            }
        }
      }),
      {
        name: 'channel-store', // Name of the item in localStorage
        onRehydrateStorage: () => (state) => {
            if (state) {

                setTimeout(() => {
                    state.channels = [];
                    localStorage.removeItem('channel-store');
                }, 60000)
            }
        }
      }
    )
  );
  
  export default useChannelStore;


