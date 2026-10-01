import React, { useMemo, useState, useLayoutEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useResponsive from '../hooks/useResponsive';
import { colors, spacing, typography, radius } from '../theme';
import { formatearPrecio } from '../data/clases';

export default function DetalleClaseScreen({ route, navigation }) {
    const insets = useSafeAreaInsets();
    const { clase } = route.params;
    const { isTablet } = useResponsive();
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

    const manejoReserva = () => {
        if (!horarioSeleccionado) {
            Alert.alert('Atención', 'Por favor selecciona un horario antes de reservar.');
            return;
        }
        if (clase.cupos > 0) {
            clase.cupos = clase.cupos - 1;
            Alert.alert('Reserva exitosa', 'Tu reserva ha sido realizada con éxito.');
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: clase.titulo,
            headerTransparent: true, 
            headerTintColor: '#FFFFFF', 
        });
    }, [navigation, clase]);

    return (
        <View style={styles.pantalla}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false} 
            >
                <Image
                    source={{ uri: clase.imagen }}
                    style={[styles.portada, { height: isTablet ? 350 : 250 }]}
                    resizeMode="cover"
                />

                <View style={styles.contenedorDetalles}>
                    
                    <View style={styles.profesorCard}>
                        <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
                        <View style={styles.profesorInfo}>
                            <Text style={styles.profesorEtiqueta}>Profesor</Text>
                            <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
                        </View>
                    </View>

                    <View style={styles.seccion}>
                        <Text style={styles.descripcion}>{clase.descripcion}</Text>
                    </View>

                    <View style={styles.infoGrid}>
                        <View style={styles.infoBadge}>
                            <Ionicons name="time-outline" size={20} color={colors.primaria} />
                            <Text style={styles.infoTexto}>{clase.duracion} min</Text>
                        </View>
                        <View style={styles.infoBadge}>
                            <Ionicons name="people-outline" size={20} color={colors.primaria} />
                            <Text style={styles.infoTexto}>{clase.cupos} cupos</Text>
                        </View>
                        <View style={styles.infoBadge}>
                            <Ionicons name="pricetag-outline" size={20} color={colors.primaria} />
                            <Text style={styles.infoPrecio}>{formatearPrecio(clase.precio)}</Text>
                        </View>
                    </View>

                    <View style={styles.seccion}>
                        <Text style={styles.subtitulo}>Selecciona un horario:</Text>
                        <View style={styles.horariosContainer}>
                            {clase.horarios.map((horario, index) => {
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

                </View>
            </ScrollView>

            <View style={[styles.barraInferior, { paddingBottom: insets.bottom || spacing.md }]}>
                <TouchableOpacity
                    style={[styles.botonReservar, clase.cupos === 0 && styles.botonAgotado]}
                    onPress={clase.cupos > 0 ? manejoReserva : null}
                    disabled={clase.cupos === 0}
                >
                    <Text style={styles.textoBoton}>
                        {clase.cupos > 0 ? 'Reservar Clase' : 'Sin cupos disponibles'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pantalla: { 
        flex: 1, 
        backgroundColor: colors.fondo 
    },
    portada: { 
        width: '100%', 
        backgroundColor: colors.border 
    },
    contenedorDetalles: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30, 
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: 100, 
    },
    profesorCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        marginBottom: spacing.lg,
    },
    avatar: { 
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        backgroundColor: colors.fondo,
        borderWidth: 2,
        borderColor: colors.primaria 
    },
    profesorInfo: {
        marginLeft: spacing.md,
    },
    profesorEtiqueta: {
        fontSize: 12,
        color: '#666',
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    profesorNombre: { 
        fontSize: 18, 
        fontWeight: '700', 
        color: colors.texto 
    },
    seccion: {
        marginBottom: spacing.lg,
    },
    descripcion: { 
        fontSize: 15, 
        color: '#444', 
        lineHeight: 24 
    },
    infoGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xl,
        backgroundColor: colors.fondo,
        padding: spacing.md,
        borderRadius: radius.lg,
    },
    infoBadge: {
        alignItems: 'center',
        gap: 4,
    },
    infoTexto: {
        fontSize: 13,
        color: '#555',
        fontWeight: '500',
    },
    infoPrecio: {
        fontSize: 14,
        fontWeight: '800',
        color: colors.primaria,
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
    barraInferior: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    botonReservar: {
        backgroundColor: colors.primaria,
        paddingVertical: 16,
        borderRadius: radius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonAgotado: {
        backgroundColor: '#B0B0B0',
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});