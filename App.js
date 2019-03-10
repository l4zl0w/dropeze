import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginForm from './src/components/login-form';
import Header from './src/components/header';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import Parse from 'parse';
import AppNavigator from './src/navigation';

export default class App extends React.Component {
  componentDidMount() {
    Parse.initialize("raA6QehXhfjFyKCdnvSkXAmfJnjLEncSvsryDlu3", "26VI1wcX5h5z1eJj24odZ0earhsG3QEqGpWtPTTs");
    Parse.serverURL = 'https://parseapi.back4app.com/';
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});