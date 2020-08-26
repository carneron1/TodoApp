import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../src/config';
import styles from '../src/styles';



const LoginScreen = ({navigation})=>{
  
  const [name, onChangeName] = useState('');
  const [password, onChangePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const onSubmit = ()=>{
    setIsLoading(true);
    fetch(`${config.apiUrl}/login`, {
      method : 'POST',
      headers:{
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:name,
        password:password
      })
    }).then(x=>x.text())
      .then(x=>{
        setIsLoading(false);
        if (x==='Usuario o password incorrecto') alert(x);
        else {
              AsyncStorage.setItem('userToken', x).then(x=>{
                setIsLoading(false);
                navigation.navigate('User');
              })
              
              
            }         
      })
  }    
  

  return(
    <View style={styles.createContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text)=>onChangeName(text)}
        placeholder="Ingrese nombre de usuario"
        autoCapitalize='none'
        value={name}
        
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(text)=>onChangePassword(text)}
        placeholder="Ingrese contraseña"
        autoCapitalize='none'
        secureTextEntry={true}
        value={password}
      />
      {isLoading?<ActivityIndicator/>
      :
      <View style={{padding:5, marginTop:50}}>
        <Button 
          
          title="Ingresar"
          onPress={()=>onSubmit()}
        />

      </View>
      }
      
      <Text style={styles.linkText} onPress={()=>navigation.navigate('Register')}>¿Aún no estas registrado?</Text>
    </View>

      

  )
}

export default LoginScreen;