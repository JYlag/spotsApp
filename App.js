import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './src/store';
import firebase from 'firebase';
import { RNS3 } from 'react-native-aws3';

// ===== ICON IMPORTS =====>
import HomeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListIcon from 'react-native-vector-icons/MaterialCommunityIcons';

//======SCREEN IMPORTS========
import WelcomeScreen from './src/screens/main/WelcomeScreen';
import FacebookLogin from './src/screens/auth/FacebookLogin';
import LoginScreen from './src/screens/auth/LogInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import Home from './src/screens/main/HomeScreen';
import Map from './src/screens/main/MapScreen';
import ListSpots from './src/screens/main/ListSpotsScreen';
import Settings from './src/screens/main/SettingsScreen';
import AddSpotScreen from "./src/screens/main/AddSpotScreen";
import Spot from "./src/components/Spot";

const config = {
    apiKey: "AIzaSyBKsVfwq1WazusWdBxnKs9hSx7I-0biwS8",
    authDomain: "spots-81d2c.firebaseapp.com",
    databaseURL: "https://spots-81d2c.firebaseio.com",
    projectId: "spots-81d2c",
    storageBucket: "spots-81d2c.appspot.com",
    messagingSenderId: "365097605984"
};
export const options = {
    keyPrefix: 'photos/',
    bucket: "spots-jylagan",
    region: "us-west-2",
    accessKey: "AKIAJ4F6ZQBVQDSR3WUA",
    secretKey: "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",
    successActionStatus: 201
};

export default class App extends React.Component {



    componentDidMount() {
        firebase.initializeApp(config);
    }

    render() {

        /*home: {
            screen: createStackNavigator({
                home: {screen: Home},
                settings: {screen: Settings}
            }),
                navigationOptions: () => ({
                tabBarIcon: () => {
                    return <HomeIcon name="home" size={25}/>;
                }
            })

        }*/

        let HomeStack = createStackNavigator({
            home: { screen: Home },
            settings: { screen: Settings }
        });

        let MapStack = createStackNavigator({
            map: { screen: Map },
            addSpot: { screen: AddSpotScreen}
        }, {
            navigationOptions: {
                header: null
            }
        });

        let ListSpotsStack = createStackNavigator({
            listSpots: { screen: ListSpots },
            spot: { screen: Spot }
        });

        let AuthStack = createStackNavigator({
            login: { screen: LoginScreen},
            signup: { screen: SignUpScreen }
        }, {
            navigationOptions: {
                header: null
            }
        });

        let MainStack = createBottomTabNavigator({
            home: HomeStack,
            map: MapStack,
            listSpots: ListSpotsStack
        },{
            navigationOptions: {
                tabBarOptions: {
                    showLabel: false,
                    activeBackgroundColor: '#FF9100',
                    inactiveBackgroundColor: '#FFAB40'
                }
            }
        });

        HomeStack.navigationOptions = {
            tabBarIcon: () => {
                return <HomeIcon name="home" size={25} style={{color: '#424242'}}/>;
            }

        };

        MapStack.navigationOptions = {
            tabBarIcon: () => {
                return <MapIcon name="map-marker-plus" size={25} style={{color: '#424242'}}/>;
            },
            tabBarVisible: false
        };

        ListSpotsStack.navigationOptions = {
            tabBarIcon: () => {
                return <ListIcon name="view-list" size={25} style={{color: '#424242'}}/>;
            }
        };

        const MainNavigator = createBottomTabNavigator({
              auth: AuthStack,
              welcome: {screen: WelcomeScreen},
              main: MainStack
          }, {
              navigationOptions: {
                  tabBarVisible: false
              }
        });

        return (
              <Provider store={store}>
                  <View style={styles.container}>
                      <MainNavigator/>
                  </View>
              </Provider>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
