import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../src/styles';


const SelectCreateScreen = ({navigation})=>{
    return(
        <View>
            <View style={{flexDirection:'row', elevation:5}}>
                <View style={{justifyContent:'center',alignItems:'center', marginBottom:10}}><Ionicons onPress={()=>navigation.toggleDrawer()} size={35} style={styles.icon} name="ios-menu"  /></View>
                <View style={{flex:1, justifyContent:'center',alignItems:'center', marginBottom:10}}><Text style={styles.header} >CREACIÓN DE TAREAS</Text></View>
            </View>
            <ScrollView style={{borderTopWidth:0.5, borderTopColor:'#ccc'}} contentContainerStyle={{alignItems:'center'}}>

                <TouchableOpacity onPress={()=>{navigation.navigate('CreateTodo')}} style={styles.selectItem}>
                    <Ionicons name='ios-create' size={20} color='#ff9900'/>
                    <Text style={{color:"#ff9900"}}>Crear tareas públicas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('CreatePrivateTodo')}} style={styles.selectItem}>
                    <Ionicons name='ios-lock' size={20} color='#ff9900'/>
                    <Text style={{color:"#ff9900"}}>Crear tareas privadas</Text>
                    
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('MyTodos')}} style={styles.selectItem}>
                    <Ionicons name='ios-document' size={20} color='#ff9900'/>
                    <Text style={{color:"#ff9900"}}>Mis Tareas</Text>
                    
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

}


export default SelectCreateScreen;

