import { CameraRoll, Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import React, { useState } from 'react'

import Grid from './Grid';

const keyExtractor = ({ uri }) => uri;

const ImageGrid = (props) => {
    const data = [
        { uri: 'https://picsum.photos/600/600?image=15' },
        { uri: 'https://picsum.photos/600/600?image=25' },
        { uri: 'https://picsum.photos/600/600?image=35' },
        { uri: 'https://picsum.photos/600/600?image=45' },
    ]

    const [images, setImages] = useState(data)

    const renderItem = (items) => {
        const {item: {uri}, size, marginTop, marginLeft} = items
        const style = {
            width:size,
            height:size,
            marginTop,
            marginLeft
        }

        return <Image source={{ uri }} style={style}/>
    }

    return (
        <Grid 
            data={images}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
        />
    )

}

const styles = StyleSheet.create({
    image: {
        flex: 1,
    }
})

ImageGrid.propTypes = {
    onPressImage: PropTypes.func
}

ImageGrid.defaultProps = {
    onPressImage: () => {}
}

export default ImageGrid;