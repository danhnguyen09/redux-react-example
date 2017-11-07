import {Text, View, Platform, TextInput, StyleSheet, ListView, Image, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import {Icon, Left, InputGroup, Input, Button} from 'native-base';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from '../../actions';
import store from '../../store';
import {NavigationActions} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Alert} from "react-native";

class Demo extends Component {

    static navigationOptions = (navigation) => ({
        title: "Demo Page",
        headerTitleStyle: {
            color: 'white',
            textAlign: 'center'
        },
        headerLeft:
            <TouchableOpacity style={{backgroundColor: "red", padding: 10}} onPress={() => {
                console.log("Open Draw", "I was opened")
                store.dispatch(NavigationActions.navigate({routeName: 'DrawerOpen'}))
            }
            }>
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
                       source={require('../../images/img/ic_home_black_24dp_2x.png')}/>
            )
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            isLoadedData: false,
            isLoading: false,
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        this.props.actions.getPhoto();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isLoading: nextProps.state.isLoading});
        if (!nextProps.state.isLoading && nextProps.state.photos && !this.state.isLoadedData) {
            this.setState({
                isLoadedData: true,
                dataSource: this.state.dataSource.cloneWithRows(nextProps.state.photos),
            });
        }
    }

    render() {
        const {isLoading} = this.state;
        let contentView = (
            <View style={stylesList.container}>
                {isLoading
                    ? <View style={stylesList.loading}><Text>Loading...</Text></View>
                    : <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(photos) => <Row key={photos.id} {...photos}/>}
                    />
                }
            </View>
        );
        return (contentView);
    }
}

function mapStateToProps(state) {
    return {
        state: {...state.photoReducer}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({...Actions.photoActions}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo);

const stylesList = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollSpinner: {
        marginVertical: 20,
    },
    row: {
        padding: 10,
    }
});

const stylesRow = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 10,
        marginRight: 30,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: '#8E8E8E',
    },
});
const Row = (photos) => (
    <View style={stylesRow.container}>
        <Image source={{uri: photos.thumbnailUrl}} style={stylesRow.photo}/>
        <Text style={stylesRow.text} onPress={() => {
            Alert.alert("Information", "Click at id: " + photos.id + "\n" + photos.title)
        }}>
            {photos.title}
        </Text>
    </View>

);