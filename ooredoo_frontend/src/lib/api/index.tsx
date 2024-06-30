import { IChannel, IChannelQueryOptions, OrderBy } from "@/types/index"
import { AuthRequest, AuthResponse } from "@/store/auth/types";
import { defaultParams } from "@/constants";

// ============================== AUTH/USERS
export async function useSignInAccount(user: AuthRequest): Promise<AuthResponse> {
  try {
    const response = await fetch('http://localhost:3000/api/auth', {
      method: 'POST', // Specify the HTTP method as POST
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
      body: JSON.stringify(user), // Convert the user object to a JSON string
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the JSON response
    const data = await response.json();
    console.log('here is the data: ', data)
    return data; // Return the parsed data
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Rethrow the error for handling outside this function
  }
}

// export async function getCurrentUser(params: any) {
//   try {
//     const currentUser = await 
//   }
// }



// ============================== GET ALL CHANNELS
export async function getChannels(query: IChannelQueryOptions = defaultParams) {
  const url = new URL('http://localhost:3000/api/channels/')
  const params = new URLSearchParams();

  if (query.searchTerm) {
    params.append('searchTerm', query.searchTerm);
  }

  if (query.order) {
    params.append('order', query.order);
  }

  if (query.filter) {
    if (query?.filter === "Channels") {
      params.append('filter', 'channel_name')
    }
    if (query?.filter === "Packages") {
      params.append('filter', 'package_name')
    }
  }
  // switch (query.filter) {
  //   case "Channels":
  //     params.append('filter', 'channel_name')
  //     console.log('channels filter detected!')
  //     break;
    
  //   case "Packages":
  //     params.append('filter', 'package_name')
  //     console.log('packages filter detected!')
  //     break;
    
  //   default:
  //     break;
  // }

  url.search = params.toString();
  console.log('here is the url: ', url)

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
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
export async function editChannel(updatedChannel: Partial<IChannel>){
  console.log('editChannel function invoked!')
    try {
      const response = await fetch(`http://localhost:3000/api/channels/edit-channel/${updatedChannel.id}`, {
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