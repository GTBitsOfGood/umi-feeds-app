import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  topContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  spacedContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    width: '100%',
  },
  standardText: {
    alignContent: 'flex-start',
    fontSize: 15,
    color: 'black',
  },
  title: {
    alignContent: 'flex-start',
    fontSize: 32,
    fontWeight: '500',
    color: 'black',
  },
  detailsHeader: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black',
    marginVertical: 8,
  },
  details: {
    fontSize: 15,
    fontWeight: '400',
    color: 'black',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default styles;
