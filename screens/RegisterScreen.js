import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import config from'../src/config'


const RegisterScreen = ({navigation})=>{
  
  const [name, onChangeName] = useState('');
  const [password, onChangePassword] = useState('');
  const onSubmit = ()=>{
    fetch(`${config.apiUrl}/register`,{
      method : 'POST',
      headers:{
          'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        name:name,
        password:password
      })
  }).then(x=>x.text())
    .then(x=>{
      if (x==='Usuario existente') alert(x)
      else {
        navigation.navigate('ProfileImage',{userName:name});
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
        title="Registrarme"
        onPress={()=>(name.length>=4)&&(password.length>=4)?onSubmit():alert('Ingrese un nombre o contraseña mayor a 4 letras')}
      />

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
  }
});

export default RegisterScreen;