import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { React, createContext, useContext, useState, useEffect } from 'react';
import { CoinList } from './config/api';
import { auth } from './firebase';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("SGD");
    const [symbol, setSymbol] = useState("USD$");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({ open: false, message: '', type: "success"});

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user);
            else setUser(null);
        })
    }, [])


    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        
        setCoins(data);
        
        setLoading(false);
    }

    useEffect(() => {
        if (currency === "SGD") setSymbol("S$");
        else if (currency === "USD") setSymbol("USD$");
    }, [currency]);

    return (
        <Crypto.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user}}>
            {children}
        </Crypto.Provider>
    )
};



export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}