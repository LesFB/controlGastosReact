import {useState} from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({presupuesto,setPresupuesto,isValidPresupuesto,setIsValidPresupuesto}) => {
    const [mensaje,setMensaje]=useState("")
    const handlePresupuesto = (e)=>{
        e.preventDefault();

        if(!Number(presupuesto)||presupuesto<0){
            setMensaje("No es un presupuesto válido")
            return
        }
        setMensaje("")
        setIsValidPresupuesto(true)

    }
  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form className='formulario' onSubmit={handlePresupuesto}>
        <div className='campo'>
            <label htmlFor="">Definir Presupuesto</label>
            <input 
                className="nuevo-presupuesto"
                type="number"
                placeholder="Añade tu presupuesto"
                
                onChange ={e=> setPresupuesto(Number(e.target.value))} 
            />
            <input type="submit" value="Añadir" />
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </div>
      </form>
    </div>
  )
}

export default NuevoPresupuesto
