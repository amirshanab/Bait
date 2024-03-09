import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Store from './Redux/Store';

import BottomTabBar from './Navigations/BottomTabBar'; // Ensure this path is correct

const App = () => {
    return (
        <Provider store={Store}>
            <NavigationContainer>
                <BottomTabBar />
            </NavigationContainer>
        </Provider>
    );
};

export default App;
