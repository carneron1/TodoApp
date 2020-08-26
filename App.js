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
import SelectViewScreen from './screens/SelectViewScreen';
import SelectCreateScreen from './screens/SelectCreateScreen';
import MyAccountScreen from './screens/MyAccountScreen';


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

const viewTodos = createStackNavigator({
  SelectViewScreen: {
    screen:SelectViewScreen,
    navigationOptions:{
      title:'Ver tareas',
      headerShown:false
    }
  },
  PublicTodos: {
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
  MyTodos: {
    screen: MyTodosScreen,
    navigationOptions:{
      title:'Mis tareas',
    },
  },
  
})

const createTodos = createStackNavigator({
  SelectCreateScreen:{
    screen:SelectCreateScreen,
    navigationOptions:{
      title:'Crear tareas',
      headerShown:false
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
}, {initialRouteName:'SelectCreateScreen'})

const myAccount = createStackNavigator({
  SelectMyAccount:{
    screen:MyAccountScreen,
    navigationOptions:{
      title:'Mi cuenta',
      headerShown:false
    }
  },
  Contacts: {
    screen: ContactsScreen,
    navigationOptions:{
      title:'Colaboradores',
    },
  },
  
})

const UserStack = createDrawerNavigator({
  viewTodos:{
    screen:viewTodos,
    navigationOptions:{
      title:'Ver tareas',
      
    }
  },
  createTodos:{
    screen:createTodos,
    navigationOptions:{
      title:'Crear tareas',
      
    }
  },
  MyAccount:{
    screen:myAccount,
    navigationOptions:{
      title:'Mi cuenta',
      
    }
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