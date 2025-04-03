import React from "react";
import { View, StyleSheet, TouchableOpacity, Text  } from "react-native";

 class ButtonPerso extends React.Component {
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
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 200,
        marginBottom: 14
    },
    appButtonTextDark: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    appButtonContainerLight: {
        elevation: 8,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        width: 200,
        marginBottom: 14
    },
    appButtonTextLight: {
        fontSize: 18,
        color: "#7071E8",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});
export default ButtonPerso;