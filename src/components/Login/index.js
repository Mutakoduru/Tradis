/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
    KeyboardAvoidingView
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { login } from './actions';


type Props = {};

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    Animated.timing(                  // Animate over time
        this.state.fadeAnim,            // The animated value to drive
        {
          toValue: 1,                   // Animate to opacity: 1 (opaque)
          duration: 10000,              // Make it take a while
        }
    ).start();                        // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
        <Animated.View                 // Special animatable View
            style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
        >
          {this.props.children}
        </Animated.View>
    );
  }
}

class Login extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', status: '', loginSuccess: '', loginError: ''};
  }

  gotoKeyFob = () => {
    this.props.navigation.navigate('KeyFob')
  }


  componentWillReceiveProps(np) {
    debugger;
    if(this.state.loginSuccess != np.loginSuccess) {
      this.setState({status : 'Login Successfull'});
      let that = this;
      setTimeout(()=> {
        that.setState({ loginSuccess : '', status: '', username: '', password: ''});
        that.gotoKeyFob();
      }, 1000)

    } else if(this.state.loginError != np.loginError) {
      this.setState({status : np.loginError});
    }
  }

  render() {
    const {username, password, status} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} enabled={true} behavior="position">
        <FadeInView >
          <Image style={styles.image} source={require('./img/tardis.png')} />
        </FadeInView>
        <View style={styles.rowContainer}>
          <TextInput
              value={this.state.username}
            style={styles.textField}
            placeholder={'username'}
            autoCapitalize="none"
            onChangeText={(text) => {this.setState((previous) => ({...previous, username: text}))}}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
              value={this.state.password}
            style={styles.textField}
            placeholder={'password'}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(text) => {this.setState((previous) => ({...previous, password: text}))}}
          />
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => this.props.login({username, password}) }
            disabled={false}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
        {
          status ? <Text style={styles.status} >{status}</Text> : ''
        }
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  debugger;
  return {
    loginSuccess: state.loginReducer.loginSuccess,
    loginError: state.loginReducer.loginError
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login: login
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps )(Login)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f5fcff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  disabledSubmit: {
    alignItems: 'center',
    backgroundColor: '#b9ccee',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginLeft: 44,
    marginRight: 44,
    marginTop: 12,
  },
  image: {
    height: 240,
    marginBottom: 44,
    marginTop: 60,
    resizeMode: Image.resizeMode.contain,
    width: 240,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  submit: {
    alignItems: 'center',
    backgroundColor: '#5e81bc',
    borderRadius: 4,
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white'
  },
  textField: {
    borderColor: 'blue',
    borderWidth: 1,
    flex: 1,
    marginTop: 15,
    padding: 10,
  },
  status : {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    marginTop: 10,
    textAlign: 'center'
  }
});
