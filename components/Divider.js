import React from "react";
import { View } from "react-native";

class Divider extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={this.props.style}>
            </View> 
        )
    }
};

export default Divider;
