import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { useEffect } from 'react'

const AuthScreen = ({navigation}) =>{

    useEffect(()=>{
      AsyncStorage.getItem('userToken').then(x=>{
        AsyncStorage.setItem('reload', 'true');
        AsyncStorage.setItem('reloadPrivate', 'true');
        AsyncStorage.setItem('reloadCreatePrivate', 'true');
        navigation.navigate(x?'User':'Auth');
      })
    })
    return (
        <View style={{alignItems:'center', justifyContent:'center'}}>
            <ActivityIndicator/>
        </View>
    )

}

export default AuthScreen;