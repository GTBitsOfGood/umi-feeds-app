import { Platform } from 'react-native';

export const TouchableWithoutFeedbackBehavoirProp = Platform.OS === 'ios' ? 'padding' : undefined;
