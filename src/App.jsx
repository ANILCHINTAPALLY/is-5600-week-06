import { Route, Routes } from 'react-router-dom';
import SingleView from './components/SingleView';

import productData from './data/full-products';
import Header from './components/Header';
import CardList from './components/CardList';

function App() {
  return (
    <div className="App">
      <h1>Hello There.</h1>
      <Header />
      <Routes>
        <Route path="/" element={<CardList data={productData} />} />
        <Route path="/product/:id" element={<SingleView data={productData} />} />
      </Routes>
    </div>
  );
}

export default App;
