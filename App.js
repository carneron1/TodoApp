import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import AuthScreen from './screens/AuthScreen';
import CreateTodoScreen from './screens/CreateTodoScreen';
import ProfileImageScreen from './screens/ProfileImageScreen';
import MyTodosScreen from './screens/MyTodosScreen';

import LogOut from './src/components/LogOut';
import uploadImageProfile from './src/components/uploadProfileImage';
import ContactsScreen from './screens/ContactsScreen';



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
        title:'Imagen de perfil'
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
  CreateTodo: {
    screen:CreateTodoScreen,
    navigationOptions:{
      title: 'Crear tarea pública',
    },
  },
  Contacts: {
    screen: ContactsScreen,
    navigationOptions:{
      title:'Contactos',
    },
  },
  MyTodos: {
    screen: MyTodosScreen,
    navigationOptions:{
      title:'Mis tareas',
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