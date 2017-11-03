import React, {Component} from 'react'
import {Platform, View, StatusBar, StyleSheet, Text} from 'react-native'
import {Navigator} from 'react-native-navigation-custom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from './actions';
import Home from "./layouts/home";

const StatusBarCustom = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, {backgroundColor}]}>
        <StatusBar backgroundColor={backgroundColor} {...props} />
    </View>
);

class App extends Component {
    constructor(props) {
        super(props)
    }

    renderScence(state, navigator) {
        const Screen = state.screen;
        if (Screen !== null) {
            return (<Screen navigator={navigator} params={state}/>)
        } else {
            return (<View style={{marginTop: 100}}>
                <Text style={{textAlign: 'center'}}>Page not found</Text>
            </View>)
        }
    }

    render() {
        return ( <View style={{flex: 1}}>
            <StatusBarCustom backgroundColor="#476576" barStyle="light-content"/>
            <Home/>
        </View>)
    }

}

const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        statusBar: {
            height: Platform.OS === 'ios' ? 20 : 0,
        }
    }
);

function mapStateToProps(state) {
    return {
        state: {...state.AppReducer}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...Actions.AppActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
