import React from "react";
import { View, StyleSheet, TouchableOpacity, Text  } from "react-native";

 class ButtonGame extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <TouchableOpacity 
                    onPress={this.props.onPress} 
                    style={this.props.typeButtonStyle === "dark" ? styles.appButtonContainerDark : styles.appButtonContainerLight}
                >
                    <Text style={this.props.typeButtonStyle === "dark" ? styles.appButtonTextDark : styles.appButtonTextLight}>{this.props.texte} </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    appButtonContainerDark: {
        elevation: 8,
        backgroundColor: '#e85d04',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 10, 
        width: 160, 
        marginBottom: 0, 
    },
    appButtonTextDark: {
        fontSize: 16, 
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    appButtonContainerLight: {
        elevation: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 8, 
        paddingHorizontal: 10, 
        width: 160, 
        marginBottom: 0, 
    },
    appButtonTextLight: {
        fontSize: 16, 
        color: "#7071E8",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

export default ButtonGame;