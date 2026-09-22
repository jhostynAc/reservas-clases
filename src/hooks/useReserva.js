import { useContext } from "react";
import {ReservasContext} from '../context/ReservasContext';

export default function useReservas(){
    const contexto = useContext(ReservasContext);
    if(!contexto){
        throw new Error('useReserva debe usarse dentro de <ReservaProvider>');
    }

    return contexto;

};