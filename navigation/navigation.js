import React from 'react';
import {Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import Steps from '../screens/steps';
import Calories from '../screens/calories';
import Cam from '../screens/cam';
import Food from '../screens/food';
import List from '../screens/myList';
import Bmi from '../screens/bmi';
import Chatbot from '../screens/chatbot';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const PlacesNavigator = createStackNavigator({
    Steps: Steps,
    Calories: Calories,
    Cam: Cam,
    Food: Food,
    // Chatbot: Chatbot,
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS==='android' ? 'black':'',

        },
        headerTintColor: Platform.OS==='android' ? 'white' : 'black'
    },
});

const CalNavigator = createStackNavigator({
    Food: Food,
    Cam: Cam,
    Calories: Calories
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS==='android' ? 'black':'',

        },
        headerTintColor: Platform.OS==='android' ? 'white' : 'black'
    },
});

const BmiNavigator = createStackNavigator({
    Bmi: Bmi,
    Cam: Cam,
    Calories: Calories
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS==='android' ? 'black':'',

        },
        headerTintColor: Platform.OS==='android' ? 'white' : 'black'
    },
});

const config = {
    Steps:{
        screen: PlacesNavigator,
        navigationOptions:{
            tabBarColor: "blue",
            tabBarLabel: <Text style={{textAlign: 'center',marginBottom:15}}>Steps</Text>
        }
    },
    Calories:{
        screen: CalNavigator,
        navigationOptions:{
            tabBarColor: "red",
            tabBarLabel: <Text style={{textAlign: 'center',marginBottom:15}}>My Meals</Text>
        }
    },
    Camera: {
        screen: Cam,
        navigationOptions:{
            tabBarColor: "red",
            tabBarLabel: <Text style={{textAlign: 'center',marginBottom:15}}>Snap</Text>
        }
    },
    Bmi: {
        screen: BmiNavigator,
        navigationOptions:{
            tabBarColor: "red",
            tabBarLabel: <Text style={{textAlign: 'center',marginBottom:15}}>BMI</Text>
        }
    }
}

const TabNav = createBottomTabNavigator(
    config
    ,{
        tabBarOptions:{
            activeTintColor: 'green'
        }
    }
)

export default createAppContainer(TabNav);