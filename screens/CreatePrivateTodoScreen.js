import React from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, Dimensions, ToastAndroid} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../src/config';
import styles from '../src/styles';

const CreatePrivateTodoScreen = ({navigation})=>{
  
  const initialState = {
    "userName":"",
    "title": '',
    "description": '',
    "isPrivate": true,
    "users": []
  }
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [todo, setTodo] = useState(initialState);
  const [update, setUpdate] = useState(false);
  
  useEffect(()=>{
      console.log('fetchcreateprivate');
      setUpdate(false);
      AsyncStorage.getItem('userToken').then(x=>{
        fetch(`${config.apiUrl}/getActualUser`,{
          method:'GET',
          headers:{
            'Content-Type': 'application/json',
            'token':x
          }
        }).then(y=>y.json()).then(z=>{
          setUserData(z);
          AsyncStorage.setItem('reloadCreatePrivate', 'false');
          let adding = users;

          
          if (adding.indexOf(z.name)==-1){
            adding.push(z.name);
            setUsers(adding);
            setTodo({...todo, users:adding});

          }
        })
      })
  },[todo, update])

  const reload = ()=>{
    setUpdate(true);
  }
  

  const handleAdd = (name) =>{
    let adding = users;
    AsyncStorage.setItem('reloadCreatePrivate', 'true');
    if (adding.indexOf(name)==-1){
      adding.push(name);
      setUsers(adding);
      setTodo({...todo, users:adding});

    }else {
      adding.splice(adding.indexOf(name),1);
      setUsers(adding);
      setTodo({...todo, users:adding});

    }
    
  }

  const handleDeleteUsers = () =>{
    setUsers([]);
    setTodo({...todo, users:[]});
    console.log(users);
  }

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
        <View 
         style={styles.createContainer}>
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
          <View style={styles.listContainer}>
            <Text style={{color:'#146eb4', marginBottom:20}}>Agregar contactos a tarea</Text>

            {(typeof userData.friends !== 'undefined' && userData.friends.length > 0)?
            <FlatList
            showsVerticalScrollIndicator={true}
            numColumns={1}
            data={userData.friends}
            extraData={users}
            renderItem={({item})=>(
              <View 
                style={
                  {
                    width:Dimensions.get('window').width-100,
                    borderBottomWidth:0.5,
                    borderBottomColor:'#ff9900', 
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:5}
                }>
                <TouchableOpacity 
                  onPress={()=>handleAdd(item)}
                  style={{alignSelf:'stretch',justifyContent:'center', alignItems:'center', padding:10, backgroundColor:'lightgrey'}}>
                    {users.indexOf(item)>-1?
                      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Text style={styles.item}>{item}</Text><Ionicons name="ios-checkmark-circle" color="green" size={15} style={{marginLeft:10}}/>
                      </View>
                    :
                    <Text style={styles.item}>{item}</Text>
                    
                    }
                    
                </TouchableOpacity>
              </View>)}
            keyExtractor={item => `${item}`}/>
            :
            <View>
              <TouchableOpacity onPress={()=>navigation.navigate('Contacts')}>
                <Text style={{color:'green'}}>Presione aquí para agregar colaboradores</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reloadButton} onPress={()=>{reload()}}>
                <Ionicons name="ios-refresh" color="green"/>
                <Text style={{color:'green'}}> Actualizar</Text>
              </TouchableOpacity>
            </View>
            
          }
            
          </View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity 
              style={styles.uploadButton}
              onPress={()=>handleDeleteUsers()}>
              <Text style={{color:'red'}}>Borrar usuarios</Text>
            </TouchableOpacity>
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
        
    </View>
  )
}

export default CreatePrivateTodoScreen;