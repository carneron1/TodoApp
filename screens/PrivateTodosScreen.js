import React, { useEffect, useState } from 'react';
import { FlatList, TouchableHighlight, Image, StyleSheet, Text, View, Dimensions,Modal, Alert, ActivityIndicator} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../src/config';
import { ScrollView } from 'react-native-gesture-handler';

const PrivateTodosScreen = ({navigation})=>{

  const [userData, setUserData] = useState({});
  const [todoPrivateList, setTodoPrivateList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showingItem, setShowingItem] = useState({});
  const [token, setToken] = useState('');
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const renderTodo = ({ item }) =>{
    var date = new Date(item.createDate);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate()
    return (
      
      (item.completed)?
      <View></View>
      :
      <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={()=>{openModal(item)}}>
        <View style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>Creado por {item.userName}</Text>
    <Text style={styles.category}>Creado: {day}/{month}/{year}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  const openModal = (item)=>{
    setModalVisible(!modalVisible);
    setShowingItem(item);
  }

  const completeTodo = (item)=>{
    fetch(`${config.apiUrl}/completeTodo`,{
      method:'POST',
      headers:{
        'Content-Type': 'Application/json',
        'token':token
      },
      body: JSON.stringify({
        todoId:item._id,
        userId:userData._id,
        isCompleted:!item.completed
      })
    }).then(x=>x.text()).then(y=>{
      setModalVisible(false);
      })
  }
  const handleComplete = ()=>{
    Alert.alert(
      "Aviso",
      "¿Completar tarea?",
      [
        {text:"Completar",
        onPress:()=>{completeTodo(showingItem)}},
        {text:"Cancelar"}
      ]
    )
  }

  useEffect(()=>{
    if(todoPrivateList===[]) setIsLoadingImage(true);
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
          fetch(`${config.apiUrl}/getPrivatesTodos`,{
            method:'GET',
            headers:{
              'Content-Type': 'application/json',
              'token':x
            }
        })
          .then(t=>t.json())
          .then(res=>{
            setTodoPrivateList(res);
            setIsLoadingImage(false);
          });
        })
    });
    
    
      
  },[todoPrivateList])

  return(
    <View style={styles.mainWrapper}>

      {/*------------------------------------------MODAL-------------------------------------------------------------*/}
        <Modal visible={modalVisible}>
          <View style={styles.modalView}>
            <View>
                <Image style={styles.photoModal} source={{uri:config.apiUrl+"/getUserAvatarByName?name="+showingItem.userName}} />
                <Text style={styles.textTitle}>{showingItem.title}</Text>
                <View style={{height:200}}>
                  <ScrollView >
                    <Text style={styles.textDescription}>Descripción: {showingItem.description}</Text>
                      <Text style={{color:'#146eb4', marginHorizontal:5, marginTop:10}}>Usuarios: </Text>
                      <View style={{flexDirection:'row', width:Dimensions.get('window').width-200}}>
                        <FlatList
                        horizontal
                        data={showingItem.users}
                        renderItem={({item})=>(<Text style={{color:'#146eb4', marginHorizontal:5}}>{item}</Text>)}
                        keyExtractor={(item)=>`${item}`}
                        />
                      </View>
                  </ScrollView>
                </View>
            </View>
            <View style={{flex:1, justifyContent:'flex-end'}}>
                <Text style={styles.textName}>Creado por {showingItem.userName}</Text>
                <View style={{width:200,flexDirection:'row',flex:1, justifyContent:'space-between'}}>
                  <Ionicons
                        onPress={()=>{setModalVisible(!modalVisible)}}
                        size={45}
                        name="ios-arrow-round-back"
                        style={{marginTop:20, color:'grey'}}
                  />
                  <Ionicons
                        onPress={()=>{handleComplete()}}
                        size={45}
                        name="ios-checkmark-circle-outline"
                        style={{marginTop:20, color:'green'}}
                  />
                </View>
                
            </View>
          </View> 
        </Modal>   

        {/*------------------------------------------END MODAL-------------------------------------------------------------*/}

      <View style={{flexDirection:'row',}}>
        <View style={{justifyContent:'center',alignItems:'center', marginBottom:20}}><Ionicons onPress={()=>navigation.toggleDrawer()} size={35} style={styles.icon} name="ios-menu"  /></View>
        <View style={{flex:1, justifyContent:'center',alignItems:'center', marginBottom:20}}><Text style={styles.header} >TAREAS PRIVADAS</Text></View>
      </View>
      {isLoadingImage?<View style={{alignItems:'center', justifyContent:'center'}}><ActivityIndicator/></View>
      :
      <View style={{flex:1, borderTopWidth:1, borderColor:'#ff9900'}}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={1}
          data={todoPrivateList}
          renderItem={renderTodo}
          keyExtractor={item => `${item._id}`}/>
      </View>
      }
      
      
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
    height: 100,
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
    marginLeft: -55
    
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
  category: {
    marginTop: 5,
    marginBottom: 2,
    fontSize: 13,
    color:'#146eb4'
  }
});

export default PrivateTodosScreen;