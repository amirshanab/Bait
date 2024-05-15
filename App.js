import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import { ThemeContext } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { PaperProvider } from 'react-native-paper';
import {ProductProvider} from "./contexts/ProductContext";
import AppNavigator from "./Navigations/AppNavigator";
import Toast from 'react-native-toast-message';

const App = () => {
    const systemTheme = useColorScheme(); // Automatically gets 'light', 'dark', or null

    // Set initial theme mode to system theme, default to 'light' if system theme is null
    const [theme, setTheme] = useState({ mode: systemTheme || 'light' });

    // This effect listens for changes in the system theme and updates the app theme accordingly
    useEffect(() => {
        setTheme({ mode: systemTheme || 'light' });
    }, [systemTheme]);

    const updateTheme = (newTheme) => {
        if (!newTheme || newTheme.mode === 'automatic') {
            // If automatic or undefined, use the system theme, default to 'light' if system theme is null
            setTheme({ mode: systemTheme || 'light' });
        } else {
            // Otherwise, use the specified theme
            setTheme(newTheme);
        }
    };

    return (
        <>
        <Provider store={Store}>
            <PaperProvider>
        <ProductProvider>

                <UserProvider>
                    <ThemeContext.Provider value={[theme, updateTheme]}>
                        <AppNavigator />
                    </ThemeContext.Provider>
                </UserProvider>
            <Toast />
        </ProductProvider>
            </PaperProvider>
        </Provider>

        </>
    );
};

export default App;
