import React from "react";
import { Image } from "react-native";

export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return true;
  if (!re.test(email)) return true;

  return false;
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return true;

  return false;
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return true;

  return false;
};


export const originalItemData = [
    {
        icon: (
          <Image
            style={{ width: 50, height: 50 }}
            source={{
              uri:
              "https://icons.iconarchive.com/icons/iconarchive/badge-trophy/256/Badge-Trophy-Diamond-icon.png"              
            }}
          />
        )
      },
      {
        icon: (
          <Image
            style={{ width: 50, height: 50 }}
            source={{
              uri:
              "https://icons.iconarchive.com/icons/indeepop/fun/256/Rave-Diamond-blue-icon.png"              }}
          />
        )
      }, 
        {
          icon: (
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri:
                "https://icons.iconarchive.com/icons/gartoon-team/gartoon-apps/256/kdiamond-diamond-icon.png"                }}
            />
          )
        }, 
        {
          icon: (
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri:
                "https://icons.iconarchive.com/icons/flaticonmaker/flat-style/256/diamond-icon.png"
              }}
            />
          )
        }, 
        {
          icon: (
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri:
                "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/256/Diamond-Suit-3d-icon.png"
              }}
            />
          )
        }, 
        {
          icon: (
            <Image
              style={{ width: 50, height: 50 }}
              source={{
                uri:
                "https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-7/256/Game-diamond-icon.png"                }}
            />
          )
        }
  ];

  export const cardIcon = (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('../assets/card.png')} 
    />
  );
  
  
  export function findSequences(grid) {
    const sequences = [];
    console.log("grid ressu : ", grid.map(row => row.map(cell => cell.id))); 
    // Recherche dans les colonnes
    for (let i = 0; i < grid.length; i++) {
        let count = 1;
        for (let j = 1; j < grid[i].length; j++) {
            if (grid[i][j].id === grid[i][j - 1].id) {
                count++;
            } else {
                if (count >= 3) {
                    sequences.push({
                        id: grid[i][j - 1].id,
                        count: count,
                        start: {x: i, y: j - count},
                        end: {x: i, y: j - 1}
                    });
                }
                count = 1;
            }
        }
        if (count >= 3) {
            sequences.push({
                id: grid[i][grid[i].length - 1].id,
                count: count,
                start: {x: i, y: grid[i].length - count},
                end: {x: i, y: grid[i].length - 1}
            });
        }
    }
    console.log("Sequences fin des colonnes  : ", sequences); 
    // Recherche dans les lignes 
    for (let j = 0; j < grid[0].length; j++) {
        let count = 1;
        for (let i = 1; i < grid.length; i++) {
            if (grid[i][j].id === grid[i - 1][j].id) {
                count++;
            } else {
                if (count >= 3) {
                    sequences.push({
                        id: grid[i - 1][j].id,
                        count: count,
                        start: {x: i - count, y: j},
                        end: {x: i - 1, y: j}
                    });
                }
                count = 1;
            }
        }
        if (count >= 3) {
            sequences.push({
                id: grid[grid.length - 1][j].id,
                count: count,
                start: {x: grid.length - count, y: j},
                end: {x: grid.length - 1, y: j}
            });
        }
    }

    console.log("Sequences fin des lignes : ", sequences); 
    return sequences;
  }

    export function replaceSequences(grid, sequences, originalItemData) {
      let columnsToUpdate = new Set();
    
      const applyChanges = () => {
        //supprimer les sequences et les cell a maj 
        sequences.forEach(seq => {
          for (let x = seq.start.x; x <= seq.end.x; x++) {
            for (let y = seq.start.y; y <= seq.end.y; y++) {
              grid[x][y] = null;
              columnsToUpdate.add(y);
            }
          }
        });

        // col a maj
        columnsToUpdate.forEach(col => {
          let tempArray = [];
    
          //les mettre dans un tab temp
          for (let x = 0; x < grid.length; x++) {
            if (grid[x][col] !== null) tempArray.push(grid[x][col]);
          }
    
          //le nb d'elmt a generer 
          let missingElements = grid.length - tempArray.length;
            
          // Générer et ajouter de nouveaux éléments au début de tempArray
          for (let i = 0; i < missingElements; i++) {
            let k = Math.floor(Math.random() * originalItemData.length);
            tempArray.unshift({ ...originalItemData[k], id: k });
          }
    
          //elmt des cols
          for (let x = 0; x < grid.length; x++) {
            grid[x][col] = tempArray[x];
          }
        });  
      };
    
      applyChanges();
    
      //verifier si des combinaison gagnantes sont ds ma grille 
      let newSequences;
      do {
        newSequences = findSequences(grid); 
        if (newSequences.length > 0) {
          sequences = newSequences; 
          columnsToUpdate.clear(); 
          applyChanges(); 
        }
      } while (newSequences.length > 0);
    
      return grid;
    }
    

  export function newGrig(){
    for (let y = start.y; y <= end.y; y++) {
      newId = Math.floor(Math.random() * originalItemData.length);
      let newIcon = originalItemData[newId].icon; // icone correspondante
      grid[start.x][y] = { ...grid[start.x][y], id: newId, icon: newIcon };
      console.log("newId", newId); 
  }
  }
  export function score(sequences){
    let score = 0;
        sequences.forEach(sequence => {
          const { count } = sequence;
          if (count === 3) {
            score += 50 * this.state.level;
          } else if (count === 4) {
            score += 150 * this.state.level;
          } else if (count >= 5) {
            score += 500 * this.state.level;
          }
        });
  }
  
  export function getNbElmt(arr) {
    let count = 1;
    let score = 1; 
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].id === arr[i - 1].id) {
        count++;
        if (count >= 3) {
          score = count ; 
        }
      } else {
        count = 1;
      }
    }
    return score; //score sup ou egal a 3 snn compte pas 
    
  }
  
  export function regenerate(originalItemData) {
    let itemData = [];
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        let k = Math.floor(Math.random() * originalItemData.length);
        row.push({ ...originalItemData[k], id: k });
      }
      itemData.push(row);
    }
    console.log(itemData.id)
    return itemData;
  }
  export function convertIndex(index1, index2, itemDataLgt){
     // Convertir les indices en 2D 
     let i1 = Math.floor(index1 / itemDataLgt);
     let j1 = index1 % itemDataLgt;
     let i2 = Math.floor(index2 / itemDataLgt);
     let j2 = index2 % itemDataLgt;
     console.log("index1 et 2 : ("+i1+": "+j1+") / "+i2+" : "+ j2)
     if(i1==i2 && (j2==j1+1 || j2==j1-1)){
       console.log("changement dans la meme ligne autorisé")
     }else if(j1==j2 && (i2==i1+1 || i2==i1-1)){
       console.log("changement dans la meme col autorisé")
     }else {
       return null;
     }
     let tab = [i1, j1,i2, j2]; 
     return tab; 
  }
  export function division(a, b) {
    let result = a / b;
    if (result % 1 === 0) { 
      return result;
    } else {
      return Math.floor(result) + 1; 
    }
  }

 export  function findAndRemoveCombinations(grid, originalItemData) {
  let sequences = findSequences(grid); 
  let columnsToUpdate = new Set();

  const applyChanges = () => {
    sequences.forEach(seq => {
      for (let x = seq.start.x; x <= seq.end.x; x++) {
        for (let y = seq.start.y; y <= seq.end.y; y++) {
          grid[x][y] = null; // vider cell avec combinaison gagnante 
          columnsToUpdate.add(y); // Ajouter col a maj 
        }
      }
    });

    // Maj des colonnes
    columnsToUpdate.forEach(col => {
      let tempArray = [];

      for (let x = 0; x < grid.length; x++) {
        if (grid[x][col] !== null) tempArray.push(grid[x][col]);
      }

      let missingElements = grid.length - tempArray.length;

      for (let i = 0; i < missingElements; i++) {
        let newItem = Math.floor(Math.random() * originalItemData.length);
        tempArray.unshift({ ...originalItemData[newItem], id: newItem });
      }

      for (let x = 0; x < grid.length; x++) {
        grid[x][col] = tempArray[x];
      }
    });
  };

  //faire les changements jsqu'a plus de combi gagnante 
  do {
    sequences = findSequences(grid); 
    if (sequences.length > 0) {
      columnsToUpdate.clear();
      applyChanges(); 
    }
  } while (sequences.length > 0);

  return grid;
  }
  export function findHint(grid) {
    // Parcourir chaque gemme de la grille
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        // Vérifier les échanges possibles dans 4 directions : haut, bas, gauche, droite
        const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        for (let [dx, dy] of directions) {
          const newX = x + dx;
          const newY = y + dy;
          // Vérifier si l'échange est dans les limites de la grille
          if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[x].length) {
            // Échanger temporairement
            const temp = grid[x][y];
            grid[x][y] = grid[newX][newY];
            grid[newX][newY] = temp;
  
            // Vérifier si cet échange crée une séquence gagnante
            if (findSequences(grid).length > 0) {
              // Remettre les gemmes à leur place avant de retourner le résultat
              grid[newX][newY] = grid[x][y];
              grid[x][y] = temp;
              return { from: { x, y }, to: { newX, newY } };
            }
  
            // Remettre les gemmes à leur place
            grid[newX][newY] = grid[x][y];
            grid[x][y] = temp;
          }
        }
      }
    }
  
    // Si aucun mouvement possible n'est trouvé, retourner null
    return null;
  }
  