import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native'; 
import Header from '../components/Header';
import ButtonPerso from "../components/ButtonPerso";

class HomeScreen extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
 
            <ImageBackground source={require('../assets/bejeweled_background.jpg')} style={styles.container}>
                <Header title="Welcome to the home page"/>
                {/* <Header>Connexion/Inscription</Header> */}

                <ButtonPerso texte="LOGIN" typeButtonStyle="dark" onPress={() => navigate('Loginscreen')}/>
                <ButtonPerso texte="CREATE COMPTE" typeButtonStyle="dark" onPress={() => navigate('Registerscreen')}/>
                {/* <ButtonPerso texte="PLAY GAME" typeButtonStyle="dark" onPress={() => navigate('Game')}/> */}
                <ButtonPerso texte="HIGH SCORE" typeButtonStyle="dark" onPress={() => navigate('Highscorescreen')}/>
                
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', 
        height: '100%',
    },
    textConnexion : {
        color : "#7B66FF",
    },
})

export default HomeScreen;
