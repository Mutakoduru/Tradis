/**
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import {KeyFob, Login} from './src/components/';
import { Provider } from 'react-redux';
import store from './src/store';

type Props = {};


const RootStack = StackNavigator(
    {
        KeyFob: {
            screen: KeyFob,
        },
        Login: {
            screen: Login,
        },
    },
    {
        initialRouteName: 'Login',
    }
);

export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <RootStack />
            </Provider>
        );
    }
}

