import React from "react";
import { Animated,StatusBar , FlatList, View, Image, Text, TouchableOpacity, Alert , StyleSheet  } from "react-native";
import {findHint,findAndRemoveCombinations, originalItemData, findSequences, division, getNbElmt, regenerate, convertIndex, replaceSequences, cardIcon } from "../core/utils.js"; 
import ButtonGame from "../components/ButtonGame";

import Constants from 'expo-constants';


const Item = ({ item, onPress, pause }) => (
  <TouchableOpacity style={styles.item} onPress={onPress} disabled={pause}>
  {pause ? cardIcon: item.icon}
</TouchableOpacity>
);
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      equal0: true,
      itemData: [] , 
      selectedIndex: null, // 1er elmt click
      level: 1, 
      score :50, 
      attempt: 5,
      count: 50,
      pause: false, 
      hintIndices: [],
      pause: false,
      id_user: null,
      email: null,
      date_start: null,
      date_end: null,
      duration: null
    };
    this.counter = new Animated.Value(0);
    this.countInterval = null;
    this.startNewGame = this.startNewGame.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }
  

  componentDidMount() {
    console.log("Props dans Game:", this.props); // tout ce que contient props

    const { route } = this.props;
    console.log("Route dans Game:", route); //  structure de route

    const id_user = route?.params?.id_user;
    console.log("id_user récupéré dans Game:", id_user); 

    if (id_user) {
      this.setState({ id_user: id_user }, () => {
        console.log("id_user défini dans componentDidMount: ", this.state.id_user);
      }); 
    } else {
      console.log("id_user n'est pas défini ou pas passé dans les props.");
    }

    const email = route?.params?.email;
    console.log('Email récupéré :', email);

  // Mise à jour de la date
    this.setState({ date_start: new Date() }, () => {
      console.log("Date de début : ", this.state.date_start);
    });

    const newItemData = this.startNewGame(); 
    this.setState({ itemData: newItemData }); 
    this.updateProgressBar(); 
  }

  //progressBar
  componentWillUnmount() {
    clearInterval(this.countInterval);
  }
  load = (value) => {
    Animated.timing(this.counter, {
      toValue: value / 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };
  
 
  componentDidUpdate(prevProps, prevState) {
    // Vérifie si itemData a changé
    if (JSON.stringify(prevState.itemData) !== JSON.stringify(this.state.itemData)) {
      const sequences = findSequences(this.state.itemData);
      let score = 0;
      sequences.forEach(sequence => {
        const {count} = sequence;
        if (count === 3) {
          score += 50 * this.state.level;
        } else if (count === 4) {
          score += 150 * this.state.level;
        } else if (count >= 5) {
          score += 500 * this.state.level;
        }
      });
  
      // Mise à jour du score
      if (score > 0) {
        this.setState(prevState => {
          let newScore = prevState.score + score; 
          let newLevel = Math.floor(newScore / 100) + 1; 
      
          let progressInLevel;
          let scoreForCurrentLevel;
      
          if(newLevel == 2){
            scoreForCurrentLevel =100; 
          }else{
            scoreForCurrentLevel = (newLevel - 1) * 100; 
          }

          {
            let scoreForNextLevel = newLevel * 100; 
            progressInLevel = ((newScore ) / (scoreForNextLevel)) * 100; 
            progressInLevel = Math.round(progressInLevel); 
          }
      
          progressInLevel = Math.max(0, Math.min(progressInLevel, 100));
      
          return {
            score: newScore,
            level: newLevel,
            count: progressInLevel,
          };
        });
      }
      
    }  
  }
  
  
  isGridValid(itemData) {
    for (let i = 0; i < 8; i++) {
      if (getNbElmt(itemData[i]) >= 3 || getNbElmt(itemData.map(row => row[i])) >= 3) {
        return false; // 3 ou plus 
      }
    }
    console.log(true)
    return true; // c'est bon 
  }
  //genere une cellule avec aucune combinaison deja faite 
  startNewGame = () => {
    let itemData;
    console.log("ItemData : "); 
    console.log(itemData); 
    do {
      itemData = regenerate(originalItemData); console.log("regen")
    } while (!this.isGridValid(itemData)); 
  
    return itemData; 
  };
  

  //fonction qui recup les indices des cellules cliquee et appelle la fction pour switchrer
  handleItemClick = (index) => {
    console.log("click")
    if (this.state.selectedIndex === null) {
      //1er elmt
      this.setState({ selectedIndex: index }, () => {
        console.log("test selected index : ", this.state.selectedIndex);
      });
    } else {
      //2eme elmt
      if(this.state.selectedIndex === index){
        Alert.alert(
          "Erreur", 
          "Vous avez cliquez sur la même cellule", 
          [
            {
              text: "Annuler",
              onPress: () => console.log("Annuler Pressé"),
              style: "cancel"
            },
            { 
              text: "OK", 
              onPress: () => {
                console.log("OK Pressé");
              } 
            }
          ],
          { cancelable: false } 
        );
        this.state.selectedIndex = null ;
        this.setState({ selectedIndex: null, hintIndices: [] });
        return ; 
      }
      this.swapItems(this.state.selectedIndex, index);
      this.setState({ selectedIndex: null , hintIndices: [] }, () => {
        console.log("test index reinit ", this.state.selectedIndex);
        regenerate(originalItemData)
      });
    }
    console.log(`Cellule cliquée`);
  };
  //swapper deux element entre eux 
  swapItems = (index1, index2) => {
    console.log("debut"); 
    console.log("index1 et 2 : "+index1+" :  "+ index2); 

    // Convertir les indices en positions 2D 
    const width = this.state.itemData[0].length; 
    const pos1 = { x: Math.floor(index1 / width), y: index1 % width };
    const pos2 = { x: Math.floor(index2 / width), y: index2 % width };

    // pas de mouvement en diagonal etc)
    if (Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y) !== 1) {
        Alert.alert("Mouvement non autorisé", "Les déplacements comme ça ne sont pas autorisés");
        return;
    }

    let newData = []; 
    //Copie de tableau 
    for (let i = 0; i < this.state.itemData.length; i++) {
        newData[i] = [...this.state.itemData[i]]; // copie les sous-tableaux 
    }

    // Convertir les indices en 2D 
    let index = convertIndex(index1, index2, this.state.itemData[0].length)
    console.log("cellule : ", newData[index[0]][index[1]].id)
    
    //swap 
    const temp = newData[index[0]][index[1]];
    newData[index[0]][index[1]] = newData[index[2]][index[3]];
    newData[index[2]][index[3]] = temp;

    let test = findSequences(newData); 
    console.log("taille de la séquence : ", test.length); 
    //changement seulement si une sequence >=3 est possible 
    console.log("Grid initial", this.state.itemData.map(row => row.map(cell => cell.id))); 
    console.log("Grid final", newData.map(row => row.map(cell => cell.id))); 
    if (test.length != 0) {
      this.setState({ itemData: newData }, () => {
        
          console.log("avt state", this.state.itemData.map(row => row.map(cell => cell.id)));
          const newGrid = findAndRemoveCombinations(this.state.itemData, originalItemData); 
          this.setState({ itemData: newGrid });
            console.log("apres modif" , this.state.itemData.map(row => row.map(cell => cell.id))); 
          
          
      });
 
    } else {
      this.setState({ itemData: this.state.itemData });
      this.setState(prevState => ({
        attempt : prevState.attempt -1, 
      }));
      if(this.state.attempt <= 0){
        Alert.alert(
          "Fin", 
          "nombre d'essai max", 
          [
            { 
              text: "OK", 
              onPress: () => {
                console.log("OK Pressé");
                this.props.navigation.navigate('Homescreen');                
              } 
            }
          ],
          { cancelable: false } 
        );
          return; 
      }

      Alert.alert(
        "Essai", 
        "Vous avez encore : "+ (this.state.attempt)+ " essais", 
        [
          { 
            text: "OK", 
            onPress: () => {
              console.log("OK Pressé");
              
            } 
          }
        ],
        { cancelable: false } 
      );
      console.log("Encore ", this.state.attempt); 
      console.log("La"); 
    }
  
    

  };
  
  // Fonction pour terminer le jeu et calculer les temps
  endGame = () => {
    const dateEnd = new Date();
    console.log("Date de fin (date_end): ", dateEnd);
    const duration = (dateEnd - this.state.date_start) / 1000; // Convertir en secondes
    console.log("Durée du jeu (duration): ", duration, "secondes");
    this.setState({
      date_end: dateEnd,
      duration,
    }, () => {
      
      this.sendGameResults(); //  appel de la mise à jour de l'état
      Alert.alert("Fin de la partie", "Vous avez perdu !", [
        {text: "OK", onPress: () => this.props.navigation.navigate('Highscorescreen')}
      ]);
      //this.sendEmailAfterGame();
    });
  };

  //gerer la bare de progression 
  updateProgressBar = () => {
    this.countInterval = setInterval(() => {
      this.setState(prevState => {
        const newCount = prevState.level < 30 ? (prevState.count - prevState.level) : (prevState.count - prevState.level-15) ; // Decrement basé sur le niveau
        if (newCount <= 0) {
          clearInterval(this.countInterval);
          this.endGame();
          // Alert.alert("Fin de la partie", "Vous avez perdu !");
          // // Naviguer vers l'écran d'accueil 
          // this.props.navigation.navigate('Homescreen'); 
          return { count: 0 };
        }
        return { count: newCount };
      });
    }, 3000); 
  };

  //hint 
  showHint = () => {
    const hint = findHint(this.state.itemData);
    if (hint) {
      const fromIndex = hint.from.x * 8 + hint.from.y;
      const toIndex = hint.to.newX * 8 + hint.to.newY;
      this.setState({ hintIndices: [fromIndex, toIndex] });
    } else {
      Alert.alert("Aucun mouvement possible", "Essayez de mélanger ou de recommencer le jeu.");
    }
  }
  
  sendGameResults = async () => {
    const { score, level, duration, date_start, date_end, id_user } = this.state; //  state pour obtenir les données nécessaires
    
    console.log("Préparation à envoyer les résultats du jeu, vérification de id_user: ", id_user);

    console.log("this.state.date_start : ", this.state.date_start);
    console.log("this.state.date_end : ", this.state.date_end);

   const formattedDateStart = date_start ? format(date_start, 'yyyy-MM-dd HH:mm:ss') : null;
   const formattedDateEnd = date_end ? format(date_end, 'yyyy-MM-dd HH:mm:ss') : null;

    console.log("Envoi des résultats du jeu :");
      console.log("Score: ", score);
      console.log("Niveau (Level): ", level);
      console.log("Date de début formatée : ", formattedDateStart);
      console.log("Date de fin formatée : ", formattedDateEnd);
      console.log("Durée en secondes : ", duration);

    // vérif si les dates ne sont pas null
    if (date_start && date_end) {
      const gameData = {
        
        score: score,
        level: level,
        duration: Math.floor(duration),
        date_start: formattedDateStart,
        date_end: formattedDateEnd,
        id_user: id_user, 
      };

      console.log("Données envoyées au serveur: ", JSON.stringify(gameData));
      
      try {
        const response = await fetch('https://belgrand.alwaysdata.net/bejeweled_API/api/games', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gameData),
        });
      
        if (!response.ok) {
          // Si la réponse du serveur n'est pas OK, on lance une erreur avant de tenter de parser le JSON
          throw new Error('Erreur réseau - la réponse n\'est pas ok');
        }
      
        const json = await response.json();
        if (json.error) {
          console.error(json.error);
          Alert.alert('Erreur', json.error);
        } else {
          console.log('Jeu créé avec succès', json);
          Alert.alert('Succès', 'Partie ajoutée à la BD.');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Erreur', 'Une erreur est survenue lors de la communication avec le serveur, veuillez réessayer.');
      }
      
    }
     
  }

  /*sendEmailAfterGame = async () =>{
    const { id_user, email } = this.state;
    const emailReq = {
      recipient: email,
      subject: `Voici le résumé de votre partie`,
      id_user: id_user,
      html: `<p>Ceci est un message de test en HTML</p>`,

    }
    try {
      const response = await fetch('https://belgrand.alwaysdata.net/bejeweled_API/api/send/email', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailReq),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (json.error) {
        console.log(json.error);
        Alert.alert('Erreur', json.error);
      } else {
        console.log('Email envoyé avec succès: ', json);
        Alert.alert('Succès', 'Votre e-mail a bien été envoyé');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoie de l\'email:', error);
      Alert.alert('Erreur', 'Une erreur est survenue pendant l\'envoi de votre e-mail');
    }
  }   
*/
  

  // bouton pause
  btnPause = () => {
    this.setState(prevState => ({
      pause: !prevState.pause

    }), () => {
      if (this.state.pause) {
        clearInterval(this.countInterval); // arrêt de la bar de progression
        // cache les image

      } else {
        this.updateProgressBar(); // reprise 
        // reactivation des boutons
      }
    });
  };

  renderItem = ({ item, index }) => {
    if (!item) {
      return null;
    }

    const {pause, hintIndices} = this.state;
    return <View style={styles.row}>
    {item.map((cell, cellIndex) => {
      const linearIndex = index * 8 + cellIndex;
      const isHinted = hintIndices.includes(linearIndex);
      const itemStyle = isHinted ? styles.hintItem : {};
      return (
        <TouchableOpacity
          key={cellIndex}
          style={[styles.item, itemStyle]} 
          onPress={() => this.handleItemClick(linearIndex)}
          disabled={pause}
        >
          {pause ? cardIcon : cell.icon}
        </TouchableOpacity>
      );
    })}
  </View>
};
  render() { 
    const progressBarFillStyle = {
      height: '100%', 
      backgroundColor: "#46FF33",
      width: this.state.count + '%', 
    };
    
    return (
      <View style={styles.app}>
        <View style={styles.upperContainer}>
          <View style={styles.controlsBottom}>
            <ButtonGame texte={this.state.pause ? "Resume" : "Pause"} 
            typeButtonStyle="dark" 
            onPress={this.btnPause} 
            disabled={this.state.pause} />
            <ButtonGame texte="Hint" 
            typeButtonStyle="dark" 
            onPress={this.showHint} 
            disabled={this.state.pause} />
          </View>
          <View style={styles.scoreLevelContainer}>
            <Text>Score : {this.state.score}</Text>
            <Text>Level : {this.state.level}</Text>
          </View>
        </View>

        <View style={styles.gameContainer}>
          <FlatList
            data={this.state.itemData}
            renderItem={this.renderItem}
            keyExtractor={(row, index) => index.toString()}
          />
          <View style={styles.progressBar}>
            <Animated.View style={progressBarFillStyle} />
            <Text style={styles.text3}>{this.state.count}%</Text>
          </View>
          
        </View>

        <StatusBar style="auto" />
      </View>

    );
  }
}

const styles = {
  app: {
    flex: 1,
    marginHorizontal: "auto",
  },
  item: {
    flex: 1,
    maxWidth: "11.5%",
    maxHight: "10%",
    alignItems: "center",
    padding: 4,
    backgroundColor: "rgba(249, 180, 45, 0.25)",
    borderWidth: 1.5,
    borderColor: "#fff"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  }, 
  text3: {
    fontSize: 18
  },
  progressBar: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 8,
    borderColor: '#555',
    flexDirection:"row",
    marginLeft: 30, 
    marginBottom: 10
  },
  hidden: {
    opacity: 0,
  }, 
  controlsBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5, 
    marginBottom: 3
  },
  upperContainer: {
    flex: 1, 
  },
  
  gameContainer: {
    flex: 6, 
  },
  scoreLevelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10, 
  },
  hintItem: {
    borderWidth: 2, 
    borderColor: "#FFD700", //or
  },
  
  
};

export default Game;
