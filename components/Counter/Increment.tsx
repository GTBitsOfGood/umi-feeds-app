import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';

import { connect } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterReducer';

import { View } from '../Themed';

const mapDispatchToProps = { increment, decrement, incrementByAmount };

function Increment(props: {
    increment: () => void,
    decrement: () => void,
    incrementByAmount: (amount : number) => void,
}) {
  const { increment, decrement, incrementByAmount } = props;

  const [amountToIncrement, setAmountToIncrement] = useState(0);

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
      <Button
        title="Increment by"
        onPress={() => incrementByAmount(amountToIncrement)}
      />
      <TextInput
        value={amountToIncrement.toString()}
        onChangeText={(text) => setAmountToIncrement(+text)}
      />
    </View>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Increment);
