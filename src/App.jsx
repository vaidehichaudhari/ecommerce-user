import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/login';
import Register from './components/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/cart' element={<Cart />} /> */}
        {/* <Route path="/productsDetail/:id" element={<ProductDetail />} /> */}
        {/* <Route path="/final-order" element={<FinalOrder />} /> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;