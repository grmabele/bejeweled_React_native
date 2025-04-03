import React from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View, TextInput, Button, ImageBackground } from 'react-native';

import { Link } from '@react-navigation/native';
import Header from '../components/Header';
import ButtonPerso from "../components/ButtonPerso";
import InputPerso from "../components/InputPerso";
import TextPerso from "../components/TextPerso";
import Divider from "../components/Divider";
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';


class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    alert(){
        Alert.alert(
            'Erreur',
            'Login ou mot de passe incorrect',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    onLoginPressed () {
        const emailError = emailValidator(this.state.email);
        const passwordError = passwordValidator(this.state.password);
        if (emailError || passwordError) {
            this.alert();
            return;
        }
        const formData = new FormData();
        formData.append("mail", this.state.email);
        formData.append("password", this.state.password);

        //POST request
        fetch('https://belgrand.alwaysdata.net/bejeweled_API/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            }),
            headers: {
                "Content-Type": "application/json"
            },
        }).then((response) => response.json())
        .then((json) => {
            if (json.error) {
                this.alert(json.error);
            } else {
                this.props.navigation.navigate('Game', {username: json.name});
            }
        })
        .catch((error) => {
            const userId = json.user.id; 
            const emailReq = json.user.email;
            this.props.navigation.navigate('Game', {id_user: userId, email: emailReq}); // passez l'ID de l'utilisateur au composant Game
        });
    };

render () {
    const {navigate} = this.props.navigation;
    return (
        <ImageBackground  style={styles.container} source={require('../assets/bejeweled_background.jpg')}>
                
                <View style={styles.overlay}>
                    <Header title="Loginscreen" />

                    <InputPerso placeholder="email"
                                value={this.state.email}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onChangeText={text => this.setState({ email: text })}
                    />

                    <InputPerso placeholder="password"
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={text => this.setState({ password: text })}
                    />

                    <TextPerso texte={this.state.message} style={{ color: "#B31312" }} />

                    <Divider style={styles.separator} />

                    <ButtonPerso texte="Connexion"
                                 typeButtonStyle="dark"
                                 onPress={() => this.onLoginPressed()} />

                    <Link style={{ color: "#e85d04" }} to={{ screen: 'Registerscreen' }}>S'inscrire</Link>
                </View>
            </ImageBackground>
    )
}
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        padding: 20, 
        marginLeft: 60,
        marginRight:60,
        marginTop: 250,
        marginBottom: 250
    },
    separator: {
        marginBottom: 30,
    },
});

export default LoginScreen;     