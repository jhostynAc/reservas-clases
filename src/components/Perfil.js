import React, { useContext } from "react";
import {View,Text,Image,StyleSheet,TouchableOpacity} from 'react-native';
import {UsuarioContext} from '../context/UsuariosContext';
import {Ionicons} from "@expo/vector-icons";
import {colors,spacing,radius} from '../theme'

export default function Perfil (){
    const {usuarioActivo,cargando} = useContext(UsuarioContext);

    return(
        <View style={styles.centrado}>
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Perfil</Text>
                <TouchableOpacity>
                    <Ionicons name='log-out' size={24} />
                </TouchableOpacity>
            </View>
        <Image style={styles.avatar} source={{uri: usuarioActivo.foto}}/>
        <Text style={styles.descripcion}>Nombre: {usuarioActivo.nombre} {usuarioActivo.apellido}</Text>
        <Text style={styles.descripcion}>Correo: {usuarioActivo.email}</Text>
        <Text style={styles.descripcion}>Telefono: {usuarioActivo.telefono}</Text>
        </View>
        
    )
}


const styles = StyleSheet.create({
    contenedor:{
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
});