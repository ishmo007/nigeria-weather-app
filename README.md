# Weather App (React + Vite)

Minimal weather app built with Vite and React. The main UI is the [`components.Weather`](src/components/Weather.jsx) component which fetches current weather and a 5-day forecast from OpenWeatherMap for Nigerian state capitals.

Features
- Search by Nigerian state (uses capital city for API requests).
- Displays current temperature, humidity, wind speed, description and an icon.
- Shows a 5-day forecast.
- Settings modal: toggle dark mode, humidity, and wind display.

Environment
- The app expects an OpenWeatherMap API key in the env variable `VITE_APP_ID`.
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

Troubleshooting
. If forecasts or current weather fail to load, check the browser console for network errors and verify VITE_APP_ID in .env.
