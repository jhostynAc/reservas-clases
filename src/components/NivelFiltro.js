import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme';

export default function NivelFiltro({ etiqueta, activo, onPress }) {
    return (
        <TouchableOpacity 
            style={[styles.boton, activo && styles.botonActivo]} 
            onPress={onPress}
        >
            <Text style={[styles.texto, activo && styles.textoActivo]}>
                {etiqueta}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    boton: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.lg,
        backgroundColor: '#FFFFFF', 
        borderWidth: 1,
        borderColor: colors.border,
    },
    botonActivo: {
        backgroundColor: colors.primaria, 
        borderColor: colors.primaria,
    },
    texto: {
        color: colors.texto, 
        fontSize: 14,
        fontWeight: '600',
    },
    textoActivo: {
        color: '#FFFFFF', // Letra blanca cuando está activo
    }
});