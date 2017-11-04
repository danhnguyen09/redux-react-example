import {Text, View, Platform, TextInput, StyleSheet, ListView, Image, TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import {Icon, Left, InputGroup, Input, Button} from 'native-base';
import ToolBar from '../../components/LeftMenuNavigation/Toolbar/index'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Actions from '../../actions';
import LeftMenuNavigation from "../../components/LeftMenuNavigation/index";
import store from '../../store';
import {NavigationActions} from 'react-navigation';

class Demo extends Component {

    static navigationOptions = (navigation) => ({
        title: "Demo Page",
        headerTitleStyle: {
            color: 'white',
            textAlign: 'center'
        },
        headerLeft:
            <TouchableOpacity
                onPress={() => {
                    // store.dispatch(NavigationActions.back())
                }}>
                <Image style={{width: 30, height: 30, margin: 15}}
                       source={require('../../images/img/ic_back.png')}
                />
            </TouchableOpacity>,
        headerStyle: {
            backgroundColor: 'green',
            justifyContent: 'center'
        },

    })

    constructor(props) {
        super(props);
        this.state = {
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
        if (!nextProps.state.isLoading && nextProps.state.photos) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.state.photos),
            });
        }
    }

    render() {
        const {isLoading} = this.state;
        let contentView = (
            <View style={styles.container}>
                {isLoading
                    ? <View style={styles.loading}><Text>Loading...</Text></View>
                    : <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(photos) => <Row {...photos}/>}
                        enableEmptySections={true}
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

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 10 : 0,
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
        marginTop: 20,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
});
const Row = (photos) => (
    <View style={stylesRow.container}>
        <Image source={{uri: photos.thumbnailUrl}} style={stylesRow.photo}/>
        <Text style={stylesRow.text}>
            {`${photos.title} ${photos.id}`}
        </Text>
    </View>
);