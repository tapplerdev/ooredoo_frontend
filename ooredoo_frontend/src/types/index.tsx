import { filterOptions } from "@/components/searchbar/types";
import { ObjectEnum } from "@/utils/types";
export type IChannel = {
    id: number;
    user_id: string;
    channel_number: number;
    product_id: number;
    package_name: string;
    channel_name: string;
};

export type OrderBy = 'ASC' | 'DESC' | undefined;

export type IChannelQueryOptions = {
    order?: OrderBy;
    searchTerm?: string;
    filter?: ObjectEnum<typeof filterOptions> | undefined;
};

export const DefaultChannelQueryOptions: IChannelQueryOptions = {
    order: 'ASC',
    searchTerm: '',
    filter: undefined,
}


export type IUser = {
    user_id: string;
    name: string;
    email: string;
};

