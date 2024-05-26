import { useState } from 'react';
import './App.css';
import Table from './components/table/Table';
import useChannelStore from './store/channelStore';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
function App() {
  const { channels, fetchChannels } = useChannelStore();
  const [editingChannel, setEditingChannel] = useState(null);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelNumber, setNewChannelNumber] = useState('');
  console.log(channels)

  const editChannel = (channel) => {
    setEditingChannel(channel.id);
    setNewChannelName(channel.channelName);
    setNewChannelNumber(channel.channelNumber);
  };

  const updateChannel = async (channel) => {
    try {
      const response = await fetch(`http://localhost:3000/api/channels/change-channel/${channel.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channelName: newChannelName, channelNumber: newChannelNumber }),
      });
      if (response.ok) {
        const updatedChannel = await response.json();
        setChannels(channels.map(ch => (ch.id === channel.id ? updatedChannel : ch)));
        setEditingChannel(null);
        setNewChannelName('');
        setNewChannelNumber('');
      } else {
        console.error('Failed to update channel');
      }
    } catch (error) {
      console.error('Error updating channel:', error);
    }
  };

  return (
    <>
      <h1>Retrieve Ooredoo Channels</h1>
      {/* <div className="card">
        <button onClick={fetchChannels}>
          Fetch Channels
        </button>
        <p>
          Edit <code>src/App.js</code> and save to test HMR
        </p>
      </div>
      <div>
        <h2>Channels</h2>
        <ul className="no-bullets">
          {channels.map((channel) => (
            <li key={channel.id}>
              {editingChannel === channel.id ? (
                <>
                  <div>
                    <label>
                      Channel Number:
                      <input
                        type="number"
                        value={newChannelNumber}
                        onChange={(e) => setNewChannelNumber(e.target.value)}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Channel Name:
                      <input
                        type="text"
                        value={newChannelName}
                        onChange={(e) => setNewChannelName(e.target.value)}
                      />
                    </label>
                  </div>
                  <button onClick={() => updateChannel(channel)}>Save</button>
                  <button onClick={() => setEditingChannel(null)}>Cancel</button>
                </>
              ) : (
                <>
                  Channel ID: {channel.id} 
                  | Channel number: {channel.channel_number} 
                  | Package: {channel.package_name} 
                  | Product ID: {channel.product_id}
                  | Channel Name: {channel.channel_name}
                  <button onClick={() => editChannel(channel)}>Edit</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div> */}
      <Sidebar />
      {channels.length < 1 ? <button onClick={fetchChannels}>Fetch Channels</button> : <Table channels={channels}/>}
      <Footer />
    </>
  );
}

export default App;