# SmartBiz-AI - Report Completo del Progetto Expo/React Native

## 📋 Panoramica Generale

**Nome:** SmartBiz-AI  
**Tipo:** Applicazione mobile cross-platform (Expo + React Native)  
**Versione:** 1.0.0  
**SDK Expo:** ~57.0.25  
**React:** 19.2.3  
**React Native:** 0.86.3  
**TypeScript:** ~6.0.3  

---

## 📁 Albero delle Cartelle (File del Progetto)

```
D:/SmartBiz-AI/
├── .claude/                    # Configurazioni Claude AI
├── .expo/                      # Build Expo generati (non commitare)
├── .git/                       # Repository Git
├── .gitignore                  # File ignorati da Git
├── .vscode/                    # Configurazioni VS Code
│   └── settings.json           # Impostazioni editor
├── assets/                     # Risorse statiche (immagini, icone)
│   ├── expo.icon/              # Icona dell'app per Expo
│   │   ├── Assets/expo-symbol 2.svg
│   │   ├── grid.png
│   │   └── icon.json
│   ├── images/                 # Immagini e risorse grafiche
│   │   ├── android-icon-background.png
│   │   ├── android-icon-foreground.png
│   │   ├── android-icon-monochrome.png
│   │   ├── expo-badge.png
│   │   ├── expo-badge-white.png
│   │   ├── expo-logo.png
│   │   ├── favicon.png
│   │   ├── icon.png            # Icona principale dell'app
│   │   ├── logo-glow.png       # Logo con effetto glow per animazioni
│   │   ├── react-logo.png      # Logo React (versione base)
│   │   ├── react-logo@2x.png   # Logo React @2x
│   │   ├── react-logo@3x.png   # Logo React @3x
│   │   ├── splash-icon.png     # Icona per lo splash screen
│   │   └── tabIcons/           # Icone per le tab navigation
│   │       ├── explore.png
│   │       ├── explore@2x.png
│   │       ├── explore@3x.png
│   │       ├── home.png
│   │       ├── home@2x.png
│   │       └── home@3x.png
│   └── tutorial-web.png        # Immagine tutorial per web
├── scripts/                    # Script di utilità
│   └── reset-project.js        # Script per resettare il progetto
├── src/                        # Codice sorgente principale
│   ├── app/                    # File-based routing (Expo Router)
│   │   ├── _layout.tsx         # Layout root con tab navigation
│   │   ├── explore.tsx         # Seconda schermica "Explore"
│   │   └── index.tsx           # Schermata principale "Home"
│   ├── components/             # Componenti riutilizzabili
│   │   ├── animated-icon.tsx   # Icona animata per splash screen
│   │   ├── animated-icon.web.tsx  # Versione web dell'icona animata
│   │   ├── app-tabs.tsx        # Componente tab navigation nativo
│   │   ├── app-tabs.web.tsx    # Versione web delle tab
│   │   ├── external-link.tsx   # Link che si aprono in browser esterno
│   │   ├── hint-row.tsx        # Row con suggerimenti per editing
│   │   ├── themed-text.tsx     # Testo temato (light/dark mode)
│   │   └── themed-view.tsx     # View temata (light/dark mode)
│   ├── constants/              # Costanti globali
│   │   └── theme.ts            # Colori, font, spacing per light/dark
│   └── hooks/                  # Custom hooks React
│       ├── use-color-scheme.ts # Hook per rilevare tema (light/dark)
│       ├── use-color-scheme.web.ts  # Versione web dell'hook
│       └── use-theme.ts        # Hook principale per ottenere theme
├── .expo/types/router.d.ts     # Type definitions Expo Router
├── expo-env.d.ts               # Type declarations di Expo
├── package.json                # Dipendenze e script
├── package-lock.json           # Lock file dipendenze
├── tsconfig.json               # Configurazione TypeScript
├── app.json                    # Configurazione Expo principale
├── LICENSE                     # Licenza del progetto
├── README.md                   # Documentazione di benvenuto
└── AGENTS.md                   # Istruzioni per AI assistant
```

---

## ⚙️ File di Configurazione

