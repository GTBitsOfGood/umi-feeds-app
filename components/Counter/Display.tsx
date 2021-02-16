import React from 'react';

import { connect } from 'react-redux';

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
function mapStateToProps(state: { counter : { value : number }}) {
  const { counter } = state;
  const { value } = counter;
  return { count: value };
}

export default connect(
  mapStateToProps
)(Display);
