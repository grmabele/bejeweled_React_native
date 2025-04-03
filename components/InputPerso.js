import React from "react";
import { TextInput, StyleSheet } from "react-native";

 class InputPerso extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <TextInput
                style={styles.input}
                placeholder={this.props.placeholder}
                value={this.props.value}
                autoCapitalize={this.props.autoCapitalize}
                keyboardType={this.props.keyboardType}
                secureTextEntry={this.props.secureTextEntry}
                onChangeText={this.props.onChangeText}
            />
        )
    }
}

const styles = StyleSheet.create({
    input: {
      width: 200,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  export default InputPerso;