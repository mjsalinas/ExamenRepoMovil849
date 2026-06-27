# Control de Gastos

App móvil básica de control de gastos construida con Expo + React Native.

## Características

- Registro de gastos (descripción, monto, categoría, fecha)
- Lista de gastos con total acumulado y eliminación
- Resumen por categoría con barras de porcentaje
- Tema claro/oscuro (React Context)
- Idioma español/inglés con `i18n-js` (React Context)
- Persistencia local con `AsyncStorage`
- Navegación stack + bottom tabs (React Navigation)
- New Architecture habilitada (`newArchEnabled: true`)

## Stack

| Herramienta      | Versión   |
| ---------------- | --------- |
| Expo SDK         | ~54.0.33  |
| React Native     | 0.81.5    |
| React            | 19.1.0    |
| TypeScript       | ~5.9.2    |
| Node.js          | >= 20 LTS |
| Package manager  | npm       |

## Requisitos

- Node.js >= 20 LTS
- npm

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start        # Expo dev server (QR)
npm run android  # Abrir en Android
npm run ios      # Abrir en iOS (macOS)
npm run web      # Abrir en navegador
```

## Verificar tipos

```bash
npm run typecheck
```

## Estructura

```
index.ts                  Entry point -> registerRootComponent(App)
App.tsx                   Providers (Theme, Language, Expenses) + StatusBar
src/
  context/                Contextos de React (tema, idioma, gastos)
  i18n/                   Configuración y traducciones i18n-js (es/en)
  navigation/             Stack raíz + bottom tabs
  screens/                Gastos, Agregar, Resumen, Ajustes
  components/             Componentes reutilizables (ExpenseItem)
  storage/                Helpers de AsyncStorage
  theme/                  Definición de temas claro/oscuro
  types/                  Tipos del dominio (Expense, categorías)
  utils/                  Formato de moneda y fechas
```
