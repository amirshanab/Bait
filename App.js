import React, {useState} from 'react';
import {useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import Store from './Redux/Store';
import BottomTabBar from './Navigations/BottomTabBar';
import {ThemeContext} from './contexts/ThemeContext';

const App = () => {
    const systemTheme = useColorScheme(); // Automatically gets 'light' or 'dark'
    const [theme, setTheme] = useState({mode: 'light'});

    const updateTheme = (newTheme) => {
        if (!newTheme || newTheme.mode === 'automatic') {
            // If automatic or undefined, use the system theme
            setTheme({mode: systemTheme});
        } else {
            // Otherwise, use the specified theme
            setTheme(newTheme);
        }
    };

    // This effect listens for changes in the system theme and updates the app theme accordingly
    React.useEffect(() => {
        if (theme.mode === 'automatic') {
            setTheme({mode: systemTheme});
        }
    }, [systemTheme]);

    return (
        <Provider store={Store}>
            <ThemeContext.Provider value={[theme, updateTheme]}>
                <NavigationContainer>
                    <BottomTabBar/>
                </NavigationContainer>
            </ThemeContext.Provider>
        </Provider>
    );
};


export default App;
