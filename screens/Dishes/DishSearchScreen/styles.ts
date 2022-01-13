import { StyleSheet } from 'react-native';
import { ThemeColor } from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    marginHorizontal: 0,
    width: '100%',
  },
  contentContainer: {
    width: '85%',
    marginHorizontal: '7.5%',
    marginTop: '5%',
  },
  headerContainer: {
    marginBottom: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    // fontFamily: 'Roboto',
    paddingVertical: 0,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '500',
    // fontFamily: 'Roboto',
    paddingTop: 10,
    paddingBottom: 20
  },
  filledButton: {
    backgroundColor: ThemeColor,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 4,
    marginBottom: 15,
  },
  filledButtonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center'
  },
  outlinedButton: {
    borderColor: ThemeColor,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 4,
    marginBottom: 15,
  },
  outlinedButtonText: {
    color: ThemeColor,
    fontWeight: '700',
    textAlign: 'center'
  },
  searchBar: {
    borderColor: '#B8B8B8',
    borderWidth: 1,
    padding: 0,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  searchInput: {
    flexGrow: 1,
    paddingVertical: 15,
  }
});

export default styles;
