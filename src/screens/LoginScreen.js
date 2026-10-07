import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, spacing} from '../theme';
import NavBar from '../components/NavBar';
import Form from '../components/Form';

export default function LoginScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    return (
        <View  style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <Form />
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