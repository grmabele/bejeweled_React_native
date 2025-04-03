import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';

class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <Text style={styles.header}>{this.props.title ? this.props.title : "Page sans titre"}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 26,
        color: '#e75B03',
        fontWeight: 'bold',
        paddingVertical: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
});

export default Header;
