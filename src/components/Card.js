import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { spacing, colors, radius } from '../theme';

export default function Card({clase, onPress}){
    return(
        <Pressable style={styles.tarjeta} onPress={onPress}>
            <Image style={styles.imagen} source={{uri: clase.imagen}} />
            <View style={styles.contenido}>
                <EtiquetaNivel nivel={clase.Nivel} />
                <Text style={styles.titulo}>{clase.titulo}</Text>
                <Text style={styles.precio}>Costo: {clase.precio}</Text>
                <Text style={styles.nivel}>Nivel: {clase.nivel}</Text>
                <Text style={styles.profesor}>Profesor: {clase.profesor.nombre}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    tarjeta: {
        backgroundColor: '#FFFFFF', 
        borderRadius: radius.lg,    
        marginBottom: spacing.lg,
        overflow: 'hidden', 
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imagen: {
        width: '100%',
        height: 160,
        backgroundColor: colors.fondo, 
        resizeMode: 'cover',
    },
    contenido: {
        padding: spacing.md,
        gap: spacing.xs,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.texto, 
        marginTop: 4,
    },
    precio: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.primaria, 
    },
    nivel: {
        fontSize: 14,
        color: colors.texto,
        opacity: 0.8,
    },
    profesor: {
        fontSize: 14,
        color: colors.texto,
        opacity: 0.8,
    },
});