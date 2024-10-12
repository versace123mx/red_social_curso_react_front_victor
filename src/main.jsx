import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

//importar assets(recursos hojas de estilo, imagenes, fuentes)
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.css'
import './assets/css/normalize.css'
import './assets/css/styles.css'
import './assets/css/responsive.css'
import '../public/css/spinner.css';
import '../public/css/spinner2.css';
import '../public/css/spinner_2.css';

//libreria para el tiempo formatear las fechas y aparesca hace x tiempo
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es.json'
TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(es)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
