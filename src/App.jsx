import Routing from "./router/Routing"

function App() {
  return (
    <div className="layout">
      {/*Cargando la configuracion de rutas*/}
      <Routing />

      <section className="layout__content">

      </section>
    </div>
  )
}

export default App
