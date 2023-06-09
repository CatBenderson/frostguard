import React, { useEffect, useState } from "react";
import FacturaItem from "./FacturaItem";
import * as FacturasServer from './FacturasServer';

const FacturasList = () => {

    const [facturas, setFacturas] = useState([]);
   /*const [facturas, setFacturas] = useState([
    { id:0 ,chofer: "Marcos", idCamion: 1, objeto: "Papitas", receptor: "Yo", fecha: "23-05-2023", hora: "5:12 AM" },
    { id:1, chofer: "Ame", idCamion: 7, objeto: "Bombones", receptor: "Tu", fecha: "23-05-2023", hora: "8:34 PM" }]);*/

    const listaFacturas = async () =>{
        try{
            const data = await (await FacturasServer.getAllFacturas()).json();
            setFacturas(data.data);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        listaFacturas();
        // eslint-disable-next-line
    });

    return (
        <>
            {facturas.map((factura) => (
                <FacturaItem key={factura.id} factura={factura} listaFacturas={factura} />
            ))}  
        </>
    );
};

export default FacturasList;