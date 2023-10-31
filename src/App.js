import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import Series from './Pages/Series/Series';
import Search from './Pages/Search/Search';
import SimpleBottomNavigation from './components/navigation';
import './App.css';

function App() {
  return (
    <>
    <header className='header'>
        <span className="header">MovieSea</span>
      </header>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Trending />} />
            <Route path='/Movies' element={<Movies />} />
            <Route path='/Series' element={<Series />} />
            <Route path='/Search' element={<Search />} />
          </Routes>
          <SimpleBottomNavigation />
        </Router>
      </div>
    </>
  );
}

export default App;
