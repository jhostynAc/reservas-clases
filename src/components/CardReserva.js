import React,{useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Alert } from 'react-native';
import {ReservasContext} from '../context/ReservasContext';
import { spacing, colors, radius } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { CLASES } from '../data/clases';


export default function CardReserva({ reserva }) {
    const {eliminarReserva} = useContext(ReservasContext);

    if (!reserva) return null;
    const confirmarEliminacion = () => {
        Alert.alert(
            "Cancelar Reserva",
            "¿Estás seguro de que deseas cancelar esta reserva?",
            [
                { text: "Cancelar" },
                {
                    text: "Si, cancelar",
                    onPress: () => {
                        const claseOriginal = CLASES.find(c=> c.id===reserva.claseId);
                        if(claseOriginal){
                            claseOriginal.cupos = claseOriginal.cupos + 1;
                        }
                        eliminarReserva(reserva.id);
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.tarjeta}>
           
            <View style={styles.contenidotarjeta}>
                <View style={styles.contenido}>
                    <Text style={styles.titulo}>{reserva.titulo}</Text>
                    <Text>Horario: {reserva.horario}</Text>
                    <Text style={styles.nivel}>Nivel: {reserva.nivel}</Text>
                    <Text style={styles.profesor}>Profesor: {reserva.profesor}</Text>
                    <Text style={styles.precio}>Costo: ${reserva.precio}</Text>
                </View>

                <View style={styles.BotonCancelar}>
                    <TouchableOpacity onPress={confirmarEliminacion}>
                       <Ionicons name="close-circle" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
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
    contenidotarjeta:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: spacing.md,
        padding: spacing.md,
    },
    BotonCancelar: {
        flexDirection: 'column',
        backgroundColor: 'red',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
    }
})