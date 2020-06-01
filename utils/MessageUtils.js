import PropTypes from 'prop-types';

const MessageShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['text', 'image', 'location']),
    text: PropTypes.string,
    uri: PropTypes.string,
    coordinate: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }),
});

let messageId = 0;

const getNextId = () => {
    messageId += 1;
    return messageId
}

const createTextMessage = (text) => {
    return {
        type:'text',
        id: getNextId(),
        text
    }
}

const createImageMessage = (uri) => {
    return {
        type:'image',
        id: getNextId(),
        uri,
    }
}

const createLocationMessage = (coordinate) => {
    return {
        type:'location',
        id: getNextId(),
        coordinate,
    }
}

export {
    MessageShape,
    createTextMessage,
    createImageMessage,
    createLocationMessage
}