import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import AuthScreen from './screens/AuthScreen';
import CreateTodoScreen from './screens/CreateTodoScreen';
import CreatePrivateTodoScreen from './screens/CreatePrivateTodoScreen';
import ProfileImageScreen from './screens/ProfileImageScreen';
import MyTodosScreen from './screens/MyTodosScreen';
import ContactsScreen from './screens/ContactsScreen';
import PrivateTodosScreen from './screens/PrivateTodosScreen';

import LogOut from './src/components/LogOut';
import uploadImageProfile from './src/components/uploadProfileImage';



const RootStack = createStackNavigator({
    Login: {
      screen:LoginScreen,
      navigationOptions:{
        title:'Login'
      }
    },
    Register: {
      screen:RegisterScreen,
      navigationOptions:{
        title:'Registro'
      }
    },
    ProfileImage: {
      screen:ProfileImageScreen,
      navigationOptions:{
        title:'Foto de perfil'
      }
    },
    Upload: {
      screen: uploadImageProfile,
      title:'Subir foto'
    }
    
  },
  { initialRouteName:'Login'},
  
)

const UserStack = createDrawerNavigator({
  Dashboard: {
    screen:DashboardScreen,
    navigationOptions:{
      title: 'Tareas públicas',
    }
  },
  PrivateTodos: {
    screen:PrivateTodosScreen,
    navigationOptions:{
      title: 'Tareas privadas',
    }
  },
  CreateTodo: {
    screen:CreateTodoScreen,
    navigationOptions:{
      title: 'Crear tarea pública',
    },
  },
  CreatePrivateTodo: {
    screen:CreatePrivateTodoScreen,
    navigationOptions:{
      title: 'Crear tarea privada',
    },
  },
  MyTodos: {
    screen: MyTodosScreen,
    navigationOptions:{
      title:'Mis tareas',
    },
  },
  Contacts: {
    screen: ContactsScreen,
    navigationOptions:{
      title:'Contactos',
    },
  },
 
  LogOut: {
    screen: LogOut,
    navigationOptions:{
      title:'Salir',
    },
  },
  

})

const BaseNavigator = createSwitchNavigator({
    AuthScreen,
    Auth:RootStack,
    User:UserStack
  },
  { initialRouteName:'AuthScreen'}
)

export default createAppContainer(BaseNavigator);