import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ShopContextProvider from './Context/ShopContext';
import UsersContextProvider from './Context/UsersContext';
import AuthenticationContextProvider from './Context/AuthenticationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ShopContextProvider>
        <UsersContextProvider>
            {/* TODO: Move this to be scoped more appropriately. */}
            <AuthenticationContextProvider>
                <App />
            </AuthenticationContextProvider>
        </UsersContextProvider>
    </ShopContextProvider>
);
