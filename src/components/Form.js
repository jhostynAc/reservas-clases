import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { spacing, colors, radius } from '../theme';
import { Ionicons } from "@expo/vector-icons";
import { UsuarioContext } from '../context/UsuariosContext'

export default function Form({navigation }) {

    const { registrarUsuario, iniciarSesion } = useContext(UsuarioContext);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [foto, setFoto] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');

    const [esLogin, setLogin] = useState(true);

    const manejosSubmit = () => {
        if (!esLogin) {
            const paquete = {
                id: Date.now().toString(),
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                foto: foto,
                email: email.trim().toLowerCase(),
                contraseña: contraseña
            };

            const resultado = registrarUsuario(paquete);
            if (resultado.ok) {
                Alert.alert(
                    'Exito',
                    'Cuenta creada exitosamente'
                    [
                        {
                            text: 'Continuar',
                            onPress:()=> navigation.navigate('Perfil')
                        }
                    ]
                );
            } else {
                Alert.alert('Aviso', resultado.mensaje)
            }
        } else {
            const resultado = iniciarSesion(email.trim().toLocaleLowerCase(), contraseña)
            if (!resultado.ok) {
                Alert.alert('Error', resultado.mensaje)
            } else {
                Alert.alert(
                    "Bienvenido",
                    "Has iniciado sesion correctamente",
                    [
                        {
                            text:"continuar",
                            onPress:()=> navigation.navigate('Perfil')
                        }
                    ]
                )
            }
        }
    }

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
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder='Contraseña'
                secureTextEntry
                autoCapitalize='none'
                value={contraseña}
                onChangeText={setContraseña}
                style={styles.input}
            />
            {!esLogin && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder='Nombre'
                        value={nombre}
                        onChangeText={setNombre}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Apellido'
                        value={apellido}
                        onChangeText={setApellido}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Telefono'
                        keyboardType='phone-pad'
                        value={telefono}
                        onChangeText={setTelefono}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='URL foto'
                        value={foto}
                        onChangeText={setFoto}
                    />
                </>

            )
            }
            <TouchableOpacity onPress={manejosSubmit}>
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
    contenedor: {
        flex: 1,
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