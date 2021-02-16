import React from 'react';

import { connect } from 'react-redux';
import { RootState } from '../../rootReducer';

import { Text, View } from '../Themed';

function Display(props: {
    count : number
}) {
  const { count } = props;
  return (
    <View>
      <Text>{`The current count is ${count}`}</Text>
    </View>
  );
}

// For demonstration purposes - this is like a selector that gets a value from the store
function mapStateToProps(state: RootState) {
  return { count: state.counter.value };
}

export default connect(
  mapStateToProps
)(Display);
