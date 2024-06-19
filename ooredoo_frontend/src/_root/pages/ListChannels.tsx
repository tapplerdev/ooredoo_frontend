import ChannelSearch from "@/components/searchbar/ChannelSearchBar";
import ClearChannelSearch from "@/components/searchbar/ClearSearchBar";
import Table from "@/components/table/Table";
import '../../App.css'
export const ListChannels = () => {
    return (
        <>
        <h1>Search your channels</h1>
        <ChannelSearch />
        <ClearChannelSearch />
        <Table />
        </>
    )
}