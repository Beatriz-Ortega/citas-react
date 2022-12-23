import {useState, useEffect} from 'react';
import Error from './Error.jsx'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [ingreso, setIngreso] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false)

  useEffect( () => {
    if( Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setIngreso(paciente.Ingreso)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

  const generarId = () =>{
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;

  }

  const handleSubmit = (e) =>{ //evita que el formulario se envie con datos por defecto
    e.preventDefault();

    //validacion del formulario
    if([nombre, propietario, email, ingreso, sintomas].includes('')){
      console.log('Hay al menos un campo vacio');
      setError(true);
      return;
    }

    setError(false);

    //objeto de pacientes
    const objetoPaciente={
      nombre, 
      propietario, 
      email, 
      ingreso, 
      sintomas
    }

    if(paciente.id) {
      // Editando el Registro
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )

      setPacientes(pacientesActualizados)
      setPaciente({})

    } else {
      // Nuevo registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    //reiniciar el formulario para que una vez lleno y enviado muestre los campos vacios
    setNombre('')
    setPropietario('')
    setEmail('')
    setIngreso('')
    setSintomas('')

    //como se requiere tener una coleccion de paciente se debe adicionar y no solo sobreescribir
    //no se puede usar push porque modifica el areeglo original
    //setPacientes([...pacientes, objetoPaciente]);

  }

  //otra forma de copiar el error es {error && <Error> <p>Todos los campos son obligatorios</p> </Error>} pero en lugar de pasar mensaje
  //se pasa la palabra reservada children

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y {" "}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form 
      onSubmit={handleSubmit} 
      className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

        {error && <Error mensaje = 'Todos los campos son obligatorios'/>}

        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input  
            id="mascota"
            type="text" 
            placeholder="Nombre de la mascota" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={nombre}
            onChange={ (e) => setNombre(e.target.value) }
            />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-grey-700 uppercase font-bold">Nombre Propietario</label>
          <input  
            id="propietario"
            type="text" 
            placeholder="Nombre del propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value) }
            />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-grey-700 uppercase font-bold">Email</label>
          <input  
            id="email"
            type="email" 
            placeholder="nombre@mail.com" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
            />
        </div>
        <div className="mb-5">
          <label htmlFor="ingreso" className="block text-grey-700 uppercase font-bold">Ingreso</label>
          <input  
            id="ingreso"
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            value={ingreso}
            onChange={ (e) => setIngreso(e.target.value) }
            />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-grey-700 uppercase font-bold">Sintomas</label>
          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" 
            placeholder="Describe los síntomas"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value) }
          />
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-all rounded-md"
          value={paciente.id ? 'Editar Paciente':'Agregar Paciente'}
          />
      </form>
    </div>
  )
}

export default Formulario

