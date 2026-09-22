import { useState, useLayoutEffect, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAlmacenamiento(clave, valorinicial) {

    const [valor, setValor] = useState(valorinicial);
    const [listo, setListo] = useState(false);

    useEffect(() => {
        let activo = true; //bandera para ver si guardo 

        AsyncStorage.getItem(clave)
            .then((guardando) => {
                if (activo && guardando !== null) setValor(JSON.parse(guardando));

            })
            .catch((error) => console.log('error leyendo' + clave, error))
            .finally(() => activo && setListo(true));

            return()=>{
                activo = false;
                
            }
    },[clave]);

    const actualizar = useCallback(
        async(nuevoValor)=>{
            setValor(nuevoValor);
            try{
                await AsyncStorage.setItem(clave,JSON.stringify(nuevoValor));
            }catch(error){
                console.log('Error guardando'+ clave,error)
            }
        },[clave]
    );
}