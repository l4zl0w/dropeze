import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginForm from './components/login-form';
import Settings from './components/settings';
import MyTransit from './components/my-transit';
import { Icon } from 'react-native-elements';

const AuthStack = createStackNavigator({
    Login: {
        screen: LoginForm,
        navigationOptions: ({ navigation }) => ({
            title: `Login`
        })
    }
});

const AppStack = createStackNavigator({
    Transit: {
        screen: MyTransit,
        navigationOptions: ({ navigation }) => {
            return {
                title: `My Transit`,
                headerRight: (
                    <Icon 
                        type='font-awesome'
                        name='cog'
                        size={30}
                        onPress={() => navigation.navigate('Settings')}
                        iconStyle={{paddingRight: 10}}
                    />
                ),
                headerLeft: null
            };
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: () => ({
            title: `Settings`
        })
    }
});

export default createAppContainer(createSwitchNavigator(
    {
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Auth'
    }
  ));