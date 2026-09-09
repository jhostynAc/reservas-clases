import react from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ClasesScreens from '../screens/ClasesScreens';
import {colors} from '../theme';

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
            numColumns={columnas}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal,flexGrow: 1, paddingBottom: spacing.xl   }}
            />
        </Stack.Navigator>
    )
}