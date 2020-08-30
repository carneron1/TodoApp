import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../src/styles';


const MyAccountScreen = ({navigation})=>{
    return(
        <View>
            <View style={{flexDirection:'row', elevation:5}}>
                <View style={{justifyContent:'center',alignItems:'center', marginBottom:10}}><Ionicons onPress={()=>navigation.toggleDrawer()} size={35} style={styles.icon} name="ios-menu"  /></View>
                <View style={{flex:1, justifyContent:'center',alignItems:'center', marginBottom:10}}><Text style={styles.header} >Mi cuenta</Text></View>
            </View>
            <ScrollView style={{borderTopWidth:0.5, borderTopColor:'#ccc'}} contentContainerStyle={{alignItems:'center'}}>

                <TouchableOpacity onPress={()=>{navigation.navigate('Contacts')}} style={styles.selectItem}>
                    <Ionicons name='md-contact' size={20} color='#146eb4'/>
                    <Text style={{color:'#146eb4'}}>Mis Colaboradores</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )

}

export default MyAccountScreen;

/*orange:'#ff9900',
    blue:'#146eb4'*/