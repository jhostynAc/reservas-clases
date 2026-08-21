import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { spacing, colors, typography } from '../theme';
import {CLASES} from '../data/clases';

export default function Card({clase, onPress}){
    return(
        <Pressable onPress={onPress}>
            <Image source={{uri: clase.Imagen}} />
            <View>
                <EtiquetaNivel nivel={clase.Nivel} />
                <Text style={styles.titulo}>{clase.titulo}</Text>
                <Text style={styles.precio}>{clase.precio}</Text>
                <Text style={styles.nivel}>{clase.nivel}</Text>
                <Text style={styles.profesor}>{clase.profesor}</Text>
            </View>
        </Pressable>
    )
}

const styles=StyleSheet.create({
    titulo:{fontSize: 16,color: colors.texto},
    precio:{fontSize: 14,color: colors.texto},
    nivel:{fontSize: 12,color: colors.texto},
    profesor:{fontSize: 12,color: colors.texto},

})