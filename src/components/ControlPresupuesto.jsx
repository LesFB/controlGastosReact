import {useEffect} from 'react'
import {useState} from 'react'
import IconoNuevoGasto from "../img/nuevo-gasto.svg"
import Modal from "./Modal"
import ListadoGasto from './ListadoGasto'
import {CircularProgressbar,buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'



const ControlPresupuesto = ({
  presupuesto,setPresupuesto,
  modal,setModal,
  guardarGasto,
  gastos,setGastos,
  gastoEditar,setGastoEditar,
  eliminarGasto,filtro,gastosFiltrados,
  setIsValidPresupuesto}) => {

    const [disponible,setDisponible]=useState(0)
    const [gastado, setGastado]=useState(0)
    const [porcentaje,setPorcentaje]=useState(0)

    useEffect(()=>{
      const totalGastado = gastos.reduce( (total,gasto)=>gasto.cantidad+total,0)
      const totalDisponible= presupuesto-totalGastado

      setGastado(totalGastado)
      setDisponible(totalDisponible)

      const nuevoPorcentaje = (((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2)
      setTimeout(()=>{
        setPorcentaje(nuevoPorcentaje)
      },600)
      

    },[gastos])

    const [animarModal,setAnimarModal]=useState(false)
    const formatearCantidad = (cantidad) =>{
        return cantidad.toLocaleString('en-US',{
            style:"currency",
            currency:"USD"
        })
    }

    useEffect(()=>{
      if( Object.keys(gastoEditar).length>0){
        setModal(true)

      setTimeout(()=>{
          setAnimarModal(true)
      },500)
      }
    },[gastoEditar])

    useEffect(()=>{
      localStorage.setItem('presupuesto',presupuesto??0)
    },[presupuesto])

    useEffect(()=>{
      localStorage.setItem('gastos',JSON.stringify(gastos)??[])
    },[gastos])

    const handleNuevoGasto = (e)=>{
      setModal(true)
      setGastoEditar({})

      setTimeout(()=>{
          setAnimarModal(true)
      },500)
    }

    const handleResetApp=()=>{
      const resultado = confirm('¿Deseas reiniciar la app?')

      if(resultado){
        setGastos([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
      }
      
    }

  return (
    <div>
      
    <div className='contenedor-presupuesto contendor sombra dos-columnas'>
      <div>
        <CircularProgressbar
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
          styles={buildStyles({
                    pathColor: porcentaje>100?'#DC2626':'#5bac29',
                    textColor: porcentaje>100?'#DC2626':'#417b1d',
          })}
        />
      </div>
      <div className='contenido-presupuesto'>
            <button
              className='reset-app'
              type='button'
              onClick={handleResetApp}
            >Resetear app</button>
            <p>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible<0?'negativo':''}`}>
                <span>Disponible: </span>{formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
      </div>
    </div>
    
    <ListadoGasto
      gastos={gastos}
      gastoEditar={gastoEditar}
      setGastoEditar={setGastoEditar}
      eliminarGasto={eliminarGasto}
      filtro={filtro}
      gastosFiltrados={gastosFiltrados}
    />
    <div className='nuevo-gasto'>
      <img 
        src={IconoNuevoGasto} 
        alt="Icono Nuevo Gasto" 
        onClick={handleNuevoGasto}/>
    </div>
    {modal&&<Modal 
              setModal={setModal}
              animarModal={animarModal}
              setAnimarModal={setAnimarModal}
              guardarGasto={guardarGasto}
              gastoEditar={gastoEditar}
              />}
    
    
    
    </div>    
  )
}

export default ControlPresupuesto