### package.json
```json
{
  "name": "smartbiz-ai",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "dependencies": {
    "@expo/ui": "~57.0.20",
    "expo": "~57.0.25",
    "expo-constants": "~57.0.19",
    "expo-device": "~57.0.2",
    "expo-font": "~57.0.4",
    "expo-glass-effect": "~57.0.4",
    "expo-image": "~57.0.5",
    "expo-linking": "~57.0.11",
    "expo-router": "~57.0.23",
    "expo-splash-screen": "~57.0.9",
    "expo-status-bar": "~57.0.1",
    "expo-symbols": "~57.0.3",
    "expo-system-ui": "~57.0.4",
    "expo-web-browser": "~57.0.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.86.3",
    "react-native-gesture-handler": "~2.32.0",
    "react-native-reanimated": "4.5.1",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "~4.26.0",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.10.1"
  },
  "devDependencies": {
    "@types/react": "~19.2.2",
    "typescript": "~6.0.3"
  }
}
```

### app.json (Configurazione Expo)
- **Nome:** SmartBiz-AI
- **Slug:** SmartBiz-AI
- **Orientazione:** Portrait
- **Scheme:** smartbizai
- **User Interface Style:** Automatico (light/dark automatico)
- **Plugin:** expo-router, expo-splash-screen
- **Experiments:** typedRoutes: true, reactCompiler: true

