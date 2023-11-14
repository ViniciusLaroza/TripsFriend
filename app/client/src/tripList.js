import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [viajantes, setViajantes] = useState({}); // Usar um objeto para mapear viagem ID para a lista de viajantes

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

  //rodando OKOKOK
  const joinTrip = (tripId) => {
    const userId = localStorage.getItem('userId'); 

    // Faz a requisição para adicionar o usuário à viagem
    axios.post(`http://localhost:3001/trips/${tripId}/join`, { viajante_id: userId})
      .then(response => {
        
        // Atualiza o estado ou realiza outras ações conforme necessário
        console.log('Usuário adicionado à viagem com sucesso:', response.data);
      })
      .catch(error => {
        console.error('Erro ao se juntar à viagem:', error);
      });
  };


  const handleLogout = () => {
    localStorage.clear();
  }
  /////////////////////////////////////////////////////////////


  //COM ERRO
  const loadViajante = (tripId) => {
    // Faz a requisição para obter a lista de viajantes para a viagem específica
    axios.get(`http://localhost:3001/tripviajantes/${tripId}`)
      .then(response => {
        console.log(response.data);
        // Atualiza o estado com a lista de viajantes para a viagem específica
        setViajantes({ ...viajantes, [tripId]: response.data });
      })
      .catch(error => {
        console.error('Erro ao obter a lista de viajantes para a viagem:', error);
      });
  }

  return (
    <div className="container1">
      <h1>Proximas Viagens</h1>
      {trips.map(trip => (
        <div key={trip.id} className="trip-card">
          <h3>Viagem para {trip.país}</h3>
          <p>Data Inicial: {trip.data_inicio}</p>
          <p>Data Final: {trip.data_fim}</p>
          <p>Criador: {trip.criador}</p>
          <p>País: {trip.país}</p>
          <p>Cidade: {trip.cidade}</p>
          <p>Local de Hospedagem: {trip.local_hospedagem}</p>

          {trip.viajantes && trip.viajantes.length > 0 ? (
            trip.viajantes.map(viajante => (
              <div key={viajante.id} className="viajante-card">
                <p>{viajante.nome}</p>
              </div>
            ))
          ) : (
            <p>Nenhum viajante se juntou ainda a viagem!</p>
          )}

          <button onClick={() => {
            joinTrip(trip.id);
            loadViajante(trip.id);
            // Carregar a lista de viajantes quando o usuário se junta
          }}>
            Quero me juntar!
          </button>
        </div>
      ))};
    </div>
  );
};

export default TripList;
