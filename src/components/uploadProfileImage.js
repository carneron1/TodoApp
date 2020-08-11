import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import config from '../config'
import { Ionicons } from '@expo/vector-icons';

const uploadImageProfile = ({navigation}) =>{

    const imageUri = navigation.getParam('imageUri');
    if (imageUri===null) navigation.navigate('ProfileImage')
    const userName = navigation.getParam('userName');
    console.log(imageUri,userName);

    const upload = ()=>{
        
        const formData = new FormData();
        formData.append('image',{
            uri:imageUri,
            name:`${userName}.jpg`,
            type:'image/jpg'
        })
        formData.append({'name':userName});

        fetch(`${config.apiUrl}/uploadAvatar`,{
            method:"POST",
            headers:{
                "Content-Type": "multipart/form-data"
            },
            body: formData,
        }).then(y=>y.text()).then(z=>{
            console.log(z);
            alert('Usuario creado!');
            navigation.navigate('Login');
        })
    }

    return(
        <View style={styles.mainWrapper}>
            {imageUri?(
                <View>
                    <Image source={{uri: imageUri}} style={styles.image}/>
                    <TouchableOpacity
                        style={{alignSelf:'center'}}
                        onPress={()=>upload()}>
                        <Ionicons name="ios-checkmark-circle-outline" size={70} color={'green'}></Ionicons>
                    </TouchableOpacity>
                </View>
                
            )   
            : <View><Text style={{fontSize:30}}>Reintente</Text></View>}
        </View>
        
        
        
    )
}

const styles = StyleSheet.create({
    mainWrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        borderRadius: 15,
        width:300,
        height:300,
        marginBottom:30
    }
})


export default uploadImageProfile;