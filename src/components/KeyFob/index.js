/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';

type Props = {};

export default class KeyFob extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => {}}
            disabled={false}
            underlayColor={'#b9ccee'}>
            <Image
              style={styles.image}
              source={require('./img/lock.png')} />
          </TouchableHighlight>
          <View style={{ height: 88 }} />
          <TouchableHighlight
            style={styles.button}
            onPress={() => {}}
            disabled={false}
            underlayColor={'#b9ccee'}>
            <Image
              style={styles.image}
              source={require('./img/unlock.png')} />
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderWidth: 4,
    borderColor: '#27467f',
    borderRadius: 100,
    height: 100,
    justifyContent: 'center',
    padding: 8,
    width: 100,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#f5Fcff',
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    tintColor: '#5e81bc'
  }
});
