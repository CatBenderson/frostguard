import React, { useState, useEffect } from 'react';
import mqtt from "precompiled-mqtt";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './Seguimiento.css'


function Seguimiento() {
  const URL = "wss://test.mosquitto.org:8081";
  const client = mqtt.connect(URL);
  const [res, setRes] = useState({})
  const [position, setPosition] = useState([19.494102, -96.91589])
  var respuesta = {};

  useEffect(() => {
    conectar()
  }, [""]);

  const conectar = () => {
    client.on('connect', () => {
      console.log("CONNECTED to broker");
    });
    client.subscribe("/temperaturaA");
    client.subscribe("ChatAdmin");
    client.subscribe("ChatChofer");
  }

  client.on('message', function (topic, message) {
    if (topic == "/temperaturaA") {
      respuesta = JSON.parse(message.toString());
      console.log(respuesta.temperatura)
      setRes(respuesta);
      if (respuesta.temperatura> 28) {
        window.alert("Temperatura muy elevada.")
      }
        try {
          if (respuesta.c1) {
            setPosition([respuesta.c1, respuesta.c2])
          } else {
            setPosition([19.494102, -96.91589])
          }
        } catch (error) {
          console.log(error)
        }
      } else if (topic == "ChatAdmin") {
        var noteA = "<div className='mensajeI'>Yo: " + message.toString() + "</div>";
        try {
          var auxA = document.getElementById("mensajes").innerHTML
          document.getElementById("mensajes").innerHTML = auxA + noteA
        } catch (error) { }
      } else if (topic == "ChatChofer") {
        var noteC = "<div className='mensajeI'>Chofer: " + message.toString() + "</div>";
        try {
          var auxC = document.getElementById("mensajes").innerHTML
          document.getElementById("mensajes").innerHTML = auxC + noteC
        } catch (error) { }
      }
    });

  // client.on('message', function (topic, message) {
  //   respuesta= JSON.parse(message.toString());
  //   setRes(respuesta);
  //   var note = "Chunchito: "+"<div className='mensajeI'>"+ message.toString()+"</div>";
  //   try {
  //     document.getElementById("mensajes").innerHTML=document.getElementById("mensajes").innerHTML+ note
  //   } catch (error) {

  //   }
  // });

  function enviar() {
    var enviado = document.getElementById("txtIn").value;
    client.publish("ChatChofer", enviado);
    document.getElementById("txtIn").value = "";
  }

  return (
    <div>
      <div className='mapa'>
        <div className="leaflet-map">
          < MapContainer className='leaflet-map' center={position} zoom={13} scrollWheelZoom={true} >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker id="marker" position={position}>
              <Popup>Tadaa! Here's where I live</Popup>
            </Marker>
            <div className="map-content">
              <span>Mapa de seguimiento</span>
            </div>
          </MapContainer >
        </div >
        <div className='chat'>
          <div id='mensajes' className='mensajes'>
          </div>
          <div className='barraTxt'>
            <input id='txtIn' className='inputMsg' placeholder='Ecribe tu mensaje'></input>
            <button className='btnEnviar' onClick={enviar} >Enviar</button>
          </div>
        </div>
      </div>
      <div className='datos'>
        <div className='datosI'>
          Temperatura
          <h3 className="h3">{res.temperatura}°</h3>
        </div>
        <div className='datosI'>
          Humedad
          <h3 className="h3">{res.humedad}%</h3>
        </div>
        <div className='datosI'>
          Latitud
          <h3 className="h3">'{res.c1}'</h3>
        </div>
        <div className='datosI'>
          Longitud
          <h3 className="h3">'{res.c2}'</h3>
        </div>
      </div>
    </div>
  );
}

export default Seguimiento;