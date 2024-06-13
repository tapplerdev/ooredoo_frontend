export type IChannel = {
    id: number;
    channel_number: number;
    product_id: number;
    package_name: string;
    channel_name: string;
};

export type OrderBy = 'ASC' | 'DESC';

export type IChannelQueryOptions = {
    order?: OrderBy;
    searchTerm?: string;
};




