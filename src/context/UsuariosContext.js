import React, { useState, useEffect, useCallback, useMemo, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const  CLAVE_USUARIOS = "@usuarios_ingles"
const CLAVE_SESION ="@sesion_activa"

export const UsuarioContext = createContext(null);

export function UsuarioProvider ({children}){
    const [usuario,setUsuario] = useState([]);
    const [usuarioActivo,setUsuarioActivo]= useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(()=>{
        const cargar = async()=>{
            try{
                const guardadousuario = await AsyncStorage.getItem(CLAVE_USUARIOS);
                const guardadosesion = await AsyncStorage.getItem(CLAVE_SESION);
                if(guardadousuario !== null){
                    setUsuario(JSON.parse(guardadousuario))
                }
                if(guardadosesion !== null){
                    setUsuarioActivo(JSON.parse(guardadosesion))
                }
            }catch(error){
                console.log('error leyendo usuario',error)
            }finally{
                setCargando(false);
            }
        }
        cargar();
    },[]);

    useEffect(()=>{
       if(cargando)return;

       AsyncStorage.setItem(CLAVE_USUARIOS,JSON.stringify(usuario)).catch((e)=>{
        console.log(('Error guardando lista usuarios', e));
       })

       if(usuarioActivo === null){
        AsyncStorage.removeItem(CLAVE_SESION).catch((e)=>console.log('Error borrando sesion',e));
       }else{
        AsyncStorage.setItem(CLAVE_SESION, JSON.stringify(usuarioActivo)).catch((e)=>
        console.log('Error guardando el usuario',e))
       }
    },[usuario,usuarioActivo,cargando]);

    const registrarUsuario = useCallback((nuevoUsuario)=>{
        let resultados = {ok:true}

        setUsuario((previa)=>{
            if(previa.some((u)=>u.email.toLowerCase()===nuevoUsuario.email.toLowerCase())){
                resultados = {ok: false,mensaje: 'Data duplicada: el correo ya existe'};
                return previa;
            }
            setUsuarioActivo(nuevoUsuario);
            
            return [nuevoUsuario, ...previa]
        })
        return resultados;
    },[]);

    const iniciarSesion = useCallback((email,contraseña)=>{
        const encontrado = usuario.find(u => u.email.toLowerCase()===email.toLowerCase() && u.contraseña === contraseña);

        if(encontrado){
            setUsuarioActivo(encontrado);
            return{ok:true};
        }else{
            return {ok:false,mensaje: 'Correo o Contraseña incorrecta'}
        }
    },[usuario])

    const cerrarSesion = useCallback(()=>{
        setUsuarioActivo(null);
    },[])

    const actualizarUsuario = (nuevoDato) =>{
        let resultado = {ok: false, mensaje: ''}

        setUsuario((ListaPrevia)=>{
            const index = ListaPrevia.findIndex(u=>u.id === usuarioActivo.id);

            if(index === -1){
                resultado = {ok: false,mensaje:'usuario no encontrado'};
                return ListaPrevia;
            }

            const nuevaLista = [...ListaPrevia];

            const usuarioModificado = {...nuevaLista[index], ...nuevoDato};

            nuevaLista[index] = usuarioModificado;

            setUsuarioActivo(usuarioModificado);

            resultado = {ok: true,mensaje: 'Datos actualizados con exito'};

            return nuevaLista;
        })

        return resultado;
    }
    
    const valor = useMemo(
        ()=>({usuarioActivo,cargando,registrarUsuario,iniciarSesion,cerrarSesion,actualizarUsuario}),
        [usuarioActivo,cargando,registrarUsuario,iniciarSesion,cerrarSesion,actualizarUsuario]
    )
    return <UsuarioContext.Provider value={valor}>{children}</UsuarioContext.Provider>

}