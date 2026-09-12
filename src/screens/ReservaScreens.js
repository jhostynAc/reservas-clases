import React,{useLayoutEffect} from "react";
import {View, Text, ScrollView,StyleSheet } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useResponsive from '../hooks/useResponsive';
import {colors} from '../theme';


export default function ReservaScreens({route,navigation}){
    const insets = useSafeAreaInsets();
    const {clase} = route.params;
    const {isTablet} = useResponsive();

     useLayoutEffect(() => {
          navigation.setOptions({
            title: clase.titulo,
          });
        }, [navigation, clase]);
    
    return(
        <View style={styles.pantalla}>
            <Text>Reserva de clase</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo }
});