### tsconfig.json
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/assets/*": ["./assets/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

### src/global.css (Global Styles)
```css
:root {
  --font-display:
    Spline Sans, Inter, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol, Noto Color Emoji;
  --font-mono:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  --font-rounded: 'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif;
  --font-serif: Georgia, 'Times New Roman', serif;
}
```

### src/components/animated-icon.module.css (CSS Modules)
```css
.expoLogoBackground {
  background-image: linear-gradient(180deg, #3c9ffe, #0274df);
  border-radius: 40px;
  width: 128px;
  height: 128px;
}
```

---

## 🎨 Sistema di Theme (Light/Dark Mode)

### Colors (src/constants/theme.ts)
**Light Mode:**
- text: #000000
- background: #ffffff
- backgroundElement: #F0F0F3
- backgroundSelected: #E0E1E6
- textSecondary: #60646C

**Dark Mode:**
- text: #ffffff
- background: #000000
- backgroundElement: #212225
- backgroundSelected: #2E3135
- textSecondary: #B0B4BA

### Fonts (piattaforma-specific)
**iOS:** system-ui, ui-serif, ui-rounded, ui-monospace  
**Android/Default:** normal, serif, normal, monospace  
**Web:** var(--font-display), var(--font-serif), var(--font-rounded), var(--font-mono)

### Spacing System
- half: 2px
- one: 4px
- two: 8px
- three: 16px
- four: 24px
- five: 32px
- six: 64px

---

## 🧩 Componenti Principali

### 1. AnimatedIcon (src/components/animated-icon.tsx)
**Funzione:** Icona animata per lo splash screen con effetto glow rotante  
**Tecnologie:** react-native-reanimated, expo-image  
**Animazioni:**
- Glow che ruota 7200 gradi in 60 secondi
- Logo che appare con scale animation
- Background che si ridimensiona

### 2. AnimatedSplashOverlay (src/components/animated-icon.tsx)
**Funzione:** Overlay dello splash screen che scompare dopo l'animazione  
**Logica:** Usa SplashScreen.preventAutoHideAsync() e scheduleOnRN per timing asincrono

### 3. AppTabs (src/components/app-tabs.tsx)
**Funzione:** Navigation tabs nativo con due schermate: Home ed Explore  
**Icone:** home.png, explore.png (con versioni @2x e @3x)

### 4. ThemedText (src/components/themed-text.tsx)
**Funzione:** Componente testo che supporta light/dark mode  
**Tipi disponibili:** default, title, small, smallBold, subtitle, link, linkPrimary, code

### 5. ThemedView (src/components/themed-view.tsx)
**Funzione:** Container con background temato  
**Props:** type (lightColor, darkColor per override)

### 6. Collapsible (src/components/ui/collapsible.tsx)
**Funzione:** Componente espandibile/collassabile con animazione FadeIn  
**Icona:** Chevron che ruota quando aperto/chiuso

### 7. ExternalLink (src/components/external-link.tsx)
**Funzione:** Link che si aprono in browser esterno su mobile, non in tab web  
**Tecnologia:** expo-web-browser per aprire browser nativo

### 8. WebBadge (src/components/web-badge.tsx)
**Funzione:** Badge visivo solo su web con versione di Expo  
**Immagini:** expo-badge.png (light), expo-badge-white.png (dark)

---

## 🪝 Custom Hooks

### useColorScheme (src/hooks/use-color-scheme.ts)
```typescript
export { useColorScheme } from 'react-native';
```
Importa direttamente l'hook nativo di React Native per rilevare il tema.

### useTheme (src/hooks/use-theme.ts)
```typescript
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;
  return Colors[theme];
}
```
Restituisce l'oggetto colori corrente in base al tema.

---

## 📱 Schermate (File-based Routing)

### src/app/_layout.tsx (Layout Root)
- ThemeProvider con DefaultTheme o DarkTheme
- AnimatedSplashOverlay per animazione iniziale
- AppTabs per navigation tra schermate

### src/app/index.tsx (Home Screen)
- Benvenuto "Welcome to Expo"
- Icona animata
- Suggerimenti per sviluppo:
  - Shake device o premi 'm' in terminale
  - Premi cmd+m (Android) / cmd+d (iOS) per dev menu
  - Web: usare browser devtools

### src/app/explore.tsx (Explore Screen)
- Documentazione su file-based routing
- Supporto Android, iOS e web
- Esempi di immagini con @2x/@3x suffixes
- Light/dark mode support
- Animazioni con react-native-reanimated

---

## 🛠️ Script Disponibili

### npm run start
Avvia il development server Expo.

### npm run android
Apri l'app su Android emulator/emulatore.

### npm run ios
Apri l'app su iOS simulator.

### npm run web
Apri la versione web dell'app.

### npm run lint
Esegui linting con expo lint.

### npm run reset-project
Resetta il progetto a uno stato vuoto (sposta file in /example).

---

## 📦 Plugin e Dipendenze Expo

### Plugin Configurati:
1. **expo-router** - File-based routing
2. **expo-splash-screen** - Splash screen personalizzato con backgroundColor #208AEF

### Esperimenti Abilitati:
- typedRoutes: true (type safety per routes)
- reactCompiler: true (React Compiler per ottimizzazioni)

---

## 🎯 Istruzioni per lo Sviluppo

### 1. Installazione
```bash
npm install
# oppure
npx expo install
```

### 2. Avvio Development Server
```bash
npx expo start
```

### 3. Modifica Schermate
- Home: `src/app/index.tsx`
- Explore: `src/app/explore.tsx`
- Layout root: `src/app/_layout.tsx`

### 4. Aggiunta Nuove Schermate
Crea file `.tsx` in `src/app/` (es: `src/app/settings.tsx`)

### 5. Aggiunta Componenti
Metti componenti non-route in `src/components/` o cartelle specifiche

### 6. Aggiunta Assets
Metti immagini in `assets/images/` con suffissi @2x/@3x per DPI diversi

---

## 🚀 Build e Distribuzione (EAS)

### Development Build (per librerie native)
```bash
npx expo run:ios
# oppure
npx expo run:android
```

### Production Build con EAS
```bash
bunx eas-cli build --profile development
bunx eas-cli submit
```

### OTA Updates
```bash
bunx eas-cli update "Nuova versione del codice"
```

---

## ⚠️ Note Importanti

1. **iOS/Android non esistono localmente** - Usato Continuous Native Generation (CNG). Configurare in `app.json`.

2. **Expo Go vs Development Build:**
   - Expo Go include solo moduli bundled
   - Dopo aggiungere librerie native: serve development build

3. **Non modificare ios/ o android/** - Generati automaticamente da EAS

4. **Preferire Expo Modules** - Prima di usare librerie third-party, controllare docs.expo.dev

5. **API cambi frequentemente** - SDK 57 ha breaking changes rispetto a versioni precedenti

---

## 🔗 Risorse Esterne

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router Docs](https://docs.expo.dev/router/introduction.md)
- [EAS Build Docs](https://docs.expo.dev/eas/index.md)
- [Color Schemes Guide](https://docs.expo.dev/develop/user-interface/color-themes/)

---

## 📝 File Aggiuntivi

### .gitignore
Ignora:
- node_modules/
- .expo/
- dist/
- web-build/
- expo-env.d.ts
- .kotlin/
- *.orig.*
- *.jks
- *.p8
- *.p12
- *.key
- *.mobileprovision
- .metro-health-check*
- npm-debug.*
- yarn-debug.*
- yarn-error.*
- .DS_Store
- *.pem
- .env*.local
- *.tsbuildinfo
- example/
- /ios
- /android

### CLAUDE.md
Riferimento ad AGENTS.md per istruzioni AI assistant.

### LICENSE
Licenza del progetto (contenuto non specificato).

---

**Generato automaticamente da analisi del file system.**  
**Ultimo aggiornamento:** 27 settembre 2025
