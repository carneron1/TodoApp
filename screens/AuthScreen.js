import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react'

const AuthScreen = ({navigation}) =>{

    const [token, onChangeToken] = useState('');
    useEffect(()=>{
      AsyncStorage.getItem('userToken').then(x=>{
        navigation.navigate(x?'User':'Auth');
      })
    })
    return (
        <View>
            <ActivityIndicator/>
        </View>
    )

}

export default AuthScreen;