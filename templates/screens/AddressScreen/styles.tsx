import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    marginHorizontal: 0,
    width: '100%',
  },
  contentContainer: {
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
