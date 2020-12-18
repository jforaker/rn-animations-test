import React from 'react';
import { Button, Platform, View, StyleSheet } from 'react-native';
import propTypes from 'prop-types';

import { Arrow } from './Arrow';

let ctrlStyles = {};

if (Platform.OS === 'ios') {
  ctrlStyles.marginBottom = 15;
}

export const Controls = ({
  index,
  side,
  len,
  events: { toggleSide, prevCard, nextCard },
}) => {
  const disableLeft = index === 0;
  const disableRight = index === len - 1;
  const revealText = `Reveal ${side === 'front' ? 'Answer' : 'Question'}`;

  return (
    <View style={[ctrlStyles, styles.ctrls]}>
      <Arrow
        name="arrow-left-circle"
        disabled={disableLeft}
        onPress={prevCard}
      />
      <Button title={revealText} onPress={toggleSide} />
      <Arrow
        name="arrow-right-circle"
        disabled={disableRight}
        onPress={nextCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ctrls: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

Controls.propTypes = {
  index: propTypes.number.isRequired,
  side: propTypes.oneOf(['front', 'back']),
  len: propTypes.number.isRequired,
  events: propTypes.shape({
    toggleSide: propTypes.func.isRequired,
    prevCard: propTypes.func.isRequired,
    nextCard: propTypes.func.isRequired,
  }),
};
