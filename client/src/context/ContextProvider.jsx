import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const LoginContext = createContext(null);

const ContextProvider = ({children}) => {

    const [ account, setAccount ] = useState(() => localStorage.getItem('account') || '');
    const [ username, setUsername ] = useState(() => localStorage.getItem('username') || '');
    const [ wishlist, setWishlist ] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('wishlist')) || [];
        } catch {
            return [];
        }
    });
    
    useEffect(() => {
        if (account) {
            localStorage.setItem('account', account);
        } else {
            localStorage.removeItem('account');
        }
    }, [account]);

    useEffect(() => {
        if (username) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }, [username]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAccount(user.displayName);
                setUsername(user.email);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <LoginContext.Provider value={{ account, setAccount, username, setUsername, wishlist, setWishlist }}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider;