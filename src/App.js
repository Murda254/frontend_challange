import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import ProductList from './components/ProductList';  
import ProductDetails from './pages/ProductDetails';  
import FilterSidebar from './components/FilterSidebar';  
import SearchBar from './components/SearchBar';  
import Header from './components/Header';  
import PlantCare from './pages/Plantcare';
import Workshops from './pages/Workshops';
import Blogs from './pages/Blogs';
import SelectedProductsSidebar from './components/SelectedProductsSidebar';
import { ProductsProvider } from './context/ProductsContext';
import './App.css';


function App() {

  const [filters, setFilters] = useState({
    searchTerm: localStorage.getItem('searchTerm') || '',
  });
  
  const handleSearch = (searchTerm) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchTerm,
    }));
  };

  return (
    <ProductsProvider>
      <Router>
        <div className="App">
          <Header /> 
          <div className="main-layout">
            <FilterSidebar filters={filters} setFilters={setFilters}/>  
            <div className="content-area">
              <SearchBar onSearch={handleSearch}/>  
              <Routes> 
                {/*<Route path="/" element={<ProductPage />} />*/}
                <Route path="/" element={<ProductList filters={filters}/>} /> 
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/plantcare" element={<PlantCare />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/blogs" element={<Blogs />} />
              </Routes>
            </div >
            <div className= "right-sidebar">
              <SelectedProductsSidebar />
            </div>
          </div>
        </div>
      </Router>
     </ProductsProvider>
  );
}

export default App;