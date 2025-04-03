import React from "react";
import { View, Text } from "react-native";

 class TextPerso extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text style={this.props.style}>{this.props.texte}</Text>
            </View> 
        )
    }
};
export default TextPerso;
