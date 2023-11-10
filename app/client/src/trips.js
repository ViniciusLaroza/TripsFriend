import React, { useState, useEffect } from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import axios from 'axios';
import "./App.css";

const CreateTrip = () => {
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [país, setPais] = useState('');
  const [cidade, setCidade] = useState('');
  const [localHospedagem, setLocalHospedagem] = useState('');

  const handleCreateTrip = async () => {
    const criador = localStorage.getItem('userId');
    try {
      const response = await axios.post("http://localhost:3001/trips", {
        data_inicio: dataInicio,
        data_fim: dataFim,
        criador: criador,
        país: país,
        cidade: cidade,
        local_hospedagem: localHospedagem,
      });

      console.log(response.data);
      // Lidar com a resposta conforme necessário (redirecionar, exibir mensagem, etc.)
    } catch (error) {
      console.error('Erro ao criar viagem:', error);
      // Lidar com o erro conforme necessário (exibir mensagem de erro, etc.)
    }
  };

  return (
    <div className="container">
      <h1>Criar Viagem</h1>
      <Formik>
        <Form className="login-form">
            <div className="form-field">
                <label>Data de Início:</label>
                <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
            </div>

            <div className="form-field">
                <label>Data de Fim:</label>
                <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
            </div>

            <div className="form-field">
                <label>País:</label>
                <input type="text" value={país} onChange={(e) => setPais(e.target.value)} />
            </div>

            <div className="form-field" >
                <label >Cidade:</label>
                <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            </div>

            <div className="form-field">
                <label>Local de Hospedagem:</label>
                <input type="text" value={localHospedagem} onChange={(e) => setLocalHospedagem(e.target.value)} />
            </div>

            <button onClick={handleCreateTrip}>Criar Viagem</button>
        </Form>
      </Formik>
      
      

      
    </div>
  );
};

export default CreateTrip;