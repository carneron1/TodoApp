import React from 'react';
import { View, TextInput, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../src/config';
import styles from '../src/styles';

const CreateTodoScreen = ()=>{
  
  const [userData, setUserData] = useState({});
  
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
  },[])
  
  const initialState = {
    "userName":"",
    "title": '',
    "description": '',
    "isPrivate": false,
    "users": []
  }

  const [todo, setTodo] = useState(initialState);

  const onSubmit = ()=>{
    if (todo.title.length>3&&todo.description.length>3){
      AsyncStorage.getItem('userToken').then(x=>{
        fetch(`${config.apiUrl}/createTodo`,{
          method:'POST',
          headers:{
            'Content-Type': 'Application/json',
            'token':x
          },
          body:JSON.stringify(todo)
        }).then(y=>{
            setTodo(initialState);
            ToastAndroid.show("Tarea creada", ToastAndroid.SHORT);  
        })
      })
    }else alert("Ingrese titulo y descripción más largos")
    
  }

  return(
    <View style={{flex:1}}>
        
        <View style={styles.adviceContainer}>
          <Text style={{color:'#146eb4'}}>A continuación se creará una tarea pública visible para todos los usuarios. Cualquiera podrá ver tu nombre y foto de perfil</Text>
        </View>
        <View 
         style={styles.createPublicContainer}>
          <TextInput
              style={styles.textInput}
              onChangeText={(title)=>{setTodo({
                ...todo,title:title,userName:userData.name
                })
              }}
              placeholder="Titulo"
              value={todo.title}/>
          <TextInput
              style={styles.textInput}
              onChangeText={(desc)=>{setTodo({
                ...todo,description:desc,userName:userData.name
                })
              }}
              placeholder="Descripción"
              value={todo.description}/>
          <TouchableOpacity
            style={styles.uploadPublicButton}
            onPress={()=>onSubmit()}
          >
            <Text
              style={styles.text}  
            >CREAR TAREA</Text>  
          </TouchableOpacity>
              
        </View>
        
    </View>
  )
}

export default CreateTodoScreen;