import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import UserManagement from './pages/UserManagement';
// import ProductManagement from './pages/ProductManagement';
import ReviewModeration from './pages/ReviewModeration';
// import Settings from './pages/Settings';
import UserDetails from './pages/UserDetails';
// import ProductDetails from './pages/ProductDetails';
// import AddProduct from './pages/AddProduct';
import ReviewDetails from './pages/ReviewDetails';
import { Box } from '@mui/material';

const App = () => {
    return (
        <Router>
            <Header />
            <Box display="flex">
                <Sidebar />
                <Box flexGrow={1} p={2} className="right-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<UserManagement />} />
                        <Route path="/users/:id" element={<UserDetails />} />
                        {/* <Route path="/products" element={<ProductManagement />} /> */}
                        {/* <Route path="/products/:id" element={<ProductDetails />} /> */}
                        {/* <Route path="/products/edit/:id" element={<AddProduct />} /> */}
                        {/* <Route path="/products/add" element={<AddProduct />} /> */}
                        <Route path="/reviews" element={<ReviewModeration />} />
                        <Route path="/reviews/:id" element={<ReviewDetails />} />
                        {/* <Route path="/settings" element={<Settings />} /> */}
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;


