import React from "react";
import { View, StyleSheet, Text, Alert, ImageBackground } from 'react-native';
import Header from '../components/Header';
import {passwordValidator, emailValidator, nameValidator} from "../core/utils";

import InputPerso from "../components/InputPerso";
import TextPerso from "../components/TextPerso";
import ButtonPerso from "../components/ButtonPerso";
import Divider  from "../components/Divider";


class RegisterScreen extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    onSignUppress () {
        const nameError = nameValidator(this.state.name);
        const emailError = emailValidator(this.state.email);
        const passwordError = passwordValidator(this.state.password);
        //var user = [];
        if (emailError || passwordError || nameError) {
            this.alerte()
            return;
        } else {
            const formData = new FormData();

            formData.append("name", this.state.name);
            formData.append("mail", this.state.email);
            formData.append("password", this.state.password);

            //POST request
            fetch('https://belgrand.alwaysdata.net/bejeweled_API/api/users', {
            method: 'POST',
            body: JSON.stringify({
                player_name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            })
            .then((response) => response.json())
            .then((json) => {
            if(json == false){
                                    Alert.alert(
                                        'Erreur',
                                        'L\'e-mail saisi existe déja. Veuillez saisir une autre  adresse mail ou recupérer votre mot de passe',
                                        [
                                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                                        ],
                                        {cancelable: false},
                                    );
                                }else{
                                    this.props.navigation.navigate('Loginscreen');
                                }
            })
            .catch((error) => {
            console.error(error);
            });

        }

    };
    alerte(){
        Alert.alert(
            'Erreur',
            'Login ou mot de passe incorrect',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

    render() {
        return (
           
            <ImageBackground source={require('../assets/bejeweled_background.jpg')} style={styles.container}>
               
                <View style={styles.overlay}>
                    <Header title="Registerscreen"/>
        
                    <InputPerso placeholder="Nom"
                                value={this.state.name}
                                autoCapitalize="none" 
                                onChangeText={text => this.setState({ name: text})} />

                    <InputPerso placeholder="email"
                                value={this.state.email}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onChangeText={text => this.setState({ email: text})}/>

                    <InputPerso placeholder="Mot de passe"
                                value={this.state.password}
                                secureTextEntry={true}
                                onChangeText={text => this.setState({ password: text })}/>
                    
                    <TextPerso texte={this.state.message} style={{color: "#B31312" }}/> 

                    <Divider style={styles.separator} />

                    <ButtonPerso texte="Inscription" 
                                typeButtonStyle="dark" 
                                onPress={() => this.onSignUppress() }
                                />
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
        marginRight: 60,
        marginTop: 190,
        marginBottom: 190
    },
    separator: {
        marginBottom: 30,
    },
});

export default RegisterScreen;