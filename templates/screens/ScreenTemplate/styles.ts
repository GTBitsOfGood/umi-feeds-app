import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  box1: {
    flex: 1,
    height: 200,
    backgroundColor: 'blue'
  },
  box2: {
    flex: 1,
    height: 200,
    backgroundColor: 'purple'
  },
  headerContainer: {
    marginBottom: 20,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 0,
  }
});

export default styles;
