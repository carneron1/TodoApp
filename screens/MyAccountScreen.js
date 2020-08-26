import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const MyAccountScreen = ({navigation})=>{
    return(
        <View>
            <View style={{flexDirection:'row', elevation:5}}>
                <View style={{justifyContent:'center',alignItems:'center', marginBottom:20}}><Ionicons onPress={()=>navigation.toggleDrawer()} size={35} style={styles.icon} name="ios-menu"  /></View>
                <View style={{flex:1, justifyContent:'center',alignItems:'center', marginBottom:20}}><Text style={styles.header} >Mi cuenta</Text></View>
            </View>
            <ScrollView style={{borderTopWidth:1, borderTopColor:'#ff9900'}} contentContainerStyle={{alignItems:'center'}}>

                <TouchableOpacity onPress={()=>{navigation.navigate('Contacts')}} style={styles.selectItem}>
                    <Ionicons name='md-contact' size={20} color='#146eb4'/>
                    <Text style={styles.itemText}>Mis Colaboradores</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    selectItem:{
        width:Dimensions.get('window').width-100,
        height:100,
        borderColor:'#ff9900',
        /*borderWidth:0.5,*/
        alignItems:'center',
        justifyContent:'center',
        margin:5,
        borderRadius:5,
        elevation:5,
        
    },
    itemText:{
        color:'#146eb4'
    },
    icon:{
        marginTop:30,
        marginLeft:20,
        alignSelf:'center'
    
      },
      header: {
        fontSize: 18,
        textTransform:'uppercase',
        color: '#000',
        marginTop: 30,
        marginLeft: -55,
        
      },
})

export default MyAccountScreen;

/*orange:'#ff9900',
    blue:'#146eb4'*/