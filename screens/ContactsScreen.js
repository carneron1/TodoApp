import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../src/config';
import { FlatList } from 'react-native-gesture-handler';



const ContactsScreen = ({navigation})=>{

  const [userData, setUserData] = useState({});
  const [reloadHandler, onChangeReloadHandler] = useState(0);

  useEffect(()=>{
    
    AsyncStorage.getItem('userToken').then(x=>{
      fetch(`${config.apiUrl}/getActualUser`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
          'token':x
        }
      }).then(y=>y.json()).then(z=>{
            setUserData(z);
      })

    })
    
  },[reloadHandler])

  const [friendName, setfriendName] = useState('');

  const onSubmit = ()=>{

    AsyncStorage.getItem('userToken').then(x=>{
      fetch(`${config.apiUrl}/addFriend`,{
        method:'POST',
        headers:{
          'Content-Type': 'Application/json',
          'token':x
        },
        body:JSON.stringify({
            friendName:friendName,
            userName:userData.name,
            userFriends:userData.friends
        })
      }).then(y=>y.text())
        .then(z=>{
            if (z=='Usuario no encontrado') 
                alert(z); else{
                    setfriendName('');    
                    alert('Usuario agregado');
                    onChangeReloadHandler(reloadHandler+1);
                }
            
        });
    })
  }

  

  return(
    <View style={styles.mainWrapper}>
        <View
            style={styles.headerView}>
            <Ionicons
                onPress={()=>navigation.toggleDrawer()} 
                style={styles.icon} 
                name="ios-menu" 
                size={35}/>
            <Text style={styles.header}>Contactos</Text>

        </View>
        
        <View 
         style={styles.container}
        >
          <TextInput
              style={styles.textInput}
              autoCapitalize='none'
              onChangeText={(text)=>setfriendName(text)}
              placeholder="Nombre del contacto"
              value={friendName}
              
          />

              <Ionicons
                name='ios-add-circle-outline'
                color='green'
                size={45}
                onPress={()=>onSubmit()}
                />

              
        </View>
        <View style={styles.listContainer}>
            <FlatList
                showsVerticalScrollIndicator={true}
                numColumns={1}
                data={userData.friends}
                renderItem={({item})=>(<View style={{width:Dimensions.get('window').width-100, borderBottomWidth:0.5, borderBottomColor:'#ff9900', alignSelf:'stretch',alignItems:'center'}}><Text style={styles.item}>{item}</Text></View>)}
                keyExtractor={item => `${item}`}/>
        </View>
        
    </View>


      

  )
}

const styles = StyleSheet.create({
    headerView:{
        marginBottom:50,
        flexDirection:'row',
    },
    header: {
        fontSize: 21,
        textTransform:'uppercase',
        fontWeight: 'bold',
        color: '#000',
        marginTop: 50,
        marginLeft:50
      },
    container: {
        flexDirection:'row',
        backgroundColor: '#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    textInput:{
        borderBottomWidth:0.5,
        borderBottomColor:'#ff9900',
        padding:2,
        marginBottom:5,
        marginRight:10,
        fontSize:20,
        alignSelf:'stretch',
        textAlign:'center'
    },
    icon:{
        marginTop:50,
        marginLeft:20,
        color:'#146eb4',
    },
    mainWrapper:{
        flex:1
    },
    listContainer:{
        flex:1,
        marginTop:50,
        alignItems:'center',
        justifyContent:'center'
    },
    item:{
        fontSize:25,

        
    }
});

export default ContactsScreen;