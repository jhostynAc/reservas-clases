import React, { useState, useEffect, useCallback, useMemo, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLAVE_RESERVAS = "@reservas_ingles";

export const ReservasContext = createContext(null);

export function ReservaProvider({ children }) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);


    useEffect(() => {
        const cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if (guardado !== null) {
                    setReservas(JSON.parse(guardado))
                }
            } catch (error) {
                console.log('error leyendo reservas', error);
            } finally {
                setCargando(false);
            }

        }
        cargar();

    }, [])

    useEffect(() => {
        if (cargando) return
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((e) =>
            console.log('Ocurrio un error guardando la reserva', e))
    }, [reservas, cargando]);


    const agregarReserva = useCallback((clase, horario) => {
        const nueva = {
            id: clase.id + '-' + horario,
            claseId: clase.id,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre,
            precio: clase.precio,
            horario,
            creadaEn: new Date().toISOString(),
        };
        let resultados = { ok: true };
        setReservas((previa) => {
            if (previa.some((r) => r.id === nueva.id)) {
                resultados = { ok: false, mensaje: 'Data duplicada' }
                return previa;
            }
            return [nueva, ...previa];

        })
        return resultados;
    }, [])

    const eliminarReserva = useCallback((idReserva) => {
        setReservas((previa)=> previa.filter((reserva) => reserva.id !== idReserva));
    }, [])
    const valor = useMemo(
        () => ({ reservas, cargando, agregarReserva, eliminarReserva }), [reservas, cargando, agregarReserva, eliminarReserva]
    )

    return <ReservasContext.Provider value={valor}>{children}</ReservasContext.Provider>

}