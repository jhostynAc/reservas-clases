import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {colors, spacing} from "../theme";

export default function EstadoVacio(icono, titulo, mensaje, textoAction, onAction) {
    return (
        <View style={style.contenedor}>
            <View style={style.circulo}>
                <Ionicons name={icono} size={30} color={colors.primario} />
            </View>
            <Text style={style.titulo}>{titulo}</Text>
            <Text style={style.mensaje}>{mensaje}</Text>

        </View>
    )

}

const style = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  circulo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primarioSuave,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  titulo: { fontSize: 17, fontWeight: '700', color: colors.texto, textAlign: 'center' },
  mensaje: {
    fontSize: 14,
    color: colors.textoSuave,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
});