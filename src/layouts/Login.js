import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, Button} from 'react-native';
import {NavigationActions} from 'react-navigation';
import styles from './demo/styles';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from '../actions';
import store from "../store/index";

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "demo@gmail.com",
            password: "123456",
            isShowValidError: false,
            movedPage: false
        }
    }

    static navigationOptions = {
        header: null,
    };

    _doLogin() {
        console.log("call login")
        if (validateEmail(this.state.username) && validatePassword(this.state.password)) {
            this.setState({
                isShowValidError: false,
            })
            this.props.actions.loginWithEmail(this.state.username, this.state.password)

        } else {
            this.setState({
                isShowValidError: true
            })
        }
    }

    _navigateToMain = () => {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({type: 'NAVI_DEMO', routeName: 'MainPage'})
            ]
        });
        store.dispatch(resetAction)
    }

    _onModelYearPress = () => {
        const navigate = this.props.navigation.navigate;
        navigate('HomePage', {title: "List Data"})
    };

    componentWillReceiveProps(loginProps) {
        this.setState({
            isLoading: loginProps.state.isLoading,
        })
        if (loginProps.state.isLoginSuccess && !loginProps.state.isWaitingLogin && !this.state.movedPage) {
            this.setState({
                movedPage: true
            })
            this._navigateToMain()
            console.log("Login success! ")
        } else {
            console.log(" Login fail! ")
        }

    }

    render() {

        return (<View style={styles.container}>
                <Text style={styles.login_label}>LOGIN</Text>
                <TextInput style={styles.input_login_field}
                           placeholder="Email"
                           autoCorrect={false}
                           keyboardType='email-address'
                           returnKeyType="next"
                           value="demo@gmail.com"
                           onChangeText={(input) => {
                               this.setState({
                                   isShowValidError: false,
                                   username: input
                               })
                           }}/>

                <TextInput style={styles.input_login_field}
                           placeholder="Password"
                           secureTextEntry={true}
                           returnKeyType="go"
                           value="123456"
                           onChangeText={(input) => {
                               this.setState({
                                   isShowValidError: false,
                                   password: input
                               })
                           }}/>

                <Text style={{
                    color: "#FF0000",
                    margin: 20,
                    textAlign: 'center'
                }}>{this.state.isShowValidError ? "Email or password is wrong format!" : ' '}</Text>
                <TouchableOpacity style={styles.button}
                                  onPress={this._doLogin.bind(this)}>
                    <Text style={styles.login_button}>Login</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

function mapStateToProp(state) {
    return {
        state: {...state.loginReducer, ...state.NavigationReducer},
    }
}

function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators({...Actions.loginActions, ...Actions.naviActions}, dispatch)
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validatePassword(password) {
    return password && password.length > 0;
}

export default connect(mapStateToProp, mapDispatchToProp)(Login);