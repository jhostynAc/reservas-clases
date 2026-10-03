import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"; 
import { colors, spacing, radius } from '../theme';

export default function ReservaItem({ horarios, horarioSeleccionado, setHorarioSeleccionado }) {
    
    return (
        <View style={styles.seccion}>
            <Text style={styles.subtitulo}>Selecciona un horario:</Text>
            <View style={styles.horariosContainer}>
                {horarios.map((horario, index) => {
                    const activo = horarioSeleccionado === horario;
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.horarioPill, activo && styles.horarioPillActivo]}
                            onPress={() => setHorarioSeleccionado(horario)}
                        >
                            <Text style={[styles.horarioTexto, activo && styles.horarioTextoActivo]}>
                                {horario}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    seccion: {
        marginBottom: spacing.lg,
    },
    subtitulo: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.texto,
        marginBottom: spacing.md,
    },
    horariosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        gap: spacing.sm,
    },
    horarioPill: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: radius.full,
        backgroundColor: '#F0F0F0',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    horarioPillActivo: {
        backgroundColor: colors.primaria,
        borderColor: colors.primaria,
    },
    horarioTexto: {
        fontSize: 14,
        color: colors.texto,
        fontWeight: '600',
    },
    horarioTextoActivo: {
        color: '#FFFFFF',
    },
});