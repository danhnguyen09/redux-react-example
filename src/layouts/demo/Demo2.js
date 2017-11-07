import {Text, View, Platform, TextInput, TouchableOpacity, Image} from 'react-native'
import React, {Component} from 'react'
import {Icon, Left, InputGroup, Input, Button} from 'native-base';
import styles from './styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from '../../actions';
import store from "../../store/index";
import {NavigationActions} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Demo2 extends Component {
    static navigationOptions = (navigation) => ({
        title: "Demo2 Page",
        headerTitleStyle: {
            color: 'white',
            textAlign: 'center'
        },
        headerLeft:
            <TouchableOpacity
                onPress={() => {
                    store.dispatch(NavigationActions.navigate({routeName: 'DrawerOpen'}))
                    // this.prop.navigation.navigate('DrawerOpen')
                }}>
                <Image style={{width: 24, height: 24, margin: 15}}
                       source={require('../../images/img/setting.png')}
                />
            </TouchableOpacity>,
        headerStyle: {
            backgroundColor: 'green',
            justifyContent: 'center'
        },
        drawerIcon: () => {
            return (
                <Image style={{width: 24, height: 24, margin: 15}}
                       source={require('../../images/img/ic_weekend_black_24dp_2x.png')}/>
            )
        }

    })

    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }

    _onButton1Click() {
        this.props.actions.demoButton1Click(this.state.value)
    }

    _onButton2Click() {
        this.props.actions.demoButton2Click(this.state.value)
    }

    _onSendButtonClick() {
        // this.props.navigator.resetTo({screen: Demo, value: this.state.value})
    }

    render() {
        let contentView = (
            <View style={styles.container}>
                <View style={{margin: 20}}>
                    <InputGroup borderType='underline' style={styles.input_group}>
                        <Input name="txtInput" placeholder='Enter value' style={styles.input}
                               placeholderTextColor='#999999'
                               autoFocus={true}
                               onChangeText={(value) => this.setState({value: value})}
                               onSubmitEditing={() => {
                                   this._onSendButtonClick()
                               }}
                               returnKeyType='done'/>
                    </InputGroup>
                    <View style={styles.buttonContainer}>
                        <Button bordered onPress={this._onButton1Click.bind(this)}>
                            <Text style={{width: 80, textAlign: 'center'}}>+5</Text>
                        </Button>
                        <Button bordered style={{marginLeft: 20}} onPress={this._onButton2Click.bind(this)}>
                            <Text style={{width: 80, textAlign: 'center'}}>-5</Text>
                        </Button>
                    </View>
                    <Text style={{marginTop: 50}}>Result: {this.props.state.value}</Text>
                </View>

            </View>);
        return (contentView)
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Demo2);