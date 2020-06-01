import { StyleSheet, Platform, StatusBar, Text, View } from 'react-native'
import Constants from 'expo-constants'
import React, { Fragment, useState, useEffect } from 'react'
import NetInfo from '@react-native-community/netinfo';

const Status = () => {

    const [info, setInfo] = useState('none')


    let SUBSCRIPTION = null;
    const getNetworkStatus = async () => {
        try{
            const info = await NetInfo.fetch()
            SUBSCRIPTION = NetInfo.addEventListener(handleNetworkChange);

            setInfo(info.type)
        } catch (e) {
            console.log("Error", e)
        }
    }

    const handleNetworkChange = (newInfo) => {
        console.log("Changed from", info, 'to', newInfo.type)

        setInfo(newInfo.type)
    }

    //COMPONENT WILL MOUNT
    useEffect(() => {
        getNetworkStatus();
        return () => {
            SUBSCRIPTION()
        }
    }, [])


    const render = () => {
        const isConnected = info !== 'none';
        const backgroundColor = isConnected ? 'white' : 'red';

        const statusBar = (
            <StatusBar 
                backgroundColor={backgroundColor}
                barStyle={isConnected ? 'dark-content' : 'light-content'}
                animated={false}
            />
        )

        const messageContainer = (
            <View style={styles.messageContainer} pointerEvents={'none'}>
                {statusBar}
                {
                    !isConnected && (
                        <View style={styles.bubble}>
                            <Text style={styles.text}>No network connections</Text>
                        </View>
                    )
                }
            </View>
        )

        if(Platform.OS === 'ios') {
            return <View style={[styles.status, { backgroundColor }]}>{messageContainer}</View>
        }

        return messageContainer;
    }
    return (
        <Fragment>
            {render()}
        </Fragment>
    )
}


const statusHeight = 
(Platform.OS === 'ios' ? Constants.statusBarHeight : 0)

const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        height:statusHeight
    },
    messageContainer: {
        zIndex: 1,
        position: 'absolute',
        top: statusHeight + 20,
        right: 0,
        left: 0,
        height: 80,
        alignItems: 'center',
    },
    bubble: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    text: {
        color: 'white',
    }
})

export default Status