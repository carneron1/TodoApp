import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ProfileImageScreen = ({navigation}) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [cameraRef, setCameraRef] = useState(null);
  const [snapButton, setSnapButton] = useState(true);
  const userName = navigation.getParam('userName');

  useEffect(() => {
    console.log(snapButton);
    setSnapButton(true);
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === 'granted');
    })();
  },[]);



  const setCameraType = ()=>{
    
    setType(
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    navigation.navigate('Upload',{imageUri: result.uri, userName: userName})

  }

  const snap = async () => {
    
    if (cameraRef) {
      setSnapButton(false);
      let photo = await cameraRef.takePictureAsync({ skipProcessing: true });
      console.log(photo.uri);
      setSnapButton(true);
      navigation.navigate('Upload',{imageUri: photo.uri, userName: userName});          
    }
  };
  
 


  if (hasPermission === null) {
  return <View />;
  }
  if (hasPermission === false) {
  return <Text>Sin acceso a la cámara</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera 
      onCameraReady={()=>setSnapButton(true)}
      ref={ref => setCameraRef(ref)}
      style={{ flex: 1 }}
      type={type}
      >
        <View
          style={styles.iconsWrapper}>

          <TouchableOpacity
            style={styles.icon}
            onPress={() => {setCameraType()}}>
            <Ionicons name='ios-git-compare' color={'white'} size={40}/>
          </TouchableOpacity>
            {snapButton?
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {snap()}}>
                  <Ionicons name='ios-camera' color={'white'} size={40}/>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {snap()}}>
                  <ActivityIndicator size={40}/>
              </TouchableOpacity>}
            
        
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {pickImage()}}>
            <Ionicons name='ios-folder-open' color={'white'} size={40}/>
          </TouchableOpacity>

        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
    icon:{
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    iconsWrapper:{
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent:'space-between',
        flexDirection:'row',
        margin:20
    },
})

export default ProfileImageScreen;
