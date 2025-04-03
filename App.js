import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HighscoreScreen from "./screens/HighscoreScreen";
import Game from "./screens/Game";

// import ForgotPasswordScreen from './screens/ForgotPasswordScreen'
// import Dashboard from "./screens/Dashboard";
// import ProfileScreen from "./screens/profileScreen";

const Stack = createNativeStackNavigator();


const App = () => {
    return (
        
            <NavigationContainer>
                <Stack.Navigator>
                    
                    <Stack.Screen
                        name="Homescreen"
                        component={HomeScreen}
                    />
                    <Stack.Screen name="Loginscreen" component={LoginScreen} />
                    <Stack.Screen name="Registerscreen" component={RegisterScreen} />
                    <Stack.Screen
                        name="Game"
                        component={Game}
                    />
                    {/* <Stack.Screen name="ForgotPasswordscreen" component={ForgotPasswordScreen} />
                    <Stack.Screen name="Dashboardscreen" component={Dashboard} /> 
                    <Stack.Screen name="Profilescreen" component={ProfileScreen} /> */}
                    <Stack.Screen
                        name="Highscorescreen"
                        component={HighscoreScreen}
                    />

                    
                </Stack.Navigator>
            </NavigationContainer>
        
    );
};

export default App;
