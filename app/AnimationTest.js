import React, { useState, useRef, useEffect } from 'react';
import {
  Easing,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import FlipView from 'react-native-flip-view-next';
import cards from './Cards';
import { Controls } from '../components';

const SCREEN_WIDTH = Dimensions.get('window').width;
const FLIP_DURATION = 555;

const xOffset = new Animated.Value(0);

const onScroll = Animated.event(
  [{ nativeEvent: { contentOffset: { x: xOffset } } }],
  { useNativeDriver: true }
);

const rotateTransform = (index) => {
  return {
    transform: [
      {
        rotate: xOffset.interpolate({
          inputRange: [
            (index - 1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH,
          ],
          outputRange: ['7deg', '0deg', '-7deg'],
        }),
      },
    ],
  };
};

const AnimationTest = () => {
  const [index, setIndex] = useState(0);
  const [side, setSide] = useState('front');
  const [xPositions, setXPosition] = useState([]);
  const [isFlipping, setIsFlipping] = useState(false);
  const scrollViewRef = useRef(null);
  const marginTop = getStatusBarHeight();

  const toggleSide = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setSide(side === 'front' ? 'back' : 'front');
    }
  };

  const prevCard = async () => {
    if (index <= 0 || isFlipping) {
      return;
    }

    setIndex(index - 1);
  };

  const nextCard = async () => {
    if (index >= cards.length - 1 || isFlipping) {
      return;
    }

    setIndex(index + 1);
  };

  useEffect(() => {
    let pause;
    const handlePaging = (idx) => {
      const x = xPositions.find((el) => el.idx === idx)?.x;

      if (typeof x === 'undefined') return;
      scrollViewRef.current?.scrollTo({
        x,
        y: 0,
        animated: true,
      });
    };

    if (side === 'back') {
      setSide('front');
      pause = setTimeout(() => handlePaging(index), FLIP_DURATION / 2);
    } else {
      handlePaging(index);
    }

    return () => clearTimeout(pause);
  }, [index]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} barStyle="dark-content" />

      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEnabled={false} // to be controlled programatically instead
        horizontal
        style={[{ marginTop }, styles.scrollView]}
      >
        {cards.map(({ front, back }, idx) => (
          <Animated.View
            key={idx}
            style={[styles.body, rotateTransform(idx)]}
            onLayout={({ nativeEvent }) => {
              const { x } = nativeEvent.layout;
              if (xPositions.some((el) => el.idx === idx)) return;
              // On layout, set an array of objects that represents index and x value from right to left-most card
              // and enable a call to ScrollView.scrollTo(x), for ex: [{ idx: 0, x: 0}, { idx: 1, x: 220}]
              setXPosition((prev) => [...prev, { idx, x }]);
            }}
          >
            <FlipView
              key={idx}
              style={styles.flipView}
              front={front}
              back={back}
              isFlipped={side === 'back'}
              flipAxis="y"
              flipEasing={Easing.elastic(1.125)}
              flipDuration={FLIP_DURATION}
              perspective={3000}
              onFlipEnd={() => setIsFlipping(false)}
            />
          </Animated.View>
        ))}
      </Animated.ScrollView>

      <Controls
        values={{ index, isFlipping, len: cards.length, side }}
        events={{ prevCard, nextCard, toggleSide }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
  },
  flipView: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 7,
    width: SCREEN_WIDTH,
  },
});

export { AnimationTest as default };
