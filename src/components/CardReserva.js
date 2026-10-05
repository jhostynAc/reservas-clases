import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from '../components/NavBar';
import { spacing, colors, radius } from '../theme';


export default function CardReserva({ reserva }) {

    if (!reserva) return null;

    return (
        <View>
            <Text>{reserva.horario}</Text>
            <Text>{reserva.titulo}</Text>
            <Text>{reserva.nivel}</Text>
            <Text>{reserva.profesor}</Text>
            <Text>{reserva.precio}</Text>
            <Text>{reserva.creadaEn}</Text>
        </View>
    )
}