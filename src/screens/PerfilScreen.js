import React from "react";
import { Text, View ,StyleSheet} from "react-native";
import Perfil from "../components/Perfil";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { spacing, colors, radius } from '../theme';



export default function PerfilScreen({navigation}) {
        const insets = useSafeAreaInsets();
    
    return (
        <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <Text style={styles.titulo}></Text>
            <Perfil navigation={navigation}/>
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
    contenedor:{
      justifyContent:'center',
      alignItems: 'center'
      
    }
});