import { IChannel, OrderBy } from "@/types/index"


// ============================== AUTH/USERS
export async function useSignInAccount(user: { email: string, password: string }) {
  const adminUser = {...user, userType: "admin"}
  try {
    const response = await fetch('http://localhost:3000/api/auth', {
      method: 'POST', // Specify the HTTP method as POST
      headers: {
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
      body: JSON.stringify(adminUser), // Convert the user object to a JSON string
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