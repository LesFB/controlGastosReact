import { useState, useEffect } from 'react'
import Header from './components/Header'
import NuevoPresupuesto from './components/NuevoPresupuesto'
import ControlPresupuesto from './components/ControlPresupuesto'
import { generarId } from "./components/helpers"
import Filtros from './components/Filtros'




function App() {
  const [presupuesto,setPresupuesto]=useState(
    Number(localStorage.getItem('presupuesto'))??0
  )
  const [isValidPresupuesto,setIsValidPresupuesto]=useState(false)
  const [modal,setModal]=useState(false)
  const [gastos,setGastos]=useState(
    localStorage.getItem('gastos')?JSON.parse(localStorage.getItem('gastos')) :[]
  )
  const [gastoEditar,setGastoEditar] = useState({})
  const [filtro,setFiltro]= useState('')
  const [gastosFiltrados,setGastosFiltrados] = useState([])

  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')??0)

    if(presupuestoLS>0){
      setIsValidPresupuesto(true)
    }

  },[])

  useEffect(()=>{
    if(filtro){
       const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
       setGastosFiltrados(gastosFiltrados)
    }
  },[filtro])

  const guardarGasto = gasto =>{
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ?gasto: gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()
      setGastos([...gastos,gasto])
    }    
  }

  const eliminarGasto = id=>{
    const gastosActualizados =gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar':''}>
      <Header/>
      
      {isValidPresupuesto ? 
      (<>
      
        <ControlPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        modal={modal}
        setModal={setModal}
        guardarGasto={guardarGasto}
        gastos={gastos}
        setGastos={setGastos}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
        eliminarGasto={eliminarGasto}
        filtro={filtro}
        gastosFiltrados={gastosFiltrados}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      <Filtros
        filtro={filtro}
        setFiltro={setFiltro}
      />
      
      
      </>)
      :(
        <NuevoPresupuesto
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      )}
      
      
      
    </div>
  )
}

export default App
