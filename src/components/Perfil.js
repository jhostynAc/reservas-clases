import React, { useContext, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Modal, ActivityIndicator, TextInput, Alert } from 'react-native';
import { UsuarioContext } from '../context/UsuariosContext';
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, radius } from '../theme'

export default function Perfil({navigation}) {
    const { usuarioActivo, cargando, actualizarUsuario,cerrarSesion } = useContext(UsuarioContext);

    const [modalVisible, setmodalVisible] = useState(false);
    const [editCorreo, seteditCorreo] = useState('');
    const [editTelefono, seteditTelefono] = useState('');

    if (cargando) return <ActivityIndicator size="large" />
    if (!usuarioActivo) return <Text>No hay sesion iniciada</Text>

    const abrirEdicion = () => {
        seteditCorreo(usuarioActivo.email);
        seteditTelefono(usuarioActivo.telefono);
        setmodalVisible(true);
    }

    const guardarCambios = () => {
        if (editCorreo.trim() === '' || editTelefono.trim() === '') {
            Alert.alert("Aviso", "Los campos no pueden estar vacios");
            return;
        }
        const paqueteUpdate = {
            email: editCorreo,
            telefono: editTelefono
        }
        const resultado = actualizarUsuario(paqueteUpdate);

        if (resultado.ok) {
            setmodalVisible(false);
            Alert.alert("Exito",resultado.mensaje)
        } else {
            Alert.alert("Error", resultado.mensaje)
        }

    }

    return (
        <View style={styles.centrado}>
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Perfil</Text>
                <Pressable style={styles.logout} onPress={()=>{
                    cerrarSesion();
                    navigation.navigate('Home');
                }} >
                    <Ionicons name='log-out' color={'white'} size={24} />
                </Pressable>
            </View>
            <Image style={styles.avatar} source={{ uri: usuarioActivo.foto }} />
            <Text style={styles.descripcion}>Nombre: {usuarioActivo.nombre} {usuarioActivo.apellido}</Text>
            <Text style={styles.descripcion}>Correo: {usuarioActivo.email}</Text>
            <Text style={styles.descripcion}>Telefono: {usuarioActivo.telefono}</Text>
            <Pressable style={styles.botoneditar} onPress={abrirEdicion}>
                <Text>Editar Perfil <Ionicons name='pencil-sharp' size={15} /></Text>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}

            >
                <View style={styles.contedorM}>
                    <View style={styles.contenedor2}>
                        <Text style={styles.titulo}>Actualizar datos</Text>
                        <View style={styles.contenedorIn}>
                            <Text style={styles.descripcion}>Correo</Text>
                            <TextInput
                                placeholder='Correo'
                                value={editCorreo}
                                onChangeText={seteditCorreo}
                                style={styles.input}
                                placeholderTextColor={'black'}
                                keyboardType='email-address'
                            />
                            <Text style={styles.descripcion}>Telefono</Text>
                            <TextInput
                                placeholder='Telefono'
                                value={editTelefono}
                                onChangeText={seteditTelefono}
                                style={styles.input}
                                placeholderTextColor={'black'}
                                keyboardType='phone-pad'
                            />
                        </View>

                        <View style={styles.botones}>
                            <Pressable style={styles.botonguardar} onPress={guardarCambios}>
                                <Text>Guardar</Text>
                            </Pressable>
                            <Pressable style={styles.botoncancelar} onPress={() => setmodalVisible(false)}>
                                <Text>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>


                </View>
            </Modal>
        </View>

    )
}


const styles = StyleSheet.create({
    contenedor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: spacing.md
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.texto,
        marginTop: 4,
    },
    centrado: {
        flex: 1,
        alignItems: 'center',
    },
    avatar: {
        width: 140,
        height: 140,
        borderRadius: 80,
        backgroundColor: colors.fondo,
        borderWidth: 2,
        borderColor: colors.primaria
    },
    descripcion: {
        fontSize: 15,
        color: '#363636',
        lineHeight: 24,
        padding: spacing.xs
    },
    input: {
        height: 48,
        width: '100%',
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: spacing.md,
        borderRadius: 8,
        marginBottom: spacing.md,
    },
    botoneditar: {
        backgroundColor: '#FFCB56',
        padding: spacing.md,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botones: {
        justifyContent: 'center',
        flexDirection: 'row',
        gap: spacing.md,
        padding: spacing.lg
    },
    botonguardar: {
        backgroundColor: '#689D4B',
        padding: spacing.md,
        borderRadius: 25,
    },
    botoncancelar: {
        backgroundColor: '#BD4444',
        padding: spacing.md,
        borderRadius: 25,
    },
    contedorM: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contenedor2: {
        width: '80%',
        alignItems: 'center',
        gap: spacing.md,
        padding: spacing.xl,
        borderRadius: 25,
        backgroundColor: 'white'
    },
    contenedorIn:{
        width: '100%'
    },
    logout:{
        padding: spacing.md,
        gap: spacing.md,
        backgroundColor: colors.primaria,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
});