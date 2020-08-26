import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ToastAndroid } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import config from '../config';


const CreateCommentComponent = ({todoId,user}) =>{

    const [comment, setComment] = useState('');

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
              setComment('');
              ToastAndroid.show("Comentario creado", ToastAndroid.SHORT);
              navigation.navigate('PublicTodos');
              
          })
        
    }

    return (
    
        <View style={styles.modalView}>
                <View style={{flexDirection:'row'}}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text=>setComment(text)}
                        value={comment}
                    />
                    <TouchableOpacity style={{padding:10}} >
                        <Ionicons name="ios-send" size={25} color='#146eb4' onPress={()=>send()}/>
                    </TouchableOpacity>
                </View>
        </View>
        
    )


}

const styles = StyleSheet.create({
    modalView:{
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        paddingHorizontal:10,


    },
    input:{
        width:(Dimensions.get('window').width)/2,
        padding:5,
        borderBottomColor:'#ccc',
        borderBottomWidth:1,
        marginRight:15
    }
})

export default CreateCommentComponent;