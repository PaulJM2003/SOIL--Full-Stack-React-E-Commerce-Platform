// Import the main CSS file for global styles.
import './App.css';

// Import components used in the app.
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

// Import React Router elements for managing navigation.
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import page components used in the routes.
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/Signup';
import Login from './Pages/Login';
import Account from './Pages/Account';
import Diet from './Pages/Diet'; // Import the new Diet component.

// Import banner images from assets.
import diary_banner from './Components/Assets/banner_diary.png';
import fruit_banner from './Components/Assets/banner_fruit.png';
import veg_banner from './Components/Assets/banner_veg.png';

// Define the main App component.
function App() {
  return (
    <div>
      {/* Setup BrowserRouter for handling navigation and history */}
      <BrowserRouter>
        {/* Render the Navbar component on every page */}
        <Navbar/>
        
        {/* Define all the Routes for the application */}
        <Routes>
          {/* Base route to render the Shop component */}
          <Route path='/' element={<Shop/>}/>
          
          {/* Routes for different product categories with dynamic banners and category props */}
          <Route path='/diary' element={<ShopCategory banner={diary_banner} category="diarys"/>}/>
          <Route path='/fruit' element={<ShopCategory banner={fruit_banner} category="fruits"/>}/>
          <Route path='/vegetable' element={<ShopCategory banner={veg_banner} category="veg"/>}/>
          
          {/* Nested route for individual product pages */}
          <Route path="/product" element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          
          {/* Other main routes for the application's functionalities */}
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/diet' element={<Diet/>}/>
          <Route path='/signup' element={<LoginSignup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/account" element={<Account/>}/>
        </Routes>
        
        {/* Render the Footer component on every page */}
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export of this module.
export default App;

