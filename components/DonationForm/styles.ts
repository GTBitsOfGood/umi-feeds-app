import { StyleSheet, Dimensions } from 'react-native';

export const orangeColor = '#F37B36';

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
    backgroundColor: orangeColor,
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
    borderColor: orangeColor,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 4,
    marginBottom: 15,
  },
  outlinedButtonText: {
    color: orangeColor,
    fontWeight: '700',
    textAlign: 'center'
  },
  searchBar: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
    padding: 0,
    borderRadius: 4,
  },
  searchInput: {
    flexGrow: 1,
    padding: 15,
  }
});

export default styles;
