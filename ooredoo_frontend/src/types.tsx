export type ChannelProps = {
    id: number;
    channel_number: number;
    product_id: number;
    package_name: string;
    channel_name: string;
  }
  
interface ChannelStore {
    channels: ChannelProps[];
    fetchChannels: () => Promise<void>;
}