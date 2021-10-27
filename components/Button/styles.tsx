import { StyleSheet } from 'react-native';

export const orangeColor = '#F37B36';

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'visible'
  },
  filledButton: {
    backgroundColor: orangeColor,
    paddingVertical: 16,
    marginVertical: 10,
  },
  filledButtonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  outlinedButton: {
    borderColor: orangeColor,
    borderWidth: 2,
    paddingVertical: 14, // less padding to account for larger border
  },
  outlinedButtonText: {
    color: orangeColor,
    fontWeight: '700',
    textAlign: 'center'
  },
});

export default styles;
