import { useNavigate } from 'react-router-dom';
import './Camiones.css';
import Camion from './camion.png'
import * as CamionesServer from './CamionesServer'

function CamionItem({camion}) {
    const history = useNavigate();

    const eliminar= async (camionId)=>{
        const data = await (await CamionesServer.deleteCamion(camionId)).json();
        if (data.status==="Success")
        window.alert("Eliminado con éxito")
    }

    return (
        <div className="card">
            <h2 className="h5"><strong>{camion.id}</strong></h2>
            <img className='img' src={Camion} alt='Icon camion' />
            <h5 className="h5">{camion.temperatura}°</h5>
            <h5 className="h5">{camion.chofer}</h5>
            <h5 className="h5">{camion.cantidad} {camion.objeto}</h5>
            <h5 className="h5">{camion.latitud}, {camion.longitud}</h5>
            <button className="btnC" onClick={()=>history('/camionForm/'+camion.id)}>Actualizar</button>
            <button className="btnC" onClick={()=>eliminar(camion.id)}>Eliminar</button>
        </div>
    );
}

export default CamionItem;