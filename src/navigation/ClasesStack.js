import react from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClasesScreens from '../screens/ClasesScreens';
import DetalleClaseScreen from '../screens/DetalleClaseScreen';
import ReservaScreens from '../screens/ReservaScreens';
import {colors,spacing,columns} from '../theme';

const Stack = createNativeStackNavigator();

export default function ClasesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Home"
            component={ClasesScreens}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="DetalleClase"
            component={DetalleClaseScreen}
            options={{
                title: 'Detalle',headerBackTitle:'Atras'
            }}
            numColumns={columns.lg}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: spacing.xl, flexGrow: 1, paddingBottom: spacing.xl   }}
            />
            <Stack.Screen
            name="Reservas"
            component={ReservaScreens}
            options={{
                title: 'Reserva de clase',headerBackTitle:'Atras'
            }}
            />
        </Stack.Navigator>
    )
}