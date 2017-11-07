import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Demo2 from '../../layouts/demo/Demo2';
import Demo from '../../layouts/demo/index';
import Header from './DrawHeader';

const StackDemo = StackNavigator({
    Demo : {screen :Demo}
});

const StackDemo2 = StackNavigator({
    Demo2 : {screen :Demo2}
});

const StackHeader = StackNavigator({
    Header : {screen :Header}
});

const Drawer = DrawerNavigator(
    {
        DemoScreen: {
            path: "/",
            screen: StackDemo
        },
        Demo2Screen: {
            path: "/demo2",
            screen: StackDemo2
        }
    }, {
        initialRouteName: 'DemoScreen',
        drawerPosition: 'left',
        contentOptions: {
            activeTintColor: 'blue'
        },
        // contentComponent: Header,
    }
);



export default Drawer;