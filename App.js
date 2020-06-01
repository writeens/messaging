import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Image, TouchableHighlight, BackHandler } from 'react-native';
import Status from './components/Status';
import MessageList from './components/MessageList'
import { createImageMessage, createTextMessage, createLocationMessage } from './utils/MessageUtils'

export default function App() {

  const data = [
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('World'),
    createTextMessage('Hello'),
    createLocationMessage({
      latitude: 3.374658,
      longitude:6.508973
    }),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324
    }),
  ]
  const [messages, setMessages] = useState(data)
  const [fullscreenImageId, setFullscreenImageId] = useState(null)
  const [backButtonPressed, setBackButtonPressed] = useState(null);

  const dismissFullscreenImage = () => {
    setFullscreenImageId(null)
  }

  const handlePressMessage = (message) => {
    const { id, type } = message;
    switch(type){
      case 'text':
        Alert.alert(
          'Delete message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text:'Cancel',
              style:'cancel'
            },
            {
              text:'Delete',
              style:'destructive',
              onPress: () => {
                let newMessage = messages.filter((message) => message.id !== id)
                setMessages(newMessage)
              }
            }
          ]
        )
        break;
        case 'image':
          console.log('Setting ID')
          setFullscreenImageId(id)
            break;
        default:
          break
    }
  }

  const renderFullscreenImage = () => {
     if(!fullscreenImageId) return null;

     const image = messages.find((message) => message.id === fullscreenImageId);

     if(!image) return null;

     const { uri } = image;

     return (
       <TouchableHighlight style={styles.fullscreenOverlay} onPress={dismissFullscreenImage}>
        <Image style={styles.fullscreenImage} source={{ uri }} />
       </TouchableHighlight>
     )
  }

  const renderMessageList = () => {
    return (
      <View style={styles.content}>
        <MessageList messages={messages} onPressMessage={handlePressMessage} />
      </View>
    )
  }

  const renderInputMethodEditor = () => {
    return (
      <View style={styles.inputMethodEditor}></View>
    )
  }

  const renderToolbar = () => {
    return (
      <View style={styles.toolbar}></View>
    )
  }

  //COMPONENT WILL MOUNT
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log("Back Clicked")
      console.log(fullscreenImageId)
      if(fullscreenImageId){
        dismissFullscreenImage()
        return true
      }
      return false;
    })
    return () => {
      subscription.remove()
    }
  }, [fullscreenImageId])

  return (
    <View style={styles.container}>
    <Status />
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMethodEditor()}
      {renderFullscreenImage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor:'white'
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor:'white'
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
