import React, { useState } from 'react';
import Error from './Error';
import shortid from 'shortid';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

  const [ nombre, guardarNombre ] = useState('');
  const [ cantidad, guardarCantidad ] = useState(0);
  const [ error, guardarError ] = useState(false);

  //cuando el usuario agregue un gasto
  const agregarGasto = e => {
    e.preventDefault();
    // validar
    if(cantidad <1 || isNaN( cantidad) || nombre.trim() === '' ) {
      guardarError(true);
      return;
    }
      guardarError(false);
    // construir el gasto
    const gasto = {
      nombre,
      cantidad,
      id: shortid.generate()
    }

    // pasar el gasto al componente principal
    guardarGasto(gasto);
    guardarCrearGasto(true);


    // resetear el form
      guardarNombre('');
      guardarCantidad(0);

    
  }

  return ( 
    <form
      onSubmit={agregarGasto}
    >

      <h2>Add your bills here </h2>
        { error ? <Error mensaje="Both fields are mandatory or bad budget"/> : null} 
      <div className='campo'>
          <label> Bill Name </label>
          <input 
          type="text"
          className='u-full-width'
          placeholder='Example Transport'
          value={nombre}
          onChange= { e => guardarNombre(e.target.value)}
          />
      </div>
      <div className='campo'>
          <label> Quantity Bill</label>
          <input 
          type="number"
          className='u-full-width'
          placeholder='Example 300'
          value={cantidad}
          onChange= { e => guardarCantidad( parseInt(e.target.value, 10 ))}
          />
      </div>
      <input
      type="submit"
      className="button-primary u-full-width"
      value="Add Bill"
      />

    </form>



   );
}
 
export default Formulario;