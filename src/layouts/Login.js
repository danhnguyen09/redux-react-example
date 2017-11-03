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
            isValid: true,
            isLoading: false,
        }
    }

    static navigationOptions = {
        header: null,
    };

    _doLogin() {
        if (validateEmail(this.state.username) && validatePassword(this.state.password)) {
            this.setState({
                isValid: true,
            })
            this.props.actions.loginWithEmail(this.state.username, this.state.password)

        } else {
            this.setState({
                isValid: false
            })
        }
    }

    _navigateTo = () => {
        store.dispatch(NavigationActions.navigate({type: 'NAVI_DEMO', routeName: 'MainPage'}))
    }

    _onModelYearPress = () => {
        const navigate = this.props.navigation.navigate;
        navigate('HomePage', {title: "List Data"})
    };

    componentDidMount() {
        this.setState({isLoading: true});
    }

    componentWillUnmount() {
        this.setState({isLoading: false});
    }

    componentWillReceiveProps(loginProps) {
        this.setState({
            isLoading: loginProps.state.isLoading,
        })
        if (loginProps.state.isLoginSuccess && !loginProps.state.isWaitingLogin) {
            this._navigateTo()
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
                               this.state.username = input;
                               this.setState({
                                   isValid: true
                               })
                           }}/>

                <TextInput style={styles.input_login_field}
                           placeholder="Password"
                           secureTextEntry={true}
                           returnKeyType="go"
                           value="123456"
                           onChangeText={(input) => {
                               this.state.password = input;
                               this.setState({
                                   isValid: true
                               })
                           }}/>

                <Text style={{
                    color: "#FF0000",
                    margin: 20,
                    textAlign: 'center'
                }}>{this.state.isValid ? ' ' : "Email or password is wrong format!"}</Text>
                <TouchableOpacity style={styles.button}
                                  onPress={this._navigateTo}>
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