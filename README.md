# Weather App (React + Vite)

Minimal weather app built with Vite and React. The main UI is the [`components.Weather`](src/components/Weather.jsx) component which fetches current weather and a 5-day forecast from OpenWeatherMap for Nigerian state capitals.

Key files
- App root: [`App`](src/App.jsx) — [src/App.jsx](src/App.jsx)  
- Main entry: [src/main.jsx](src/main.jsx)  
- Weather component: [`components.Weather`](src/components/Weather.jsx) — [src/components/Weather.jsx](src/components/Weather.jsx)  
- Weather styles: [src/components/Weather.css](src/components/Weather.css)  
- Global styles: [src/index.css](src/index.css)  
- Vite config: [vite.config.js](vite.config.js)  
- ESLint config: [eslint.config.js](eslint.config.js)  
- Environment variables: [.env](.env) (contains `VITE_APP_ID`)  
- Package manifest: [package.json](package.json)  
- HTML entry: [index.html](index.html)

Features
- Search by Nigerian state (uses capital city for API requests).
- Displays current temperature, humidity, wind speed, description and an icon.
- Shows a 5-day forecast.
- Settings modal: toggle dark mode, humidity, and wind display.
- Uses local assets in [src/assets](src/assets) for icons.

Environment
- The app expects an OpenWeatherMap API key in the env variable `VITE_APP_ID`. Example (already present in workspace):
  - [.env](.env)
- Vite exposes env variables prefixed with `VITE_` to the client (see [`components.Weather`](src/components/Weather.jsx) for usage).

Scripts
- Start dev server:
  ```sh
  npm run dev
  npm run build
  npm preview
  npm run lint

Notes & pointers
. The mapping of Nigerian states to their capitals is defined inside components.Weather.
. Icons are referenced from src/assets inside the component.
. Styling for the widget is in src/components/Weather.css and global layout in src/index.css.
. See vite.config.js for the Vite + React plugin setup and eslint.config.js for linting rules.

Troubleshooting
. If forecasts or current weather fail to load, check the browser console for network errors and verify VITE_APP_ID in .env.
. Ensure Node (>=16) and npm are installed and run npm install before starting.
