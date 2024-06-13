import { IChannel, OrderBy } from "@/types/index"

// ============================== GET ALL CHANNELS
export async function getChannels(order?: OrderBy, searchTerm?: string) {
  const url = new URL('http://localhost:3000/api/channels/')
  const params = new URLSearchParams();

  if (searchTerm) {
    params.append('searchTerm', searchTerm);
  }

  if (order) {
    params.append('order', order);
  }

  url.search = params.toString();

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: IChannel[] = await response.json();
        return data;
    } catch (error) {
      console.error('Failed to fetch channels:', error);
      return [];
    }
  }

// ============================== SEARCH SPECIFIC CHANNELS
export async function searchChannels(name: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/channels?name=${name}`);
      const data: IChannel[] = await response.json();
      return data
    } catch (error) {
      console.error('Failed to search channels:', error);
    }
}

// ============================== EDIT SPECIFIC CHANNEL 
export async function editChannel({ id, updatedChannel }: { id: number, updatedChannel: Partial<IChannel> }){
    try {
      const response = await fetch(`http://localhost:3000/api/channels/change-channel/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedChannel),
      });

      if (!response.ok) {
        throw new Error('Failed to update channel');
      }
      return response.json();

    } catch (error) {
      console.error('Failed to update channel:', error);
    }
  }