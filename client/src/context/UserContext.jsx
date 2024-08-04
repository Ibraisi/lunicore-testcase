import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('/profile')
                .then(({data}) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.error("Error fetching user profile:", error);
                    setUser(null);
                    sessionStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const logout = () => {
        axios.get('/logout')
            .then(() => {
                setUser(null);
                sessionStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };

    return (
        <UserContext.Provider value={{user, setUser, loading, logout}}>
            {children}
        </UserContext.Provider>
    );
}