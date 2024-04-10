import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const systemColorScheme = Appearance.getColorScheme();
    const [mode, setMode] = useState(systemColorScheme);

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setMode(colorScheme);
        });

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ mode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };