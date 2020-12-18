import React from 'react';
import { StyleSheet } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { Feather } from '@expo/vector-icons';
import propTypes from 'prop-types';

export const Arrow = ({ name, disabled, onPress }) => {
  const color = disabled ? '#d3d3d3' : '#0E7AFE';
  return (
    <TouchableScale
      tension={10}
      friction={3}
      useNativeDriver
      activeScale={0.85}
      style={styles.arrow}
      disabled={disabled}
      onPress={onPress}
    >
      <Feather name={name} size={35} color={color} />
    </TouchableScale>
  );
};

const styles = StyleSheet.create({
  arrow: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    width: 80,
    alignItems: 'center',
  },
});

Arrow.propTypes = {
  name: propTypes.string.isRequired,
  disabled: propTypes.bool,
  onPress: propTypes.func.isRequired,
};
