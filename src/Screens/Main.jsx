import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

const { width: screenWidth } = Dimensions.get('window');
const itemWidth = screenWidth * 0.7;
const itemHeight = 150;

export class Main extends Component {
    state = {
        entries: [
            { title: 'Item 1' },
            { title: 'Item 2' },
            { title: 'Item 3' },
            // Add more mock data as needed
        ],
        activeSlide: 0,
    };

    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }

    get pagination() {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotStyle={styles.paginationInactiveDot}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    render() { //hh
        return (
            <View style={styles.container}>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={itemWidth}
                    layout={'default'}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                {this.pagination}
            </View>
        );
    }
}

const styles = {
    container: {
        marginTop: 20,
        alignItems: 'center',
    },
    slide: {
        width: itemWidth,
        height: itemHeight,
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
    paginationContainer: {
        marginTop: 10,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
    },
    paginationInactiveDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'lightgray',
    },
};

Main.propTypes = {
    style: ViewPropTypes.style,
};

export default Main;