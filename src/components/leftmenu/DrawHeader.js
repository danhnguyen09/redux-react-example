import React, {Component} from 'react'
import {Image, Text, View} from "react-native";
import styles from '../LeftMenuNavigation/style'


class DrawHeader extends Component {
    render() {
        return (
            <View style={
                {
                    backgroundColor: 'blue',
                }
            }>
                <Image style={styles.circle_image_drawer_header}
                       source={{uri: "http://vtv1.vcmedia.vn/zoom/424_312/2016/yoonafirstlookdec2016header-690x400-1480912351514.jpg"}}/>
                <Text style={{
                    color: 'black',
                    textAlign: 'center',
                    margin: 10
                }}>Code by: Danh Nguyen ^-^!</Text>
            </View>
        )
    }
}

export default DrawHeader;