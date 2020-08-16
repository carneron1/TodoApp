import React, { useEffect, useState } from 'react';
import { FlatList, TouchableHighlight, StyleSheet, Text, View, Dimensions, Button, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../src/config';

const MyTodosScreen = ({navigation})=>{

  const [userData, setUserData] = useState({});
  const [todoList, setTodoList] = useState([]);
  const [token, setToken] = useState('');
  const [reloadControl, onChangeReloadControl] = useState(0);

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

  useEffect(()=>{
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

      <View style={{flexDirection:'row',}}>
        <View style={{justifyContent:'center',alignItems:'center', marginBottom:20}}><Ionicons onPress={()=>navigation.toggleDrawer()} size={35} style={styles.icon} name="ios-menu"  /></View>
        <View style={{justifyContent:'center',alignItems:'center', marginBottom:20}}><Text style={styles.header} >MIS TAREAS</Text></View>
      </View>
      
      <View style={{flex:1, borderTopWidth:1, borderColor:'#ff9900'}}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={1}
          data={todoList}
          renderItem={renderTodo}
          keyExtractor={item => `${item._id}`}
        />
      </View>
      
    </View>
  )
}

const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
  mainWrapper:{
    flex:1,
    height:Dimensions.get('window').height,
    padding:2
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 10,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN),
    height: 140,
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  photoModal: {
    width: 150,
    height:150,
    borderRadius: 15,
    marginTop:10,
    alignSelf:'center',
    marginBottom:5
  },
  title: {
    fontSize: 17,
    textTransform:'uppercase',
    textAlign: 'center',
    color: '#000',
    marginTop: 5,
    marginRight: 5,
    marginLeft: 5,
    marginBottom:15
  },
  icon:{
    marginTop:50,
    marginLeft:20,
    color:'#146eb4',
    alignSelf:'center'

  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: Dimensions.get('window').width-50,
    height: Dimensions.get('window').height-50,
    alignSelf:'center',
    marginTop:15
  },
  textTitle:{
    fontSize: 26,
    margin: 5,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center'
  },
  header: {
    fontSize: 21,
    textTransform:'uppercase',
    fontWeight: 'bold',
    color: '#000',
    marginTop: 50,
    marginLeft:50
  },
  textDescription:{
    fontSize: 16,
    marginTop: 10,
    alignSelf:'flex-start',
    color:'#000'
  },
  textName:{
    fontSize: 13,
    marginTop: 1,
    marginBottom:1,
    alignSelf:'flex-start',
    color:'#146eb4'

  },
  categoryPending: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 13,
    color:'#ff9900'
  },
  categoryCompleted: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 13,
    color:'green'
  },
  category: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 13,
    color:'#146eb4'
  }
});

export default MyTodosScreen;