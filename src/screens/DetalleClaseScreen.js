import react, {useMemo,useState,useLayoutEffect} from 'react';
import {View, Text, ScrollView,StyleSheet, Alert, Image ,TouchableOpacity } from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import useResponsive from '../hooks/useResponsive';
import {colors,spacing,sombra,typography,radius} from '../theme';
import {formatearPrecio} from '../data/clases';

export default function DetalleClaseScreen({route,navigation}){
    const insets = useSafeAreaInsets();
    const {clase} = route.params;
    const {isTablet} = useResponsive();
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

    const manejoReserva = () => {
      if(clase.cupos > 0){
        clase.cupos = clase.cupos - 1;
        Alert.alert('Reserva exitosa', 'Tu reserva ha sido realizada con éxito.');
      }
    }
    useLayoutEffect(() => {
      navigation.setOptions({
        title: clase.titulo,
      });
    }, [navigation, clase]);

    return(
        <View style={styles.pantalla}>
        <ScrollView 
        contentContainerStyle={{paddingBottom: 120}}
        showsVerticalScrollIndicator={false}
        >
        <Image 
        source={{uri: clase.imagen}}
        style={[styles.portada, {height: isTablet ? 300 : 200}]}
        resizeMode="cover"
        />
          <View>
            <View style={styles.dato}>
              <View style={styles.profesor}>
                <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
                <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
              </View>

              <Text style={styles.descripcion}>{clase.descripcion}</Text>
              <Text style={styles.precio}>Costo: {formatearPrecio(clase.precio)}</Text>
              <Text>Duracion de la clase: {clase.duracion} min.</Text>
              <Text>Cupos disponibles: {clase.cupos}</Text>  
              <Text>Horarios:</Text>
              <View style={{flexDirection: 'column', gap: spacing.sm, padding: spacing.md, borderRadius: radius.lg, marginTop: spacing.md}}>
                {
                  clase.horarios.map((horario, index) => (
                    <TouchableOpacity style={{ backgroundColor: horarioSeleccionado === horario ?'white':'gray', padding: spacing.md, borderRadius: radius.lg}} key={index} onPress={() => setHorarioSeleccionado(horario)}>
                      <Text>{horario}</Text>
                    </TouchableOpacity>
                  ))
                }
              </View>
              
              
              <View style={styles.contenido}>
                {
                  clase.cupos > 0 ? (
                    <Text style={styles.botonInscribirme}  onPress={() => manejoReserva()}>Reservar</Text>

                  ):(
                    <Text style={styles.botonInscribirme}>Sin cupos disponibles</Text>
                  )
                }
              </View>
            </View>
          </View>
       
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: '100%', backgroundColor: colors.primarioSuave },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: 'left', gap: 4,spacing: spacing.sm, padding: spacing.md, backgroundColor: '#d1cccc60', borderRadius: radius.lg, marginTop: spacing.md},
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,

  },
  avatar: { width: 82, height: 82, borderRadius: 48, backgroundColor: colors.border },
  profesorNombre: { fontSize: 20, fontWeight: '700', color: colors.texto },
  descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacing.lg,
    paddingTop: spacing.lg
  },
  precio: { fontSize: 18, fontWeight: '800', color: colors.primario },
  contenido: { alignContent: 'center', justifyContent: 'center', alignItems: 'center', marginTop: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.primario, borderRadius: radius.md },
  botonInscribirme:{ color: '#e3e4e6', fontSize: 16, fontWeight: '600', marginTop: spacing.md,paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: 25, backgroundColor: '#348bdb' },
});

