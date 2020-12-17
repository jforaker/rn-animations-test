import React from 'react';
import { StyleSheet } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { Feather } from '@expo/vector-icons';

export const Arrow = ({ name, ...props }) => {
  const color = props.disabled ? '#d3d3d3' : '#0E7AFE';
  return (
    <TouchableScale
      tension={10}
      friction={3}
      useNativeDriver
      activeScale={0.85}
      style={styles.arrow}
      {...props}
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
