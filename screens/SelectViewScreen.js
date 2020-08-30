import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import config from '../src/config';
import styles from '../src/styles';


const SelectViewScreen = ({navigation})=>{

    const [firstReload, setFirstReload] = useState(true);
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({});

    useEffect(()=>{
      
        AsyncStorage.getItem('userToken').then(x=>{
          setToken(x);
          fetch(`${config.apiUrl}/getActualUser`,{
            method:'GET',
            headers:{
              'Content-Type': 'Application/json',
              'token':x
            }
          }).then(y=>y.json())
            .then(z=>{
              setUserData(z);
              if (firstReload) ToastAndroid.show(`Bienvenido ${z.name}`, ToastAndroid.SHORT);
              setFirstReload(false);
            })
        });
    
    },[])

    return(
        <View>
            <View style={{flexDirection:'row', elevation:5}}>
                <View style={{justifyContent:'center',alignItems:'center', marginBottom:10}}><Ionicons onPress={()=>navigation.toggleDrawer()} size={35} style={styles.icon} name="ios-menu"  /></View>
                <View style={{flex:1, justifyContent:'center',alignItems:'center', marginBottom:10}}><Text style={styles.header} >tareas publicadas</Text></View>
            </View>
            <ScrollView style={{borderTopWidth:0.5, borderTopColor:'#ccc'}} contentContainerStyle={{alignItems:'center'}}>

                <TouchableOpacity onPress={()=>{navigation.navigate('PublicTodos')}} style={styles.selectItem}>
                    <Ionicons name='ios-create' size={20} color='#146eb4'/>
                    <Text style={{color:'#146eb4'}}>Ver tareas públicas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('PrivateTodos')}} style={styles.selectItem}>
                    <Ionicons name='ios-lock' size={20} color='#146eb4'/>
                    <Text style={{color:'#146eb4'}}>Ver tareas privadas</Text>
                    
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('MyTodos')}} style={styles.selectItem}>
                    <Ionicons name='ios-document' size={20} color='#146eb4'/>
                    <Text style={{color:'#146eb4'}}>Mis Tareas</Text>
                    
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

}

export default SelectViewScreen;
