import React, {Component} from 'react'
import {View, Text} from 'react-native'
export default class MenuView extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<View style={{ flex:1,
            flexDirection: 'column',
            justifyContent:'center',
            alignItems: 'center',
            backgroundColor:'#FFF'}}>
            <Text>Left Menu</Text>
        </View>)
    }
}