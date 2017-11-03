import React, {Component} from 'react';
import {View, Keyboard, Dimensions} from 'react-native';
import {Icon, Left} from 'native-base';
import styles from './style';
import DrawerLayout from 'react-native-drawer-layout';
import MenuView from './MenuView';
import Toolbar from './Toolbar';
import PropTypes from 'prop-types'

class LeftMenuNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {showContentText: ""};
    }

    _openLeftMenu() {
        this.drawer.openDrawer();
    }

    _closeLeftMenu() {
        if (this.drawer != null) {
            this.drawer.closeDrawer();
        }
    }

    _backState() {
        if (this.props.backButtonClick) {
            this.props.backButtonClick();
            return;
        }
        this.props.navigator.pop();
    }

    _onDrawerOpen() {

    }

    render() {
        var settingButton = (<Toolbar typeView={this.props.typeView} onBackButtonClick={this._backState.bind(this)}
                                      title={this.props.title} onSettingClick={this._openLeftMenu.bind(this)}/>);
        var contentView = null;
        if (this.props.contentView != null) {
            contentView = (this.props.contentView);
        }
        if (this.props.isNotSlideBar == true) {
            return (
                <View
                    style={styles.SideMenu}>
                    <View style={styles.container}>
                        <View style={styles.toolbar}>
                            {settingButton}
                        </View>
                        <View style={styles.container}>
                            {contentView}
                        </View>
                    </View>
                </View>
            );
        }
        return (
            <DrawerLayout
                drawerWidth={Dimensions.get('window').width * 75/100}
                drawerPosition={DrawerLayout.positions.Left}
                ref={(drawer) => {
                    return this.drawer = drawer
                }}
                onDrawerOpen={this._onDrawerOpen.bind(this)}
                renderNavigationView={() => (
                    <MenuView/>)}
                style={styles.SideMenu}
                onDrawerStateChanged={() => {
                    Keyboard.dismiss(0)
                }}>
                <View style={styles.container}>
                    <View style={styles.toolbar}>
                        {settingButton}
                    </View>
                    <View style={styles.container}>
                        {contentView}
                    </View>
                </View>
            </DrawerLayout>
        );
    }
}
LeftMenuNavigation.propTypes={
    contentView: PropTypes.element.isRequired,
    isNotSlideBar: PropTypes.bool,
    navigator: PropTypes.object.isRequired,
    typeView: PropTypes.string,
    title: PropTypes.string,
    backButtonClick: PropTypes.func
};
export default LeftMenuNavigation;
