import React, { createContext, useRef } from "react";

export const UsersContext =  createContext({
    usersRef:{},
    createUser: ()=>{},
    getUser: ()=>{},
});

const UserLocalStorageKey = Symbol("users").toString();

function getDefaultUsers(){
    const users = JSON.parse(localStorage.getItem(UserLocalStorageKey)) || {};
    // Inject a testing user.
    return {...users, 
        "test@test.com": {
            email: "test@test.com", 
            password: "password", 
            name: "Test User",
            joinTime: new Date("1900/01/01").toISOString()
        }
    };
}

const UsersContextProvider = (props) => {

    const usersRef = useRef(getDefaultUsers());
    
    console.log(usersRef.current);

    const createUser = (email, password, name) => {
        const newUser = {
            email,
            password,
            name,
            joinTime: new Date().toISOString()
        };

        usersRef.current = {...usersRef.current, [email]: newUser};
        localStorage.setItem(UserLocalStorageKey, JSON.stringify(usersRef.current));
    }

    const getUser = (email) => {
        return usersRef.current[email];
    };

    const removeUser = (email) => {
        const users = usersRef.current;
        delete users[email];
        usersRef.current = {...users};
        localStorage.setItem(UserLocalStorageKey, JSON.stringify(usersRef.current));
    }

    const updateUser = (name, email, originalEmail, password) => {
        const user = getUser(originalEmail);
        if(!user){
            return;
        }
        user.name = name;
        user.email = email;
        user.password = password;
        removeUser(originalEmail);
        usersRef.current = {...usersRef.current, [email]: user};
        localStorage.setItem(UserLocalStorageKey, JSON.stringify(usersRef.current));
    }

    const contextValue = {usersRef, createUser, getUser, removeUser, updateUser};

    return (
        <UsersContext.Provider value={contextValue}>
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersContextProvider;

