import React, { useState } from 'react';
import shortid from 'shortid';

function App() {

  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = useState([
    {id: shortid.generate(), NombreTarea:'Lavar el auto'},
    {id: shortid.generate(), NombreTarea:'Comprar alimento para el perro'},
    {id: shortid.generate(), NombreTarea:'Salir a correr'},
  ])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)

  const agregarTarea = e => {
    e.preventDefault()
    if (!tarea.trim()){
      console.log('Elemento Vacio')
      setError('Escriba algo por favor...')
      return
    }
    console.log(tarea);

    setTareas([
      ...tareas,
      {id: shortid.generate(), NombreTarea:tarea},
    ])

    setTarea('');
    setError(null)
  }

  const eliminarTarea = id => {
    //console.log(id);
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const cancelar = ()=> {
    //console.log(item)
    setModoEdicion(false)
    setTarea('')
    setError(null)
  }

  const editar = item => {
    //console.log(item)
    setModoEdicion(true)
    setTarea(item.NombreTarea)
    setId(item.id)
  }

  const editarTarea = e => {
    e.preventDefault()
    if (!tarea.trim()){
      console.log('Elemento Vacio')
      setError('Escriba algo por favor...')
      return
    }

    const arrayEditado = tareas.map(
      item => item.id === id ? {id:id, NombreTarea: tarea} : item
    )
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }
 

  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr/>
      <div className="row">
        <div className="col-12 col-lg-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>

            {
              error ? <span className="text-danger">{error}</span> : null
            }

            <input 
            type="text" 
            className="form-control mb-2 fw-bold"
            placeholder="Ingrese Tarea"
            onChange={ e=> setTarea(e.target.value)}
            value = {tarea}
            />
            <div className="d-grid gap-2">
              {
                modoEdicion ? (
                  <div className="d-flex justify-content-around">
                  <button className="btn btn-warning col-5" type="submit">Editar</button>
                  <button onClick={() => cancelar()} className="btn btn-dark col-5"> Cancelar</button>
                  </div>
                ) : ( 
                  <button className="btn btn-dark" >Agregar</button>
                )
              }
            </div>
          </form>
        </div>
        <div className="col-12 mt-4 col-lg-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0 ? (
                <li className="list-group-item">No hay items</li>
              ) : (
                tareas.map(item =>(
                  <li className="list-group-item" key={item.id}>
                    <span className="lead fw-bold text-break">{item.NombreTarea}</span>
                    <div className="d-lg-inline">
                      <button 
                        className="btn btn-danger btn-sm float-end mx-2"
                        onClick={() => eliminarTarea(item.id)}
                      >
                        Eliminar</button>

                      <button 
                        className="btn btn-warning btn-sm float-end mx-2"
                        onClick={() => editar(item)}
                      >
                        Editar</button>
                    </div>
                  </li>
                ))
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
