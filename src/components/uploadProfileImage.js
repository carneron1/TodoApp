import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import config from '../config'
import { Ionicons } from '@expo/vector-icons';

const uploadImageProfile = ({navigation}) =>{

    const imageUri = navigation.getParam('imageUri');
    if (imageUri===null) navigation.navigate('ProfileImage')
    const userName = navigation.getParam('userName');
    const [isLoading, setIsLoading] = useState(false);

    const upload = ()=>{
        setIsLoading(true);
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
            alert('Usuario creado!');
            console.log(z);
            setIsLoading(false);
            navigation.navigate('Login');
        })
    }

    return(
        <View style={styles.mainWrapper}>
            {imageUri?(
                <View style={{alignItems:'center', justifyContent:'center'}}>
                    <Image source={{uri: imageUri}} style={styles.image}/>
                    {isLoading?<View><Text>Subiendo foto</Text><ActivityIndicator/></View>:
                        <TouchableOpacity
                        style={{alignSelf:'center', justifyContent:'center'}}
                        onPress={()=>upload()}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <Text>Confirmar selección</Text>
                            <Ionicons name="ios-checkmark-circle-outline" size={40} color={'green'}></Ionicons>
                        </View>
                     
                    </TouchableOpacity>
                    }
                    
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