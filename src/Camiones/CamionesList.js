import React, { useEffect, useState } from "react";
import CamionItem from "./CamionItem";
import * as CamionesServer from './CamionesServer'

const CamionesList = () => {

    const [camiones, setCamiones] = useState([]);

    const listaCamiones = async () =>{
        try{
            const data = await (await CamionesServer.getAllCamiones()).json();
            setCamiones(data.data);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        listaCamiones();
        // eslint-disable-next-line
    });

    return (
        <>
            {camiones.map((camion) => (
                <CamionItem key={camion.id} camion={camion} listaCamiones={camion} />
            ))}  
        </>
    );
};

export default CamionesList;