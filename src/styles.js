import {StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
    reloadButton:{
      flexDirection:'row', 
      alignItems:'center', 
      justifyContent:'center',
      padding:10,
      borderWidth:0.5,
      borderColor:'green'

    },

    mainWrapper:{
      flex:1,
      height:Dimensions.get('window').height,
      padding:2,
      alignItems:'center',
      justifyContent:'center'
    },

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN),
      height: 110,
      borderColor: '#ccc',
      borderWidth: 0.5,
      borderRadius: 15
    },

    photo: {
      width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
      height: RECIPE_ITEM_HEIGHT,
      borderRadius: 15,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },

    photoModal: {
      width: 150,
      height:150,
      borderRadius: 15,
      marginTop:10,
      alignSelf:'center',
      marginBottom:5
    },

    title: {
      fontSize: 17,
      textTransform:'uppercase',
      textAlign: 'center',
      color: '#000',
      marginTop: 5,
      marginRight: 5,
      marginLeft: 5,
      marginBottom:15
    },

    modalView: {
      backgroundColor: "white",
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      width: Dimensions.get('window').width-50,
      height: Dimensions.get('window').height-50,
      alignSelf:'center',
      marginTop:15
    },

    textTitle:{
      fontSize: 26,
      margin: 5,
      fontWeight: 'bold',
      color: '#000',
      textAlign: 'center'
    },

    textDescription:{
      fontSize: 16,
      marginTop: 10,
      alignSelf:'flex-start',
      color:'#000'
    },

    textName:{
      fontSize: 13,
      marginTop: 1,
      marginBottom:1,
      color:'#146eb4'
    },

    category: {
      marginTop: 5,
      marginBottom: 2,
      fontSize: 13,
      color:'#146eb4'
    },

    categoryPending: {
      marginTop: 5,
      marginBottom: 2,
      fontSize: 13,
      color:'#ff9900'
    },

    categoryCompleted: {
      marginTop: 5,
      marginBottom: 2,
      fontSize: 13,
      color:'green'
    },

    modalViewComments:{
      width:Dimensions.get('window').width-50,
      height:Dimensions.get('window').height-100,
      borderRadius:5,
      elevation:5,
      alignItems:'center',
      justifyContent:'center',
      alignSelf:'center',
    },

    listItem:{
      width:Dimensions.get('window').width-70,
      height:70,
      marginTop:20,
      borderBottomWidth:1,
      borderColor:'#ccc',
      alignSelf:'stretch',
      alignItems:'center',
      justifyContent:'center',
    },

    m:{
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
      marginRight:15,
      
    },

    headerView:{
      marginBottom:50,
      flexDirection:'row',
      justifyContent:'center',
      borderBottomWidth:1,
      borderBottomColor: '#ff9900'
    },

    contactsContainer: {
      flexDirection:'row',
      marginTop:40,
      backgroundColor: '#fff',
      justifyContent:'center',
      alignItems:'center'
    },

    textInput:{
      borderBottomWidth:0.5,
      borderBottomColor:'#ff9900',
      padding:2,
      marginBottom:5,
      marginRight:10,
      fontSize:20,
      alignSelf:'stretch',
      textAlign:'center'
    },

    listContainer:{
      flex:1,
      marginTop:50,
      alignItems:'center',
      justifyContent:'center'
    },

    createContainer: {
      marginTop:30,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    uploadButton:{
      marginTop: 40,
      marginBottom:20,
      borderWidth: 1,
      borderRadius:2,
      borderColor:'#ff9900',
      justifyContent: 'center',
      alignItems:'center',
      paddingHorizontal:15,
      marginHorizontal:5,
      height:50
    },

    text:{
      fontSize:15,
      color: '#146eb4'
    },

    createPublicContainer: {
      flex:1.5,
      marginTop:30,
      backgroundColor: '#fff',
      alignItems: 'center',
    },

    uploadPublicButton:{
      marginTop:30,
      borderWidth: 1,
      borderRadius:2,
      borderColor:'#ff9900',
      justifyContent: 'center',
      alignItems:'center',
      padding:5,
      width:150,
      height:50
    },

    adviceContainer:{
      flex:0.5,
      alignItems:'center',
      justifyContent:'center',
      alignSelf:'center',
      marginTop:20,
      paddingVertical:1,
      paddingHorizontal:20,
      width:Dimensions.get('window').width-50,
      borderWidth:0.5,
      height:50,
      borderColor:'#ff9900',
      backgroundColor:'#ff990017',
      borderRadius:5
    },

    linkText:{
      marginTop:60,
      color:'green'
    },

    selectItem:{
      width:Dimensions.get('window').width-100,
      height:100,
      borderColor:'#ff9900',
      alignItems:'center',
      justifyContent:'center',
      margin:5,
      borderRadius:5,
      elevation:5,
    },

    icon:{
      marginTop:30,
      marginLeft:20,
      alignSelf:'center'
    },

    header: {
      fontSize: 18,
      textTransform:'uppercase',
      color: '#000',
      marginTop: 30,
      marginLeft: -55,
      
    },

})

export default styles;