import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'react-native';

export default ({navigation}) => {
    AsyncStorage.removeItem('userToken').then(x=>{
        navigation.navigate('Auth');
    })
    return(
        <View></View>
    )
}