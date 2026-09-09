import React, {useState} from "react";
import { View, Text, TextInput, FlatList, ScrollView, StyleSheet} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";

import useResponsive from '../hooks/useResponsive';
import Card from '../components/Card';
import NivelFiltro from '../components/NivelFiltro';
import { spacing, colors, typography, radius } from '../theme';
import {CLASES, NIVELES} from '../data/clases';

export default function ClasesScreens ({navigation}) {
    //const {columms, paddingHorizontal} = useResponsive('');
    const insets = useSafeAreaInsets();
    const {columnas,paddingHorizontal} = useResponsive();
    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('');

    const resultados = useMemo(() => {
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase) => {
            const concideNivel = nivel === 'Todos' || clase.nivel === nivel;
            const concideTextoBusqueda = textoBusqueda === '' || clase.titulo.toLowerCase().includes(textoBusqueda) || clase.profesor.nombre.toLowerCase().includes(textoBusqueda);
            return concideNivel && concideTextoBusqueda;
        })
    },[nivel, busqueda]);

    
    return (
        <View style={[style.pantalla, {paddingTop: insets.top + spacing.med}]}>
            <View style={{paddingHorizontal}}>
                <Text style={typography.titulo}>Aplicacion de clases de ingles</Text>
                <View style={style.buscador}>
                    <Ionicons name="search" size={18}/>
                    <TextInput placeholder="Busqueda por nivel o profesor" 
                    value={busqueda} 
                    onChangeText={setBusqueda}
                    autoCorrect={false}
                    autoComplete={false}
                    />

                    {busqueda.length > 0 && (
                        <Ionicons
                        name="close-circle"
                        size={18}
                        onPress={() => setBusqueda('')}
                        />
                    )}
                </View>
                <ScrollView
                    style={{ flexGrow: 0 }}>
                    {
                        NIVELES.map((item) => (
                            <NivelFiltro
                                key={item}
                                etiqueta={item}
                                activo={nivel === item}
                                onPress={() => setNivel(item)}
                            />
                        ))
                    }
                </ScrollView>
                <FlatList
                   data={resultados}
                   keyExtractor={(item) => item.id}
                   renderItem={({item}) => (
                    <Card
                        clase={item}
                        onPress={() => navigation.navigate('DetalleClase', {clase: item})}
                    />
                   )}
                   ListEmptyComponent={() => (
                   <EstadoVacio
                    icono="search-outline"
                    titulo="No se encontraron resultados"
                    mensaje="Intenta con otro criterio de búsqueda"
                    textoAction="Limpiar busqueda"
                    onAction={() => {
                        setNivel('Todos');
                        setBusqueda('');
                    }}

                    />
                   )}
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
});