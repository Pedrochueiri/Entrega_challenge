import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Bubble = (props) => {
  const styles = [
    styles.bubble,
    props.messageIn && styles.itemIn,
    props.messageOut && styles.itemOut,
  ];

  return (
    <View>
      <Text style={styles}>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    padding: '0.625rem',
    borderRadius: '1.25rem',
    maxWidth: '15.625rem',
    marginTop: '0.625rem',
  },
  itemIn: {
    backgroundColor: '#ccc',
    alignSelf: 'flex-start',
  },
  itemOut: {
    backgroundColor: '#0c0',
    alignSelf: 'flex-end',
    color: '#fff',
  },
});

export default Bubble;
