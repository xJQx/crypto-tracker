import { React, createContext, useContext, useState, useEffect } from 'react';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    
    const [currency, setCurrency] = useState("SGD");
    const [symbol, setSymbol] = useState("USD$");

    useEffect(() => {
        if (currency === "SGD") setSymbol("S$");
        else if (currency === "USD") setSymbol("USD$");
    }, [currency]);

    return (
        <Crypto.Provider value={{currency, symbol, setCurrency}}>
            {children}
        </Crypto.Provider>
    )
};



export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}