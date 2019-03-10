import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import InnerSection from './inner-section';
import ButtonContainer from './button-container';
import { authInputChange, login } from '../actions';
import { connect } from 'react-redux';
import 'localstorage-polyfill';
import _ from 'lodash';

class LoginForm extends Component {
  componentWillReceiveProps(nextProps) {
    if(!_.isEmpty(nextProps.user)) {
      this.props.navigation.navigate('App');
    }
  }

  login() {
    const { email, password } = this.props;
    this.props.login({email, password});
  }

  showButton() {
    if(this.props.loading) {
      return (
        <View>
          <ActivityIndicator size={'small'} />
        </View>
      );
    }
    return (
    <Button title="Login" type="solid" raised buttonStyle={styles.buttonStyle}
              onPress={this.login.bind(this)} />
    );
  }

  showError() {
    if(this.props.error) {
      return (
        <Text style={styles.errorMessage}>{this.props.error}</Text>
      )
    }
  }

  render() {
    return (
      <View styles={styles.container}>
        <InnerSection>
          <Input placeholder="Email"
            value={this.props.email} 
            onChangeText={text => this.props.authInputChange({'field' : 'email', 'value': text}) } />
        </InnerSection>
        <InnerSection>
          <Input placeholder="Password" secureTextEntry={true} 
            value={this.props.password}
            onChangeText={text => this.props.authInputChange({'field' : 'password', 'value': text}) }/>
        </InnerSection>
        {this.showError()}
        <InnerSection>
          <ButtonContainer>
            {this.showButton()}
          </ButtonContainer>
        </InnerSection>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    loading: state.auth.loading,
    user: state.auth.user,
    error: state.auth.error
  }
}

export default connect(mapStateToProps, { authInputChange, login })(LoginForm)

const styles = {
  container: {
    marginTop: 25
  },

  buttonStyle: {
    backgroundColor: '#3bd3d4',
    width: 300
  },

  errorMessage: {
    paddingLeft: 10,
    color: 'red'
  }
}
