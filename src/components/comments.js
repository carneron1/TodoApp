import React, {useState} from 'react';
import { View, Text, ToastAndroid, KeyboardAvoidingView, Keyboard } from 'react-native';
import { FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import config from '../config';
import styles from '../styles'


const CommentsComponent = ({comments, todoId, user}) =>{

    const [comment, setComment] = useState('');
    const comm = comments;
    const send = ()=>{
        if (comment.length>0){

            let date = new Date();
            let day = date.getDate();//Current Date
            let month = date.getMonth() + 1; //Current Month
            let year = date.getFullYear(); //Current Year
            Keyboard.dismiss();
            fetch(`${config.apiUrl}/createComment`,{
                method:'POST',
                headers:{
                  'Content-Type': 'Application/json',
                },
                body:JSON.stringify({
                    "user":user,
                    "todoId":todoId,
                    "text":comment,
                    "date":day+'/'+month+'/'+year
                })
              }).then(x=>{
                  comments.push({
                    "user":user,
                    "todoId":todoId,
                    "text":comment,
                    "date":day+'/'+month+'/'+year,
                    "_id":x._id
                });
                setComment('');
                ToastAndroid.show("Comentario creado", ToastAndroid.SHORT);
                  
              })
        }
        
    }

    const renderComment = ({item}) => {
        return (
           

                <View style={styles.listItem}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#146eb4'}}>-{item.user}: </Text>
                        <Text>"{item.text}"</Text>
                    </View>
                    <Text>{item.date}</Text>
                </View>
           
        )
    }

    return (
    
        <View style={styles.modalViewComments}>  


                    <View style={{marginBottom:5}}>
                        <FlatList
                            data={comments}
                            renderItem={renderComment}
                            keyExtractor={item=>item._id}
                        />
                        <View style={styles.m}>

                            <View style={{flexDirection:'row'}}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text=>setComment(text)}
                                    placeholder={"mensaje"}
                                    value={comment}
                                />
                                <TouchableOpacity style={{paddingHorizontal:30, paddingVertical:15, backgroundColor:'#146eb4',borderBottomRightRadius:2, borderTopRightRadius:2}} >
                                    <Ionicons name="ios-send" size={25}  color='white' onPress={()=>send()}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </View>

            </View>

    )

}


export default CommentsComponent;