import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, colors, radius } from '../theme';
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from 'react-native-paper';

export default function Form() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [foto, setFoto] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');

    const [esLogin, setLogin] = useState(true);

    const manejoform = () => {
        if (esLogin) {
            console.log("login")
        } else {
            console.log("registro")
        }
    }

    return (
        <View style={styles.contenedor}>
            <View>
                <Text style={styles.titulo}>
                    {esLogin ? 'Inicio Sesion' : 'Crear Cuenta'}
                </Text>

            </View>

            <TextInput
                placeholder='Correo'
                keyboardType='email-address'
                autoCapitalize='none'
                style={styles.input}
            />
            <TextInput
                placeholder='Contraseña'
                secureTextEntry
                
                style={styles.input}
            />
            {!esLogin && (
                <>
                    <TextInput
                    style={styles.input}
                        placeholder='Nombre'
                    />
                    <TextInput
                    style={styles.input}
                        placeholder='Apellido'
                    />
                    <TextInput
                    style={styles.input}
                        placeholder='Telefono'
                        keyboardType='phone-pad'
                    />
                    <TextInput
                    style={styles.input}
                        placeholder='URL foto'
                    />
                </>

            )
            }
            <TouchableOpacity onPress={manejoform}>
                <Text style={styles.boton}>
                    {esLogin ? 'Entrar' : 'Registrarse'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setLogin(!esLogin)} >
                <Text style={styles.preguntas} >
                    {esLogin ? '¿No tienes cuenta? Registrate aqui' : '¿Ya tienes cuenta? Inicia Sesion'}
                </Text>
            </TouchableOpacity>


        </View>
    )
}
const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        alignItems: 'center',
        padding: spacing.md,
        gap: spacing.xl,
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.texto,
        marginTop: 4,
    },
    input: {
        height: 48,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: spacing.md,
        borderRadius: 8,
        marginBottom: spacing.md,
        backgroundColor: colors.superficie,
    },
    boton: {
        backgroundColor: colors.primaria,
        color: 'white',
        padding: spacing.md,
        borderRadius: 25,
        fontSize: 16
    },
    preguntas: {
        color: colors.primaria,
        fontSize: 16,
    }

})