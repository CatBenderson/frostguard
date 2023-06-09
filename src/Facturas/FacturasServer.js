const API_URL = /*"https://facturas-production.up.railway.app/facturas*/"http://localhost:8070/facturas/";

export const getAllFacturas = async () => {
    return await fetch(API_URL);
};

export const getFacturaById = async (facturaId) => {
    return await fetch(`${API_URL}${facturaId}`);
};

export const registerFactura = async (nuevaFactura) => {
    return await fetch(API_URL, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "nombreChofer":String(nuevaFactura.nombreChofer).trim(),
            "nombreReceptor":String(nuevaFactura.nombreReceptor),
            "carga":String(nuevaFactura.carga).trim(),
            "idCamion":parseInt(nuevaFactura.idCamion),
            "fecha":String(nuevaFactura.fecha).trim(),
            "hora":String(nuevaFactura.hora).trim(),
        })
    });
};

/*export const updateFactura = async (facturaId, factura) => {
    return await fetch(`${API_URL}${facturaId}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "nombreChofer":String(factura.chofer).trim(),
            "nombreReceptor":String(factura.temperatura),
            "carga":String(factura.carga).trim(),
            "idCamion":parseInt(factura.cantidad),
            "fecha":String(factura.latitud).trim(),
            "hora":String(factura.longitud).trim(),
        })
    });
};*/

export const deleteFactura = async (facturaId) => {
    return await fetch(`${API_URL}/${facturaId}`, {
        method:'DELETE'
    });
};