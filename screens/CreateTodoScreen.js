import React from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../src/config';



const CreateTodoScreen = ({navigation})=>{

  const [userData, setUserData] = useState();
  

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
    console.log(todo);
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
          navigation.navigate('Dashboard');
      })
    })
  }

  

  return(
    <View style={styles.mainWrapper}>
        <Ionicons
          onPress={()=>navigation.toggleDrawer()} 
          style={styles.icon} 
          name="ios-menu" 
          size={35}  
        />
        <View 
         style={styles.container}
        >
          <TextInput
              style={styles.textInput}
              onChangeText={(title)=>{setTodo({
                ...todo,title:title,userName:userData.name
                })
              }}
              placeholder="Titulo"
              value={todo.title}
              
          />
          <TextInput
              style={styles.textInput}
              onChangeText={(desc)=>{setTodo({
                ...todo,description:desc,userName:userData.name
                })
              }}
              placeholder="Descripción"
              value={todo.description}         
          />
          <TouchableOpacity
            style={styles.uploadButton}
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

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },
  textInput:{
    borderBottomWidth:0.5,
    borderBottomColor:'#ff9900',
    padding:2,
    marginBottom:5,
    marginHorizontal:80,
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
  },
  icon:{
    marginTop:50,
    marginLeft:20,
    color:'#146eb4',
  },
  mainWrapper:{
      flex:1
  },
  uploadButton:{
    marginTop: 40,
    borderWidth: 1,
    borderRadius:2,
    borderColor:'#ff9900',
    justifyContent: 'center',
    alignItems:'center',
    padding:5,
    width:150,
    height:50
  },
  text:{
    fontSize:15,
    color: '#146eb4'
  }
});

export default CreateTodoScreen;