import React, { useRef, useState } from 'react';
import { View, Animated, KeyboardTypeOptions, Image, ImageSourcePropType } from 'react-native';
import { Input } from 'react-native-elements';
import Styles from './styles';

/**
 * Reusable Text Input where the placeholder text slides up when the user focuses on it (taps on it)
 *
 * IMPORTANT NOTES:
 *  Based on the FloatingTitleTextInputField from this blog post:
 *  https://medium.com/@farid12ansari7/floating-title-or-placeholder-text-input-field-react-native-5fb5932669d
 *
 * KNOWN BUGS: None
 *
 * @param {string} title The placeholder text for the text input
 * @param {string} value The actual value of what is typed into the text input
 * @param {Function} onChangeText Function to run whenever the text is updated.  Passes the new value as a parameter
 * @param {KeyboardTypeOptions} keyboardType  The keyboard type for the input.  Probably 'default' or 'numeric' typically
 * @param {boolean} required Is this a required text entry?  If so turn red if the user taps it and then ignores it
 * @param {ImageSourcePropType} img An optional image to include on the left side of the text box
 * @param {number} roundToPlaces An optional integer specifying how many places to round a decimal input to onBlur
 * @returns {TSX.Element}
 */
function FloatingTitleTextInputField(props: {
                                         title:string,
                                         value:string,
                                         onChangeText: (attr:string)=>void,
                                         keyboardType:KeyboardTypeOptions,
                                         required:boolean,
                                         img?:ImageSourcePropType,
                                         roundToPlaces?:number
                                       }) {
  const [isFieldActive, setFieldActive] = useState(false);
  const [hasUserSkipped, setHasUserSkipped] = useState(false);

  const position = useRef(new Animated.Value(props.value ? 1 : 0)).current;

  const handleFocus = () => {
    if (!isFieldActive) {
      setFieldActive(true);
      setHasUserSkipped(false);
      Animated.timing(position, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleBlur = () => {
    if (isFieldActive && !props.value) {
      setFieldActive(false);
      setHasUserSkipped(true);
      Animated.timing(position, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false
      }).start();
    }
    // If the output should be rounded on exiting the text box check that it is a number and do it
    if (props.roundToPlaces && Number.isFinite(+props.value)) {
      props.onChangeText(parseFloat(props.value).toFixed(props.roundToPlaces).toString());
    }
  };

  const getAnimatedTitlesStyles = () => ({
    top: position.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 5],
    }),
    fontSize: isFieldActive ? 11.5 : 15,
    color: hasUserSkipped && props.required ? '#FF3131' : '#5D5D5D',
    marginLeft: props.img ? 56 : 15,
  });

  return (
    <View style={[Styles.container, { borderColor: hasUserSkipped && props.required ? '#FF3131' : '#B8B8B8' }]}>
      {props.img && (
      <Image
        source={props.img}
        style={Styles.imageStyle}
      />
      )}
      <Animated.Text
        style={[Styles.titleStyles, getAnimatedTitlesStyles()]}
      >
        {props.title}
      </Animated.Text>
      <Input
        value={props.value}
        style={[Styles.textInput, { marginRight: props.img ? '15%' : '0%' }]}
        underlineColorAndroid="transparent"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={(val:string) => props.onChangeText(val)}
        keyboardType={props.keyboardType}
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
    </View>
  );
}

export default FloatingTitleTextInputField;
