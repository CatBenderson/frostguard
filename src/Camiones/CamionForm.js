import { useEffect, useState } from 'react';
import FrostGuard from './frostguardIcon.png'
import Atras from './atras.png'
import './Camiones.css';
import { useNavigate, useParams } from 'react-router-dom';
import * as CamionesServer from './CamionesServer'

function CamionForm() {
    const params = useParams();
    const history = useNavigate();
    const [camion, setCamion] = useState({ chofer: "", temperatura: [], objeto: "", cantidad: 0, latitud: 0, longitud: 0 });

    const handleInputChange = (e) => {
        setCamion({ ...camion, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        camion.temperatura= [parseFloat(document.getElementById("temperatura").value)]
        const data = await (await CamionesServer.updateCamion(params.id, camion)).json();
        if (data.status==="Success"){
            window.alert("Actualizado con éxito")
            history("/");
        }
    }
    
    const getCamionById = async (camionId) => {
        const data = await (await CamionesServer.getCamionById(camionId)).json();
        const { chofer, temperatura, objeto,cantidad,latitud,longitud } = data.data;
        setCamion({ chofer, temperatura, objeto,cantidad,latitud,longitud });
    };

    useEffect(()=>{
        getCamionById(params.id);
    },[]);


    return (
        <>
            <div className="generalForm">
                <div>
                    <img className='imgR' style={{float:'left'}} src={Atras} alt='Icon camion' onClick={()=>history("/")}/>
                    <img className='img' src={FrostGuard} alt='Icon camion' />
                </div>
                <h1>Administración de camiones</h1>
                <div>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className='divB'>
                            <label className='label'>Camion</label>
                            <input name='chofer' className="input" placeholder="Nombre chofer" onChange={handleInputChange} value={camion.chofer}></input>
                            <input id='temperatura' name='temperatura' className="input" type="number" step="any" placeholder="Temperatura" onChange={handleInputChange} value={camion.temperatura}></input>
                        </div>
                        <div className='divB'>
                            <label className='label'>Carga</label>
                            <input name='objeto' className="input" placeholder="Carga" onChange={handleInputChange} value={camion.objeto}></input>
                            <input name='cantidad' type='number' className="input" placeholder="Cantidad" onChange={handleInputChange} value={camion.cantidad}></input>
                        </div>
                        <div className='divB'>
                            <label className='label'>Ubicación</label>
                            <input name='latitud' className="input" type="number" step="any" placeholder="Latitud" onChange={handleInputChange} value={camion.latitud} ></input>
                            <input name='longitud' className="input" type="number" step="any" placeholder="Longitud" onChange={handleInputChange} value={camion.longitud} ></input>
                        </div>
                        <button type='submit' className='btn'>Actualizar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CamionForm;