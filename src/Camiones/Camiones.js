import { useState } from 'react';
import './Camiones.css';
import CamionesList from './CamionesList';
import * as CamionesServer from './CamionesServer'

function Camiones() {
  const [camion, setCamion] = useState({ chofer: "", temperatura: 0, objeto: "", cantidad: 0, latitud: 0, longitud: 0 });

  const handleInputChange = (e) => {
    setCamion({ ...camion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = await (await CamionesServer.registerCamion(camion)).json();
        if (data.status === "Success") {
          setCamion({ chofer: "", temperatura: 0, objeto: "", cantidad: 0, latitud: 0, longitud: 0 });
          document.getElementById("chofer").value=""
          document.getElementById("temperatura").value=""
          document.getElementById("objeto").value=""
          document.getElementById("cantidad").value=""
          document.getElementById("latitud").value=""
          document.getElementById("longitud").value=""
          window.alert("Registrado con éxito")
        }
    } catch (error) {
      console.log(error);
    }
  }

    return (
      <div className="general">
        <h1>Administración de camiones</h1>
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div className='divB'>
              <label className='label'>Camion</label>
              <input name='chofer' id='chofer' className="input" placeholder="Nombre chofer" onChange={handleInputChange} ></input>
              <input name='temperatura' id ='temperatura' className="input" type="number" step="any" placeholder="Temperatura" onChange={handleInputChange} ></input>
            </div>
            <div className='divB'>
              <label className='label'>Carga</label>
              <input name='objeto' id='objeto' className="input" placeholder="Carga" onChange={handleInputChange} ></input>
              <input name='cantidad' id='cantidad' type='number' className="input" placeholder="Cantidad" onChange={handleInputChange} ></input>
            </div>
            <div className='divB'>
              <label className='label'>Ubicación</label>
              <input name='latitud' id='latitud' className="input" type="number" step="any" placeholder="Latitud" onChange={handleInputChange} ></input>
              <input name='longitud' id='longitud' className="input" type="number" step="any" placeholder="Longitud" onChange={handleInputChange} ></input>
            </div>
            <button type='submit' className='btn'>Agregar</button>
          </form>
        </div>
        <div className="divCard">
          {/* <div className="card">
          <h2 className="h5"><strong>1</strong></h2>
          <img className='img' src={Camion} />
          <h5 className="h5">Ame Huerta Mendoza</h5>
          <h5 className="h5">250 Manzanas</h5>
          <h5 className="h5">-19.2345666,  19.823456</h5>
          <button className="btnC">Actualizar</button>
          <button className="btnC">Eliminar</button>
        </div> */}
          <CamionesList />
        </div>
      </div>
    );
  }

  export default Camiones;