import React, { useEffect, useState } from 'react';
import { FlatList, TouchableHighlight, TouchableOpacity, Image, Text, View, Dimensions,Modal, Alert, ActivityIndicator, ToastAndroid} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import CommentsComponent from '../src/components/comments';
import config from '../src/config';
import styles from '../src/styles';

const PrivateTodosScreen = ()=>{

  const [userData, setUserData] = useState({});
  const [todoPrivateList, setTodoPrivateList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showingItem, setShowingItem] = useState({});
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [forceReload, setForceReload] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);


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
    fetch(`${config.apiUrl}/getUserAvatarByName?name=${item.userName}`).then(x=>x.text()).then(y=>{setImageUrl(y)});
  }
  const reload = ()=>{
    setForceReload(!forceReload);
  }

  const toggleComments = () =>{
    setShowComments(!showComments);
  }

  const getComments = ()=>{
    console.log('DATOS');
    fetch(`${config.apiUrl}/getComments?todoId=${showingItem._id}`).then(x=>x.json()).then(response=>{
        if(response) {
            setComments(response);
        } else setVoidComments(true);
    })
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
      ToastAndroid.show("Tarea completada!", ToastAndroid.SHORT);
      setModalVisible(false);
      })
  }
  const handleComplete = ()=>{
    Alert.alert(
      "Aviso",
      "¿Completar tarea? La tarea será borrada",
      [
        {text:"Completar",
        onPress:()=>{completeTodo(showingItem)}},
        {text:"Cancelar"}
      ]
    )
  }

  useEffect(()=>{
      console.log('fetch private');
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
              fetch(`${config.apiUrl}/getPrivatesTodos`,{
                method:'GET',
                headers:{
                  'Content-Type': 'application/json',
                  'token':x
                }
            })
              .then(t=>t.json())
              .then(res=>{
                setIsLoading(false);
                setTodoPrivateList(res);
              });
            })
        });


  },[modalVisible, forceReload])

  return(
    <View style={styles.mainWrapper}>

      {/*------------------------------------------MODAL-------------------------------------------------------------*/}
        <Modal
            animationType='slide'
            visible={showComments}
            onShow={()=>getComments()}>

            <CommentsComponent
              comments={comments}
              voidComments={comments==0?true:false}
              todoId={showingItem._id}
              user={showingItem.userName}
            />
            
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:40, marginTop:10}}>
              <TouchableOpacity 
                    style={{alignSelf:'center'}}
                    onPress={()=>toggleComments()}>
                      <Ionicons
                        onPress={()=>{toggleComments()}}
                        size={45}
                        name="ios-arrow-round-back"
                        style={{color:'grey'}}/>
                      
              </TouchableOpacity>


            </View>
     
            
        </Modal>
        
        <Modal visible={modalVisible}>
          <View style={styles.modalView}>
            <View>
            {imageUrl?<Image style={styles.photoModal} source={{uri:imageUrl}} />:<View></View>}
                <Text style={styles.textTitle}>{showingItem.title}</Text>
                <View style={{height:150}}>
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
            <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                <Text style={styles.textName}>Creado por {showingItem.userName}</Text>
                <TouchableOpacity 
                  style={{borderWidth:1, 
                          borderColor:'#ccc', 
                          paddingVertical:10, 
                          backgroundColor:'#eee', 
                          alignItems:'center', 
                          paddingHorizontal:20,
                          marginTop:5,
                          borderRadius:10}}
                  onPress={()=>toggleComments()}>
                    <Ionicons name="ios-chatboxes" size={30} onPress={()=>toggleComments()}/>
                </TouchableOpacity>
                <View style={{width:200,flexDirection:'row',flex:1, justifyContent:'space-between'}}>
                  <Ionicons
                        onPress={()=>{setModalVisible(!modalVisible)}}
                        size={45}
                        name="ios-arrow-round-back"
                        style={{marginTop:10, color:'grey'}}
                  />
                  <Ionicons
                        onPress={()=>{handleComplete()}}
                        size={45}
                        name="ios-checkmark-circle-outline"
                        style={{marginTop:10, color:'green'}}
                  />
                </View>
                
            </View>
          </View> 
        </Modal>   

        {/*------------------------------------------END MODAL-------------------------------------------------------------*/}

      {isLoading?<View style={{alignItems:'center', justifyContent:'center', flex:1}}><ActivityIndicator size={40}/></View>
      :
      <View style={{flex:1}}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={true}
          numColumns={1}
          data={todoPrivateList}
          renderItem={renderTodo}
          keyExtractor={item => `${item._id}`}/>

          <TouchableOpacity style={styles.reloadButton} onPress={()=>{reload()}}>
            <Ionicons name="ios-refresh" color="green"/>
            <Text style={{color:'green'}}> Actualizar</Text>
          </TouchableOpacity>
      </View>
      }
      
      
    </View>
  )
}



export default PrivateTodosScreen;