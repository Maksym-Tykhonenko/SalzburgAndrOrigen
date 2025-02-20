import React from 'react';
import {Image, View} from 'react-native';

export const Background = () => {
  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        left: 0,
        height: '100%',
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: -1,
      }}>
      <Image
        style={{width: '100%', height: '100%'}}
        source={require('../background.webp')}
      />
    </View>
  );
};
