import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, colors } from '../theme';
import {Ionicons} from "@expo/vector-icons";

export default function NavBar({ navigation}) {
    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.boton} >
                <Ionicons name="home" size={24} color="white" onPress={()=> navigation.navigate('Home')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton}>
                <Ionicons name="list" size={24} color="white" onPress={()=> navigation.navigate('Reservas')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton} >
                <Ionicons name="person" size={24} color="white"  onPress={()=> navigation.navigate('Login')}/>
            </TouchableOpacity>
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