import React, { createContext, useContext, useState } from 'react';

const Map = createContext(null);
const { Provider } = Map;

export const useMapContext = () => useContext(Map);

export const MapContext = ({ children }) => {
    const [mapState, setMapState] = useState('');

    return (
        <Provider
            value={{
                mapState,
                setMapState,
            }}>
            {children}
        </Provider>
    );
};
