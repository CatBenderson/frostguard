const API_URL = /*"https://dockerfile-production-e595.up.railway.app/camiones/*/"http://localhost:8080/camiones/";

export const getAllCamiones = async () => {
    return await fetch(API_URL);
};

export const getCamionById = async (camionId) => {
    return await fetch(`${API_URL}${camionId}`);
};

export const registerCamion = async (nuevoCamion) => {
    return await fetch(API_URL, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "chofer":String(nuevoCamion.chofer).trim(),
            "temperatura":Array(nuevoCamion.temperatura),
            "objeto":String(nuevoCamion.objeto).trim(),
            "cantidad":String(nuevoCamion.cantidad).trim(),
            "latitud":String(nuevoCamion.latitud).trim(),
            "longitud":String(nuevoCamion.longitud).trim(),
        })
    });
};

export const updateCamion = async (camionId, camion) => {
    return await fetch(`${API_URL}${camionId}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "chofer":String(camion.chofer).trim(),
            "temperatura": camion.temperatura,
            "objeto":String(camion.objeto).trim(),
            "cantidad":String(camion.cantidad).trim(),
            "latitud":String(camion.latitud).trim(),
            "longitud":String(camion.longitud).trim(),
        })
    });
};

export const deleteCamion = async (camionId) => {
    return await fetch(`${API_URL}${camionId}`, {
        method:'DELETE'
    });
};