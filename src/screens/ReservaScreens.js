import React,{useLayoutEffect,useContext} from "react";
import {View, Text, ScrollView,StyleSheet,FlatList } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ReservasContext} from '../context/ReservasContext';
import useResponsive from '../hooks/useResponsive';
import CardReserva from "../components/CardReserva";
import {colors, spacing} from '../theme';
import NavBar from "../components/NavBar";


export default function ReservaScreens(navigation){
    const insets = useSafeAreaInsets();
    const {isTablet} = useResponsive();

    const {reservas, cargando} = useContext(ReservasContext);

    if(cargando) {
      return(
        <View style={styles.pantalla}>
            <Text>Cargando Reservas...</Text>
        </View>
      )
    }

    return(
        <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <Text style={styles.titulo}>Reservas</Text>
            <FlatList
            data={reservas}
            keyExtractor={(item)=> String(item.id)}
            renderItem={({item}) =>(
              <CardReserva 
              reserva={item}/>
            )}
            ListEmptyComponent={() => (
              <Text>No hay reservas disponibles.</Text>
            )}
          />
          <NavBar navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.texto,
        marginTop: 4,
    },
});