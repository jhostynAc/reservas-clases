import {plataform} from "react-native";

export const colors={
    fondo:"#F6F7FB",
    primaria:'#4f46e5',
    texto:'#111827',
    border:'#14377e'
}

export const spacing={
    xs:4,
    sm:8,
    md:12,
    lg:16,
    xl:20
}

export const radius={
    sm:4,
    md:8,
    lg:12,
    full:9999
}



export const typography={
    titulo:{fontsize:26,fontweight:'700',color:colors.texto},
    subtitulo:{fontsize:18,fontweight:'600',color:colors.texto}
}

export const columns={
    xs:2,
    sm:3,
    md:4,
    lg:6
}

export default{colors,spacing,typography,radius}