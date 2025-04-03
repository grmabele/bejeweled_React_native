import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Alert
} from 'react-native';

import Header from '../components/Header';
import ButtonPerso from "../components/ButtonPerso";
import { theme } from '../core/theme';

class HighscoreScreen extends React.Component {
    state = {
        highScores: [],
    };

    componentDidMount() {
        this.fetchHighScores();
    }

    fetchHighScores = () => {
        
        fetch('https://belgrand.alwaysdata.net/bejeweled_API/api/games/top-scores', {
            method: 'PATCH', 
            
            headers: {
                "Content-Type": "application/json",
                
            },
        })
        .then(response => response.json())
        .then(json => {
            if (Array.isArray(json) && json.length) {
                this.setState({ highScores: json.slice(0, 6) });
            } else {
                Alert.alert('Erreur', 'Impossible de récupérer les meilleurs scores');
            }
        })
        .catch(error => {
            console.error(error);
            Alert.alert('Erreur', 'Problème de connexion au serveur');
        });
    };

    renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <Text style={styles.rank}>{item.rank}</Text>
        <Text style={styles.name}>{item.player_name}</Text>
        <Text style={styles.score}>{item.score}</Text>
      </View>
    );
    

    render() {
        return (
          <ImageBackground style={styles.container} source={require('../assets/bejeweled_background.jpg')}>
              <View style={styles.overlay}>
                  <Header title="High Scores" />
                  <View style={styles.tableHeader}>
                    <Text style={styles.rankHeader}>Rank</Text>
                    <Text style={styles.nameHeader}>player_name</Text>
                    <Text style={styles.scoreHeader}>Score</Text>
                </View>
                  <FlatList
                      data={this.state.highScores}
                      renderItem={this.renderItem}
                      keyExtractor={item => String(item.id)}
                  />
                  <ButtonPerso
                      texte="Retour"
                      onPress={() => this.props.navigation.navigate('Homescreen')}
                      typeButtonStyle="dark"
                  />
              </View>
          </ImageBackground>
        );
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjusted for a more opaque background
    padding: 20, 
    marginHorizontal: 60,
    marginVertical: 190
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20, // Added padding for spacing inside the cells
    borderColor: '#000', // Black border color
    borderWidth: 1, // Width of the border for each item
    borderStyle: 'solid', // Style of the border
  },
  rank: {
    width: '20%',
    textAlign: 'center', // Centered text
  },
  name: {
    width: '60%',
    textAlign: 'center', // Centered text
  },
  score: {
    width: '20%',
    textAlign: 'center', // Centered text
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20, // Added padding for spacing inside the header
    backgroundColor: '#f9f9f9',
    borderColor: '#000', // Black border color
    borderWidth: 1, // Width of the border for the header
    borderStyle: 'solid', // Style of the border
  },
  rankHeader: {
    width: '20%',
    textAlign: 'center', // Centered text
    fontWeight: 'bold',
  },
  nameHeader: {
    width: '60%',
    textAlign: 'center', // Centered text
    fontWeight: 'bold',
  },
  scoreHeader: {
    width: '20%',
    textAlign: 'center', // Centered text
    fontWeight: 'bold',
  },
});


export default HighscoreScreen;
