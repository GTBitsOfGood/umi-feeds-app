import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center'
    },
    scrollView: {
      marginHorizontal: 0,
      width: '100%',
    },
    pictureButton: {
      width: 327,
      height: 52,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: '#F37B36',
    },
    pictureButtonText: {
      flex: 1,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 17,
      lineHeight: 20,
      alignItems: 'center',
      textAlign: 'center',
      color: '#F37B36',
      paddingTop: 15
  
    },
    boxInput: {
      borderWidth: 2,
      borderColor: 'lightgray',
      borderRadius: 6,
      marginVertical: 10,
      fontFamily: 'Roboto',
      width: 325,
    },
    dishContainer: {
      width: '80%',
      margin: '10%',
      justifyContent: 'center',
      alignContent: 'center',
    },
    title: {
      fontSize: 32,
      paddingVertical: 10,
    },
    description: {
      fontSize: 15,
      paddingVertical: 10,
    },
    subsection: {
      paddingTop: 15,
      fontSize: 15,
      fontWeight: 'bold',
      color: '#202020'
    },
    checkboxContainer: {
      display: 'flex',
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'flex-start'
    },
    checkbox: {
      borderWidth: 0,
      color: '#202020',
      fontSize: 15,
      backgroundColor: 'transparent',
      borderColor: '#FFFFFF',
    },
    item: {
      width: '50%'
    },
    commentInput: {
      borderWidth: 2,
      borderColor: 'lightgray',
      borderRadius: 6,
      marginVertical: 10,
      fontFamily: 'Roboto',
      width: 325,
      height: 174
    },
    submitButtonDisabled: {
      backgroundColor: '#B8B8B8',
      width: 327,
      height: 52,
      borderRadius: 4
    },
    submitButton: {
      backgroundColor: '#F37B36',
      width: 327,
      height: 52,
      borderRadius: 4
    },
    submitText: {
      flex: 1,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 17,
      lineHeight: 20,
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
      paddingTop: 17
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      display: 'flex',
      flexDirection: 'column',
      width: '70%',
      height: '40%',
      textAlign: 'left',
      margin: 100,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 10
    },
    button: {
      height: '15%',
      width: '100%',
      borderRadius: 4,
      padding: 10,
      elevation: 2,
      marginBottom: 10,
      alignItems: 'center',
    },
    saveButton: {
      backgroundColor: '#F37B36',
    },
    cancelButton: {
      borderRadius: 10,
      borderWidth: 3,
      borderColor: '#F37B36',
      backgroundColor: '#FFFFFF',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 17,
    },
    cancelTextStyle: {
      color: '#F37B36',
      fontWeight: 'bold',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 17,
    },
    modalText: {
      color: '#202020',
      fontSize: 26,
      lineHeight: 30,
      fontWeight: 'bold',
    },
    modalSubtitle: {
      marginTop: 5,
      color: '#202020',
      fontSize: 15,
      lineHeight: 20,
      paddingBottom: 50
    },
    input: {
      height: '20%',
      width: '100%',
      marginTop: 20,
      marginBottom: 20,
      borderWidth: 0.5,
      color: 'black',
      borderColor: 'black',
      borderRadius: 5,
      padding: 10,
    }
  });

  export default styles;