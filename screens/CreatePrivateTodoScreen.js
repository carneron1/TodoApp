import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, FlatList, Dimensions, ToastAndroid} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../src/config';

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
        let adding = users;

        if (adding.indexOf(z.name)==-1){
          adding.push(z.name);
          setUsers(adding);
          setTodo({...todo, users:adding});
          console.log(todo)
        }
      })
    })
  },[users])
  

  const handleAdd = (name) =>{
    let adding = users;
    if (adding.indexOf(name)==-1){
      adding.push(name);
      setUsers(adding);
      setTodo({...todo, users:adding});
      console.log(todo)
    }else {
      adding.splice(adding.indexOf(name),1);
      setUsers(adding);
      setTodo({...todo, users:adding});
      console.log(todo);
    }
    
  }

  const handleDeleteUsers = () =>{
    setUsers([]);
    setTodo({...todo, users:[]});
    console.log(users);
  }

  const onSubmit = ()=>{

    console.log(todo);
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
            navigation.navigate('Dashboard');
        })
      })
    }else alert("Ingrese titulo y descripción más largos")
    
  }

  return(
    <View style={styles.mainWrapper}>

        <View style={{flexDirection:'row',}}>
          <View style={{justifyContent:'center',alignItems:'center', marginBottom:20}}><Ionicons onPress={()=>navigation.toggleDrawer()} size={35} style={styles.icon} name="ios-menu"  /></View>
          <View style={{flex:1, justifyContent:'center',alignItems:'center', marginBottom:20}}><Text style={styles.header} >CREAR TAREA PRIVADA</Text></View>
        </View>

        <View 
         style={styles.container}>
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
    marginBottom:20,
    borderWidth: 1,
    borderRadius:2,
    borderColor:'#ff9900',
    justifyContent: 'center',
    alignItems:'center',
    paddingHorizontal:15,
    marginHorizontal:5,
    height:50
  },
  text:{
    fontSize:15,
    color: '#146eb4'
  },
  listContainer:{
    flex:1,
    marginTop:50,
    alignItems:'center',
    justifyContent:'center'
  },
  item:{

  },
  viewsInModal:{
    padding:10,
    flex:1,
    borderBottomWidth:0.5,
    borderBottomColor:'#ff9900',
    alignSelf:'stretch',
    alignItems:'center',
    justifyContent:'center'
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
  header: {
    fontSize: 21,
    textTransform:'uppercase',
    fontWeight: 'bold',
    color: '#000',
    marginTop: 50,
    marginLeft: -55
    
  },
});

export default CreatePrivateTodoScreen;