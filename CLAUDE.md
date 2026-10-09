@AGENTS.md
======================================================
  BITÁCORA MAESTRA DE PROYECTO - PEER REVIEW 
======================================================
Desarrollador: Jhostyn Albira Colorado
Proyecto: App de Reservas / Clases de Inglés (React Native)
Core Stack: React Navigation, Context API, AsyncStorage
======================================================

------------------------------------------------------
FASE 1: FUNDAMENTACIÓN Y ARQUITECTURA BASE
------------------------------------------------------

- Entradas 1 a 5 
  Fase: Inicialización y Dependencias.
  Acción: Configuración del entorno base en React Native. Instalación de dependencias core `@react-navigation/native` y `@react-native-async-storage/async-storage`. Se estructuró el árbol de directorios separando componentes visuales de la lógica de estado.

- Entradas 6 a 12
  Fase: Enrutamiento Base (React Navigation).
  Acción: Creación de los componentes de vista `ClasesScreens` (Home), `DetalleClaseScreen`, `ReservaScreens`, `LoginScreen` y `PerfilScreen`. Instanciación del `Stack.Navigator` primitivo para permitir la navegación lineal básica.

- Entradas 13 a 20
  Fase: Arquitectura de Estado Global (Context API).
  Acción: Creación del `UsuarioContext` y `UsuarioProvider`. Se definieron los tres estados fundamentales que gobiernan la aplicación: `usuario` (arreglo de base de datos), `usuarioActivo` (sesión actual) y `cargando` (flag de hidratación).

- Entradas 21 a 28
  Fase: Persistencia de Datos (Local Storage).
  Acción: Implementación de almacenamiento asíncrono. Definición de las constantes `CLAVE_USUARIOS` ("@usuarios_ingles") y `CLAVE_SESION` ("@sesion_activa"). Se diseñó la lógica para que los objetos JSON sean serializados (stringify) al guardarse y parseados al leerse.

- Entradas 29 a 35
  Fase: Ciclo de Vida e Hidratación de Estado (useEffect).
  Acción: Implementación del `useEffect` de carga inicial. Se programó la lectura asíncrona de AsyncStorage al montar la aplicación para restaurar tanto la lista de usuarios registrados como la sesión activa, controlando la renderización con la bandera `cargando`.

- Entradas 36 a 45
  Fase: Lógica de Negocio (Registro y Mutación).
  Acción: Desarrollo del callback `registrarUsuario` y `actualizarUsuario`. Se incorporó lógica de validación (uso de `.some()` y `.findIndex()`) para evitar duplicidad de correos (evaluando con `.toLowerCase()`) y asegurar la integridad de la actualización de perfiles.

- Entradas 46 a 53
  Fase: Renderizado Condicional y Seguridad de Rutas.
  Acción: Implementación del Conditional Rendering en el Root de la aplicación. Se configuró el enrutador para que evalúe dinámicamente la existencia de `usuarioActivo`, montando el Main Stack (Home, Perfil, Reservas) o el Auth Stack (Login) de manera excluyente para evitar vulnerabilidades de navegación.

------------------------------------------------------
FASE 2: REFINAMIENTO, DEPURACIÓN Y UI AVANZADA
------------------------------------------------------

- Entrada: 54
  Acción: Revisión de código (Logout function). Se analizó la lógica de limpieza de sesión en memoria volátil y persistente.

- Entrada: 55
  Acción: Control de Calidad de AsyncStorage. El desarrollador identificó un Key Mismatch ('usuario' vs 'usuarioActivo') en la propuesta de borrado. Se confirmó que la clave de removeItem debe tener paridad estricta con setItem.

- Entrada: 56
  Acción: Auditoría de persistencia de sesión. Se detectó la ausencia de la mutación de AsyncStorage en el flujo de login original. Se transformó el callback a asíncrono y se implementó AsyncStorage.setItem utilizando JSON.stringify para completar el ciclo de persistencia.

- Entrada: 57
  Acción: Resolución de Bug (Race condition / Promise Evaluation). Se diagnosticó que la transformación asíncrona de iniciarSesion causaba que el Formulario evaluara una Promesa (undefined.ok). Se eliminaron mutaciones manuales delegando la persistencia al useEffect del Contexto, restaurando el flujo sincrónico.

- Entrada: 58
  Acción: Implementación de UI para Auth State Teardown. Se integró el método cerrarSesion en la vista de Perfil. Se previno un infinite loop asegurando el paso por referencia de la función (onPress={cerrarSesion}).

- Entrada: 59
  Acción: Refinamiento de ruteo de seguridad. Análisis de navigation.replace() y reset() para prevenir el retorno a pantallas de autenticación mediante botones de hardware.

- Entrada: 60
  Acción: Diagnóstico de Dead Component Navigation. Se identificó que la mutación del Contexto provoca el unmount inmediato del AuthStack antes de resolver promesas de UI (Alertas). Se delegó el enrutamiento 100% al Conditional Rendering.

- Entrada: 61
  Acción: Corrección de sintaxis en Event Handlers múltiples. Implementación de Arrow Functions lógicas dentro del prop onPress para ejecutar cierre de sesión y redirección simultánea.

- Entrada: 62
  Acción: Resolución de Memory Leak (Double-Tap Crash). Se corrigió el Anti-Patrón donde onPress estaba sobre el asset visual, restaurando el hit-box y la protección en el componente Touchable.

- Entrada: 63
  Acción: Refactorización de UI Components. Se migró a Pressable. Se implementó State-Driven Styling utilizando la propiedad 'pressed' para inyectar feedback interactivo visual (opacidad/escala paramétrica).

- Entrada: 64
  Acción: Diagnóstico de Routing (Pantallas fantasma). Se identificó un conflicto al intentar navegar al 'Login' desde el Main Stack. Se alertó sobre Race Conditions causadas por apilar vistas rápidamente en la memoria.

- Entradas: 65 y 66
  Acción: Diagnóstico de Dead Clicks en Custom NavBar. Se analizó el bloqueo por defecto de navigate() al coincidir con la ruta destino. Se usó push() como test, lo que detonó un Stack Overflow, confirmando el problema de desbordamiento.

- Entrada: 67
  Acción: Implementación de Debouncing Ligero (Throttling). Para solucionar los colapsos por doble toque sin detonar re-renders, se diseñó un Mutex Pattern simple (variable local let estaNavegando + setTimeout) actuando como Gatekeeper síncrono.

- Entrada: 68
  Acción: Auditoría de Root Navigator. Se corrigió un Anti-Patrón de inyección de Props, removiendo propiedades de renderizado visual (numColumns, contentContainerStyle) insertadas erróneamente en el Stack.Screen.

- Entrada: 69
  Acción: Code Review general de NavBar. Se unificó el código inyectando la lógica de Debouncing y corrigiendo el Dead Route Link que enviaba al usuario a una pantalla inactiva, apuntándolo correctamente a 'Perfil'.

- Entradas: 70 y 71
  Acción: Troubleshooting de integración de Hooks. Se depuró un Stack Trace (undefined is not a function) originado por un Prop Drilling fallido en la variable navigation. Se resolvió integrando el hook moderno useNavigation() desde @react-navigation/native, aislando el componente y garantizando su funcionamiento independientemente del paso de props desde la pantalla padre.