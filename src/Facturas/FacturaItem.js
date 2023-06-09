import { useNavigate } from 'react-router-dom';
import './Facturas.css';
import * as FacturaServer from './FacturasServer'


function FacturaItem({factura}) {
    const history = useNavigate();

    const eliminar= async (camionId)=>{
        const data = await (await FacturaServer.deleteFactura(camionId)).json();
        if (data.status==="Success")
        window.alert("Eliminado con éxito")
    }

    return (
        <div className="cardF">
            <h2 className="h5"><strong>Factura {factura.id}</strong></h2>
            <h3 className="h5">{factura.fecha} {factura.hora}</h3>
            <hr></hr>
            <h4 className="h5">Carga: {factura.carga}</h4>
            <h4 className="h5">Receptor: {factura.nombreReceptor}</h4>
            <h4 className="h5">Chofer: {factura.nombreChofer}</h4>
            <h4 className="h5">Camion: {factura.idCamion}</h4>
            <button className="btnF" onClick={()=>eliminar(factura.id)} >Eliminar</button>
        </div>
    );
}

export default FacturaItem;