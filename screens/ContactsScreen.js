import React from 'react';
import { StyleSheet, View, TextInput, Text, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../src/config';
import { FlatList } from 'react-native-gesture-handler';
import styles from '../src/styles';



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
         style={styles.contactsContainer}>
          <TextInput
              style={styles.textInput}
              autoCapitalize='none'
              onChangeText={(text)=>setfriendName(text)}
              placeholder="Agregar colaborador"
              value={friendName}/>

              <Ionicons
                name='ios-add-circle-outline'
                color='green'
                size={35}
                onPress={()=>onSubmit()}/>

              
        </View>
        <View style={styles.listContainer}>
            <FlatList
                showsVerticalScrollIndicator={true}
                numColumns={1}
                data={userData.friends}
                renderItem={({item})=>(<View style={{width:Dimensions.get('window').width-100, borderWidth:0.5, borderColor:'#ff9900', alignSelf:'stretch',alignItems:'center', borderRadius:5,marginBottom:3}}><Text style={{fontSize:18}}>{item}</Text></View>)}
                keyExtractor={item => `${item}`}/>
        </View>
        
    </View>


      

  )
}

export default ContactsScreen;