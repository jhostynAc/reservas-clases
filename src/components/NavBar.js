import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { spacing, colors } from '../theme';
import {Ionicons} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

let estaNavegando = false;
export default function NavBar() {
    
    const navigation = useNavigation();

    const irA = (pantalla) => {
        if (estaNavegando) return;
        
        estaNavegando = true;
        navigation.navigate(pantalla);

        setTimeout(() => {
            estaNavegando = false; 
        }, 500); 
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.boton} onPress={() => irA('Home')}>
                <Ionicons name="home" size={24} color="white"  />
            </Pressable>
            <Pressable style={styles.boton} onPress={() => irA('Reservas')} >
                <Ionicons name="list" size={24} color="white" />
            </Pressable>
            <Pressable style={styles.boton} onPress={() => irA('Login')} >
                <Ionicons name="person" size={24} color="white" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: 60,
        backgroundColor: '#413f3fde',
        flexDirection: 'row',
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        marginLeft: 20,
    },
    boton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})