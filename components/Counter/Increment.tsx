import React from 'react';
import { Button } from 'react-native';

import { connect } from 'react-redux';
import { increment, decrement } from './counterReducer';

import { View } from '../Themed';

const mapDispatchToProps = { increment, decrement };

function Increment(props: {
    increment: () => void,
    decrement: () => void
}) {
  const { increment, decrement } = props;

  return (
    <View>
      <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button
        title="Increment Counter"
                // Note that increment CANNOT be passed directly as a function, or Navigation breaks
                // See: https://github.com/react-navigation/react-navigation/issues/8923
        onPress={() => increment()}
      />
      <Button
        title="Decrement Counter"
        onPress={() => decrement()}
      />
    </View>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Increment);
