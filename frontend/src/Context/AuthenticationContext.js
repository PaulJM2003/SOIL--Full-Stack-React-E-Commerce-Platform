import React, { createContext, useState } from "react";
import { confID, personSet, personGet, personRemoval } from "../data/repository";

export const AuthContext = createContext(null);

const AuthenticationContextProvider = (props) => {
    const [authenticatedUser, setAuthenticatedUser] = useState(personGet() || null);

    const login = async (username, password) => {
        const user = await confID(username, password);
        if (user) {
            setAuthenticatedUser(user);
            personSet(user); // Store in local storage
            return true;
        }
        return false;
    };

    const logout = () => {
        setAuthenticatedUser(null);
        personRemoval(); // Remove from local storage
    };

    const contextValue = { login, logout, authenticatedUser };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthenticationContextProvider;




