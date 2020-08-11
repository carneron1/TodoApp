import React from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../src/config';



const LoginScreen = ({navigation})=>{
  
  const [name, onChangeName] = useState('');
  const [password, onChangePassword] = useState('');
  const onSubmit = ()=>{
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
        if (x==='Usuario o password incorrecto') alert(x);
        else {
              AsyncStorage.setItem('userToken', x).then(x=>{
                navigation.navigate('User');
              })
              
              
            }         
      })
  }    
  

  return(
    <View style={styles.container}>
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
      
      <Button 
        style={styles.button}
        title="Ingresar"
        onPress={()=>onSubmit()}
      />
      <Text style={styles.linkText} onPress={()=>navigation.navigate('Register')}>¿Aún no estas registrado?</Text>
    </View>

      

  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
  textInput:{
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    padding:2,
    marginBottom:5,
    marginHorizontal:20,
    fontSize:20,
    alignSelf:'stretch',
    textAlign:'center'
  },
  button:{
    padding:5
  },
  linkText:{
    marginTop:60,
    color:'green'
  }
});

export default LoginScreen;