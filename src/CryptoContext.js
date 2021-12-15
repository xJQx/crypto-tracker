import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { React, createContext, useContext, useState, useEffect } from 'react';
import { CoinList } from './config/api';
import { auth, db } from './firebase';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("SGD");
    const [symbol, setSymbol] = useState("USD$");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    // user
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({ open: false, message: '', type: "success"});

    // watchlist
    const [watchlist, setWatchlist] = useState([])

    // for watchlist
    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user.uid);

            var unsubscribe = onSnapshot(coinRef, coin => {
                if (coin.exists()) {
                    setWatchlist(coin.data().coins);
                } else {
                    console.log("No Items in Watchlist");
                }
            });

            return () => {
                unsubscribe();
            }
        }
    }, [user])

    // onAuthStateChanged
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
        <Crypto.Provider value={{currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist}}>
            {children}
        </Crypto.Provider>
    )
};



export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}