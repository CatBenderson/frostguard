import { useEffect, useState } from 'react';
import * as CamionesServer from '../Camiones/CamionesServer'
import * as FacturasServer from './FacturasServer'
import './Facturas.css';
import FacturasList from './FacturasList';


function Facturas() {

    const [camiones, setCamiones] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [camion, setCamion] = useState({ chofer: "", temperatura: [], objeto: "", cantidad: 0, latitud: 0, longitud: 0 });
    const [factura, setFactura] = useState({ nombreChofer: "", idCamion: 0, carga: "", nombreReceptor: "", fecha: 0, hora: 0 });

    const handleInputChange = (e) => {
        setFactura({ ...factura, [e.target.name]: e.target.value });
    };

    const listaCamiones = async () => {
        try {
            const data = await (await CamionesServer.getAllCamiones()).json();
            setCamiones(data.data);
            for (let index = 0; index < data.data.length; index++) {
                var aux= aux + "<option>" + data.data[index].id + "</option>";
            }
            document.getElementById("idCamion").innerHTML = ""
            document.getElementById("idCamion").innerHTML = document.getElementById("idCamion").innerHTML + aux
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeSelected = async () => {
        const data = await (await CamionesServer.getCamionById(document.getElementById("idCamion").value)).json();
        const { chofer, temperatura, objeto, cantidad, latitud, longitud } = data.data;
        setCamion({ chofer, temperatura, objeto, cantidad, latitud, longitud });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        factura.idCamion = document.getElementById("idCamion").value;
        factura.nombreChofer = document.getElementById("chofer").value;
        factura.carga = document.getElementById("objeto").value;
        try {
            const data = await (await FacturasServer.registerFactura(factura)).json();
            if (data.status === "Success") {
                setFactura({ nombreChofer: "", idCamion: 0, carga: "", nombreReceptor: 0, fecha: 0, hora: 0 });
                document.getElementById("chofer").value = ""
                document.getElementById("idCamion").value = ""
                document.getElementById("objeto").value = ""
                document.getElementById("receptor").value = ""
                document.getElementById("fecha").value = ""
                document.getElementById("hora").value = ""
                setCamion([{}]);
                window.alert("Registrado con éxito")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listaCamiones();
        //optSelect();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="general">
            <h1>Generar facturas</h1>
            <div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className='divF'>
                        <label className='label'>Camion</label>
                        <select name='idCamion' id='idCamion' className="inputF" type="number" step="any" onChange={handleChangeSelected} >
                        </select>
                        <input name='nombreChofer' id='chofer' className="inputF" placeholder="Nombre chofer" value={camion.chofer} disabled></input>
                        <input name='carga' id='objeto' className="inputF" placeholder="Carga" value={camion.objeto} disabled></input>
                    </div>
                    <div className='divF'>
                        <label className='label'>Recepción</label>
                        <input name='nombreReceptor' id='receptor' className="inputF" placeholder="Receptor" onChange={handleInputChange} ></input>
                        <input name='fecha' id='fecha' className="inputF" type="date" step="any" placeholder="Fecha" onChange={handleInputChange} ></input>
                        <input name='hora' id='hora' className="inputF" type="time" step="any" placeholder="Hora" onChange={handleInputChange} ></input>
                    </div>
                    <button type='submit' className='btn'>Generar</button>
                </form>
            </div>
            <div className="divCardF">
                <FacturasList />
            </div>
        </div>
    );
}

export default Facturas;