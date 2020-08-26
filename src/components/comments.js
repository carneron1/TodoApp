import React, {useState} from 'react';
import { View, Text, ToastAndroid, KeyboardAvoidingView, Dimensions } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import config from '../config';
import styles from '../styles'


const CommentsComponent = ({comments, todoId, user}) =>{

    const [comment, setComment] = useState('');
    const comm = comments;
    const send = ()=>{
        let date = new Date();
        let day = date.getDate();//Current Date
        let month = date.getMonth() + 1; //Current Month
        let year = date.getFullYear(); //Current Year
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

                <KeyboardAvoidingView
                
                behavior={'padding'} 
                >
                    <View style={{marginBottom:60}}>
                        <FlatList
                            data={comments}
                            renderItem={renderComment}
                            keyExtractor={item=>item._id}
                        />
                        <View style={styles.m}>

                            <View style={{flexDirection:'row', marginTop:10}}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text=>setComment(text)}
                                    placeholder={"mensaje"}
                                    value={comment}
                                />
                                <TouchableOpacity style={{padding:10}} >
                                    <Ionicons name="ios-send" size={25} color='#146eb4' onPress={()=>send()}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>

    )

}


export default CommentsComponent;