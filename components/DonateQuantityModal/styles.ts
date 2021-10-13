import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalPlacement: {
    flex: 8
  },
  modalView: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    height: '90%',
    textAlign: 'left',
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
    elevation: 10,
  },
  button: {
    height: '20%',
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
    lineHeight: 20
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
