import React, {createContext, useContext, useEffect, useState} from 'react';
import {makeAuthRequest, makeRequest} from "../utils/api.jsx";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('Bearer');
        if (storedToken) {
            //localStorage.setItem('Bearer', storedToken);
            makeAuthRequest('/api/authCheck')
                .then(res => {
                    setIsAuthenticated(true)
                })
                .catch(err => {
                    localStorage.removeItem('Bearer')
                    setIsAuthenticated(false)
                })
        }
    }, []);

    const login = async (formData) => {
        const data = await makeRequest('/api/login', {
            method: 'POST',
            data: formData,
        })
        if (data.status === 200) {
            //todo might be reacting too slow here idk
            localStorage.setItem('Bearer', data.data.token)
            console.log(data)
            setIsAuthenticated(true);
        } else {
            console.log('wrong credentials')
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        makeAuthRequest('/api/logout', {
            method: 'POST',
        })
            .then(() => setIsAuthenticated(false))
            .catch(() => console.error(err))

    };

    const signUp = (formData) => {
        makeRequest('/api/register', {
            method: 'POST',
            data: {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }
        })
            .then((res) => {
                localStorage.setItem('Bearer', res.data.token)
                setIsAuthenticated(true)
            })
            .catch(err => console.error(err))
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, signUp}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth};
