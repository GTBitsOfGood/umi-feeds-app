import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 0,
    width: '100%',
  },
  contentContainer: {
    backgroundColor: 'white',
    width: '85%',
    marginHorizontal: '7.5%',
  },
  addressCard: {
    borderWidth: 1,
    borderColor: '#b8b8b8',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15
  }
});

export default styles;
