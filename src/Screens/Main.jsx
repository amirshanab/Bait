import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';


const sliderWidth = 300; // Example value, adjust as needed
const itemWidth = 200; // Example value, adjust as needed

export class Main extends Component {
    state = {
        entries: [
            { title: 'Item 1' },
            { title: 'Item 2' },
            { title: 'Item 3' },
            // Add more mock data as needed
        ]
    };

    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }

    render() {
        return (
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.entries}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
            />
        );
    }
}

const styles = {
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue', // Example background color
        borderRadius: 5,
        padding: 10,
        margin: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
};
export default Main;