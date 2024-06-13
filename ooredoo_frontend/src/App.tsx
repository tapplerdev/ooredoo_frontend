import './App.css';
import Table from './components/table/Table';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import ChannelSearch from './components/searchbar/ChannelSearchBar';
import ClearChannelSearch from '@/components/searchbar/ClearSearchBar';

function App() {
  return (
    <>
      <Sidebar />
      <ChannelSearch />
      <ClearChannelSearch />
        <Table />
      <Footer />
    </>
  );
}

export default App;