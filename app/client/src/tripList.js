import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    // Faz a requisição para obter a lista de viagens do servidor
    axios.get("http://localhost:3001/trips")
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter a lista de viagens:', error);
      });
  }, []); 

  const joinTrip = (tripId) => {
    const userId = localStorage.getItem('userId'); 

    // Faz a requisição para adicionar o usuário à viagem
    axios.post("http://localhost:3001/trips/${tripId}/join", { userId: userId })
      .then(response => {
        // Atualiza o estado ou realiza outras ações conforme necessário
        console.log('Usuário adicionado à viagem com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro ao se juntar à viagem:', error);
      });
  };

  return (
    <div className="container">
      <h1>Proximas Viagens</h1>
      {trips.map(trip => (
        <div key={trip.id} className="trip-card">
          <p id="test">Data Inicial: {trip.data_inicio}</p>
          <p>Data Final: {trip.data_fim}</p>
          <p>Criador: {trip.criador}</p>
          <p>País: {trip.país}</p>
          <p>Cidade: {trip.cidade}</p>
          <p>Local de Hospedagem: {trip.local_hospedagem}</p>


          <button onClick={() => joinTrip(trip.id)}>Quero me juntar!</button>
        </div>
      ))}
    </div>
  );
};

export default TripList;