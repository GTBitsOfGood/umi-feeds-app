import { StyleSheet } from 'react-native';
import { ThemeColor } from '../../constants/Colors';

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
    backgroundColor: ThemeColor,
    paddingVertical: 16,
    marginVertical: 10,
  },
  filledButtonText: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
  },
  outlinedButton: {
    borderColor: ThemeColor,
    borderWidth: 2,
    paddingVertical: 14, // less padding to account for larger border
  },
  outlinedButtonText: {
    color: ThemeColor,
    fontWeight: '700',
    textAlign: 'center'
  },
});

export default styles;
