import React, { useEffect, useState } from 'react';
import { FlatList, TouchableHighlight,TouchableOpacity, StyleSheet, Text, View, Dimensions, Button, Alert, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../src/config';
import styles from '../src/styles';

const MyTodosScreen = ()=>{

  const [userData, setUserData] = useState({});
  const [todoList, setTodoList] = useState([]);
  const [token, setToken] = useState('');
  const [reloadControl, onChangeReloadControl] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const renderTodo = ({ item }) =>{
    var date = new Date(item.createDate);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var dateC = new Date(item.completedDate);
    var yearC = dateC.getFullYear();
    var monthC = dateC.getMonth()+1;
    var dayC = dateC.getDate();

    return (
      (item.userName!=userData.name)?
      <View></View>
      :
      <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)'>
        <View style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
          {!item.completed?
            <Text style={styles.categoryPending}>Pendiente</Text>:
            <Text style={styles.categoryCompleted}>Completado por: {item.completedBy} el {dayC}/{monthC}/{yearC}</Text>
          }
          {item.isPrivate?
            <Text style={styles.categoryPending}>Privado</Text>:
            <View></View>
          }
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:10}}>
            <View style={{flex:1}}>
              <Text style={styles.category}>Creado: {day}/{month}/{year}</Text>
            </View> 
            <View style={{flex:1}}>
              <Button
                title='Borrar'
                color='red'
                onPress={()=>handleDelete(item._id)}
              />
            </View>
          </View>

        </View>
      </TouchableHighlight>
    )
  }

  const reload = ()=>{
    onChangeReloadControl(reloadControl+1);
  }

  useEffect(()=>{
    console.log('fetch my todos');
    setIsLoading(true);
    AsyncStorage.getItem('userToken').then(x=>{
      setToken(x);
      fetch(`${config.apiUrl}/getActualUser`,{
        method:'GET',
        headers:{
          'Content-Type': 'Application/json',
          'token':x
        }
      }).then(y=>y.json())
        .then(z=>{
          setUserData(z);
        })
    });
    fetch(`${config.apiUrl}/getTodos`)
      .then(x=>x.json())
      .then(todos=>{
        setTodoList(todos);
        setIsLoading(false);
      });
      
  },[reloadControl]);
  
  const deleteTodo = (id)=>{
    fetch(`${config.apiUrl}/deleteTodo`,{
      method:'POST',
      headers:{
        'Content-Type': 'Application/json',
        'token':token
      },
      body: JSON.stringify({
        todoId:id
      })
    }).then (x=>x.text()).then (y=>{onChangeReloadControl(reloadControl+1)})
  }

  const handleDelete = (id)=>{
      Alert.alert(
        "Aviso",
        "¿Borrar tarea?",
        [
          {
            text:"Confirmar",
            onPress:()=>deleteTodo(id)
          },
          {
            text:"Cancelar"
          }

        ]
      )
  }

  return(
    <View style={styles.mainWrapper}>
      {!isLoading?
      <View style={{flex:1}}>
      <FlatList
        vertical
        showsVerticalScrollIndicator={true}
        numColumns={1}
        data={todoList}
        renderItem={renderTodo}
        keyExtractor={item => `${item._id}`}
      />
      <TouchableOpacity style={styles.reloadButton} onPress={()=>{reload()}}>
          <Ionicons name="ios-refresh" color="green"/>
          <Text style={{color:'green'}}> Actualizar</Text>
        </TouchableOpacity>
      </View>
      :
      <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
        <ActivityIndicator size={40}/>
      </View>
      
    }
      
      
    </View>
  )
}


export default MyTodosScreen;