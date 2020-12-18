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
const FLIP_DURATIONS = { front: 375, back: 625 };
const SB_HEIGHT = getStatusBarHeight();

const xOffset = new Animated.Value(0);

const onScroll = Animated.event(
  [{ nativeEvent: { contentOffset: { x: xOffset } } }],
  { useNativeDriver: true }
);

const transformRotate = (index) => {
  const inputRange = [
    (index - 1) * SCREEN_WIDTH,
    index * SCREEN_WIDTH,
    (index + 1) * SCREEN_WIDTH,
  ];
  return {
    transform: [
      {
        scale: xOffset.interpolate({
          inputRange,
          outputRange: [0.8, 1, 0.8],
        }),
      },
      {
        rotate: xOffset.interpolate({
          inputRange,
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

  const toggleSide = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setSide(side === 'front' ? 'back' : 'front');
    }
  };

  const prevCard = () => {
    if (index <= 0 || isFlipping) {
      return;
    }

    setIndex(index - 1);
  };

  const nextCard = () => {
    if (index >= cards.length - 1 || isFlipping) {
      return;
    }

    setIndex(index + 1);
  };

  useEffect(() => {
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
      // when the index is moved while viewing the answer, quickly flip the card back to the question side,
      // let the flip animation finish, then animate the paging forward or backward
      setSide('front');
      const delayPaging = async () => {
        await new Promise((r) => setTimeout(r, FLIP_DURATIONS.front + 100));
        handlePaging(index);
      };
      delayPaging();
    } else {
      handlePaging(index);
    }

    return () => {};
  }, [index]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} barStyle="dark-content" />

      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEnabled={false} // to be controlled programatically instead
        scrollEventThrottle={16}
        horizontal
        pagingEnabled
        style={{ marginTop: SB_HEIGHT }}
      >
        {cards.map(({ front, back }, idx) => {
          const isBack = side === 'back';
          return (
            <Animated.View
              key={idx}
              style={[styles.body, transformRotate(idx)]}
              onLayout={({ nativeEvent }) => {
                const { x } = nativeEvent.layout;
                if (xPositions.some((el) => el.idx === idx)) return;
                // On layout, set an array of objects that represents index and x value from right to left-most card
                // and enable a call to ScrollView.scrollTo(x), for ex: [{ idx: 0, x: 0}, { idx: 1, x: 220}]
                setXPosition((prev) => [...prev, { idx, x }]);
              }}
            >
              <FlipView
                style={styles.flipView}
                front={front}
                back={back}
                isFlipped={isBack}
                flipEasing={isBack ? Easing.cubic : Easing.elastic(1.125)}
                flipDuration={
                  isBack ? FLIP_DURATIONS.front : FLIP_DURATIONS.back
                }
                perspective={3000}
                onFlipEnd={() => setIsFlipping(false)}
              />
            </Animated.View>
          );
        })}
      </Animated.ScrollView>

      <Controls
        index={index}
        len={cards.length}
        side={side}
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
